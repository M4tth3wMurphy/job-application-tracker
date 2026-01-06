import { useAuth } from "../contexts/useAuth";

const Layout = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div>
      <header style={{ padding: "1rem", borderBottom: "1px solid #ddd" }}>
        <h2>Job Application Tracker</h2>
        {user && (
          <button onClick={logout} style={{ float: "right" }}>
            Logout
          </button>
        )}
      </header>

      <main style={{ padding: "2rem" }}>{children}</main>
    </div>
  );
};

export default Layout;
