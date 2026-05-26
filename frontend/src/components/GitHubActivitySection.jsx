import { useEffect, useMemo, useState } from "react";
import { FiGitPullRequest, FiStar, FiCalendar, FiActivity } from "react-icons/fi";
import { SiGithub } from "react-icons/si";

const GITHUB_USERNAME = "jusxtdev";
const languageColors = {
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  HTML: "#e34f26",
  CSS: "#563d7c",
  Python: "#3776ab",
  Shell: "#89e051",
};

function formatDateKey(date) {
  return date.toISOString().slice(0, 10);
}

function buildActivityCalendar(events) {
  const eventCounts = new Map();
  events.forEach((event) => {
    const day = event.created_at.slice(0, 10);
    eventCounts.set(day, (eventCounts.get(day) || 0) + 1);
  });

  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 364);
  startDate.setDate(startDate.getDate() - startDate.getDay());

  const days = [];
  const cursor = new Date(startDate);

  while (cursor <= endDate) {
    const key = formatDateKey(cursor);
    days.push({ date: key, count: eventCounts.get(key) || 0 });
    cursor.setDate(cursor.getDate() + 1);
  }

  const weeks = [];
  for (let index = 0; index < days.length; index += 7) {
    weeks.push(days.slice(index, index + 7));
  }

  const monthLabels = weeks.reduce((labels, week, weekIndex) => {
    const firstOfMonth = week.find((day) => day.date.endsWith("-01"));
    if (!firstOfMonth) return labels;

    labels.push({
      label: new Date(`${firstOfMonth.date}T00:00:00`).toLocaleString("en", {
        month: "short",
      }),
      weekIndex,
    });
    return labels;
  }, []);

  return { weeks, monthLabels };
}

function activityColor(count) {
  if (count >= 5) return "bg-[#50B5AA]";
  if (count >= 3) return "bg-[#2f827a]";
  if (count >= 1) return "bg-[#1f4f4b]";
  return "bg-[#161616]";
}

