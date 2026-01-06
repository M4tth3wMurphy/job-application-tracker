import { Link } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div>
        <h2>Please log in</h2>
        <p>
          <Link to="/login">Login</Link> or{" "}
          <Link to="/register">Create an account</Link>
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <p>You are logged in.</p>
    </div>
  );
};

export default Dashboard;
