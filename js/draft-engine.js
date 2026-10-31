
/*
  TUPA MLBB — DRAFT ENGINE

  Motor central del Draft Lab.

  Responsabilidades:
  - Consultar las bases de datos.
  - Clasificar el estado de verificación.
  - Consultar héroes por identificador.
  - Proporcionar información a los demás módulos.
*/

window.TUPA_DRAFT_ENGINE = {

  // ESTADOS PERMITIDOS
  validStatuses: ["verified", "partial", "pending"],

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
      ? window.TUPA_HEROES
      : [];
  },

  // BUSCAR UN HÉROE POR IDENTIFICADOR
  getHeroById(id) {
    return this.getHeroes().find(hero => hero.id === id) || null;
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

  // HÉROES VERIFICADOS
  getVerifiedHeroes() {
    return this.getHeroesByStatus("verified");
  },

  // HÉROES PARCIALMENTE VERIFICADOS
  getPartialHeroes() {
    return this.getHeroesByStatus("partial");
  },

  // HÉROES PENDIENTES
  getPendingHeroes() {
    return this.getHeroesByStatus("pending");
  },

  // CONSULTAR EL ESTADO DE UN HÉROE
  getHeroVerification(id) {
    const hero = this.getHeroById(id);

    if (!hero) {
      return {
        found: false,
        status: "unknown",
        message: "El héroe no está registrado en la base de datos."
      };
    }

    const status = hero.verification?.status || "pending";

    return {
      found: true,
      heroId: hero.id,
      heroName: hero.name,
      status,
      sources: hero.verification?.sources || [],
      lastReviewed: hero.verification?.lastReviewed || null,
      message: status === "verified"
        ? "Información verificada."
        : status === "partial"
          ? "Información parcialmente verificada."
          : "Información pendiente de verificación."
    };
  },

  // RESUMEN GENERAL DE LA BASE DE HÉROES
  getHeroStatistics() {
    const heroes = this.getHeroes();

    return {
      total: heroes.length,
      verified: this.getVerifiedHeroes().length,
      partial: this.getPartialHeroes().length,
      pending: this.getPendingHeroes().length
    };
  },

  // CONSULTAR LAS BASES ESTRATÉGICAS
  getSynergies() {
    return Array.isArray(window.TUPA_SYNERGIES)
      ? window.TUPA_SYNERGIES
      : [];
  },

  getCounters() {
    return Array.isArray(window.TUPA_COUNTERS)
      ? window.TUPA_COUNTERS
      : [];
  },

  getSources() {
    return Array.isArray(window.TUPA_SOURCES)
      ? window.TUPA_SOURCES
      : [];
  }

};
