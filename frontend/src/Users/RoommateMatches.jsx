import React, { useEffect, useState } from "react";
import axios from "axios";

export default function RoommateMatches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const studentId = user?.id;

  useEffect(() => {
    if (!studentId) {
      console.error("No student_id found in localStorage!");
      setLoading(false);
      return;
    }

    const fetchMatches = async () => {
      try {
        const res = await axios.get(
          `http://localhost/HMS/backend/User/getMatches.php?student_id=${studentId}`
        );
        setMatches(res.data.matches || []);
        
      } catch (err) {
        console.error("Error fetching matches:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [studentId]);

  if (loading) return <p>Loading matches...</p>;

  return (
    <div>
      <h2>Your Roommate Matches</h2>
      {matches.length > 0 ? (
        <ul>
          {matches.map((match) => (
            <li key={match.student_id}>
              {match.name} – {match.city} – {match.interests}
            </li>
          ))}
        </ul>
      ) : (
        <p>No matches found.</p>
      )}
    </div>
  );
}
