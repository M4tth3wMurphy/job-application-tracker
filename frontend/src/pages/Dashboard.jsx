import { useEffect, useState } from "react";
import { useAuth } from "../contexts/useAuth";
import { apiRequest } from "../api/api";
import AddApplicationForm from "../components/AddApplicationForm";

const Dashboard = () => {
  const { user } = useAuth();

  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const data = await apiRequest(
          "/applications",
          "GET",
          null,
          user.token
        );
        setApplications(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user.token]);

  const handleAddApplication = (newApplication) => {
    setApplications((prev) => [newApplication, ...prev]);
  };

  return (
    <div>
      <h2>My Applications</h2>

      <AddApplicationForm onAdd={handleAddApplication} />

      {loading && <p>Loading applications…</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && applications.length === 0 && (
        <p>No applications yet.</p>
      )}

      {!loading && applications.length > 0 && (
        <div style={{ display: "grid", gap: "1rem" }}>
          {applications.map((app) => (
            <div
              key={app._id}
              style={{
                background: "white",
                padding: "1rem",
                borderRadius: "6px",
                border: "1px solid #e5e7eb"
              }}
            >
              <strong>{app.role}</strong>
              <p style={{ margin: "0.25rem 0" }}>{app.status}</p>
              {app.salaryRange && (
                <p style={{ margin: 0, color: "#555" }}>{app.salaryRange}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
