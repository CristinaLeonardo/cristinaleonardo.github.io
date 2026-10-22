/* =====================================================================
   MOSAIKO BUILD DIARY — add a new post by copying one object below.
   Newest post goes first. `id` becomes the post's link:
   cristinaleonardo.com/mosaiko/#<id>

   `body` is a list of blocks:
     "Plain text"                          a paragraph
     { h: "Heading" }                      a subheading
     { lead: "Bold start.", text: "..." }  a paragraph that opens in bold
     { list: ["...", "..."] }              a bulleted list
     { text: "...", link: { href, label } }  a paragraph ending in a link
   Optional: `cover: "logo"` shows the Mosaiko logo as the header image,
   `learned` shows as a "What I learned" note, `outro` closes the post.
   ===================================================================== */
const POSTS = [
  {
    id: "sick-day",
    date: "2026-10-22",
    cover: "logo",
    title: "Building Mosaiko: a product manager's sick day",
    dek: "How a fever, a laptop and a vibe-coding course turned into the first version of a language app.",
    body: [
      { h: "The setting" },
      "It started on a day I'd rather have spent anywhere but at home. I had a fever, my cats had claimed the sofa next to me, and my laptop was the only cure for boredom. I was halfway through a vibe-coding course and felt that familiar itch: lessons only really stick when you use them. So I dusted off an idea I'd been carrying around for a while and decided to build it.",
      { h: "Product first" },
      "Old habits are hard to break. After years as a product manager, even with a fever I didn't open the code editor first. I opened a blank page and asked the questions I always ask.",
      { lead: "The idea.", text: "What if you could learn five languages at once, each built on one you already know? Spanish and Portuguese growing out of my native Italian, German out of English. Related languages help each other, as long as you also learn to tell them apart." },
      { lead: "The name.", text: "Mosaiko: a mosaic of coloured tiles, one for each language, with a German k quietly bringing the two families together." },
      { lead: "The scope.", text: "I wrote down the requirements, sketched a roadmap in stages, and then made the hardest decision of the day: choosing the smallest piece worth building first." },
      { h: "The first build" },
      "Only then did I open VS Code. If the course taught me one thing, it's that an AI coding agent works best when you give it clear rules. So I wrote them before a single line of code:",
      { list: [
        "A CLAUDE.md file, my agent's briefing: what we're building, what's off limits, and how we work together. Plan first, wait for my approval, one step at a time, and explain every change, because I'm here to learn.",
        "A /security-check command that flags risks and fixes nothing without my OK.",
        "A commit after every tested step, so nothing is ever lost."
      ] },
      "Then, step by step, the first slice came to life: the app skeleton, the five language colours, and a first word card for a \"Greetings\" lesson. Seeing that card appear on screen felt like a small victory. I made the product decisions, and the agent wrote the code inside the limits I set.",
      { text: "Try the very first build:", link: { href: "https://mosaiko-language-app.vercel.app/", label: "mosaiko-language-app.vercel.app" } }
    ],
    learned: "Product thinking doesn't slow vibe coding down. It's what makes it work. And learning doesn't wait for perfect conditions: sometimes it happens on a sick day, under a blanket, with cats who couldn't care less about your code.",
    outro: "To be continued…"
  }
];
