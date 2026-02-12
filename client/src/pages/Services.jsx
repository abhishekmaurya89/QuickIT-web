import { useAuth } from "../store/auth";
import designImage from "../assets/design.png";

export const Services = () => {
  const { services } = useAuth();
console.log("Services Data:", services);
  return (
    <section className="section-services">
      <div className="container">
        <div className="services-grid">
          {services.map((curr, ind) => {
            const { price, provider, service, description } = curr;

            return (
              <article className="card" key={ind}>
                <div className="card-media">
                  <img src={designImage} alt={service} />
                </div>

                <div className="card-body">
                  <div className="card-head">
                    <h3 className="card-title">{service}</h3>
                    <span className="price-badge">${price}</span>
                  </div>

                  <p className="card-desc">{description}</p>

                  <div className="card-meta">
                    <span className="provider">{provider}</span>
                    <button className="card-cta">View</button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
