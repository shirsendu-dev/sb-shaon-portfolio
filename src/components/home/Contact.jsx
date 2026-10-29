import { FiArrowUpRight, FiMail, FiGithub, FiLinkedin } from "react-icons/fi";
import ContactForm from "./ContactForm";
import { site } from "@/data/site";

export default function Contact() {
  const { contact } = site;
  const channels = [
    {
      label: "Email",
      value: contact.EMAIL,
      href: `mailto:${contact.EMAIL}`,
      icon: FiMail,
    },
    {
      label: "LinkedIn",
      value: "Connect on LinkedIn",
      href: contact.LINKEDIN_URL,
      icon: FiLinkedin,
    },
    {
      label: "GitHub",
      value: "Explore my repositories",
      href: contact.GITHUB_URL,
      icon: FiGithub,
    },
  ];

  return (
    <section className="section contact-section" id="contact" aria-labelledby="contact-heading">
      <div className="container">
        <p className="eyebrow">08 / THE NEXT CONVERSATION</p>
        <div className="contact-heading-row">
          <h2 id="contact-heading">Let’s build<br />something <span>useful.</span></h2>
          <FiArrowUpRight className="contact-big-arrow" aria-hidden="true" />
        </div>
        <div className="contact-grid">
          <div className="contact-summary">
            <p className="contact-intro">
              Have a project or an opportunity worth discussing? I’d like to hear about it.
            </p>
            <p className="section-intro">
              Full-stack roles. Remote opportunities. WordPress projects. Agency collaboration.
              The next good thing starts with a conversation.
            </p>
            <div className="contact-channels">
              {channels.map(({ label, value, href, icon: Icon }) => (
                <a
                  className="contact-channel"
                  key={label}
                  href={href}
                  {...(href.startsWith("https") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <Icon aria-hidden="true" />
                  <span><small>{label}</small><span>{value}</span></span>
                  <FiArrowUpRight aria-hidden="true" />
                </a>
              ))}
            </div>
            <div className="contact-status">
              <span className="status-dot" />Open to meaningful conversations
            </div>
          </div>
          <ContactForm email={contact.EMAIL} />
        </div>
      </div>
    </section>
  );
}
