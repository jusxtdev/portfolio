import { FiArrowUpRight } from "react-icons/fi";
import { SiGithub } from "react-icons/si";

function ProjectCard({ project }) {
  const isInProgress = project.status === "in-progress";

  return (
    <article className="group relative overflow-hidden border border-[#282828] bg-[#161616] transition duration-200 hover:-translate-y-1 hover:border-[#50B5AA] hover:bg-[#181818] hover:shadow-[0_14px_30px_rgba(0,0,0,0.38),0_0_0_1px_rgba(80,181,170,0.14)] active:translate-y-0 active:shadow-[0_6px_16px_rgba(0,0,0,0.32)]">
      <div className="absolute right-3 top-3 z-10 flex gap-1.5">
        {project.githubUrl && (
          <a
            aria-label={`${project.title} GitHub repository`}
            className="flex h-8 w-8 items-center justify-center border border-[#282828] bg-[#101010] text-[#B0B0B0] transition hover:border-[#50B5AA] hover:text-[#50B5AA] focus-visible:border-[#50B5AA] focus-visible:text-[#50B5AA] focus-visible:outline-none"
            href={project.githubUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <SiGithub aria-hidden="true" className="h-4 w-4" />
          </a>
        )}
        {project.liveUrl && (
          <a
            aria-label={`${project.title} live project`}
            className="flex h-8 w-8 items-center justify-center border border-[#282828] bg-[#101010] text-[#B0B0B0] transition hover:border-[#FF7300] hover:text-[#FF7300] focus-visible:border-[#FF7300] focus-visible:text-[#FF7300] focus-visible:outline-none"
            href={project.liveUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <FiArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
        )}
      </div>

      <div className="relative flex aspect-video items-end overflow-hidden border-b border-[#282828] bg-[#101010] p-4 transition group-hover:border-[#50B5AA]">
        {project.image ? (
          <img
            alt={`${project.title} preview`}
            className="absolute inset-0 h-full w-full object-cover opacity-80 transition group-hover:scale-[1.02] group-hover:opacity-100"
            src={project.image}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
            <span className="text-xl font-semibold leading-tight text-[#505050]">
              {project.title}
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(16,16,16,0.95),rgba(16,16,16,0.25),rgba(16,16,16,0.1))]" />

        {isInProgress && (
          <span className="absolute left-3 top-3 flex items-center gap-1.5 border border-[#FF7300] bg-[#101010]/90 px-2 py-1 text-xs text-[#FF7300]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF7300]" />
            In progress
          </span>
        )}

        <h3 className="relative text-lg font-semibold leading-tight text-[#DADADA]">
          {project.title}
        </h3>
      </div>

      <div className="p-4">
        <p className="text-sm leading-6 text-[#B0B0B0]">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              className="border border-[#282828] bg-[#101010] px-2 py-1 text-xs text-[#50B5AA]"
              key={tech}
            >
              {tech}
            </span>
          ))}
        </div>

      </div>
    </article>
  );
}

export default ProjectCard;