function GitHubActivitySection() {
  const [githubData, setGithubData] = useState({
    user: null,
    repos: [],
    events: [],
    languages: [],
    status: "loading",
  });

  useEffect(() => {
    let ignore = false;

    async function loadGitHubData() {
      try {
        const [userResponse, reposResponse, eventsResponse] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
          ),
          fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100`,
          ),
        ]);

        if (!userResponse.ok || !reposResponse.ok || !eventsResponse.ok) {
          throw new Error("GitHub API request failed");
        }

        const [user, repos, events] = await Promise.all([
          userResponse.json(),
          reposResponse.json(),
          eventsResponse.json(),
        ]);

        const languageEntries = await Promise.all(
          repos.slice(0, 12).map(async (repo) => {
            const response = await fetch(repo.languages_url);
            if (!response.ok) return {};
            return response.json();
          }),
        );

        const languageTotals = languageEntries.reduce((totals, repoLanguages) => {
          Object.entries(repoLanguages).forEach(([language, bytes]) => {
            totals[language] = (totals[language] || 0) + bytes;
          });
          return totals;
        }, {});

        const languages = Object.entries(languageTotals)
          .map(([name, bytes]) => ({ name, bytes }))
          .sort((a, b) => b.bytes - a.bytes)
          .slice(0, 5);

        if (!ignore) {
          setGithubData({
            user,
            repos,
            events,
            languages,
            status: "loaded",
          });
        }
      } catch {
        if (!ignore) {
          setGithubData((current) => ({ ...current, status: "error" }));
        }
      }
    }

    loadGitHubData();

    return () => {
      ignore = true;
    };
  }, []);

  const stats = useMemo(() => {
    if (!githubData.user) return [];

    const totalStars = githubData.repos.reduce(
      (total, repo) => total + repo.stargazers_count,
      0,
    );
    const pullRequests = githubData.events.filter(
      (event) => event.type === "PullRequestEvent",
    ).length;
    const yearsOnGitHub = Math.max(
      1,
      new Date().getFullYear() - new Date(githubData.user.created_at).getFullYear(),
    );

    return [
      {
        label: "Public Repos",
        value: githubData.user.public_repos,
        icon: FiActivity,
      },
      { label: "Recent PRs", value: pullRequests, icon: FiGitPullRequest },
      { label: "Stars Earned", value: totalStars, icon: FiStar },
      { label: "Years on GitHub", value: `${yearsOnGitHub} yrs`, icon: FiCalendar },
    ];
  }, [githubData]);

  const activityCalendar = useMemo(
    () => buildActivityCalendar(githubData.events),
    [githubData.events],
  );

  const languageTotal = githubData.languages.reduce(
    (total, language) => total + language.bytes,
    0,
  );

  return (
    <section
      className="mt-12 scroll-mt-16 border-t border-[#282828] pt-8"
      id="github"
    >
      <h2 className="text-xl font-semibold tracking-normal text-[#DADADA]">
        GitHub Activity
      </h2>
      <div className="mt-2 h-px w-16 bg-[#DADADA]" />
      <p className="mt-5 text-sm leading-7 text-[#808080]">
        Public profile activity from GitHub
      </p>

      {githubData.status === "loading" && (
        <p className="mt-6 border border-[#282828] bg-[#161616] px-4 py-3 text-sm text-[#808080]">
          Fetching GitHub data...
        </p>
      )}

      {githubData.status === "error" && (
        <p className="mt-6 border border-[#282828] bg-[#161616] px-4 py-3 text-sm text-[#FF8080]">
          Could not load GitHub data right now.
        </p>
      )}

      {githubData.status === "loaded" && (
        <>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <article
                  className="border border-[#282828] bg-[#161616] p-4"
                  key={stat.label}
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs text-[#808080]">{stat.label}</p>
                    <Icon aria-hidden="true" className="h-4 w-4 text-[#808080]" />
                  </div>
                  <p className="mt-4 text-2xl font-semibold text-[#DADADA]">
                    {stat.value}
                  </p>
                </article>
              );
            })}
          </div>

          {githubData.languages.length > 0 && (
            <div className="mt-8">
              <p className="text-sm text-[#808080]">Top Languages</p>
              <div className="mt-4 flex h-2 overflow-hidden bg-[#161616]">
                {githubData.languages.map((language) => (
                  <span
                    key={language.name}
                    style={{
                      width: `${(language.bytes / languageTotal) * 100}%`,
                      backgroundColor:
                        languageColors[language.name] || "#50B5AA",
                    }}
                  />
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#808080]">
                {githubData.languages.map((language) => (
                  <span className="flex items-center gap-1.5" key={language.name}>
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{
                        backgroundColor:
                          languageColors[language.name] || "#50B5AA",
                      }}
                    />
                    {language.name} {Math.round((language.bytes / languageTotal) * 100)}%
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8">
            <div className="overflow-hidden pb-1">
              <div
                style={{
                  "--activity-gap": "clamp(1px, 0.45vw, 3px)",
                  "--activity-size": "calc((100% - (52 * var(--activity-gap))) / 53)",
                }}
              >
                <div
                  className="mb-2 grid text-xs text-[#B0B0B0]"
                  style={{
                    columnGap: "var(--activity-gap)",
                    gridTemplateColumns: `repeat(${activityCalendar.weeks.length}, minmax(0, var(--activity-size)))`,
                  }}
                >
                  {activityCalendar.monthLabels.map((month) => (
                    <span
                      key={`${month.label}-${month.weekIndex}`}
                      style={{
                        gridColumn: `${month.weekIndex + 1} / span 4`,
                      }}
                    >
                      {month.label}
                    </span>
                  ))}
                </div>

                <div
                  className="grid"
                  style={{
                    columnGap: "var(--activity-gap)",
                    gridTemplateColumns: `repeat(${activityCalendar.weeks.length}, minmax(0, var(--activity-size)))`,
                  }}
                >
                  {activityCalendar.weeks.map((week, weekIndex) => (
                    <div
                      className="flex flex-col"
                      key={weekIndex}
                      style={{ gap: "var(--activity-gap)" }}
                    >
                      {week.map((cell) => (
                        <span
                          className={`aspect-square w-full border border-[#282828] ${activityColor(
                            cell.count,
                          )}`}
                          key={cell.date}
                          title={`${cell.count} public events on ${cell.date}`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between gap-4 text-xs text-[#B0B0B0]">
              <span>
                {githubData.events.length} public events in recent GitHub activity
              </span>
              <span className="flex items-center gap-1.5">
                Less
                <span className="h-2.5 w-2.5 bg-[#161616]" />
                <span className="h-2.5 w-2.5 bg-[#1f4f4b]" />
                <span className="h-2.5 w-2.5 bg-[#2f827a]" />
                <span className="h-2.5 w-2.5 bg-[#50B5AA]" />
                More
              </span>
            </div>
          </div>

          <div className="mt-8 text-center">
            <a
              className="inline-flex items-center gap-2 text-sm text-[#DADADA] transition hover:text-[#FFC799] focus-visible:text-[#FFC799] focus-visible:outline-none"
              href={`https://github.com/${GITHUB_USERNAME}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              View on GitHub
              <SiGithub aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
        </>
      )}
    </section>
  );
}

export default GitHubActivitySection;
