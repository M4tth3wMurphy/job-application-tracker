import { useState } from "react";
import { apiRequest } from "../api/api";
import { useAuth } from "../contexts/useAuth";

const AddCompanyForm = ({ onAdd }) => {
  const { user } = useAuth();

  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const company = await apiRequest(
        "/companies",
        "POST",
        {
          name,
          industry,
          location,
          website
        },
        user.token
      );

      onAdd(company);
      setName("");
      setIndustry("");
      setLocation("");
      setWebsite("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <h4>Add Company</h4>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Company name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />

        <input
          type="text"
          placeholder="Industry"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
        />
        <br />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <br />

        <input
          type="text"
          placeholder="Website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
        <br />

        <button type="submit">Add Company</button>
      </form>
    </div>
  );
};

export default AddCompanyForm;
