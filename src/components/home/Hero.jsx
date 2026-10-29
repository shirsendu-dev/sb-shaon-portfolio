import Image from "next/image";
import Link from "next/link";
import { FiArrowDown, FiArrowUpRight, FiDownload, FiGlobe } from "react-icons/fi";
import SocialLinks from "@/components/shared/SocialLinks";
import { site } from "@/data/site";

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">
            <span className="status-dot" />
            {site.hero.eyebrow}
          </p>
          <h1>
            {site.hero.title}
            <br />
            <span>{site.hero.accent}</span>
          </h1>
          <p className="hero-description">{site.hero.description}</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/#projects">
              View My Work <FiArrowUpRight aria-hidden="true" />
            </Link>
            {site.resume.available ? (
              <div className="resume-pending">
                <a className="button button-secondary" href={site.resume.path} download>
                  Download Resume <FiDownload aria-hidden="true" />
                </a>
                <a className="resume-view" href={site.resume.path} target="_blank" rel="noopener noreferrer">
                  View résumé <FiArrowUpRight aria-hidden="true" />
                </a>
              </div>
            ) : (
              <span className="button button-secondary" aria-disabled="true">
                Download Resume <FiDownload aria-hidden="true" />
              </span>
            )}
          </div>
          <SocialLinks />
        </div>
        <div className="hero-art">
          <div className="portrait-frame">
            {!site.portrait.available && (
              <div className="portrait-meta">
                <span>THE PERSON BEHIND THE PIXELS</span>
                <span>01 — SB</span>
              </div>
            )}
            {site.portrait.available ? (
              <Image
                className="portrait-image"
                src={site.portrait.src}
                alt={site.portrait.alt}
                fill
                style={{ objectPosition: "center top" }}
                sizes="(max-width: 600px) 100vw, (max-width: 1312px) 40vw, 501px"
                preload
              />
            ) : (
              <div className="portrait-placeholder">
                <div className="portrait-orbit orbit-one" />
                <div className="portrait-orbit orbit-two" />
                <span className="portrait-initials" aria-hidden="true">
                  sb<span>.</span>
                </span>
                <div className="portrait-caption">
                  <span>{site.name.toUpperCase()}</span>
                  <small>Professional portrait to be added</small>
                </div>
              </div>
            )}
            <div className="portrait-corner" aria-hidden="true">
              <FiArrowUpRight />
            </div>
          </div>
          <div className="experience-badge">
            <span>7<span>+</span></span>
            <p>
              Years of experience.
              <br />
              A broader perspective.
            </p>
          </div>
          <div className="remote-note">
            <FiGlobe aria-hidden="true" />
            Remote experience. International perspective.
          </div>
        </div>
      </div>
      <div className="container hero-bottom">
        <span>EXPERIENCE MEETS EVOLUTION</span>
        <Link href="/#about">
          A little more about me <FiArrowDown aria-hidden="true" />
        </Link>
        <span>DESIGN · DEVELOPMENT · DETAIL</span>
      </div>
    </section>
  );
}
