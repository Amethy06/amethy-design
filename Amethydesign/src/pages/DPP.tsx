import { useEffect, useRef, useState } from "react"
import logoMark from "../assets/logo-mark.svg"
import { asset } from "../data/projects"
import { Block, Frame, Mono } from "./FabricFinder"

/* Digital Product Passport — case study page (route: #/dpp)
   Conteúdo baseado no relatório de mestrado (UTAD · CITEVE, 2025). Imagens em src/assets/projects/ */

const toc = [
  ["context", "Context"],
  ["challenge", "The challenge"],
  ["role", "My role"],
  ["research", "Research"],
  ["personas", "Personas"],
  ["process", "Process"],
  ["components", "Components"],
  ["prototype", "Prototype"],
  ["testing", "Usability testing"],
  ["next", "What's next"],
  ["reflection", "Reflection"],
] as const

const personas = [
  ["dpp-persona-ana.png", "Ana Silva", "Conscious consumer", "Graphic designer who checks that what she buys is made ethically and sustainably.", "Certifications, impact data and filters to compare products."],
  ["dpp-persona-pedro.png", "Pedro Marques", "Purchasing manager", "Needs to track suppliers’ materials and make sure they meet the company’s standards.", "Traceability across the value chain and supplier details."],
  ["dpp-persona-sofia.png", "Sofia Oliveira", "Fashion student", "Uses product data as study material on materials and production processes.", "Composition, origin and production methods, easy to find."],
  ["dpp-persona-joao.png", "João Fernandes", "Everyday consumer", "Scans a QR code in-store to learn about a product before buying it.", "A fast, clear mobile experience with QR scanning."],
] as const

const before = [
  ["Score", "A colour bar of percentage ranges that never showed the actual score — and clashed with the app’s palette."],
  ["Certifications", "Not present at all. They had to be added without competing with everything else."],
  ["Composition", "Plain text only, with no visual representation to read or compare."],
  ["Consumption", "An icon, a title and a total — no breakdown per production activity."],
  ["Product journey", "Every company shown at once, with no focus and no production line to follow."],
  ["Care & repair", "Too much information at the same time to be useful."],
] as const

