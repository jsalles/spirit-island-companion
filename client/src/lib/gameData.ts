/*
 * Spirit Island Game Data
 * Design: "Living Island" — Organic Nature UI
 * Complete data for all expansions, spirits, adversaries, scenarios, blight cards, and boards
 */

export type Complexity = 'Low' | 'Moderate' | 'High' | 'Very High';

export interface Spirit {
  name: string;
  complexity: Complexity;
  expansion: string;
  elements: string[];
  description: string;
}

export interface Expansion {
  id: string;
  name: string;
  description: string;
  year: number;
  spirits: string[];
  adversaries: string[];
  scenarios: string[];
  blightCards: string[];
  boards: string[];
  tokens: string[];
}

export interface Adversary {
  name: string;
  expansion: string;
  maxLevel: number;
  description: string;
}

export interface Scenario {
  name: string;
  expansion: string;
  difficulty: string;
  description: string;
}

export interface BlightCard {
  name: string;
  expansion: string;
  blightPerPlayer: number;
}

export interface Board {
  id: string;
  name: string;
  expansion: string;
  thematicName: string;
  avoidPairingWith?: string;
}

export const EXPANSIONS: Expansion[] = [
  {
    id: 'base',
    name: 'Spirit Island',
    description: 'The base game — defend the island from colonizing Invaders with the power of Spirits.',
    year: 2017,
    spirits: [
      "Lightning's Swift Strike", "River Surges in Sunlight", "Shadows Flicker Like Flame",
      "Vital Strength of the Earth", "A Spread of Rampant Green", "Thunderspeaker",
      "Bringer of Dreams and Nightmares", "Ocean's Hungry Grasp"
    ],
    adversaries: ['Brandenburg-Prussia', 'England', 'Sweden'],
    scenarios: ['Blitz', 'Guard the Isle\'s Heart', 'Rituals of Terror', 'Dahan Insurrection'],
    blightCards: ['Downward Spiral', 'Memory Fades to Dust'],
    boards: ['A', 'B', 'C', 'D'],
    tokens: []
  },
  {
    id: 'branch-and-claw',
    name: 'Branch & Claw',
    description: 'Adds Events, Beasts, Wilds, Disease, and Strife tokens that bring the island to life.',
    year: 2017,
    spirits: ["Keeper of the Forbidden Wilds", "Sharp Fangs Behind the Leaves"],
    adversaries: ['France (Plantation Colony)'],
    scenarios: ['Second Wave', 'Powers Long Forgotten', 'Ward the Shores', 'Rituals of the Destroying Flame'],
    blightCards: ['A Pall Upon the Land', 'Aid from Lesser Spirits', 'Back Against the Wall', 'Disintegrating Ecosystem', 'Erosion of Will', 'Promising Farmlands'],
    boards: [],
    tokens: ['Beasts', 'Wilds', 'Disease', 'Strife']
  },
  {
    id: 'jagged-earth',
    name: 'Jagged Earth',
    description: 'The massive expansion with 10 new Spirits, Badlands tokens, and support for up to 6 players.',
    year: 2020,
    spirits: [
      "Grinning Trickster Stirs Up Trouble", "Lure of the Deep Wilderness",
      "Many Minds Move as One", "Shifting Memory of Ages", "Stone's Unyielding Defiance",
      "Volcano Looming High", "Shroud of Silent Mist", "Vengeance as a Burning Plague",
      "Fractured Days Split the Sky", "Starlight Seeks Its Form"
    ],
    adversaries: ['Habsburg Monarchy (Livestock Colony)', 'Russia'],
    scenarios: ['Elemental Invocation', 'Despicable Theft', 'The Great River'],
    blightCards: ['All Things Weaken', 'Invaders Find the Land to Their Liking', 'Power Corrodes the Spirit', 'Strong Earth Shatters Slowly', 'Thriving Communities', 'Unnatural Proliferation', 'Untended Land Crumbles'],
    boards: ['E', 'F'],
    tokens: ['Badlands']
  },
  {
    id: 'feather-and-flame',
    name: 'Feather & Flame',
    description: 'Collects Promo Pack 1 and 2 content with 4 Spirits, 1 Adversary, and new Scenarios.',
    year: 2022,
    spirits: [
      "Heart of the Wildfire", "Serpent Slumbering Beneath the Island",
      "Downpour Drenches the World", "Finder of Paths Unseen"
    ],
    adversaries: ['Scotland'],
    scenarios: ['A Diversity of Spirits', 'Varied Terrains'],
    blightCards: [],
    boards: [],
    tokens: []
  },
  {
    id: 'horizons',
    name: 'Horizons of Spirit Island',
    description: 'A standalone introductory set with 5 new low-complexity Spirits and 2 new boards.',
    year: 2022,
    spirits: [
      "Devouring Teeth Lurk Underfoot", "Eyes Watch from the Trees",
      "Fathomless Mud of the Swamp", "Rising Heat of Stone and Sand", "Sun-Bright Whirlwind"
    ],
    adversaries: [],
    scenarios: [],
    blightCards: [],
    boards: ['G', 'H'],
    tokens: []
  },
  {
    id: 'nature-incarnate',
    name: 'Nature Incarnate',
    description: 'The latest expansion with 8 new Spirits, Vitality tokens, and new Adversary.',
    year: 2023,
    spirits: [
      "Ember-Eyed Behemoth", "Hearth-Vigil", "Towering Roots of the Jungle",
      "Breath of Darkness Down Your Spine", "Relentless Gaze of the Sun",
      "Wandering Voice Keens Delirium", "Wounded Waters Bleeding", "Dances Up Earthquakes"
    ],
    adversaries: ['Habsburg Mining Expedition'],
    scenarios: ['Destiny Unfolds', 'Surges of Colonization'],
    blightCards: ['Attenuated Essence', 'Blight Corrodes the Spirit', 'Burn Brightest Before the End', 'Intensifying Exploitation', 'Shattered Fragments of Power', 'Slow Dissolution of Will', 'The Border of Life and Death', 'Thriving Crops'],
    boards: [],
    tokens: ['Vitality']
  }
];

