// Link data
const links = [
  {
    id: "og-labs",
    name: "OG Labs",
    url: "https://faucet.0g.ai/",
    description: "Blockchain faucet for OG Labs"
  },
  {
    id: "klok-ai",
    name: "Klok AI",
    url: "https://klokapp.ai?referral_code=9FM4QFA3",
    description: "AI-powered productivity tool"
  },
  {
    id: "assister",
    name: "Assister",
    url: "https://build.assisterr.ai/",
    description: "AI assistant building platform"
  },
  {
    id: "liqfinity",
    name: "Liqfinity",
    url: "https://app.testnet.liqfinity.com/",
    description: "Testnet for Liqfinity platform"
  },
  {
    id: "public-ai",
    name: "PublicAI",
    url: "https://beta.publicai.io/?r=KVpbe",
    description: "Public AI beta platform"
  }
];

// DOM elements
const linkGrid = document.getElementById('link-grid');
const searchInput = document.getElementById('search-input');
const noResults = document.getElementById('no-results');
const themeToggle = document.getElementById('theme-toggle');
const moonIcon = document.getElementById('moon-icon');
const sunIcon = document.getElementById('sun-icon');
const currentYear = document.getElementById('current-year');

// Set current year in footer
currentYear.textContent = new Date().getFullYear();

// Create link cards
function createLinkCard(link) {
  const card = document.createElement('a');
  card.href = link.url;
  card.target = '_blank';
  card.rel = 'noopener noreferrer';
  card.className = 'link-card';
  card.dataset.id = link.id;
  
  const cardHeader = document.createElement('div');
  cardHeader.className = 'link-card-header';
  
  const title = document.createElement('h2');
  title.className = 'link-card-title';
  title.textContent = link.name;
  
  const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  icon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  icon.setAttribute('width', '20');
  icon.setAttribute('height', '20');
  icon.setAttribute('viewBox', '0 0 24 24');
  icon.setAttribute('fill', 'none');
  icon.setAttribute('stroke', 'currentColor');
  icon.setAttribute('stroke-width', '2');
  icon.setAttribute('stroke-linecap', 'round');
  icon.setAttribute('stroke-linejoin', 'round');
  icon.className = 'link-card-icon';
  
  const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path1.setAttribute('d', 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6');
  
  const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
  polyline.setAttribute('points', '15 3 21 3 21 9');
  
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttribute('x1', '10');
  line.setAttribute('y1', '14');
  line.setAttribute('x2', '21');
  line.setAttribute('y2', '3');
  
  icon.appendChild(path1);
  icon.appendChild(polyline);
  icon.appendChild(line);
  
  cardHeader.appendChild(title);
  cardHeader.appendChild(icon);
  
  card.appendChild(cardHeader);
  
  if (link.description) {
    const description = document.createElement('p');
    description.className = 'link-card-description';
    description.textContent = link.description;
    card.appendChild(description);
  }
  
  const url = document.createElement('div');
  url.className = 'link-card-url';
  url.textContent = link.url;
  card.appendChild(url);
  
  return card;
}

// Render all links
function renderLinks(linksToRender) {
  linkGrid.innerHTML = '';
  
  if (linksToRender.length === 0) {
    linkGrid.classList.add('hidden');
    noResults.classList.remove('hidden');
  } else {
    linkGrid.classList.remove('hidden');
    noResults.classList.add('hidden');
    
    linksToRender.forEach(link => {
      const card = createLinkCard(link);
      linkGrid.appendChild(card);
    });
  }
}

// Initialize links
renderLinks(links);

// Search functionality
searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  
  const filteredLinks = links.filter(link => 
    link.name.toLowerCase().includes(searchTerm) || 
    (link.description && link.description.toLowerCase().includes(searchTerm))
  );
  
  renderLinks(filteredLinks);
});

// Theme toggle functionality
function setTheme(isDark) {
  if (isDark) {
    document.documentElement.classList.add('dark');
    moonIcon.classList.add('hidden');
    sunIcon.classList.remove('hidden');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    moonIcon.classList.remove('hidden');
    sunIcon.classList.add('hidden');
    localStorage.setItem('theme', 'light');
  }
}

// Check for saved theme preference or use system preference
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
  setTheme(true);
}

// Theme toggle click handler
themeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.classList.contains('dark');
  setTheme(!isDark);
});