import { Analytics } from "../components/Analytics";
import React from "react";
import { useAuth } from "../store/auth";
import homeImage from "../assets/home.png";
import designImage from "../assets/design.png";
export const Home = () => {
const { user } = useAuth();
  return (
    <>
      <main>
        {/* Hero Section */}
        <section className="section-hero hero-primary">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              <span className="hero-badge">Welcome</span>
              <h1 className="hero-title">Your Trusted IT Partner</h1>
              <p className="hero-subtitle">Hi {(user)?user.username:"Welcome to QuickIT"}</p>
              <p className="hero-desc">
                Ready to elevate your business with smart, innovative, and secure IT solutions? 
                At <strong>QuickIT</strong>, we deliver cutting-edge digital services tailored 
                to meet your unique business needs.
              </p>
              <div className="btn-group">
                <a href="/contact">
                  <button className="btn btn-primary">Connect Now</button>
                </a>
                <a href="/services">
                  <button className="btn secondary-btn">Learn More</button>
                </a>
              </div>
            </div>

            <div className="hero-image">
              <img
                src={homeImage}
                alt="Team working on code"
                width="400"
                height="500"
              />
            </div>
          </div>
        </section>
      </main>

      {/* 2nd Section */}
      <Analytics />

      {/* 3rd Section */}
      <section className="section-hero hero-secondary">
        <div className="container grid grid-two-cols">
          <div className="hero-image">
            <img
              src={designImage}
              alt="Design collaboration"
              width="400"
              height="500"
            />
          </div>

          <div className="hero-content">
            <span className="hero-badge">Growth</span>
            <h1 className="hero-title">Start Your Digital Journey</h1>
            <p className="hero-subtitle">Here to Help You Succeed</p>
            <p className="hero-desc">
              Whether you're a startup or an enterprise, <strong>QuickIT</strong> is your 
              partner for growth. Reach out today for a free consultation and let's discuss 
              how we can accelerate your business in the digital age.
            </p>
            <div className="btn-group">
              <a href="/contact">
                <button className="btn btn-primary">Connect Now</button>
              </a>
              <a href="/services">
                <button className="btn secondary-btn">Learn More</button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
