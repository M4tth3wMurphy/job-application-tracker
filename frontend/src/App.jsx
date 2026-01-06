import { AuthProvider } from "./contexts/AuthProvider";
import Layout from "./components/Layout";

function App() {
  return (
    <AuthProvider>
      <Layout>
        <h1>Frontend foundation ready</h1>
      </Layout>
    </AuthProvider>
  );
}

export default App;
