
/*
  TUPA MLBB — DRAFT ENGINE

  Motor central del Draft Lab.
  Centraliza las consultas y el estado de las bases de datos.
*/

window.TUPA_DRAFT_ENGINE = {

  validStatuses: ["verified", "partial", "pending"],

  // NORMALIZAR IDENTIFICADORES
  normalizeId(value) {
    if (!value || typeof value !== "string") return null;

    return value
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "");
  },

  // COMPROBAR LAS BASES DE DATOS
  getDatabaseStatus() {
    return {
      heroes: Array.isArray(window.TUPA_HEROES),
      sources: Array.isArray(window.TUPA_SOURCES),
      synergies: Array.isArray(window.TUPA_SYNERGIES),
      counters: Array.isArray(window.TUPA_COUNTERS)
    };
  },

  // CONSULTAR TODOS LOS HÉROES
  getHeroes() {
    return Array.isArray(window.TUPA_HEROES)
      ? window.TUPA_HEROES.filter(hero =>
          hero &&
          typeof hero === "object" &&
          typeof hero.id === "string" &&
          typeof hero.name === "string"
        )
      : [];
  },

  // BUSCAR HÉROE POR IDENTIFICADOR O NOMBRE
  getHeroById(id) {
    const normalized = this.normalizeId(id);

    if (!normalized) return null;

    return this.getHeroes().find(hero =>
      this.normalizeId(hero.id) === normalized ||
      this.normalizeId(hero.name) === normalized
    ) || null;
  },

  // CLASIFICAR HÉROES
  getHeroesByStatus(status) {
    if (!this.validStatuses.includes(status)) {
      return [];
    }

    return this.getHeroes().filter(
      hero => hero.verification?.status === status
    );
  },

  getVerifiedHeroes() {
    return this.getHeroesByStatus("verified");
  },

  getPartialHeroes() {
    return this.getHeroesByStatus("partial");
  },

  getPendingHeroes() {
    return this.getHeroesByStatus("pending");
  },

  // CONSULTAR ESTADO DE VERIFICACIÓN
  getHeroVerification(id) {
    const hero = this.getHeroById(id);

    if (!hero) {
      return {
        found: false,
        status: "unknown",
        message: "El héroe no está registrado en la base estratégica."
      };
    }

    const rawStatus = hero.verification?.status;
    const status = this.validStatuses.includes(rawStatus)
      ? rawStatus
      : "pending";

    return {
      found: true,
      heroId: hero.id,
      heroName: hero.name,
      status,
      sources: Array.isArray(hero.verification?.sources)
        ? hero.verification.sources
        : [],
      lastReviewed: hero.verification?.lastReviewed || null,
      message: status === "verified"
        ? "Información verificada."
        : status === "partial"
          ? "Información parcialmente verificada."
          : "Información pendiente de verificación."
    };
  },

  // ESTADÍSTICAS GENERALES
  getHeroStatistics() {
    const heroes = this.getHeroes();

    return {
      total: heroes.length,
      verified: this.getVerifiedHeroes().length,
      partial: this.getPartialHeroes().length,
      pending: heroes.filter(hero =>
        !this.validStatuses.includes(hero.verification?.status) ||
        hero.verification?.status === "pending"
      ).length
    };
  },

  // CONSULTAR SINERGIAS
  getSynergies() {
    return Array.isArray(window.TUPA_SYNERGIES)
      ? window.TUPA_SYNERGIES
      : [];
  },

  // CONSULTAR COUNTERS
  getCounters() {
    return Array.isArray(window.TUPA_COUNTERS)
      ? window.TUPA_COUNTERS
      : [];
  },

  // CONSULTAR FUENTES
  getSources() {
    return Array.isArray(window.TUPA_SOURCES)
      ? window.TUPA_SOURCES
      : [];
  }

};
