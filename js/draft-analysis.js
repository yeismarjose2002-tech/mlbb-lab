/*
  TUPA MLBB — DRAFT ANALYSIS

  Analiza la composición de los equipos.
  Solo utiliza información disponible y verificada.
*/

window.TUPA_DRAFT_ANALYSIS = {

  analyzeTeam(heroIds = []) {
    const heroes = window.TUPA_DRAFT_ENGINE?.getHeroes() || [];

    const selectedHeroes = heroIds
      .map(id => heroes.find(hero => hero.id === id))
      .filter(Boolean);

    const verifiedHeroes = selectedHeroes.filter(
      hero => hero.verification?.status === "verified"
    );

    const pendingHeroes = selectedHeroes.filter(
      hero => hero.verification?.status !== "verified"
    );

    return {
      totalHeroes: selectedHeroes.length,
      verifiedCount: verifiedHeroes.length,
      pendingCount: pendingHeroes.length,
      heroes: selectedHeroes,
      status: pendingHeroes.length > 0
        ? "partial"
        : "verified"
    };
  },

  compareTeams(blueTeam = [], redTeam = []) {
    return {
      blue: this.analyzeTeam(blueTeam),
      red: this.analyzeTeam(redTeam),
      message: "Análisis inicial de composiciones."
    };
  }

};
