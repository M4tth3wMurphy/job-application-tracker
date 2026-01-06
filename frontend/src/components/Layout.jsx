import { useAuth } from "../contexts/useAuth";

const Layout = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <>
      <header
        style={{
          background: "white",
          borderBottom: "1px solid #ddd",
          padding: "1rem"
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <strong>Job Application Tracker</strong>

          {user && <button onClick={logout}>Logout</button>}
        </div>
      </header>

      <main>{children}</main>
    </>
  );
};

export default Layout;
