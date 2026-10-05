import { useEffect, useRef, useState } from "react"
import logoMark from "../assets/logo-mark.svg"
import { asset } from "../data/projects"

/* Fabric Finder — case study page (route: #/fabric-finder)
   Texto e imagens editáveis aqui. Imagens: nomes de ficheiros em src/assets/projects/ */

export const Mono = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span className={`font-mono text-[11px] ${className}`}>{children}</span>
)

const toc = [
  ["context", "Context"],
  ["challenge", "The challenge"],
  ["role", "My role"],
  ["workflows", "Workflows"],
  ["social", "Social AI"],
  ["creative", "Creative AI"],
  ["sales", "Sales AI"],
  ["scrapbook", "Scrapbook"],
  ["consistency", "Consistency"],
  ["prototype", "Prototype III"],
  ["reflection", "Reflection"],
] as const

/* Figma-style frame: name label on top, click to enlarge */
export function Frame({ file, name, onOpen, className = "" }: { file: string; name: string; onOpen: (f: string, n: string) => void; className?: string }) {
  return (
    <figure className={`group min-w-0 ${className}`}>
      <figcaption className="mb-1.5 flex items-center gap-1.5 text-mute">
        <span className="text-[10px]">#</span>
        <Mono>{name}</Mono>
      </figcaption>
      <button
        onClick={() => onOpen(file, name)}
        className="relative block w-full overflow-hidden rounded-xl border border-line bg-white outline-2 outline-offset-2 outline-sel transition group-hover:outline"
        aria-label={`Enlarge ${name}`}
      >
        <img src={asset(file)} alt={name} loading="lazy" className="block w-full" />
        <span className="absolute bottom-2 right-2 rounded-md bg-ink/80 px-2 py-0.5 font-mono text-[10px] text-white opacity-0 transition group-hover:opacity-100">
          ⤢ enlarge
        </span>
      </button>
    </figure>
  )
}

function Flow({ steps }: { steps: string[] }) {
  return (
    <ol className="flex flex-wrap items-center gap-y-2">
      {steps.map((s, i) => (
        <li key={s} className="flex items-center">
          <span className="rounded-full border border-line bg-white px-3.5 py-1.5 text-sm font-medium shadow-sm">
            <span className="mr-1.5 font-mono text-[10px] text-sel">{String(i + 1).padStart(2, "0")}</span>
            {s}
          </span>
          {i < steps.length - 1 && <span className="mx-1.5 text-mute">→</span>}
        </li>
      ))}
    </ol>
  )
}

export function Block({ id, n, label, title, children }: { id: string; n: string; label: string; title: React.ReactNode; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-line py-16 md:py-20">
      <Mono className="text-sel">
        {n} — {label}
      </Mono>
      <h2 className="mt-3 max-w-[22ch] text-[clamp(1.8rem,3.6vw,2.8rem)] font-semibold leading-[1.05] tracking-[-0.03em]">{title}</h2>
      <div className="mt-8">{children}</div>
    </section>
  )
}

/* Drag to compare wireframe vs final UI */
function Compare({ before, after }: { before: string; after: string }) {
  const [x, setX] = useState(50)
  return (
    <div className="relative select-none overflow-hidden rounded-2xl border border-line bg-white">
      <img src={asset(after)} alt="Final UI" className="block w-full" />
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - x}% 0 0)` }}>
        <img src={asset(before)} alt="Wireframe" className="block h-full w-full object-cover" />
      </div>
      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${x}%` }}>
        <div className="h-full w-0.5 -translate-x-1/2 bg-sel" />
        <div className="absolute top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-sel text-sm text-white shadow-lg">⇆</div>
      </div>
      <Mono className="absolute left-3 top-3 rounded bg-pink px-1.5 py-0.5 text-white">wireframe</Mono>
      <Mono className="absolute right-3 top-3 rounded bg-sel px-1.5 py-0.5 text-white">final UI</Mono>
      <input
        type="range"
        min={0}
        max={100}
        value={x}
        onChange={(e) => setX(+e.target.value)}
        aria-label="Compare wireframe and final UI"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  )
}

