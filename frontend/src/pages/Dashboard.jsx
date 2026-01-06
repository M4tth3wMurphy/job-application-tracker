import { useEffect, useState } from "react";
import { useAuth } from "../contexts/useAuth";
import { apiRequest } from "../api/api";

const Dashboard = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await apiRequest(
          "/applications",
          "GET",
          null,
          user.token
        );
        setApplications(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchApplications();
  }, [user]);

  return (
    <div>
      <h2>My Applications</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {applications.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
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
