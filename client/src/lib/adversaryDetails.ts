// Adversary Detail Data — Spirit Island Companion
// Design: Living Island / Organic Nature UI
// All 8 adversaries with level-by-level escalation rules, loss conditions, and setup modifications

export interface AdversaryLevel {
  level: number;
  difficulty: number;
  fearCards: string; // e.g. "10 (3/4/3)"
  name: string;
  effect: string;
  setupChanges?: string;
  deckChanges?: string;
}

export interface AdversaryDetail {
  id: string;
  name: string;
  expansion: string;
  baseDifficulty: number;
  lossCondition: {
    name: string;
    description: string;
  } | null;
  escalation: {
    name: string;
    description: string;
  };
  flavor: string;
  strategy: string;
  levels: AdversaryLevel[];
}

export const ADVERSARY_DETAILS: AdversaryDetail[] = [
  {
    id: "brandenburg-prussia",
    name: "Brandenburg-Prussia",
    expansion: "Base Game",
    baseDifficulty: 1,
    lossCondition: null,
    escalation: {
      name: "Land Rush",
      description: "On each board with Invader Cards, add 1 Town to a land without Town."
    },
    flavor: "The Kingdom of Brandenburg-Prussia brings an aggressive, fast-expanding colonial force. Their efficient administration compresses the Invader Deck timeline, giving Spirits less time to respond.",
    strategy: "Brandenburg-Prussia accelerates the game by removing Invader Deck cards and inserting Stage III cards early. Focus on early aggression to prevent their compressed timeline from overwhelming you. Their lack of an additional loss condition makes them more straightforward but no less dangerous.",
    levels: [
      {
        level: 1,
        difficulty: 2,
        fearCards: "9 (3/3/3)",
        name: "Fast Start",
        effect: "During Setup, on each board add 1 Town to land #3.",
        setupChanges: "Add 1 Town to land #3 on each board."
      },
      {
        level: 2,
        difficulty: 4,
        fearCards: "9 (3/3/3)",
        name: "Surge of Colonists",
        effect: "When making the Invader Deck, put 1 of the Stage III cards between Stage I and Stage II.",
        deckChanges: "New Deck Order: 111-3-2222-3333"
      },
      {
        level: 3,
        difficulty: 6,
        fearCards: "10 (3/4/3)",
        name: "Efficient",
        effect: "When making the Invader Deck, remove an additional Stage I card.",
        deckChanges: "New Deck Order: 11-3-2222-3333"
      },
      {
        level: 4,
        difficulty: 7,
        fearCards: "11 (4/4/3)",
        name: "Aggressive Timetable",
        effect: "When making the Invader Deck, remove an additional Stage II card.",
        deckChanges: "New Deck Order: 11-3-222-3333"
      },
      {
        level: 5,
        difficulty: 9,
        fearCards: "11 (4/4/3)",
        name: "Ruthlessly Efficient",
        effect: "When making the Invader Deck, remove an additional Stage I card.",
        deckChanges: "New Deck Order: 1-3-222-3333"
      },
      {
        level: 6,
        difficulty: 10,
        fearCards: "12 (4/4/4)",
        name: "Terrifyingly Efficient",
        effect: "When making the Invader Deck, remove all Stage I cards.",
        deckChanges: "New Deck Order: 3-222-3333"
      }
    ]
  },
  {
    id: "england",
    name: "England",
    expansion: "Base Game",
    baseDifficulty: 1,
    lossCondition: {
      name: "Proud & Mighty Capital",
      description: "If 7 or more Towns/Cities are ever in a single land, the Invaders win."
    },
    escalation: {
      name: "Building Boom",
      description: "On each board with Invader Cards, Build in the land with the most Towns/Cities."
    },
    flavor: "The Kingdom of England brings relentless expansion and immigration. Their colonies grow rapidly, and at higher levels they gain an extra Build action that can overwhelm the island with sheer numbers.",
    strategy: "England's High Immigration mechanic at Level 3+ adds an extra Build action each turn, dramatically increasing Invader pressure. Watch out for the 'Proud & Mighty Capital' loss condition — keep Invader counts spread out. Town health increases at Level 5 make removal harder.",
    levels: [
      {
        level: 1,
        difficulty: 3,
        fearCards: "10 (3/4/3)",
        name: "Indentured Servants Earn Land",
        effect: "Invader Build Cards affect matching lands without Invaders if they are adjacent to at least 2 Towns/Cities."
      },
      {
        level: 2,
        difficulty: 4,
        fearCards: "11 (4/4/3)",
        name: "Criminals and Malcontents",
        effect: "During Setup, on each board add 1 City to land #1 and 1 Town to land #2.",
        setupChanges: "Add 1 City to land #1 and 1 Town to land #2 on each board."
      },
      {
        level: 3,
        difficulty: 6,
        fearCards: "13 (4/5/4)",
        name: "High Immigration (I)",
        effect: "Put the \"High Immigration\" tile on the Invader board, to the left of \"Ravage\". The Invaders take this Build action each Invader phase before Ravaging. Cards slide left from Ravage to it, and from it to the discard pile. Remove the tile when a Stage II card slides onto it, putting that card in the discard.",
        setupChanges: "Place the High Immigration tile on the Invader board."
      },
      {
        level: 4,
        difficulty: 7,
        fearCards: "14 (4/5/5)",
        name: "High Immigration (full)",
        effect: "The extra Build tile remains out the entire game."
      },
      {
        level: 5,
        difficulty: 9,
        fearCards: "14 (4/5/5)",
        name: "Local Autonomy",
        effect: "Towns have +1 Health."
      },
      {
        level: 6,
        difficulty: 11,
        fearCards: "13 (4/5/4)",
        name: "Independent Resolve",
        effect: "During Setup, add an additional Fear to the Fear Pool per player in the game. During any Invader Phase where you resolve no Fear Cards, perform the Build from High Immigration twice.",
        setupChanges: "Add 1 extra Fear per player to the Fear Pool."
      }
    ]
  },
  {
    id: "sweden",
    name: "Sweden",
    expansion: "Base Game",
    baseDifficulty: 1,
    lossCondition: null,
    escalation: {
      name: "Swayed by the Invaders",
      description: "After Invaders Explore into each land this Phase, if that land has at least as many Invaders as Dahan, replace 1 Dahan with 1 Town."
    },
    flavor: "The Kingdom of Sweden brings heavy industry and environmental destruction. Their mining operations cause extra Blight, and their advanced weaponry makes Invaders deal more damage.",
    strategy: "Sweden's escalation converts Dahan into Towns, weakening your counterattack potential. At Level 3, increased Invader damage (Towns deal 3, Cities deal 5) makes Ravages devastating. Protect your Dahan and focus on preventing Blight cascades from their mining effects.",
    levels: [
      {
        level: 1,
        difficulty: 2,
        fearCards: "9 (3/3/3)",
        name: "Heavy Mining",
        effect: "If the Invaders do at least 6 Damage to the land during Ravage, add an extra Blight. The additional Blight does not destroy Presence or cause cascades."
      },
      {
        level: 2,
        difficulty: 3,
        fearCards: "10 (3/4/3)",
        name: "Population Pressure at Home",
        effect: "During Setup, on each board add 1 Town to land #4. On boards where land #4 starts with Blight, put that Town in land #5 instead.",
        setupChanges: "Add 1 Town to land #4 (or #5 if #4 has Blight) on each board."
      },
      {
        level: 3,
        difficulty: 5,
        fearCards: "10 (3/4/3)",
        name: "Fine Steel for Tools and Guns",
        effect: "Towns deal 3 Damage. Cities deal 5 Damage."
      },
      {
        level: 4,
        difficulty: 6,
        fearCards: "11 (3/4/4)",
        name: "Royal Backing",
        effect: "During Setup, after adding all other Invaders, Accelerate the Invader Deck. On each board, add 1 Town to the land of that terrain with the fewest Invaders.",
        setupChanges: "Accelerate the Invader Deck. Add 1 Town per board to the land of the accelerated terrain with fewest Invaders."
      },
      {
        level: 5,
        difficulty: 7,
        fearCards: "12 (4/4/4)",
        name: "Mining Rush",
        effect: "When Ravaging adds at least 1 Blight to a land, also add 1 Town to an adjacent land without Town/City. Cascading Blight does not cause this effect."
      },
      {
        level: 6,
        difficulty: 8,
        fearCards: "13 (4/4/5)",
        name: "Prospecting Outpost",
        effect: "During setup, on each board add 1 Town and 1 Blight to land #8. The Blight comes from the box, not the Blight Card.",
        setupChanges: "Add 1 Town and 1 Blight (from box) to land #8 on each board."
      }
    ]
  },
  {
    id: "france",
    name: "France (Plantation Colony)",
    expansion: "Branch & Claw",
    baseDifficulty: 2,
    lossCondition: {
      name: "Sprawling Plantations",
      description: "Before Setup, return all but 7 Towns per player to the box. Invaders win if you ever cannot place a Town."
    },
    escalation: {
      name: "Demand for New Cash Crops",
      description: "After Exploring, on each board, pick a land of the shown terrain. If it has Towns/Cities, add 1 Town. Otherwise, add 1 Explorer."
    },
    flavor: "France establishes sprawling plantation colonies that consume the land. Their limited Town supply creates a unique loss condition — if they run out of Towns to place, you lose. Their Explorers are persistent and hard to fully remove.",
    strategy: "France's limited Town pool is both their strength and weakness. Track the Town supply carefully — you lose if it runs out. At higher levels, Explorers become very persistent (never removed by Fear) and plantations spread through Triangle Trade. Focus on destroying Towns to return them to the supply.",
    levels: [
      {
        level: 1,
        difficulty: 3,
        fearCards: "9 (3/3/3)",
        name: "Frontier Explorers",
        effect: "Except during Setup: After Invaders successfully Explore into a land which had no Towns/Cities, add 1 Explorer there."
      },
      {
        level: 2,
        difficulty: 5,
        fearCards: "10 (3/4/3)",
        name: "Slave Labor",
        effect: "During Setup, put the \"Slave Rebellion\" event under the top 3 cards of the Event Deck. After Invaders Build in a land with 2 Towns or more, replace all but 1 Town there with an equal number of Cities.",
        setupChanges: "Place Slave Rebellion event under top 3 Event Deck cards."
      },
      {
        level: 3,
        difficulty: 7,
        fearCards: "11 (4/4/3)",
        name: "Early Plantation",
        effect: "During Setup, on each board add 1 Town to the highest-numbered land without Towns. Add 1 Blight to land #1.",
        setupChanges: "Add 1 Town to highest-numbered land without Towns. Add 1 Blight to land #1 on each board."
      },
      {
        level: 4,
        difficulty: 8,
        fearCards: "12 (4/4/4)",
        name: "Triangle Trade",
        effect: "Whenever Invaders Build a Coastal City, add 1 Town to the adjacent land with the fewest Towns."
      },
      {
        level: 5,
        difficulty: 9,
        fearCards: "13 (4/5/4)",
        name: "Slow-Healing Ecosystem",
        effect: "When you remove Blight from the board, put it here instead of onto the Blight Card. As soon as you have 3 Blight per player here, move it all back to the Blight Card."
      },
      {
        level: 6,
        difficulty: 10,
        fearCards: "14 (4/5/5)",
        name: "Persistent Explorers",
        effect: "After resolving an Explore Card, on each board add 1 Explorer to a land without any. Fear Card effects never remove Explorers. If one would, you may instead Push that Explorer."
      }
    ]
  },
  {
    id: "habsburg",
    name: "Habsburg Monarchy (Livestock Colony)",
    expansion: "Jagged Earth",
    baseDifficulty: 2,
    lossCondition: {
      name: "Irreparable Damage",
      description: "Track how many Blight come off the Blight Card during Ravages that do 8+ Damage to the land. If that number ever exceeds the number of players, the Invaders win."
    },
    escalation: {
      name: "Seek Prime Territory",
      description: "After the Explore Step: On each board with 4 or fewer Blight, add 1 Explorer to a land without Town/City. On each board with 2 or fewer Blight, do so again."
    },
    flavor: "The Habsburg Monarchy brings livestock herding that spreads across the island's interior. Their herds are more rural than urban, preferring Towns over Cities, and their migratory patterns make them hard to contain.",
    strategy: "Habsburg's unique mechanic replaces inland City builds with double Town builds, creating wide spread. Their 'Irreparable Damage' loss condition punishes heavy Ravages (8+ damage). At Level 4, Towns without Blight become Durable (+2 Health). Focus on controlled Blight placement and preventing massive Ravages.",
    levels: [
      {
        level: 1,
        difficulty: 3,
        fearCards: "10 (3/4/3)",
        name: "Migratory Herders",
        effect: "After the normal Build Step: In each land matching a Build Card, Gather 1 Explorer from a land not matching a Build Card. (In board/land order.)"
      },
      {
        level: 2,
        difficulty: 5,
        fearCards: "11 (4/5/2)",
        name: "More Rural Than Urban",
        effect: "During Setup, on each board, add 1 Town to land #2 and 1 Town to the highest-numbered land without Setup symbols. During Play, when Invaders would Build 1 City in an Inland land, they instead Build 2 Towns.",
        setupChanges: "Add 1 Town to land #2 and 1 Town to highest-numbered land without Setup symbols on each board."
      },
      {
        level: 3,
        difficulty: 6,
        fearCards: "12 (4/5/3)",
        name: "Fast Spread",
        effect: "When making the Invader Deck, remove 1 additional Stage I Card.",
        deckChanges: "New Deck Order: 11-2222-33333"
      },
      {
        level: 4,
        difficulty: 8,
        fearCards: "12 (4/5/3)",
        name: "Herds Thrive in Verdant Lands",
        effect: "Towns in lands without Blight are Durable: they have +2 Health, and \"Destroy Town\" effects instead deal 2 Damage (to those Towns only) per Town they could Destroy. (\"Destroy all Towns\" works normally.)"
      },
      {
        level: 5,
        difficulty: 9,
        fearCards: "13 (4/6/3)",
        name: "Wave of Immigration",
        effect: "Before the initial Explore, put the Habsburg Reminder Card under the top 5 Invader Cards. When Revealed, on each board, add 1 City to a Coastal land without City and 1 Town to the 3 Inland lands with the fewest Towns.",
        setupChanges: "Place Habsburg Reminder Card under top 5 Invader Cards."
      },
      {
        level: 6,
        difficulty: 10,
        fearCards: "14 (5/6/3)",
        name: "Far-Flung Herds",
        effect: "Ravages do +2 Damage (total) if any adjacent lands have Towns. (This does not cause lands without Invaders to Ravage.)"
      }
    ]
  },
  {
    id: "russia",
    name: "Russia",
    expansion: "Jagged Earth",
    baseDifficulty: 1,
    lossCondition: {
      name: "Hunters Swarm the Island",
      description: "Put Destroyed Beasts on this panel. If there are ever more Beasts on this panel than on the island, the Invaders win."
    },
    escalation: {
      name: "Stalk the Predators",
      description: "On each board: Add 2 Explorers (total) among lands with Beasts. If you can't, instead add 2 Explorers among lands with Beasts on a different board."
    },
    flavor: "Russia brings fur trappers and hunters who specifically target the island's wildlife. Beasts are destroyed during Ravages, and if too many Beasts are lost, the Invaders win. Their hunters are resilient and hard to fully eliminate.",
    strategy: "Russia's unique mechanic targets Beasts — they're destroyed during Ravages and tracked on the adversary panel. Protect your Beasts at all costs. At Level 2, the first Destroy on Explorers instead Pushes one, making them slippery. Level 3 makes lands with 3+ Explorers Ravage regardless of terrain. Use Beast-generating powers and keep Explorer counts low.",
    levels: [
      {
        level: 1,
        difficulty: 3,
        fearCards: "10 (3/3/4)",
        name: "Hunters Bring Home Shell and Hide",
        effect: "During Setup, on each board, add 1 Explorer and 1 Beasts to the highest-numbered land without Town/City. During Play, Explorers do +1 Damage. When Ravage adds Blight to a land (including cascades), Destroy 1 Beasts in that land.",
        setupChanges: "Add 1 Explorer and 1 Beasts to highest-numbered land without Town/City on each board."
      },
      {
        level: 2,
        difficulty: 4,
        fearCards: "11 (4/3/4)",
        name: "A Sense for Impending Disaster",
        effect: "The first time each Action would Destroy Explorers: If possible, 1 of those is instead Pushed; 1 Fear when you do so."
      },
      {
        level: 3,
        difficulty: 6,
        fearCards: "11 (4/4/3)",
        name: "Competition Among Hunters",
        effect: "Ravage Cards also match lands with 3 or more Explorers. (If the land already matched the Ravage Card, it still Ravages just once.)"
      },
      {
        level: 4,
        difficulty: 7,
        fearCards: "12 (4/4/4)",
        name: "Accelerated Exploitation",
        effect: "When making the Invader Deck, put 1 Stage III Card after each Stage II Card.",
        deckChanges: "New Deck Order: 111-2-3-2-3-2-3-2-33"
      },
      {
        level: 5,
        difficulty: 9,
        fearCards: "13 (4/5/4)",
        name: "Entrench in the Face of Fear",
        effect: "Put an unused Stage II Invader Card under the top 3 Fear Cards, and an unused Stage III Card under the top 7 Fear Cards. When one is revealed, immediately place it in the Build space (face-up).",
        setupChanges: "Place Invader Cards under Fear Cards as described."
      },
      {
        level: 6,
        difficulty: 11,
        fearCards: "14 (5/5/4)",
        name: "Pressure for Fast Profit",
        effect: "After the Ravage Step of turn 2+, on each board where it added no Blight: In the land with the most Explorers (min. 1), add 1 Town and 1 Explorer."
      }
    ]
  },
  {
    id: "scotland",
    name: "Scotland",
    expansion: "Promo Pack 2",
    baseDifficulty: 1,
    lossCondition: {
      name: "Trade Hub",
      description: "If the number of Coastal lands with Town/City is ever greater than (2 × number of boards), the Invaders win."
    },
    escalation: {
      name: "Ports Sprawl Outward",
      description: "On the single board with the most Coastal Towns/Cities, add 1 Town to the N lands with the fewest Town/City (N = number of players)."
    },
    flavor: "Scotland focuses on coastal trade and port development. Their unique mechanic changes Coastal Explores to directly place Towns instead of Explorers, creating rapid coastal buildup that can trigger their Trade Hub loss condition.",
    strategy: "Scotland's coastal focus means you must aggressively defend the coastline. Their Trading Port mechanic (Towns instead of Explorers on coast) creates rapid buildup. The Trade Hub loss condition triggers when too many coastal lands have Invaders. Prioritize coastal defense and use inland as a buffer zone.",
    levels: [
      {
        level: 1,
        difficulty: 3,
        fearCards: "10 (3/4/3)",
        name: "Trading Port",
        effect: "After Setup, in Coastal lands, Explore Cards add 1 Town instead of 1 Explorer. \"Coastal Lands\" Invader cards do this for maximum 2 lands per board."
      },
      {
        level: 2,
        difficulty: 4,
        fearCards: "11 (4/4/3)",
        name: "Seize Opportunity",
        effect: "During Setup, add 1 Town to land #2. Place \"Coastal Lands\" as the 3rd Stage II card, and move the two Stage II Cards above it up by one.",
        setupChanges: "Add 1 Town to land #2. Rearrange Invader Deck with Coastal Lands card.",
        deckChanges: "New Deck Order: 11-22-1-C2-33333 (C = Coastal Lands)"
      },
      {
        level: 3,
        difficulty: 6,
        fearCards: "13 (4/5/4)",
        name: "Chart the Coastline",
        effect: "In Coastal lands, Build Cards affect lands without Invaders, so long as there is an adjacent Town/City."
      },
      {
        level: 4,
        difficulty: 7,
        fearCards: "14 (5/5/4)",
        name: "Ambition of a Minor Nation",
        effect: "During Setup, replace the bottom Stage I Card with the bottom Stage III Card.",
        deckChanges: "New Deck Order: 11-22-3-C2-3333"
      },
      {
        level: 5,
        difficulty: 8,
        fearCards: "15 (5/6/4)",
        name: "Runoff and Bilgewater",
        effect: "After a Ravage Action adds Blight to a Coastal Land, add 1 Blight to that board's Ocean (without cascading). Treat the Ocean as a Coastal Wetland for this rule and for Blight removal/movement."
      },
      {
        level: 6,
        difficulty: 10,
        fearCards: "16 (6/6/4)",
        name: "Exports Fuel Inward Growth",
        effect: "After the Ravage step, add 1 Town to each Inland land that matches a Ravage card and is within 1 of Town/City."
      }
    ]
  },
  {
    id: "habsburg-mining",
    name: "Habsburg Mining Expedition",
    expansion: "Nature Incarnate",
    baseDifficulty: 1,
    lossCondition: {
      name: "Land Stripped Bare",
      description: "At the end of the Ravage Phase, the Invaders win if any land has at least 8 total Invaders/Blight (combined)."
    },
    escalation: {
      name: "Mining Tunnels",
      description: "After Advancing Invader Cards: On each board, Explore in 2 lands whose terrains don't match a Ravage or Build Card (no source required)."
    },
    flavor: "The Habsburg Mining Expedition brings industrial-scale resource extraction. Their unique Mining mechanic transforms lands with 3+ Invaders into Mining lands where Dahan are treated as resources and Builds become Ravages.",
    strategy: "Habsburg Mining's core mechanic turns lands with 3+ Invaders into Mining lands where Build actions become Ravage actions — devastating if unchecked. The 'Land Stripped Bare' loss condition (8+ Invaders/Blight in one land) means you must prevent concentration. Keep Invader counts below 3 per land to avoid Mining activation.",
    levels: [
      {
        level: 1,
        difficulty: 3,
        fearCards: "9 (3/3/3)",
        name: "Ceaseless Mining",
        effect: "When Blight added by a Ravage Action would cascade, instead Upgrade 1 Explorer/Town (before Dahan counterattack). Lands with 3 or more Invaders are Mining lands. In Mining lands: Dahan and modifiers to Dahan affect Ravage Actions as though they were Build Actions. During the Build Step, Build Cards cause Ravage Actions (instead of Build Actions)."
      },
      {
        level: 2,
        difficulty: 4,
        fearCards: "10 (3/3/4)",
        name: "Miners Come From Far and Wide",
        effect: "During Setup: Add 1 Explorer in each land with no Dahan. Add 1 Town and 1 Dahan in the highest-numbered land with a Dahan Setup symbol.",
        setupChanges: "Add 1 Explorer in each land with no Dahan. Add 1 Town and 1 Dahan to highest-numbered Dahan land."
      },
      {
        level: 3,
        difficulty: 5,
        fearCards: "11 (3/4/4)",
        name: "Mining Boom (I)",
        effect: "After the Build Step, on each board: Choose a land with Town. Upgrade 1 Explorer there."
      },
      {
        level: 4,
        difficulty: 7,
        fearCards: "12 (4/4/4)",
        name: "Untapped Salt Deposits",
        effect: "During Setup: Remove the Stage II 'Coastal Lands' card before randomly choosing Stage II cards. Place the 'Salt Deposits' card in place of the 2nd Stage II card.",
        setupChanges: "Remove Coastal Lands Stage II card. Place Salt Deposits card.",
        deckChanges: "New Deck Order: 111-2S22-33333 (S = Salt Deposits)"
      },
      {
        level: 5,
        difficulty: 9,
        fearCards: "13 (4/5/4)",
        name: "Mining Boom (II)",
        effect: "Instead of Mining Boom (I), after the Build Step, on each board: Choose a land with Town. Build there, then Upgrade 1 Town. (Build normally in a Mining land.)"
      },
      {
        level: 6,
        difficulty: 10,
        fearCards: "13 (4/5/4)",
        name: "The Empire Ascendant",
        effect: "During Setup and During the Explore Step: On boards with 3 or fewer Blight: Add +1 Explorer in each land successfully explored. (Max. 2 lands per board per Explore Card.)"
      }
    ]
  }
];

// Helper: get color for difficulty
export function getDifficultyColor(diff: number): string {
  if (diff <= 2) return "#4ade80"; // green
  if (diff <= 4) return "#a3e635"; // lime
  if (diff <= 6) return "#facc15"; // yellow
  if (diff <= 8) return "#fb923c"; // orange
  if (diff <= 10) return "#f87171"; // red
  return "#dc2626"; // dark red
}

// Helper: get expansion color
export function getExpansionColor(expansion: string): string {
  switch (expansion) {
    case "Base Game": return "#94a3b8";
    case "Branch & Claw": return "#4ade80";
    case "Jagged Earth": return "#f59e0b";
    case "Promo Pack 2": return "#a78bfa";
    case "Nature Incarnate": return "#2dd4bf";
    default: return "#94a3b8";
  }
}
