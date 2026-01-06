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
        <ul>
          {applications.map((app) => (
            <li key={app._id}>
              <strong>{app.role}</strong> — {app.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
