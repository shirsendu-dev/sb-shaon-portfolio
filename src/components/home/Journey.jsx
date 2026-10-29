import { FiArrowRight } from "react-icons/fi";
import { journey } from "@/data/services";

export default function Journey() {
  return (
    <section id="journey" className="section journey-section" aria-labelledby="journey-title">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">07 / ALWAYS BUILDING FORWARD</p>
          <h2 id="journey-title" className="section-title">A stronger foundation.<br />A broader horizon.</h2>
          <p className="section-intro">Modern application development builds on everything I have learned working on professional websites. Each step adds to the next.</p>
        </div>
        <ol className="journey-track">
          {journey.map((step, index) => (
            <li className="journey-step" key={step.title}>
              <div className="journey-marker">
                <span className="item-number">{String(index + 1).padStart(2, "0")}</span>
                {index < journey.length - 1 && <FiArrowRight aria-hidden="true" />}
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
