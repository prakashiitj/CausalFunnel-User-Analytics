import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [sessions, setSessions] = useState([]);
  const [events, setEvents] = useState([]);
  const [heatmapData, setHeatmapData] = useState([]);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = () => {
    axios
      .get("http://localhost:5000/api/sessions")
      .then((res) => {
        setSessions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadSessionEvents = (sessionId) => {
    axios
      .get(`http://localhost:5000/api/session/${sessionId}`)
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadHeatmap = () => {
    axios
      .get(
        "http://localhost:5000/api/heatmap?page=http://localhost:3000"
      )
      .then((res) => {
        setHeatmapData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>CausalFunnel User Analytics Dashboard</h1>

      <p
        style={{
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        Total Sessions: {sessions.length}
      </p>

      <h2>Sessions</h2>

      {sessions.map((session) => (
        <div
          key={session._id}
          onClick={() => loadSessionEvents(session._id)}
          style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "15px",
            marginBottom: "10px",
            cursor: "pointer",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <p>
            <strong>Session ID:</strong> {session._id}
          </p>

          <p>
            <strong>Total Events:</strong> {session.totalEvents}
          </p>

          <p>Click to view user journey</p>
        </div>
      ))}

      <button
        onClick={loadHeatmap}
        style={{
          padding: "10px 20px",
          marginBottom: "20px",
          cursor: "pointer",
          borderRadius: "5px",
          border: "none",
        }}
      >
        Refresh Heatmap
      </button>

      <h2>User Journey</h2>

      {events.length === 0 ? (
        <p>Select a session above</p>
      ) : (
        events.map((event) => (
          <div
            key={event._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
              marginBottom: "8px",
            }}
          >
            <p>
              <strong>Type:</strong> {event.event_type}
            </p>

            <p>
              <strong>Page:</strong> {event.page_url}
            </p>

            <p>
              <strong>Time:</strong>{" "}
              {new Date(event.timestamp).toLocaleString()}
            </p>

            {event.x !== undefined && event.y !== undefined && (
              <p>
                <strong>Position:</strong> ({event.x}, {event.y})
              </p>
            )}
          </div>
        ))
      )}

      <h2>Heatmap View</h2>

      <div
        style={{
          width: "800px",
          height: "500px",
          border: "2px solid black",
          position: "relative",
          marginTop: "20px",
          backgroundColor: "#f9f9f9",
        }}
      >
        {heatmapData.map((click) => (
          <div
            key={click._id}
            title={`(${click.x}, ${click.y})`}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "red",
              position: "absolute",
              left: `${click.x}px`,
              top: `${click.y}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;