/**
 * Final Girl Game Data
 * Complete data for the Final Girl board game companion
 */

// ─── Types ──────────────────────────────────────────────────────────────────

export type Series = 'series1' | 'series2' | 'series3' | 'series4' | 'special';

export interface FeatureFilm {
  id: string;
  name: string;
  series: Series;
  killer: Killer;
  location: Location;
  finalGirls: string[];
  theme: string;
  description: string;
  horrorInspiration: string;
}

export interface Killer {
  id: string;
  name: string;
  title: string;
  health: number;
  startingHorror: number;
  description: string;
  darkPower: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme';
}

export interface Location {
  id: string;
  name: string;
  description: string;
  searchSpaces: number;
  exitSpaces: number;
  specialRules: string;
}

export interface FinalGirlCharacter {
  id: string;
  name: string;
  health: number;
  ultimateAbility: string;
  specialAbility: string;
  fromFilm: string;
}

export interface FGSessionData {
  id: string;
  date: string;
  result: 'win' | 'loss' | 'in-progress';
  killer: string;
  location: string;
  finalGirl: string;
  turnCount: number;
  victimsKilled: number;
  victimsSaved: number;
  finaleRevealed: boolean;
  darkPowerRevealed: boolean;
  notes: string;
  difficulty: string;
  featureFilms: string[];
  // Scoring fields
  score?: number;
  scoreRank?: string;
  healthRemaining?: number;
  maxHealth?: number;
  usedFinalHealthToken?: boolean;
  totalVictims?: number;
  itemsUsed?: number;
  horrorLevel?: number;
}

// ─── Feature Films ──────────────────────────────────────────────────────────

