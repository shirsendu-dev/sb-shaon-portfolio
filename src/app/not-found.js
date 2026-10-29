import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

export default function NotFound() {
  return (
    <main id="main-content" className="container not-found">
      <p className="eyebrow">404 / A LITTLE OFF TRACK</p>
      <h1>
        This page isn’t
        <br />
        part of the plan.
      </h1>
      <p>The page may have moved, or this project doesn’t exist yet.</p>
      <Link className="button button-primary" href="/#projects">
        Explore the work <FiArrowUpRight aria-hidden="true" />
      </Link>
    </main>
  );
}
