import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight, FiExternalLink, FiGithub } from "react-icons/fi";

export default function ProjectCard({ project, index }) {
  return (
    <article
      className={`project-card${project.featured ? " project-card-featured" : ""}`}
      data-tone={project.tone}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="project-visual"
        aria-label={`View ${project.shortTitle} case study`}
      >
        <Image
          src={project.heroImage.src}
          alt={project.heroImage.alt}
          width={project.heroImage.width}
          height={project.heroImage.height}
          sizes="(max-width: 600px) 100vw, (max-width: 1312px) 50vw, 590px"
        />
        <span className="project-visual-arrow" aria-hidden="true"><FiArrowUpRight /></span>
      </Link>
      <div className="project-info">
        <div className="project-type">
          <span>{String(index + 1).padStart(2, "0")} / {project.projectType}</span>
          {project.year && <span className="project-year">{project.year}</span>}
        </div>
        <h3><Link href={`/projects/${project.slug}`}>{project.shortTitle}</Link></h3>
        <p className="project-description">{project.shortDescription}</p>
        {project.techStack.length > 0 && (
          <ul className="tags" aria-label="Project technologies">
            {project.techStack.slice(0, 4).map((technology) => <li className="tag" key={technology}>{technology}</li>)}
          </ul>
        )}
        <div className="project-links">
          <Link className="text-link" href={`/projects/${project.slug}`}>
            View case study <FiArrowUpRight aria-hidden="true" />
          </Link>
          {project.liveUrl && (
            <a className="text-link" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              Live site <FiExternalLink aria-hidden="true" />
            </a>
          )}
          {project.githubUrl && (
            <a className="text-link" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              GitHub <FiGithub aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
