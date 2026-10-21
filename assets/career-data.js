// @ts-check
/* =====================================================================
   CAREER JOURNEY — edit the chapters here. Order = order on the path.
   kind: "chapter" (full card) or "milestone" (small step on the path).
   VS Code checks this file against the types below as you type.
   ===================================================================== */

/**
 * @typedef {"flask" | "blueprint" | "cycle" | "rise" | "spark"} IconName
 *
 * @typedef {object} DetailGroup
 * @property {string} heading
 * @property {string[]} items
 * @property {{ label: string, href: string }} [link]  Optional link under the items.
 *
 * @typedef {object} Chapter
 * @property {string} id            Short unique id, used for anchors.
 * @property {"chapter" | "milestone"} kind
 * @property {IconName} icon
 * @property {string} title
 * @property {string} subtitle
 * @property {string} period
 * @property {string} org
 * @property {string} tag           The "lens" shown on the card.
 * @property {string} [question]    Key question, shown in italics.
 * @property {string} summary     One sentence shown on the card.
 * @property {DetailGroup[]} [details]  Shown behind "More detail".
 * @property {boolean} [now]        Marks the current chapter with a pulse.
 * @property {{ label: string, href: string }} [cta]
 */

/** @type {Chapter[]} */
const CAREER_CHAPTERS = [
  {
    id: "scientist",
    kind: "chapter",
    icon: "flask",
    title: "The Scientist",
    subtitle: "Learning ML on hard diagnostic questions",
    period: "2013–2023",
    org: "Padua · Munich · Berkeley",
    tag: "Research",
    question: "Can data reveal disease?",
    summary:
      "By coding ML models and Python pipelines on blood-based infrared fingerprints from a population cohort of 4,000+ individuals, I unveiled molecular signatures specific to demographics (age and gender) and to diseases such as diabetes, hypertension and different types of cancer.",
    details: [
      {
        heading: "MSc Chemistry · University of Padua · 2013–2015",
        items: ["Advanced spectroscopy and computational analysis of biomolecular dynamics."]
      },
      {
        heading: "PhD Physics (Dr. rer. nat.) · LMU Munich & Max Planck Institute of Quantum Optics · 2017–2021",
        items: [
          "Spectroscopy and machine-learning methods to detect disease from human blood, in the personalized-medicine research environment of Nobel laureate Prof. Ferenc Krausz.",
          "Supervised and unsupervised models, clustering and multivariate analysis on data from a cohort of 4,000+ individuals."
        ],
        link: { label: "Read my PhD thesis (DOI 10.5282/edoc.28542)", href: "https://doi.org/10.5282/edoc.28542" }
      },
      {
        heading: "Postdoctoral Fellow · LBNL & UC Berkeley · 2021–2023",
        items: [
          "Optical spectroscopy instrumentation and computational analysis of biomolecular dynamics in photosynthetic systems.",
          "Python and MATLAB analysis pipelines with ML-supported approaches; led projects through to first-author publications."
        ]
      },
      {
        heading: "Selected publications",
        items: [
          "Plasma infrared fingerprinting with machine learning enables single-measurement multi-phenotype health screening. Cell Reports Medicine, 2024 (second author)",
          "Bidirectional energy flow in the photosystem II supercomplex. J. Phys. Chem. B, 2024 (first author)",
          "Infrared signatures of phycobilins within the phycocyanin 645 complex. J. Phys. Chem. B, 2023 (first author)",
          "Molecular origin of blood-based infrared spectroscopic fingerprints. Angewandte Chemie, 2021 (second author, cover)"
        ]
      }
    ]
  },
  {
    id: "builder",
    kind: "chapter",
    icon: "blueprint",
    title: "The Product Builder",
    subtitle: "From research to a new product",
    period: "2023–2025",
    org: "iLoF · Porto",
    tag: "Discovery & development",
    question: "How do we turn this into a product people can trust?",
    summary:
      "Moving from research to product on the same diagnostic problems, I achieved ISO 13485 certification and defined stakeholder requirements and product strategy, thanks to a newly acquired product vision that went beyond technical understanding towards building the product.",
    details: [
      {
        heading: "Product Manager · iLoF · Oct 2023 – Feb 2025",
        items: [
          "AI/ML-enabled diagnostic products combining photonics, machine learning and clinical data for early detection of Alzheimer's disease and cancer.",
          "Led data science and biology teams developing the detection algorithms on spectroscopic data.",
          "Regulatory strategy for software as an in-vitro diagnostic, plus competitor and market analyses, design inputs and risk management."
        ]
      }
    ]
  },
  {
    id: "manager",
    kind: "chapter",
    icon: "cycle",
    title: "The Product Manager",
    subtitle: "Owning the full lifecycle on the market",
    period: "2025–present",
    org: "CLADE · Esslingen",
    tag: "Lifecycle & delivery",
    question: "How do we deliver and sustain it in a regulated world?",
    summary:
      "I led a new product launch while retiring the previous generation and increased software feature output by more than 120% year on year, through the end-to-end lifecycle skills I grew in this role: roadmap, backlog, releases, launch and end-of-life of regulated HW/SW products already on the market.",
    details: [
      {
        heading: "Product Manager · CLADE · since Mar 2025",
        items: [
          "Integrated hardware/software GMP products for biopharmaceutical manufacturing.",
          "Product manager, product owner and project manager in one, for teams spanning hardware, software, data science, lab and R&D.",
          "Leading the design of a next-generation analytical platform with external development partners, from requirements through verification and validation.",
          "Quality and product readiness within ISO 9001-compliant processes."
        ]
      }
    ]
  },
  {
    id: "lead",
    kind: "milestone",
    icon: "rise",
    title: "Stepping up",
    subtitle: "Lead PM, cloud-based precision-oncology diagnostics platform",
    period: "2026–present",
    org: "expressTEC",
    tag: "Leadership",
    summary: "Growing from owning products to leading them from concept.",
    details: [
      {
        heading: "Lead Product Manager · expressTEC · Faro, Portugal · since May 2026",
        items: [
          "Lead PM for a software-enabled, PCR-based molecular diagnostics platform supporting precision oncology.",
          "Own the product strategy, intended use, user needs and requirements for a cloud platform that gives clinicians biomarker interpretation and therapy-support insights.",
          "Drive development from concept through verification, validation and commercialization within an IVDR-compliant design-control and traceability framework.",
          "Translate complex molecular and clinical information into clear requirements and user-centred workflows."
        ]
      }
    ]
  },
  {
    id: "ai-native",
    kind: "chapter",
    icon: "spark",
    title: "The AI-Native PM",
    subtitle: "Building with AI",
    period: "2026–now",
    org: "Side projects · this website",
    tag: "AI-native building",
    question: "What can I build when AI is part of how I work, not just what I manage?",
    now: true,
    summary: "Hands-on with vibe coding, AI agents and modern AI tooling.",
    cta: { label: "See my AI projects", href: "#projects" }
  }
];