export const SPIRITS: Spirit[] = [
  // Base Game
  { name: "Lightning's Swift Strike", complexity: 'Low', expansion: 'base', elements: ['Fire', 'Air'], description: 'Offense-focused spirit that deals heavy damage quickly.' },
  { name: "River Surges in Sunlight", complexity: 'Low', expansion: 'base', elements: ['Sun', 'Water'], description: 'Versatile spirit that pushes Invaders and supports Dahan.' },
  { name: "Shadows Flicker Like Flame", complexity: 'Low', expansion: 'base', elements: ['Moon', 'Fire', 'Air'], description: 'Fear-generating spirit that works from the shadows.' },
  { name: "Vital Strength of the Earth", complexity: 'Low', expansion: 'base', elements: ['Sun', 'Earth'], description: 'Defensive powerhouse that protects the land.' },
  { name: "A Spread of Rampant Green", complexity: 'Moderate', expansion: 'base', elements: ['Sun', 'Water', 'Plant'], description: 'Rapidly expands presence across the island.' },
  { name: "Thunderspeaker", complexity: 'Moderate', expansion: 'base', elements: ['Sun', 'Fire', 'Air'], description: 'Commands the Dahan to fight alongside the spirits.' },
  { name: "Bringer of Dreams and Nightmares", complexity: 'High', expansion: 'base', elements: ['Moon', 'Air'], description: 'Generates massive fear without destroying Invaders.' },
  { name: "Ocean's Hungry Grasp", complexity: 'High', expansion: 'base', elements: ['Moon', 'Water', 'Earth'], description: 'Drowns Invaders from coastal lands.' },
  // Branch & Claw
  { name: "Keeper of the Forbidden Wilds", complexity: 'Moderate', expansion: 'branch-and-claw', elements: ['Sun', 'Fire', 'Plant'], description: 'Protects sacred wilds and punishes trespassers.' },
  { name: "Sharp Fangs Behind the Leaves", complexity: 'Moderate', expansion: 'branch-and-claw', elements: ['Moon', 'Plant', 'Animal'], description: 'Commands beasts to hunt Invaders.' },
  // Feather & Flame (Promo 1)
  { name: "Heart of the Wildfire", complexity: 'High', expansion: 'feather-and-flame', elements: ['Fire', 'Plant'], description: 'Spreads devastating fire that harms everything.' },
  { name: "Serpent Slumbering Beneath the Island", complexity: 'High', expansion: 'feather-and-flame', elements: ['Sun', 'Moon', 'Earth', 'Fire'], description: 'Starts weak but awakens to immense power.' },
  // Jagged Earth
  { name: "Grinning Trickster Stirs Up Trouble", complexity: 'Moderate', expansion: 'jagged-earth', elements: ['Sun', 'Fire', 'Air'], description: 'Causes chaos and strife among the Invaders.' },
  { name: "Lure of the Deep Wilderness", complexity: 'Moderate', expansion: 'jagged-earth', elements: ['Moon', 'Plant'], description: 'Draws Invaders into the wilderness to be lost.' },
  { name: "Many Minds Move as One", complexity: 'Moderate', expansion: 'jagged-earth', elements: ['Moon', 'Air', 'Animal'], description: 'Controls beasts across the island as a swarm.' },
  { name: "Shifting Memory of Ages", complexity: 'Moderate', expansion: 'jagged-earth', elements: ['Moon', 'Earth'], description: 'Manipulates elements and adapts to any situation.' },
  { name: "Stone's Unyielding Defiance", complexity: 'Moderate', expansion: 'jagged-earth', elements: ['Sun', 'Earth'], description: 'Immovable defender that absorbs damage.' },
  { name: "Volcano Looming High", complexity: 'Moderate', expansion: 'jagged-earth', elements: ['Sun', 'Fire', 'Earth', 'Air'], description: 'Erupts with devastating power from a single mountain.' },
  { name: "Shroud of Silent Mist", complexity: 'High', expansion: 'jagged-earth', elements: ['Moon', 'Water', 'Air'], description: 'Envelops lands in deadly mist.' },
  { name: "Vengeance as a Burning Plague", complexity: 'High', expansion: 'jagged-earth', elements: ['Fire', 'Earth', 'Animal'], description: 'Spreads disease among the Invaders.' },
  { name: "Fractured Days Split the Sky", complexity: 'Very High', expansion: 'jagged-earth', elements: ['Sun', 'Moon', 'Air'], description: 'Manipulates time itself.' },
  { name: "Starlight Seeks Its Form", complexity: 'Very High', expansion: 'jagged-earth', elements: ['Moon', 'Air', 'Fire', 'Earth'], description: 'Shapeshifter that adapts its strategy each game.' },
  // Feather & Flame (Promo 2)
  { name: "Downpour Drenches the World", complexity: 'High', expansion: 'feather-and-flame', elements: ['Water', 'Earth'], description: 'Floods the land with torrential rain.' },
  { name: "Finder of Paths Unseen", complexity: 'Very High', expansion: 'feather-and-flame', elements: ['Moon', 'Air', 'Water'], description: 'Moves things through hidden pathways.' },
  // Horizons
  { name: "Devouring Teeth Lurk Underfoot", complexity: 'Low', expansion: 'horizons', elements: ['Moon', 'Earth', 'Animal'], description: 'Ambush predator that strikes from below.' },
  { name: "Eyes Watch from the Trees", complexity: 'Low', expansion: 'horizons', elements: ['Moon', 'Air', 'Plant'], description: 'Watchful spirit that generates fear.' },
  { name: "Fathomless Mud of the Swamp", complexity: 'Low', expansion: 'horizons', elements: ['Moon', 'Water', 'Earth'], description: 'Traps Invaders in sticky mud.' },
  { name: "Rising Heat of Stone and Sand", complexity: 'Low', expansion: 'horizons', elements: ['Sun', 'Fire', 'Earth'], description: 'Burns Invaders with desert heat.' },
  { name: "Sun-Bright Whirlwind", complexity: 'Low', expansion: 'horizons', elements: ['Sun', 'Fire', 'Air'], description: 'Fast-moving spirit of wind and light.' },
  // Nature Incarnate
  { name: "Ember-Eyed Behemoth", complexity: 'Moderate', expansion: 'nature-incarnate', elements: ['Sun', 'Fire', 'Earth'], description: 'Massive creature that tramples Invaders.' },
  { name: "Hearth-Vigil", complexity: 'Moderate', expansion: 'nature-incarnate', elements: ['Sun', 'Fire', 'Plant'], description: 'Protective spirit of home and hearth.' },
  { name: "Towering Roots of the Jungle", complexity: 'Moderate', expansion: 'nature-incarnate', elements: ['Sun', 'Water', 'Earth', 'Plant'], description: 'Ancient tree spirit with deep roots.' },
  { name: "Breath of Darkness Down Your Spine", complexity: 'High', expansion: 'nature-incarnate', elements: ['Moon', 'Air'], description: 'Terrifying spirit of primal fear.' },
  { name: "Relentless Gaze of the Sun", complexity: 'High', expansion: 'nature-incarnate', elements: ['Sun', 'Fire'], description: 'Scorching spirit of relentless sunlight.' },
  { name: "Wandering Voice Keens Delirium", complexity: 'High', expansion: 'nature-incarnate', elements: ['Moon', 'Air'], description: 'Drives Invaders mad with haunting cries.' },
  { name: "Wounded Waters Bleeding", complexity: 'High', expansion: 'nature-incarnate', elements: ['Moon', 'Water', 'Earth', 'Animal'], description: 'Corrupted water spirit seeking vengeance.' },
  { name: "Dances Up Earthquakes", complexity: 'Very High', expansion: 'nature-incarnate', elements: ['Moon', 'Fire', 'Earth'], description: 'Reshapes the land with seismic power.' },
];

