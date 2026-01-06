import { useEffect, useState } from "react";
import { apiRequest } from "../api/api";
import { useAuth } from "../contexts/useAuth";
import AddCompanyForm from "./AddCompanyForm";

const AddApplicationForm = ({ onAdd }) => {
  const { user } = useAuth();

  const [role, setRole] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [company, setCompany] = useState("");
  const [companies, setCompanies] = useState([]);
  const [loadingCompanies, setLoadingCompanies] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoadingCompanies(true);
        const data = await apiRequest(
          "/companies",
          "GET",
          null,
          user.token
        );
        setCompanies(data);
      } catch {
        setError("Failed to load companies");
      } finally {
        setLoadingCompanies(false);
      }
    };

    fetchCompanies();
  }, [user.token]);

  const handleAddCompany = (newCompany) => {
    setCompanies((prev) => [...prev, newCompany]);
    setCompany(newCompany._id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await apiRequest(
        "/applications",
        "POST",
        {
          role,
          salaryRange,
          company
        },
        user.token
      );

      onAdd(data);
      setRole("");
      setSalaryRange("");
      setCompany("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <h3>Add Application</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Create company inline if needed */}
      <AddCompanyForm onAdd={handleAddCompany} />

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Job title / role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />
        <br />

        <input
          type="text"
          placeholder="Salary range (optional)"
          value={salaryRange}
          onChange={(e) => setSalaryRange(e.target.value)}
        />
        <br />

        {loadingCompanies ? (
          <p>Loading companies…</p>
        ) : (
          <select
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          >
            <option value="">Select company</option>
            {companies.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        )}
        <br />

        <button type="submit">Add Application</button>
      </form>
    </div>
  );
};

export default AddApplicationForm;
