
/*
  TUPA MLBB — DRAFT RECOMMENDER

  Gestiona los candidatos disponibles y su evidencia.
  No inventa compatibilidades, counters ni ventajas.
*/

window.TUPA_DRAFT_RECOMMENDER = {

  validStatuses: ["verified", "partial", "pending"],

  normalizeId(value) {
    if (!value || typeof value !== "string") return null;

    return value
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "");
  },

  getAvailableCandidates(selectedHeroIds = [], options = {}) {
    const engine = window.TUPA_DRAFT_ENGINE;

    if (!engine || typeof engine.getHeroes !== "function") {
      return [];
    }

    const selectedIds = new Set(
      (Array.isArray(selectedHeroIds) ? selectedHeroIds : [])
        .map(value => this.normalizeId(value))
        .filter(Boolean)
    );

    const allowedStatuses = options.includePartial === false
      ? ["verified"]
      : ["verified", "partial"];

    return engine.getHeroes().filter(hero => {
      const status = this.getValidStatus(hero);

      return (
        allowedStatuses.includes(status) &&
        !selectedIds.has(this.normalizeId(hero.id))
      );
    });
  },

  getValidStatus(hero) {
    const status = hero?.verification?.status;

    return this.validStatuses.includes(status)
      ? status
      : "pending";
  },

  getRecommendationStatus() {
    const engine = window.TUPA_DRAFT_ENGINE;

    if (!engine || typeof engine.getHeroes !== "function") {
      return {
        ready: false,
        message: "El motor de Draft no está cargado.",
        verifiedCount: 0,
        partialCount: 0,
        pendingCount: 0,
        availableHeroes: 0
      };
    }

    const heroes = engine.getHeroes();

    const verified = heroes.filter(
      hero => this.getValidStatus(hero) === "verified"
    );

    const partial = heroes.filter(
      hero => this.getValidStatus(hero) === "partial"
    );

    const pending = heroes.filter(
      hero => this.getValidStatus(hero) === "pending"
    );

    const candidates = [...verified, ...partial];

    return {
      ready: candidates.length > 0,

      message: candidates.length > 0
        ? "Hay candidatos disponibles. Revisa su nivel de verificación."
        : "Todavía no hay héroes verificados o parcialmente verificados.",

      verifiedCount: verified.length,
      partialCount: partial.length,
      pendingCount: pending.length,
      availableHeroes: candidates.length
    };
  },

  getCandidateEvidence(hero) {
    if (!hero) return null;

    const status = this.getValidStatus(hero);

    return {
      heroId: hero.id || null,
      heroName: hero.name || "Héroe sin nombre",
      verificationStatus: status,

      sources: Array.isArray(hero.verification?.sources)
        ? hero.verification.sources
        : [],

      lastReviewed: hero.verification?.lastReviewed || null,

      canBeRecommended:
        status === "verified" || status === "partial",

      requiresWarning: status === "partial",

      message: status === "verified"
        ? "Información verificada."
        : status === "partial"
          ? "Información parcial. Algunas características todavía no están verificadas."
          : "Información pendiente. No utilizar como recomendación."
    };
  }

};
