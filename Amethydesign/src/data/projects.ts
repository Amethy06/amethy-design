/*
 * ─────────────────────────────────────────────────────────────
 *  PROJETOS DO PORTFÓLIO — edita aqui
 * ─────────────────────────────────────────────────────────────
 *
 *  COMO ADICIONAR IMAGENS
 *  1. Coloca o ficheiro em  src/assets/projects/
 *     (ex.: src/assets/projects/webgram-ui.jpg)
 *  2. Escreve só o NOME do ficheiro no campo `image` ou `wireframe`:
 *        image: "webgram-ui.jpg",
 *        wireframe: "webgram-wire.png",
 *  3. Pronto. Sem imagem, o cartão mostra um mockup automático.
 *     Se não houver `wireframe`, o botão Wireframe/UI desaparece.
 *
 *  Formato ideal: horizontal 16:10 ou 4:3, mínimo 1600px de largura.
 *
 *  COMO ADICIONAR UM PROJETO
 *  Copia um bloco { ... } inteiro, cola-o na lista e altera os textos.
 *  A ordem da lista é a ordem no site. O número (01, 02…) é automático.
 *
 *  CAMPOS
 *  title     Nome do projeto
 *  tag       Etiqueta azul (texto livre)
 *  cats      Filtros onde aparece: "UX/UI" | "Development" | "Wordpress" | "Dashboards"
 *  year      Ano (texto livre, ex.: "2024 —" para "em curso")
 *  desc      Descrição curta (1–2 frases)
 *  accent    Cor do mockup automático (hex)
 *  featured  true = cartão grande, a toda a largura, com ficha técnica
 *  details   Ficha técnica (só aparece em cartões featured)
 *  link      Link do botão "Read case study" (deixa "" para esconder)
 *  draft     true = mostra "Coming soon" (para projetos ainda sem nome/conteúdo)
 *  screens   Lista de ecrãs mobile (verticais) — aparecem numa galeria de telemóveis
 *  desktopScreens    Ecrãs desktop (horizontais) — separador "Desktop" na galeria
 *  desktopWireframes Wireframes desktop (horizontais) — separador "Wireframes" na galeria
 *  wireframeScreens  Wireframes mobile — o botão Wireframe/UI mostra-os em fila
 *  suite     Lista de produtos que partilham o mesmo design system (cria separadores)
 */

export type Cat = "UX/UI" | "Development" | "Wordpress" | "Dashboards"

export type SuiteItem = {
  name: string
  desc: string
  image?: string
  wireframe?: string
  desktopScreens?: string[]
}

export type Project = {
  title: string
  tag: string
  cats: Cat[]
  year: string
  desc: string
  accent: string
  image?: string
  wireframe?: string
  featured?: boolean
  details?: [string, string][]
  link?: string
  draft?: boolean
  archive?: boolean // true = aparece no carrossel "Earlier work" (abre num painel)
  screens?: string[]
  desktopScreens?: string[]
  desktopWireframes?: string[]
  wireframeScreens?: string[]
  suite?: SuiteItem[]
}

