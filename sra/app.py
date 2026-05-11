# app.py
from flask import Flask, request, jsonify
import joblib
import pandas as pd
import numpy as np
import os

MODEL_PATH = os.path.join(os.path.dirname(__file__), "room_alloc_model.joblib")
model = joblib.load(MODEL_PATH)

app = Flask(__name__)

# build features same way as training
def build_row(student, room):
    row = {}
    row['gender_Male'] = 1 if student.get('gender') == 'Male' else 0
    row['gender_Female'] = 1 if student.get('gender') == 'Female' else 0

    def ord_clean(val):
        if val is None: return 1
        v = str(val).strip().lower()
        if v == 'low': return 0
        if v == 'medium': return 1
        if v == 'high': return 2
        return 1

    row['cleanliness'] = ord_clean(student.get('cleanliness'))
    row['sleep_early'] = 1 if student.get('sleep') == 'early' else 0
    row['study_group'] = 1 if student.get('study') == 'group' else 0

    # room fields
    try:
        row['price'] = float(room.get('price', 0) if room.get('price') is not None else 0.0)
    except:
        row['price'] = 0.0
    try:
        row['beds'] = int(room.get('beds', 1) if room.get('beds') is not None else 1)
    except:
        row['beds'] = 1
    try:
        row['capacity'] = int(room.get('capacity', 1) if room.get('capacity') is not None else 1)
    except:
        row['capacity'] = 1

    return row

@app.route('/suggest', methods=['POST'])
def suggest():
    """
    Expects JSON:
    {
      "student": {"gender":"Male", "sleep":"early", "study":"group", "cleanliness":"medium"},
      "rooms": [{"id":5,"price":7200,"beds":1,"capacity":1,"features":{...}}, {...}, ...]
    }
    Returns:
      [{"room_id":5,"score":0.89}, ...] sorted descending
    """
    data = request.json
    if not data or 'student' not in data or 'rooms' not in data:
        return jsonify({"error":"invalid payload, must include 'student' and 'rooms'"}), 400

    student = data['student']
    rooms = data['rooms']

    rows = [build_row(student, r) for r in rooms]
    df = pd.DataFrame(rows, columns=['gender_Male','gender_Female','cleanliness','sleep_early','study_group','price','beds','capacity'])

    # ensure no missing columns (fill with 0)
    for col in ['gender_Male','gender_Female','cleanliness','sleep_early','study_group','price','beds','capacity']:
        if col not in df.columns:
            df[col] = 0

    # predict probabilities (if model supports)
    try:
        probs = model.predict_proba(df)[:,1]
    except Exception as e:
        # fallback to predict if no predict_proba
        preds = model.predict(df)
        # convert 0/1 predictions to pseudo scores
        probs = np.array(preds, dtype=float)

    results = []
    for r, p in zip(rooms, probs):
        results.append({"room_id": int(r.get('id')), "score": float(np.round(float(p), 4))})
    results = sorted(results, key=lambda x: x['score'], reverse=True)
    return jsonify(results)

@app.route('/', methods=['GET'])
def health():
    return {
        "status": "ok",
        "service": "Smart Room Allocation API",
        "endpoints": ["/suggest"]
    }, 200


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5001)
