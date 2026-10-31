
/*
  TUPA MLBB — DRAFT RECOMMENDER

  Prepara candidatos para las recomendaciones del Draft Lab.

  Estados:
  - verified: información verificada.
  - partial: información parcialmente verificada.
  - pending: información pendiente.

  Los héroes pendientes quedan excluidos.
  Los héroes parciales pueden participar, pero deben
  identificarse como tales y no generar afirmaciones
  basadas en datos que todavía no están verificados.
*/

window.TUPA_DRAFT_RECOMMENDER = {

  getAvailableCandidates(selectedHeroIds = [], options = {}) {
    const engine = window.TUPA_DRAFT_ENGINE;

    if (!engine) return [];

    const heroes = engine.getHeroes();

    const allowedStatuses = options.includePartial === false
      ? ["verified"]
      : ["verified", "partial"];

    return heroes.filter(hero => {
      const status = hero.verification?.status;

      return (
        allowedStatuses.includes(status) &&
        !selectedHeroIds.includes(hero.id)
      );
    });
  },

  getRecommendationStatus() {
    const engine = window.TUPA_DRAFT_ENGINE;

    if (!engine) {
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
      hero => hero.verification?.status === "verified"
    );

    const partial = heroes.filter(
      hero => hero.verification?.status === "partial"
    );

    const pending = heroes.filter(
      hero => hero.verification?.status === "pending"
    );

    const candidates = [...verified, ...partial];

    if (candidates.length === 0) {
      return {
        ready: false,
        message: "Todavía no hay héroes verificados o parcialmente verificados.",
        verifiedCount: verified.length,
        partialCount: partial.length,
        pendingCount: pending.length,
        availableHeroes: 0
      };
    }

    return {
      ready: true,
      message: "Hay candidatos disponibles. Revisa su nivel de verificación.",
      verifiedCount: verified.length,
      partialCount: partial.length,
      pendingCount: pending.length,
      availableHeroes: candidates.length
    };
  },

  getCandidateEvidence(hero) {
    if (!hero) return null;

    const status = hero.verification?.status || "pending";

    return {
      heroId: hero.id,
      heroName: hero.name,
      verificationStatus: status,
      sources: hero.verification?.sources || [],
      lastReviewed: hero.verification?.lastReviewed || null,
      canBeRecommended: status === "verified" || status === "partial",
      requiresWarning: status === "partial",
      message: status === "verified"
        ? "Información verificada."
        : status === "partial"
          ? "Información parcial. Algunas características todavía no están verificadas."
          : "Información pendiente. No utilizar como recomendación."
    };
  }

};
