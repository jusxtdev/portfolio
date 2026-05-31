import { FiFileText, FiMail } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa6";
import { SiGithub, SiX } from "react-icons/si";
import resumePdf from "../assets/resume.pdf";

function SocialLinks({ className = "" }) {
  const links = [
    {
      label: "GitHub",
      href: "https://github.com/jusxtdev",
      icon: SiGithub,
      className: "hover:border-[#50B5AA] hover:text-[#50B5AA]",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/jusxtdev",
      icon: FaLinkedinIn,
      className: "hover:border-[#50B5AA] hover:text-[#50B5AA]",
    },
    {
      label: "Twitter",
      href: "https://x.com/DevPrajapati25",
      icon: SiX,
      className: "hover:border-[#50B5AA] hover:text-[#50B5AA]",
    },
    {
      label: "Email",
      href: "mailto:jusxtdev@gmail.com",
      icon: FiMail,
      className: "hover:border-[#50B5AA] hover:text-[#50B5AA]",
    },
    {
      label: "Resume",
      href: resumePdf,
      icon: FiFileText,
      className: "hover:border-[#50B5AA] hover:text-[#50B5AA]",
    },
  ];

  return (
    <div className={`flex flex-wrap gap-2 text-[#B0B0B0] ${className}`}>
      {links.map((link) => {
        const Icon = link.icon;

        return (
          <a
            aria-label={link.label}
            className={`group relative flex h-9 w-9 items-center justify-center border border-[#282828] bg-[#181818] transition hover:bg-[#232323] focus-visible:border-[#FFC799] focus-visible:text-[#FFC799] focus-visible:outline-none ${link.className}`}
            href={link.href}
            key={link.href}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icon aria-hidden="true" className="h-4 w-4" />
            <span
              className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 translate-y-1 whitespace-nowrap border border-[#282828] bg-[#111111] px-2.5 py-1 text-xs font-medium text-[#F2F2F2] opacity-0 shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
              role="tooltip"
            >
              {link.label}
              <span className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-[#282828] bg-[#111111]" />
            </span>
          </a>
        );
      })}
    </div>
  );
}

export default SocialLinks;