export const ADVERSARIES: Adversary[] = [
  { name: 'Brandenburg-Prussia', expansion: 'base', maxLevel: 6, description: 'Builds aggressively and escalates quickly.' },
  { name: 'England', expansion: 'base', maxLevel: 6, description: 'Extra building and high-health towns.' },
  { name: 'Sweden', expansion: 'base', maxLevel: 6, description: 'Ravages harder and spreads blight.' },
  { name: 'France (Plantation Colony)', expansion: 'branch-and-claw', maxLevel: 6, description: 'Explores aggressively with towns.' },
  { name: 'Habsburg Monarchy (Livestock Colony)', expansion: 'jagged-earth', maxLevel: 6, description: 'Livestock herds that spread across the land.' },
  { name: 'Russia', expansion: 'jagged-earth', maxLevel: 6, description: 'Persistent explorers that are hard to remove.' },
  { name: 'Scotland', expansion: 'feather-and-flame', maxLevel: 6, description: 'Coastal settlements with strong trade.' },
  { name: 'Habsburg Mining Expedition', expansion: 'nature-incarnate', maxLevel: 6, description: 'Mines the land for resources.' },
];

export const SCENARIOS: Scenario[] = [
  { name: 'Blitz', expansion: 'base', difficulty: '0', description: 'Invaders act faster but the game is shorter.' },
  { name: "Guard the Isle's Heart", expansion: 'base', difficulty: '0', description: 'Protect the interior lands from Invaders.' },
  { name: 'Rituals of Terror', expansion: 'base', difficulty: '3', description: 'Fear is harder to generate but more impactful.' },
  { name: 'Dahan Insurrection', expansion: 'base', difficulty: '4', description: 'The Dahan rise up but need spirit guidance.' },
  { name: 'Second Wave', expansion: 'branch-and-claw', difficulty: '+/- 1', description: 'A second wave of Invaders arrives.' },
  { name: 'Powers Long Forgotten', expansion: 'branch-and-claw', difficulty: '1', description: 'Ancient powers awaken to help.' },
  { name: 'Ward the Shores', expansion: 'branch-and-claw', difficulty: '2', description: 'Prevent Invaders from reaching the coast.' },
  { name: 'Rituals of the Destroying Flame', expansion: 'branch-and-claw', difficulty: '3', description: 'Fire rituals change the game dynamics.' },
  { name: 'Elemental Invocation', expansion: 'jagged-earth', difficulty: '1', description: 'Elements have enhanced effects.' },
  { name: 'Despicable Theft', expansion: 'jagged-earth', difficulty: '2', description: 'Invaders steal sacred artifacts.' },
  { name: 'The Great River', expansion: 'jagged-earth', difficulty: '3', description: 'A great river divides the island.' },
  { name: 'A Diversity of Spirits', expansion: 'feather-and-flame', difficulty: '0', description: 'Spirits must be from different expansions.' },
  { name: 'Varied Terrains', expansion: 'feather-and-flame', difficulty: '2', description: 'Terrain types have special rules.' },
  { name: 'Destiny Unfolds', expansion: 'nature-incarnate', difficulty: '-1', description: 'The island\'s destiny reveals itself.' },
  { name: 'Surges of Colonization', expansion: 'nature-incarnate', difficulty: '+2/+7', description: 'Waves of colonization intensify.' },
];

