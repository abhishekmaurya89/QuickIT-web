import React, { useState, useEffect } from "react";
import { useAuth } from "../store/auth";

export const Contact = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: "",
  });
  const [userData, setUserData] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    if (user && userData) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        message: "",
      });
      setUserData(false); 
    }
  }, [user, userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Form submitted:", formData);
const backendUrl = import.meta.env.VITE_BACKEND_URL;
  try {
    const response = await fetch(`${backendUrl}/api/form/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      alert("✅ Message sent successfully!");
      setFormData({ username: "", email: "", message: "" });
    } else {
      console.error("❌ Submission failed:", data.message || "Server error");
      alert("❌ Message failed to send.");
    }
  } catch (err) {
    console.error("❌ Fetch failed:", err.message);
    alert("❌ Network error. Please try again.");
  }
};

  return (
    <>
      <section>
        <div className="section-contact">
          <div className="container">
            <h1 className="main-heading">Contact Us</h1>
            <div className="contact-grid">
              <div className="contact-card">
                <h2>Send us a message</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="username">Name</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Your name"
                      id="username"
                      required
                      autoComplete="off"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email"
                      id="email"
                      required
                      autoComplete="off"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      name="message"
                      cols="30"
                      rows="6"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      id="message"
                      required
                      autoComplete="off"
                    />
                  </div>

                  <button type="submit" className="btn btn-primary mt-3">
                    Send Message
                  </button>
                </form>
              </div>

              <aside className="contact-info">
                <div className="info-card">
                  <h3>Contact Info</h3>
                  <p><strong>Address:</strong> 123 QuickIT Street, City</p>
                  <p><strong>Phone:</strong> +1 234 567 890</p>
                  <p><strong>Email:</strong> support@apnaapp.com</p>
                </div>

                <div className="info-card map-card">
                  <h3>Location</h3>
                  <div className="map-wrap">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28505.829244579392!2d83.40728009937358!3d26.737078439496237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39915caa7efb1aa1%3A0xcacf9b533af258e2!2sKunraghat%2C%20Gorakhpur%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1753045326744!5m2!1sen!2sin"
                      width="100%"
                      height="220"
                      style={{ border: 0, borderRadius: '0.8rem' }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Google Map"
                    ></iframe>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
      <div style={{ marginTop: "4rem" }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28505.829244579392!2d83.40728009937358!3d26.737078439496237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39915caa7efb1aa1%3A0xcacf9b533af258e2!2sKunraghat%2C%20Gorakhpur%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1753045326744!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map"
        ></iframe>
      </div>
    </>
  );
};