export default function DPP() {
  const [zoom, setZoom] = useState<[string, string] | null>(null)
  const [active, setActive] = useState<string>("context")
  const open = (f: string, n: string) => setZoom([f, n])
  const main = useRef<HTMLDivElement>(null)
  const lock = useRef(false)
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
    const sections = Array.from(main.current?.querySelectorAll<HTMLElement>("section[id]") ?? [])
    const onScroll = () => {
      if (lock.current) return
      let current: string | undefined = sections[0]?.id
      for (const s of sections) if (s.getBoundingClientRect().top <= 160) current = s.id
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

  const p = "max-w-[62ch] text-lg leading-relaxed text-ink/75"

  return (
    <div className="pb-10">
      <header className="sticky top-3 z-30 mx-auto max-w-[1240px] px-3 md:px-8">
        <div className="flex items-center justify-between rounded-2xl border border-line bg-white/85 px-3 py-2 shadow-sm backdrop-blur">
          <a href="#work" className="flex items-center gap-2">
            <img src={logoMark} alt="Amethy Design" className="h-8 w-8 object-contain" />
            <span className="hidden text-sm font-medium sm:inline">
              amethy / work / <span className="text-mute">digital-product-passport.case</span>
            </span>
          </a>
          <a href="#work" className="rounded-lg px-3 py-1.5 text-sm text-mute transition hover:bg-canvas hover:text-ink">
            ← All work
          </a>
        </div>
      </header>

      {/* Hero */}
      <div className="mx-auto max-w-[1240px] px-5 pt-16 md:px-8 md:pt-24">
        <Mono className="text-mute">Case study · Digital Product Passport · 2024 — 2025</Mono>
        <h1 className="mt-4 max-w-[16ch] text-[clamp(2.6rem,7vw,5.6rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
          Making a garment’s journey <span className="font-serif font-normal italic text-sel">easy to read</span>
        </h1>
        <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-ink/75">
          Redesigning CITEVE’s Digital Product Passport — the app that shows a textile product’s traceability, composition, certifications and environmental impact — for mobile and desktop.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {["UX Research", "UX/UI Design", "Usability testing", "Sustainability"].map((t) => (
            <span key={t} className="rounded-full bg-sky px-3 py-1 text-xs font-medium text-sel">{t}</span>
          ))}
        </div>

        <div className="relative mt-12">
          <div className="pointer-events-none absolute -inset-2 rounded-[22px] border-2 border-sel" />
          <Mono className="absolute -top-7 left-0 rounded-t-md bg-sel px-2 py-1 text-white">DPP — High-fidelity</Mono>
          <button onClick={() => open("dpp-cover.png", "DPP — High-fidelity")} className="block w-full overflow-hidden rounded-2xl border border-line bg-white">
            <img src={asset("dpp-cover.png")} alt="Digital Product Passport redesign" className="block w-full" />
          </button>
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
          {[
            ["Role", "Sole UX/UI Designer"],
            ["Client", "CITEVE · be@t project"],
            ["Platforms", "Mobile + Desktop"],
            ["Tools", "Figma · FigJam · Maze"],
          ].map(([k, v]) => (
            <div key={k} className="bg-white p-4">
              <dt><Mono className="text-mute">{k}</Mono></dt>
              <dd className="mt-1 text-sm font-medium">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

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
                className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition ${active === id ? "bg-sky font-medium text-sel" : "text-mute hover:text-ink"}`}
              >
                <span className="font-mono text-[10px]">{String(i + 2).padStart(2, "0")}</span>
                {l}
              </a>
            ))}
          </nav>
        </aside>

        <div ref={main} className="min-w-0">
          <Block id="context" n="02" label="Context" title="Traceability for the textile industry">
            <p className={p}>
              The Digital Product Passport (DPP) gives every textile product a digital record — where it was made, what it’s made of, its certifications and its environmental footprint. It was developed at CITEVE, within the be@t Textile Bioeconomy project, as part of the industry’s twin transition: digital and sustainable.
            </p>
            <p className={`${p} mt-4`}>
              This redesign was also my Master’s project in Multimedia Technology at UTAD.
            </p>
          </Block>

          <Block id="challenge" n="03" label="The challenge" title="Lots of important data, hard to understand">
            <div className="grid gap-6 md:grid-cols-2">
              <p className="text-lg leading-relaxed text-ink/75">
                The first version (TexJourney) already held the data brands wanted to share, but it was hard to read and hard to navigate. My goal was to make the app more intuitive and interactive and to fix its usability problems, for both consumers and industry professionals.
              </p>
              <blockquote className="rounded-2xl border-l-4 border-sel bg-white p-6 text-xl font-medium leading-snug tracking-[-0.01em]">
                The core tension: how to keep complex, highly detailed information complete while keeping the interface simple.
              </blockquote>
            </div>
            <Mono className="mt-10 block text-mute">What wasn’t working</Mono>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {before.map(([k, v]) => (
                <div key={k} className="rounded-2xl border border-line bg-white p-5">
                  <Mono className="rounded bg-pink/15 px-1.5 py-0.5 text-pink">before</Mono>
                  <p className="mt-3 font-semibold">{k}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink/70">{v}</p>
                </div>
              ))}
            </div>
          </Block>

          <Block id="role" n="04" label="My role" title="End to end, from research to testing">
            <p className={p}>
              I was the only designer on the project, working with CITEVE’s team and using Figma as a shared space for constant feedback.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {["Requirements & competitor analysis", "Personas & user needs", "Wireframes → high-fidelity prototypes", "Usability testing with Maze"].map((r, i) => (
                <li key={r} className="rounded-2xl border border-line bg-white p-4">
                  <Mono className="text-sel">{String(i + 1).padStart(2, "0")}</Mono>
                  <p className="mt-6 font-medium leading-snug">{r}</p>
                </li>
              ))}
            </ul>
          </Block>

          <Block id="research" n="05" label="Research" title="What the passport has to communicate">
            <p className={p}>
              I analysed the existing platform and its requirements, and benchmarked similar traceability products to see how others present this kind of information.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {["CIRPASS", "TrusTrace", "BCome.", "circular.fashion", "FibreTrace"].map((c) => (
                <span key={c} className="rounded-full border border-line bg-white px-3.5 py-1.5 text-sm font-medium">{c}</span>
              ))}
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {[
                ["Core content", "Sustainability score, certifications, composition, consumption, product journey, care & repair."],
                ["Search", "Find a product by ID or by scanning its QR code."],
                ["Filters", "Narrow results by score, brand and product type."],
                ["Similar products", "Suggest alternatives to encourage more responsible choices."],
              ].map(([k, v]) => (
                <div key={k} className="rounded-2xl border border-line bg-white p-4">
                  <p className="font-semibold">{k}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink/70">{v}</p>
                </div>
              ))}
            </div>
          </Block>

          <Block id="personas" n="06" label="Personas" title="From conscious buyers to curious shoppers">
            <p className={p}>
              Four personas covered the main types of users — from conscious consumers to everyday ones — and each shaped specific features.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {personas.map(([file, name, type, who, needs]) => (
                <article key={name} className="overflow-hidden rounded-2xl border border-line bg-white">
                  <button onClick={() => open(file, `Persona — ${name}`)} className="block aspect-[16/9] w-full overflow-hidden bg-canvas" aria-label={`Enlarge ${name} persona`}>
                    <img src={asset(file)} alt={`${name} persona`} loading="lazy" className="h-full w-full object-cover object-top transition hover:scale-105" />
                  </button>
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-lg font-semibold">{name}</p>
                      <span className="rounded-full bg-sky px-2.5 py-0.5 text-xs font-medium text-sel">{type}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-ink/70">{who}</p>
                    <p className="mt-3 text-sm"><Mono className="text-mute">needs →</Mono> {needs}</p>
                  </div>
                </article>
              ))}
            </div>
          </Block>

          <Block id="process" n="07" label="Process" title="Sketch, mid-fidelity, high-fidelity">
            <p className={p}>
              I started with paper sketches to define the structure, moved to mid-fidelity to add icons, type and spacing, and finished with interactive high-fidelity prototypes — detailed enough that no piece of information lost its weight.
            </p>
            <div className="mt-10 grid items-end gap-6 md:grid-cols-[1.3fr_0.7fr_1fr]">
              <Frame file="dpp-sketches.png" name="01 · Initial sketches" onOpen={open} />
              <Frame file="dpp-midfi.png" name="02 · Mid-fidelity" onOpen={open} />
              <Frame file="dpp-mobile-1.png" name="03 · High-fidelity" onOpen={open} />
            </div>
          </Block>

          <Block id="components" n="08" label="Components" title="Turning data into something you can read">
            <p className={p}>
              Each piece of information got its own component, designed for mobile and desktop and built with interactive variants in Figma.
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div>
                <Frame file="dpp-consumos.png" name="Consumption — per indicator, expandable" onOpen={open} />
                <p className="mt-3 text-sm leading-relaxed text-ink/70">Water, carbon, chemicals and recovered waste each get a value, an explanation and a breakdown by production activity.</p>
              </div>
              <div>
                <Frame file="dpp-journey.png" name="Product journey — map" onOpen={open} />
                <p className="mt-3 text-sm leading-relaxed text-ink/70">A map turns the value chain into countries, activities and distance at a glance — and expands into the full journey.</p>
                <Frame file="dpp-trending.png" name="Product carousel — score badges" onOpen={open} className="mt-6" />
                <p className="mt-3 text-sm leading-relaxed text-ink/70">The score became a clear A–E badge in the app’s own palette, instead of a generic red-to-green bar.</p>
              </div>
            </div>
            <div className="mt-10 grid items-start gap-6 rounded-3xl border border-line bg-white p-5 md:grid-cols-[minmax(0,1fr)_minmax(0,0.6fr)_minmax(0,0.75fr)]">
              <div>
                <Mono className="text-sel">◇ Inside the components</Mono>
                <p className="mt-3 font-semibold">Fully interactive filters</p>
                <p className="mt-2 leading-relaxed text-ink/70">
                  The score range selector and the type selector were built with every state as a variant, connected with drag and click interactions — so filters behave in the prototype exactly as they would in the product.
                </p>
              </div>
              <Frame file="dpp-score.png" name="ScoreSelector — on drag" onOpen={open} />
              <Frame file="dpp-selection.png" name="Selection-Type — on click" onOpen={open} />
            </div>
          </Block>

          <Block id="prototype" n="09" label="Prototype" title="Designed for the shop floor and the desk">
            <p className={p}>
              On mobile, the passport is built for quick, in-store checks. On desktop, the same content opens up into a wider layout for deeper research.
            </p>
            <Mono className="mt-10 mb-3 block text-mute">Mobile</Mono>
            <div className="flex snap-x gap-4 overflow-x-auto pb-3 [scrollbar-width:none]">
              {["dpp-mobile-1.png", "dpp-mobile-2.png", "dpp-mobile-3.png", "dpp-mobile-4.png", "dpp-mobile-5.png"].map((f, i) => (
                <button key={f} onClick={() => open(f, `Mobile ${i + 1}`)} className="shrink-0 snap-start overflow-hidden rounded-2xl border border-line bg-white">
                  <img src={asset(f)} alt={`DPP mobile screen ${i + 1}`} loading="lazy" className="h-[420px] w-auto" />
                </button>
              ))}
            </div>
            <Mono className="mt-8 mb-3 block text-mute">Desktop</Mono>
            <div className="grid gap-6 md:grid-cols-2">
              {["dpp-desktop-1.png", "dpp-desktop-2.png", "dpp-desktop-3.png", "dpp-desktop-4.png"].map((f, i) => (
                <Frame key={f} file={f} name={`Desktop ${i + 1}`} onOpen={open} />
              ))}
            </div>
          </Block>

          <Block id="testing" n="10" label="Usability testing" title="Tested with 18 people at CITEVE">
            <p className={p}>
              I ran task-based tests on Maze with 18 CITEVE staff — 8 on mobile and 10 on desktop — measuring success rate, time, drop-offs and misclicks per task.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
              {[
                ["18", "participants, ages 23–57"],
                ["8.5/10", "mobile: information easy to understand"],
                ["100%", "success on certifications & composition tasks"],
                ["0", "misclicks on those tasks"],
              ].map(([k, v]) => (
                <div key={v} className="bg-white p-5">
                  <p className="text-4xl font-semibold tracking-[-0.04em] text-sel">{k}</p>
                  <p className="mt-2 text-sm text-ink/70">{v}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-line bg-white p-6">
              <Mono className="text-sel">What worked</Mono>
              <p className="mt-3 max-w-[70ch] leading-relaxed text-ink/75">
                Product content was clear: on mobile, people found certifications and composition instantly and rated the information 8.5 out of 10 for clarity.
              </p>
            </div>
          </Block>

          <Block id="next" n="11" label="What's next" title="Iterating on what testing revealed">
            <div className="grid gap-3 md:grid-cols-2">
              {[
                ["In-app tutorials", "An info icon on each page that opens a short guide to its elements — already designed and in progress."],
                ["New score filter", "Select one or several individual scores, instead of being forced into a range."],
              ].map(([k, v]) => (
                <div key={k} className="rounded-2xl border border-line bg-white p-5">
                  <Mono className="rounded bg-sel px-1.5 py-0.5 text-white">next</Mono>
                  <p className="mt-4 font-semibold">{k}</p>
                  <p className="mt-1 leading-relaxed text-ink/70">{v}</p>
                </div>
              ))}
            </div>
          </Block>

          <Block id="reflection" n="12" label="Reflection" title="What this project taught me">
            <div className="grid gap-8 md:grid-cols-2">
              <p className="text-lg leading-relaxed text-ink/75">
                The DPP showed me how UX and UI can bring clarity to an industry that’s still going digital. The hardest part was balancing complete, technical information with a simple interface — and keeping it working and appealing on every device.
              </p>
              <div className="rounded-2xl bg-ink p-6 text-white">
                <Mono className="text-lime">Key takeaway</Mono>
                <p className="mt-3 text-lg leading-relaxed">
                  Testing early, even with an incomplete prototype, is what turns assumptions into decisions. An iterative approach, constant validation and close collaboration with the team made the difference.
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
