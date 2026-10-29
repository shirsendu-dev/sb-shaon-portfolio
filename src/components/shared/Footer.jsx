import Link from "next/link";
import { cacheLife } from "next/cache";
import { FiArrowUpRight } from "react-icons/fi";
import SocialLinks from "./SocialLinks";
import { site } from "@/data/site";

export default async function Footer() {
  "use cache";
  // Cache the year for prerendering and refresh it daily under Cache Components.
  cacheLife("days");
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div>
          <Link className="brand" href="/#home">
            {site.name}<span className="accent">.</span>
          </Link>
          <p>{site.role}</p>
        </div>
        <SocialLinks />
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        <p>Thoughtfully designed. Carefully built.</p>
        <Link href="/#home">
          Back to top <FiArrowUpRight aria-hidden="true" />
        </Link>
      </div>
    </footer>
  );
}