export const projects: Project[] = [
  {
    title: "Fabric Finder",
    tag: "UX/UI",
    cats: ["UX/UI"],
    year: "2025  — 2026",
    accent: "#4f5dff",
    featured: true,
    image: "fabric-8.png",
    desktopScreens: ["fabric-9.png", "fabric-16.png", "fabric-15.png", "fabric-14.png", "fabric-13.png", "fabric-11.png", "fabric-10.png", "fabric-12.png", "fabric-8.png", "fabric-7.png", "fabric-6.png", "fabric-5.png", "fabric-4.png", "fabric-3.png", "fabric-2.png", "fabric-1.png"],
    wireframe: "fabric-wire-1.png",
    desktopWireframes: ["fabric-wire-1.png", "fabric-wire-2.png", "fabric-wire-3.png"],
    desc: "An AI-powered creative platform for textile designers, combining trend analysis, sales insights, visual search and generative AI in one consistent product.",
    details: [
      ["Role", "UX/UI Designer"],
      ["Scope", "IA · Flows · UI · Prototyping"],
      ["Context", "R&D · Textile & fashion"],
    ],
    link: "#/fabric-finder",
  },
  {
    title: "Digital Product Passport",
    tag: "UX/UI",
    cats: ["UX/UI"],
    year: "2024  — 2025",
    accent: "#4f5dff",
    featured: true,
    image: "dpp-cover.png",
    screens: ["dpp-mobile-1.png", "dpp-mobile-2.png", "dpp-mobile-3.png", "dpp-mobile-4.png", "dpp-mobile-5.png"],
    desktopScreens: ["dpp-desktop-1.png", "dpp-desktop-2.png", "dpp-desktop-3.png", "dpp-desktop-4.png", "dpp-desktop-5.png"],
    wireframeScreens: ["dpp-wire-1.png", "dpp-wire-2.png", "dpp-wire-3.png", "dpp-wire-4.png"],
    desc: "A user-centred redesign that turns a garment’s traceability, composition, certifications and environmental impact into a clear, engaging digital experience (texjourney.com).",
    details: [
      ["Role", "Sole UX/UI Designer"],
      ["Tools", "Figma, FigJam, Maze"],
      ["Scope", "Research → Testing"],
      ["Tested with", "18 users"],
    ],
    link: "#/dpp",
  },
  {
    title: "Dashboard Suite",
    tag: "UX/UI · Design System",
    cats: ["UX/UI", "Dashboards"],
    year: "2025  — 2026",
    accent: "#16a37a",
    desc: "Two data dashboards built on one shared design system, consistent components, tokens and patterns, adapted to different users and data.",
    details: [
      ["Role", "UX/UI Designer"],
      ["Tools", "Figma"],
      ["Scope", "Design system + 2 dashboards"],
      ["Focus", "Data visualisation"],
    ],
    link: "#/dashboards",
    wireframe: "dash-wire-2.png", // partilhado pelos dois dashboards
    desktopWireframes: ["dash-wire-2.png", "dash-wire-1.png", "dash-wire-3.png"],
    suite: [
      // TODO: rever descrições
      {
        name: "EnerWise",
        desc: "AI-powered energy platform for textile producers — operations forecast, consumption analysis with suggestions, outlier detection, gas simulation and history.",
        image: "enerwise-1.png",
        desktopScreens: ["enerwise-1.png", "enerwise-2.png", "enerwise-3.png", "enerwise-4.png", "enerwise-5.png", "enerwise-6.png"],
      },
      {
        name: "OrderWise",
        desc: "“The intelligent way to manage orders” — ML-driven breakage forecasting and suggestions across the production flow, from the knitted fabric order onwards, plus a dashboard with empty states.",
        image: "orderwise-1.png",
        desktopScreens: ["orderwise-1.png", "orderwise-2.png", "orderwise-3.png", "orderwise-4.png", "orderwise-5.png", "orderwise-6.png", "orderwise-7.png"],
      },
    ],
  },
  {
    title: "VitaCare",
    tag: "UX/UI",
    cats: ["UX/UI"],
    year: "2026",
    accent: "#c9d3ff",
    desc: "A project currently in progress — case study coming once it ships.",
    draft: true,
    link: "",
  },
  {
    title: "WebGram",
    archive: true,
    tag: "UX/UI & Development",
    cats: ["UX/UI", "Development"],
    year: "2025",
    accent: "#17171a",
    image: "webgram-6.png",
    desktopScreens: ["webgram-1.png", "webgram-2.png", "webgram-3.png", "webgram-4.png", "webgram-5.png", "webgram-7.png"],
    desc: "A full-stack web application combining UX/UI design with frontend and backend development — designed in Figma, built with Vue.js, Node.js, Express and MongoDB.",
    link: "#/webgram",
  },
  {
    title: "Discovery Kita & Academy",
    archive: true,
    tag: "Wordpress Development",
    cats: ["Wordpress", "Development"],
    year: "2023",
    accent: "#c6f24e",
    featured: true,
    image: "kita-5.png",
    desktopScreens: ["kita-1.png", "kita-2.png", "kita-3.png", "kita-4.png", "kita-6.png"],
    desc: "An institutional website for a bilingual kindergarten in Switzerland, designed to clearly communicate services to parents and families.",
    details: [
      ["Role", "Designer & Developer"],
      ["Tools", "WordPress · HTML · CSS"],
      ["Scope", "UI → Build"],
      ["Client", "Kindergarten, CH"],
    ],
    link: "#/discovery-kita",
  },
  {
    title: "Barkarquitetos",
    archive: true,
    tag: "Wordpress Development",
    cats: ["Wordpress"],
    year: "2024",
    accent: "#ff8a5c",
    image: "barka-5.png",
    desktopScreens: ["barka-1.png", "barka-2.png", "barka-3.png", "barka-4.png", "barka-6.png"],
    desc: "An institutional website for an architecture studio — a clean, structured layout that showcases its projects and visual identity.",
    link: "#/barkarquitetos",
  },
  {
    title: "Quatro Estações",
    archive: true,
    tag: "UX/UI · FlutterFlow",
    cats: ["UX/UI"],
    year: "2022",
    accent: "#ff5ca8",
    image: "quatro-10.png",
    screens: ["quatro-1.png", "quatro-2.png", "quatro-3.png", "quatro-4.png", "quatro-5.png", "quatro-6.png", "quatro-7.png", "quatro-8.png", "quatro-9.png"],
    desc: "A mobile e-commerce app for a Portuguese brand — a complete, accessible shopping journey from browsing to checkout, built in FlutterFlow.",
    link: "#/quatro-estacoes",
  },
  {
    title: "Fidelix",
    archive: true,
    tag: "UX/UI · Branding",
    cats: ["UX/UI"],
    year: "2022",
    accent: "#f4b860",
    image: "fidelix-5.png",
    desktopScreens: ["fidelix-1.png", "fidelix-2.png", "fidelix-3.png", "fidelix-4.png"],
    desc: "A tablet-based loyalty system concept that streamlines collecting and redeeming points for gas station staff.",
    link: "#/fidelix",
  },
  {
    title: "Starget",
    archive: true,
    tag: "UX/UI · FlutterFlow",
    cats: ["UX/UI"],
    year: "2022",
    accent: "#4f5dff",
    image: "starget-9.png",
    screens: ["starget-1.png", "starget-2.png", "starget-3.png", "starget-4.png", "starget-5.png", "starget-6.png", "starget-7.png", "starget-8.png"],
    desc: "A mobile marketplace that helps people discover nearby businesses — and lets businesses promote their services — built in FlutterFlow.",
    link: "#/starget",
  },
  {
    title: "Pharmacy App",
    archive: true,
    tag: "UX/UI · Concept",
    cats: ["UX/UI"],
    year: "2022",
    accent: "#c6f24e",
    image: "pharmacy-10.png",
    screens: ["pharmacy-1.png", "pharmacy-2.png", "pharmacy-3.png", "pharmacy-4.png", "pharmacy-5.png", "pharmacy-6.png", "pharmacy-7.png", "pharmacy-8.png", "pharmacy-9.png"],
    desc: "A mobile app concept that makes buying products, managing prescriptions and booking pharmacy services simple and intuitive.",
    link: "#/pharmacy-app",
  },
]

/* Resolve nomes de ficheiro em src/assets/projects/ para URLs — não precisas de mexer aqui. */
const files = import.meta.glob("../assets/projects/*.{png,jpg,jpeg,webp,avif,gif,svg}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>

export const asset = (name?: string) =>
  name ? files[`../assets/projects/${name}`] : undefined
