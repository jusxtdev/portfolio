import profilePicture from "../assets/luffypfp.jpg";
import SocialLinks from "./SocialLinks";

function ProfileIntro() {
  return (
    <>
      <div
        className="scroll-mt-16 flex flex-col gap-5 border-b border-[#282828] pb-8 sm:flex-row sm:items-center"
        id="about"
      >
        <div className="flex min-w-0 flex-1 items-center gap-5">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#282828] bg-[#181818] p-1 shadow-[0_0_0_5px_#161616]">
            <img
              alt="Profile"
              className="h-full w-full rounded-full object-cover"
              src={profilePicture}
            />
          </div>

          <div className="min-w-0">
            <h1 className="text-2xl font-semibold leading-tight text-[#DADADA] sm:text-3xl">
              Dev Prajapati
            </h1>
            <p className="mt-1.5 text-sm leading-6 text-[#B0B0B0]">
              <span className="text-[#8dd7ceb7]">
                Backend Developer ·{" "}
              </span>
              <a
                className="text-[#B0B0B0] transition hover:text-[#FFC799]"
                href="mailto:jusxtdev@gmail.com"
              >
                jusxtdev@gmail.com
              </a>
            </p>
          </div>
        </div>

        <SocialLinks className="shrink-0 sm:ml-auto sm:justify-end" />
      </div>

      <p className="mt-6 max-w-2xl text-sm leading-7 text-[#B0B0B0]">
        Backend developer building clean, reliable APIs. I work with{" "}
        <em className="italic text-[#FFC799]">Node.js</em>, <em className="italic text-[#FFC799]">TypeScript</em>, and
        <em className="italic text-[#FFC799]">PostgreSQL</em>. Looking for opportunities to contribute and learn from good
        engineers
      </p>

      <p className="mt-3 max-w-2xl border-l border-[#282828] pl-3 text-xs leading-6 text-[#808080] sm:text-sm">
        Currently learning backend architecture, database design,
        authentication flows, and writing better production-ready code.
      </p>
    </>
  );
}

export default ProfileIntro;
