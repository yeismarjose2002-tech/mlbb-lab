/*
  TUPA MLBB — BASE LOCAL DE COUNTERS
  Fuente: MLBB Intel — lista pública de counters.
  Fecha de consulta: 2026-10-30.

  IMPORTANTE:
  - Cada héroe contiene los rivales que la fuente lista como counters suyos.
  - Son relaciones provisionales, no estadísticas de victoria.
  - No se inventan explicaciones tácticas.
  - Todas las relaciones quedan pendientes de verificación.
*/

(() => {
  const COUNTERS_BY_HERO = {
    "Aamon": ["Gloo", "Silvanna", "Hayabusa"],
    "Akai": ["Alice", "Hirara", "Marcel"],
    "Aldous": ["Esmeralda", "Karina", "Angela"],
    "Alice": ["Angela", "Floryn", "Karrie"],
    "Alpha": ["Benedetta", "X.Borg", "Valir"],
    "Alucard": ["Barats", "Fredrinn", "Thamuz"],
    "Angela": ["Franco", "Zilong", "Silvanna"],
    "Argus": ["Barats", "Terizla", "Fredrinn"],
    "Arlott": ["Hanabi", "Phoveus", "Zhask"],
    "Atlas": ["Marcel", "Ruby", "Benedetta"],
    "Aulus": ["Alice", "Zhuxin", "Cici"],
    "Aurora": ["Yin", "Fanny", "Benedetta"],
    "Badang": ["Khufra", "Alice", "Esmeralda"],
    "Balmond": ["Cici", "X.Borg", "Angela"],
    "Bane": ["Lolita", "Benedetta", "Hanzo"],
    "Barats": ["X.Borg", "Alice", "Gord"],
    "Baxia": ["Hylos", "X.Borg", "Kagura"],
    "Beatrix": ["Wanwan", "Khaleed", "Faramis"],
    "Belerick": ["Lesley", "Aldous", "Brody"],
    "Benedetta": ["Diggie", "Cici", "Phoveus"],
    "Brody": ["Barats", "Leomord", "Hanzo"],
    "Bruno": ["Arlott", "Fredrinn", "Lukas"],
    "Carmilla": ["X.Borg", "Valentina", "Fanny"],
    "Cecilion": ["Natalia", "Ixia", "Yin"],
    "Chang'e": ["Lolita", "Esmeralda", "Gloo"],
    "Chip": ["Alice", "Kaja", "Luo Yi"],
    "Chou": ["Cyclops", "Esmeralda", "Phoveus"],
    "Cici": ["Aamon", "Estes", "Zilong"],
    "Claude": ["Lesley", "Aamon", "Edith"],
    "Clint": ["Fanny", "Gloo", "Sora"],
    "Cyclops": ["Lolita", "Estes", "Ixia"],
    "Diggie": ["Estes", "Floryn", "Lolita"],
    "Dyrroth": ["Argus", "Masha", "Thamuz"],
    "Edith": ["Lolita", "Beatrix", "Karina"],
    "Esmeralda": ["Karrie", "Dyrroth", "Lunox"],
    "Estes": ["Ixia", "Beatrix", "Nolan"],
    "Eudora": ["Atlas", "Masha", "Barats"],
    "Fanny": ["Saber", "Franco", "Moskov"],
    "Faramis": ["Terizla", "Mathilda", "Valentina"],
    "Floryn": ["Beatrix", "Silvanna", "Lolita"],
    "Franco": ["Sun", "Tigreal", "Popol and Kupa"],
    "Fredrinn": ["Valir", "Karrie", "X.Borg"],
    "Freya": ["Phoveus", "Minsitthar", "Franco"],
    "Gatotkaca": ["Lesley", "X.Borg", "Aldous"],
    "Gloo": ["Moskov", "Faramis", "Alice"],
    "Gord": ["Natalia", "Helcurt", "Mathilda"],
    "Grock": ["Alice", "Luo Yi", "Esmeralda"],
    "Guinevere": ["Wanwan", "Khufra", "Diggie"],
    "Gusion": ["Lolita", "Brody", "Marcel"],
    "Hanabi": ["Joy", "Wanwan", "Ixia"],
    "Hanzo": ["Natalia", "Yin", "Ling"],
    "Harith": ["Wanwan", "Phoveus", "Marcel"],
    "Harley": ["Lolita", "Sun", "Gloo"],
    "Hayabusa": ["Saber", "Fredrinn", "Popol and Kupa"],
    "Helcurt": ["Karina", "Argus", "Hilda"],
    "Hilda": ["Alpha", "Atlas", "Karrie"],
    "Hirara": ["Phoveus", "Cyclops", "Edith"],
    "Hylos": ["X.Borg", "Valir", "Karrie"],
    "Irithel": ["Brody", "Eudora", "Saber"],
    "Ixia": ["Atlas", "Hanzo", "Natalia"],
    "Jawhead": ["Sun", "Esmeralda", "Gloo"],
    "Johnson": ["Gloo", "Alice", "Harith"],
    "Joy": ["Barats", "Mathilda", "Kaja"],
    "Julian": ["Guinevere", "Minsitthar", "Tigreal"],
    "Kadita": ["Marcel", "Hirara", "Alice"],
    "Kagura": ["Esmeralda", "Phoveus", "Khufra"],
    "Kaja": ["Odette", "Zhask", "Hanabi"],
    "Kalea": ["Bane", "Hanabi", "Minsitthar"],
    "Karina": ["Granger", "Brody", "Clint"],
    "Karrie": ["Sun", "X.Borg", "Rafaela"],
    "Khaleed": ["Mathilda", "Atlas", "Faramis"],
    "Khufra": ["Diggie", "Ruby", "Rafaela"],
    "Kimmy": ["Karina", "Fanny", "Lolita"],
    "Lancelot": ["Angela", "Floryn", "Marcel"],
    "Lapu-Lapu": ["Yve", "Benedetta", "Yu Zhong"],
    "Layla": ["Atlas", "Sun", "Johnson"],
    "Leomord": ["Hirara", "Kimmy", "Valir"],
    "Lesley": ["Clint", "Gloo", "Estes"],
    "Ling": ["Natalia", "Saber", "Karina"],
    "Lolita": ["Aurora", "Zhuxin", "Esmeralda"],
    "Lukas": ["Zhuxin", "Carmilla", "Balmond"],
    "Lunox": ["Bruno", "Faramis", "Arlott"],
    "Luo Yi": ["Ling", "Helcurt", "Marcel"],
    "Lylia": ["Cici", "Natalia", "Chou"],
    "Marcel": ["Angela", "Floryn", "Lesley"],
    "Martis": ["X.Borg", "Minsitthar", "Alice"],
    "Masha": ["Estes", "Kimmy", "Floryn"],
    "Mathilda": ["Hylos", "Aldous", "Esmeralda"],
    "Melissa": ["Belerick", "Ixia", "Terizla"],
    "Minotaur": ["Alice", "Ixia", "Valir"],
    "Minsitthar": ["Natalia", "Yin", "Karina"],
    "Miya": ["Belerick", "Gatotkaca", "Thamuz"],
    "Moskov": ["Hanabi", "Karina", "Cyclops"],
    "Nana": ["Gloo", "Helcurt", "Terizla"],
    "Natalia": ["Cyclops", "Karina", "Saber"],
    "Natan": ["Lolita", "Brody", "Nolan"],
    "Nolan": ["Natalia", "Saber", "Paquito"],
    "Novaria": ["Natalia", "Ling", "Hilda"],
    "Obsidia": ["Belerick", "Estes", "Miya"],
    "Odette": ["Nana", "Atlas", "Vale"],
    "Paquito": ["Esmeralda", "Khufra", "Phoveus"],
    "Pharsa": ["Masha", "Grock", "Yin"],
    "Phoveus": ["X.Borg", "Bane", "Sun"],
    "Popol and Kupa": ["Atlas", "Hanabi", "Alice"],
    "Rafaela": ["Ixia", "Silvanna", "Odette"],
    "Roger": ["Luo Yi", "Popol and Kupa", "Uranus"],
    "Ruby": ["X.Borg", "Phoveus", "Barats"],
    "Saber": ["Balmond", "Leomord", "Alpha"],
    "Selena": ["Lunox", "Ling", "Gloo"],
    "Silvanna": ["Karina", "Barats", "Yin"],
    "Sora": ["Khufra", "Phoveus", "Alice"],
    "Sun": ["Natan", "Karina", "Ruby"],
    "Suyou": ["Claude", "Silvanna", "Harley"],
    "Terizla": ["X.Borg", "Diggie", "Gord"],
    "Thamuz": ["Cici", "Valir", "Hylos"],
    "Tigreal": ["Alice", "Diggie", "X.Borg"],
    "Uranus": ["Karrie", "Dyrroth", "Angela"],
    "Vale": ["Balmond", "Alice", "Esmeralda"],
    "Valentina": ["Phoveus", "Popol and Kupa", "Karrie"],
    "Valir": ["Kaja", "Helcurt", "Rafaela"],
    "Vexana": ["Alice", "X.Borg", "Marcel"],
    "Wanwan": ["Phoveus", "Faramis", "Hirara"],
    "X.Borg": ["Zilong", "Helcurt", "Ling"],
    "Xavier": ["Natalia", "Angela", "Helcurt"],
    "Yi Sun-shin": ["Aulus", "Uranus", "Karina"],
    "Yin": ["Esmeralda", "Wanwan", "Hilda"],
    "Yu Zhong": ["Masha", "Cici", "Suyou"],
    "Yve": ["Natan", "Jawhead", "Fredrinn"],
    "Zetian": ["Harith", "Floryn", "Gloo"],
    "Zhask": ["Uranus", "Natan", "Alice"],
    "Zhuxin": ["Clint", "Guinevere", "Ruby"],
    "Zilong": ["Karina", "Eudora", "Tigreal"]
  };

  const SOURCE = "MLBB Intel — lista pública de counters (consulta 2026-10-30)";

  // Convierte la tabla en relaciones que puede leer Draft Lab.
  window.TUPA_COUNTERS = Object.entries(COUNTERS_BY_HERO).flatMap(
    ([hero, counters]) =>
      counters.map((counter, index) => ({
        id: `mlbbintel-${hero.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${index + 1}`,
        hero,
        against: counter,
        type: "provisional",
        reason: "Counter listado por la fuente; explicación táctica pendiente de verificación.",
        conditions: [],
        weaknesses: [],
        confidence: null,
        sources: [SOURCE],
        verification: {
          status: "pending",
          lastReviewed: null
        }
      }))
  );

  window.TUPA_COUNTERS_META = {
    source: SOURCE,
    referenceDate: "2026-10-30",
    heroes: Object.keys(COUNTERS_BY_HERO).length,
    relations: window.TUPA_COUNTERS.length,
    status: "provisional"
  };

  console.log(
    `[TUPA] ${window.TUPA_COUNTERS_META.heroes} héroes y ${window.TUPA_COUNTERS_META.relations} relaciones cargadas.`
  );
})();
