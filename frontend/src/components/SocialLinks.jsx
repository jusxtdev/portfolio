import { FiMail } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa6";
import { SiGithub, SiX } from "react-icons/si";

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
  ];

  return (
    <div className={`flex flex-wrap gap-2 text-[#B0B0B0] ${className}`}>
      {links.map((link) => {
        const Icon = link.icon;

        return (
          <a
            aria-label={link.label}
            className={`flex h-9 w-9 items-center justify-center border border-[#282828] bg-[#181818] transition hover:bg-[#232323] focus-visible:border-[#FFC799] focus-visible:text-[#FFC799] focus-visible:outline-none ${link.className}`}
            href={link.href}
            key={link.href}
            rel="noopener noreferrer"
            target="_blank"
            title={link.label}
          >
            <Icon aria-hidden="true" className="h-4 w-4" />
          </a>
        );
      })}
    </div>
  );
}

export default SocialLinks;