export const BLIGHT_CARDS: BlightCard[] = [
  { name: 'Downward Spiral', expansion: 'base', blightPerPlayer: 5 },
  { name: 'Memory Fades to Dust', expansion: 'base', blightPerPlayer: 4 },
  { name: 'A Pall Upon the Land', expansion: 'branch-and-claw', blightPerPlayer: 3 },
  { name: 'Aid from Lesser Spirits', expansion: 'branch-and-claw', blightPerPlayer: 2 },
  { name: 'Back Against the Wall', expansion: 'branch-and-claw', blightPerPlayer: 2 },
  { name: 'Disintegrating Ecosystem', expansion: 'branch-and-claw', blightPerPlayer: 5 },
  { name: 'Erosion of Will', expansion: 'branch-and-claw', blightPerPlayer: 3 },
  { name: 'Promising Farmlands', expansion: 'branch-and-claw', blightPerPlayer: 4 },
  { name: 'All Things Weaken', expansion: 'jagged-earth', blightPerPlayer: 3 },
  { name: 'Invaders Find the Land to Their Liking', expansion: 'jagged-earth', blightPerPlayer: 2 },
  { name: 'Power Corrodes the Spirit', expansion: 'jagged-earth', blightPerPlayer: 4 },
  { name: 'Strong Earth Shatters Slowly', expansion: 'jagged-earth', blightPerPlayer: 2 },
  { name: 'Thriving Communities', expansion: 'jagged-earth', blightPerPlayer: 4 },
  { name: 'Unnatural Proliferation', expansion: 'jagged-earth', blightPerPlayer: 3 },
  { name: 'Untended Land Crumbles', expansion: 'jagged-earth', blightPerPlayer: 4 },
  { name: 'Attenuated Essence', expansion: 'nature-incarnate', blightPerPlayer: 4 },
  { name: 'Blight Corrodes the Spirit', expansion: 'nature-incarnate', blightPerPlayer: 4 },
  { name: 'Burn Brightest Before the End', expansion: 'nature-incarnate', blightPerPlayer: 2 },
  { name: 'Intensifying Exploitation', expansion: 'nature-incarnate', blightPerPlayer: 5 },
  { name: 'Shattered Fragments of Power', expansion: 'nature-incarnate', blightPerPlayer: 2 },
  { name: 'Slow Dissolution of Will', expansion: 'nature-incarnate', blightPerPlayer: 3 },
  { name: 'The Border of Life and Death', expansion: 'nature-incarnate', blightPerPlayer: 1 },
  { name: 'Thriving Crops', expansion: 'nature-incarnate', blightPerPlayer: 2 },
];

