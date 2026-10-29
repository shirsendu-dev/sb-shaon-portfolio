import { skills } from "@/data/skills";

export default function Skills() {
  return (
    <section id="skills" className="section skills-section" aria-labelledby="skills-title">
      <div className="container">
        <div className="section-heading section-heading-split">
          <div>
            <p className="eyebrow">03 / THE TOOLKIT</p>
            <h2 id="skills-title" className="section-title">The right tools.<br />A considered approach.</h2>
          </div>
          <p className="section-intro">An established WordPress foundation, an expanding JavaScript stack, and attention to the details that matter in production.</p>
        </div>
        <div className="skills-grid">
          {skills.map((category, index) => (
            <div className="skill-group" key={category.name}>
              <h3><span className="item-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{category.name}</h3>
              <ul className="skill-list">
                {category.items.map((skill) => <li key={skill}>{skill}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
