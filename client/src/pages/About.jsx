import { Analytics } from "../components/Analytics";

export const About = () => {
  const features = [
    {
      title: "Expertise",
      description: "Our team consists of experienced IT professionals who are passionate about staying up-to-date with the latest industry trends.",
      icon: "⚡"
    },
    {
      title: "Customization",
      description: "We understand that every business is unique. That's why we create solutions tailored to your specific needs and goals.",
      icon: "🎯"
    },
    {
      title: "Customer-Centric",
      description: "We prioritize your satisfaction and provide top-notch support to address your IT concerns.",
      icon: "💼"
    },
    {
      title: "Affordability",
      description: "We offer competitive pricing without compromising on the quality of our services.",
      icon: "💰"
    },
    {
      title: "Reliability",
      description: "Count on us to be there when you need us. We're committed to ensuring your IT environment is reliable 24/7.",
      icon: "🛡️"
    }
  ];

  return (
    <>
      <main>
        <section className="about-section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              <p>Welcome to QuickIT</p>
              <h1>Why Choose Us?</h1>
              <p>
               Expertise: Our team consists of experienced IT professionals who are passionate about staying up-to-date with the latest industry trends.
              </p>
              <p>Customization: We understand that every business is unique. That’s why we create solutions that are tailored to your specific needs and goals.</p>
              <p>Customer-Centric Approach: We prioritize your satisfaction and provide top-notch support to address your IT concerns.</p>
              <p>Affordability: We offer competitive pricing without compromising on the quality of our services.</p>
              <p>Reliability: Count on us to be there when you need us. We’re committed to ensuring your IT environment is reliable and available 24/7.</p>
              <div className="btn btn-group">
                <a href="/contact">
                  <button className="btn">Connect Now</button>
                </a>
                <a href="/services">
                  <button className="btn secondary-btn">Learn More</button>
                </a>
              </div>
            </div>

            <div className="hero-image">
              <img
                src="/src/assets/about.png"
                alt="Team working on code"
                width="400"
                height="500"

              />
            </div>
          </div>
        </section>

        <section className="about-features">
          <div className="container">
            <h2 className="main-heading">Our Key Strengths</h2>
            <div className="about-features-grid">
              {features.map((feature, index) => (
                <div className="feature-card" key={index}>
                  <div className="icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Analytics />
    </>
  );
};