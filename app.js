
const lanes = Object.keys(TIER_DATA);

const laneTabs = document.getElementById('laneTabs');
const board = document.getElementById('tierBoard');
const search = document.getElementById('search');
const count = document.getElementById('heroCount');
const empty = document.getElementById('empty');

let activeLane = 'Jungle';

// Imágenes de héroes disponibles



const HERO_IMAGES = {
  // ROAM
  "Belerick": "belerick.webp",
  "Gloo": "gloo.webp",
  "Estes": "estes.webp",
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
  "Natalia": "natalia.webp",
  "Akai": "akai.webp",
  "Helcurt": "helcurt.webp",
  "Kalea": "kalea.webp",
  "Johnson": "johnson.webp",
  "Hylos": "hylos.webp",
  "Chou": "chou.webp",
  "Faramis": "faramis.webp",
  "Jawhead": "jawhead.webp",
  "Grock": "grock.webp",
  "Arlott": "arlott.webp",
  "Chip": "chip.webp",
  "Gatotkaca": "gatotkaca.webp",
  "Franco": "franco.webp",
  "Mathilda": "mathilda.webp",
  "Baxia": "baxia.webp",

  // EXP LANE
  "Aulus": "aulus.webp",
  "Lukas": "lukas.webp",
  "Paquito": "paquito.webp",
  "Argus": "argus.webp",
  "Alice": "alice.webp",
  "Barats": "barats.webp",
  "X.Borg": "xborg.webp",
  "Benedetta": "benedetta.webp",
  "Aldous": "aldous.webp",
  "Sora": "sora.webp",
  "Khaleed": "khaleed.webp",
  "Thamuz": "thamuz.webp",
  "Dyrroth": "dyrroth.webp",
  "Terizla": "terizla.webp",
  "Cici": "cici.webp",
  "Yu Zhong": "yuzhong.webp",
  "Esmeralda": "esmeralda.webp",
  "Uranus": "uranus.webp",
  "Leomord": "leomord.webp",
  "Ruby": "ruby.webp",
  "Lapu-Lapu": "lapulapu.webp",
  "Phoveus": "phoveus.webp",
  "Freya": "freya.webp",
  "Martis": "martis.webp",
  "Zilong": "zilong.webp",
  "Valentina": "valentina.webp",

  // JUNGLE
  "Hirara": "hirara.webp",
  "Saber": "saber.webp",
  "Nolan": "nolan.webp",
  "Ling": "ling.webp",
  "Hanzo": "hanzo.webp",
  "Cyclops": "cyclops.webp",
  "Gusion": "gusion.webp",
  "Aamon": "aamon.webp",
  "Yi Sun-shin": "yisunshin.webp",
  "Suyou": "suyou.webp",
  "Karina": "karina.webp",
  "Julian": "julian.webp",
  "Bane": "bane.webp",
  "Fredrinn": "fredrinn.webp",
  "Harley": "harley.webp",
  "Hayabusa": "hayabusa.webp",
  "Alpha": "alpha.webp",
  "Yin": "yin.webp",
  "Alucard": "alucard.webp",
  "Roger": "roger.webp",
  "Balmond": "balmond.webp",
  "Joy": "joy.webp",
  "Lancelot": "lancelot.webp",
  "Fanny": "fanny.webp",

  // MID LANE
  "Eudora": "eudora.webp",
  "Valir": "valir.webp",
  "Zetian": "zetian.webp",
  "Novaria": "novaria.webp",
  "Gord": "gord.webp",
  "Kadita": "kadita.webp",
  "Zhask": "zhask.webp",
  "Vexana": "vexana.webp",
  "Kagura": "kagura.webp",
  "Cecilion": "cecilion.webp",
  "Vale": "vale.webp",
  "Lylia": "lylia.webp",
  "Kimmy": "kimmy.webp",
  "Yve": "yve.webp",
  "Aurora": "aurora.webp",
  "Odette": "odette.webp",
  "Chang'e": "change.webp",
  "Xavier": "xavier.webp",
  "Zhuxin": "zhuxin.webp",
  "Lunox": "lunox.webp",
  "Luo Yi": "luoyi.webp",
  "Pharsa": "pharsa.webp",

  // GOLD LANE
  "Obsidia": "obsidia.webp",
  "Hanabi": "hanabi.webp",
  "Miya": "miya.webp",
  "Lesley": "lesley.webp",
  "Popol and Kupa": "popol and kupa.webp",
  "Layla": "layla.webp",
  "Irithel": "irithel.webp",
  "Bruno": "bruno.webp",
  "Brody": "brody.webp",
  "Clint": "clint.webp",
  "Ixia": "ixia.webp",
  "Moskov": "moskov.webp",
  "Natan": "natan.webp",
  "Claude": "claude.webp",
  "Beatrix": "beatrix.webp",
  "Karrie": "karrie.webp",
  "Wanwan": "wanwan.webp",
  "Melissa": "melissa.webp",
  "Granger": "granger.webp",
  "Harith": "harith.webp"
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

// =====================================
// TUPA MLBB — TIER LIST PROPIA
// =====================================

async function loadTupaTier() {
  const container = document.getElementById('tupaTierBoard');

  try {
    const response = await fetch('./rankings.json');

    if (!response.ok) {
      throw new Error('No se pudieron cargar las estadísticas.');
    }

    const result = await response.json();
    const heroes = result?.data?.heroes;

    if (!Array.isArray(heroes) || heroes.length === 0) {
      throw new Error('No hay datos de héroes disponibles.');
    }

    // Calcula la posición relativa de cada héroe en cada métrica.
    function percentile(hero, field) {
      const values = heroes
        .map(h => Number(h[field]))
        .filter(Number.isFinite)
        .sort((a, b) => a - b);

      const value = Number(hero[field]);

      if (!Number.isFinite(value) || values.length < 2) return 0;

      const position = values.filter(v => v <= value).length - 1;
      return position / (values.length - 1);
    }

    // Ponderación inicial de TUPA.
    const ranked = heroes.map(hero => {
      const wr = percentile(hero, 'winRate');
      const pr = percentile(hero, 'pickRate');
      const br = percentile(hero, 'banRate');

      return {
        ...hero,
        tupaScore: (wr * 0.50) + (pr * 0.25) + (br * 0.25)
      };
    });

    ranked.sort((a, b) => b.tupaScore - a.tupaScore);

    // Tres categorías: S, A y C.
    const total = ranked.length;

    const categories = [
      { name: 'S', title: 'DOMINANTES', limit: Math.ceil(total * 0.20) },
      { name: 'A', title: 'COMPETITIVOS', limit: Math.ceil(total * 0.60) },
      { name: 'C', title: 'CONTEXTUALES', limit: total }
    ];

    let start = 0;

    container.innerHTML = '';

    categories.forEach(category => {
      const group = document.createElement('div');
      group.className = `tupa-tier-group tier-${category.name.toLowerCase()}`;

      const heading = document.createElement('h3');
      heading.textContent = `${category.name} — ${category.title}`;

      const grid = document.createElement('div');
      grid.className = 'tupa-hero-grid';

      ranked.slice(start, category.limit).forEach(hero => {
        const card = document.createElement('article');
        card.className = 'tupa-hero-card';

        const image = document.createElement('img');
        image.src = HERO_IMAGES[hero.name] || '';
        image.alt = hero.name;
        image.loading = 'lazy';

        if (!image.src || !HERO_IMAGES[hero.name]) {
          image.style.display = 'none';
        }

        const name = document.createElement('strong');
        name.textContent = hero.name;

        const stats = document.createElement('div');
        stats.className = 'tupa-hero-stats';
        stats.innerHTML = `
          <span>WR <b>${Number(hero.winRate).toFixed(2)}%</b></span>
          <span>PR <b>${Number(hero.pickRate).toFixed(2)}%</b></span>
          <span>BR <b>${Number(hero.banRate).toFixed(2)}%</b></span>
        `;

        card.append(image, name, stats);

        if (hero.lowSample) {
          const warning = document.createElement('small');
          warning.textContent = 'Muestra baja';
          warning.className = 'tupa-warning';
          card.appendChild(warning);
        }

        grid.appendChild(card);
      });

      group.append(heading, grid);
      container.appendChild(group);

      start = category.limit;
    });

    console.log('TUPA Tier List cargada:', ranked.length, 'héroes');

  } catch (error) {
    container.textContent = `Error: ${error.message}`;
    console.error(error);
  }
}

loadTupaTier();
