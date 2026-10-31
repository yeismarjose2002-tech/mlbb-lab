/*
  TUPA MLBB — DRAFT ENGINE

  Motor central del sistema de Draft Lab.
  Su función inicial es comprobar y organizar los datos.
*/

window.TUPA_DRAFT_ENGINE = {

  getDatabaseStatus() {
    return {
      heroes: Array.isArray(window.TUPA_HEROES),
      sources: Array.isArray(window.TUPA_SOURCES),
      synergies: Array.isArray(window.TUPA_SYNERGIES),
      counters: Array.isArray(window.TUPA_COUNTERS)
    };
  },

  getHeroes() {
    return window.TUPA_HEROES || [];
  },

  getVerifiedHeroes() {
    return this.getHeroes().filter(hero =>
      hero.verification?.status === "verified"
    );
  },

  getPendingHeroes() {
    return this.getHeroes().filter(hero =>
      hero.verification?.status === "pending"
    );
  }

};
