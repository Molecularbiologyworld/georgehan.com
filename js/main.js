/* ---- Utility ---- */
const delay = ms => new Promise(r => setTimeout(r, ms));

async function typeLine(el, html, speed = 18) {
  const line = document.createElement('div');
  el.appendChild(line);
  const plain = html.replace(/<[^>]+>/g, '');
  const span = document.createElement('span');
  line.appendChild(span);
  for (const ch of plain) {
    span.textContent += ch;
    await delay(speed + (ch === '.' || ch === '[' ? 25 : 0));
  }
  line.innerHTML = html;
}

/* ---- Navigation ---- */
const PAGES = [
  { name: 'home',     file: 'index.html'    },
  { name: 'about',    file: 'about.html'    },
  { name: 'research', file: 'research.html' },
  { name: 'blog',     file: 'blog.html'     },
  { name: 'books',    file: 'books.html'    },
  { name: 'contact',  file: 'contact.html'  },
];

function buildNav(activePage) {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const depth = window.location.pathname.replace(/\/$/, '').split('/').filter(Boolean).length - 1;
  const prefix = depth > 0 ? '../'.repeat(depth) : '';
  PAGES.forEach(p => {
    const a = document.createElement('a');
    a.href = prefix + p.file;
    a.textContent = p.name;
    if (p.file === activePage) a.classList.add('active');
    nav.appendChild(a);
  });
}

/* ---- Clock ---- */
function startClock() {
  const el = document.getElementById('clock');
  if (!el) return;
  const update = () => {
    const now = new Date();
    el.textContent = now.toLocaleTimeString('en-GB', {
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
  };
  update();
  setInterval(update, 1000);
}

/* ---- Boot sequence (index only) ---- */
async function runBoot() {
  const el = document.getElementById('boot');
  if (!el) return;

  const lines = [
    `<span>[ boot ] Initializing george-han-os...</span>`,
    `<span>[ <span class="ok">  OK  </span> ] Loaded kernel: biomedical-data-science v2026.04</span>`,
    `<span>[ <span class="ok">  OK  </span> ] Mounted /home/george</span>`,
    `<span>[ <span class="ok">  OK  </span> ] Starting research daemon... (2 active processes)</span>`,
    `<span>[ <span class="ok">  OK  </span> ] Loading AI/ML modules</span>`,
    `<span>[ <span class="warn"> WARN </span> ] coffee_levels: critically low — refill recommended</span>`,
    `<span>[ <span class="ok">  OK  </span> ] All systems nominal. Welcome, George.</span>`,
    `<span class="info">Navigate using the links above.</span>`,
  ];

  for (const line of lines) {
    await typeLine(el, line, 12);
    await delay(50);
  }

  const content = document.getElementById('home-content');
  if (content) {
    content.style.opacity = '0';
    content.style.display = 'block';
    let op = 0;
    const fade = setInterval(() => {
      op = Math.min(op + 0.08, 1);
      content.style.opacity = op;
      if (op >= 1) clearInterval(fade);
    }, 30);
  }
}

/* ---- Init ---- */
document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page || 'index.html';
  buildNav(page);
  startClock();
  if (page === 'index.html') runBoot();
});
