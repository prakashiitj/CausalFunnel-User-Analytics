import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const API_URL = "https://causalfunnel-backend-gnani.onrender.com";

function App() {
  const [sessions, setSessions] = useState([]);
  const [events, setEvents] = useState([]);
  const [heatmapData, setHeatmapData] = useState([]);
  const [stats, setStats] = useState({});
  const [distribution, setDistribution] = useState([]);
  const [topPages, setTopPages] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchSessions();

    axios
      .get(`${API_URL}/api/stats`)
      .then((res) => setStats(res.data))
      .catch(console.error);

    axios
      .get(`${API_URL}/api/event-distribution`)
      .then((res) => setDistribution(res.data))
      .catch(console.error);

    axios
      .get(`${API_URL}/api/top-pages`)
      .then((res) => setTopPages(res.data))
      .catch(console.error);
  }, []);

  const fetchSessions = () => {
    axios
      .get(`${API_URL}/api/sessions`)
      .then((res) => setSessions(res.data))
      .catch(console.error);
  };

  const loadSessionEvents = (sessionId) => {
    axios
      .get(`${API_URL}/api/session/${sessionId}`)
      .then((res) => setEvents(res.data))
      .catch(console.error);
  };

  const loadHeatmap = () => {
  axios
    .get(
      "https://causalfunnel-backend-gnani.onrender.com/api/heatmap"
    )
    .then((res) => setHeatmapData(res.data))
    .catch(console.error);
};

  return (
    <div
      style={{
        background: "#f4f6f8",
        minHeight: "100vh",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>CausalFunnel Analytics Dashboard</h1>

      {/* Analytics Cards */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >
        <div style={cardStyle}>
          <h2>{stats.totalSessions || 0}</h2>
          <p>Total Sessions</p>
        </div>

        <div style={cardStyle}>
          <h2>{stats.totalEvents || 0}</h2>
          <p>Total Events</p>
        </div>

        <div style={cardStyle}>
          <h2>{stats.totalClicks || 0}</h2>
          <p>Total Clicks</p>
        </div>

        <div style={cardStyle}>
          <h2>{stats.totalPageViews || 0}</h2>
          <p>Page Views</p>
        </div>
      </div>

      {/* Event Distribution */}
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "30px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h2>Event Distribution</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={distribution}>
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top Pages */}
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "30px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h2>Top Pages</h2>

        {topPages.length === 0 ? (
          <p>No page data available</p>
        ) : (
          topPages.map((page) => (
            <div
              key={page._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <span>{page._id}</span>
              <strong>{page.visits} visits</strong>
            </div>
          ))
        )}
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search Session ID"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          marginBottom: "20px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      <h2>Sessions</h2>

      {sessions
        .filter((session) =>
          session._id.toLowerCase().includes(search.toLowerCase())
        )
        .map((session) => (
          <div
            key={session._id}
            onClick={() => loadSessionEvents(session._id)}
            style={{
              background: "white",
              padding: "15px",
              marginBottom: "12px",
              borderRadius: "10px",
              cursor: "pointer",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <p>
              <strong>Session ID:</strong> {session._id}
            </p>

            <p>
              <strong>Total Events:</strong> {session.totalEvents}
            </p>
          </div>
        ))}

      <button
        onClick={loadHeatmap}
        style={{
          padding: "12px 20px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          background: "#2563eb",
          color: "white",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        Refresh Heatmap
      </button>

      {/* User Journey */}
      <h2>User Journey Timeline</h2>

      {events.length === 0 ? (
        <p>Select a session above</p>
      ) : (
        events.map((event) => (
          <div
            key={event._id}
            style={{
              background: "white",
              padding: "12px",
              marginBottom: "10px",
              borderRadius: "10px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <p>
              <strong>{event.event_type}</strong>
            </p>

            <p>{event.page_url}</p>

            <p>{new Date(event.timestamp).toLocaleTimeString()}</p>

            {event.x !== undefined && (
              <p>
                Position: ({event.x}, {event.y})
              </p>
            )}
          </div>
        ))
      )}

      {/* Heatmap */}
      <h2>Heatmap View</h2>

      <div
        style={{
          width: "900px",
          height: "500px",
          border: "2px solid #333",
          background: "white",
          position: "relative",
          borderRadius: "10px",
        }}
      >
        {heatmapData.map((click) => (
          <div
            key={click._id}
            title={`(${click.x}, ${click.y})`}
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              background: "red",
              position: "absolute",
              left: `${click.x}px`,
              top: `${click.y}px`,
              opacity: 0.7,
            }}
          />
        ))}
      </div>
    </div>
  );
}

const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  minWidth: "180px",
  textAlign: "center",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

export default App;