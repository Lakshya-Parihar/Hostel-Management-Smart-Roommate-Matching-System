# train_alloc.py (robust: use cursor.fetchall() then pd.DataFrame)
import argparse, sys, numpy as np, joblib
import pandas as pd
import pymysql
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import roc_auc_score

parser = argparse.ArgumentParser()
parser.add_argument("--out", default="room_alloc_model.joblib")
parser.add_argument("--db-host", default="127.0.0.1")
parser.add_argument("--db-user", default="root")
parser.add_argument("--db-pass", default="")
parser.add_argument("--db-name", default="hostel_db")
args = parser.parse_args()

# Connect
try:
    conn = pymysql.connect(host=args.db_host, user=args.db_user, password=args.db_pass,
                           db=args.db_name, charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)
except Exception as e:
    print("ERROR: cannot connect to DB:", e); sys.exit(1)

sql = """
SELECT
  ah.id as hist_id,
  ah.application_id,
  ah.student_id,
  ah.room_id,
  u.gender,
  p.sleep, p.study, p.cleanliness, p.food, p.noise,
  r.price, r.beds, r.capacity,
  ah.accepted as accepted_raw
FROM allocation_history ah
JOIN users u ON u.id = ah.student_id
LEFT JOIN preferences p ON p.student_id = u.id
LEFT JOIN rooms r ON r.id = ah.room_id
"""
# Use cursor.fetchall to avoid pandas SQL parsing oddities
with conn.cursor() as cur:
    cur.execute(sql)
    rows = cur.fetchall()
conn.close()

print("DEBUG: number of rows fetched:", len(rows))
if len(rows) == 0:
    print("No rows returned from allocation_history join. Ensure allocation_history has rows."); sys.exit(1)

# Build DataFrame robustly
df = pd.DataFrame(rows)
# Show raw repr of first few rows to reveal any hidden header-like strings
print("DEBUG: raw head (repr):")
for i, r in enumerate(rows[:8]):
    print(f" ROW {i} repr:", repr(r))

print("\nDEBUG: DataFrame dtypes:\n", df.dtypes)
print("\nDEBUG: DataFrame head:\n", df.head(10).to_string(index=False))

# Normalize label accepted_raw -> accepted_flag (0/1/NaN)
def parse_accepted(val):
    if pd.isna(val):
        return np.nan
    try:
        if isinstance(val, (int, float, np.integer, np.floating)):
            return 1 if int(val) != 0 else 0
    except:
        pass
    s = str(val).strip().lower()
    if s in ('yes','y','1','true','t'):
        return 1
    if s in ('no','n','0','false','f'):
        return 0
    return np.nan

df['accepted_flag'] = df['accepted_raw'].apply(parse_accepted)

# Preprocess features
def ord_clean(val):
    if pd.isna(val): return 1
    v = str(val).strip().lower()
    if v == 'low': return 0
    if v == 'medium': return 1
    if v == 'high': return 2
    return 1

def preprocess(df):
    X = pd.DataFrame()
    X['gender_Male'] = (df['gender'] == 'Male').astype(int)
    X['gender_Female'] = (df['gender'] == 'Female').astype(int)
    X['cleanliness'] = df['cleanliness'].apply(ord_clean).fillna(1)
    X['sleep_early'] = (df['sleep'] == 'early').astype(int)
    X['study_group'] = (df['study'] == 'group').astype(int)

    price_series = pd.to_numeric(df['price'], errors='coerce')
    if price_series.isnull().any():
        print("WARNING: some price values could not be parsed; replacing with median.")
    price_median = price_series.median(skipna=True)
    if np.isnan(price_median): price_median = 0.0
    X['price'] = price_series.fillna(price_median).astype(float)

    X['beds'] = pd.to_numeric(df['beds'], errors='coerce').fillna(1).astype(int)
    X['capacity'] = pd.to_numeric(df['capacity'], errors='coerce').fillna(1).astype(int)

    parsed = df['accepted_flag']
    num_unparseable = parsed.isna().sum()
    if num_unparseable > 0:
        print(f"WARNING: {num_unparseable} rows have null/unparseable label and will be dropped.")
    valid_idx = parsed.notna()
    X_clean = X.loc[valid_idx].reset_index(drop=True)
    y_clean = parsed.loc[valid_idx].astype(int).reset_index(drop=True)
    return X_clean, y_clean

X, y = preprocess(df)
# print("DEBUG: processed feature shape:", X.shape)
# print("DEBUG: target distribution:\n", y.value_counts() if len(y)>0 else "EMPTY")

# if len(y) < 5:
#     print(f"ERROR: only {len(y)} valid labeled rows found. Need >=5 to train a useful model.")
#     print("Options: seed allocation_history with sample rows, collect more real allocations, or use the rule-based fallback.")
#     sys.exit(1)

# # Train
# X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y if len(y.unique())>1 else None)
# clf = RandomForestClassifier(n_estimators=200, random_state=42, n_jobs=-1)
# clf.fit(X_train, y_train)
# probs = clf.predict_proba(X_val)[:,1] if hasattr(clf, "predict_proba") else clf.predict(X_val)
# try:
#     print("Validation AUC:", roc_auc_score(y_val, probs))
# except Exception as e:
#     print("Could not compute AUC:", e)
# joblib.dump(clf, args.out)
# print("Saved model to", args.out)

print("DEBUG: processed feature shape:", X.shape)
print("DEBUG: target distribution:\n", y.value_counts() if len(y) > 0 else "EMPTY")

n_samples = len(y)
if n_samples < 5:
    print(f"ERROR: only {n_samples} valid labeled rows found. Need >=5 to train a useful model.")
    print("Options: seed more labeled rows in allocation_history, collect more real allocations, or use the rule-based fallback.")
    sys.exit(1)

clf = RandomForestClassifier(n_estimators=200, random_state=42, n_jobs=-1)

if n_samples < 10:
    # Too few samples for a proper train/validation split
    print(f"WARNING: very small dataset (n={n_samples}). Training on ALL data without validation split.")
    clf.fit(X, y)
else:
    # Normal path: keep a validation set, stratified by class
    X_train, X_val, y_train, y_val = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42,
        stratify=y if len(y.unique()) > 1 else None,
    )
    clf.fit(X_train, y_train)
    probs = clf.predict_proba(X_val)[:, 1] if hasattr(clf, "predict_proba") else clf.predict(X_val)
    try:
        print("Validation AUC:", roc_auc_score(y_val, probs))
    except Exception as e:
        print("Could not compute AUC:", e)

joblib.dump(clf, args.out)
print("Saved model to", args.out)

