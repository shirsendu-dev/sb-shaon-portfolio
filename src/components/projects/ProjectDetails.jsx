import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiArrowRight, FiArrowUpRight, FiGithub } from "react-icons/fi";
import { projects } from "@/data/projects";

function DetailSection({ title, children }) {
  return (
    <section className="detail-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default function ProjectDetails({ project }) {
  const titles = project.sectionTitles || {};
  const projectIndex = projects.findIndex((item) => item.slug === project.slug);
  const previousProject = projects[(projectIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const websiteAddress = project.liveUrl
    ? project.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : project.shortTitle;
  const isBusinessProject = project.tone === "business";

  return (
    <main id="main-content" className={`project-detail project-detail-${project.tone}`}>
      <div className="container">
        <Link href="/#projects" className="text-link detail-back">
          <FiArrowLeft aria-hidden="true" /> Back to projects
        </Link>

        <header className="detail-hero">
          <p className="eyebrow">CASE STUDY / {project.projectType}</p>
          <h1>{project.title}</h1>
          <p className="detail-lead">{project.shortDescription}</p>
          <div className="project-links detail-actions">
            {project.liveUrl && (
              <a className="button button-primary" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                Visit live site <FiArrowUpRight aria-hidden="true" />
              </a>
            )}
            {project.githubUrl && (
              <a className="button button-secondary" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                View GitHub repository <FiGithub aria-hidden="true" />
              </a>
            )}
          </div>
        </header>

        <figure className="detail-image">
          <div className="detail-browser-bar" aria-hidden="true">
            <span className="detail-browser-dots"><span /><span /><span /></span>
            <span className="detail-browser-address">{websiteAddress}</span>
          </div>
          <a href={project.heroImage.src} target="_blank" rel="noopener noreferrer" aria-label={`Open full screenshot of ${project.shortTitle}`}>
            <Image
              src={project.heroImage.src}
              alt={project.heroImage.alt}
              width={project.heroImage.width}
              height={project.heroImage.height}
              sizes="(max-width: 1312px) 100vw, 1200px"
              preload
            />
          </a>
        </figure>

        <div className="detail-layout">
          <aside className="detail-sidebar" aria-label="Project information">
            <dl className="detail-facts">
              <div><dt>Project type</dt><dd>{project.projectType}</dd></div>
              {project.role && <div><dt>My role</dt><dd>{project.role}</dd></div>}
              {(project.dateLabel || project.year) && (
                <div><dt>Date</dt><dd>{project.dateLabel || project.year}</dd></div>
              )}
              {project.client && <div><dt>Business</dt><dd>{project.client}</dd></div>}
            </dl>
            {project.techStack.length > 0 && (
              <>
                <h2 className="detail-stack-title">Technology stack</h2>
                <ul className="tags" aria-label="Project technologies">
                  {project.techStack.map((technology) => <li className="tag" key={technology}>{technology}</li>)}
                </ul>
              </>
            )}
          </aside>

          <div className="detail-content">
            {project.overview.length > 0 && (
              <DetailSection title="Overview">
                {project.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </DetailSection>
            )}
            {project.objective && (
              <DetailSection title={titles.objective || "The objective"}>
                <p>{project.objective}</p>
              </DetailSection>
            )}
            {project.approach.length > 0 && (
              <DetailSection title={titles.approach || "My approach"}>
                {project.approach.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </DetailSection>
            )}
            {project.keyFeatures.length > 0 && (
              <DetailSection title="Key features">
                <ul className="detail-list detail-feature-list">
                  {project.keyFeatures.map((feature) => <li key={feature}>{feature}</li>)}
                </ul>
              </DetailSection>
            )}
            {project.challenges.length > 0 && (
              <DetailSection title={titles.challenges || "Development challenges"}>
                {project.challenges.map((challenge) => (
                  <article className="detail-challenge" key={challenge.title}>
                    <h3>{challenge.title}</h3>
                    <p>{challenge.description}</p>
                    {challenge.solution && (
                      <p className="detail-solution">
                        <strong>{isBusinessProject ? "The site response" : "How I handled it"}</strong>{" "}
                        {challenge.solution}
                      </p>
                    )}
                  </article>
                ))}
              </DetailSection>
            )}
            {project.whatILearned.length > 0 && (
              <DetailSection title={titles.learning || "What I learned"}>
                <ul className="detail-list">
                  {project.whatILearned.map((learning) => <li key={learning}>{learning}</li>)}
                </ul>
              </DetailSection>
            )}
            {project.outcome && (
              <DetailSection title={titles.outcome || "The outcome"}>
                <p>{project.outcome}</p>
              </DetailSection>
            )}
            {project.futureImprovements.length > 0 && (
              <DetailSection title="Future improvements">
                <ul className="detail-list">
                  {project.futureImprovements.map((improvement) => <li key={improvement}>{improvement}</li>)}
                </ul>
              </DetailSection>
            )}
          </div>
        </div>

        {project.gallery.length > 0 && (
          <section className="detail-gallery" aria-labelledby="project-gallery-title">
            <div className="section-heading">
              <p className="eyebrow">A CLOSER LOOK</p>
              <h2 id="project-gallery-title" className="section-title">
                {isBusinessProject ? "From discovery to product detail." : "Inside the application."}
              </h2>
            </div>
            {project.gallery.map((image, index) => (
              <figure className="detail-gallery-item" key={image.src}>
                <a className="detail-gallery-image" href={image.src} target="_blank" rel="noopener noreferrer" aria-label={`Open full screenshot: ${image.alt}`}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes="(max-width: 1312px) 100vw, 1200px"
                  />
                </a>
                <figcaption className="detail-gallery-copy">
                  <span className="eyebrow">{String(index + 1).padStart(2, "0")} / SCREENSHOT</span>
                  <p>{image.caption}</p>
                </figcaption>
              </figure>
            ))}
          </section>
        )}

        {project.sources?.length > 0 && (
          <aside className="detail-sources" aria-label="Project references">
            <p>Project references</p>
            <ul>
              {project.sources.map((source) => (
                <li key={source.url}>
                  <a className="text-link" href={source.url} target="_blank" rel="noopener noreferrer">
                    {source.label} <FiArrowUpRight aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        )}

        {projects.length > 1 && (
          <nav className="project-pagination" aria-label="More project case studies">
            <Link className="project-pagination-item" href={`/projects/${previousProject.slug}`}>
              <span className="pagination-direction"><FiArrowLeft aria-hidden="true" /> Previous project</span>
              <span className="pagination-title">{previousProject.shortTitle}</span>
            </Link>
            <Link className="project-pagination-item" href={`/projects/${nextProject.slug}`}>
              <span className="pagination-direction">Next project <FiArrowRight aria-hidden="true" /></span>
              <span className="pagination-title">{nextProject.shortTitle}</span>
            </Link>
          </nav>
        )}
        <div className="detail-bottom">
          <Link href="/#projects" className="text-link"><FiArrowLeft aria-hidden="true" /> Back to projects</Link>
          <Link href="/#contact" className="text-link">Discuss a project <FiArrowUpRight aria-hidden="true" /></Link>
        </div>
      </div>
    </main>
  );
}