export const BOARDS: Board[] = [
  { id: 'A', name: 'Board A', expansion: 'base', thematicName: 'North East', avoidPairingWith: 'H' },
  { id: 'B', name: 'Board B', expansion: 'base', thematicName: 'East', avoidPairingWith: 'E' },
  { id: 'C', name: 'Board C', expansion: 'base', thematicName: 'North West', avoidPairingWith: 'G' },
  { id: 'D', name: 'Board D', expansion: 'base', thematicName: 'West', avoidPairingWith: 'F' },
  { id: 'E', name: 'Board E', expansion: 'jagged-earth', thematicName: 'South East', avoidPairingWith: 'B' },
  { id: 'F', name: 'Board F', expansion: 'jagged-earth', thematicName: 'South West', avoidPairingWith: 'D' },
  { id: 'G', name: 'Board G', expansion: 'horizons', thematicName: 'Horizons G' },
  { id: 'H', name: 'Board H', expansion: 'horizons', thematicName: 'Horizons H' },
];

export const ELEMENTS = ['Sun', 'Moon', 'Fire', 'Air', 'Water', 'Earth', 'Plant', 'Animal'] as const;

export const ELEMENT_COLORS: Record<string, string> = {
  Sun: '#F5C542',
  Moon: '#9B8EC4',
  Fire: '#E85D3A',
  Air: '#C4D4E0',
  Water: '#3A7BD5',
  Earth: '#8B6914',
  Plant: '#4CAF50',
  Animal: '#D4A843',
};