export const FEATURE_FILMS: FeatureFilm[] = [
  // Series 1
  {
    id: 'happy-trails',
    name: 'The Happy Trails Horror',
    series: 'series1',
    killer: {
      id: 'hans',
      name: 'Hans',
      title: 'The Butcher',
      health: 12,
      startingHorror: 4,
      description: 'A hulking, machete-wielding maniac who stalks the campgrounds, slaughtering anyone in his path.',
      darkPower: 'Relentless Pursuit — Hans gains additional movement after killing a victim.',
      difficulty: 'easy',
    },
    location: {
      id: 'camp-happy-trails',
      name: 'Camp Happy Trails',
      description: 'A remote summer camp deep in the woods with cabins, a lake, and winding trails.',
      searchSpaces: 3,
      exitSpaces: 2,
      specialRules: 'The Lake space cannot hold items or tokens.',
    },
    finalGirls: ['Laurie', 'Adelaide'],
    theme: 'Summer camp slasher',
    description: 'A classic summer camp slasher where Hans the Butcher terrorizes counselors at Camp Happy Trails.',
    horrorInspiration: 'Friday the 13th',
  },
  {
    id: 'creech-manor',
    name: 'The Haunting of Creech Manor',
    series: 'series1',
    killer: {
      id: 'poltergeist',
      name: 'The Poltergeist',
      title: 'The Restless Spirit',
      health: 10,
      startingHorror: 5,
      description: 'An invisible supernatural force that terrorizes the inhabitants of Creech Manor, possessing objects and people.',
      darkPower: 'Possession — The Poltergeist can possess victims, turning them against the Final Girl.',
      difficulty: 'medium',
    },
    location: {
      id: 'creech-manor',
      name: 'Creech Manor',
      description: 'A sprawling haunted mansion with secret passages, a basement, and an attic filled with dark secrets.',
      searchSpaces: 4,
      exitSpaces: 2,
      specialRules: 'Secret passages connect distant rooms.',
    },
    finalGirls: ['Nancy', 'Asami'],
    theme: 'Haunted house',
    description: 'A supernatural haunting in a decrepit Victorian mansion where the Poltergeist manipulates the environment.',
    horrorInspiration: 'Poltergeist / The Haunting',
  },
  {
    id: 'slaughter-groves',
    name: 'Slaughter in the Groves',
    series: 'series1',
    killer: {
      id: 'inkanyamba',
      name: 'Inkanyamba',
      title: 'The Avenger',
      health: 14,
      startingHorror: 3,
      description: 'A massive serpentine creature from African mythology that has awakened to punish those who desecrate its sacred land.',
      darkPower: 'Constrict — Inkanyamba can trap the Final Girl, preventing movement.',
      difficulty: 'hard',
    },
    location: {
      id: 'sacred-groves',
      name: 'The Sacred Groves',
      description: 'An ancient forest with sacred shrines, hidden caves, and a river that runs through the heart of the wilderness.',
      searchSpaces: 3,
      exitSpaces: 3,
      specialRules: 'The river spaces slow movement.',
    },
    finalGirls: ['Amara', 'Kailey'],
    theme: 'Creature feature / folk horror',
    description: 'A mythological creature awakens in sacred groves to punish trespassers who have disturbed its domain.',
    horrorInspiration: 'Anaconda / folk horror',
  },
  {
    id: 'carnage-carnival',
    name: 'Carnage at the Carnival',
    series: 'series1',
    killer: {
      id: 'geppetto',
      name: 'Geppetto',
      title: 'The Puppetmaster',
      health: 10,
      startingHorror: 4,
      description: 'A deranged puppeteer who controls deadly marionettes and uses the carnival as his twisted playground.',
      darkPower: 'Puppet Army — Geppetto deploys additional puppet minions across the carnival.',
      difficulty: 'medium',
    },
    location: {
      id: 'carnival-of-blood',
      name: 'Carnival of Blood',
      description: 'A twisted carnival with a funhouse, ferris wheel, and tent of horrors. Every attraction hides a deadly surprise.',
      searchSpaces: 4,
      exitSpaces: 2,
      specialRules: 'Puppet minions patrol designated spaces.',
    },
    finalGirls: ['Alice', 'Selena'],
    theme: 'Evil carnival / puppets',
    description: 'A mad puppeteer turns a carnival into a house of horrors, controlling deadly marionettes to hunt victims.',
    horrorInspiration: 'Puppet Master / Killer Klowns',
  },
  {
    id: 'frightmare-maple',
    name: 'Frightmare on Maple Lane',
    series: 'series1',
    killer: {
      id: 'dr-fright',
      name: 'Dr. Fright',
      title: 'The Dream Doctor',
      health: 11,
      startingHorror: 5,
      description: 'A nightmare entity that invades dreams and manifests terrors in the waking world.',
      darkPower: 'Nightmare Realm — Dr. Fright can pull the Final Girl into a dream dimension.',
      difficulty: 'hard',
    },
    location: {
      id: 'maple-lane',
      name: 'Maple Lane',
      description: 'A quiet suburban neighborhood where the boundary between dreams and reality has shattered.',
      searchSpaces: 3,
      exitSpaces: 2,
      specialRules: 'Dream spaces have altered rules for movement and combat.',
    },
    finalGirls: ['Barbara', 'Reiko'],
    theme: 'Dream horror / supernatural',
    description: 'A nightmare entity haunts a suburban neighborhood, blurring the line between dreams and deadly reality.',
    horrorInspiration: 'A Nightmare on Elm Street',
  },

  // Series 2
  {
    id: 'into-the-void',
    name: 'Into the Void',
    series: 'series2',
    killer: {
      id: 'evomorph',
      name: 'The Evomorph',
      title: 'The Perfect Organism',
      health: 13,
      startingHorror: 4,
      description: 'A rapidly evolving alien creature that adapts to threats and grows more dangerous with each kill.',
      darkPower: 'Evolution — The Evomorph gains new abilities as it feeds.',
      difficulty: 'hard',
    },
    location: {
      id: 'uss-konrad',
      name: 'USS Konrad',
      description: 'A deep-space vessel drifting through the void. Cramped corridors, airlocks, and a failing life support system.',
      searchSpaces: 3,
      exitSpaces: 1,
      specialRules: 'Airlocks can be used to eject the creature but risk depressurization.',
    },
    finalGirls: ['Ripley', 'Sigourney'],
    theme: 'Sci-fi horror / alien',
    description: 'An alien organism hunts the crew of a deep-space vessel, evolving with each kill into a more perfect predator.',
    horrorInspiration: 'Alien',
  },
  {
    id: 'panic-station',
    name: 'Panic at Station 2891',
    series: 'series2',
    killer: {
      id: 'organism',
      name: 'The Organism',
      title: 'The Shape-Shifter',
      health: 11,
      startingHorror: 5,
      description: 'A parasitic life form that can perfectly imitate any living thing, sowing paranoia and distrust.',
      darkPower: 'Assimilation — The Organism can disguise itself as victims.',
      difficulty: 'extreme',
    },
    location: {
      id: 'station-2891',
      name: 'Station 2891',
      description: 'An isolated arctic research station cut off from civilization. Blizzards rage outside while terror lurks within.',
      searchSpaces: 3,
      exitSpaces: 1,
      specialRules: 'Victims may be secretly assimilated.',
    },
    finalGirls: ['MacReady', 'Childs'],
    theme: 'Paranoia / body horror',
    description: 'A shape-shifting organism infiltrates an arctic research station, and anyone could already be infected.',
    horrorInspiration: 'The Thing',
  },
  {
    id: 'knock-at-door',
    name: 'A Knock at the Door',
    series: 'series2',
    killer: {
      id: 'intruders',
      name: 'The Intruders',
      title: 'The Masked Strangers',
      health: 9,
      startingHorror: 4,
      description: 'Three masked home invaders who terrorize a family in their isolated cottage with sadistic games.',
      darkPower: 'Coordinated Attack — The Intruders split up and attack from multiple directions.',
      difficulty: 'medium',
    },
    location: {
      id: 'wingard-cottage',
      name: 'Wingard Cottage',
      description: 'A remote countryside cottage surrounded by dark woods. Limited exits and nowhere to hide.',
      searchSpaces: 3,
      exitSpaces: 2,
      specialRules: 'Multiple killer tokens represent the three intruders.',
    },
    finalGirls: ['Erin', 'Kristen'],
    theme: 'Home invasion',
    description: 'Three masked strangers lay siege to an isolated cottage, turning a quiet evening into a fight for survival.',
    horrorInspiration: 'The Strangers / You\'re Next',
  },
  {
    id: 'full-moon',
    name: 'Once Upon a Full Moon',
    series: 'series2',
    killer: {
      id: 'big-bad-wolf',
      name: 'The Big Bad Wolf',
      title: 'The Beast',
      health: 12,
      startingHorror: 3,
      description: 'A massive werewolf that prowls enchanted woods under the full moon, hunting anything that moves.',
      darkPower: 'Feral Rage — The Wolf becomes faster and more aggressive as it feeds.',
      difficulty: 'medium',
    },
    location: {
      id: 'storybook-woods',
      name: 'Storybook Woods',
      description: 'A dark enchanted forest where fairy tales have turned deadly. Twisted paths lead to cottages and clearings.',
      searchSpaces: 4,
      exitSpaces: 3,
      specialRules: 'Moonlight spaces increase the Wolf\'s power.',
    },
    finalGirls: ['Red', 'Gretel'],
    theme: 'Dark fairy tale / werewolf',
    description: 'A monstrous wolf terrorizes an enchanted forest, turning beloved fairy tales into nightmares.',
    horrorInspiration: 'The Company of Wolves / Ginger Snaps',
  },
  {
    id: 'madness-dark',
    name: 'Madness in the Dark',
    series: 'series2',
    killer: {
      id: 'ratchet-lady',
      name: 'The Ratchet Lady',
      title: 'The Warden',
      health: 10,
      startingHorror: 5,
      description: 'A sadistic asylum warden who conducts twisted experiments on patients in the depths of Wolfe Asylum.',
      darkPower: 'Lobotomy — The Ratchet Lady can permanently weaken the Final Girl.',
      difficulty: 'hard',
    },
    location: {
      id: 'wolfe-asylum',
      name: 'Wolfe Asylum',
      description: 'A crumbling psychiatric institution with padded cells, an operating theater, and underground tunnels.',
      searchSpaces: 3,
      exitSpaces: 2,
      specialRules: 'Locked doors require keys or special actions to open.',
    },
    finalGirls: ['Clarice', 'Sidney'],
    theme: 'Asylum horror / psychological',
    description: 'A deranged warden torments patients in a decrepit asylum where madness and reality blur together.',
    horrorInspiration: 'One Flew Over the Cuckoo\'s Nest / Asylum horror',
  },

  // Special Feature
  {
    id: 'north-pole',
    name: 'North Pole Nightmare',
    series: 'special',
    killer: {
      id: 'krampus',
      name: 'Krampus',
      title: 'The Christmas Devil',
      health: 13,
      startingHorror: 4,
      description: 'The anti-Santa who punishes the naughty with chains, birch switches, and a bottomless sack.',
      darkPower: 'Naughty List — Krampus targets specific victims with enhanced attacks.',
      difficulty: 'hard',
    },
    location: {
      id: 'north-pole-village',
      name: 'North Pole Village',
      description: 'A festive Christmas village turned into a frozen hellscape as Krampus terrorizes its inhabitants.',
      searchSpaces: 3,
      exitSpaces: 2,
      specialRules: 'Snow drifts slow movement in outdoor spaces.',
    },
    finalGirls: ['Holly', 'Noelle'],
    theme: 'Holiday horror',
    description: 'Krampus descends upon a Christmas village, punishing everyone on his naughty list with brutal efficiency.',
    horrorInspiration: 'Krampus / Black Christmas',
  },

  // Series 3
  {
    id: 'killer-tomorrow',
    name: 'The Killer from Tomorrow',
    series: 'series3',
    killer: {
      id: 'hunter',
      name: 'The H.U.N.T.E.R.',
      title: 'The Machine',
      health: 14,
      startingHorror: 3,
      description: 'A cybernetic killing machine sent from the future, relentless and nearly indestructible.',
      darkPower: 'Targeting System — The H.U.N.T.E.R. always knows where the Final Girl is.',
      difficulty: 'extreme',
    },
    location: {
      id: 'sunnydaze-mall',
      name: 'Sunnydaze Mall',
      description: 'A sprawling 1980s shopping mall with multiple floors, stores, and a food court. Neon lights flicker ominously.',
      searchSpaces: 5,
      exitSpaces: 3,
      specialRules: 'Escalators provide quick movement between floors.',
    },
    finalGirls: ['Sarah', 'Cameron'],
    theme: 'Sci-fi slasher / terminator',
    description: 'A cybernetic assassin from the future hunts its target through a retro shopping mall.',
    horrorInspiration: 'The Terminator',
  },
  {
    id: 'hell-to-pay',
    name: 'Hell to Pay',
    series: 'series3',
    killer: {
      id: 'razorface',
      name: 'Razorface',
      title: 'The Cenobite',
      health: 12,
      startingHorror: 5,
      description: 'A demon from a hellish dimension who delights in pain and suffering, summoned by a cursed puzzle box.',
      darkPower: 'Chains of Hell — Razorface summons chains that immobilize victims.',
      difficulty: 'extreme',
    },
    location: {
      id: 'hellscape',
      name: 'Hellscape',
      description: 'A nightmarish dimension of endless corridors, torture chambers, and impossible geometry.',
      searchSpaces: 2,
      exitSpaces: 1,
      specialRules: 'Reality shifts — spaces may change connections between turns.',
    },
    finalGirls: ['Kirsty', 'Joey'],
    theme: 'Demonic / hellraiser',
    description: 'A demon from a hellish dimension has been unleashed, and the only escape is to solve the puzzle that summoned it.',
    horrorInspiration: 'Hellraiser',
  },
  {
    id: 'falconwood-files',
    name: 'The Falconwood Files',
    series: 'series3',
    killer: {
      id: 'slayer',
      name: 'Slayer',
      title: 'The Hunter',
      health: 11,
      startingHorror: 4,
      description: 'A masked hunter who stalks prey through the wilderness, using traps and superior tracking skills.',
      darkPower: 'Trap Master — Slayer places deadly traps across the location.',
      difficulty: 'medium',
    },
    location: {
      id: 'falconwood',
      name: 'Falconwood',
      description: 'A dense forest preserve with hiking trails, a ranger station, and hidden hunting blinds.',
      searchSpaces: 4,
      exitSpaces: 3,
      specialRules: 'Traps are placed in random spaces at setup.',
    },
    finalGirls: ['Dana', 'Jules'],
    theme: 'Survival horror / hunting',
    description: 'A deadly hunter stalks victims through a remote forest, using traps and cunning to corner prey.',
    horrorInspiration: 'Predator / The Hunt',
  },
  {
    id: 'marrek-murders',
    name: 'The Marrek Murders',
    series: 'series3',
    killer: {
      id: 'tormentor',
      name: 'The Tormentor',
      title: 'The Sadist',
      health: 10,
      startingHorror: 5,
      description: 'A methodical serial killer who captures victims and subjects them to elaborate, sadistic games.',
      darkPower: 'Saw Trap — The Tormentor activates deadly traps that victims must escape.',
      difficulty: 'hard',
    },
    location: {
      id: 'marrek-warehouse',
      name: 'Marrek Warehouse',
      description: 'An abandoned industrial warehouse converted into a maze of deadly traps and torture devices.',
      searchSpaces: 3,
      exitSpaces: 1,
      specialRules: 'Trap rooms must be disarmed before passing through safely.',
    },
    finalGirls: ['Amanda', 'Lynn'],
    theme: 'Torture / trap horror',
    description: 'A sadistic killer has turned an abandoned warehouse into a deadly maze of traps and games.',
    horrorInspiration: 'Saw / Hostel',
  },
  {
    id: 'dont-make-sound',
    name: "Don't Make a Sound",
    series: 'series3',
    killer: {
      id: 'eyeless',
      name: 'The Eyeless',
      title: 'The Listener',
      health: 11,
      startingHorror: 4,
      description: 'Blind creatures that hunt by sound alone. Any noise draws their lethal attention.',
      darkPower: 'Echolocation — The Eyeless can detect movement across the entire location.',
      difficulty: 'hard',
    },
    location: {
      id: 'utopia',
      name: 'Utopia',
      description: 'A once-thriving community now silent and abandoned, where every sound could mean death.',
      searchSpaces: 4,
      exitSpaces: 2,
      specialRules: 'Noise tokens attract the Killer. Some actions generate noise.',
    },
    finalGirls: ['Evelyn', 'Regan'],
    theme: 'Silence horror / creature',
    description: 'Blind creatures hunt by sound in an abandoned community. Silence is the only way to survive.',
    horrorInspiration: 'A Quiet Place',
  },

  // Series 4
  {
    id: 'bad-times-buddyland',
    name: 'Bad Times at Buddyland',
    series: 'series4',
    killer: {
      id: 'billy',
      name: 'Billy',
      title: 'The Animatronic',
      health: 13,
      startingHorror: 4,
      description: 'A malfunctioning animatronic mascot that has become a murderous machine, stalking the theme park after hours.',
      darkPower: 'System Override — Billy activates other animatronics as minions.',
      difficulty: 'medium',
    },
    location: {
      id: 'buddyland',
      name: 'Buddyland',
      description: 'A children\'s theme park after closing time. Dark rides, arcade halls, and backstage areas hide deadly secrets.',
      searchSpaces: 4,
      exitSpaces: 2,
      specialRules: 'Power switches can disable animatronics temporarily.',
    },
    finalGirls: ['Meg', 'Abby'],
    theme: 'Animatronic horror',
    description: 'A malfunctioning animatronic mascot hunts employees trapped in a theme park after hours.',
    horrorInspiration: 'Five Nights at Freddy\'s / Willy\'s Wonderland',
  },
  {
    id: 'rotten-harvest',
    name: 'A Rotten Harvest',
    series: 'series4',
    killer: {
      id: 'grimlash',
      name: 'Grimlash',
      title: 'The Scarecrow',
      health: 12,
      startingHorror: 4,
      description: 'An ancient scarecrow brought to life by dark harvest rituals, reaping souls instead of crops.',
      darkPower: 'Harvest Moon — Grimlash grows stronger as more victims fall.',
      difficulty: 'medium',
    },
    location: {
      id: 'harvest-fields',
      name: 'Harvest Fields',
      description: 'Endless cornfields, a decrepit farmhouse, and a barn where dark rituals were performed under the harvest moon.',
      searchSpaces: 3,
      exitSpaces: 3,
      specialRules: 'Cornfield spaces limit visibility and movement options.',
    },
    finalGirls: ['Autumn', 'Maize'],
    theme: 'Folk horror / harvest',
    description: 'An ancient scarecrow awakens during harvest season, reaping souls across the farmland.',
    horrorInspiration: 'Children of the Corn / Jeepers Creepers',
  },
  {
    id: 'demon-shadows',
    name: 'A Demon in the Shadows',
    series: 'series4',
    killer: {
      id: 'berith',
      name: 'Berith',
      title: 'The Duke of Hell',
      health: 14,
      startingHorror: 5,
      description: 'A powerful demon summoned through forbidden rituals, commanding shadow and flame.',
      darkPower: 'Hellfire — Berith sets spaces ablaze, making them dangerous to enter.',
      difficulty: 'extreme',
    },
    location: {
      id: 'shadow-church',
      name: 'Shadow Church',
      description: 'A desecrated cathedral where a demonic summoning went wrong. Shadows move with malevolent intent.',
      searchSpaces: 3,
      exitSpaces: 1,
      specialRules: 'Shadow spaces deal damage when entered. Holy items provide protection.',
    },
    finalGirls: ['Faith', 'Grace'],
    theme: 'Demonic / religious horror',
    description: 'A demon has been summoned in a desecrated church, and only faith and courage can banish it back to hell.',
    horrorInspiration: 'The Exorcist / The Conjuring',
  },
  {
    id: 'shriek',
    name: 'Shriek',
    series: 'series4',
    killer: {
      id: 'mort',
      name: 'Mort',
      title: 'The Teenage Dirtbag',
      health: 9,
      startingHorror: 3,
      description: 'A seemingly ordinary teenager hiding a murderous obsession, using knowledge of horror tropes to kill.',
      darkPower: 'Genre Savvy — Mort anticipates and counters the Final Girl\'s strategies.',
      difficulty: 'easy',
    },
    location: {
      id: 'suburbia',
      name: 'Suburbia High',
      description: 'A high school and surrounding neighborhood during prom night. The killer could be anyone.',
      searchSpaces: 4,
      exitSpaces: 3,
      specialRules: 'Phone calls provide clues but also reveal your location.',
    },
    finalGirls: ['Sidney', 'Tatum'],
    theme: 'Meta slasher / teen horror',
    description: 'A masked killer terrorizes teens during prom night, using horror movie knowledge to stay one step ahead.',
    horrorInspiration: 'Scream',
  },
];

