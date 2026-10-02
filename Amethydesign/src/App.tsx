import { useEffect, useState } from "react"
import logoMark from "./assets/logo-mark.svg"
import logoFull from "./assets/logo-full.svg"
import ProjectCard from "./components/ProjectCard"
import Archive from "./components/Archive"
import FabricFinder from "./pages/FabricFinder"
import DPP from "./pages/DPP"
import Dashboards from "./pages/Dashboards"
import { Barka, Fidelix, Kita, Pharmacy, QuatroEstacoes, Starget, WebGram } from "./pages/ShortCase"
import { projects } from "./data/projects"

const experience = [
  {
    role: "Junior UX/UI Designer",
    org: "CITEVE — Centro Tecnológico Têxtil e Vestuário",
    when: "01/2024 — present",
    points: [
      "Sole UX/UI designer in a cross-functional team of developers, PMs and data scientists across European textile consortium projects.",
      "Designed the consumer-facing Digital Product Passport and the internal data-entry portal used by manufacturers.",
      "Designed a platform for fashion designers: AI trend insights, visual search by image and a digital scrapbook.",
      "Designed dashboards that turn complex data into clear, actionable visualisations.",
    ],
  },
  {
    role: "Collaboration Grant — Image",
    org: "Laboratório de Ecologia Fluvial e Terrestre, UTAD",
    when: "06/2023 — 07/2023",
    points: [
      "Reusable social media templates that streamlined content creation.",
      "Photography and video for institutional presentations.",
    ],
  },
  {
    role: "Sales Assistant",
    org: "Stradivarius, Vila Real",
    when: "08/2022 — 01/2023",
    points: [
      "Cashier duties, restocking and customer service in fast-paced retail.",
    ],
  },
  {
    role: "Curricular Internship",
    org: "4All Software, Vila Real",
    when: "02/2022 — 06/2022",
    points: [
      "UX/UI in FlutterFlow for Starget (Porto discovery via short videos) and Quatro Estações.",
      "UX/UI for an online pharmacy app (Adobe XD), a fuel-station loyalty system and a christening-planning app, including logos.",
    ],
  },
]

const education = [
  {
    title: "Masters in Multimedia Technology",
    org: "UTAD",
    year: "2022 — 2025",
  },
  {
    title: "BSc in Communication and Multimedia",
    org: "UTAD",
    year: "2019 — 2022",
  },
  {
    title: "Google UX Design Professional Certificate",
    org: "Google / Coursera · 3 of 8 completed",
    year: "2026 —",
  },
  {
    title: "Initial Pedagogical Training for Trainers (CCP)",
    org: "ENA — Escola de Negócios e Administração",
    year: "2026",
  },
  {
    title: "E-Trainer: New Technologies and Active Learning",
    org: "ENA — School of Administration",
    year: "2026",
  },
  {
    title: "Agile Project & Product Management with Scrum",
    org: "CITEVE",
    year: "2024",
  },
  { title: "Figma Advanced Course", org: "Udemy", year: "2024" },
  { title: "React Course", org: "Udemy", year: "2024" },
]

const skills = [
  ["Figma", 4.5],
  ["Adobe Illustrator", 4.5],
  ["Adobe XD", 4],
  ["Adobe Photoshop", 4],
  ["After Effects", 3.5],
  ["Lightroom", 3.5],
  ["Wordpress", 3.5],
  ["HTML", 3.5],
  ["CSS", 3.5],
  ["Vue.js", 3],
  ["React.js", 3],
  ["FlutterFlow", 3],
] as const

const filters = ["All", "UX/UI", "Dashboards", "Development", "Wordpress"] as const

