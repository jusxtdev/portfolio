const colors = [
  ["Deepest bg", "#101010"],
  ["Active bg", "#161616"],
  ["Editor bg", "#181818"],
  ["Input bg", "#1C1C1C"],
  ["Selected", "#232323"],
  ["Hover", "#282828"],
  ["Primary text", "#DADADA"],
  ["Muted text", "#B0B0B0"],
  ["Subtle text", "#808080"],
  ["Line text", "#505050"],
  ["Accent", "#FFC799"],
  ["Accent hover", "#FFCFA8"],
  ["Error", "#FF8080"],
  ["Info", "#50B5AA"],
  ["Live", "#FF7300"],
];

const navItems = ["home.jsx", "work.json", "notes.md", "contact.env"];

function Test() {
  return (
    <main className="min-h-screen bg-[#101010] px-4 py-5 text-[#DADADA] sm:px-6 lg:px-8">
      <section className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="border border-[#282828] bg-[#181818]">
          <div className="border-b border-[#282828] bg-[#101010] px-4 py-3">
            <p className="text-xs uppercase tracking-[0.18em] text-[#808080]">
              Monocore
            </p>
            <h1 className="mt-1 text-xl text-[#DADADA]">Design Test</h1>
          </div>

          <nav className="p-2">
            {navItems.map((item, index) => (
              <button
                className={`flex h-9 w-full items-center justify-between px-3 text-left text-sm transition ${
                  index === 0
                    ? "bg-[#232323] text-[#FFC799]"
                    : "text-[#B0B0B0] hover:bg-[#282828] hover:text-[#DADADA]"
                }`}
                key={item}
                type="button"
              >
                <span>{item}</span>
                {index === 0 && (
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FF7300]" />
                )}
              </button>
            ))}
          </nav>

          <div className="border-t border-[#282828] p-4">
            <p className="text-xs text-[#808080]">Status</p>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-[#B0B0B0]">Build</span>
                <span className="text-[#50B5AA]">passing</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#B0B0B0]">Accent</span>
                <span className="text-[#FFC799]">ready</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#B0B0B0]">Errors</span>
                <span className="text-[#FF8080]">0</span>
              </div>
            </div>
          </div>
        </aside>

        <div className="grid gap-4">
          <header className="border border-[#282828] bg-[#181818]">
            <div className="flex flex-col gap-4 border-b border-[#282828] bg-[#101010] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[#808080]">
                  Interface preview
                </p>
                <h2 className="mt-1 text-2xl text-[#DADADA]">
                  Compact portfolio console
                </h2>
              </div>
              <div className="flex gap-2">
                <button
                  className="h-9 border border-[#505050] px-3 text-sm text-[#DADADA] transition hover:border-[#808080] hover:bg-[#232323]"
                  type="button"
                >
                  Preview
                </button>
                <button
                  className="h-9 bg-[#FFC799] px-3 text-sm text-[#101010] transition hover:bg-[#FFCFA8]"
                  type="button"
                >
                  Publish
                </button>
              </div>
            </div>

            <div className="grid gap-4 p-4 md:grid-cols-3">
              {[
                ["Primary", "Small-medium scale for readable dense screens."],
                ["Muted", "Secondary text stays visible without shouting."],
                ["Subtle", "Tertiary labels recede into the interface."],
              ].map(([title, body], index) => (
                <article className="bg-[#161616] p-4" key={title}>
                  <p
                    className={`text-sm ${
                      index === 0
                        ? "text-[#DADADA]"
                        : index === 1
                          ? "text-[#B0B0B0]"
                          : "text-[#808080]"
                    }`}
                  >
                    {title}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[#B0B0B0]">
                    {body}
                  </p>
                </article>
              ))}
            </div>
          </header>

          <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
            <div className="border border-[#282828] bg-[#181818]">
              <div className="flex h-10 items-center gap-2 border-b border-[#282828] bg-[#101010] px-3">
                {["index.ts", "theme.ts", "tokens.css"].map((tab, index) => (
                  <button
                    className={`h-7 px-3 text-xs ${
                      index === 1
                        ? "bg-[#161616] text-[#FFC799]"
                        : "text-[#808080] hover:bg-[#232323] hover:text-[#DADADA]"
                    }`}
                    key={tab}
                    type="button"
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="grid gap-4 p-4 lg:grid-cols-[minmax(0,1fr)_240px]">
                <pre className="overflow-auto bg-[#101010] p-4 text-sm leading-6 text-[#DADADA]">
                  <code>
                    <span className="text-[#8b8b8b]">
                      {"// Syntax token check\n"}
                    </span>
                    <span className="text-[#FFC799]">const</span>
                    {" palette = {\n"}
                    {"  "}
                    <span className="text-[#DADADA]">accent</span>
                    <span className="text-[#B0B0B0]">: </span>
                    <span className="text-[#50B5AA]">"#FFC799"</span>
                    {",\n  "}
                    <span className="text-[#DADADA]">surface</span>
                    <span className="text-[#B0B0B0]">: </span>
                    <span className="text-[#50B5AA]">"#181818"</span>
                    {",\n  "}
                    <span className="text-[#DADADA]">error</span>
                    <span className="text-[#B0B0B0]">: </span>
                    <span className="text-[#FF8080]">"invalid"</span>
                    {"\n};\n\n"}
                    <span className="text-[#FFC799]">function</span>
                    {" render"}
                    <span className="text-[#B0B0B0]">()</span>
                    {" {\n  "}
                    <span className="text-[#FFC799]">return</span>
                    {" "}
                    <span className="text-[#50B5AA]">"focused"</span>
                    {";\n}"}
                  </code>
                </pre>

                <form className="space-y-3 bg-[#161616] p-4">
                  <label className="block text-sm text-[#B0B0B0]">
                    Project name
                    <input
                      className="mt-2 h-9 w-full border border-[#282828] bg-[#1C1C1C] px-3 text-sm text-[#DADADA] outline-none transition placeholder:text-[#505050] focus:border-[#FFC799]"
                      defaultValue="portfolio"
                    />
                  </label>
                  <label className="block text-sm text-[#B0B0B0]">
                    Mode
                    <select
                      className="mt-2 h-9 w-full border border-[#282828] bg-[#1C1C1C] px-3 text-sm text-[#DADADA] outline-none transition focus:border-[#FFC799]"
                      defaultValue="live"
                    >
                      <option value="draft">draft</option>
                      <option value="live">live</option>
                    </select>
                  </label>
                  <label className="flex items-center gap-3 text-sm text-[#B0B0B0]">
                    <input
                      className="h-4 w-4 accent-[#FFC799]"
                      defaultChecked
                      type="checkbox"
                    />
                    Use warm accent
                  </label>
                </form>
              </div>
            </div>

            <aside className="border border-[#282828] bg-[#181818] p-4">
              <h3 className="text-lg text-[#DADADA]">Color tokens</h3>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {colors.map(([name, value]) => (
                  <div className="bg-[#161616] p-2" key={name}>
                    <div
                      className="h-10 border border-[#282828]"
                      style={{ backgroundColor: value }}
                    />
                    <p className="mt-2 text-xs text-[#B0B0B0]">{name}</p>
                    <p className="text-xs text-[#808080]">{value}</p>
                  </div>
                ))}
              </div>
            </aside>
          </section>
        </div>
      </section>
    </main>
  );
}

export default Test;