export const COMPLEXITY_COLORS: Record<Complexity, string> = {
  Low: '#4CAF50',
  Moderate: '#D4A843',
  High: '#E85D3A',
  'Very High': '#CC3333',
};

export interface GamePhase {
  id: string;
  name: string;
  icon: string;
  color: string;
  steps: GameStep[];
}

export interface GameStep {
  title: string;
  description: string;
  details?: string;
  isExpansion?: boolean;
  expansionId?: string;
}

export const GAME_PHASES: GamePhase[] = [
  {
    id: 'spirit',
    name: 'Spirit Phase',
    icon: '🌿',
    color: '#4CAF50',
    steps: [
      {
        title: 'Growth',
        description: 'Choose one Growth option from your Spirit Panel.',
        details: 'Each section next to "Growth" is a single choice. You must do everything shown in your chosen option, but may choose the order. Growth options typically include: placing Presence, gaining Power Cards, reclaiming played cards, and gaining Energy.'
      },
      {
        title: 'Gain Energy',
        description: 'Gain Energy equal to the highest uncovered number on your Energy Presence Track.',
        details: 'Place any gained Energy on or near your Spirit Panel. This is in addition to any Energy gained from Growth.'
      },
      {
        title: 'Play and Pay for Power Cards',
        description: 'Select Power Cards (Fast and Slow) for this turn and pay their Energy cost.',
        details: 'The maximum number of Power Cards you can play is the highest uncovered number on your Card Plays Presence Track. You must immediately pay Energy for ALL Power Cards played, even Slow ones. You also immediately gain all Elements from played Power Cards. Do NOT resolve their effects yet.'
      }
    ]
  },
  {
    id: 'fast',
    name: 'Fast Power Phase',
    icon: '⚡',
    color: '#F5C542',
    steps: [
      {
        title: 'Resolve Fast Powers',
        description: 'Resolve all Fast Powers — both Innate Powers and played Power Cards.',
        details: 'Power resolution can be done mostly simultaneously. When timing matters, Powers may be resolved in whatever order the players want, so long as no Power interrupts another partway through.'
      },
      {
        title: 'Skip Unwanted Powers',
        description: 'If you don\'t want to use a Power\'s text effect, you may skip it entirely.',
        details: 'Sometimes a Power Card is worth playing purely for its Elements. You cannot delay a Fast Power to the Slow Phase.'
      }
    ]
  },
  {
    id: 'invader',
    name: 'Invader Phase',
    icon: '⚔️',
    color: '#CC3333',
    steps: [
      {
        title: 'Blighted Island Effect',
        description: 'If the Blight Card has flipped to "Blighted Island," follow its instructions.',
        details: 'This happens every turn once the card has flipped. If you have trouble remembering, put a Blight from the box onto the Fear Space as a reminder.'
      },
      {
        title: 'Event Card',
        description: 'Draw and resolve one Event Card.',
        details: 'Exception: On the first turn, discard the Event Card without resolving it. Events can affect Dahan, Invaders, and the island in various ways.',
        isExpansion: true,
        expansionId: 'branch-and-claw'
      },
      {
        title: 'Fear Effects',
        description: 'Resolve any earned Fear Cards using the current Terror Level.',
        details: 'Pick up the whole facedown stack of earned Fear Cards, flip it over, and resolve them one at a time in the order they were earned. Use the effect listed next to the CURRENT Terror Level — this could be higher than when the card was earned. Fear Card effects last only for the current turn.'
      },
      {
        title: 'Ravage',
        description: 'Invaders deal damage in lands matching the Ravage card.',
        details: 'Damage dealt: 1 per Explorer, 2 per Town, 3 per City. Reduce by any Defend powers. If 2+ damage is dealt to the land, add a Blight (only once per land). Every 2 damage destroys 1 Dahan. Surviving Dahan fight back dealing 2 damage each to Invaders.'
      },
      {
        title: 'Build',
        description: 'Invaders Build in lands matching the Build card where Invaders are present.',
        details: 'If the land has more Towns than Cities, add a City. In all other cases, add a Town. Do NOT Build in lands without Invaders.'
      },
      {
        title: 'Explore',
        description: 'Flip the top Invader Deck card. Add Explorers to matching lands.',
        details: 'Add an Explorer to every land of the shown type which either contains a Town/City OR is adjacent to a Town, City, or Ocean. Only one Explorer per land regardless of sources. If there is no card to flip, the spirits LOSE the game.'
      },
      {
        title: 'Advance Invader Cards',
        description: 'Slide all Invader Cards one space to the left.',
        details: 'Move the Ravage card to discard, the Build card to the Ravage space, and the Explore card to the Build space.'
      }
    ]
  },
  {
    id: 'slow',
    name: 'Slow Power Phase',
    icon: '🌊',
    color: '#3A7BD5',
    steps: [
      {
        title: 'Resolve Slow Powers',
        description: 'Resolve all Slow Powers — both Innate Powers and played Power Cards.',
        details: 'This works exactly like the Fast Power Phase. Powers may be resolved in any order the players choose.'
      }
    ]
  },
  {
    id: 'time-passes',
    name: 'Time Passes',
    icon: '🌙',
    color: '#9B8EC4',
    steps: [
      {
        title: 'Discard Played Cards',
        description: 'All played Power Cards go to personal discard piles.',
        details: 'These cards can be reclaimed later through Growth actions.'
      },
      {
        title: 'Damage and Elements Clear',
        description: 'All Elements go away. All Damage done during the turn is removed.',
        details: 'If you turned any pieces on their sides to note partial Damage, turn them back. Remove any Single-Turn Effect reminder tokens.'
      }
    ]
  }
];

