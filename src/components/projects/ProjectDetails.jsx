import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiArrowUpRight, FiGithub } from "react-icons/fi";

function DetailSection({ title, children }) {
  return (
    <section className="detail-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function Pending({ children }) {
  return <p className="placeholder-note">TODO — {children}</p>;
}

export default function ProjectDetails({ project }) {
  return (
    <main id="main-content" className="project-detail">
      <div className="container">
        <Link href="/#projects" className="text-link detail-back">
          <FiArrowLeft aria-hidden="true" /> Back to projects
        </Link>

        <header className="detail-hero">
          <p className="eyebrow">CASE STUDY / {project.type}</p>
          <h1>{project.title}</h1>
          <p className="detail-lead">{project.summary}</p>
          <div className="project-links detail-actions">
            {project.liveUrl ? (
              <a className="button button-primary" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                Visit live website <FiArrowUpRight aria-hidden="true" />
              </a>
            ) : <span className="placeholder-note">Live website — TODO: add URL</span>}
            {project.githubUrl ? (
              <a className="button button-secondary" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                Client repository <FiGithub aria-hidden="true" />
              </a>
            ) : <span className="placeholder-note">Client repository — TODO: add URL if shareable</span>}
          </div>
        </header>

        <figure className="detail-image">
          <Image
            src={project.screenshot}
            alt={project.screenshotAlt}
            width={1200}
            height={780}
            sizes="(max-width: 1199px) 100vw, 1120px"
            preload
          />
          {project.screenshotIsPlaceholder && (
            <figcaption className="placeholder-note">Illustrative project artwork. A verified project screenshot will replace this preview.</figcaption>
          )}
        </figure>

        {project.verificationNote && <p className="detail-notice">{project.verificationNote}</p>}

        <div className="detail-layout">
          <aside className="detail-sidebar" aria-label="Project information">
            <dl className="detail-facts">
              <div><dt>Project type</dt><dd>{project.type}</dd></div>
              <div><dt>My role</dt><dd>{project.role || "TODO — add verified role"}</dd></div>
              {project.client && <div><dt>Client / company</dt><dd>{project.client}</dd></div>}
            </dl>
            <h2 className="detail-stack-title">Technology stack</h2>
            {project.technologies.length > 0 ? (
              <ul className="tags">
                {project.technologies.map((technology) => <li className="tag" key={technology}>{technology}</li>)}
              </ul>
            ) : <Pending>Add technologies used in the real project.</Pending>}
          </aside>

          <div className="detail-content">
            <DetailSection title="The objective">
              {project.objective ? <p>{project.objective}</p> : <Pending>Add the problem, business need, and project objective.</Pending>}
            </DetailSection>
            <DetailSection title="The approach">
              {project.solution ? <p>{project.solution}</p> : <Pending>Describe the solution that was actually implemented.</Pending>}
            </DetailSection>
            <DetailSection title="Key features">
              {project.features.length > 0 ? (
                <ul className="detail-list">{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
              ) : <Pending>Add verified project features.</Pending>}
            </DetailSection>
            <DetailSection title="My responsibilities">
              {project.responsibilities.length > 0 ? (
                <ul className="detail-list">{project.responsibilities.map((responsibility) => <li key={responsibility}>{responsibility}</li>)}</ul>
              ) : <Pending>Add the work you personally delivered.</Pending>}
            </DetailSection>
            <DetailSection title="Challenges & decisions">
              {project.challenges.length > 0 ? project.challenges.map((item) => (
                <div className="detail-challenge" key={item.challenge}>
                  <h3>{item.challenge}</h3>
                  <p>{item.resolution}</p>
                </div>
              )) : <Pending>Document a real development challenge and how you handled it.</Pending>}
            </DetailSection>
            <DetailSection title="What I learned">
              {project.learnings.length > 0 ? (
                <ul className="detail-list">{project.learnings.map((learning) => <li key={learning}>{learning}</li>)}</ul>
              ) : <Pending>Add your own technical and project takeaways.</Pending>}
            </DetailSection>
            <DetailSection title="Future improvements">
              {project.futureImprovements.length > 0 ? (
                <ul className="detail-list">{project.futureImprovements.map((improvement) => <li key={improvement}>{improvement}</li>)}</ul>
              ) : <Pending>Add the next improvements you actually plan to build.</Pending>}
            </DetailSection>
            <DetailSection title="The outcome">
              {project.outcome ? <p>{project.outcome}</p> : <Pending>Add a verified outcome when the project details are ready.</Pending>}
            </DetailSection>
          </div>
        </div>

        <div className="detail-bottom">
          <Link href="/#projects" className="text-link"><FiArrowLeft aria-hidden="true" /> Back to projects</Link>
          <Link href="/#contact" className="text-link">Discuss a project <FiArrowUpRight aria-hidden="true" /></Link>
        </div>
      </div>
    </main>
  );
}
