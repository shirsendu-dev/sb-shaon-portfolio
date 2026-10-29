import { FiArrowUpRight, FiCheck, FiGlobe } from "react-icons/fi";
import { experience, professionalDevelopment } from "@/data/experience";

export default function Experience() {
  return (
    <section id="experience" className="section experience-section" aria-labelledby="experience-title">
      <div className="container">
        <div className="section-heading section-heading-split">
          <div>
            <p className="eyebrow">04 / BUILT IN THE REAL WORLD</p>
            <h2 id="experience-title" className="section-title">Real websites.<br />Real responsibilities.</h2>
          </div>
          <p className="section-intro">Years of working with businesses, collaborating remotely, and taking care of websites long after launch.</p>
        </div>
        <div className="experience-list">
          {experience.map((item, index) => (
            <article className="experience-item" key={item.role}>
              <div className="experience-meta">
                <span className="item-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                {item.duration && <p className="experience-duration">{item.duration}</p>}
                <p className="experience-location"><FiGlobe aria-hidden="true" />{item.type}</p>
              </div>
              <div className="experience-body">
                <p className="experience-organization">{item.organization}</p>
                <h3>{item.role}</h3>
                <p className="experience-summary">{item.summary}</p>
                <ul className="experience-highlights">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}><FiCheck aria-hidden="true" /><span>{highlight}</span></li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
        <aside className="development-note" aria-labelledby="development-title">
          <div className="development-icon"><FiArrowUpRight aria-hidden="true" /></div>
          <div>
            <p className="eyebrow">CURRENT PROFESSIONAL DEVELOPMENT</p>
            <h3 id="development-title">{professionalDevelopment.title}</h3>
            <p>{professionalDevelopment.summary}</p>
            <ul className="tags" aria-label="Current development focus">
              {professionalDevelopment.skills.map((skill) => <li className="tag" key={skill}>{skill}</li>)}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
