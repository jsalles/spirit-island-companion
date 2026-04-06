/**
 * Spirit Island — Detailed Spirit Profiles
 * Comprehensive data for all 37 spirits across all expansions
 * Includes growth options, innate powers, special rules, presence tracks, setup, and play style
 */

export type Element = 'Sun' | 'Moon' | 'Fire' | 'Air' | 'Water' | 'Earth' | 'Plant' | 'Animal';

export interface GrowthOption {
  label: string;
  actions: string[];
}

export interface InnatePowerLevel {
  elements: Record<string, number>;
  effect: string;
}

export interface InnatePower {
  name: string;
  speed: 'Fast' | 'Slow';
  range?: string;
  target?: string;
  levels: InnatePowerLevel[];
}

export interface PresenceTrack {
  label: string;
  values: (string | number)[];
}

export interface SpiritDetail {
  name: string;
  expansion: string;
  complexity: 'Low' | 'Moderate' | 'High' | 'Very High';
  elements: Element[];
  themeColor: string;
  setup: string;
  playStyle: string;
  specialRules: { name: string; description: string }[];
  growthOptions: GrowthOption[];
  presenceTracks: PresenceTrack[];
  innatePowers: InnatePower[];
  powerSummary: {
    offense: number;
    control: number;
    fear: number;
    defense: number;
    utility: number;
  };
  lore: string;
}

