/*
  TUPA MLBB — DRAFT RECOMMENDER

  Prepara candidatos para las recomendaciones del Draft Lab.
  No inventa ventajas ni utiliza información sin verificar.
*/

window.TUPA_DRAFT_RECOMMENDER = {

  getAvailableCandidates(selectedHeroIds = []) {
    const heroes = window.TUPA_DRAFT_ENGINE?.getVerifiedHeroes() || [];

    return heroes.filter(hero =>
      !selectedHeroIds.includes(hero.id)
    );
  },

  getRecommendationStatus() {
    const engine = window.TUPA_DRAFT_ENGINE;

    if (!engine) {
      return {
        ready: false,
        message: "El motor de Draft no está cargado."
      };
    }

    const candidates = engine.getVerifiedHeroes();

    if (candidates.length === 0) {
      return {
        ready: false,
        message: "Todavía no hay héroes verificados para recomendar."
      };
    }

    return {
      ready: true,
      message: "Hay héroes verificados disponibles.",
      availableHeroes: candidates.length
    };
  }

};