const Mono = ({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) => <span className={`font-mono text-[11px] ${className}`}>{children}</span>

/* Figma-style selection frame with handles + size label */
function Selected({
  children,
  label,
  size,
  color = "var(--color-sel)",
  className = "",
}: {
  children: React.ReactNode
  label?: string
  size?: string
  color?: string
  className?: string
}) {
  return (
    <div
      className={`relative ${className}`}
      style={{ outline: `1.5px solid ${color}`, outlineOffset: 6 }}
    >
      {label && (
        <Mono className="absolute -top-8 left-[-6px] rounded-sm px-1.5 py-0.5 text-white">
          <span
            className="absolute inset-0 -z-0 rounded-sm"
            style={{ background: color }}
          />
          <span className="relative">{label}</span>
        </Mono>
      )}
      {[
        "-left-[10px] -top-[10px]",
        "-right-[10px] -top-[10px]",
        "-left-[10px] -bottom-[10px]",
        "-right-[10px] -bottom-[10px]",
      ].map((p) => (
        <i
          key={p}
          className={`absolute ${p} h-2 w-2 border-[1.5px] bg-white`}
          style={{ borderColor: color }}
        />
      ))}
      {size && (
        <Mono className="absolute -bottom-9 left-1/2 -translate-x-1/2 rounded-sm px-1.5 py-0.5 text-white">
          <span
            className="absolute inset-0 rounded-sm"
            style={{ background: color }}
          />
          <span className="relative">{size}</span>
        </Mono>
      )}
      {children}
    </div>
  )
}

function Cursor({
  name,
  color,
  className,
}: {
  name: string
  color: string
  className: string
}) {
  return (
    <div
      className={`pointer-events-none absolute animate-float ${className}`}
      aria-hidden
    >
      <svg width="18" height="18" viewBox="0 0 18 18">
        <path
          d="M1 1 L17 7 L9 9 L7 17 Z"
          fill={color}
          stroke="white"
          strokeWidth="1.2"
        />
      </svg>
      <span
        className="ml-3 rounded-full px-2 py-0.5 text-xs font-medium text-white"
        style={{ background: color }}
      >
        {name}
      </span>
    </div>
  )
}

function Section({
  id,
  n,
  label,
  title,
  note,
  children,
}: {
  id: string
  n: string
  label: string
  title: React.ReactNode
  note?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="mx-auto max-w-[1240px] px-5 py-24 md:px-8">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <Mono className="text-sel">
            {n} — {label}
          </Mono>
          <h2 className="mt-2 text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1] tracking-[-0.03em]">
            {title}
          </h2>
        </div>
        {note && <p className="max-w-sm text-mute">{note}</p>}
      </div>
      {children}
    </section>
  )
}

const process = [
  [
    "Empathise",
    "Interviews, observation and stakeholder sessions to understand who I’m designing for.",
    "research",
  ],
  [
    "Define",
    "Personas, journeys and problem statements that turn raw insight into direction.",
    "synthesis",
  ],
  [
    "Ideate",
    "Sketches, flows and information architecture — quantity first, then focus.",
    "flows",
  ],
  [
    "Prototype",
    "Wireframes to hi-fi in Figma; coded prototypes in React or FlutterFlow when realism matters.",
    "figma",
  ],
  [
    "Test",
    "Usability tests, iteration and design QA alongside developers until it ships.",
    "validate",
  ],
]

/* Case study routes — "#/slug" opens a page, any other hash scrolls the home page */
const caseStudies: Record<string, () => React.ReactElement> = {
  "#/fabric-finder": FabricFinder,
  "#/dpp": DPP,
  "#/dashboards": Dashboards,
  "#/webgram": WebGram,
  "#/quatro-estacoes": QuatroEstacoes,
  "#/discovery-kita": Kita,
  "#/pharmacy-app": Pharmacy,
  "#/starget": Starget,
  "#/fidelix": Fidelix,
  "#/barkarquitetos": Barka,
}

const navLinks = [
  ["work", "Work"],
  ["process", "Process"],
  ["toolkit", "Toolkit"],
  ["cv", "CV"],
  ["system", "System"],
] as const

export default function App() {
  const [hash, setHash] = useState(location.hash)
  useEffect(() => {
    const on = () => setHash(location.hash)
    window.addEventListener("hashchange", on)
    return () => window.removeEventListener("hashchange", on)
  }, [])
  useEffect(() => {
    if (!caseStudies[hash] && hash.length > 1)
      requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView())
  }, [hash])
  const Page = caseStudies[hash]
  return Page ? <Page /> : <Home />
}

