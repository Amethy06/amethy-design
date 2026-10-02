import { useEffect, useRef, useState } from "react"
import ProjectCard from "./ProjectCard"
import { asset, projects, type Project } from "../data/projects"

const num = (p: Project) => String(projects.indexOf(p) + 1).padStart(2, "0")

/* "Earlier work" — compact carousel; each card opens the full ProjectCard in a panel */
export default function Archive({ items }: { items: Project[] }) {
  const track = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState<Project | null>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null)
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open])

  if (!items.length) return null
  const years = items.map((p) => parseInt(p.year)).filter(Boolean)
  const range = `${Math.min(...years)}–${Math.max(...years)}`

  return (
    <div className="mt-14">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <span className="font-mono text-[11px] text-mute">Earlier work · {range}</span>
          <h3 className="mt-1 text-2xl font-semibold tracking-[-0.03em]">
            From the archive <span className="font-serif font-normal italic text-mute">— click to open</span>
          </h3>
        </div>
        <div className="flex gap-2">
          {[-1, 1].map((d) => (
            <button
              key={d}
              onClick={() => track.current?.scrollBy({ left: d * track.current.clientWidth * 0.8, behavior: "smooth" })}
              aria-label={d < 0 ? "Previous projects" : "Next projects"}
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-lg transition hover:border-ink hover:bg-ink hover:text-white"
            >
              {d < 0 ? "←" : "→"}
            </button>
          ))}
        </div>
      </div>

      <div ref={track} className="-mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-4 [scrollbar-width:none]">
        {items.map((p) => (
          <button
            key={p.title}
            onClick={() => setOpen(p)}
            className="group w-[78%] shrink-0 snap-start rounded-3xl border border-line bg-white p-2.5 text-left transition hover:-translate-y-1 hover:shadow-xl sm:w-[46%] lg:w-[calc((100%-3rem)/4)]"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-canvas">
              {asset(p.image) ? (
                <img src={asset(p.image)} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              ) : (
                <div className="dots h-full w-full" style={{ background: p.accent + "33" }} />
              )}
              <span className="absolute left-2.5 top-2.5 rounded-md bg-white/90 px-1.5 py-0.5 font-mono text-[10px] text-ink backdrop-blur">
                {num(p)}
              </span>
              <span className="absolute bottom-2.5 right-2.5 rounded-full bg-ink px-3 py-1 text-xs font-medium text-white opacity-0 transition group-hover:opacity-100">
                Open ↗
              </span>
            </div>
            <div className="flex items-baseline justify-between gap-2 px-1.5 pb-1 pt-3">
              <span className="truncate font-semibold tracking-[-0.02em]">{p.title}</span>
              <span className="font-mono text-[11px] text-mute">{p.year}</span>
            </div>
            <span className="block px-1.5 pb-1 text-xs text-mute">{p.tag}</span>
          </button>
        ))}
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={open.title}
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-50 overflow-y-auto bg-ink/50 px-3 py-6 backdrop-blur-sm md:py-12"
        >
          <div onClick={(e) => e.stopPropagation()} className={`relative mx-auto ${open.featured ? "max-w-[1100px]" : "max-w-[720px]"}`}>
            <button
              onClick={() => setOpen(null)}
              aria-label="Close"
              className="absolute -top-3 right-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-ink text-white shadow-lg transition hover:scale-105"
            >
              ✕
            </button>
            <ProjectCard key={open.title} p={open} n={num(open)} expanded />
          </div>
        </div>
      )}
    </div>
  )
}
