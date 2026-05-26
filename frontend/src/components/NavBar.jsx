function NavBar() {
  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Projects", href: "#projects" },
    { label: "Tech Stack", href: "#tech-stack" },
    { label: "GitHub", href: "#github" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div className="sticky top-0 z-50  bg-[#101010]/70 backdrop-blur">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-12 max-w-2xl items-center justify-end px-4 text-[#DADADA] sm:px-6 lg:px-0"
      >
        <ul className="flex items-center gap-1 p-1">
          {navLinks.map((link) => (
            <li key={link.href} className="leading-none">
              <a
                className="block px-2.5 py-1.5 text-xs text-[#B0B0B0] transition hover:bg-[#232323] hover:text-[#FFC799] focus-visible:bg-[#232323] focus-visible:text-[#FFC799] focus-visible:outline-none sm:text-sm"
                href={link.href}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
