import { useState } from "react";
import axios from "axios";

export default function DeliveryLogin() {
  const [email, setEmail] = useState("delivery@example.com");
  const [password, setPassword] = useState("secret123");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/delivery-login", {
        email,
        password,
      });

      localStorage.setItem("deliveryToken", res.data.token);
      window.location.href = "/delivery/dashboard";
    } catch (err) {
      setError("Login failed: " + (err.response?.data?.message || "Server error"));
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", padding: 20 }}>
      <h2>🚚 Delivery Guy Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />
        <button type="submit" style={{ width: "100%", padding: 10 }}>
          Login
        </button>
      </form>
      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
    </div>
  );
}
