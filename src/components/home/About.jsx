import { FiArrowUpRight, FiCheck } from "react-icons/fi";
import { site } from "@/data/site";

export default function About() {
  return (
    <section id="about" className="section about-section" aria-labelledby="about-title">
      <div className="container about-grid">
        <div className="section-heading">
          <p className="eyebrow">01 / THE PERSON BEHIND THE WORK</p>
          <h2 id="about-title" className="section-title">
            Experience first.
            <br />
            Always moving forward.
          </h2>
          <div className="about-signature" aria-hidden="true">
            <span>{site.name}</span>
            <FiArrowUpRight />
          </div>
        </div>
        <div className="about-copy">
          <p className="about-lead">{site.about.intro}</p>
          {site.about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <ul className="about-principles" aria-label="My approach to the work">
            {site.about.principles.map((principle) => (
              <li key={principle}>
                <FiCheck aria-hidden="true" />
                <span>{principle}</span>
              </li>
            ))}
          </ul>
          {site.about.hobbies && (
            <p className="about-interests">{site.about.hobbies}</p>
          )}
          {site.education.length > 0 && (
            <div className="education-list">
              <h3>Education</h3>
              {site.education.map((item) => (
                <div className="education-item" key={`${item.institution}-${item.degree}`}>
                  <h4>{item.degree}{item.field ? ` · ${item.field}` : ""}</h4>
                  <p>{item.institution}{item.year ? ` · ${item.year}` : ""}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
