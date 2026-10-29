import { FiArrowUpRight } from "react-icons/fi";
import { services } from "@/data/services";

export default function Services() {
  return (
    <section id="services" className="section services-section" aria-labelledby="services-title">
      <div className="container">
        <div className="section-heading section-heading-split">
          <div>
            <p className="eyebrow">06 / HOW I CAN HELP</p>
            <h2 id="services-title" className="section-title">From a better website<br />to the next big build.</h2>
          </div>
          <p className="section-intro">Practical development support for businesses, agency teams, and products ready for their next step.</p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <article className="service-item" key={service.title}>
              <span className="item-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
              <FiArrowUpRight className="service-arrow" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
