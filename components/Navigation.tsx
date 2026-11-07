"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { profile, sections } from "@/content/profile";
export function Navigation() {
  const pathname = usePathname();
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (pathname !== "/") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-18% 0px -60% 0px", threshold: 0 },
    );
    document
      .querySelectorAll("main>section[id]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    const outside = (e: PointerEvent) => {
      if (!(e.target as Element).closest(".site-header")) setOpen(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);
  return (
    <header className="site-header">
      <div className="container nav-row">
        <Link
          className="wordmark"
          href="/#home"
          onClick={() => setOpen(false)}
          aria-label={`${profile.name}, home`}
        >
          {profile.name}
        </Link>
        <button
          ref={button}
          className="menu-button"
          aria-controls="main-nav"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? "Close menu" : "Menu"}
          <span aria-hidden="true">{open ? " ×" : " ☰"}</span>
        </button>
        <nav
          id="main-nav"
          aria-label="Main navigation"
          className={open ? "nav-links is-open" : "nav-links"}
        >
          {sections.map(([id, label]) => (
            <Link
              key={id}
              href={`/#${id}`}
              aria-current={
                pathname === "/" && active === id ? "location" : undefined
              }
              onClick={() => {
                setOpen(false);
                setActive(id);
              }}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