/* Mini specimens for the consistency section */
const specimens: [string, React.ReactNode][] = [
  [
    "Tabs",
    <div className="flex gap-3 border-b border-line text-xs">
      <span className="border-b-2 border-sel pb-1.5 font-medium text-sel">Catalog</span>
      <span className="pb-1.5 text-mute">Generate</span>
    </div>,
  ],
  [
    "Cards",
    <div className="grid grid-cols-3 gap-1.5">
      {["#dcc18a", "#1f6f9b", "#7a2a2a"].map((c) => (
        <div key={c} className="overflow-hidden rounded-md border border-line bg-white">
          <div className="h-7" style={{ background: c }} />
          <div className="m-1 h-1.5 w-2/3 rounded bg-line" />
        </div>
      ))}
    </div>,
  ],
  [
    "Filters",
    <div className="flex flex-wrap gap-1">
      {["Boho ×", "16-25 ×", "N. America ×"].map((f) => (
        <span key={f} className="rounded-full bg-sel px-2 py-0.5 text-[10px] text-white">{f}</span>
      ))}
    </div>,
  ],
  [
    "Pop-ups",
    <div className="rounded-lg border border-line bg-white p-2 shadow-lg">
      <div className="h-1.5 w-1/2 rounded bg-ink/70" />
      <div className="mt-1.5 h-1.5 w-full rounded bg-line" />
      <div className="mt-2 ml-auto h-4 w-12 rounded bg-sel" />
    </div>,
  ],
  [
    "Buttons",
    <div className="flex gap-1.5 text-[10px] font-medium">
      <span className="rounded-full bg-sel px-2.5 py-1 text-white">General</span>
      <span className="rounded-full bg-canvas px-2.5 py-1">Color</span>
      <span className="rounded-full bg-canvas px-2.5 py-1">Shape</span>
    </div>,
  ],
  [
    "Grids",
    <div className="grid grid-cols-4 gap-1">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="aspect-square rounded bg-gradient-to-br from-line to-canvas" />
      ))}
    </div>,
  ],
]

