// ==========================================================
// DOLZ - Template Data
// To add a new website, just add another object below.
// The card will be generated automatically.
// ==========================================================

const templates = [
  {
    id: 1,
    name: "Inventory Management",
    description: "Simple inventory management system for small businesses.",
    category: "Business",
    thumbnail: "assets/inventory.svg",
    url: "#",
    status: "Available",
    tags: ["inventory", "business", "sme", "stock", "small businesses"],
    features: ["Product tracking", "Stock alerts", "Simple reports"]
  },
  {
    id: 2,
    name: "Marketing System",
    description: "Marketing tools and templates designed for SMEs.",
    category: "Marketing",
    thumbnail: "assets/marketing.svg",
    url: "#",
    status: "New",
    tags: ["marketing", "sme", "campaign", "templates", "ads"],
    features: ["Campaign planner", "Content templates", "Analytics dashboard"]
  },
  {
    id: 3,
    name: "SOP Management",
    description: "Organize and manage company SOP documents.",
    category: "Business",
    thumbnail: "assets/sop.svg",
    url: "#",
    status: "Available",
    tags: ["sop", "business", "documents", "procedures", "workflows"],
    features: ["Document library", "Version control", "Team review"]
  },
  {
    id: 4,
    name: "Fitness Mission",
    description: "A fitness planning and training management application.",
    category: "Fitness",
    thumbnail: "assets/fitness.svg",
    url: "#",
    status: "Beta",
    tags: ["fitness", "training", "health", "workout", "plans"],
    features: ["Workout plans", "Progress tracking", "Goals & streaks"]
  },
  {
    id: 5,
    name: "Family Games",
    description: "Simple games designed for family and friends.",
    category: "Games",
    thumbnail: "assets/games.svg",
    url: "#",
    status: "Coming Soon",
    tags: ["games", "family", "friends", "fun", "social"],
    features: ["Party games", "Turn-based play", "Scoreboards"]
  }
];

// ----------------------------------------------------------
// DOLZ - My Systems
// Your custom-built systems. Add a new system by adding
// an object below - its card appears automatically.
// ----------------------------------------------------------

const systems = [
  {
    id: 1,
    name: "HR System",
    description: "Manage employees, attendance and leave records.",
    category: "Business",
    thumbnail: "assets/hr.svg",
    url: "#",
    status: "Coming Soon",
    tags: ["hr", "human resources", "employees", "attendance", "leave"]
  },
  {
    id: 2,
    name: "Invoice Generator",
    description: "Create, send and track invoices in minutes.",
    category: "Tools",
    thumbnail: "assets/invoice.svg",
    url: "#",
    status: "Coming Soon",
    tags: ["invoice", "billing", "payments", "tool"]
  },
  {
    id: 3,
    name: "Booking System",
    description: "Appointment scheduling and calendar management.",
    category: "Productivity",
    thumbnail: "assets/booking.svg",
    url: "#",
    status: "Coming Soon",
    tags: ["booking", "appointments", "calendar", "scheduling"]
  },
  {
    id: 4,
    name: "Customer CRM",
    description: "Track customers, leads and follow-up activities.",
    category: "Marketing",
    thumbnail: "assets/crm.svg",
    url: "#",
    status: "Coming Soon",
    tags: ["crm", "customers", "leads", "sales"]
  },
  {
    id: 5,
    name: "Expense Tracker",
    description: "Record daily expenses and view spending summaries.",
    category: "Business",
    thumbnail: "assets/expense.svg",
    url: "#",
    status: "Coming Soon",
    tags: ["expense", "money", "tracking", "finance"]
  },
  {
    id: 6,
    name: "Klik Oyen!",
    description: "Tap-the-cat arcade game — beat the clock and set your high score.",
    category: "Games",
    thumbnail: "assets/klik-oyen.svg",
    url: "apps/klik-oyen/index.html",
    status: "Available",
    tags: ["game", "cat", "arcade", "tap", "fun"],
    features: ["30-second rounds", "High score", "Sound effects"]
  },
  {
    id: 7,
    name: "THE KAPLA",
    description: "MMA Fighter Manager — build your roster, train fighters, and dominate the octagon.",
    category: "Games",
    thumbnail: "",
    url: "apps/the-kapla/index.html",
    status: "New",
    tags: ["game", "mma", "fighter", "manager", "combat", "sports", "simulation"],
    features: ["9 screens", "Pixel-art avatars", "Career progression", "Fight simulation"]
  }
];

