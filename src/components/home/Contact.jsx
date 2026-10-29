import {
  FiArrowUpRight,
  FiMail,
  FiPhone,
  FiGithub,
  FiLinkedin,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { site } from "@/data/site";

export default function Contact() {
  const { contact } = site;
  const channels = [
    {
      label: "Email",
      value: contact.EMAIL,
      href: contact.EMAIL ? `mailto:${contact.EMAIL}` : "",
      icon: FiMail,
    },
    {
      label: "Phone",
      value: contact.PHONE,
      href: contact.PHONE
        ? `tel:${contact.PHONE.replace(/[^+\d]/g, "")}`
        : "",
      icon: FiPhone,
    },
    {
      label: "WhatsApp",
      value: contact.WHATSAPP,
      href: contact.WHATSAPP
        ? `https://wa.me/${contact.WHATSAPP.replace(/\D/g, "")}`
        : "",
      icon: FaWhatsapp,
    },
    {
      label: "LinkedIn",
      value: contact.LINKEDIN_URL ? "Connect on LinkedIn" : "",
      href: contact.LINKEDIN_URL,
      icon: FiLinkedin,
    },
    {
      label: "GitHub",
      value: contact.GITHUB_URL ? "Explore my repositories" : "",
      href: contact.GITHUB_URL,
      icon: FiGithub,
    },
  ];

  return (
    <section
      className="section contact-section"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <div className="container">
        <p className="eyebrow">08 / THE NEXT CONVERSATION</p>
        <div className="contact-heading-row">
          <h2 id="contact-heading">
            Let’s build
            <br />
            something <span>useful.</span>
          </h2>
          <FiArrowUpRight className="contact-big-arrow" aria-hidden="true" />
        </div>
        <div className="contact-grid">
          <div>
            <p className="contact-intro">
              Have a project or an opportunity worth discussing? I’d like to hear
              about it.
            </p>
            <p className="section-intro">
              Full-stack roles. Remote opportunities. WordPress projects. Agency
              collaboration. The next good thing starts with a conversation.
            </p>
            <div className="contact-status">
              <span className="status-dot" />
              Open to meaningful conversations
            </div>
            {!contact.EMAIL && (
              <p className="placeholder-note">
                Contact details will be added before launch.
              </p>
            )}
          </div>
          <div className="contact-channels">
            {channels.map(({ label, value, href, icon: Icon }) => {
              const content = (
                <>
                  <Icon aria-hidden="true" />
                  <span>
                    <small>{label}</small>
                    <span>{value || "Details to be added"}</span>
                  </span>
                  {href && <FiArrowUpRight aria-hidden="true" />}
                </>
              );

              if (!href) {
                return (
                  <div className="contact-channel pending" key={label}>
                    {content}
                  </div>
                );
              }

              return (
                <a
                  className="contact-channel"
                  key={label}
                  href={href}
                  {...(href.startsWith("https")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {content}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
