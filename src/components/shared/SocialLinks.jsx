import { FiGithub, FiLinkedin, FiMail, FiArrowUpRight } from "react-icons/fi";
import { site } from "@/data/site";

const socials = [
  { label: "GitHub", key: "GITHUB_URL", icon: FiGithub },
  { label: "LinkedIn", key: "LINKEDIN_URL", icon: FiLinkedin },
  { label: "Email", key: "EMAIL", icon: FiMail },
];

export default function SocialLinks() {
  return (
    <div className="social-links" aria-label="Social profiles and email">
      {socials.map(({ label, key, icon: Icon }) => {
        const value = site.contact[key];

        if (!value) {
          return (
            <span
              key={key}
              className="social-placeholder"
              title={`${label} — link to be supplied`}
            >
              <Icon aria-hidden="true" />
              <span>{label}</span>
              <span className="sr-only"> — link to be supplied</span>
            </span>
          );
        }

        return (
          <a
            key={key}
            href={key === "EMAIL" ? `mailto:${value}` : value}
            {...(key !== "EMAIL"
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            <Icon aria-hidden="true" />
            <span>{label}</span>
            <FiArrowUpRight className="social-arrow" aria-hidden="true" />
          </a>
        );
      })}
    </div>
  );
}
