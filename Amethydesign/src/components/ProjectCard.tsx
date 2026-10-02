import { useRef, useState } from "react"
import { asset, type Project } from "../data/projects"

const Mono = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span className={`font-mono text-[11px] ${className}`}>{children}</span>
)

/* Automatic mini UI mock — shown when a project has no image yet */
function Mock({ accent: a, wire, dashboard }: { accent: string; wire: boolean; dashboard?: boolean }) {
  const block = (cls: string, fill?: string) => (
    <div
      className={`rounded-md transition-all duration-500 ${cls}`}
      style={wire ? { border: "1.5px dashed #9a9aa0", background: "transparent" } : { background: fill ?? "#ececea" }}
    />
  )
  return (
    <div
      className={`relative h-full w-full overflow-hidden rounded-xl transition-colors duration-500 ${wire ? "bg-white dots" : ""}`}
      style={wire ? {} : { background: `linear-gradient(160deg, ${a}22, ${a}55)` }}
    >
      <div className="absolute inset-x-[10%] top-[12%] bottom-[-8%] flex flex-col gap-3 rounded-t-2xl bg-white p-4 shadow-xl">
        <div className="flex items-center justify-between">
          {block("h-3 w-16", a)}
          <div className="flex gap-1.5">
            {block("h-3 w-3 rounded-full")}
            {block("h-3 w-3 rounded-full")}
          </div>
        </div>
        {dashboard ? (
          <div className="grid flex-1 grid-cols-4 gap-3">
            {block("h-10", `${a}33`)}
            {block("h-10", `${a}33`)}
            {block("h-10", `${a}33`)}
            {block("h-10", `${a}33`)}
            <div className="col-span-3 flex items-end gap-1.5">
              {[40, 65, 50, 80, 60, 95, 70].map((h, i) => (
                <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, ...(wire ? { border: "1.5px dashed #9a9aa0" } : { background: a }) }} />
              ))}
            </div>
            {block("", "#f3f3f0")}
          </div>
        ) : (
          <div className="grid flex-1 grid-cols-3 gap-3">
            {block("col-span-2 row-span-2", a)}
            {block("", `${a}55`)}
            {block("", "#ececea")}
            {block("col-span-3 h-8", "#f3f3f0")}
          </div>
        )}
        {wire && <Mono className="absolute right-3 top-3 rounded bg-pink px-1 text-white">wireframe</Mono>}
      </div>
    </div>
  )
}

/* Row of portrait phone screens */
function PhoneStrip({ files, title, label }: { files: string[]; title: string; label: string }) {
  return (
    <div className="dots flex h-full w-full items-center justify-center gap-[3%] overflow-hidden rounded-xl bg-canvas px-[4%]">
      {files.map((f, i) => (
        <img
          key={f}
          src={asset(f)}
          alt={`${title} — ${label} ${i + 1}`}
          className="h-[82%] w-auto rounded-[14px] border-4 border-ink bg-white object-cover shadow-xl"
          style={{ transform: `translateY(${i % 2 ? 6 : -6}%)` }}
        />
      ))}
    </div>
  )
}

