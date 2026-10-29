
const lanes = Object.keys(TIER_DATA);

const laneTabs = document.getElementById('laneTabs');
const board = document.getElementById('tierBoard');
const search = document.getElementById('search');
const count = document.getElementById('heroCount');
const empty = document.getElementById('empty');

let activeLane = 'Jungle';

// Imágenes de héroes disponibles
const HERO_IMAGES = {
  // ROAM - SS
  "Belerick": "belerick.webp",
  "Gloo": "gloo.webp",
  "Estes": "estes.webp",

  // ROAM - S
  "Masha": "masha.webp",
  "Sun": "sun.webp",
  "Marcel": "marcel.webp",
  "Rafaela": "rafaela.webp",
  "Floryn": "floryn.webp",
  "Carmilla": "carmilla.webp",
  "Atlas": "atlas.webp",
  "Minotaur": "minotaur.webp",
  "Hilda": "hilda.webp",
  "Angela": "angela.webp",

  // ROAM - A
  "Minsitthar": "minsitthar.webp",
  "Khufra": "khufra.webp",
  "Selena": "selena.webp",
  "Silvanna": "silvanna.webp",
  "Badang": "badang.webp",
  "Lolita": "lolita.webp",
  "Diggie": "diggie.webp",
  "Kaja": "kaja.webp",
  "Tigreal": "tigreal.webp",
  "Nana": "nana.webp",
  "Guinevere": "guinevere.webp",
  "Edith": "edith.webp",

  // ROAM - B
  "Natalia": "natalia.webp",
  "Akai": "akai.webp",
  "Helcurt": "helcurt.webp",
  "Kalea": "kalea.webp",
  "Johnson": "johnson.webp",
  "Hylos": "hylos.webp",

  // ROAM - C
  "Chou": "chou.webp",
  "Faramis": "faramis.webp",
  "Jawhead": "jawhead.webp",

  // ROAM - D
  "Grock": "grock.webp",
  "Arlott": "arlott.webp",
  "Chip": "chip.webp",
  "Gatotkaca": "gatotkaca.webp",
  "Franco": "franco.webp",
  "Mathilda": "mathilda.webp",
  "Baxia": "baxia.webp"
};
function renderTabs() {
  laneTabs.innerHTML = '';

  lanes.forEach(lane => {
    const b = document.createElement('button');

    b.className = 'lane-btn' + (lane === activeLane ? ' active' : '');
    b.textContent = lane === 'EXP Lane'
      ? 'EXP'
      : lane === 'Mid Lane'
        ? 'MID'
        : lane.toUpperCase();

    b.onclick = () => {
      activeLane = lane;
      renderTabs();
      renderBoard();
    };

    laneTabs.appendChild(b);
  });
}

function renderBoard() {
  const q = search.value.trim().toLocaleLowerCase('es');

  board.innerHTML = '';

  let total = 0;
  let visible = 0;

  ['SS', 'S', 'A', 'B', 'C', 'D'].forEach(tier => {
    const heroes = TIER_DATA[activeLane][tier] || [];

    total += heroes.length;

    const filtered = heroes.filter(h =>
      h.toLocaleLowerCase('es').includes(q)
    );

    if (!filtered.length) return;

    visible += filtered.length;

    const row = document.createElement('div');
    row.className = 'tier-row';

    const label = document.createElement('div');
    label.className = 'tier-label ' + tier.toLowerCase();
    label.textContent = tier;

    const list = document.createElement('div');
    list.className = 'heroes';

    filtered.forEach(name => {
      const chip = document.createElement('div');
      chip.className = 'hero-chip';

      const imagePath = HERO_IMAGES[name];

      if (imagePath) {
        const img = document.createElement('img');
        img.src = imagePath;
        img.alt = name;
        img.className = 'hero-image';

        img.onerror = () => {
          img.remove();
        };

        chip.appendChild(img);
      }

      const heroName = document.createElement('span');
      heroName.textContent = name;

      chip.appendChild(heroName);
      list.appendChild(chip);
    });

    row.append(label, list);
    board.appendChild(row);
  });

  count.textContent = `${visible} / ${total} HÉROES`;
  empty.hidden = visible !== 0;
}

search.addEventListener('input', renderBoard);

renderTabs();
renderBoard();