// ─── All Final Girls (consolidated) ─────────────────────────────────────────

export const FINAL_GIRLS: FinalGirlCharacter[] = [
  { id: 'laurie', name: 'Laurie', health: 5, ultimateAbility: 'Whenever you are in the same space as an Enemy and inflict damage, do an additional damage.', specialAbility: 'Resourceful — Start with an extra Zero Cost card.', fromFilm: 'happy-trails' },
  { id: 'adelaide', name: 'Adelaide', health: 5, ultimateAbility: 'Once per turn, you may re-roll one die during a Horror Roll.', specialAbility: 'Quick Reflexes — May take one free movement after the Killer phase.', fromFilm: 'happy-trails' },
  { id: 'nancy', name: 'Nancy', health: 4, ultimateAbility: 'When you play a Reaction card, draw a card from the Action Tableau for free.', specialAbility: 'Dream Walker — Can move through secret passages.', fromFilm: 'creech-manor' },
  { id: 'asami', name: 'Asami', health: 5, ultimateAbility: 'Your attacks deal +1 damage.', specialAbility: 'Martial Training — Weak Attack costs 0 Time.', fromFilm: 'creech-manor' },
  { id: 'amara', name: 'Amara', health: 5, ultimateAbility: 'Victims in your space cannot be targeted by the Killer.', specialAbility: 'Guardian — Can escort 3 victims instead of 2.', fromFilm: 'slaughter-groves' },
  { id: 'kailey', name: 'Kailey', health: 4, ultimateAbility: 'When you save a victim, gain +2 Time.', specialAbility: 'Compassionate — Gain 1 Time when saving a victim.', fromFilm: 'slaughter-groves' },
  { id: 'alice', name: 'Alice', health: 5, ultimateAbility: 'Ignore the first damage from each Killer attack.', specialAbility: 'Survivor Instinct — Start at Horror Level -1.', fromFilm: 'carnage-carnival' },
  { id: 'selena', name: 'Selena', health: 4, ultimateAbility: 'You may play 2 Reaction cards against a single attack.', specialAbility: 'Agile — Sprint costs 0 Time.', fromFilm: 'carnage-carnival' },
  { id: 'barbara', name: 'Barbara', health: 5, ultimateAbility: 'Once per turn, convert a partial success to a full success for free.', specialAbility: 'Determined — +1 die when Horror Level is at max.', fromFilm: 'frightmare-maple' },
  { id: 'reiko', name: 'Reiko', health: 4, ultimateAbility: 'Heal 1 health at the start of each Action phase.', specialAbility: 'Resilient — Start with 1 extra health marker.', fromFilm: 'frightmare-maple' },
  { id: 'ripley', name: 'Ripley', health: 5, ultimateAbility: 'You may use airlocks to deal 3 damage to the Killer.', specialAbility: 'Tactical — May look at the top Terror card once per turn.', fromFilm: 'into-the-void' },
  { id: 'sigourney', name: 'Sigourney', health: 5, ultimateAbility: 'Weapons deal +2 damage.', specialAbility: 'Weapons Expert — Start with a random weapon.', fromFilm: 'into-the-void' },
  { id: 'macready', name: 'MacReady', health: 5, ultimateAbility: 'Test any victim for assimilation before saving.', specialAbility: 'Paranoid — Can identify disguised Organisms.', fromFilm: 'panic-station' },
  { id: 'childs', name: 'Childs', health: 6, ultimateAbility: 'Immune to cold damage and blizzard effects.', specialAbility: 'Tough — +1 starting health.', fromFilm: 'panic-station' },
  { id: 'erin', name: 'Erin', health: 4, ultimateAbility: 'After killing an Intruder, gain their weapon.', specialAbility: 'Resourceful — Items found in search are +1 quality.', fromFilm: 'knock-at-door' },
  { id: 'kristen', name: 'Kristen', health: 5, ultimateAbility: 'Barricaded spaces cannot be entered by the Killer.', specialAbility: 'Fortify — Can barricade one door per turn.', fromFilm: 'knock-at-door' },
  { id: 'red', name: 'Red', health: 4, ultimateAbility: 'Move 2 extra spaces on any movement action.', specialAbility: 'Swift — +1 movement on all actions.', fromFilm: 'full-moon' },
  { id: 'gretel', name: 'Gretel', health: 5, ultimateAbility: 'Traps deal double damage to the Wolf.', specialAbility: 'Clever — Can set traps in any space.', fromFilm: 'full-moon' },
  { id: 'clarice', name: 'Clarice', health: 4, ultimateAbility: 'Predict the Killer\'s next target correctly to gain +2 Time.', specialAbility: 'Profiler — Can peek at the next Terror card.', fromFilm: 'madness-dark' },
  { id: 'sidney', name: 'Sidney', health: 5, ultimateAbility: 'When attacked, automatically play a free Reaction card from the discard.', specialAbility: 'Survivor — Start with a Reaction card in hand.', fromFilm: 'madness-dark' },
];

