
/*
  TUPA MLBB — DRAFT ANALYSIS

  Analizador de composiciones.
  No convierte información desconocida en ventajas,
  debilidades ni conclusiones estratégicas.
*/

window.TUPA_DRAFT_ANALYSIS = {

  normalizeHeroId(value) {
    if (!value || typeof value !== "string") return null;

    return value
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "");
  },

  findHero(value) {
    const engine = window.TUPA_DRAFT_ENGINE;

    if (!engine || typeof engine.getHeroes !== "function" || !value) {
      return null;
    }

    const heroes = engine.getHeroes();
    const normalized = this.normalizeHeroId(value);

    if (!normalized) return null;

    return heroes.find(hero =>
      this.normalizeHeroId(hero.id) === normalized ||
      this.normalizeHeroId(hero.name) === normalized
    ) || null;
  },

  analyzeTeam(heroIds = []) {
    if (!Array.isArray(heroIds)) {
      heroIds = [];
    }

    const selectedHeroes = [];
    const unknownHeroes = [];

    heroIds.forEach(value => {
      const hero = this.findHero(value);

      if (hero) {
        selectedHeroes.push(hero);
      } else {
        unknownHeroes.push(value);
      }
    });

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

    // ROLES
    const roles = selectedHeroes.map(hero => ({
      hero: hero.name,
      primary: hero.roles?.primary || null,
      secondary: Array.isArray(hero.roles?.secondary)
        ? hero.roles.secondary
        : []
    }));

    // TIPOS DE DAÑO
    const physicalCount = selectedHeroes.filter(
      hero => hero.damage?.physical === true
    ).length;

    const magicalCount = selectedHeroes.filter(
      hero => hero.damage?.magical === true
    ).length;

    const physicalUnknown = heroIds.length -
      selectedHeroes.filter(hero =>
        typeof hero.damage?.physical === "boolean"
      ).length;

    const magicalUnknown = heroIds.length -
      selectedHeroes.filter(hero =>
        typeof hero.damage?.magical === "boolean"
      ).length;

    const damage = {
      physical: physicalCount,
      magical: magicalCount,
      physicalUnknown,
      magicalUnknown,
      unknown: heroIds.length -
        selectedHeroes.filter(hero =>
          typeof hero.damage?.physical === "boolean" &&
          typeof hero.damage?.magical === "boolean"
        ).length
    };

    // ATRIBUTOS
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

        // Incluye héroes sin ficha estratégica.
        unknownCount: heroIds.length - values.length,

        average: values.length > 0
          ? Number(
              (
                values.reduce((sum, value) => sum + value, 0) /
                values.length
              ).toFixed(2)
            )
          : null
      };
    });

    // INFORMACIÓN FALTANTE
    const missingInformation = selectedHeroes.map(hero => {
      const missing = [];

      if (!hero.roles?.primary) {
        missing.push("primaryRole");
      }

      if (typeof hero.damage?.physical !== "boolean") {
        missing.push("physicalDamage");
      }

      if (typeof hero.damage?.magical !== "boolean") {
        missing.push("magicalDamage");
      }

      attributeNames.forEach(attribute => {
        const value = hero.attributes?.[attribute];

        if (
          typeof value !== "number" ||
          !Number.isFinite(value)
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

    // HÉROES SIN FICHA ESTRATÉGICA
    unknownHeroes.forEach(value => {
      missingInformation.push({
        heroId: this.normalizeHeroId(value),
        heroName: String(value),
        missing: [
          "heroRecord",
          "primaryRole",
          "physicalDamage",
          "magicalDamage",
          ...attributeNames
        ]
      });
    });

    const hasIncompleteVerification =
      unknownHeroes.length > 0 ||
      partialHeroes.length > 0 ||
      pendingHeroes.length > 0;

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

      verificationStatus: hasIncompleteVerification
        ? "partial"
        : "verified",

      canProvideCompleteAnalysis:
        !hasIncompleteVerification &&
        selectedHeroes.length === heroIds.length
    };
  },

  compareTeams(blueTeam = [], redTeam = []) {
    const blue = this.analyzeTeam(blueTeam);
    const red = this.analyzeTeam(redTeam);

    const comparisonComplete =
      blue.canProvideCompleteAnalysis &&
      red.canProvideCompleteAnalysis;

    return {
      blue,
      red,

      comparisonStatus: comparisonComplete
        ? "verified"
        : "partial",

      message:
        "Comparación estructural realizada. " +
        "No se declaran ventajas competitivas sin evidencia suficiente."
    };
  }

};
