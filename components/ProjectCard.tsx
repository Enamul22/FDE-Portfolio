import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { ExternalLink } from "./Links";
export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <article className="project-card">
      <Link
        className="project-preview"
        href={`/projects/${project.slug}`}
        aria-label={`Read ${project.name} case study`}
      >
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(min-width: 1380px) 24vw, (min-width: 700px) 45vw, 92vw"
        />
        <span className="preview-arrow" aria-hidden="true">
          ↗
        </span>
      </Link>
      <div className="project-copy">
        <p className="eyebrow">
          {String(index + 1).padStart(2, "0")} / {project.name}
        </p>
        <h3>{project.title}</h3>
        <p className="project-summary">{project.summary}</p>
        <ul className="highlights">
          {project.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <ul className="tags" aria-label={`${project.name} technologies`}>
          {project.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <div className="project-actions">
          <Link className="case-link" href={`/projects/${project.slug}`}>
            Case Study <span aria-hidden="true">→</span>
          </Link>
          <ExternalLink
            href={project.live}
            className="demo-link"
            label={`Live Demo: ${project.name}`}
          >
            Live Demo
          </ExternalLink>
          <ExternalLink
            href={project.github}
            className="source-link"
            label={`${project.name} on GitHub`}
          >
            GitHub
          </ExternalLink>
        </div>
      </div>
    </article>
  );
}
