import { useEffect, useRef, useState } from "react"
import logoMark from "../assets/logo-mark.svg"
import { asset } from "../data/projects"
import { Block, Frame, Mono } from "./FabricFinder"

/* Dashboard Suite (EnerWise + OrderWise) — case study page (route: #/dashboards)
   Baseado no relatório TEXP@CT · PPS10 (CITEVE, 2026). OrderWise seguiu o mesmo processo. */

const toc = [
  ["context", "Context"],
  ["challenge", "The challenge"],
  ["role", "My role"],
  ["system", "Shared system"],
  ["enerwise", "EnerWise"],
  ["evolution", "Prototype 1 → 3"],
  ["chatbot", "AI assistant"],
  ["orderwise", "OrderWise"],
  ["reflection", "Reflection"],
] as const

const stages = [
  ["Prototype 1", "Forecasting electricity consumption and testing the models. The first ideas for a natural-language assistant."],
  ["Prototype 2", "First interface, designed in Figma and built in React: a landing page for operation parameters, a predictions & analysis page and the chatbot."],
  ["Prototype 3", "From predictions to recommendations. After validation with partners, the app was restructured into a home page and dedicated modules."],
] as const

export default function Dashboards() {
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
              amethy / work / <span className="text-mute">dashboard-suite.case</span>
            </span>
          </a>
          <a href="#work" className="rounded-lg px-3 py-1.5 text-sm text-mute transition hover:bg-canvas hover:text-ink">
            ← All work
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-[1240px] px-5 pt-16 md:px-8 md:pt-24">
        <Mono className="text-mute">Case study · Dashboard Suite · 2025 — 2026</Mono>
        <h1 className="mt-4 max-w-[16ch] text-[clamp(2.6rem,7vw,5.6rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
          Two AI dashboards, <span className="font-serif font-normal italic text-sel">one design system</span>
        </h1>
        <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-ink/75">
          EnerWise forecasts energy use in textile finishing; OrderWise predicts order breakages across production. Both turn machine-learning output into decisions factory teams can act on.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {["UX/UI Design", "Design System", "Data Visualisation", "AI"].map((t) => (
            <span key={t} className="rounded-full bg-sky px-3 py-1 text-xs font-medium text-sel">{t}</span>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[
            ["enerwise-1.png", "EnerWise — Smart energy monitoring"],
            ["orderwise-1.png", "OrderWise — The intelligent way to manage orders"],
          ].map(([f, n]) => (
            <div key={f} className="relative">
              <div className="pointer-events-none absolute -inset-2 rounded-[22px] border-2 border-sel" />
              <Mono className="absolute -top-7 left-0 rounded-t-md bg-sel px-2 py-1 text-white">{n.split(" — ")[0]}</Mono>
              <button onClick={() => open(f, n)} className="block w-full overflow-hidden rounded-2xl border border-line bg-white">
                <img src={asset(f)} alt={n} className="block w-full" />
              </button>
            </div>
          ))}
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
          {[
            ["Role", "UX/UI Designer"],
            ["Client", "CITEVE · TEXP@CT"],
            ["Products", "EnerWise · OrderWise"],
            ["Tools", "Figma"],
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
                className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition ${active === id ? "bg-sky font-medium text-sel" : "text-mute hover:text-ink"} ${["evolution", "chatbot"].includes(id) ? "pl-6" : ""}`}
              >
                <span className="font-mono text-[10px]">{String(i + 2).padStart(2, "0")}</span>
                {l}
              </a>
            ))}
          </nav>
        </aside>

        <div ref={main} className="min-w-0">
          <Block id="context" n="02" label="Context" title="AI for textile manufacturing">
            <p className={p}>
              Both dashboards were designed at CITEVE within TEXP@CT, the Innovation Pact for the Digital Transition of the Textile and Clothing sector — in the “AI for Manufacturing Process Improvement” line of work. The project followed an iterative strategy of three prototypes, each one informing the next.
            </p>
          </Block>

          <Block id="challenge" n="03" label="The challenge" title="From model output to a decision on the factory floor">
            <div className="grid gap-6 md:grid-cols-2">
              <p className="text-lg leading-relaxed text-ink/75">
                The models produce forecasts, confidence intervals, clusters and outliers. The people using them are production teams, not data scientists — they need to know what to do, how sure the system is, and how this compares to what happened before.
              </p>
              <blockquote className="rounded-2xl border-l-4 border-sel bg-white p-6 text-xl font-medium leading-snug tracking-[-0.01em]">
                Make uncertainty visible without making the interface feel uncertain.
              </blockquote>
            </div>
          </Block>

          <Block id="role" n="04" label="My role" title="Interface design, from first screen to final modules">
            <p className={p}>
              I designed the user interface in Figma for both products, working alongside the data science and development teams as the models matured and adapting the structure after each round of validation with industry partners.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {["Shared design system", "Information architecture", "Data visualisation", "AI assistant (chatbot)"].map((r, i) => (
                <li key={r} className="rounded-2xl border border-line bg-white p-4">
                  <Mono className="text-sel">{String(i + 1).padStart(2, "0")}</Mono>
                  <p className="mt-6 font-medium leading-snug">{r}</p>
                </li>
              ))}
            </ul>
          </Block>

          <Block id="system" n="05" label="Shared design system" title="Built once, adapted twice">
            <p className={p}>
              Both products share the same components, tokens and patterns, parameter forms, suggestion cards, confidence labels, charts and tables, so each new module could be designed faster and stay consistent.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                ["Confidence labels", "Colour-coded red / amber / green so low, medium and high confidence read instantly."],
                ["Suggestion cards", "The recommended value first, with its confidence interval right underneath."],
                ["History vs cluster", "Every forecast compared with similar past operations (±10% weight)."],
              ].map(([k, v]) => (
                <div key={k} className="rounded-2xl border border-line bg-white p-5">
                  <p className="font-semibold">{k}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink/70">{v}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {["dash-wire-2.png", "dash-wire-1.png", "dash-wire-3.png"].map((f, i) => (
                <Frame key={f} file={f} name={`Wireframe ${i + 1}`} onOpen={open} />
              ))}
            </div>
          </Block>

          <Block id="enerwise" n="06" label="EnerWise" title="Smart energy monitoring and optimisation">
            <p className={p}>
              EnerWise helps finishing plants predict gas and electricity consumption, recommended speed and duration for an operation and find the conditions that use the least energy.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {[
                ["Analysis", "Forecasts, suggestions and a heatmap of gas use by fabric weight."],
                ["Outliers", "Summary indicators, charts and a table of anomalous operations."],
                ["History", "Every recorded operation, with filters by process parameter."],
                ["Gas simulation", "Set ranges, get combinations ranked by lowest predicted gas."],
              ].map(([k, v]) => (
                <div key={k} className="rounded-2xl border border-line bg-white p-4">
                  <p className="font-semibold">{k}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink/70">{v}</p>
                </div>
              ))}
            </div>
          </Block>

          <Block id="evolution" n="06.1" label="Prototype 1 → 3" title="Evolving with the models">
            <ol className="grid gap-3 md:grid-cols-3">
              {stages.map(([k, v], i) => (
                <li key={k} className="rounded-2xl border border-line bg-white p-5">
                  <Mono className={`rounded px-1.5 py-0.5 ${i === 2 ? "bg-sel text-white" : "bg-canvas text-mute"}`}>P{i + 1}</Mono>
                  <p className="mt-4 font-semibold">{k}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink/70">{v}</p>
                </li>
              ))}
            </ol>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <Frame file="enerwise-p2-landing.png" name="P2 — Landing & operation parameters" onOpen={open} />
              <Frame file="enerwise-p2-analysis.png" name="P2 — Predictions & analysis" onOpen={open} />
            </div>
            <div className="mt-6 grid items-start gap-6 rounded-3xl border border-line bg-white p-5 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
              <div>
                <Mono className="text-sel">◇ What changed in P3</Mono>
                <ul className="mt-3 space-y-2 leading-relaxed text-ink/75">
                  <li>· A new home page centralising every module.</li>
                  <li>· Outlier detection moved out of analysis into its own module.</li>
                  <li>· Confidence labels recoloured red / amber / green.</li>
                  <li>· A heatmap of gas consumption by fabric weight and speed.</li>
                  <li>· New History and Gas simulation modules.</li>
                </ul>
                <p className="mt-4 text-sm leading-relaxed text-ink/60">Driven by validation with partners, who flagged opportunities in organisation, navigation and how information was presented.</p>
              </div>
              <Frame file="enerwise-p3-analysis.png" name="P3 — Analysis module" onOpen={open} />
            </div>
            <Mono className="mt-10 mb-3 block text-mute">Final screens</Mono>
            <div className="grid gap-6 md:grid-cols-2">
              {["enerwise-2.png", "enerwise-3.png", "enerwise-4.png", "enerwise-5.png", "enerwise-6.png"].map((f, i) => (
                <Frame key={f} file={f} name={`EnerWise ${i + 2}`} onOpen={open} />
              ))}
            </div>
          </Block>

          <Block id="chatbot" n="06.2" label="AI assistant" title="Ask the data in plain language">
            <p className={p}>
              A chatbot lets anyone query the operations database in natural language. I designed it in two complementary modes that share the same elements: clear chat, model settings, message field, send and a loading state.
            </p>
            <div className="mt-10 grid items-start gap-6 md:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)]">
              <Frame file="enerwise-chat-float.png" name="Floating window — from any page" onOpen={open} />
              <Frame file="enerwise-chat-page.png" name="Dedicated page — more room for answers" onOpen={open} />
            </div>
          </Block>

          <Block id="orderwise" n="07" label="OrderWise" title="Same process, a different question">
            <div className="grid gap-6 md:grid-cols-2">
              <p className="text-lg leading-relaxed text-ink/75">
                OrderWise was designed with exactly the same process and design system. The difference is the problem: instead of energy, it detects and forecasts order breakages across the production flow, from the knitted fabric order onwards, and suggests how to act on them.
              </p>
              <div className="rounded-2xl border border-line bg-white p-6">
                <Mono className="text-sel">Reused from EnerWise</Mono>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Parameter forms", "Suggestion cards", "Confidence labels", "Charts", "Tables", "Empty states"].map((t) => (
                    <span key={t} className="rounded-full bg-canvas px-3 py-1 text-sm">{t}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {["orderwise-2.png", "orderwise-3.png", "orderwise-4.png", "orderwise-5.png", "orderwise-6.png", "orderwise-7.png"].map((f, i) => (
                <Frame key={f} file={f} name={`OrderWise ${i + 2}`} onOpen={open} />
              ))}
            </div>
          </Block>

          <Block id="reflection" n="08" label="Reflection" title="What this project taught me">
            <div className="grid gap-8 md:grid-cols-2">
              <p className="text-lg leading-relaxed text-ink/75">
                Designing alongside models that kept changing meant the interface had to grow with them — from a single forecast page to a platform for monitoring, anomaly detection, history and simulation.
              </p>
              <div className="rounded-2xl bg-ink p-6 text-white">
                <Mono className="text-lime">Key takeaway</Mono>
                <p className="mt-3 text-lg leading-relaxed">
                  A shared design system pays off twice: it kept two very different products consistent, and it let the second one move much faster than the first.
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
