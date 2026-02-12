import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

import {toast } from 'react-toastify';

export const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
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
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await fetch(`${backendUrl}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const res_data = await response.json();
      
      console.log("response from server", res_data.msg );
      if (response.ok) {
        storetokenInLS(res_data.token);
        setFormData({
          username: "",
          email: "",
          phone: "",
          password: "",
        });
        toast.success("succesful registration" );
        navigate("/");
      } 
      else{
        toast.error("not valid registration" );
      }
    } catch (err) {
      console.error("❌ Fetch failed:", err.message);
    }
  };

  return (
    <section className="section-registration">
      <main>
        <div className="container">
          <div className="registration-form">
            <h1 className="main-heading mb-3">Create Account</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  id="username"
                  required
                  autoComplete="username"
                />
              </div>

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
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone"
                  id="phone"
                  required
                  autoComplete="tel"
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
                  autoComplete="new-password"
                />
              </div>

              <button type="submit" className="btn btn-primary mt-3">
                Register
              </button>
              <div className="auth-footer">
                <span>Already registered?</span>
                <a href="/login"> Login here</a>
              </div>
            </form>
          </div>
        </div>
      </main>
    </section>
  );
};
