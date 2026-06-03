import clavierImage from "../assets/clavier.png"
import gymPRTrackerImage from "../assets/gymPRTracker.png"
import ProjectCard from "./ProjectCard";


function ProjectsSection() {
  const projects = [
    {
      title: "Clavier",
      description:
        "Keyboard Selling e-commerce platform with user authentication, product management, and shopping cart functionality.",
      techStack: [
        "React",
        "TypeScript",
        "Tailwind",
        "Node.js",
        "Express",
        "PostgreSQL",
      ],
      image: clavierImage,
      status: "in-progress",
      liveUrl: "https://clavier-l10g.onrender.com/",
      githubUrl: "https://github.com/jusxtdev/Clavier.git",
    },
    {
      title: "Gym-PR-Tracker",
      description: "Full-stack web application to log and track gym progress",
      techStack: [
        "React",
        "TypeScript",
        "Tailwind",
        "Node.js",
        "Express",
        "PostgreSQL",
      ],
      image: gymPRTrackerImage,
      status: "Done",
      liveUrl: "https://gym-pr-tracker-frontend.onrender.com/",
      githubUrl: "https://github.com/jusxtdev/gym-PR-tracker",
    },
    
  ];

  return (
    <section
      className="mt-12 scroll-mt-16 border-t border-[#282828] pt-8"
      id="projects"
    >
      <h2 className="text-xl font-semibold tracking-normal text-[#DADADA]">
        Projects
      </h2>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}

export default ProjectsSection;
