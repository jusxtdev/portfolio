import { FiMail, FiMapPin } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa6";
import { SiGithub, SiX } from "react-icons/si";

function ContactSection() {
  const footerLinks = [
    { label: "Projects", href: "#projects" },
    { label: "Tech Stack", href: "#tech-stack" },
    { label: "Contact", href: "#contact" },
  ];

  const contactLinks = [
    { label: "GitHub", href: "https://github.com/jusxtdev", icon: SiGithub },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/jusxtdev",
      icon: FaLinkedinIn,
    },
    { label: "Twitter", href: "https://x.com/DevPrajapati25", icon: SiX },
    { label: "Gmail", href: "mailto:jusxtdev@gmail.com", icon: FiMail },
  ];

  return (
    <section
      className="mt-12 scroll-mt-16 border-y border-[#282828] bg-[#101010] py-8"
      id="contact"
    >
      <div className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-start">
        <div>
          <h2 className="text-lg font-semibold tracking-normal text-[#DADADA]">
            Dev Prajapati
          </h2>
          <p className="mt-2 text-sm text-[#808080]">Backend Developer</p>
          <p className="mt-3 flex items-center gap-2 text-sm text-[#808080]">
            <FiMapPin aria-hidden="true" className="h-4 w-4" />
            India
          </p>
        </div>

        <div className="sm:text-right">
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap gap-4 text-sm text-[#808080] sm:justify-end"
          >
            {footerLinks.map((link) => (
              <a
                className="transition hover:text-[#FFC799] focus-visible:text-[#FFC799] focus-visible:outline-none"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-6 flex flex-wrap gap-3 sm:justify-end">
            {contactLinks.map((link) => {
              const Icon = link.icon;

              return (
                <a
                  aria-label={link.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#282828] bg-[#161616] text-[#B0B0B0] transition hover:border-[#FFC799] hover:bg-[#232323] hover:text-[#FFC799] focus-visible:border-[#FFC799] focus-visible:text-[#FFC799] focus-visible:outline-none"
                  href={link.href}
                  key={link.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Icon aria-hidden="true" className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