export default function FabricFinder() {
  const [zoom, setZoom] = useState<[string, string] | null>(null)
  const [active, setActive] = useState<string>("context")
  const open = (f: string, n: string) => setZoom([f, n])
  const main = useRef<HTMLDivElement>(null)
  const lock = useRef(false)
  // Index click: highlight immediately and ignore scroll updates until the smooth scroll ends
  const goTo = (id: string) => {
    setActive(id)
    lock.current = true
    const release = () => (lock.current = false)
    window.addEventListener("scrollend", release, { once: true })
    setTimeout(release, 1200)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    // Active = last section whose top has reached the area under the toolbar
    const sections = Array.from(main.current?.querySelectorAll<HTMLElement>("section[id]") ?? [])
    const onScroll = () => {
      if (lock.current) return
      const line = 160 // just below the sticky toolbar, where clicked sections land
      let current: string | undefined = sections[0]?.id
      for (const s of sections) if (s.getBoundingClientRect().top <= line) current = s.id
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) current = sections.at(-1)?.id
      if (current) setActive(current)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!zoom) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setZoom(null)
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [zoom])

  return (
    <div className="pb-10">
      {/* Toolbar */}
      <header className="sticky top-3 z-30 mx-auto max-w-[1240px] px-3 md:px-8">
        <div className="flex items-center justify-between rounded-2xl border border-line bg-white/85 px-3 py-2 shadow-sm backdrop-blur">
          <a href="#work" className="flex items-center gap-2">
            <img src={logoMark} alt="Amethy Design" className="h-8 w-8 object-contain" />
            <span className="hidden text-sm font-medium sm:inline">
              amethy / work / <span className="text-mute">fabric-finder.case</span>
            </span>
          </a>
          <a href="#work" className="rounded-lg px-3 py-1.5 text-sm text-mute transition hover:bg-canvas hover:text-ink">
            ← All work
          </a>
        </div>
      </header>

      {/* 1. Hero */}
      <div className="mx-auto max-w-[1240px] px-5 pt-16 md:px-8 md:pt-24">
        <Mono className="text-mute">Case study · Fabric Finder · 2025 — 2026</Mono>
        <h1 className="mt-4 max-w-[16ch] text-[clamp(2.6rem,7vw,5.6rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
          AI-Powered Creative Platform <span className="font-serif font-normal italic text-sel">for Textile Designers</span>
        </h1>
        <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-ink/75">
          Designing a multi-feature platform that combines AI, trend analysis, sales insights and visual research to support textile designers throughout their creative process.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {["UX/UI Design", "Product Design", "AI", "Data Visualisation"].map((t) => (
            <span key={t} className="rounded-full bg-sky px-3 py-1 text-xs font-medium text-sel">{t}</span>
          ))}
        </div>

        <div className="relative mt-12">
          <div className="pointer-events-none absolute -inset-2 rounded-[22px] border-2 border-sel" />
          <Mono className="absolute -top-7 left-0 rounded-t-md bg-sel px-2 py-1 text-white">Landing — Prototype III</Mono>
          <button onClick={() => open("fabric-8.png", "Landing — Prototype III")} className="block w-full overflow-hidden rounded-2xl border border-line bg-white">
            <img src={asset("fabric-8.png")} alt="Fabric Finder landing page" className="block w-full" />
          </button>
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
          {[
            ["Role", "UX/UI Designer"],
            ["Type", "R&D project"],
            ["Industry", "Textile & fashion"],
            ["Modules", "Social · Creative · Sales · Scrapbook"],
          ].map(([k, v]) => (
            <div key={k} className="bg-white p-4">
              <dt><Mono className="text-mute">{k}</Mono></dt>
              <dd className="mt-1 text-sm font-medium">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Body with sticky index */}
      <div className="mx-auto mt-16 grid max-w-[1240px] gap-10 px-5 md:px-8 lg:grid-cols-[200px_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <nav className="sticky top-28 rounded-2xl border border-line bg-white p-3">
            <Mono className="block px-2 pb-2 text-mute">Layers</Mono>
            {toc.map(([id, l], i) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault()
                  goTo(id)
                }}
                className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition ${
                  active === id ? "bg-sky font-medium text-sel" : "text-mute hover:text-ink"
                } ${["social", "creative", "sales", "scrapbook"].includes(id) ? "pl-6" : ""}`}
              >
                <span className="font-mono text-[10px]">{String(i + 2).padStart(2, "0")}</span>
                {l}
              </a>
            ))}
          </nav>
        </aside>

        <div ref={main} className="min-w-0">
          {/* 2. Context */}
          <Block id="context" n="02" label="Context" title="An R&D project for the textile and fashion industry">
            <p className="max-w-[62ch] text-lg leading-relaxed text-ink/75">
              Fabric Finder was developed within a research and development project exploring how digital tools, and AI in particular, could support textile designers in their day-to-day creative work, from spotting trends to building collections.
            </p>
          </Block>

          {/* 3. Challenge */}
          <Block id="challenge" n="03" label="The challenge" title="Many kinds of information, one coherent experience">
            <div className="grid gap-6 md:grid-cols-2">
              <p className="text-lg leading-relaxed text-ink/75">
                The platform brought together very different types of information and workflows, from social trends and customer data to image search, generative AI and personal references.
              </p>
              <blockquote className="rounded-2xl border-l-4 border-sel bg-white p-6 text-xl font-medium leading-snug tracking-[-0.01em]">
                One of the main design challenges was creating a consistent experience across these different areas while keeping each workflow clear and easy to explore.
              </blockquote>
            </div>
          </Block>

          {/* 4. Role */}
          <Block id="role" n="04" label="My role" title="Structure, interaction and visual design">
            <p className="max-w-[62ch] text-lg leading-relaxed text-ink/75">
              As the UX/UI Designer, I worked on the structure, interaction and visual design of the platform, translating complex features and data into clear and consistent interfaces. I worked closely with the development team throughout the prototyping process.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {["Information architecture", "UX flows and interactions", "UI and visual hierarchy", "High-fidelity prototyping"].map((r, i) => (
                <li key={r} className="rounded-2xl border border-line bg-white p-4">
                  <Mono className="text-sel">{String(i + 1).padStart(2, "0")}</Mono>
                  <p className="mt-6 font-medium leading-snug">{r}</p>
                </li>
              ))}
            </ul>
          </Block>

          {/* 5. Workflows overview */}
          <Block id="workflows" n="05" label="Designing for different workflows" title="Four modules, one product">
            <p className="max-w-[62ch] text-lg leading-relaxed text-ink/75">
              Each module answers a different question in the designer's process, but they share the same navigation, patterns and visual language.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {[
                ["social", "Social AI", "What's trending, and for whom?"],
                ["creative", "Creative AI", "Find, generate and refine designs."],
                ["sales", "Sales AI", "What do customers actually buy?"],
                ["scrapbook", "Scrapbook", "Collect and revisit references."],
              ].map(([id, t, q]) => (
                <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); goTo(id) }} className="group rounded-2xl border border-line bg-white p-4 transition hover:border-sel">
                  <p className="font-semibold">{t}</p>
                  <p className="mt-1 text-sm text-mute">{q}</p>
                  <span className="mt-6 inline-block text-sm text-sel transition group-hover:translate-x-1">→</span>
                </a>
              ))}
            </div>
          </Block>

          {/* Social AI */}
          <Block id="social" n="05.1" label="Social AI" title="Making trend exploration easier to scan and compare">
            <p className="max-w-[62ch] text-lg leading-relaxed text-ink/75">
              Social AI was redesigned to make trend exploration easier to scan and compare. I reorganised the information into clearer categories, separated trend popularity from trend evolution, and divided trend details into demographics and analytics.
            </p>
            <Frame file="fabric-7.png" name="Social AI — Popularity & trend" onOpen={open} className="mt-10" />
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <Frame file="fabric-6.png" name="Trend detail — Demographics" onOpen={open} />
              <Frame file="fabric-5.png" name="Trend detail — Analytics" onOpen={open} />
              <Frame file="fabric-16.png" name="Look attributes — pop-up" onOpen={open} />
              <Frame file="fabric-15.png" name="Instagram accounts — follow" onOpen={open} />
            </div>
          </Block>

          {/* Creative AI */}
          <Block id="creative" n="05.2" label="Creative AI" title="Search, generation and patterns in one workspace">
            <Flow steps={["Explore", "Search", "Select", "Generate", "Refine", "Save"]} />
            <p className="mt-8 max-w-[62ch] text-lg leading-relaxed text-ink/75">
              Creative AI combined visual search, image generation and pattern exploration in the same workspace. I focused on making these interactions feel connected rather than like separate tools.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Catalogue", "Image search", "Filters", "Favourites", "Generative AI", "Generated image details", "Rapport / pattern repetition"].map((f) => (
                <span key={f} className="rounded-lg border border-line bg-white px-3 py-1 text-sm">{f}</span>
              ))}
            </div>
            <Frame file="fabric-4.png" name="Creative AI — Catalogue & image search" onOpen={open} className="mt-10" />
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <Frame file="fabric-14.png" name="Creative AI — Product details" onOpen={open} />
              <Frame file="fabric-wire-2.png" name="Creative AI — Wireframe" onOpen={open} />
            </div>
          </Block>

          {/* Sales AI */}
          <Block id="sales" n="06" label="Sales AI" title="One of the areas with the biggest redesign">
            <p className="max-w-[62ch] text-lg leading-relaxed text-ink/75">
              Sales AI went through a significant redesign in Prototype III, with changes to its information architecture, navigation and visual hierarchy.
            </p>
            <div className="mt-8">
              <Flow steps={["Company overview", "Customer analysis", "Filters", "Detailed insights"]} />
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <Frame file="fabric-3.png" name="Sales AI — Company overview" onOpen={open} />
              <Frame file="fabric-2.png" name="Sales AI — Customer analysis" onOpen={open} />
              <Frame file="fabric-13.png" name="Sales AI — Colour breakdown" onOpen={open} className="md:col-span-2" />
            </div>
          </Block>

          {/* Scrapbook */}
          <Block id="scrapbook" n="07" label="Scrapbook" title="A home for visual references">
            <div className="grid items-start gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
              <p className="text-lg leading-relaxed text-ink/75">
                Scrapbook was designed as a space where designers could collect, organise and revisit visual references. I used folders, visual cards, AI recommendations and moodboard previews to support this workflow.
              </p>
              <Frame file="fabric-1.png" name="Scrapbook — Folders" onOpen={open} />
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <Frame file="fabric-11.png" name="Scrapbook — Export moodboard" onOpen={open} />
              <Frame file="fabric-10.png" name="Scrapbook — AI recommendations" onOpen={open} />
            </div>
          </Block>

          {/* Consistency */}
          <Block id="consistency" n="08" label="Creating consistency across the platform" title="Different purposes, one interaction language">
            <p className="max-w-[62ch] text-lg leading-relaxed text-ink/75">
              Although each module had a different purpose, I wanted the platform to feel like one product. I therefore created recurring UI patterns across the different experiences, adapting them to each workflow while keeping the interaction language consistent.
            </p>
            <div className="dots mt-10 grid gap-3 rounded-3xl border border-line bg-canvas p-3 sm:grid-cols-2 lg:grid-cols-3">
              {specimens.map(([name, node]) => (
                <div key={name} className="rounded-2xl border border-line bg-white p-4">
                  <div className="flex items-center gap-1.5 text-sel">
                    <span className="text-xs">◇</span>
                    <Mono>{name}</Mono>
                  </div>
                  <div className="mt-5 grid min-h-16 items-center">{node}</div>
                </div>
              ))}
            </div>
          </Block>

          {/* Prototype III */}
          <Block id="prototype" n="09" label="Prototype III — what changed" title={<>From Prototype II <span className="text-mute">→</span> Prototype III</>}>
            <div className="grid gap-3 md:grid-cols-2">
              {[
                ["Information hierarchy", "More structured content and clearer separation between categories."],
                ["Visual complexity", "Simplified image cards and reduced unnecessary visual elements."],
                ["Interactions", "More direct actions, visible filters and contextual pop-ups."],
                ["Navigation", "Clearer separation between different types of information and workflows."],
              ].map(([k, v]) => (
                <div key={k} className="rounded-2xl border border-line bg-white p-5">
                  <div className="flex items-center gap-2">
                    <Mono className="rounded bg-canvas px-1.5 py-0.5 text-mute line-through">II</Mono>
                    <span className="text-mute">→</span>
                    <Mono className="rounded bg-sel px-1.5 py-0.5 text-white">III</Mono>
                  </div>
                  <p className="mt-4 font-semibold">{k}</p>
                  <p className="mt-1 leading-relaxed text-ink/70">{v}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 grid gap-3 md:grid-cols-2">
              {[
                ["Built with variables", "Components were built in Figma with variables and conditional logic, so selectors, filters and states actually respond to the user — the prototype behaves like the real product, not a set of static mockups."],
                ["Responsive by design", "The prototype was designed to adapt to every screen size, keeping layouts and patterns consistent across breakpoints."],
              ].map(([k, v]) => (
                <div key={k} className="rounded-2xl border border-sel/30 bg-sky/40 p-5">
                  <Mono className="text-sel">◇ {k === "Built with variables" ? "{ variables }" : "↔ breakpoints"}</Mono>
                  <p className="mt-3 font-semibold">{k}</p>
                  <p className="mt-1 leading-relaxed text-ink/70">{v}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 grid items-center gap-6 rounded-3xl border border-line bg-white p-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
              <div>
                <Mono className="text-sel">◇ Inside the component</Mono>
                <p className="mt-3 font-semibold">Multi-select Geography selector</p>
                <p className="mt-2 leading-relaxed text-ink/70">
                  Each option runs a conditional on click: if nothing is selected yet, the variable is replaced by the chosen region; otherwise the region is appended to the list. The same pattern powers every filter selector in the prototype.
                </p>
                <code className="mt-4 block rounded-xl bg-ink p-3 font-mono text-[11px] leading-relaxed text-white/80">
                  if Geography == "Select Geography"<br />
                  &nbsp;&nbsp;set Selected = Geography 2<br />
                  else<br />
                  &nbsp;&nbsp;set Selected = Geography + ", " + …
                </code>
              </div>
              <Frame file="fabric-variables.png" name="Figma — variables & conditional interaction" onOpen={open} />
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <Frame file="fabric-17.png" name="Sign in" onOpen={open} />
              <Frame file="fabric-12.png" name="Loading state" onOpen={open} />
            </div>
            <div className="mt-10">
              <Mono className="mb-2 block text-mute">Drag to compare · Landing page</Mono>
              <Compare before="fabric-wire-1.png" after="fabric-8.png" />
            </div>
          </Block>

          {/* Reflection */}
          <Block id="reflection" n="10" label="Reflection" title="What this project taught me">
            <div className="grid gap-8 md:grid-cols-2">
              <p className="text-lg leading-relaxed text-ink/75">
                Designing this platform challenged me to think about how very different types of information can coexist within the same product. It also gave me the opportunity to explore how AI can be integrated into creative workflows without making the interface feel unnecessarily complex.
              </p>
              <div className="rounded-2xl bg-ink p-6 text-white">
                <Mono className="text-lime">Key takeaway</Mono>
                <p className="mt-3 text-lg leading-relaxed">
                  One of my biggest takeaways was learning how important consistency becomes when designing a product with multiple interconnected tools. Small decisions around navigation, cards, filters and information hierarchy can make a significant difference to how understandable the overall experience feels.
                </p>
              </div>
            </div>
          </Block>

          <a href="#work" className="group mt-4 flex items-center justify-between rounded-3xl border border-line bg-white p-6 transition hover:border-ink">
            <div>
              <Mono className="text-mute">Back to</Mono>
              <p className="mt-1 text-2xl font-semibold tracking-[-0.03em]">All projects</p>
            </div>
            <span className="text-2xl transition group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>

      {zoom && (
        <div role="dialog" aria-modal="true" aria-label={zoom[1]} onClick={() => setZoom(null)} className="fixed inset-0 z-50 grid place-items-center bg-ink/80 p-4 backdrop-blur-sm">
          <figure className="max-w-[1400px]">
            <img src={asset(zoom[0])} alt={zoom[1]} className="max-h-[85vh] w-auto rounded-xl" />
            <figcaption className="mt-3 text-center font-mono text-xs text-white/70">{zoom[1]} · Esc to close</figcaption>
          </figure>
        </div>
      )}
    </div>
  )
}
