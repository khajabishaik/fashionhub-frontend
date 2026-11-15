import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const email = user.email.trim().toLowerCase();

      if (!user.name.trim() || !email || !user.password) {
        setError("Please fill in all fields.");
        return;
      }

      // 1. Check local backup first so duplicate emails are never allowed
      const localUsers = JSON.parse(localStorage.getItem("fashionHubRegisteredUsers")) || [];
      if (localUsers.some((u) => u.email === email)) {
        setError("This email is already registered. Please login.");
        return;
      }

      // 2. Check backend server
      const response = await api.get("/users", {
        params: { email }
      });

      if (response.data.length > 0) {
        setError("This email is already registered. Please login.");
        return;
      }

      const newUser = {
        name: user.name.trim(),
        email,
        password: user.password
      };

      // 3. Save to backend server AND local backup
      const created = await api.post("/users", newUser);
      localUsers.push(created.data || newUser);
      localStorage.setItem("fashionHubRegisteredUsers", JSON.stringify(localUsers));

      navigate("/login", {
        state: { message: "Account created successfully! Please login." }
      });
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Create Your Account</h1>
        <p>Join Fashion Hub and explore your style.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={user.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={user.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            required
          />

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-btn">
            Create Account
          </button>
        </form>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
