import {
  SiExpress,
  SiGit,
  SiGithub,
  SiMongodb,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from "react-icons/si";

function TechStackSection() {
  const techStack = [
    { name: "React", icon: SiReact, color: "hover:text-[#50B5AA]" },
    // { name: "Next.js", icon: SiNextdotjs, color: "hover:text-[#DADADA]" },
    { name: "TypeScript", icon: SiTypescript, color: "hover:text-[#FFC799]" },
    { name: "Tailwind", icon: SiTailwindcss, color: "hover:text-[#50B5AA]" },
    { name: "Node.js", icon: SiNodedotjs, color: "hover:text-[#FF7300]" },
    { name: "Express", icon: SiExpress, color: "hover:text-[#B0B0B0]" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "hover:text-[#50B5AA]" },
    { name: "MongoDB", icon: SiMongodb, color: "hover:text-[#50B5AA]" },
    // { name: "Redis", icon: SiRedis, color: "hover:text-[#FF8080]" },
    { name: "Prisma", icon: SiPrisma, color: "hover:text-[#FFC799]" },
    // { name: "Docker", icon: SiDocker, color: "hover:text-[#50B5AA]" },
    { name: "Git", icon: SiGit, color: "hover:text-[#FF7300]" },
    { name: "Vite", icon: SiVite, color: "hover:text-[#FFC799]" },
    { name: "GitHub", icon: SiGithub, color: "hover:text-[#DADADA]" },
  ];

  return (
    <section
      className="mt-12 scroll-mt-16 border-t border-[#282828] pt-8"
      id="tech-stack"
    >
      <h2 className="text-xl font-semibold tracking-normal text-[#DADADA]">
        Tech Stack
      </h2>
      <div className="mt-2 h-px w-16 bg-[#50B5AA]" />

      <div className="mt-8 flex flex-wrap gap-3">
        {techStack.map((tech) => {
          const Icon = tech.icon;

          return (
            <div
              aria-label={tech.name}
              className={`group flex h-12 w-12 items-center justify-center border border-[#282828] bg-[#161616] text-[#DADADA] transition hover:border-[#FFC799] hover:bg-[#232323] ${tech.color}`}
              key={tech.name}
              title={tech.name}
            >
              <Icon
                aria-hidden="true"
                className="h-5 w-5 transition group-hover:scale-105"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default TechStackSection;
