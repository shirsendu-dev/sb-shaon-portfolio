import { notFound } from "next/navigation";
import ProjectDetails from "@/components/projects/ProjectDetails";
import { projects, getProjectBySlug } from "@/data/projects";
import { site } from "@/data/site";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }, parent) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return { title: "Project not found" };

  const parentMetadata = await parent;
  const projectUrl = site.url ? `${site.url.replace(/\/$/, "")}/projects/${project.slug}` : undefined;

  return {
    title: project.title,
    description: project.summary,
    ...(projectUrl ? { alternates: { canonical: projectUrl } } : {}),
    openGraph: {
      ...parentMetadata.openGraph,
      title: `${project.title} | ${site.name}`,
      description: project.summary,
      ...(projectUrl ? { url: projectUrl } : {}),
    },
    twitter: {
      ...parentMetadata.twitter,
      title: `${project.title} | ${site.name}`,
      description: project.summary,
    },
    ...(project.isPlaceholder ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return <ProjectDetails project={project} />;
}