function Home() {
  const [filter, setFilter] = useState<typeof filters[number]>("All")
  const [step, setStep] = useState(0)
  const [menu, setMenu] = useState(false)
  const shown = projects.filter(
    (p) => filter === "All" || p.cats.includes(filter),
  )

  return (
    <div>
      {/* Toolbar */}
      <header className="sticky top-3 z-30 mx-auto flex max-w-[1240px] items-center justify-between px-3 md:px-8">
        <div className="flex w-full items-center justify-between rounded-2xl border border-line bg-white/85 px-3 py-2 shadow-sm backdrop-blur">
          <a href="#top" className="flex items-center gap-2">
            <img
              src={logoMark}
              alt="Amethy Design"
              className="h-8 w-8 object-contain"
            />
            <span className="hidden text-sm font-medium sm:inline">
              amethy / <span className="text-mute">portfolio-2026.fig</span>
            </span>
          </a>
          <nav className="flex items-center gap-1 text-sm">
            {navLinks.map(([id, l]) => (
              <a
                key={id}
                href={`#${id}`}
                className="hidden rounded-lg px-3 py-1.5 text-mute transition hover:bg-canvas hover:text-ink md:inline"
              >
                {l}
              </a>
            ))}
            <a
              href="#contact"
              className="rounded-lg bg-sel px-3 py-1.5 font-medium text-white transition hover:bg-ink"
            >
              Share ↗
            </a>
            <button
              type="button"
              onClick={() => setMenu((m) => !m)}
              aria-expanded={menu}
              aria-controls="mobile-menu"
              aria-label={menu ? "Close menu" : "Open menu"}
              className="grid h-8 w-8 place-items-center rounded-lg text-ink transition hover:bg-canvas md:hidden"
            >
              <span className="relative block h-3 w-4">
                <span className={`absolute left-0 h-0.5 w-4 rounded bg-current transition ${menu ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 top-1.5 h-0.5 w-4 rounded bg-current transition ${menu ? "opacity-0" : ""}`} />
                <span className={`absolute left-0 h-0.5 w-4 rounded bg-current transition ${menu ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </nav>
        </div>
        {menu && (
          <div id="mobile-menu" className="absolute inset-x-3 top-full mt-2 rounded-2xl border border-line bg-white p-2 shadow-xl md:hidden">
            <Mono className="block px-3 pt-1 pb-2 text-mute">Pages</Mono>
            {navLinks.map(([id, l], i) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMenu(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-base font-medium transition hover:bg-sky hover:text-sel"
              >
                <span className="font-mono text-[10px] text-mute">{String(i + 1).padStart(2, "0")}</span>
                {l}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Hero canvas */}
      <section
        id="top"
        className="dots relative -mt-16 overflow-hidden pt-36 pb-24"
      >
        <Cursor
          name="Recruiter"
          color="var(--color-pink)"
          className="right-[12%] top-[28%]"
        />
        <Cursor
          name="Dev team"
          color="#16a37a"
          className="left-[8%] bottom-[18%] [animation-delay:-4s]"
        />
        <div className="mx-auto max-w-[1240px] px-5 md:px-8">
          <Mono className="text-mute">Frame · Hero / Desktop — 1440</Mono>
          <div className="mt-12 max-w-5xl">
            <Selected
              label="H1 / Display — Bricolage 600"
              size="Hug × Hug"
              className="inline-block"
            >
              <h1 className="text-[clamp(2.8rem,8vw,7rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
                Hi, I’m Beatriz — <br />I design{" "}
                <span className="font-serif font-normal italic text-sel">
                  clarity
                </span>{" "}
                <br className="hidden md:block" />
                out of complexity.
              </h1>
            </Selected>
          </div>
          <div className="mt-20 grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
            <div className="relative max-w-xl">
              <p className="text-xl leading-relaxed text-ink/80">
                UX/UI Designer in Portugal. I turn dense data — supply chains,
                dashboards, product passports — into interfaces people actually
                understand, and I code enough to prototype them for real.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#work"
                  className="rounded-xl bg-ink px-5 py-3 text-sm font-medium text-white transition hover:bg-sel"
                >
                  View case studies
                </a>
                <a
                  href="https://drive.google.com/uc?export=download&id=1oLyj8HiDptq5Sbs1h4W3N02OK2BEOG6r"
                  download
                  className="rounded-xl border border-line bg-white px-5 py-3 text-sm font-medium transition hover:border-ink"
                >
                  Download CV
                </a>
              </div>
            </div>
            {/* comment bubble */}
            <div className="relative max-w-xs rounded-2xl rounded-bl-sm border border-line bg-white p-4 shadow-lg">
              <div className="flex items-center gap-2">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-lime text-[11px] font-bold">
                  MB
                </span>
                <span className="text-sm font-medium">Beatriz</span>
                <Mono className="text-mute">now</Mono>
              </div>
              <p className="mt-2 text-sm text-ink/80">
                Currently the sole UX/UI designer at <b>CITEVE</b>, designing
                for EU textile‑industry projects. Open to new challenges ✦
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Work */}
      <Section
        id="work"
        n="01"
        label="Work"
        title={
          <>
            Case studies{" "}
            <span className="font-serif font-normal italic text-mute">
              & experiments
            </span>
          </>
        }
        note="Toggle any project between wireframe and final UI — every interface starts as structure."
      >
        <div className="mb-8 inline-flex rounded-xl border border-line bg-white p-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-4 py-1.5 text-sm transition ${
                filter === f ? "bg-ink text-white" : "text-mute hover:text-ink"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-6">
          {shown.filter((p) => !p.archive).map((p) => (
            <ProjectCard
              key={p.title}
              p={p}
              n={String(projects.indexOf(p) + 1).padStart(2, "0")}
            />
          ))}
        </div>
        <Archive items={shown.filter((p) => p.archive)} />
      </Section>

      {/* Process */}
      <section id="process" className="bg-ink text-white">
        <div className="mx-auto max-w-[1240px] px-5 py-24 md:px-8">
          <Mono className="text-sky">02 — Process</Mono>
          <h2 className="mt-2 text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-none tracking-[-0.03em]">
            How I work{" "}
            <span className="font-serif font-normal italic text-sky">
              — double diamond, in practice
            </span>
          </h2>
          <div className="mt-14 flex flex-wrap items-center gap-2">
            {process.map(([t], i) => (
              <div key={t} className="flex items-center gap-2">
                <button
                  onClick={() => setStep(i)}
                  className={`rounded-xl border px-4 py-3 text-left transition ${
                    step === i
                      ? "border-sel bg-sel"
                      : "border-white/15 hover:border-white/50"
                  }`}
                >
                  <Mono className="block opacity-70">0{i + 1}</Mono>
                  <span className="font-medium">{t}</span>
                </button>
                {i < process.length - 1 && (
                  <svg width="28" height="10" className="hidden sm:block">
                    <path
                      d="M0 5h24m-4-4 4 4-4 4"
                      stroke="#ffffff55"
                      fill="none"
                      strokeDasharray="3 3"
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 md:grid-cols-[1fr_1fr]">
            <div>
              <Mono className="text-lime">● {process[step][2]}</Mono>
              <h3 className="mt-3 text-3xl font-semibold">
                {process[step][0]}
              </h3>
              <p className="mt-3 text-lg leading-relaxed text-white/75">
                {process[step][1]}
              </p>
            </div>
            <div className="grid grid-cols-5 items-end gap-2">
              {process.map((_, i) => (
                <div
                  key={i}
                  className={`rounded-t-lg transition-all duration-500 ${
                    i <= step ? "bg-sel" : "bg-white/10"
                  }`}
                  style={{ height: `${40 + i * 24}px` }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Toolkit */}
      <Section
        id="toolkit"
        n="03"
        label="Toolkit"
        title={
          <>
            Tools I{" "}
            <span className="font-serif font-normal italic text-sel">
              work with
            </span>
          </>
        }
        note="From research and UI to motion and front-end — grouped by how I use them."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["Design & prototyping", ["Figma", "Adobe XD", "FlutterFlow"]],
            [
              "Visual & motion",
              [
                "Adobe Illustrator",
                "Adobe Photoshop",
                "After Effects",
                "Lightroom",
              ],
            ],
            [
              "Front-end & web",
              ["HTML", "CSS", "React.js", "Vue.js", "Wordpress"],
            ],
          ].map(([group, names]) => (
            <div
              key={group as string}
              className="rounded-3xl border border-line bg-white p-6"
            >
              <Mono className="text-mute">{group}</Mono>
              <ul className="mt-5 space-y-4">
                {(names as string[]).map((n) => {
                  const v = skills.find(([s]) => s === n)?.[1] ?? 3
                  return (
                    <li key={n}>
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{n}</span>
                        <Mono className="text-mute">
                          {v >= 4.5
                            ? "Expert"
                            : v >= 4
                              ? "Advanced"
                              : v >= 3.5
                                ? "Proficient"
                                : "Working"}
                        </Mono>
                      </div>
                      <div className="mt-2 grid grid-cols-5 gap-1">
                        {[1, 2, 3, 4, 5].map((d) => (
                          <span
                            key={d}
                            className={`h-1.5 rounded-full ${
                              d <= Math.round(v) ? "bg-sel" : "bg-canvas"
                            }`}
                          />
                        ))}
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* CV as version history */}
      <Section
        id="cv"
        n="04"
        label="CV"
        title={
          <>
            Version{" "}
            <span className="font-serif font-normal italic text-sel">
              history
            </span>
          </>
        }
        note="My career, saved as versions — the latest at the top."
      >
        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <ol className="relative rounded-3xl border border-line bg-white p-6">
            <span className="absolute bottom-10 left-[35px] top-10 w-px bg-line" />
            {experience.map((e, i) => (
              <li
                key={e.role}
                className="relative grid grid-cols-[24px_1fr] gap-4 pb-8 last:pb-0"
              >
                <span
                  className={`relative z-10 mt-1 h-3.5 w-3.5 rounded-full border-2 ${
                    i === 0 ? "border-sel bg-sel" : "border-mute bg-white"
                  }`}
                />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold">{e.role}</h3>
                    {i === 0 && (
                      <span className="rounded-full bg-lime px-2 py-0.5 text-[11px] font-medium">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-mute">
                    {e.org} · <Mono>{e.when}</Mono>
                  </p>
                  <ul className="mt-3 space-y-1.5 text-[15px] leading-relaxed text-ink/80">
                    {e.points.map((pt) => (
                      <li key={pt}>— {pt}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
          <div className="space-y-6">
            <div className="rounded-3xl border border-line bg-white p-6">
              <Mono className="text-mute">Layers / Education & courses</Mono>
              <ul className="mt-4 text-sm">
                {education.map((ed) => (
                  <li
                    key={ed.title}
                    className="flex items-start gap-3 rounded-lg px-2 py-2 hover:bg-sky/40"
                  >
                    <span className="mt-0.5 text-mute">#</span>
                    <div className="flex-1">
                      <p className="font-medium">
                        {ed.title}
                        {"isNew" in ed && (
                          <span className="ml-2 rounded bg-pink px-1.5 py-0.5 text-[10px] text-white">
                            NEW
                          </span>
                        )}
                      </p>
                      <p className="text-mute">{ed.org}</p>
                    </div>
                    <Mono className="text-mute">{ed.year}</Mono>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-sel p-6 text-white">
              <Mono className="text-sky">Languages</Mono>
              <p className="mt-2 text-2xl font-semibold">
                Portuguese{" "}
                <span className="font-serif font-normal italic">native</span>
              </p>
              <p className="text-2xl font-semibold">English & Spanish</p>
            </div>
            <div className="rounded-3xl border border-line bg-white p-6">
              <Mono className="text-mute">Academic involvement</Mono>
              <ul className="mt-4 space-y-4 text-sm">
                {[
                  [
                    "UTAD Academic Association",
                    [
                      ["2023", "1st Secretary of the Assembly"],
                      ["2022/23", "Head of Communication & Image"],
                      ["2021/22", "Communication & Image collaborator"],
                    ],
                  ],
                  [
                    "Communication & Multimedia Student Dept.",
                    [
                      ["2021/22", "President of the Assembly"],
                      ["2020/21", "Pedagogical department collaborator"],
                    ],
                  ],
                  ["UTAD Summit", [["2022", "Organising team, 1st edition"]]],
                ].map(([org, roles]) => (
                  <li key={org as string}>
                    <p className="font-medium">{org}</p>
                    <ul className="mt-1.5 space-y-1">
                      {(roles as string[][]).map(([y, r]) => (
                        <li key={r} className="flex gap-3 text-ink/75">
                          <Mono className="w-14 shrink-0 pt-0.5 text-mute">
                            {y}
                          </Mono>
                          {r}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Design system */}
      <Section
        id="system"
        n="05"
        label="Design System"
        title={
          <>
            My design{" "}
            <span className="font-serif font-normal italic text-sel">
              system
            </span>
          </>
        }
        note="The colour tokens, type scale and components this portfolio is built with — documented the way I would hand them to a dev team."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-line bg-white p-6">
            <Mono className="text-mute">Color / Tokens</Mono>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {[
                ["ink", "#17171A"],
                ["select", "#4F5DFF"],
                ["sky", "#C9D3FF"],
                ["pink", "#FF5CA8"],
                ["lime", "#C6F24E"],
                ["canvas", "#F4F4F1"],
              ].map(([n, h]) => (
                <div key={n}>
                  <div
                    className="aspect-square rounded-xl border border-line"
                    style={{ background: h }}
                  />
                  <p className="mt-2 text-xs font-medium">{n}</p>
                  <Mono className="text-mute">{h}</Mono>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-line bg-white p-6">
            <Mono className="text-mute">Type / Scale</Mono>
            <div className="mt-5 space-y-3">
              {[
                ["Display", "text-5xl font-semibold tracking-tight", "64"],
                ["Heading", "text-2xl font-semibold", "32"],
                ["Accent", "text-2xl font-serif italic", "32"],
                ["Body", "text-base", "16"],
                ["Caption", "font-mono text-xs", "12"],
              ].map(([n, c, s]) => (
                <div
                  key={n}
                  className="flex items-baseline justify-between border-b border-line pb-2"
                >
                  <span className={c}>{n}</span>
                  <Mono className="text-mute">{s}px</Mono>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-line bg-white p-6 lg:col-span-2">
            <Mono className="text-mute">Components / States</Mono>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <button className="rounded-xl bg-ink px-5 py-2.5 text-sm font-medium text-white">
                Default
              </button>
              <button className="rounded-xl bg-sel px-5 py-2.5 text-sm font-medium text-white">
                Hover
              </button>
              <button className="rounded-xl bg-ink px-5 py-2.5 text-sm font-medium text-white ring-4 ring-sky">
                Focus
              </button>
              <button
                disabled
                className="rounded-xl bg-line px-5 py-2.5 text-sm font-medium text-mute"
              >
                Disabled
              </button>
              <span className="rounded-full bg-sky px-3 py-1 text-xs font-medium text-sel">
                Tag
              </span>
              <label className="flex items-center gap-2 rounded-xl border border-line px-3 py-2 text-sm text-mute">
                <span>🔍</span>Search projects…
              </label>
              <Selected
                label="Spacing 24"
                color="var(--color-pink)"
                className="ml-4 rounded-lg"
              >
                <div className="flex gap-6 rounded-lg bg-canvas p-3">
                  <i className="h-6 w-6 rounded bg-pink/40" />
                  <i className="h-6 w-6 rounded bg-pink/40" />
                </div>
              </Selected>
            </div>
          </div>
        </div>
      </Section>

      {/* Contact */}
      <footer id="contact" className="dots border-t border-line">
        <div className="mx-auto max-w-[1240px] px-5 py-28 text-center md:px-8">
          <Mono className="text-mute">Prototype · End of flow</Mono>
          <h2 className="mx-auto mt-6 max-w-4xl text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
            Let’s build something{" "}
            <span className="font-serif font-normal italic text-sel">
              people love using.
            </span>
          </h2>
          <a
            href="mailto:mbeatrizcvasconcelos@hotmail.com"
            className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-ink px-7 py-4 text-lg font-medium text-white transition hover:-translate-y-0.5 hover:bg-sel"
          >
            mbeatrizcvasconcelos@hotmail.com ↗
          </a>
          <div className="mt-8 flex justify-center gap-6 text-sm text-mute">
            <a
              href="https://linkedin.com/in/mariabeatrizcv/"
              target="_blank"
              className="hover:text-ink"
            >
              LinkedIn
            </a>
            <a href="tel:+351915243608" className="hover:text-ink">
              +351 915 243 608
            </a>
            <span>Vila Nova de Gaia, PT</span>
          </div>
          <img
            src={logoFull}
            alt="Amethy Design"
            className="mx-auto mt-20 h-14 w-auto"
          />
          <Mono className="mt-6 block text-mute">© 2026 Amethy Design</Mono>
        </div>
      </footer>
    </div>
  )
}
