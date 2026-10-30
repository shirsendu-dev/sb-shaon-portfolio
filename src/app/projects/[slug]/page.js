import { notFound } from "next/navigation";
import ProjectDetails from "@/components/projects/ProjectDetails";
import { projects, getProjectBySlug } from "@/data/projects";
import { site } from "@/data/site";
import { getSiteOrigin } from "@/lib/site-origin";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }, parent) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return { title: "Project not found", robots: { index: false } };

  const parentMetadata = await parent;
  const siteOrigin = getSiteOrigin(site.url);
  const projectUrl = siteOrigin ? `${siteOrigin}/projects/${project.slug}` : null;
  const screenshotUrl = siteOrigin ? new URL(project.heroImage.src, siteOrigin).toString() : null;

  return {
    title: project.title,
    description: project.shortDescription,
    ...(projectUrl ? { alternates: { canonical: projectUrl } } : {}),
    openGraph: {
      ...parentMetadata.openGraph,
      title: `${project.title} | ${site.name}`,
      description: project.shortDescription,
      ...(projectUrl ? { url: projectUrl } : {}),
      ...(screenshotUrl ? {
        images: [{
          url: screenshotUrl,
          width: project.heroImage.width,
          height: project.heroImage.height,
          alt: project.heroImage.alt,
        }],
      } : {}),
    },
    twitter: {
      ...parentMetadata.twitter,
      title: `${project.title} | ${site.name}`,
      description: project.shortDescription,
      ...(screenshotUrl ? { images: [screenshotUrl] } : {}),
    },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return <ProjectDetails project={project} />;
}
