
/*
  TUPA MLBB — HERO DATABASE

  Catálogo central de héroes.
  Los datos deben tener fuentes y fecha de revisión.

  Estados:
  - verified: información verificada.
  - partial: información parcialmente verificada.
  - pending: información pendiente.
*/

window.TUPA_HEROES = [

  {
    id: "aamon",
    name: "Aamon",

    roles: {
      primary: "jungler",
      secondary: []
    },

    damage: {
      physical: false,
      magical: true
    },

    attributes: {
      mobility: null,
      durability: null,
      crowdControl: null,
      initiation: null
    },

    strengths: [
      "Daño mágico explosivo contra objetivos vulnerables.",
      "Puede utilizar camuflaje para aproximarse o reposicionarse.",
      "Su definitiva aprovecha la pérdida de vida del objetivo.",
      "Puede atacar la retaguardia cuando encuentra una oportunidad."
    ],

    weaknesses: [
      "Depende de encontrar oportunidades para entrar en combate.",
      "Puede tener dificultades contra héroes resistentes.",
      "El control de masas puede interrumpir su entrada o retirada.",
      "No es el iniciador principal ideal para todas las composiciones."
    ],

    synergies: [],

    counters: [],

    verification: {
      status: "partial",

      sources: [
        "mlbb-io-aamon",
        "mlbb-intel-aamon",
        "metammo-aamon"
      ],

      lastReviewed: "2026-10-30"
    }
  }

];
