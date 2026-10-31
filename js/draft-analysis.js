
/*
  TUPA MLBB — DRAFT ANALYSIS

  Analizador de composiciones.

  Funciones:
  - Identificar los héroes seleccionados.
  - Consultar sus fichas estratégicas.
  - Evaluar la cobertura de información.
  - Detectar roles y atributos desconocidos.
  - Comparar ambos equipos sin inventar ventajas.

  IMPORTANTE:
  El analizador no considera un dato desconocido
  como una debilidad o fortaleza confirmada.
*/

window.TUPA_DRAFT_ANALYSIS = {

  // NORMALIZAR NOMBRES E IDENTIFICADORES
  normalizeHeroId(value) {
    if (!value || typeof value !== "string") return null;

    return value
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "");
  },

  // BUSCAR HÉROE EN LA BASE DE DATOS
  findHero(value) {
    const engine = window.TUPA_DRAFT_ENGINE;

    if (!engine || !value) return null;

    const heroes = engine.getHeroes();
    const normalized = this.normalizeHeroId(value);

    return heroes.find(hero =>
      this.normalizeHeroId(hero.id) === normalized ||
      this.normalizeHeroId(hero.name) === normalized
    ) || null;
  },

  // ANALIZAR UN EQUIPO
  analyzeTeam(heroIds = []) {

    const selectedHeroes = heroIds
      .map(value => this.findHero(value))
      .filter(Boolean);

    const unknownHeroes = heroIds.filter(
      value => !this.findHero(value)
    );

    const verifiedHeroes = selectedHeroes.filter(
      hero => hero.verification?.status === "verified"
    );

    const partialHeroes = selectedHeroes.filter(
      hero => hero.verification?.status === "partial"
    );

    const pendingHeroes = selectedHeroes.filter(
      hero => !["verified", "partial"].includes(
        hero.verification?.status
      )
    );

    // IDENTIFICAR ROLES CONOCIDOS
    const roles = selectedHeroes.map(hero => ({
      hero: hero.name,
      primary: hero.roles?.primary || null,
      secondary: hero.roles?.secondary || []
    }));

    // IDENTIFICAR TIPOS DE DAÑO CONOCIDOS
    const damage = {
      physical: selectedHeroes.filter(
        hero => hero.damage?.physical === true
      ).length,

      magical: selectedHeroes.filter(
        hero => hero.damage?.magical === true
      ).length,

      unknown: selectedHeroes.filter(hero =>
        hero.damage?.physical == null &&
        hero.damage?.magical == null
      ).length
    };

    // IDENTIFICAR ATRIBUTOS CONOCIDOS
    const attributeNames = [
      "mobility",
      "durability",
      "crowdControl",
      "initiation"
    ];

    const attributes = {};

    attributeNames.forEach(attribute => {
      const values = selectedHeroes
        .map(hero => hero.attributes?.[attribute])
        .filter(value =>
          typeof value === "number" &&
          Number.isFinite(value)
        );

      attributes[attribute] = {
        knownCount: values.length,
        unknownCount: selectedHeroes.length - values.length,
        average: values.length > 0
          ? Number(
              (values.reduce((sum, value) => sum + value, 0) /
              values.length).toFixed(2)
            )
          : null
      };
    });

    // DETECTAR INFORMACIÓN FALTANTE
    const missingInformation = selectedHeroes.map(hero => {

      const missing = [];

      if (!hero.roles?.primary) {
        missing.push("primaryRole");
      }

      if (hero.damage?.physical == null) {
        if (hero.damage?.magical !== true) {
          missing.push("physicalDamage");
        }
      }

      if (hero.damage?.magical == null) {
        if (hero.damage?.physical !== true) {
          missing.push("magicalDamage");
        }
      }

      attributeNames.forEach(attribute => {
        if (
          typeof hero.attributes?.[attribute] !== "number"
        ) {
          missing.push(attribute);
        }
      });

      return {
        heroId: hero.id,
        heroName: hero.name,
        missing
      };
    }).filter(item => item.missing.length > 0);

    return {
      totalSelected: heroIds.length,
      registeredCount: selectedHeroes.length,
      unknownCount: unknownHeroes.length,

      verifiedCount: verifiedHeroes.length,
      partialCount: partialHeroes.length,
      pendingCount: pendingHeroes.length,

      heroes: selectedHeroes,
      unknownHeroes,

      roles,
      damage,
      attributes,

      missingInformation,

      verificationStatus:
        unknownHeroes.length > 0 ||
        partialHeroes.length > 0 ||
        pendingHeroes.length > 0
          ? "partial"
          : "verified",

      canProvideCompleteAnalysis:
        unknownHeroes.length === 0 &&
        partialHeroes.length === 0 &&
        pendingHeroes.length === 0 &&
        selectedHeroes.length === heroIds.length
    };
  },

  // COMPARAR EQUIPO AZUL Y EQUIPO ROJO
  compareTeams(blueTeam = [], redTeam = []) {

    const blue = this.analyzeTeam(blueTeam);
    const red = this.analyzeTeam(redTeam);

    return {
      blue,
      red,

      comparisonStatus:
        blue.canProvideCompleteAnalysis &&
        red.canProvideCompleteAnalysis
          ? "verified"
          : "partial",

      message:
        "Comparación estructural realizada. " +
        "No se declaran ventajas competitivas sin evidencia suficiente."
    };
  }

};
