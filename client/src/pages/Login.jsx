import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import {toast } from 'react-toastify';

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
 const { storetokenInLS } = useAuth();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting:", formData);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        storetokenInLS(data.token);
        setFormData({ email: "", password: "" });
        toast.success("login successfull" );
        navigate("/");
      } else {
       toast.error(data?.msg || "Login failed. Please try again.");

      }
    } catch (err) {
      console.error("❌ Fetch failed:", err.message);
    }
  };

  return (
    <section className="section-login">
      <main>
        <div className="container">
          <div className="login-form">
            <h1 className="main-heading mb-3">Login</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  id="email"
                  required
                  autoComplete="email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  id="password"
                  required
                  autoComplete="current-password"
                />
              </div>

              <button type="submit" className="btn btn-primary mt-3">
                Login
              </button>
              <div className="auth-footer">
                <span>Not registered?</span>
                <a href="/signup"> Register here</a>
              </div>
            </form>
          </div>
        </div>
      </main>
    </section>
  );
};