/* Real image if provided, otherwise the automatic mock */
function Visual({ title, accent, image, wireframe, wire, dashboard }: { title: string; accent: string; image?: string; wireframe?: string; wire: boolean; dashboard?: boolean }) {
  const ui = asset(image)
  const wf = asset(wireframe)
  if (!ui && wire && wf)
    return (
      <div className="dots grid h-full w-full place-items-center overflow-hidden rounded-xl bg-canvas p-[5%]">
        <img src={wf} alt={`${title} — wireframe`} className="max-h-full w-full rounded-lg border border-line bg-white object-contain shadow-lg" />
      </div>
    )
  if (!ui) return <Mock accent={accent} wire={wire} dashboard={dashboard} />
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-canvas">
      <img src={ui} alt={`${title} — final UI`} className="absolute inset-0 h-full w-full object-cover" />
      {wf && (
        <img
          src={wf}
          alt={`${title} — wireframe`}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${wire ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  )
}

export default function ProjectCard({ p, n, expanded = false }: { p: Project; n: string; expanded?: boolean }) {
  const [wire, setWire] = useState(false)
  const [tab, setTab] = useState(0)
  const [open, setOpen] = useState(expanded)
  const track = useRef<HTMLDivElement>(null)
  const slide = (dir: number) => {
    const el = track.current
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" })
  }
  const [view, setView] = useState<"desktop" | "mobile" | "wireframes">("desktop")
  const item = p.suite?.[tab]
  const views = {
    desktop: item?.desktopScreens ?? p.desktopScreens ?? [],
    mobile: p.screens ?? [],
    wireframes: p.desktopWireframes ?? [],
  }
  const available = (Object.keys(views) as (keyof typeof views)[]).filter((v) => views[v].length)
  const galleryView = views[view].length ? view : available[0]
  const gallery = galleryView ? views[galleryView] : []
  const image = item ? item.image : p.image
  const wireframe = item?.wireframe ?? p.wireframe
  // Toggle shows when there's a real wireframe, or when using the automatic mock
  const wireScreens = !item && p.wireframeScreens?.length ? p.wireframeScreens : undefined
  const canToggle = !p.draft && (!asset(image) || !!asset(wireframe) || !!wireScreens)
  const big = !!p.featured

  return (
    <article
      className={`group min-w-0 overflow-hidden rounded-3xl border bg-white p-3 transition hover:shadow-xl ${p.draft ? "border-dashed border-mute/40" : "border-line"} ${
        big ? "md:col-span-6 md:grid md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:gap-8" : "md:col-span-3"
      }`}
    >
      <div className={`relative ${big ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
        {p.draft ? (
          <div className="dots grid h-full w-full place-items-center rounded-xl bg-canvas">
            <span className="rounded-full border border-line bg-white px-4 py-2 font-mono text-xs text-mute">In progress ✦</span>
          </div>
        ) : wire && wireScreens ? (
          <PhoneStrip files={wireScreens} title={p.title} label="wireframe" />
        ) : (
          <Visual title={item?.name ?? p.title} accent={p.accent} image={image} wireframe={wireframe} wire={wire} dashboard={p.cats.includes("Dashboards")} />
        )}
        {canToggle && (
          <button
            onClick={() => setWire(!wire)}
            className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-white/95 p-1 text-xs font-medium shadow"
          >
            <span className={`rounded-full px-2.5 py-1 transition ${wire ? "bg-ink text-white" : "text-mute"}`}>Wireframe</span>
            <span className={`rounded-full px-2.5 py-1 transition ${!wire ? "bg-ink text-white" : "text-mute"}`}>UI</span>
          </button>
        )}
      </div>

      <div className="flex flex-col p-4 md:py-6">
        <div className="flex items-center gap-2">
          <Mono className="text-mute">{n}</Mono>
          <span className="rounded-full bg-sky px-2.5 py-0.5 text-xs font-medium text-sel">{p.tag}</span>
          <Mono className="ml-auto text-mute">{p.year}</Mono>
        </div>
        <h3 className={`mt-4 font-semibold tracking-[-0.03em] ${big ? "text-4xl" : "text-2xl"}`}>{p.title}</h3>
        <p className="mt-3 leading-relaxed text-ink/75">{p.desc}</p>

        {p.suite && (
          <div className="mt-6">
            <Mono className="text-mute">Shared design system · {p.suite.length} products</Mono>
            <div className="mt-2 flex flex-wrap gap-1 rounded-xl bg-canvas p-1">
              {p.suite.map((s, i) => (
                <button
                  key={s.name}
                  onClick={() => { setTab(i); track.current?.scrollTo({ left: 0 }) }}
                  className={`flex-1 rounded-lg px-3 py-1.5 text-sm font-medium transition ${tab === i ? "bg-white text-ink shadow-sm" : "text-mute hover:text-ink"}`}
                >
                  {s.name}
                </button>
              ))}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink/75">{item?.desc}</p>
          </div>
        )}

        {big && p.details && !p.suite && (
          <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
            {p.details.map(([k, v]) => (
              <div key={k} className="rounded-xl bg-canvas p-3">
                <dt className="text-mute">{k}</dt>
                <dd className="font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        )}

        {p.link && (
          <a href={p.link} className="mt-auto pt-6 text-sm font-medium text-sel">
            Read case study <span className="inline-block transition group-hover:translate-x-1">→</span>
          </a>
        )}
      </div>

      {available.length > 0 && !big && !open && (
        <button
          onClick={() => setOpen(true)}
          className="mx-1 mt-1 flex w-[calc(100%-0.5rem)] items-center justify-between rounded-2xl border border-dashed border-line px-4 py-3 text-sm font-medium text-mute transition hover:border-ink hover:text-ink"
        >
          <span>View screens · {available.reduce((n, v) => n + views[v].length, 0)}</span>
          <span aria-hidden>↓</span>
        </button>
      )}

      {available.length > 0 && (big || open) && (
        <div className="min-w-0 md:col-span-2 border-t border-line px-1 pt-5 pb-2">
          <div className="mb-3 flex items-center justify-between gap-3 px-3">
            <div className="flex gap-1 rounded-xl bg-canvas p-1">
              {available.map((v) => (
                  <button
                    key={v}
                    onClick={() => { setView(v); track.current?.scrollTo({ left: 0 }) }}
                    className={`rounded-lg px-3 py-1 text-xs font-medium capitalize transition ${galleryView === v ? "bg-white text-ink shadow-sm" : "text-mute hover:text-ink"}`}
                  >
                    {v} · {views[v].length}
                  </button>
                ))}
            </div>
            <div className="flex gap-2">
              {[-1, 1].map((d) => (
                <button
                  key={d}
                  onClick={() => slide(d)}
                  aria-label={d < 0 ? "Previous screens" : "Next screens"}
                  className="grid h-9 w-9 place-items-center rounded-full border border-line bg-white text-lg transition hover:border-ink hover:bg-ink hover:text-white"
                >
                  {d < 0 ? "←" : "→"}
                </button>
              ))}
            </div>
          </div>
          <div ref={track} className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-3 pb-3 [scrollbar-width:none]">
            {gallery.map((f, i) => (
              <img
                key={f}
                src={asset(f)}
                alt={`${p.title} — ${galleryView} screen ${i + 1}`}
                loading="lazy"
                className={`w-auto shrink-0 snap-start rounded-2xl border border-line bg-canvas object-cover transition hover:-translate-y-1 hover:shadow-lg ${galleryView === "mobile" ? "h-[380px]" : "h-[260px] md:h-[340px]"}`}
              />
            ))}
          </div>
          {!big && (
            <button
              onClick={() => setOpen(false)}
              className="mx-3 mt-1 flex items-center gap-2 text-sm font-medium text-mute transition hover:text-ink"
            >
              Hide screens <span aria-hidden>↑</span>
            </button>
          )}
        </div>
      )}
    </article>
  )
}