// ----------------------------------------------------------
// Main logic below - no changes usually needed here
// ----------------------------------------------------------

const grid = document.getElementById('templateGrid');
const systemGrid = document.getElementById('systemGrid');
const noResults = document.getElementById('noResults');
const searchInput = document.getElementById('searchInput');
const categoryBtns = document.querySelectorAll('.category-btn');

let activeCategory = 'All';
let searchQuery = '';

function statusClass(status) {
  const map = {
    'New': 'status-new',
    'Coming Soon': 'status-coming',
    'Beta': 'status-beta',
    'Available': 'status-available'
  };
  return map[status] || 'status-available';
}

function createCard(template) {
  const card = document.createElement('article');
  card.className = 'template-card';

  const img = template.thumbnail
    ? `<img src="${template.thumbnail}" alt="${template.name} preview" loading="lazy">`
    : '';

  card.innerHTML = `
    <div class="card-image">${img}</div>
    <div class="card-body">
      <div class="card-header">
        <span class="card-category">${template.category}</span>
      </div>
      <h3 class="card-name">${template.name}</h3>
      <p class="card-desc">${template.description}</p>
      <div class="card-footer">
        <span class="status-badge ${statusClass(template.status)}">${template.status}</span>
        <button class="open-btn" data-id="${template.id}">Open Website</button>
      </div>
    </div>
  `;

  const openBtn = card.querySelector('.open-btn');
  openBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    openTemplate(template);
  });

  card.addEventListener('click', () => openTemplate(template));

  return card;
}

function openTemplate(template) {
  if (template.status.toLowerCase() === 'coming soon') {
    return;
  }
  window.open(template.url, '_blank', 'noopener,noreferrer');
}

function getFilteredTemplates() {
  const query = searchQuery.trim().toLowerCase();

  return templates.filter((t) => {
    const matchesCategory =
      activeCategory === 'All' || t.category === activeCategory;

    const matchesSearch = !query ||
      [t.name, t.description, t.category, ...t.tags]
        .join(' ')
        .toLowerCase()
        .includes(query);

    return matchesCategory && matchesSearch;
  });
}

function render() {
  grid.innerHTML = '';
  const filtered = getFilteredTemplates();

  if (filtered.length === 0) {
    noResults.classList.add('visible');
    return;
  }

  noResults.classList.remove('visible');

  filtered.forEach((t, i) => {
    const card = createCard(t);
    card.style.animationDelay = `${Math.min(i * 0.05, 0.35)}s`;
    grid.appendChild(card);
  });
}

searchInput.addEventListener('input', () => {
  searchQuery = searchInput.value;
  render();
});

categoryBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    categoryBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    activeCategory = btn.dataset.category;
    render();
  });
});

// Mobile nav toggle
const mobileToggle = document.getElementById('mobileToggle');
const nav = document.getElementById('nav');

mobileToggle.addEventListener('click', () => {
  mobileToggle.classList.toggle('open');
  nav.classList.toggle('open');
});

nav.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    mobileToggle.classList.remove('open');
    nav.classList.remove('open');
  });
});

// Header border on scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// Highlight active nav link on scroll
const sections = ['hero', 'my-system', 'templates', 'about'];
window.addEventListener('scroll', () => {
  const pos = window.scrollY + 120;
  let current = 'hero';

  sections.forEach((id) => {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= pos) current = id;
  });

  const categoriesSection = document.getElementById('categories');
  if (current === 'templates' && categoriesSection && categoriesSection.offsetTop <= pos) {
    current = 'templates';
  }

  nav.querySelectorAll('.nav-link').forEach((link) => {
    if (link.classList.contains('nav-cta')) return;
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}, { passive: true });

// Initial render
render();
renderSystems();

function renderSystems() {
  systems.forEach((s, i) => {
    const card = createCard(s);
    card.style.animationDelay = `${Math.min(i * 0.05, 0.35)}s`;
    systemGrid.appendChild(card);
  });
}