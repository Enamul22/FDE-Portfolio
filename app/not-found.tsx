import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main-content" className="container not-found">
      <p className="eyebrow">404</p>
      <h1>That page isn’t here.</h1>
      <p>Explore the projects or return to the homepage.</p>
      <Link className="button primary" href="/">
        Back to home →
      </Link>
    </main>
  );
}