// ─── Rules Data ─────────────────────────────────────────────────────────────

export interface FGRuleEntry {
  id: string;
  title: string;
  category: string;
  content: string;
  relatedRules?: string[];
}

export const FG_RULES_CATEGORIES = [
  'Game Setup',
  'Turn Structure',
  'Action Phase',
  'Planning Phase',
  'Killer Phase',
  'Panic Phase',
  'Upkeep Phase',
  'Combat',
  'Items & Weapons',
  'Victims',
  'Special Mechanics',
  'Game End',
] as const;

export const FG_RULES_DATA: FGRuleEntry[] = [
  // Game Setup
  {
    id: 'setup-overview',
    title: 'Game Setup Overview',
    category: 'Game Setup',
    content: 'Final Girl requires a Core Box and at least one Feature Film. Choose a Killer, Location, and Final Girl. You can mix and match Killers and Locations from different Feature Films for variety. Setup involves preparing the Player Board, Killer Board, and Location Board with their respective components.',
  },
  {
    id: 'setup-core',
    title: 'Core Box Setup',
    category: 'Game Setup',
    content: 'Choose a Final Girl card. Place the Player Board (normal or Extreme Horror Mode). Take 6 custom dice. Take 6 Zero Cost Action cards as your starting hand. Sort remaining Action cards into the Action Tableau by name.',
  },
  {
    id: 'setup-feature-film',
    title: 'Feature Film Setup',
    category: 'Game Setup',
    content: 'Place the Killer Board above the Player Board. Place the Location Board to the right. Shuffle Finale cards and place 1 facedown. Shuffle Dark Power cards and place 1 facedown below Finale. Shuffle Killer + Location Terror cards together, deal 10 for the Terror deck. Draw a Setup card and arrange the Location Board accordingly. Deal Item cards into 3 piles of 4 (top card faceup). Place Health markers, Bloodlust marker, Time marker (on 6), and Horror marker at the Killer\'s starting level. Shuffle and draw the first Event card.',
  },
  {
    id: 'setup-difficulty',
    title: 'Difficulty Options',
    category: 'Game Setup',
    content: 'Normal Mode: Standard Player Board side. Extreme Horror Mode: Flip the Player Board for a harder experience with modified Horror track penalties. You can also include Epic Dark Power cards for an additional challenge.',
  },

  // Turn Structure
  {
    id: 'turn-overview',
    title: 'Turn Structure',
    category: 'Turn Structure',
    content: 'Each turn consists of 5 phases in order: 1) Action Phase — play cards and take actions. 2) Planning Phase — buy new cards and reset Time. 3) Killer Phase — the Killer acts and Terror cards resolve. 4) Panic Phase — victims may flee. 5) Upkeep Phase — check Finale, resolve ongoing effects, rearrange items.',
  },
  {
    id: 'horror-rolls',
    title: 'Horror Rolls',
    category: 'Turn Structure',
    content: 'Most Action cards require a Horror Roll. Roll dice equal to the current Horror Level position on the track. Results: 5-6 = Success. 3-4 = Partial Success (discard 2 cards to convert to full success). 1-2 = Failure. If no dice show success (even after conversions), the roll has failed. You always roll at least 1 die.',
  },

  // Action Phase
  {
    id: 'action-phase',
    title: 'Action Phase Overview',
    category: 'Action Phase',
    content: 'Play Action cards to move, attack, heal, search, and take other actions. Each card is resolved by making a Horror Roll. Cards have 3 outcomes: Double Success (2+ successes), Single Success (1 success), or Failure. Resolve effects left to right based on your result.',
  },
  {
    id: 'action-movement',
    title: 'Movement',
    category: 'Action Phase',
    content: 'Move up to the number of spaces indicated by your action result. Each move goes to one adjacent space (connected by a path or door). You may move to and from the Killer\'s space without restriction. Unused movement is lost.',
  },
  {
    id: 'action-attacking',
    title: 'Attacking the Killer',
    category: 'Action Phase',
    content: 'You must be in the same space as the Killer to attack (unless you have a ranged weapon). Play an attack Action card and make a Horror Roll. For each damage icon in your result, deal 1 damage. Weapons can add their Damage Modifier if the attack deals at least 1 damage. Remove Health markers from the Killer board equal to damage dealt.',
  },
  {
    id: 'action-searching',
    title: 'Searching for Items',
    category: 'Action Phase',
    content: 'You must be on a Search space (highlighted in orange) to search. Play a Search Action card and make a Horror Roll. Based on results, draw cards from the associated Item deck, keep one, and return others. Items go into your Hands or Backpack on the Player Board.',
  },
  {
    id: 'action-saving',
    title: 'Saving Victims',
    category: 'Action Phase',
    content: 'When you are on a green Exit space, any Victims in that space may be saved. Place saved Victims on the Final Girl card\'s Victim Saved spaces and take the indicated rewards. After filling all spaces, flip the card to unlock the Ultimate Ability. Victims can only be saved by the Final Girl at Exit spaces.',
  },
  {
    id: 'action-time',
    title: 'Time Management',
    category: 'Action Phase',
    content: 'Most actions cost Time. You can discard Action cards for +1 Time each. If Time drops below zero, the Action Phase ends immediately after the current action resolves. You cannot gain Time once below zero.',
  },
  {
    id: 'action-ending',
    title: 'Ending the Action Phase',
    category: 'Action Phase',
    content: 'The Action Phase ends when: you choose to stop, you run out of cards, a card effect ends it, or Time drops below zero. Don\'t be afraid to end early — saving cards for future turns is often wise.',
  },

  // Planning Phase
  {
    id: 'planning-phase',
    title: 'Planning Phase',
    category: 'Planning Phase',
    content: 'After the Action Phase: 1) Spend remaining Time to purchase Action cards from the Tableau (cost shown on card). Cannot buy cards played this turn or exceed 10 cards in hand. 2) Reset Time marker to 6. 3) Return all played/discarded Action cards to the Tableau. Zero Cost cards are always free to take (unless at hand limit).',
  },

  // Killer Phase
  {
    id: 'killer-phase',
    title: 'Killer Phase Overview',
    category: 'Killer Phase',
    content: 'The Killer acts: 1) Resolve the Killer Action from the Finale card (back side initially, front side after reveal). 2) Draw and resolve the top Terror card. Terror cards can cause the Killer to target, move, and attack, or trigger special effects. If the Finale has been revealed, skip the Terror card draw.',
  },
  {
    id: 'killer-targeting',
    title: 'Killer Targeting',
    category: 'Killer Phase',
    content: 'The Killer targets the closest option (Victim, Final Girl, or whichever is closest as indicated). Ties go to the group with more Victims. The Killer takes the shortest path to its target and stops upon reaching them.',
  },
  {
    id: 'killer-attacking',
    title: 'Killer Attacks',
    category: 'Killer Phase',
    content: 'The Killer attacks targets in its space. Damage equals the Killer\'s current Attack Value (from Bloodlust track). Victims die in one hit (increasing Bloodlust). The Final Girl loses health equal to Attack Value unless defended with a Reaction card. The Killer always attacks Victims before the Final Girl unless specifically targeting her.',
  },
  {
    id: 'reaction-cards',
    title: 'Reaction Cards (Defense)',
    category: 'Killer Phase',
    content: 'Blue-backed Reaction cards can only be played when attacked. Make a Horror Roll to reduce or cancel damage. Each Reaction card defends against one attack. You may use multiple Reaction cards against the same attack. Cannot use Reaction cards to protect Victims.',
  },

  // Panic Phase
  {
    id: 'panic-phase',
    title: 'Panic Phase',
    category: 'Panic Phase',
    content: 'After the Killer Phase, check if Victims panic. A Victim panics if: at least one Victim was killed this turn AND the Victim is in the same space as the Killer. Roll a die for each panicking Victim and move them according to the numbers on the board paths. The Final Girl does NOT panic during this phase.',
  },

  // Upkeep Phase
  {
    id: 'upkeep-phase',
    title: 'Upkeep Phase',
    category: 'Upkeep Phase',
    content: 'In order: 1) Finale Check — if no Terror cards remain, reveal the Finale card. 2) Resolve any required upkeep from Events, Items, or special rules. 3) Rearrange Items between Hands and Backpack (only time you can do this besides gaining new items). Then begin the next turn.',
  },

  // Combat
  {
    id: 'combat-weapons',
    title: 'Using Weapons',
    category: 'Combat',
    content: 'Weapons must be held in Hands to use. Range indicates required distance from Killer (0 = same space, 1+ = that many spaces away). Damage Modifier adds to attack damage when you deal at least 1 damage. Two-handed weapons occupy both hand slots. Choose one weapon per attack if holding two.',
  },
  {
    id: 'combat-final-health',
    title: 'The Final Health Token',
    category: 'Combat',
    content: 'Both the Final Girl and Killer start with a black Final Health token. When all normal Health markers are removed and damage remains, reveal the token. Blank = dead. Health icons (1-3) = comeback! Replace with white token + health markers. The current phase immediately ends. If health is fully depleted again (white token removed), they are truly dead. +1 die bonus when either is down to only their Final Health token.',
  },

  // Items & Weapons
  {
    id: 'items-overview',
    title: 'Items Overview',
    category: 'Items & Weapons',
    content: 'Items are found by searching. Two Hands can each hold one item (or one two-handed item). Backpack holds unlimited items but hand-icon items can\'t be used from backpack. Rearrange items only when gaining new items or during Upkeep. Some items have limited uses tracked with markers.',
  },

  // Victims
  {
    id: 'victims-following',
    title: 'Victims Following',
    category: 'Victims',
    content: 'When leaving a space with Victims, take up to 2 with you. Victims will NOT follow into the Killer\'s space. If you leave the Killer\'s space, Victims there will follow you. Victims cannot be saved unless the Final Girl brings them to an Exit space.',
  },
  {
    id: 'victims-special',
    title: 'Special Victims',
    category: 'Victims',
    content: 'White, orange, and blue meeples represent Special Victims introduced by Events. They follow normal Victim rules unless their card specifies otherwise. They can be saved, killed, and will affect Bloodlust normally.',
  },

  // Special Mechanics
  {
    id: 'bloodlust',
    title: 'Bloodlust',
    category: 'Special Mechanics',
    content: 'Bloodlust increases when Victims die. As it rises, the Killer gains more Movement and Attack Value. At certain thresholds, the Dark Power card is revealed. At maximum Bloodlust, each additional increase triggers the final effect. Bloodlust never decreases.',
  },
  {
    id: 'dark-powers',
    title: 'Dark Powers',
    category: 'Special Mechanics',
    content: 'Dark Power cards give the Killer unique abilities when revealed (triggered by Bloodlust). Epic Dark Powers (bloody border) are optional for harder games. Minor Dark Powers come from Terror cards and add temporary abilities with their own health markers that must be destroyed first.',
  },
  {
    id: 'finale',
    title: 'The Finale',
    category: 'Special Mechanics',
    content: 'When the Terror deck is empty, the Finale card is revealed during Upkeep. It may have immediate or ongoing effects. The new Killer Action replaces the initial one. No more Terror cards are drawn. If the Dark Power hasn\'t been revealed yet, reveal it too.',
  },
  {
    id: 'events',
    title: 'Events',
    category: 'Special Mechanics',
    content: 'An Event card is revealed at game start and more may be drawn during play. Events can have permanent ongoing effects or one-time effects (discarded after). Multiple Events can be active simultaneously. New Events don\'t cancel previous ones.',
  },
  {
    id: 'horror-level',
    title: 'Horror Level',
    category: 'Special Mechanics',
    content: 'The Horror Level determines how many dice you roll. It can increase or decrease based on card effects. If it would go beyond the track: decreasing past minimum = gain 1 Time; increasing past maximum = increase Bloodlust.',
  },

  // Game End
  {
    id: 'game-end-victory',
    title: 'Victory',
    category: 'Game End',
    content: 'You win when the Killer\'s health reaches zero (Final Health token revealed as blank or white token removed). Even if the Final Girl dies at the same time, it\'s still a victory — the ultimate sacrifice to rid the world of a vile monster.',
  },
  {
    id: 'game-end-defeat',
    title: 'Defeat',
    category: 'Game End',
    content: 'You lose when the Final Girl\'s health reaches zero and her Final Health token is blank (or white token is removed). The Killer has claimed another victim and the horror continues.',
  },
  {
    id: 'extreme-horror',
    title: 'Extreme Horror Mode',
    category: 'Game End',
    content: 'Flip the Player Board to the Extreme Horror Mode side for a harder experience. The Horror track has modified penalties and the game becomes significantly more challenging. Recommended only for experienced players.',
  },
];

