/* =========================
   PAGE NAVIGATION (ATLAS → BRANCH)
========================= */

const pages = document.querySelectorAll(".page");
const nodes = document.querySelectorAll(".node");

function showPage(id) {
  pages.forEach(p => p.classList.remove("active"));
  const target = document.getElementById(id);
  if (target) target.classList.add("active");
}

nodes.forEach(node => {
  node.addEventListener("click", () => {
    const page = node.getAttribute("data-page");
    if (page) {
      showPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
});

/* =========================
   ROTATING QUOTES SYSTEM
========================= */

const quoteSets = {
  ethics: [
    "Do not impose on others what you do not wish for yourself. — Confucius",
    "Act only according to that maxim... — Kant",
    "We are what we repeatedly do. — Aristotle",
    "Happiness is the end of life. — Mill"
  ],
  political: [
    "Man is by nature a political animal. — Aristotle",
    "Man is born free, and everywhere he is in chains. — Rousseau",
    "The philosophers have only interpreted the world. — Marx",
    "The end of law is freedom. — Locke"
  ],
  aesthetics: [
    "Beauty is truth, truth beauty. — Keats",
    "Art is the highest metaphysical activity. — Nietzsche",
    "Art represents inward significance. — Aristotle",
    "Life must be in harmony with existence. — Tagore"
  ],
  metaphysics: [
    "I think, therefore I am. — Descartes",
    "All men by nature desire to know. — Aristotle",
    "Reality is identical with Brahman. — Vivekananda",
    "Metaphysics is instinct rationalized. — Bradley"
  ],
  epistemology: [
    "Knowledge is true opinion with reason. — Plato",
    "No knowledge beyond experience. — Locke",
    "Thoughts without content are empty. — Kant",
    "Know that you know nothing. — Socrates"
  ],
  logic: [
    "Logic pervades the world. — Wittgenstein",
    "Logic takes care of itself. — Wittgenstein",
    "A mind all logic is a knife all blade. — Tagore",
    "Logic of words must yield to reality. — Brandeis"
  ],
  darshana: [
    "Dharma sustains order.",
    "Karma shapes consequence.",
    "Moksha is liberation.",
    "Atman is Brahman."
  ]
};

function rotateQuotes(id, quotes) {
  const el = document.getElementById(id);
  if (!el || !quotes.length) return;

  let i = 0;

  function update() {
    el.style.opacity = 0;

    setTimeout(() => {
      el.textContent = quotes[i];
      el.style.opacity = 1;
      i = (i + 1) % quotes.length;
    }, 400);
  }

  update();
  setInterval(update, 6000);
}

/* init all quote rotators */
rotateQuotes("ethicsQuotes", quoteSets.ethics);
rotateQuotes("politicalQuotes", quoteSets.political);
rotateQuotes("aestheticQuotes", quoteSets.aesthetics);
rotateQuotes("metaQuotes", quoteSets.metaphysics);
rotateQuotes("epiQuotes", quoteSets.epistemology);
rotateQuotes("logicQuotes", quoteSets.logic);
rotateQuotes("darshanaQuotes", quoteSets.darshana);
