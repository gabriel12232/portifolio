/* ============================================
   DADOS DOS PROJETOS
   Edite este array para adicionar/remover projetos.
============================================ */
const projects = [
  {
    title: "Painel financeiro",
    tagline: "Dashboard de controle de gastos pessoais com gráficos em tempo real.",
    description:
      "Aplicação web para acompanhar receitas e despesas mensais. Os dados são salvos localmente e o usuário pode categorizar transações, ver tendências em gráficos e exportar relatórios em PDF.",
    stack: ["React", "Chart.js", "LocalStorage"],
    cmd: "$ open --tag=produto",
    links: [
      { label: "ver projeto →", url: "#" },
      { label: "código fonte →", url: "#" },
    ],
  },
  {
    title: "Loja de plantas",
    tagline: "E-commerce simples com carrinho funcional e checkout simulado.",
    description:
      "Site de vendas para uma loja fictícia de plantas ornamentais. Inclui catálogo filtrável, carrinho persistente entre sessões e um fluxo de checkout em três etapas, tudo sem backend.",
    stack: ["HTML", "CSS", "JavaScript"],
    cmd: "$ open --tag=ecommerce",
    links: [
      { label: "ver projeto →", url: "#" },
      { label: "código fonte →", url: "#" },
    ],
  },
  {
    title: "Clima agora",
    tagline: "Consulta de previsão do tempo integrada a uma API pública.",
    description:
      "Ferramenta que busca dados climáticos em tempo real por cidade, exibindo temperatura, sensação térmica e previsão para os próximos dias com ícones animados.",
    stack: ["JavaScript", "API REST", "CSS Grid"],
    cmd: "$ open --tag=api",
    links: [
      { label: "ver projeto →", url: "#" },
      { label: "código fonte →", url: "#" },
    ],
  },
  {
    title: "Lista de tarefas",
    tagline: "Gerenciador de tarefas com categorias e prioridades.",
    description:
      "Aplicativo de produtividade onde o usuário organiza tarefas por categoria e prioridade, com filtros, busca e indicador visual de prazos próximos.",
    stack: ["JavaScript", "LocalStorage", "CSS"],
    cmd: "$ open --tag=produtividade",
    links: [
      { label: "ver projeto →", url: "#" },
      { label: "código fonte →", url: "#" },
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