// ─── Series Labels ──────────────────────────────────────────────────────────

export const SERIES_LABELS: Record<Series, string> = {
  series1: 'Series 1',
  series2: 'Series 2',
  series3: 'Series 3',
  series4: 'Series 4',
  special: 'Special Feature',
};

// ─── Difficulty Labels ──────────────────────────────────────────────────────

export const DIFFICULTY_COLORS: Record<string, string> = {
  easy: '#4CAF50',
  medium: '#FFC107',
  hard: '#FF5722',
  extreme: '#9C27B0',
};

// ─── Helper Functions ───────────────────────────────────────────────────────

export function getFilmsBySeries(series: Series): FeatureFilm[] {
  return FEATURE_FILMS.filter(f => f.series === series);
}

export function getFilmById(id: string): FeatureFilm | undefined {
  return FEATURE_FILMS.find(f => f.id === id);
}

export function getFinalGirlsByFilm(filmId: string): FinalGirlCharacter[] {
  return FINAL_GIRLS.filter(fg => fg.fromFilm === filmId);
}

export function getAllKillers(): Killer[] {
  return FEATURE_FILMS.map(f => f.killer);
}

export function getAllLocations(): Location[] {
  return FEATURE_FILMS.map(f => f.location);
}

export function randomizeGame(ownedFilmIds: string[]): {
  killer: Killer;
  location: Location;
  finalGirl: FinalGirlCharacter;
} | null {
  if (ownedFilmIds.length === 0) return null;

  const ownedFilms = FEATURE_FILMS.filter(f => ownedFilmIds.includes(f.id));
  if (ownedFilms.length === 0) return null;

  // Pick random killer from owned films
  const killerFilm = ownedFilms[Math.floor(Math.random() * ownedFilms.length)];
  const killer = killerFilm.killer;

  // Pick random location from owned films (can be different from killer's film)
  const locationFilm = ownedFilms[Math.floor(Math.random() * ownedFilms.length)];
  const location = locationFilm.location;

  // Pick random final girl from all owned films
  const allFinalGirls = ownedFilms.flatMap(f => getFinalGirlsByFilm(f.id));
  const finalGirl = allFinalGirls[Math.floor(Math.random() * allFinalGirls.length)];

  return { killer, location, finalGirl };
}