export const SETUP_STEPS = [
  {
    id: 'invader-board',
    title: 'Set Up the Invader Board',
    items: [
      { id: 'place-board', text: 'Place the Invader Board on one side of the play area', always: true },
      { id: 'fear-markers', text: 'Put 4 Fear Markers per player into the Fear Pool', always: true },
      { id: 'fear-deck', text: 'Shuffle Fear Cards and place 9 on the Fear Deck with Terror Level dividers (3 groups of 3)', always: true },
      { id: 'invader-deck', text: 'Make the Invader Deck: 3 Stage I on top, 4 Stage II, 5 Stage III on bottom', always: true },
      { id: 'blight-card', text: 'Place a random Blight Card "Healthy Island" side up. Add blight per player + 1 onto the card', always: true },
      { id: 'bc-extension', text: 'Add the Invader Board extension for Branch & Claw tokens', always: false, expansion: 'branch-and-claw' },
      { id: 'bc-tokens', text: 'Place Beasts, Wilds, Disease, and Strife tokens on the extension', always: false, expansion: 'branch-and-claw' },
      { id: 'event-deck', text: 'Shuffle the Event Deck and place on the Events space', always: false, expansion: 'branch-and-claw' },
    ]
  },
  {
    id: 'island-supply',
    title: 'Set Up the Island & Supply',
    items: [
      { id: 'island-boards', text: 'Pick one Island Board per player and arrange them to form the Island', always: true },
      { id: 'populate', text: 'Populate Island Boards with Invaders, Dahan, and Blight per icons', always: true },
      { id: 'power-decks', text: 'Shuffle the Minor and Major Power Decks', always: true },
      { id: 'supply', text: 'Put Energy, Cities, Towns, Explorers, and Dahan near the board', always: true },
      { id: 'bc-island-tokens', text: 'Place 1 Beast and 1 Disease on each Island Board', always: false, expansion: 'branch-and-claw' },
    ]
  },
  {
    id: 'player-setup',
    title: 'Player Setup',
    items: [
      { id: 'take-presence', text: 'Each player takes Spirit Presence and Single-Turn Effect Markers of one color', always: true },
      { id: 'choose-spirit', text: 'Each player chooses a Spirit, taking the Spirit Panel and 4 Unique Power Cards', always: true },
      { id: 'spirit-setup', text: 'Follow Setup instructions on the back of each Spirit Panel', always: true },
      { id: 'presence-tracks', text: 'Flip Spirit Panels and place remaining Presence on the dashed circles', always: true },
    ]
  },
  {
    id: 'initial-explore',
    title: 'Invaders\' Starting Action',
    items: [
      { id: 'initial-explore', text: 'Reveal the top Invader Deck card. Explore in that land type. Place card in Build space', always: true },
    ]
  }
];

