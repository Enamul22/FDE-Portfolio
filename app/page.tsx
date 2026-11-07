import Image from "next/image";
import Link from "next/link";
import { profile } from "@/content/profile";
import { skills } from "@/content/skills";
import { experience } from "@/content/experience";
import { projects } from "@/content/projects";
import { education } from "@/content/education";
import { credentials } from "@/content/credentials";
import { productionOrigin } from "@/content/site";
import { ExternalLink } from "@/components/Links";
import { CvDownload } from "@/components/CvDownload";
import { ProjectCard } from "@/components/ProjectCard";
import type { Metadata } from "next";
export const metadata: Metadata = {
  ...(productionOrigin ? { alternates: { canonical: productionOrigin } } : {}),
};
export default function Home() {
  return (
    <main id="main-content">
      <section
        id="home"
        className="hero container"
        aria-labelledby="hero-title"
      >
        <div className="hero-copy">
          <p className="eyebrow">Data systems. Human decisions.</p>
          <h1 id="hero-title">
            {profile.name}
            <span>{profile.statement}</span>
          </h1>
          <p className="hero-headline">{profile.headline}</p>
          <p className="hero-intro">{profile.intro}</p>
          <div className="hero-actions">
            <Link className="button primary" href="#projects">
              View Projects <span aria-hidden="true">→</span>
            </Link>
            <Link className="button outline" href="#contact">
              Contact <span aria-hidden="true">↗</span>
            </Link>
            <CvDownload />
          </div>
          <div className="social-links">
            {profile.links.map((l) => (
              <ExternalLink key={l.label} href={l.href}>
                {l.label}
              </ExternalLink>
            ))}
          </div>
        </div>
        <figure className="hero-portrait">
          <div className="portrait-frame">
            <Image
              src="/images/enamul-haque.webp"
              alt="Enamul Haque in a dark suit against a purple background"
              fill
              preload
              sizes="(max-width: 800px) 85vw, 400px"
            />
          </div>
          <figcaption>
            <span className="location-dot" aria-hidden="true" />
            {profile.location}
          </figcaption>
        </figure>
      </section>
      <section
        id="about"
        className="section about-section"
        aria-labelledby="about-title"
      >
        <div className="container split-section">
          <div>
            <p className="eyebrow">
              <span>01</span>About
            </p>
            <h2 id="about-title">
              Grounded in Statistics &amp; Data Analytics
              <br />
              Built for action.
            </h2>
          </div>
          <div className="about-copy">
            {profile.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="loop-label">
              The delivery loop in my professional work
            </p>
            <ol
              className="delivery-loop"
              aria-label="Professional delivery workflow"
            >
              {[
                "Enterprise sources",
                "Data integration",
                "Pipelines",
                "Ontology",
                "Applications",
                "Work orders",
                "Feedback",
              ].map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>
      <section
        id="skills"
        className="section container"
        aria-labelledby="skills-title"
      >
        <div className="section-heading">
          <p className="eyebrow">
            <span>02</span>Skills
          </p>
          <h2 id="skills-title">Capabilities across the workflow.</h2>
          <p className="section-intro">
            Enterprise delivery experience, supported by hands-on independent
            applications.
          </p>
        </div>
        <div className="skills-grid">
          {skills.map((s, i) => (
            <article className="skill-card" key={s.title}>
              <span className="skill-number" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{s.title}</h3>
              <p>{s.statement}</p>
              <div className="skill-keywords">
                {s.groups.map((g) => (
                  <p key={g}>{g}</p>
                ))}
              </div>
              <div className="evidence-links">
                {s.links.map((l) => (
                  <Link key={l.label} href={l.href}>
                    {l.label} <span aria-hidden="true">↗</span>
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
      <section
        id="experience"
        className="section experience-section"
        aria-labelledby="experience-title"
      >
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">
              <span>03</span>Professional experience
            </p>
            <h2 id="experience-title">
              Connecting industrial data
              <br />
              to operational decisions.
            </h2>
          </div>
          <div className="experience-list">
            {experience.map((e, i) => (
              <article className="experience-entry" key={e.title}>
                <div className="experience-meta">
                  <p className="company">{e.company}</p>
                  <p>{e.dates}</p>
                  <p>{e.location}</p>
                </div>
                <div className="experience-body">
                  <h3>{e.title}</h3>
                  <ul className="responsibilities">
                    {e.responsibilities.map((r) => (
                      <li key={r.title}>
                        <strong>{r.title}:</strong> {r.body}
                      </li>
                    ))}
                  </ul>
                  <div className="impact">
                    <h4>Impact</h4>
                    {e.impact.map((p) => (
                      <p key={p.text}>
                        {p.label && <strong>{p.label} </strong>}
                        {i === 0 && p.label === "Compute efficiency." ? (
                          <>
                            {p.text.split("more than 50%")[0]}
                            <strong>more than 50%</strong>.
                          </>
                        ) : (
                          p.text
                        )}
                      </p>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section
        id="projects"
        className="section container"
        aria-labelledby="projects-title"
      >
        <div className="heading-row">
          <div className="section-heading">
            <p className="eyebrow">
              <span>04</span>Projects
            </p>
            <h2 id="projects-title">Ideas, made operational.</h2>
            <p className="section-intro">
              Independent projects spanning explainable analytics, maintenance
              workflows and real-time software.
            </p>
          </div>
          <ExternalLink href={profile.links[0].href} className="text-link">
            Explore GitHub
          </ExternalLink>
        </div>
        <div className="project-grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>
      <section
        id="education"
        className="section education-section"
        aria-labelledby="education-title"
      >
        <div className="container split-section">
          <div>
            <p className="eyebrow">
              <span>05</span>Education
            </p>
            <h2 id="education-title">
              A foundation
              <br />
              in statistical thinking.
            </h2>
          </div>
          <div className="education-timeline">
            {education.map((e) => (
              <article key={e.degree}>
                <p className="date">{e.dates}</p>
                <h3>{e.degree}</h3>
                <p className="institution">{e.institution}</p>
                {e.scholarship && (
                  <div className="scholarship">
                    <p className="eyebrow">Scholarship</p>
                    <p>{e.scholarship}</p>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
      <section
        id="certifications"
        className="section container"
        aria-labelledby="certifications-title"
      >
        <div className="section-heading">
          <p className="eyebrow">
            <span>06</span>Certifications
          </p>
          <h2 id="certifications-title">Learning through building.</h2>
        </div>
        {credentials.map((c) => (
          <article className="credential-card" key={c.id}>
            <div className="credential-mark" aria-hidden="true">
              P<span>Learn</span>
            </div>
            <div>
              <p className="eyebrow">{c.kind}</p>
              <h3>{c.title}</h3>
              <p>
                {c.organization} <span aria-hidden="true">·</span>{" "}
                <time dateTime={c.completed}>{c.date}</time>
              </p>
              <p className="credential-id">Credential ID: {c.id}</p>
            </div>
            <ExternalLink className="button outline" href={c.url}>
              Verify credential
            </ExternalLink>
          </article>
        ))}
      </section>
      <section
        id="contact"
        className="section contact-section"
        aria-labelledby="contact-title"
      >
        <div className="container split-section">
          <div>
            <p className="eyebrow">
              <span>07</span>Contact
            </p>
            <h2 id="contact-title">
              Let’s build
              <br />
              something useful.
            </h2>
          </div>
          <div>
            <p className="contact-copy">
              I’m interested in forward-deployed engineer/data &amp; analytics
              engineer related roles—working with similar minds to turn complex
              problems into useful, dependable systems.
            </p>
            <a className="contact-email" href={`mailto:${profile.email}`}>
              {profile.email} <span aria-hidden="true">↗</span>
            </a>
            <p>{profile.location}</p>
            <div className="social-links">
              {profile.links.map((l) => (
                <ExternalLink key={l.label} href={l.href}>
                  {l.label}
                </ExternalLink>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
