
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

// Compartir imágenes con otras páginas del proyecto
window.HERO_IMAGES = HERO_IMAGES;

// =====================================
// TIER LIST POR LÍNEAS
// =====================================

function renderTabs() {
  if (!laneTabs) return;

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
  if (!board || !search || !count || !empty) return;

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

// Inicialización segura para páginas que contienen la Tier List
if (laneTabs && board && search && count && empty) {
  search.addEventListener('input', renderBoard);

  renderTabs();
  renderBoard();
}
