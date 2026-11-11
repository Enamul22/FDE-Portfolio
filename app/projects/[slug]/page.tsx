import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { imageDimensions } from "@/content/images";
import { productionOrigin } from "@/content/site";
import { ExternalLink } from "@/components/Links";
export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) return {};
  return {
    title: `${p.name} — ${p.title}`,
    description: p.summary,
    ...(productionOrigin
      ? { alternates: { canonical: `${productionOrigin}/projects/${p.slug}` } }
      : {}),
    openGraph: {
      title: `${p.name} — ${p.title}`,
      description: p.summary,
      images: [{ url: p.image, alt: p.imageAlt }],
    },
  };
}
export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  const p = projects[index];
  if (!p) notFound();
  const next = projects[(index + 1) % projects.length];
  return (
    <main id="main-content" className="case-page container">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/#projects">← All projects</Link>
        <span aria-hidden="true">/</span>
        <span>{p.name}</span>
      </nav>
      <header className="case-header">
        <h1>
          {p.name}
          <span>{p.title}</span>
        </h1>
        <p className="case-summary">{p.summary}</p>
        <ul className="tags" aria-label="Technologies">
          {p.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <div className="hero-actions">
          <ExternalLink href={p.live} className="button primary">
            {p.slug === "fatal-figures" ? "Play Game" : "Live Demo"}
          </ExternalLink>
          <ExternalLink href={p.github} className="button outline">
            View GitHub
          </ExternalLink>
        </div>
      </header>
      <figure className="case-image">
        <Image
          src={p.image}
          alt={p.imageAlt}
          width={imageDimensions[p.image].width}
          height={imageDimensions[p.image].height}
          preload
          sizes="(max-width: 900px) 94vw, 1200px"
        />
        <figcaption>From the {p.name} application.</figcaption>
      </figure>
      <div className="case-body">
        <aside className="case-index">
          <p className="eyebrow">Inside the project</p>
          <nav aria-label="Case study contents">
            {[
              ["problem", "Problem"],
              ["workflow", "Implemented workflow"],
              ["contribution", "My contribution"],
              ["decisions", "Key decisions"],
              ["validation", "Validation & results"],
              ["screenshots", "Screenshots"],
            ].map(([id, label]) => (
              <a href={`#${id}`} key={id}>
                {label}
              </a>
            ))}
          </nav>
        </aside>
        <div className="case-prose">
          <section id="problem">
            <h2>The problem</h2>
            <p>{p.problem}</p>
            <div className="context-note">
              <h3>Project context</h3>
              <p>{p.context}</p>
            </div>
          </section>
          <section id="workflow">
            <h2>The implemented workflow</h2>
            <ol className="workflow-diagram" aria-label={`${p.name} workflow`}>
              {p.workflow.map((step, i) => (
                <li key={step}>
                  <span aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </section>
          <section id="contribution">
            <h2>My contribution</h2>
            <p>{p.contribution}</p>
          </section>
          <section id="decisions">
            <h2>Key decisions</h2>
            {p.decisions.map((d) => (
              <div className="decision" key={d.title}>
                <h3>{d.title}</h3>
                <p>{d.body}</p>
              </div>
            ))}
          </section>
          <section id="validation">
            <h2>Validation & results</h2>
            <ul className="validation-list">
              {p.validation.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
            <div className="evidence-links">
              {p.evidence.map((e) => (
                <ExternalLink
                  key={e.label}
                  href={`${p.github}/blob/main/${e.href}`}
                >
                  {e.label}
                </ExternalLink>
              ))}
            </div>
          </section>
          <section id="screenshots">
            <h2>Inside the application</h2>
            {p.gallery.map((g) => (
              <figure className="gallery-image" key={g.src}>
                <Image
                  src={g.src}
                  alt={g.alt}
                  width={imageDimensions[g.src].width}
                  height={imageDimensions[g.src].height}
                  sizes="(max-width: 900px) 94vw, 920px"
                />
                <figcaption>{g.caption}</figcaption>
              </figure>
            ))}
          </section>
          <div className="case-end">
            <h2>Explore {p.name}</h2>
            <div className="hero-actions">
              <ExternalLink className="button primary" href={p.live}>
                {p.slug === "fatal-figures" ? "Play Game" : "Live Demo"}
              </ExternalLink>
              <ExternalLink className="button outline" href={p.github}>
                View GitHub
              </ExternalLink>
            </div>
          </div>
        </div>
      </div>
      <nav className="next-project" aria-label="Project navigation">
        <Link href="/#projects">← All projects</Link>
        <Link href={`/projects/${next.slug}`}>Next: {next.name} →</Link>
      </nav>
    </main>
  );
}
