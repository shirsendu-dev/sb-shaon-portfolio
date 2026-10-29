import { projects } from "@/data/projects";
import ProjectCard from "@/components/projects/ProjectCard";

export default function Projects() {
  return (
    <section id="projects" className="section projects-section" aria-labelledby="projects-title">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">05 / SELECTED WORK</p>
            <h2 id="projects-title" className="section-title">Thoughtful builds.<br />Practical purpose.</h2>
          </div>
          <p className="section-intro">
            Modern applications and professional website work. A closer look at the thinking, technology, and work behind each build.
          </p>
        </div>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
