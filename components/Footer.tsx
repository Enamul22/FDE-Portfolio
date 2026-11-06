import Link from "next/link";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <p>© {new Date().getFullYear()} Enamul Haque</p>
        <p>Data. Applications. Practical impact.</p>
        <Link href="/#home">Back to top ↑</Link>
      </div>
    </footer>
  );
}
