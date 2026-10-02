import { useEffect, useState } from "react"
import logoMark from "../assets/logo-mark.svg"
import { asset } from "../data/projects"
import { Block, Frame, Mono } from "./FabricFinder"

/* Case study curto, reutilizável (WebGram, Quatro Estações…).
   Cada projeto é só um objeto de dados — ver o fim do ficheiro. */

type Short = {
  slug: string
  name: string
  year: string
  title: [string, string]
  question?: string
  intro: string
  tags: string[]
  cover: string
  meta: [string, string][]
  context: [string, string]
  challenge: [string, string]
  cards: [string, string][]
  approach: [string, string]
  screens: string[]
  mobile?: boolean
  outcome: [string, string]
}

function ShortCase({ c }: { c: Short }) {
  const [zoom, setZoom] = useState<[string, string] | null>(null)
  const open = (f: string, n: string) => setZoom([f, n])

  useEffect(() => window.scrollTo(0, 0), [])
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
              amethy / work / <span className="text-mute">{c.slug}.case</span>
            </span>
          </a>
          <a href="#work" className="rounded-lg px-3 py-1.5 text-sm text-mute transition hover:bg-canvas hover:text-ink">
            ← All work
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-[1040px] px-5 pt-16 md:px-8 md:pt-24">
        <Mono className="text-mute">Case study · {c.name} · {c.year}</Mono>
        <h1 className="mt-4 max-w-[16ch] text-[clamp(2.6rem,7vw,5.2rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
          {c.title[0]} <span className="font-serif font-normal italic text-sel">{c.title[1]}</span>
        </h1>
        <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-ink/75">
          {c.intro}
        </p>
        {c.question && (
          <p className="mt-6 max-w-[48ch] border-l-4 border-sel pl-4 text-xl font-medium leading-snug tracking-[-0.01em]">{c.question}</p>
        )}
        <div className="mt-6 flex flex-wrap gap-2">
          {c.tags.map((t) => (
            <span key={t} className="rounded-full bg-sky px-3 py-1 text-xs font-medium text-sel">{t}</span>
          ))}
        </div>

        <div className="mt-12">
          <Frame file={c.cover} name={c.name} onOpen={open} />
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
          {c.meta.map(([k, v]) => (
            <div key={k} className="bg-white p-4">
              <dt><Mono className="text-mute">{k}</Mono></dt>
              <dd className="mt-1 text-sm font-medium">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-16">
          <Block id="context" n="01" label="Context" title={c.context[0]}>
            <p className={p}>
              {c.context[1]}
            </p>
          </Block>

          <Block id="challenge" n="02" label="Challenge" title={c.challenge[0]}>
            <div className="grid gap-6 md:grid-cols-2">
              <p className="text-lg leading-relaxed text-ink/75">
                {c.challenge[1]}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {c.cards.map(([k, v]) => (
                  <div key={k} className="rounded-2xl border border-line bg-white p-5">
                    <Mono className="text-sel">{k}</Mono>
                    <p className="mt-6 font-medium leading-snug">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </Block>

          <Block id="approach" n="03" label="Design approach" title={c.approach[0]}>
            <p className={p}>
              {c.approach[1]}
            </p>
            <div className={`mt-10 grid gap-6 ${c.mobile ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" : "md:grid-cols-2"}`}>
              {c.screens.map((f, i) => (
                <Frame key={f} file={f} name={`Screen ${i + 1}`} onOpen={open} />
              ))}
            </div>
          </Block>

          <Block id="outcome" n="04" label="Outcome" title={c.outcome[0]}>
            <div className="rounded-2xl bg-ink p-6 text-white md:p-8">
              <Mono className="text-lime">Outcome</Mono>
              <p className="mt-3 max-w-[60ch] text-lg leading-relaxed">
                {c.outcome[1]}
              </p>
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

export const WebGram = () => (
  <ShortCase
    c={{
      slug: "webgram",
      name: "WebGram",
      year: "2025",
      title: ["From concept", "to code"],
      intro: "WebGram is a full-stack web application that combines UX/UI design with frontend and backend development to create a functional and responsive digital product.",
      tags: ["UX/UI Design", "Frontend & Backend Development", "Web Application"],
      cover: "webgram-6.png",
      meta: [["Design", "Figma"], ["Frontend", "Vue.js"], ["Backend", "Node.js · Express"], ["Database", "MongoDB"]],
      context: ["An academic project, end to end", "WebGram was developed as an academic project with the goal of creating a complete digital product from concept to implementation."],
      challenge: ["Two problems at once", "The challenge was to design an intuitive interface while simultaneously building a scalable backend architecture capable of handling dynamic content and media uploads."],
      cards: [["Interface", "Intuitive, responsive"], ["Architecture", "Scalable, media-ready"]],
      approach: ["Designed in Figma, built full-stack", "The project was designed in Figma and developed using Vue.js on the frontend and Node.js with Express on the backend. MongoDB was used for data storage, ensuring flexibility and scalability."],
      screens: ["webgram-1.png", "webgram-2.png", "webgram-3.png", "webgram-4.png", "webgram-5.png", "webgram-7.png"],
      outcome: ["Product thinking meets technical execution", "WebGram demonstrates the ability to design and develop a complete web application, combining product thinking with technical execution."],
    }}
  />
)

export const QuatroEstacoes = () => (
  <ShortCase
    c={{
      slug: "quatro-estacoes",
      name: "Quatro Estações",
      year: "2022",
      title: ["Shopping that flows,", "browse to checkout"],
      question: "How can mobile e-commerce deliver a smooth and intuitive shopping experience?",
      intro: "Quatro Estações is a mobile e-commerce app designed to provide users with a complete and accessible shopping journey.",
      tags: ["UX/UI Design", "E-commerce App", "Mobile Experience"],
      cover: "quatro-10.png",
      meta: [["Role", "UX/UI Designer"], ["Client", "Portuguese brand"], ["Platform", "Mobile"], ["Tool", "FlutterFlow"]],
      context: ["A brand going mobile", "The project was developed for a Portuguese brand looking to expand its digital presence through a mobile shopping app."],
      challenge: ["Minimal friction, start to finish", "Designing a user-friendly purchasing flow that guides users from browsing to checkout with minimal friction."],
      cards: [["Browse", "Structured categories"], ["Checkout", "Fewer steps, clear cart"]],
      approach: ["Clear paths, built in FlutterFlow", "Using FlutterFlow, the app was designed with clear navigation, structured product categories, and an intuitive cart and checkout experience."],
      screens: ["quatro-1.png", "quatro-2.png", "quatro-3.png", "quatro-4.png", "quatro-5.png", "quatro-6.png", "quatro-7.png", "quatro-8.png", "quatro-9.png"],
      mobile: true,
      outcome: ["A complete shopping journey", "A fully functional e-commerce app that offers a seamless and engaging mobile shopping experience."],
    }}
  />
)

export const Kita = () => (
  <ShortCase
    c={{
      slug: "discovery-kita",
      name: "Discovery Kita & Academy",
      year: "2023",
      title: ["A warm welcome,", "in two languages"],
      question: "How can a website communicate trust, clarity, and accessibility to families?",
      intro: "Discovery Kita & Academy is an institutional website designed for a kindergarten based in Switzerland.",
      tags: ["Institutional Website", "Bilingual Content"],
      cover: "kita-5.png",
      meta: [["Role", "Designer & Developer"], ["Client", "Kindergarten, CH"], ["Tools", "WordPress · HTML · CSS"], ["Languages", "Bilingual"]],
      context: ["A professional presence for parents", "The client required a professional online presence to communicate services clearly to parents and guardians."],
      challenge: ["Informative, yet welcoming", "Designing a website that is both informative and welcoming, while supporting bilingual content."],
      cards: [["Tone", "Trustworthy, warm"], ["Content", "Clear in both languages"]],
      approach: ["A template, made their own", "The website was built using WordPress with a template, then altered with custom HTML and CSS styling. Content was structured to ensure clarity and ease of navigation across languages."],
      screens: ["kita-1.png", "kita-2.png", "kita-3.png", "kita-4.png", "kita-6.png"],
      outcome: ["Better communication with families", "A clean and accessible website that reflects the institution’s values and improves communication with families."],
    }}
  />
)

export const Pharmacy = () => (
  <ShortCase
    c={{
      slug: "pharmacy-app",
      name: "Pharmacy App",
      year: "2022",
      title: ["Pharmacy care,", "made simple"],
      question: "How can digital experiences simplify access to pharmacy services?",
      intro: "The Pharmacy App project explores a mobile interface designed to make purchasing products, managing prescriptions, and scheduling services simple and intuitive.",
      tags: ["UX/UI Design", "Mobile App Concept", "Healthcare Experience"],
      cover: "pharmacy-10.png",
      meta: [["Role", "UX/UI Designer"], ["Type", "Concept"], ["Platform", "Mobile"], ["Tool", "Adobe XD"]],
      context: ["Pharmacy services, in your pocket", "The project was created to address the growing need for accessible digital pharmacy services through mobile platforms."],
      challenge: ["Two flows, one simple experience", "Designing a clear user experience that accommodates both prescription and non-prescription flows while maintaining simplicity and trust."],
      cards: [["Prescription", "Guided, trustworthy"], ["Non-prescription", "Quick, familiar shopping"]],
      approach: ["Three distinct flows", "A clean and minimal interface was designed in Adobe XD, with distinct user flows for prescriptions, general shopping, and appointment scheduling. Special attention was given to navigation and accessibility."],
      screens: ["pharmacy-1.png", "pharmacy-2.png", "pharmacy-3.png", "pharmacy-4.png", "pharmacy-5.png", "pharmacy-6.png", "pharmacy-7.png", "pharmacy-8.png", "pharmacy-9.png"],
      mobile: true,
      outcome: ["A user-centred pharmacy experience", "The final concept delivers a user-centred pharmacy experience that simplifies healthcare-related digital interactions."],
    }}
  />
)

export const Starget = () => (
  <ShortCase
    c={{
      slug: "starget",
      name: "Starget",
      year: "2022",
      title: ["Local businesses,", "one tap away"],
      question: "How can digital platforms connect users with local businesses more effectively?",
      intro: "Starget is a mobile application designed to help users discover nearby businesses while enabling companies to promote their services digitally.",
      tags: ["UX/UI Design", "Marketplace App", "Local Discovery"],
      cover: "starget-9.png",
      meta: [["Role", "UX/UI Designer"], ["Users", "Consumers · Businesses"], ["Platform", "Mobile"], ["Tool", "FlutterFlow"]],
      context: ["Visibility for local businesses", "The project addresses the need for increased visibility of local businesses in digital environments."],
      challenge: ["Two user types, one interface", "Balancing the needs of two user types — consumers and businesses — within a single, intuitive interface."],
      cards: [["Consumers", "Explore, save, discover"], ["Businesses", "Manage and promote"]],
      approach: ["Dual profiles, built in FlutterFlow", "The app was designed in FlutterFlow with dual user profiles, allowing businesses to manage content and users to explore categories, save favourites, and discover services nearby."],
      screens: ["starget-1.png", "starget-2.png", "starget-3.png", "starget-4.png", "starget-5.png", "starget-6.png", "starget-7.png", "starget-8.png"],
      mobile: true,
      outcome: ["Closer to the neighbourhood", "A location-based platform that strengthens the relationship between users and local businesses."],
    }}
  />
)

export const Fidelix = () => (
  <ShortCase
    c={{
      slug: "fidelix",
      name: "Fidelix",
      year: "2022",
      title: ["Loyalty points,", "at the speed of the counter"],
      question: "How can loyalty systems be optimized for operational environments?",
      intro: "Fidelix is a tablet-based loyalty system concept designed to streamline point management in gas stations.",
      tags: ["UX/UI Design", "Tablet Application", "Loyalty System"],
      cover: "fidelix-5.png",
      meta: [["Role", "UX/UI Designer"], ["Users", "Station staff"], ["Platform", "Tablet"], ["Type", "Concept"]],
      context: ["The operational side of loyalty", "The project focuses on the operational side of loyalty programs, specifically the needs of staff managing customer points in retail environments."],
      challenge: ["Fast, every single time", "Creating an interface that is fast, intuitive, and efficient for daily use in high-turnover contexts."],
      cards: [["Collect", "A few taps per customer"], ["Redeem", "Clear, error-free"]],
      approach: ["Big targets, short flows", "The UI was designed for tablet devices, prioritising clarity, large touch targets, and simplified flows for collecting and redeeming points."],
      screens: ["fidelix-1.png", "fidelix-2.png", "fidelix-3.png", "fidelix-4.png"],
      outcome: ["Less friction behind the counter", "A functional and efficient UX concept that improves operational workflows and reduces friction in loyalty management."],
    }}
  />
)

export const Barka = () => (
  <ShortCase
    c={{
      slug: "barkarquitetos",
      name: "Barkarquitetos",
      year: "2024",
      title: ["Built like", "the architecture it shows"],
      question: "How can a digital presence reflect architectural identity and professionalism?",
      intro: "Barkarquitetos is an institutional website designed to showcase architectural services and projects.",
      tags: ["UX/UI Design", "Brand Presentation", "Portfolio Website"],
      cover: "barka-5.png",
      meta: [["Role", "Designer & Developer"], ["Client", "Architecture studio"], ["Platform", "Web"], ["Tools", "WordPress · HTML · CSS"]],
      context: ["Online, true to the studio", "The architecture studio needed a digital platform that aligned with its professional and visual identity."],
      challenge: ["Let the work lead", "Creating a clean and structured website that highlights projects while maintaining a strong visual language."],
      cards: [["Structure", "Clean, ordered layout"], ["Projects", "Images first"]],
      approach: ["Layout, type and image", "The website was developed in WordPress with custom HTML and CSS adjustments, focusing on layout, typography, and image presentation."],
      screens: ["barka-1.png", "barka-2.png", "barka-3.png", "barka-4.png", "barka-6.png"],
      outcome: ["A stronger digital presence", "A professional and visually consistent website that strengthens the studio’s digital presence."],
    }}
  />
)