export function searchFGRules(query: string): FGRuleEntry[] {
  const lower = query.toLowerCase();
  return FG_RULES_DATA.filter(
    r => r.title.toLowerCase().includes(lower) ||
         r.content.toLowerCase().includes(lower) ||
         r.category.toLowerCase().includes(lower)
  );
}

// ─── Game Phases (for session tracker) ─────────────────────────────────────

export interface FGPhaseStep {
  text: string;
  detail?: string;
}

export interface FGGamePhase {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  color: string;
  steps: FGPhaseStep[];
  tip?: string;
}

export const FG_GAME_PHASES: FGGamePhase[] = [
  {
    id: 'action',
    name: 'Action Phase',
    shortName: 'Action',
    description: 'Play Action cards from your hand to move, attack, search, save victims, and more. Each card requires a Horror Roll.',
    icon: '⚔️',
    color: '#dc2626',
    steps: [
      { text: 'Choose an Action card from your hand to play', detail: 'Cards cost Time (shown in top-left). You can discard cards for +1 Time each. Zero Cost cards are free.' },
      { text: 'Make a Horror Roll (roll dice = Horror Level)', detail: 'Roll dice equal to your current Horror Level. 5-6 = Success. 3-4 = Partial (discard 2 cards to convert). 1-2 = Fail.' },
      { text: 'Resolve the card effect based on your result', detail: 'Double Success (2+), Single Success (1), or Failure. Resolve effects left to right for your result tier.' },
      { text: 'Repeat or end the Action Phase', detail: 'You may play more cards, or choose to stop. Phase also ends if Time drops below zero or a card effect ends it.' },
    ],
    tip: 'Don\'t spend all your cards! Saving cards for future turns and for defense (Reaction cards) is often the key to survival.',
  },
  {
    id: 'planning',
    name: 'Planning Phase',
    shortName: 'Planning',
    description: 'Spend remaining Time to buy new Action cards from the Tableau, then reset for the next turn.',
    icon: '📋',
    color: '#f97316',
    steps: [
      { text: 'Spend remaining Time to buy Action cards', detail: 'Each card costs Time equal to its cost value. Cannot buy cards played this turn. Hand limit is 10 cards.' },
      { text: 'Take any free Zero Cost cards (up to hand limit)', detail: 'Zero Cost cards are always available for free. Great for padding your hand with basic options.' },
      { text: 'Reset Time marker to 6', detail: 'Regardless of how much Time you spent or saved, it resets to 6 for the next turn.' },
      { text: 'Return all played/discarded cards to the Tableau', detail: 'Cards you played this turn go back to the Tableau and can be purchased again next turn.' },
    ],
    tip: 'Prioritize buying attack cards and Reaction cards early. Having at least one Reaction card in hand can save your life.',
  },
  {
    id: 'killer',
    name: 'Killer Phase',
    shortName: 'Killer',
    description: 'The Killer acts according to the Finale card and Terror deck. Brace for impact.',
    icon: '💀',
    color: '#a855f7',
    steps: [
      { text: 'Resolve the Killer Action (from Finale card back)', detail: 'Before the Finale is revealed, use the action on the back of the Finale card. After reveal, use the front side action.' },
      { text: 'Draw and resolve the top Terror card', detail: 'Terror cards direct the Killer to move, target, and attack. Follow the card instructions exactly. Skip this step if Finale has been revealed.' },
      { text: 'Killer targets closest option (Victims or Final Girl)', detail: 'Ties go to the group with more Victims. Killer takes shortest path and stops upon reaching target.' },
      { text: 'Killer attacks targets in its space', detail: 'Damage = current Attack Value (from Bloodlust track). Victims die in one hit. You may play Reaction cards to defend yourself.' },
      { text: 'If Victims die, increase Bloodlust', detail: 'Move the Bloodlust marker up one space per Victim killed. Check if Dark Power threshold is reached.' },
    ],
    tip: 'If the Killer is heading toward a group of Victims, consider luring it away by positioning yourself closer.',
  },
  {
    id: 'panic',
    name: 'Panic Phase',
    shortName: 'Panic',
    description: 'Surviving Victims may flee in terror if any were killed this turn.',
    icon: '😱',
    color: '#eab308',
    steps: [
      { text: 'Check if any Victims were killed this turn', detail: 'If no Victims died this turn, skip the entire Panic Phase.' },
      { text: 'Identify panicking Victims (same space as Killer)', detail: 'Only Victims in the Killer\'s current space panic. Victims elsewhere are safe.' },
      { text: 'Roll a die for each panicking Victim', detail: 'Move the Victim along the path matching the die result number shown on the board.' },
    ],
    tip: 'Panicking Victims scatter randomly. They might run toward exits (lucky!) or into dead ends (dangerous for next turn).',
  },
  {
    id: 'upkeep',
    name: 'Upkeep Phase',
    shortName: 'Upkeep',
    description: 'Check for Finale reveal, resolve ongoing effects, and prepare for the next turn.',
    icon: '🔄',
    color: '#22c55e',
    steps: [
      { text: 'Finale Check — if Terror deck is empty, reveal Finale', detail: 'Flip the Finale card face-up. Its new Killer Action replaces the old one. If Dark Power hasn\'t been revealed, reveal it now too.' },
      { text: 'Resolve any ongoing Event or Item effects', detail: 'Check active Event cards and any items with upkeep requirements.' },
      { text: 'Rearrange Items between Hands and Backpack', detail: 'This is the only time (besides gaining items) you can move items between Hands and Backpack.' },
      { text: 'Begin the next turn', detail: 'Return to the Action Phase. The horror continues...' },
    ],
    tip: 'Keep track of how many Terror cards remain. When the deck is nearly empty, prepare for the Finale — it often makes the Killer much more dangerous.',
  },
];
