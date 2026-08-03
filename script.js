/* ============================================
   DADOS DOS PROJETOS
   Edite este array para adicionar/remover projetos.
============================================ */
const projects = [
  {
    title: "Landing Page Churrascaria e Pizzaria",
    tagline: "Landing Page simples para uma churrascaria.",
    description:
      "Site feito para uma churrascaria real localizada em Guarulhos, projeto feito para familiares. ",
    stack: ["HTML", "CSS", "JavaScript"],
    cmd: "Em andamento...",
    links: [
      { label: "ver projeto →", url: "https://site-carraro-s-grill.vercel.app/" },
      { label: "código fonte →", url: "https://github.com/gabriel12232/Site-Carraro-s-Grill" },
    ],
  },

   {
    title: "E-commerce estatico mimozinho",
    tagline: "Um e-commerce estatico feito para loja de moda infantil",
    description:
      "Projeto desenvolvido no curso de Design Web com a proposta de criar um e-commerce utilizando apenas HTML. O site simula uma loja de moda infantil e foi criado para colocar em prática os conceitos aprendidos durante o curso. ",
    stack: ["HTML"],
    cmd: "Completo",
    links: [
      { label: "ver projeto →", url: "https://mimozinho-gg5n.vercel.app/" },
      { label: "código fonte →", url: "https://github.com/gabriel12232/mimozinho" },
    ],
  },
  
   {
    title: "Calculadora simples",
    tagline: "Uma simples calculadora ",
    description:
      "Calculadora simples desenvolvida durante meus primeiros estudos em programação. O projeto foi criado para praticar HTML, CSS e JavaScript, aplicando conceitos de lógica de programação e interação com o usuário. ",
    stack: ["HTML", "CSS", "JavaScript"],
    cmd: "Completo",
    links: [
      { label: "ver projeto →", url: "https://calculadora-do-gabz.vercel.app/" },
  
    ],
  },

  {
    title: "Sistema de Agendamento para Barbearia",
    tagline: "Sistema completo para gerenciamento de clientes, serviços e agendamentos de uma barbearia. ",
    description:
      "Sistema desenvolvido para uma barbearia, permitindo que clientes escolham serviços, barbeiros, datas e horários disponíveis para realizar agendamentos. O projeto conta com integração ao Supabase para armazenamento dos dados e um painel administrativo para gerenciar clientes, serviços, profissionais e agendamentos. ",
    stack: ["HTML", "CSS", "JavaScript" ," Supabase"],
    cmd: "Completo",
    links: [
      { label: "ver projeto →", url: "https://barbearia-agendamento-chi.vercel.app/" },
   { label: "código fonte →", url: "https://github.com/gabriel12232/barbearia-agendamento" },
    ],
  },

   {
    title: "Landing Page Kumon Vila Flórida",
    tagline: "Landing page desenvolvida para a unidade Kumon Vila Flórida, apresentando a metodologia de ensino, os cursos oferecidos e os canais de contato de forma moderna e responsiva. ",
    description:
      "Projeto desenvolvido para a unidade Kumon Vila Flórida com o objetivo de fortalecer sua presença digital e facilitar o contato com novos alunos e responsáveis. A landing page apresenta a metodologia Kumon, informações sobre os cursos de Matemática, Português e Inglês, diferenciais da unidade, depoimentos, perguntas frequentes e chamadas para ação estratégicas. O site foi desenvolvido com foco em desempenho, responsividade e experiência do usuário, garantindo uma navegação intuitiva tanto em computadores quanto em dispositivos móveis. ",
    stack: ["HTML", "CSS", "JavaScript" ,],
    cmd: "Em desenvolvimento...",
    links: [
      { label: "ver projeto →", url: "https://site-kumon.vercel.app/" },
   { label: "código fonte →", url: "https://github.com/gabriel12232/Site-Kumon" },
    ],
  },
];

/* ============================================
   RENDERIZAÇÃO DOS CARDS
============================================ */
const workList = document.getElementById("workList");
document.getElementById("year").textContent = new Date().getFullYear();

function pad(n) {
  return String(n).padStart(2, "0");
}

projects.forEach((project, i) => {
  const card = document.createElement("article");
  card.className = "work-card";
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", `Abrir detalhes de ${project.title}`);
  card.dataset.index = i;

  card.innerHTML = `
    <span class="work-index mono">[${pad(i + 1)}]</span>
    <div class="work-main">
      <h3 class="work-title">${project.title}</h3>
      <p class="work-tagline">${project.tagline}</p>
    </div>
    <div class="work-stack mono">
      ${project.stack.map((s) => `<span>${s}</span>`).join("")}
    </div>
    <span class="work-cmd mono">${project.cmd}</span>
  `;

  card.addEventListener("click", () => openModal(i));
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openModal(i);
    }
  });

  workList.appendChild(card);
});

/* ============================================
   MODAL
============================================ */
const overlay = document.getElementById("modalOverlay");
const modalIndex = document.getElementById("modalIndex");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalTags = document.getElementById("modalTags");
const modalLinks = document.getElementById("modalLinks");
const modalClose = document.getElementById("modalClose");

let lastFocused = null;

function openModal(i) {
  const p = projects[i];
  modalIndex.textContent = `[${pad(i + 1)}]`;
  modalTitle.textContent = p.title;
  modalDesc.textContent = p.description;
  modalTags.innerHTML = p.stack.map((s) => `<span>${s}</span>`).join("");
  modalLinks.innerHTML = p.links
    .map((l) => `<a href="${l.url}" target="_blank" rel="noopener">${l.label}</a>`)
    .join("");

  lastFocused = document.activeElement;
  overlay.classList.add("open");
  modalClose.focus();
  document.body.style.overflow = "hidden";
}

function closeModal() {
  overlay.classList.remove("open");
  document.body.style.overflow = "";
  if (lastFocused) lastFocused.focus();
}

modalClose.addEventListener("click", closeModal);
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && overlay.classList.contains("open")) closeModal();
});

/* ============================================
   MENU MOBILE
============================================ */
const navToggle = document.getElementById("navToggle");
const nav = document.querySelector(".nav");

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen);
  navToggle.classList.toggle("active");
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});