export interface SessionData {
  id: string;
  date: string;
  expansions: string[];
  playerCount: number;
  players: PlayerData[];
  adversary: string | null;
  adversaryLevel: number;
  scenario: string | null;
  blightCard: string | null;
  boards: string[];
  useThematicBoards: boolean;
  useEventDeck: boolean;
  result: 'win' | 'loss' | 'in-progress' | null;
  winCondition: string | null;
  lossReason: string | null;
  notes: string;
  turnCount: number;
}

export interface PlayerData {
  name: string;
  spirit: string;
  color: string;
}

export const PLAYER_COLORS = [
  { name: 'Green', value: '#4CAF50' },
  { name: 'Blue', value: '#3A7BD5' },
  { name: 'Red', value: '#E85D3A' },
  { name: 'Yellow', value: '#F5C542' },
  { name: 'Purple', value: '#9B8EC4' },
  { name: 'White', value: '#E0E0E0' },
];

export const WIN_CONDITIONS = [
  'Terror Level Victory (all Fear Cards earned)',
  'Terror Level 1: No Invaders remain on the island',
  'Terror Level 2: No Towns and no Cities remain',
  'Terror Level 3: No Cities remain on the island',
  'Scenario-specific victory condition',
];

export const LOSS_CONDITIONS = [
  'A Spirit was destroyed (all Presence removed)',
  'Island overrun by Blight (Blight card condition)',
  'Invader Deck ran out during Explore (time ran out)',
  'Scenario-specific loss condition',
];