export const SPIRIT_DETAILS: SpiritDetail[] = [
  // ============== BASE GAME ==============
  {
    name: "Lightning's Swift Strike",
    expansion: 'base',
    complexity: 'Low',
    elements: ['Fire', 'Air'],
    themeColor: '#F5C542',
    setup: 'Put 2 Presence on your starting board in the highest-numbered Sands.',
    playStyle: 'Virtually all offense to start with: without a more defensive teammate, Blight may become a problem. Excellent at destroying buildings, less good at containing Explorers. Using Thundering Destruction tends to be a burst affair: a turn or two of positioning and building up Energy, followed by a really big turn.',
    specialRules: [
      { name: 'Swiftness of Lightning', description: 'For every Air element you have, you may use 1 Slow Power as if it were Fast.' }
    ],
    growthOptions: [
      { label: 'Option A', actions: ['Reclaim Cards', 'Gain Power Card', 'Gain 1 Energy'] },
      { label: 'Option B', actions: ['Add a Presence (range 2)', 'Add a Presence (range 0)', 'Gain 3 Energy'] }
    ],
    presenceTracks: [
      { label: 'Energy/Turn', values: [1, 2, 2, 3, 4, 4, 5] },
      { label: 'Card Plays', values: [3, 4, 5, 6] }
    ],
    innatePowers: [
      {
        name: 'Thundering Destruction',
        speed: 'Slow',
        range: '1',
        target: 'Any land',
        levels: [
          { elements: { Fire: 3, Air: 2 }, effect: 'Destroy 1 Town.' },
          { elements: { Fire: 4, Air: 3 }, effect: 'You may instead Destroy 1 City.' },
          { elements: { Fire: 5, Air: 4, Water: 1 }, effect: 'Also, Destroy 1 Town/City.' },
          { elements: { Fire: 5, Air: 5, Water: 2 }, effect: 'Also, Destroy 1 Town/City.' }
        ]
      }
    ],
    powerSummary: { offense: 5, control: 1, fear: 2, defense: 0, utility: 1 },
    lore: 'Lightning is fierce and quick, striking where it wills. It has always been drawn to conflict, and the Invaders provide plenty of that.'
  },
  {
    name: "River Surges in Sunlight",
    expansion: 'base',
    complexity: 'Low',
    elements: ['Sun', 'Water'],
    themeColor: '#3A7BD5',
    setup: 'Put 1 Presence on your starting board in the highest-numbered Wetlands.',
    playStyle: 'While capable of some direct offense, River Surges in Sunlight is best at flooding out Explorers and Towns, displacing them from lands where they might Build or Ravage. The ability to get free Sacred Sites makes a wide range of Powers more useful.',
    specialRules: [
      { name: "River's Domain", description: 'Your Presence in Wetlands counts as a Sacred Site.' }
    ],
    growthOptions: [
      { label: 'Option A', actions: ['Reclaim Cards', 'Gain Power Card', 'Gain 1 Energy'] },
      { label: 'Option B', actions: ['Gain Power Card', 'Add a Presence (range 1)', 'Add a Presence (range 2)'] }
    ],
    presenceTracks: [
      { label: 'Energy/Turn', values: [1, 2, 2, 3, 4, 4, 5] },
      { label: 'Card Plays', values: [2, 2, 3, 'Reclaim One', 4, 5] }
    ],
    innatePowers: [
      {
        name: 'Massive Flooding',
        speed: 'Slow',
        range: '1',
        target: 'Any land',
        levels: [
          { elements: { Sun: 1, Water: 2 }, effect: 'Push 1 Explorer/Town.' },
          { elements: { Sun: 2, Water: 3 }, effect: 'Instead, 2 Damage. Push up to 3 Explorer/Town.' },
          { elements: { Sun: 3, Water: 4, Earth: 1 }, effect: 'Instead, 2 Damage to each Invader.' }
        ]
      }
    ],
    powerSummary: { offense: 2, control: 4, fear: 1, defense: 2, utility: 3 },
    lore: 'River is a spirit of life and growth, but also of relentless force. When roused, it can sweep away anything in its path.'
  },
  {
    name: "Shadows Flicker Like Flame",
    expansion: 'base',
    complexity: 'Low',
    elements: ['Moon', 'Fire', 'Air'],
    themeColor: '#9B8EC4',
    setup: 'Put 1 Presence on your starting board in the highest-numbered Mountain.',
    playStyle: 'Shadows excels at generating Fear and picking off lone Explorers. It struggles against large groups of Invaders but can move them around. Works well with spirits that deal direct damage.',
    specialRules: [
      { name: 'Shadows of the Dahan', description: 'Your Presence in lands with Dahan counts as a Sacred Site.' }
    ],
    growthOptions: [
      { label: 'Option A', actions: ['Reclaim Cards', 'Gain Power Card', 'Gain 1 Energy'] },
      { label: 'Option B', actions: ['Add a Presence (range 1)', 'Add a Presence (range 1)'] }
    ],
    presenceTracks: [
      { label: 'Energy/Turn', values: [0, 1, 1, 2, 2, 3, 4] },
      { label: 'Card Plays', values: [3, 4, 4, 5, 6] }
    ],
    innatePowers: [
      {
        name: 'Concealing Shadows',
        speed: 'Fast',
        range: '1',
        target: 'Any land with your Presence',
        levels: [
          { elements: { Moon: 1, Air: 1 }, effect: 'Defend 1.' },
          { elements: { Moon: 2, Air: 1, Fire: 1 }, effect: 'Defend 4.' },
          { elements: { Moon: 3, Air: 2, Fire: 1 }, effect: 'Also, 2 Fear.' }
        ]
      }
    ],
    powerSummary: { offense: 2, control: 3, fear: 5, defense: 2, utility: 1 },
    lore: 'Shadows is a spirit of darkness and fear, flickering at the edge of perception. It delights in terrifying the Invaders.'
  },
  {
    name: "Vital Strength of the Earth",
    expansion: 'base',
    complexity: 'Low',
    elements: ['Sun', 'Earth'],
    themeColor: '#8B6914',
    setup: 'Put 2 Presence on your starting board in the highest-numbered Jungle.',
    playStyle: 'A defensive powerhouse. Vital Strength of the Earth is excellent at protecting lands from Ravage and supporting Dahan. Slow to deal damage but nearly impossible to dislodge. Pairs well with offensive spirits.',
    specialRules: [
      { name: 'Rituals of Destruction', description: 'When you use a Power to Destroy Invaders, you may pay 1 Energy per Invader to Destroy them even if the Power does not normally allow it.' }
    ],
    growthOptions: [
      { label: 'Option A', actions: ['Reclaim Cards', 'Gain 1 Energy'] },
      { label: 'Option B', actions: ['Gain Power Card', 'Add a Presence (range 1)', 'Gain 1 Energy'] }
    ],
    presenceTracks: [
      { label: 'Energy/Turn', values: [1, 2, 2, 3, 3, 4, 5] },
      { label: 'Card Plays', values: [2, 3, 3, 4, 5] }
    ],
    innatePowers: [
      {
        name: 'Rituals of Destruction',
        speed: 'Slow',
        range: '1',
        target: 'Any land with your Sacred Site',
        levels: [
          { elements: { Sun: 2, Earth: 2 }, effect: '2 Damage.' },
          { elements: { Sun: 3, Earth: 3 }, effect: '2 Damage. Destroy 1 Town.' },
          { elements: { Sun: 4, Earth: 4 }, effect: '4 Damage. Destroy 1 Town and 1 City.' }
        ]
      }
    ],
    powerSummary: { offense: 2, control: 1, fear: 1, defense: 5, utility: 3 },
    lore: 'The Earth is patient and enduring. It does not strike quickly, but when it does, nothing can withstand its force.'
  },
  {
    name: "A Spread of Rampant Green",
    expansion: 'base',
    complexity: 'Moderate',
    elements: ['Sun', 'Water', 'Plant'],
    themeColor: '#4CAF50',
    setup: 'Put 1 Presence on your starting board in the highest-numbered Wetlands.',
    playStyle: 'Rapidly expands Presence across the island, choking off Invader expansion. Excellent at preventing Builds and Explores. Weak at direct combat but excels at area denial and support.',
    specialRules: [
      { name: 'Creepers Tear Into Mortar', description: 'Each turn, 1 Damage to each Town/City in a land with your Sacred Site.' }
    ],
    growthOptions: [
      { label: 'Option A', actions: ['Reclaim Cards', 'Gain Power Card'] },
      { label: 'Option B', actions: ['Add a Presence (range 1)', 'Add a Presence (range 2)'] }
    ],
    presenceTracks: [
      { label: 'Energy/Turn', values: [1, 2, 2, 3, 4, 5] },
      { label: 'Card Plays', values: [1, 2, 2, 3, 3, 4] }
    ],
    innatePowers: [
      {
        name: 'Choke the Land with Green',
        speed: 'Slow',
        range: '0',
        target: 'Any land with your Presence',
        levels: [
          { elements: { Plant: 2 }, effect: 'Push 1 Explorer.' },
          { elements: { Sun: 1, Plant: 3 }, effect: 'Push up to 2 Explorer/Town.' },
          { elements: { Sun: 2, Water: 1, Plant: 4 }, effect: 'Push up to 3 Explorer/Town. 1 Damage to each Town/City.' }
        ]
      }
    ],
    powerSummary: { offense: 1, control: 3, fear: 1, defense: 3, utility: 5 },
    lore: 'Green grows relentlessly, covering everything in its path. The jungle reclaims what was taken, slowly but surely.'
  },
  {
    name: "Thunderspeaker",
    expansion: 'base',
    complexity: 'Moderate',
    elements: ['Sun', 'Fire', 'Air'],
    themeColor: '#E85D3A',
    setup: 'Put 2 Presence on your starting board: 1 in the highest-numbered Sands, 1 in the land with the most Dahan.',
    playStyle: 'Commands the Dahan to fight alongside the spirits. Thunderspeaker is highly mobile and can gather Dahan into powerful strike forces. Requires careful positioning of both Presence and Dahan.',
    specialRules: [
      { name: 'Ally of the Dahan', description: 'Your Presence may only be in lands with Dahan. If Presence would be in a land without Dahan, Destroy it.' }
    ],
    growthOptions: [
      { label: 'Option A', actions: ['Reclaim Cards', 'Gain 1 Energy'] },
      { label: 'Option B', actions: ['Add a Presence (range 1, land with Dahan)', 'Gain Power Card'] }
    ],
    presenceTracks: [
      { label: 'Energy/Turn', values: [1, 2, 2, 3, 3, 4] },
      { label: 'Card Plays', values: [2, 2, 3, 3, 4, 5] }
    ],
    innatePowers: [
      {
        name: 'Lead the Furious Assault',
        speed: 'Slow',
        range: '1',
        target: 'Any land with Dahan',
        levels: [
          { elements: { Sun: 2, Fire: 1, Air: 1 }, effect: 'Each Dahan deals damage equal to their Health.' },
          { elements: { Sun: 3, Fire: 2, Air: 2 }, effect: 'Each Dahan deals 3 Damage.' },
          { elements: { Sun: 4, Fire: 3, Air: 3 }, effect: 'Each Dahan deals 4 Damage.' }
        ]
      }
    ],
    powerSummary: { offense: 4, control: 3, fear: 2, defense: 2, utility: 2 },
    lore: 'Thunderspeaker speaks with the voice of thunder, rallying the Dahan to defend their homeland with fierce determination.'
  },
  {
    name: "Bringer of Dreams and Nightmares",
    expansion: 'base',
    complexity: 'High',
    elements: ['Moon', 'Air'],
    themeColor: '#6B5B95',
    setup: 'Put 1 Presence on your starting board in the highest-numbered Sands.',
    playStyle: 'Generates massive Fear without destroying Invaders directly. Bringer works by terrifying the Invaders into submission rather than fighting them. Requires a partner who can handle actual destruction.',
    specialRules: [
      { name: 'To Dream a Thousand Deaths', description: 'When you would Destroy Invaders, instead generate Fear equal to the Invaders\' Health and push them to an adjacent land.' }
    ],
    growthOptions: [
      { label: 'Option A', actions: ['Reclaim Cards', 'Gain Power Card'] },
      { label: 'Option B', actions: ['Add a Presence (range 2)', 'Gain 1 Energy'] }
    ],
    presenceTracks: [
      { label: 'Energy/Turn', values: [0, 1, 1, 2, 2, 3] },
      { label: 'Card Plays', values: [2, 3, 3, 4, 5, 6] }
    ],
    innatePowers: [
      {
        name: 'Night Terrors',
        speed: 'Fast',
        range: '1',
        target: 'Any land with Invaders',
        levels: [
          { elements: { Moon: 2 }, effect: '2 Fear.' },
          { elements: { Moon: 3, Air: 1 }, effect: '3 Fear. Push 1 Explorer.' },
          { elements: { Moon: 4, Air: 2 }, effect: '5 Fear. Push 1 Explorer and 1 Town.' }
        ]
      }
    ],
    powerSummary: { offense: 0, control: 3, fear: 5, defense: 1, utility: 3 },
    lore: 'Dreams and nightmares are powerful forces. This spirit weaves them together to drive the Invaders mad with terror.'
  },
  {
    name: "Ocean's Hungry Grasp",
    expansion: 'base',
    complexity: 'High',
    elements: ['Moon', 'Water', 'Earth'],
    themeColor: '#1A5276',
    setup: 'Ocean starts in a special Ocean board space adjacent to your starting board. Put 2 Presence there.',
    playStyle: 'Drowns Invaders from coastal lands. Ocean is unique in that it exists in the Ocean rather than on land. It pulls Invaders into the sea and prevents coastal landings. Very powerful on coastal boards.',
    specialRules: [
      { name: 'Ocean in Play', description: 'You have a special Ocean board. Invaders pulled into the Ocean are Destroyed. Your Presence in the Ocean is not on any land.' },
      { name: 'Pound Ships to Splinters', description: 'Whenever Invaders would be added to the Ocean, Destroy them instead.' }
    ],
    growthOptions: [
      { label: 'Option A', actions: ['Reclaim Cards', 'Gain 1 Energy'] },
      { label: 'Option B', actions: ['Add a Presence (range 1, Coastal)', 'Gain Power Card'] }
    ],
    presenceTracks: [
      { label: 'Energy/Turn', values: [0, 0, 1, 1, 2, 3, 5] },
      { label: 'Card Plays', values: [1, 2, 2, 3, 4] }
    ],
    innatePowers: [
      {
        name: 'Tidal Surge',
        speed: 'Slow',
        range: '1',
        target: 'Coastal land',
        levels: [
          { elements: { Moon: 1, Water: 2 }, effect: 'Push 1 Explorer to the Ocean.' },
          { elements: { Moon: 2, Water: 3 }, effect: 'Push 1 Town to the Ocean.' },
          { elements: { Moon: 3, Water: 4, Earth: 1 }, effect: 'Push 1 City to the Ocean. 2 Fear.' }
        ]
      }
    ],
    powerSummary: { offense: 4, control: 3, fear: 2, defense: 1, utility: 2 },
    lore: 'The Ocean is ancient and hungry, always reaching for the shore. It cares nothing for the affairs of land-dwellers, but it will devour anything that enters its domain.'
  },

  // ============== BRANCH & CLAW ==============
  {
    name: "Keeper of the Forbidden Wilds",
    expansion: 'branch-and-claw',
    complexity: 'Moderate',
    elements: ['Sun', 'Fire', 'Plant'],
    themeColor: '#2E7D32',
    setup: 'Put 2 Presence on your starting board in the highest-numbered Jungle.',
    playStyle: 'Protects sacred wilds and punishes trespassers. Keeper excels at controlling specific areas and making them dangerous for Invaders. Uses Wilds tokens to create no-go zones.',
    specialRules: [
      { name: 'Forbidden Ground', description: 'Wilds tokens in your lands have +1 effect (prevent an additional Build/Explore).' }
    ],
    growthOptions: [
      { label: 'Option A', actions: ['Reclaim Cards', 'Gain Power Card', 'Gain 1 Energy'] },
      { label: 'Option B', actions: ['Add a Presence (range 1)', 'Add Wilds to a land with your Presence'] }
    ],
    presenceTracks: [
      { label: 'Energy/Turn', values: [1, 2, 2, 3, 4, 5] },
      { label: 'Card Plays', values: [2, 2, 3, 3, 4] }
    ],
    innatePowers: [
      {
        name: 'Punish Those Who Trespass',
        speed: 'Slow',
        range: '0',
        target: 'Land with Wilds',
        levels: [
          { elements: { Sun: 1, Plant: 2 }, effect: '1 Damage per Wilds in target land.' },
          { elements: { Sun: 2, Fire: 1, Plant: 3 }, effect: '2 Damage per Wilds in target land.' },
          { elements: { Sun: 3, Fire: 2, Plant: 4 }, effect: '3 Damage per Wilds. 1 Fear per Wilds.' }
        ]
      }
    ],
    powerSummary: { offense: 3, control: 4, fear: 1, defense: 2, utility: 3 },
    lore: 'The Keeper guards the deep places of the island where no mortal should tread. Those who enter uninvited face the wrath of the wild.'
  },
  {
    name: "Sharp Fangs Behind the Leaves",
    expansion: 'branch-and-claw',
    complexity: 'Moderate',
    elements: ['Moon', 'Plant', 'Animal'],
    themeColor: '#558B2F',
    setup: 'Put 1 Presence on your starting board in the highest-numbered Jungle. Add 1 Beast to that land.',
    playStyle: 'Commands beasts to hunt Invaders. Sharp Fangs uses Beast tokens as a primary weapon, gathering and directing animal attacks. Excels at targeted strikes but struggles with wide-area threats.',
    specialRules: [
      { name: 'Prey on the Builders', description: 'Each Beast in a land with your Sacred Site deals 1 Damage during the Ravage step (before Invaders deal Damage).' }
    ],
    growthOptions: [
      { label: 'Option A', actions: ['Reclaim Cards', 'Gain Power Card'] },
      { label: 'Option B', actions: ['Add a Presence (range 1)', 'Add 1 Beast to a land with your Presence'] }
    ],
    presenceTracks: [
      { label: 'Energy/Turn', values: [0, 1, 1, 2, 2, 3] },
      { label: 'Card Plays', values: [2, 3, 3, 4, 5] }
    ],
    innatePowers: [
      {
        name: 'Ranging Hunt',
        speed: 'Fast',
        range: '1',
        target: 'Land with Beasts',
        levels: [
          { elements: { Moon: 1, Animal: 1 }, effect: 'Gather 1 Beast. 1 Damage per Beast.' },
          { elements: { Moon: 2, Plant: 1, Animal: 2 }, effect: 'Gather up to 2 Beasts. 1 Damage per Beast. Push 1 Explorer.' },
          { elements: { Moon: 3, Plant: 2, Animal: 3 }, effect: 'Gather up to 3 Beasts. 2 Damage per Beast.' }
        ]
      }
    ],
    powerSummary: { offense: 4, control: 2, fear: 2, defense: 0, utility: 3 },
    lore: 'Sharp Fangs lurks in the undergrowth, commanding the beasts of the island. When it strikes, it strikes with the fury of a hundred predators.'
  },

  // ============== FEATHER & FLAME (PROMO) ==============
  {
    name: "Heart of the Wildfire",
    expansion: 'feather-and-flame',
    complexity: 'High',
    elements: ['Fire', 'Plant'],
    themeColor: '#FF6F00',
    setup: 'Put 1 Presence on your starting board in the highest-numbered Sands. Add 1 Blight to that land (from the box, not the Blight Card).',
    playStyle: 'Spreads devastating fire that harms everything — including the land itself. Heart of the Wildfire is incredibly destructive but adds Blight as a side effect. Requires careful management to avoid losing to Blight.',
    specialRules: [
      { name: 'Blazing Presence', description: 'Your Presence counts as Blight for the purposes of Invader damage. Whenever you place Presence, add 1 Blight to that land from the box.' },
      { name: 'Firestorm', description: 'Blight added by your Powers and Presence does not trigger Blight cascade effects.' }
    ],
    growthOptions: [
      { label: 'Option A', actions: ['Reclaim Cards', 'Gain Power Card'] },
      { label: 'Option B', actions: ['Add a Presence (range 1)', 'Gain 1 Energy'] }
    ],
    presenceTracks: [
      { label: 'Energy/Turn', values: [0, 1, 2, 2, 3, 4] },
      { label: 'Card Plays', values: [2, 3, 3, 4, 5] }
    ],
    innatePowers: [
      {
        name: 'The Burned Land Regrows',
        speed: 'Slow',
        range: '0',
        target: 'Land with Blight and your Presence',
        levels: [
          { elements: { Plant: 3 }, effect: 'Remove 1 Blight.' },
          { elements: { Plant: 4, Fire: 2 }, effect: 'Remove 1 Blight. Add 1 Wilds.' },
          { elements: { Plant: 5, Fire: 3, Earth: 1 }, effect: 'Remove up to 2 Blight. Add 1 Wilds and 1 Beast.' }
        ]
      }
    ],
    powerSummary: { offense: 5, control: 1, fear: 3, defense: 0, utility: 2 },
    lore: 'Wildfire is destruction and renewal in one. It burns everything in its path, but from the ashes, new life springs forth stronger than before.'
  },
  {
    name: "Serpent Slumbering Beneath the Island",
    expansion: 'feather-and-flame',
    complexity: 'High',
    elements: ['Sun', 'Moon', 'Earth', 'Fire'],
    themeColor: '#5D4037',
    setup: 'Put 1 Presence on your starting board in the lowest-numbered Mountain.',
    playStyle: 'Starts incredibly weak but awakens to immense power. Serpent has a unique "Absorb Presence" mechanic that lets it grow by taking Presence from other spirits. The late game is devastating if you survive.',
    specialRules: [
      { name: 'Deep Slumber', description: 'You may not use Growth options that give Power Cards until you have 3+ Presence on the island.' },
      { name: 'Absorb Essence', description: 'Once per turn, you may absorb a Presence from another Spirit in a land with your Presence, placing it on your tracks.' }
    ],
    growthOptions: [
      { label: 'Option A', actions: ['Add a Presence (range 1)', 'Gain 1 Energy'] },
      { label: 'Option B', actions: ['Reclaim Cards', 'Gain Power Card'] }
    ],
    presenceTracks: [
      { label: 'Energy/Turn', values: [0, 1, 1, 2, 3, 4, 6] },
      { label: 'Card Plays', values: [1, 1, 2, 2, 3] }
    ],
    innatePowers: [
      {
        name: 'Serpent Wakes in Power',
        speed: 'Slow',
        range: '0',
        target: 'Any land with your Sacred Site',
        levels: [
          { elements: { Sun: 1, Moon: 1, Earth: 1, Fire: 1 }, effect: '2 Fear. 4 Damage.' },
          { elements: { Sun: 2, Moon: 2, Earth: 2, Fire: 2 }, effect: '4 Fear. 8 Damage. Destroy 2 Towns/Cities.' },
          { elements: { Sun: 3, Moon: 3, Earth: 3, Fire: 3 }, effect: '6 Fear. 12 Damage. Destroy all Invaders.' }
        ]
      }
    ],
    powerSummary: { offense: 5, control: 1, fear: 3, defense: 2, utility: 2 },
    lore: 'The Serpent has slumbered beneath the island since before memory. Its awakening shakes the very foundations of the world.'
  },
  {
    name: "Downpour Drenches the World",
    expansion: 'feather-and-flame',
    complexity: 'High',
    elements: ['Water', 'Earth'],
    themeColor: '#0277BD',
    setup: 'Put 2 Presence on your starting board in the highest-numbered Wetlands.',
    playStyle: 'Floods the land with torrential rain, washing away Invaders and nurturing the land. Downpour excels at both offense and defense through water manipulation.',
    specialRules: [
      { name: 'Massive Rains', description: 'Once per turn during any Slow Phase, you may add 1 Blight to a land with your Sacred Site to remove 1 Blight from an adjacent land.' }
    ],
    growthOptions: [
      { label: 'Option A', actions: ['Reclaim Cards', 'Gain Power Card', 'Gain 1 Energy'] },
      { label: 'Option B', actions: ['Add a Presence (range 1)', 'Add a Presence (range 1)', 'Gain 2 Energy'] }
    ],
    presenceTracks: [
      { label: 'Energy/Turn', values: [1, 2, 3, 4, 5, 6] },
      { label: 'Card Plays', values: [2, 2, 3, 3, 4] }
    ],
    innatePowers: [
      {
        name: 'Deluge',
        speed: 'Slow',
        range: '1',
        target: 'Any land',
        levels: [
          { elements: { Water: 3 }, effect: '2 Damage.' },
          { elements: { Water: 4, Earth: 1 }, effect: '3 Damage. Push up to 2 Explorers.' },
          { elements: { Water: 5, Earth: 2 }, effect: '5 Damage. Push all Explorers and Towns.' }
        ]
      }
    ],
    powerSummary: { offense: 3, control: 3, fear: 1, defense: 3, utility: 3 },
    lore: 'When Downpour decides to act, the skies open and the world is washed clean. Nothing can stand against the relentless force of water.'
  },
  {
    name: "Finder of Paths Unseen",
    expansion: 'feather-and-flame',
    complexity: 'Very High',
    elements: ['Moon', 'Air', 'Water'],
    themeColor: '#4A148C',
    setup: 'Put 2 Presence on your starting board: 1 in the highest-numbered Jungle, 1 in the lowest-numbered Wetlands.',
    playStyle: 'Moves things through hidden pathways. Finder can teleport Invaders, Dahan, and even other spirits\' Presence across the island. Extremely versatile but requires deep strategic thinking.',
    specialRules: [
      { name: 'Hidden Pathways', description: 'When you use a Power to move/push/gather pieces, you may move them to any land with your Presence instead of only adjacent lands.' }
    ],
    growthOptions: [
      { label: 'Option A', actions: ['Reclaim Cards', 'Gain Power Card'] },
      { label: 'Option B', actions: ['Add a Presence (range 3)', 'Gain 2 Energy'] }
    ],
    presenceTracks: [
      { label: 'Energy/Turn', values: [0, 1, 1, 2, 3, 4] },
      { label: 'Card Plays', values: [1, 2, 2, 3, 4, 5] }
    ],
    innatePowers: [
      {
        name: 'Paths Shift and Wander',
        speed: 'Fast',
        range: '0',
        target: 'Any land with your Presence',
        levels: [
          { elements: { Moon: 1, Air: 1 }, effect: 'Push up to 2 Explorers to any land with your Presence.' },
          { elements: { Moon: 2, Air: 2, Water: 1 }, effect: 'Push up to 3 Explorers/Towns. Gather up to 2 Dahan.' },
          { elements: { Moon: 3, Air: 3, Water: 2 }, effect: 'Push any number of Invaders. Gather any number of Dahan.' }
        ]
      }
    ],
    powerSummary: { offense: 1, control: 5, fear: 1, defense: 2, utility: 5 },
    lore: 'Finder knows every hidden path, every secret way through the island. It can move anything anywhere, if it chooses.'
  },

  // ============== JAGGED EARTH ==============
  {
    name: "Grinning Trickster Stirs Up Trouble",
    expansion: 'jagged-earth',
    complexity: 'Moderate',
    elements: ['Sun', 'Fire', 'Air'],
    themeColor: '#FF8F00',
    setup: 'Put 2 Presence on your starting board: 1 in the highest-numbered Jungle, 1 in the highest-numbered Sands.',
    playStyle: 'Causes chaos and strife among the Invaders. Trickster uses Strife tokens to turn Invaders against each other and generates Fear through mischief rather than direct confrontation.',
    specialRules: [
      { name: 'Trickster\'s Mischief', description: 'Each Strife token on an Invader prevents it from dealing 1 Damage during Ravage.' }
    ],
    growthOptions: [
      { label: 'Option A', actions: ['Reclaim Cards', 'Gain Power Card', 'Gain 1 Energy'] },
      { label: 'Option B', actions: ['Add a Presence (range 2)', 'Add Strife to a land with your Presence'] }
    ],
    presenceTracks: [
      { label: 'Energy/Turn', values: [1, 2, 2, 3, 3, 4] },
      { label: 'Card Plays', values: [2, 3, 3, 4, 5] }
    ],
    innatePowers: [
      {
        name: 'Let\'s See What Happens',
        speed: 'Fast',
        range: '1',
        target: 'Any land with Invaders',
        levels: [
          { elements: { Sun: 1, Fire: 1, Air: 1 }, effect: '1 Fear. Add 1 Strife.' },
          { elements: { Sun: 2, Fire: 2, Air: 1 }, effect: '2 Fear. Add 2 Strife.' },
          { elements: { Sun: 3, Fire: 2, Air: 2 }, effect: '3 Fear. Add 2 Strife. 1 Damage per Strife.' }
        ]
      }
    ],
    powerSummary: { offense: 2, control: 3, fear: 4, defense: 1, utility: 3 },
    lore: 'The Trickster delights in chaos and confusion. It turns the Invaders\' own strength against them with gleeful abandon.'
  },
  {
    name: "Lure of the Deep Wilderness",
    expansion: 'jagged-earth',
    complexity: 'Moderate',
    elements: ['Moon', 'Plant'],
    themeColor: '#1B5E20',
    setup: 'Put 1 Presence on your starting board in the highest-numbered Jungle.',
    playStyle: 'Draws Invaders into the wilderness to be lost forever. Lure creates dangerous zones that Invaders wander into but cannot escape. Excellent at area denial and slow attrition.',
    specialRules: [
      { name: 'Enthralling Beauty', description: 'During Explore, Invaders are also added to lands with your Sacred Site (as if they were adjacent to a Town/City).' }
    ],
    growthOptions: [
      { label: 'Option A', actions: ['Reclaim Cards', 'Gain Power Card'] },
      { label: 'Option B', actions: ['Add a Presence (range 2)', 'Gain 1 Energy'] }
    ],
    presenceTracks: [
      { label: 'Energy/Turn', values: [0, 1, 1, 2, 3, 4] },
      { label: 'Card Plays', values: [2, 2, 3, 3, 4, 5] }
    ],
    innatePowers: [
      {
        name: 'Softly Beckon Ever Inward',
        speed: 'Slow',
        range: '1',
        target: 'Land with your Presence',
        levels: [
          { elements: { Moon: 1, Plant: 1 }, effect: 'Gather 1 Explorer.' },
          { elements: { Moon: 2, Plant: 2 }, effect: 'Gather up to 3 Explorers. 1 Fear.' },
          { elements: { Moon: 3, Plant: 3, Air: 1 }, effect: 'Gather up to 3 Explorers/Towns. 2 Fear. 2 Damage.' }
        ]
      }
    ],
    powerSummary: { offense: 2, control: 4, fear: 2, defense: 1, utility: 3 },
    lore: 'The deep wilderness calls to all who venture near. Its beauty is irresistible, and those who follow its call are never seen again.'
  },
  {
    name: "Many Minds Move as One",
    expansion: 'jagged-earth',
    complexity: 'Moderate',
    elements: ['Moon', 'Air', 'Animal'],
    themeColor: '#6A1B9A',
    setup: 'Put 1 Presence on your starting board in the highest-numbered Jungle. Add 1 Beast to that land.',
    playStyle: 'Controls beasts across the island as a swarm intelligence. Many Minds uses Beast tokens both offensively and defensively, coordinating animal attacks across multiple lands simultaneously.',
    specialRules: [
      { name: 'Hive Mind', description: 'Beasts in lands with your Presence are considered part of your swarm. They deal 1 Damage to each Invader during Ravage.' }
    ],
    growthOptions: [
      { label: 'Option A', actions: ['Reclaim Cards', 'Add 1 Beast to a land with your Presence'] },
      { label: 'Option B', actions: ['Add a Presence (range 1)', 'Gain Power Card'] }
    ],
    presenceTracks: [
      { label: 'Energy/Turn', values: [0, 1, 1, 2, 2, 3] },
      { label: 'Card Plays', values: [2, 3, 3, 4, 5] }
    ],
    innatePowers: [
      {
        name: 'Guide the Swarming Beasts',
        speed: 'Fast',
        range: '1',
        target: 'Land with Beasts',
        levels: [
          { elements: { Moon: 1, Animal: 1 }, effect: 'Gather 1 Beast. 1 Fear if Invaders are present.' },
          { elements: { Moon: 2, Air: 1, Animal: 2 }, effect: 'Gather up to 2 Beasts. 1 Damage per Beast.' },
          { elements: { Moon: 3, Air: 2, Animal: 3 }, effect: 'Gather up to 3 Beasts. 2 Damage per Beast. 1 Fear per Beast.' }
        ]
      }
    ],
    powerSummary: { offense: 3, control: 2, fear: 2, defense: 1, utility: 4 },
    lore: 'Many Minds is not one creature but thousands, all thinking and acting as one. The swarm sees all, knows all, and strikes everywhere at once.'
  },
  {
    name: "Shifting Memory of Ages",
    expansion: 'jagged-earth',
    complexity: 'Moderate',
    elements: ['Moon', 'Earth'],
    themeColor: '#37474F',
    setup: 'Put 2 Presence on your starting board in the lowest-numbered Mountain.',
    playStyle: 'Manipulates elements and adapts to any situation. Shifting Memory can change its element production each turn, making it incredibly flexible. It supports other spirits and fills whatever role is needed.',
    specialRules: [
      { name: 'Elemental Shift', description: 'During the Spirit Phase, you may change 1 Element marker on your panel to any other Element. This persists until changed again.' }
    ],
    growthOptions: [
      { label: 'Option A', actions: ['Reclaim Cards', 'Gain 1 Energy'] },
      { label: 'Option B', actions: ['Add a Presence (range 1)', 'Gain Power Card', 'Gain 1 Energy'] }
    ],
    presenceTracks: [
      { label: 'Energy/Turn', values: [1, 2, 2, 3, 4, 5] },
      { label: 'Card Plays', values: [1, 2, 2, 3, 3, 4] }
    ],
    innatePowers: [
      {
        name: 'Memories Stir to Life',
        speed: 'Slow',
        range: '1',
        target: 'Any land with your Presence',
        levels: [
          { elements: { Moon: 2, Earth: 1 }, effect: '1 Fear. Defend 2.' },
          { elements: { Moon: 3, Earth: 2 }, effect: '2 Fear. Defend 4. 1 Damage.' },
          { elements: { Moon: 4, Earth: 3 }, effect: '3 Fear. Defend 6. 3 Damage.' }
        ]
      }
    ],
    powerSummary: { offense: 2, control: 2, fear: 2, defense: 3, utility: 5 },
    lore: 'Memory holds the knowledge of ages past. It shifts and changes, adapting to whatever the island needs most.'
  },
  {
    name: "Stone's Unyielding Defiance",
    expansion: 'jagged-earth',
    complexity: 'Moderate',
    elements: ['Sun', 'Earth'],
    themeColor: '#795548',
    setup: 'Put 2 Presence on your starting board in the lowest-numbered Mountain.',
    playStyle: 'An immovable defender that absorbs damage and protects the land. Stone excels at preventing Blight and shielding Dahan. Slow but incredibly resilient.',
    specialRules: [
      { name: 'Unyielding', description: 'When Blight would be added to a land with your Sacred Site, you may prevent it by Destroying 1 of your Presence there.' }
    ],
    growthOptions: [
      { label: 'Option A', actions: ['Reclaim Cards', 'Gain 1 Energy'] },
      { label: 'Option B', actions: ['Add a Presence (range 1)', 'Gain Power Card'] }
    ],
    presenceTracks: [
      { label: 'Energy/Turn', values: [1, 2, 2, 3, 3, 4, 5] },
      { label: 'Card Plays', values: [1, 2, 2, 3, 4] }
    ],
    innatePowers: [
      {
        name: 'Stubborn Solidity',
        speed: 'Fast',
        range: '0',
        target: 'Land with your Presence',
        levels: [
          { elements: { Sun: 1, Earth: 2 }, effect: 'Defend 3.' },
          { elements: { Sun: 2, Earth: 3 }, effect: 'Defend 6.' },
          { elements: { Sun: 3, Earth: 4 }, effect: 'Defend 9. 1 Damage to each Invader.' }
        ]
      }
    ],
    powerSummary: { offense: 1, control: 1, fear: 1, defense: 5, utility: 3 },
    lore: 'Stone does not move. Stone does not bend. Stone simply endures, and in the end, it is the Invaders who break.'
  },
  {
    name: "Volcano Looming High",
    expansion: 'jagged-earth',
    complexity: 'Moderate',
    elements: ['Sun', 'Fire', 'Earth', 'Air'],
    themeColor: '#BF360C',
    setup: 'Put 2 Presence on your starting board in the lowest-numbered Mountain.',
    playStyle: 'Erupts with devastating power from a single mountain. Volcano is incredibly powerful in its home territory but struggles to project force far from the mountain. Timing eruptions is key.',
    specialRules: [
      { name: 'Volcanic Presence', description: 'Your Presence in Mountains generates 1 additional Energy per turn.' }
    ],
    growthOptions: [
      { label: 'Option A', actions: ['Reclaim Cards', 'Gain 2 Energy'] },
      { label: 'Option B', actions: ['Add a Presence (range 1, Mountain only)', 'Gain Power Card'] }
    ],
    presenceTracks: [
      { label: 'Energy/Turn', values: [1, 2, 3, 4, 5, 6] },
      { label: 'Card Plays', values: [1, 2, 2, 3, 3] }
    ],
    innatePowers: [
      {
        name: 'Rain of Ash and Fire',
        speed: 'Slow',
        range: '0-1',
        target: 'Land adjacent to Mountain with your Presence',
        levels: [
          { elements: { Fire: 2, Earth: 1, Air: 1 }, effect: '1 Fear. 2 Damage.' },
          { elements: { Fire: 3, Earth: 2, Air: 1 }, effect: '2 Fear. 4 Damage.' },
          { elements: { Sun: 1, Fire: 4, Earth: 2, Air: 2 }, effect: '3 Fear. 6 Damage. Add 1 Blight.' }
        ]
      }
    ],
    powerSummary: { offense: 5, control: 1, fear: 3, defense: 1, utility: 1 },
    lore: 'The Volcano has watched over the island since the beginning. When it erupts, the world trembles and the Invaders learn the meaning of true power.'
  },
  {
    name: "Shroud of Silent Mist",
    expansion: 'jagged-earth',
    complexity: 'High',
    elements: ['Moon', 'Water', 'Air'],
    themeColor: '#546E7A',
    setup: 'Put 2 Presence on your starting board: 1 in the highest-numbered Wetlands, 1 in the highest-numbered Mountain.',
    playStyle: 'Envelops lands in deadly mist that slowly kills Invaders. Shroud is a patient spirit that wears down Invaders over time. Its mist prevents Invaders from acting effectively.',
    specialRules: [
      { name: 'Suffocating Mist', description: 'Invaders in lands with your Sacred Site skip one action (Explore, Build, or Ravage) each turn.' }
    ],
    growthOptions: [
      { label: 'Option A', actions: ['Reclaim Cards', 'Gain Power Card'] },
      { label: 'Option B', actions: ['Add a Presence (range 1)', 'Gain 2 Energy'] }
    ],
    presenceTracks: [
      { label: 'Energy/Turn', values: [0, 1, 1, 2, 3, 4] },
      { label: 'Card Plays', values: [2, 2, 3, 3, 4, 5] }
    ],
    innatePowers: [
      {
        name: 'Veiled Nights',
        speed: 'Fast',
        range: '1',
        target: 'Any land with your Presence',
        levels: [
          { elements: { Moon: 1, Air: 1 }, effect: 'Defend 2.' },
          { elements: { Moon: 2, Water: 1, Air: 2 }, effect: 'Defend 4. 1 Fear.' },
          { elements: { Moon: 3, Water: 2, Air: 3 }, effect: 'Defend 6. 2 Fear. 1 Damage to each Invader.' }
        ]
      }
    ],
    powerSummary: { offense: 2, control: 4, fear: 3, defense: 3, utility: 2 },
    lore: 'The mist comes silently, wrapping around everything. Those caught within it lose their way, their will, and eventually their lives.'
  },
  {
    name: "Vengeance as a Burning Plague",
    expansion: 'jagged-earth',
    complexity: 'High',
    elements: ['Fire', 'Earth', 'Animal'],
    themeColor: '#880E4F',
    setup: 'Put 1 Presence on your starting board in the highest-numbered Jungle. Add 1 Disease to that land.',
    playStyle: 'Spreads disease among the Invaders as vengeance for the harm they cause. Vengeance uses Disease tokens to weaken and destroy Invaders. The more damage the Invaders do, the stronger Vengeance becomes.',
    specialRules: [
      { name: 'Plague Spreads', description: 'When Invaders Ravage in a land with Disease, add 1 Disease to an adjacent land with Invaders.' }
    ],
    growthOptions: [
      { label: 'Option A', actions: ['Reclaim Cards', 'Gain Power Card'] },
      { label: 'Option B', actions: ['Add a Presence (range 1)', 'Add 1 Disease to a land with your Presence'] }
    ],
    presenceTracks: [
      { label: 'Energy/Turn', values: [0, 1, 1, 2, 3, 4] },
      { label: 'Card Plays', values: [2, 2, 3, 3, 4, 5] }
    ],
    innatePowers: [
      {
        name: 'Plaguebearers',
        speed: 'Slow',
        range: '0',
        target: 'Land with Disease',
        levels: [
          { elements: { Fire: 1, Animal: 1 }, effect: '1 Damage per Disease.' },
          { elements: { Fire: 2, Earth: 1, Animal: 2 }, effect: '2 Damage per Disease. 1 Fear.' },
          { elements: { Fire: 3, Earth: 2, Animal: 3 }, effect: '3 Damage per Disease. 2 Fear. Add 1 Disease.' }
        ]
      }
    ],
    powerSummary: { offense: 4, control: 2, fear: 3, defense: 0, utility: 3 },
    lore: 'Vengeance burns like a plague, spreading from land to land. The Invaders brought destruction; now destruction comes for them.'
  },
  {
    name: "Fractured Days Split the Sky",
    expansion: 'jagged-earth',
    complexity: 'Very High',
    elements: ['Sun', 'Moon', 'Air'],
    themeColor: '#1565C0',
    setup: 'Put 3 Presence on your starting board: 1 in the lowest-numbered land with 1 Dahan, and 2 in the highest-numbered land without Dahan. Deal 4 Minor and 4 Major Powers face-up as your initial "Days That Never Were" cards.',
    playStyle: 'Manipulates time itself. Fractured Days has unique mechanics around Time tokens and a special power card pool. Incredibly complex but can achieve extraordinary effects by bending the flow of time.',
    specialRules: [
      { name: 'Fragments of Shattered Time', description: 'Presence on this ability represents Time. Many Powers require Time as an additional cost. Spend it when you Resolve the Power.' },
      { name: 'Days That Never Were', description: 'Your 3rd Growth option lets you gain any Power Card from a special set created during Setup.' }
    ],
    growthOptions: [
      { label: 'Option A', actions: ['Reclaim Cards', 'Gain 2 Energy'] },
      { label: 'Option B', actions: ['Add a Presence (range 1)', 'Gain Power Card'] },
      { label: 'Option C', actions: ['Gain Power Card from Days That Never Were', 'x3: Gain 1 Time or Gain 2 Energy'] }
    ],
    presenceTracks: [
      { label: 'Energy/Turn', values: [1, 2, 2, 2, 3] },
      { label: 'Card Plays', values: [1, 1, 2, 2, 3] }
    ],
    innatePowers: [
      {
        name: 'Slip the Flow of Time',
        speed: 'Fast',
        target: 'Any Spirit',
        levels: [
          { elements: { Sun: 3, Moon: 1 }, effect: 'Target Spirit may Resolve 1 Slow Power now.' },
          { elements: { Sun: 2, Moon: 2 }, effect: 'Target Spirit may Reclaim 1 Power Card.' },
          { elements: { Sun: 3, Moon: 2 }, effect: 'Target Spirit may play a Power Card by paying its cost.' }
        ]
      },
      {
        name: 'Visions of a Shifting Future',
        speed: 'Fast',
        target: 'Yourself',
        levels: [
          { elements: { Moon: 1, Air: 2 }, effect: 'Look at the top card of the Invader Deck or Event Deck. Return it, then shuffle that deck\'s top 2 cards.' },
          { elements: { Moon: 2, Air: 3 }, effect: 'Instead of returning-and-shuffling, you may put the card on the bottom of its deck.' }
        ]
      }
    ],
    powerSummary: { offense: 1, control: 2, fear: 1, defense: 1, utility: 5 },
    lore: 'Time is not a river but a shattered mirror. Fractured Days sees all possible futures and chooses among them.'
  },
  {
    name: "Starlight Seeks Its Form",
    expansion: 'jagged-earth',
    complexity: 'Very High',
    elements: ['Moon', 'Air', 'Fire', 'Earth'],
    themeColor: '#7B1FA2',
    setup: 'Put 2 Presence on your starting board: 1 in the highest-numbered Mountain, 1 in the highest-numbered Jungle.',
    playStyle: 'A shapeshifter that adapts its strategy each game. Starlight chooses a different elemental focus each game, fundamentally changing how it plays. No two games are alike.',
    specialRules: [
      { name: 'Shifting Form', description: 'During Setup, choose 2 Elements. You gain those Elements every turn as if from a Power Card.' },
      { name: 'Stellar Radiance', description: 'Your Innate Powers change based on your chosen Elements, giving you different abilities each game.' }
    ],
    growthOptions: [
      { label: 'Option A', actions: ['Reclaim Cards', 'Gain Power Card'] },
      { label: 'Option B', actions: ['Add a Presence (range 2)', 'Gain 2 Energy'] }
    ],
    presenceTracks: [
      { label: 'Energy/Turn', values: [0, 1, 2, 2, 3, 4] },
      { label: 'Card Plays', values: [1, 2, 2, 3, 4, 5] }
    ],
    innatePowers: [
      {
        name: 'Shape of the Formless',
        speed: 'Fast',
        range: '1',
        target: 'Any land with your Presence',
        levels: [
          { elements: { Moon: 2, Air: 1 }, effect: 'Effect depends on your chosen Elements.' },
          { elements: { Moon: 3, Air: 2 }, effect: 'Enhanced effect based on chosen Elements.' },
          { elements: { Moon: 4, Air: 3 }, effect: 'Maximum effect based on chosen Elements.' }
        ]
      }
    ],
    powerSummary: { offense: 3, control: 3, fear: 2, defense: 2, utility: 4 },
    lore: 'Starlight falls from the sky without form or purpose, seeking something to become. Each game, it finds a new identity.'
  },

  // ============== HORIZONS ==============
  {
    name: "Devouring Teeth Lurk Underfoot",
    expansion: 'horizons',
    complexity: 'Low',
    elements: ['Moon', 'Earth', 'Animal'],
    themeColor: '#4E342E',
    setup: 'Put 2 Presence on your starting board in the lowest-numbered Jungle.',
    playStyle: 'An ambush predator that strikes from below. Devouring Teeth excels at destroying individual Invaders in lands where they feel safe. Simple but effective at targeted elimination.',
    specialRules: [
      { name: 'Ambush Predator', description: 'Once per turn, when Invaders would Build in a land with your Sacred Site, you may deal 2 Damage in that land first.' }
    ],
    growthOptions: [
      { label: 'Option A', actions: ['Reclaim Cards', 'Gain 1 Energy'] },
      { label: 'Option B', actions: ['Add a Presence (range 1)', 'Gain Power Card'] }
    ],
    presenceTracks: [
      { label: 'Energy/Turn', values: [1, 2, 2, 3, 3, 4] },
      { label: 'Card Plays', values: [2, 2, 3, 3, 4] }
    ],
    innatePowers: [
      {
        name: 'Jaws of the Earth',
        speed: 'Slow',
        range: '0',
        target: 'Land with your Presence',
        levels: [
          { elements: { Moon: 1, Earth: 1, Animal: 1 }, effect: '2 Damage.' },
          { elements: { Moon: 2, Earth: 2, Animal: 1 }, effect: '4 Damage. 1 Fear.' },
          { elements: { Moon: 3, Earth: 2, Animal: 2 }, effect: '6 Damage. 2 Fear.' }
        ]
      }
    ],
    powerSummary: { offense: 4, control: 1, fear: 2, defense: 2, utility: 2 },
    lore: 'Beneath the soil, something waits. It has infinite patience and very, very sharp teeth.'
  },
  {
    name: "Eyes Watch from the Trees",
    expansion: 'horizons',
    complexity: 'Low',
    elements: ['Moon', 'Air', 'Plant'],
    themeColor: '#33691E',
    setup: 'Put 1 Presence on your starting board in the highest-numbered Jungle.',
    playStyle: 'A watchful spirit that generates Fear through observation. Eyes Watch excels at making the Invaders feel watched and unsafe. Good at Fear generation and light control.',
    specialRules: [
      { name: 'Ever-Watchful', description: 'Whenever Invaders Explore into a land with your Sacred Site, generate 1 Fear.' }
    ],
    growthOptions: [
      { label: 'Option A', actions: ['Reclaim Cards', 'Gain Power Card'] },
      { label: 'Option B', actions: ['Add a Presence (range 1)', 'Gain 1 Energy'] }
    ],
    presenceTracks: [
      { label: 'Energy/Turn', values: [0, 1, 1, 2, 2, 3] },
      { label: 'Card Plays', values: [2, 3, 3, 4, 5] }
    ],
    innatePowers: [
      {
        name: 'Unseen Watchers',
        speed: 'Fast',
        range: '1',
        target: 'Any land with Invaders',
        levels: [
          { elements: { Moon: 1, Air: 1 }, effect: '1 Fear.' },
          { elements: { Moon: 2, Air: 1, Plant: 1 }, effect: '2 Fear. Push 1 Explorer.' },
          { elements: { Moon: 3, Air: 2, Plant: 1 }, effect: '3 Fear. Push up to 2 Explorers.' }
        ]
      }
    ],
    powerSummary: { offense: 1, control: 3, fear: 4, defense: 1, utility: 2 },
    lore: 'The trees have eyes. The Invaders can feel them watching, always watching. It drives them to madness.'
  },
  {
    name: "Fathomless Mud of the Swamp",
    expansion: 'horizons',
    complexity: 'Low',
    elements: ['Moon', 'Water', 'Earth'],
    themeColor: '#3E2723',
    setup: 'Put 2 Presence on your starting board in the highest-numbered Wetlands.',
    playStyle: 'Traps Invaders in sticky, bottomless mud. Fathomless Mud excels at slowing down Invaders and preventing them from acting. Simple defensive spirit that buys time for allies.',
    specialRules: [
      { name: 'Quicksand', description: 'Invaders in Wetlands with your Sacred Site have -1 Health (minimum 1).' }
    ],
    growthOptions: [
      { label: 'Option A', actions: ['Reclaim Cards', 'Gain 1 Energy'] },
      { label: 'Option B', actions: ['Add a Presence (range 1, Wetlands)', 'Gain Power Card'] }
    ],
    presenceTracks: [
      { label: 'Energy/Turn', values: [1, 1, 2, 2, 3, 4] },
      { label: 'Card Plays', values: [2, 2, 3, 3, 4] }
    ],
    innatePowers: [
      {
        name: 'Swallow in Mud',
        speed: 'Slow',
        range: '0',
        target: 'Wetlands with your Presence',
        levels: [
          { elements: { Water: 1, Earth: 1 }, effect: 'Defend 3.' },
          { elements: { Moon: 1, Water: 2, Earth: 1 }, effect: 'Defend 5. 1 Damage.' },
          { elements: { Moon: 2, Water: 3, Earth: 2 }, effect: 'Defend 7. 3 Damage. 1 Fear.' }
        ]
      }
    ],
    powerSummary: { offense: 2, control: 3, fear: 1, defense: 4, utility: 2 },
    lore: 'The swamp is patient and hungry. Step into its embrace and you will never step out again.'
  },
  {
    name: "Rising Heat of Stone and Sand",
    expansion: 'horizons',
    complexity: 'Low',
    elements: ['Sun', 'Fire', 'Earth'],
    themeColor: '#E65100',
    setup: 'Put 2 Presence on your starting board: 1 in the lowest-numbered Sands, 1 in the lowest-numbered Mountain.',
    playStyle: 'Burns Invaders with desert heat. Rising Heat deals consistent damage through heat and fire. Simple and straightforward offensive spirit.',
    specialRules: [
      { name: 'Scorching Heat', description: 'During each Invader Phase, deal 1 Damage in each land with your Sacred Site that has Sands or Mountain terrain.' }
    ],
    growthOptions: [
      { label: 'Option A', actions: ['Reclaim Cards', 'Gain 1 Energy'] },
      { label: 'Option B', actions: ['Add a Presence (range 1)', 'Gain Power Card'] }
    ],
    presenceTracks: [
      { label: 'Energy/Turn', values: [1, 2, 2, 3, 3, 4] },
      { label: 'Card Plays', values: [2, 2, 3, 3, 4] }
    ],
    innatePowers: [
      {
        name: 'Waves of Heat',
        speed: 'Slow',
        range: '0',
        target: 'Sands or Mountain with your Presence',
        levels: [
          { elements: { Sun: 1, Fire: 1 }, effect: '1 Damage. 1 Fear.' },
          { elements: { Sun: 2, Fire: 2, Earth: 1 }, effect: '2 Damage. 2 Fear.' },
          { elements: { Sun: 3, Fire: 3, Earth: 1 }, effect: '4 Damage. 3 Fear. Push 1 Town.' }
        ]
      }
    ],
    powerSummary: { offense: 4, control: 1, fear: 3, defense: 1, utility: 1 },
    lore: 'The heat rises from the stone and sand, shimmering and deadly. The Invaders wilt under its relentless assault.'
  },
  {
    name: "Sun-Bright Whirlwind",
    expansion: 'horizons',
    complexity: 'Low',
    elements: ['Sun', 'Fire', 'Air'],
    themeColor: '#FFB300',
    setup: 'Put 1 Presence on your starting board in the highest-numbered Sands.',
    playStyle: 'A fast-moving spirit of wind and light. Sun-Bright Whirlwind excels at pushing Invaders around and dealing damage across multiple lands. Very mobile and aggressive.',
    specialRules: [
      { name: 'Dazzling Winds', description: 'When you Push Invaders, you may also generate 1 Fear per land you Push from.' }
    ],
    growthOptions: [
      { label: 'Option A', actions: ['Reclaim Cards', 'Gain Power Card'] },
      { label: 'Option B', actions: ['Add a Presence (range 2)', 'Gain 1 Energy'] }
    ],
    presenceTracks: [
      { label: 'Energy/Turn', values: [0, 1, 1, 2, 3, 4] },
      { label: 'Card Plays', values: [2, 3, 3, 4, 5] }
    ],
    innatePowers: [
      {
        name: 'Blazing Gale',
        speed: 'Fast',
        range: '1',
        target: 'Any land',
        levels: [
          { elements: { Sun: 1, Air: 1 }, effect: 'Push 1 Explorer.' },
          { elements: { Sun: 2, Fire: 1, Air: 2 }, effect: 'Push up to 2 Explorers/Towns. 1 Damage.' },
          { elements: { Sun: 3, Fire: 2, Air: 3 }, effect: 'Push up to 3 Invaders. 2 Damage. 1 Fear.' }
        ]
      }
    ],
    powerSummary: { offense: 3, control: 4, fear: 2, defense: 0, utility: 2 },
    lore: 'The whirlwind dances across the island, bright as the sun and fierce as fire. It sweeps away all in its path.'
  },

  // ============== NATURE INCARNATE ==============
  {
    name: "Ember-Eyed Behemoth",
    expansion: 'nature-incarnate',
    complexity: 'Moderate',
    elements: ['Sun', 'Fire', 'Earth'],
    themeColor: '#D84315',
    setup: 'Put 2 Presence on your starting board in the lowest-numbered Mountain.',
    playStyle: 'A massive creature that tramples Invaders underfoot. Ember-Eyed Behemoth is a straightforward offensive spirit that deals heavy damage in concentrated areas. Its size makes it slow but devastating.',
    specialRules: [
      { name: 'Titanic Stride', description: 'When you Add Presence, you may move 1 existing Presence to an adjacent land.' }
    ],
    growthOptions: [
      { label: 'Option A', actions: ['Reclaim Cards', 'Gain 2 Energy'] },
      { label: 'Option B', actions: ['Add a Presence (range 1)', 'Gain Power Card'] }
    ],
    presenceTracks: [
      { label: 'Energy/Turn', values: [2, 3, 3, 4, 5, 6] },
      { label: 'Card Plays', values: [1, 2, 2, 3, 3] }
    ],
    innatePowers: [
      {
        name: 'Crushing Footfall',
        speed: 'Slow',
        range: '0',
        target: 'Land with your Presence',
        levels: [
          { elements: { Sun: 1, Fire: 1, Earth: 1 }, effect: '2 Damage. 1 Fear.' },
          { elements: { Sun: 2, Fire: 2, Earth: 2 }, effect: '4 Damage. 2 Fear. Destroy 1 Town.' },
          { elements: { Sun: 3, Fire: 3, Earth: 3 }, effect: '6 Damage. 3 Fear. Destroy 1 City.' }
        ]
      }
    ],
    powerSummary: { offense: 5, control: 1, fear: 3, defense: 1, utility: 1 },
    lore: 'The Behemoth stirs, its ember eyes glowing in the darkness. Each step shakes the earth and crushes everything beneath.'
  },
  {
    name: "Hearth-Vigil",
    expansion: 'nature-incarnate',
    complexity: 'Moderate',
    elements: ['Sun', 'Fire', 'Plant'],
    themeColor: '#F57F17',
    setup: 'Put 2 Presence on your starting board: 1 in the highest-numbered Jungle, 1 in a land with Dahan.',
    playStyle: 'A protective spirit of home and hearth. Hearth-Vigil excels at defending Dahan settlements and nurturing the land. It provides warmth and safety in the face of invasion.',
    specialRules: [
      { name: 'Warm Hearth', description: 'Dahan in lands with your Sacred Site have +1 Health.' }
    ],
    growthOptions: [
      { label: 'Option A', actions: ['Reclaim Cards', 'Gain Power Card'] },
      { label: 'Option B', actions: ['Add a Presence (range 1, land with Dahan)', 'Gain 2 Energy'] }
    ],
    presenceTracks: [
      { label: 'Energy/Turn', values: [1, 2, 2, 3, 4, 5] },
      { label: 'Card Plays', values: [2, 2, 3, 3, 4] }
    ],
    innatePowers: [
      {
        name: 'Protective Flames',
        speed: 'Fast',
        range: '1',
        target: 'Land with Dahan',
        levels: [
          { elements: { Sun: 1, Fire: 1 }, effect: 'Defend 2.' },
          { elements: { Sun: 2, Fire: 1, Plant: 1 }, effect: 'Defend 4. 1 Fear.' },
          { elements: { Sun: 3, Fire: 2, Plant: 2 }, effect: 'Defend 6. 2 Fear. Each Dahan deals +1 Damage.' }
        ]
      }
    ],
    powerSummary: { offense: 2, control: 1, fear: 2, defense: 4, utility: 3 },
    lore: 'The hearth fire burns steadily, a beacon of warmth and safety. As long as it burns, the Dahan will not fall.'
  },
  {
    name: "Towering Roots of the Jungle",
    expansion: 'nature-incarnate',
    complexity: 'Moderate',
    elements: ['Sun', 'Water', 'Earth', 'Plant'],
    themeColor: '#2E7D32',
    setup: 'Put 2 Presence on your starting board in the highest-numbered Jungle.',
    playStyle: 'An ancient tree spirit with deep roots that connect the entire island. Towering Roots excels at defense and support, using its vast root network to protect and nurture.',
    specialRules: [
      { name: 'Deep Roots', description: 'Your Presence in Jungle counts as a Sacred Site. You may use Powers targeting your Sacred Sites at +1 Range.' }
    ],
    growthOptions: [
      { label: 'Option A', actions: ['Reclaim Cards', 'Gain 1 Energy'] },
      { label: 'Option B', actions: ['Add a Presence (range 1, Jungle)', 'Gain Power Card', 'Gain 1 Energy'] }
    ],
    presenceTracks: [
      { label: 'Energy/Turn', values: [1, 2, 2, 3, 3, 4, 5] },
      { label: 'Card Plays', values: [2, 2, 3, 3, 4] }
    ],
    innatePowers: [
      {
        name: 'Sheltering Canopy',
        speed: 'Fast',
        range: '0',
        target: 'Jungle with your Presence',
        levels: [
          { elements: { Sun: 1, Plant: 2 }, effect: 'Defend 3.' },
          { elements: { Sun: 2, Water: 1, Plant: 3 }, effect: 'Defend 5. Remove 1 Blight.' },
          { elements: { Sun: 3, Water: 1, Earth: 1, Plant: 4 }, effect: 'Defend 7. Remove 1 Blight. 2 Damage.' }
        ]
      }
    ],
    powerSummary: { offense: 1, control: 2, fear: 1, defense: 5, utility: 4 },
    lore: 'The great trees of the jungle have stood for millennia. Their roots run deep, connecting all life on the island in an ancient network.'
  },
  {
    name: "Breath of Darkness Down Your Spine",
    expansion: 'nature-incarnate',
    complexity: 'High',
    elements: ['Moon', 'Air'],
    themeColor: '#263238',
    setup: 'Put 1 Presence on your starting board in the highest-numbered Mountain.',
    playStyle: 'A terrifying spirit of primal fear. Breath of Darkness generates enormous amounts of Fear and can paralyze Invaders with sheer terror. Works best when the Invaders are already afraid.',
    specialRules: [
      { name: 'Creeping Dread', description: 'Whenever you generate Fear in a land, Invaders there cannot take actions until the next Invader Phase.' }
    ],
    growthOptions: [
      { label: 'Option A', actions: ['Reclaim Cards', 'Gain Power Card'] },
      { label: 'Option B', actions: ['Add a Presence (range 2)', 'Gain 2 Energy'] }
    ],
    presenceTracks: [
      { label: 'Energy/Turn', values: [0, 1, 1, 2, 3, 4] },
      { label: 'Card Plays', values: [2, 3, 3, 4, 5, 6] }
    ],
    innatePowers: [
      {
        name: 'Paralyzing Terror',
        speed: 'Fast',
        range: '1',
        target: 'Any land with Invaders',
        levels: [
          { elements: { Moon: 2, Air: 1 }, effect: '2 Fear.' },
          { elements: { Moon: 3, Air: 2 }, effect: '4 Fear. Push 1 Explorer.' },
          { elements: { Moon: 4, Air: 3 }, effect: '6 Fear. Push up to 2 Explorers/Towns.' }
        ]
      }
    ],
    powerSummary: { offense: 0, control: 3, fear: 5, defense: 2, utility: 2 },
    lore: 'Something breathes in the darkness, cold and terrible. The Invaders feel it on their necks and know true fear.'
  },
  {
    name: "Relentless Gaze of the Sun",
    expansion: 'nature-incarnate',
    complexity: 'High',
    elements: ['Sun', 'Fire'],
    themeColor: '#FF6F00',
    setup: 'Put 2 Presence on your starting board: 1 in the highest-numbered Sands, 1 in the highest-numbered Mountain.',
    playStyle: 'A scorching spirit of relentless sunlight. Relentless Gaze deals persistent damage to Invaders who cannot escape its burning attention. Excels at sustained pressure.',
    specialRules: [
      { name: 'Burning Focus', description: 'Choose 1 land with your Presence each turn. That land takes 1 Damage during each Invader action (Explore, Build, Ravage).' }
    ],
    growthOptions: [
      { label: 'Option A', actions: ['Reclaim Cards', 'Gain 2 Energy'] },
      { label: 'Option B', actions: ['Add a Presence (range 1)', 'Gain Power Card'] }
    ],
    presenceTracks: [
      { label: 'Energy/Turn', values: [1, 2, 3, 3, 4, 5] },
      { label: 'Card Plays', values: [2, 2, 3, 3, 4] }
    ],
    innatePowers: [
      {
        name: 'Searing Brilliance',
        speed: 'Slow',
        range: '1',
        target: 'Any land',
        levels: [
          { elements: { Sun: 2, Fire: 1 }, effect: '2 Damage. 1 Fear.' },
          { elements: { Sun: 3, Fire: 2 }, effect: '3 Damage. 2 Fear.' },
          { elements: { Sun: 4, Fire: 3 }, effect: '5 Damage. 3 Fear. Destroy 1 Town.' }
        ]
      }
    ],
    powerSummary: { offense: 5, control: 1, fear: 3, defense: 0, utility: 1 },
    lore: 'The sun sees everything and forgets nothing. Its gaze burns hotter and hotter until nothing remains but ash.'
  },
  {
    name: "Wandering Voice Keens Delirium",
    expansion: 'nature-incarnate',
    complexity: 'High',
    elements: ['Moon', 'Air'],
    themeColor: '#4A148C',
    setup: 'Put 1 Presence on your starting board in the highest-numbered Sands.',
    playStyle: 'Drives Invaders mad with haunting cries. Wandering Voice uses psychological warfare to confuse and scatter Invaders. Excellent at disrupting Invader plans and generating Fear.',
    specialRules: [
      { name: 'Maddening Wail', description: 'When you Push Invaders, they deal 1 Damage to each other in their destination land.' }
    ],
    growthOptions: [
      { label: 'Option A', actions: ['Reclaim Cards', 'Gain Power Card'] },
      { label: 'Option B', actions: ['Add a Presence (range 2)', 'Gain 1 Energy'] }
    ],
    presenceTracks: [
      { label: 'Energy/Turn', values: [0, 1, 1, 2, 2, 3] },
      { label: 'Card Plays', values: [2, 3, 3, 4, 5, 6] }
    ],
    innatePowers: [
      {
        name: 'Keening Delirium',
        speed: 'Fast',
        range: '1',
        target: 'Any land with Invaders',
        levels: [
          { elements: { Moon: 1, Air: 1 }, effect: '1 Fear. Push 1 Explorer.' },
          { elements: { Moon: 2, Air: 2 }, effect: '2 Fear. Push up to 2 Explorers/Towns.' },
          { elements: { Moon: 3, Air: 3 }, effect: '4 Fear. Push up to 3 Invaders. 1 Damage to each Invader.' }
        ]
      }
    ],
    powerSummary: { offense: 2, control: 4, fear: 4, defense: 0, utility: 2 },
    lore: 'A voice wanders the island, keening and wailing. Those who hear it lose their minds, stumbling blindly into danger.'
  },
  {
    name: "Wounded Waters Bleeding",
    expansion: 'nature-incarnate',
    complexity: 'High',
    elements: ['Moon', 'Water', 'Earth', 'Animal'],
    themeColor: '#880E4F',
    setup: 'Put 2 Presence on your starting board in the highest-numbered Wetlands. Add 1 Blight to that land.',
    playStyle: 'A corrupted water spirit seeking vengeance for the damage done to its waters. Wounded Waters grows stronger from Blight, turning the Invaders\' destruction against them.',
    specialRules: [
      { name: 'Wounded but Not Broken', description: 'You gain +1 Energy per turn for each Blight in lands with your Presence (max +3).' }
    ],
    growthOptions: [
      { label: 'Option A', actions: ['Reclaim Cards', 'Gain Power Card'] },
      { label: 'Option B', actions: ['Add a Presence (range 1)', 'Gain 2 Energy'] }
    ],
    presenceTracks: [
      { label: 'Energy/Turn', values: [0, 1, 1, 2, 3, 4] },
      { label: 'Card Plays', values: [2, 2, 3, 3, 4, 5] }
    ],
    innatePowers: [
      {
        name: 'Tainted Flood',
        speed: 'Slow',
        range: '1',
        target: 'Any land',
        levels: [
          { elements: { Moon: 1, Water: 2 }, effect: '1 Damage per Blight in or adjacent to target land.' },
          { elements: { Moon: 2, Water: 3, Earth: 1 }, effect: '2 Damage per Blight. 1 Fear.' },
          { elements: { Moon: 3, Water: 4, Earth: 1, Animal: 1 }, effect: '3 Damage per Blight. 2 Fear. Push all Explorers.' }
        ]
      }
    ],
    powerSummary: { offense: 4, control: 2, fear: 2, defense: 1, utility: 3 },
    lore: 'The waters bleed, poisoned by the Invaders\' greed. But even wounded, they are dangerous — perhaps more so than ever.'
  },
  {
    name: "Dances Up Earthquakes",
    expansion: 'nature-incarnate',
    complexity: 'Very High',
    elements: ['Moon', 'Fire', 'Earth'],
    themeColor: '#4E342E',
    setup: 'Put 2 Presence on your starting board: 1 in the lowest-numbered Mountain, 1 in the highest-numbered Sands.',
    playStyle: 'Reshapes the land with seismic power. Dances Up Earthquakes can literally change the terrain of the island, creating mountains where there were plains and opening chasms beneath Invader settlements.',
    specialRules: [
      { name: 'Tectonic Dance', description: 'Once per turn, you may change the terrain type of a land with your Sacred Site to Mountain or Sands.' },
      { name: 'Seismic Resonance', description: 'When you deal Damage in a Mountain, deal +1 Damage.' }
    ],
    growthOptions: [
      { label: 'Option A', actions: ['Reclaim Cards', 'Gain 2 Energy'] },
      { label: 'Option B', actions: ['Add a Presence (range 1)', 'Gain Power Card'] },
      { label: 'Option C', actions: ['Add a Presence (range 0)', 'Add a Presence (range 0)', 'Gain 1 Energy'] }
    ],
    presenceTracks: [
      { label: 'Energy/Turn', values: [1, 2, 3, 4, 5, 6] },
      { label: 'Card Plays', values: [1, 2, 2, 3, 3] }
    ],
    innatePowers: [
      {
        name: 'Earthquake',
        speed: 'Slow',
        range: '0',
        target: 'Land with your Presence',
        levels: [
          { elements: { Moon: 1, Fire: 1, Earth: 2 }, effect: '2 Damage. 1 Fear.' },
          { elements: { Moon: 2, Fire: 2, Earth: 3 }, effect: '4 Damage. 2 Fear. Destroy 1 Town.' },
          { elements: { Moon: 3, Fire: 3, Earth: 4 }, effect: '7 Damage. 4 Fear. Destroy 1 City. Add 1 Blight.' }
        ]
      }
    ],
    powerSummary: { offense: 5, control: 2, fear: 3, defense: 0, utility: 3 },
    lore: 'The earth dances to an ancient rhythm. When the dance reaches its crescendo, mountains rise and cities fall.'
  }
];

/** Helper to get a spirit detail by name */
export function getSpiritDetail(name: string): SpiritDetail | undefined {
  return SPIRIT_DETAILS.find(s => s.name === name);
}

/** Element emoji/icon mapping */
export const ELEMENT_ICONS: Record<string, string> = {
  Sun: '☀️',
  Moon: '🌙',
  Fire: '🔥',
  Air: '💨',
  Water: '💧',
  Earth: '⛰️',
  Plant: '🌿',
  Animal: '🐾',
};
