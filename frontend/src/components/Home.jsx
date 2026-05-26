import ContactSection from "./ContactSection";
import GitHubActivitySection from "./GitHubActivitySection";
import ProfileIntro from "./ProfileIntro";
import ProjectsSection from "./ProjectsSection";
import TechStackSection from "./TechStackSection";

function Home() {
  return (
    <main
      className="min-h-screen bg-[#101010] px-4 py-10 text-[#DADADA] sm:px-6 sm:py-12 lg:px-8"
      id="home"
    >
      <section className="mx-auto max-w-4xl">
        <ProfileIntro />
        <ProjectsSection />
        <TechStackSection />
        <GitHubActivitySection />
        <ContactSection />
      </section>
    </main>
  );
}

export default Home;
