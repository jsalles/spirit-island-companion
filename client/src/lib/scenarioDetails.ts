/**
 * Spirit Island Scenario Details
 * Design: "Living Island" — Organic Nature UI
 * Complete data for all 15 scenarios across all expansions
 */

export interface ScenarioRule {
  title: string;
  description: string;
}

export interface ScenarioDetail {
  id: string;
  name: string;
  expansion: string;
  expansionLabel: string;
  difficulty: string;
  difficultyNote?: string;
  flavorText: string;
  overview: string;
  ruleChanges: ScenarioRule[];
  setupChanges: string[];
  victoryChanges: string | null;
  lossChanges: string | null;
  notablyEasierFor: string[];
  notablyHarderFor: string[];
  strategyTips: string;
  tags: string[];
}

export const SCENARIO_DETAILS: ScenarioDetail[] = [
  {
    id: 'blitz',
    name: 'Blitz',
    expansion: 'base',
    expansionLabel: 'Base Game',
    difficulty: '0',
    flavorText: 'Perhaps the Spirits of the Island are not so slow after all. But still, the Invaders are faster.',
    overview: 'A tempo-shifting scenario where all powers become Fast, but Invaders also accelerate. Great for players who prefer a play-and-resolve style over planning ahead.',
    ruleChanges: [
      {
        title: 'All Powers Are Fast',
        description: 'All powers are Fast. Powers which were already Fast (or made Fast) cost 1 less Energy. For Innate Powers and Power Cards costing 0, instead gain 1 Energy.'
      },
      {
        title: 'Accelerated Exploration',
        description: 'When Exploring, once per board, add an additional Explorer.'
      },
      {
        title: 'Reduced Blight Tolerance',
        description: 'If the Island becomes "Blighted", put 1 less Blight per player on the Blight Card.'
      }
    ],
    setupChanges: [
      'Put an additional Blight per player on the Blight Card.',
      'The Invaders get an additional set of actions at the end of Setup (they will Explore, then Build and Explore).'
    ],
    victoryChanges: null,
    lossChanges: null,
    notablyEasierFor: [
      'Spirits with strong Fast powers or that benefit from the tempo shift'
    ],
    notablyHarderFor: [
      'Slow-developing Spirits (e.g., Serpent Slumbering Beneath the Island)',
      'Paired with Brandenburg-Prussia (which pushes tempo in a different way)'
    ],
    strategyTips: 'Since all powers are Fast, you can be much more reactive. Focus on using the extra Energy from already-Fast powers to fuel bigger plays. The additional Explorer per board during Explore means you need to be aggressive about clearing lands early.',
    tags: ['tempo', 'fast powers', 'energy', 'blight', 'explorer']
  },
  {
    id: 'guard-the-isles-heart',
    name: "Guard the Isle's Heart",
    expansion: 'base',
    expansionLabel: 'Base Game',
    difficulty: '0',
    flavorText: 'The Invaders have found the center of the island\'s power, and if they lay down roots there, the heart of the island will be shattered. You must act decisively in order to save your home.',
    overview: 'A defensive scenario focused on protecting the inner lands. Spirits start with extra Presence and Power Cards in the interior, but must prevent any Town or City from existing in Inner Lands after Turn 1.',
    ruleChanges: [
      {
        title: 'Inner Lands',
        description: 'There is 1 inner land on each board. For 1-2 players: Land #7 on each board. For 3 players: Lands #7 and #2. For 4+ players: Lands #7, #2, and #4.'
      },
      {
        title: 'Protect the Heart',
        description: 'After Turn 1, if there is ever a Town or City in an Inner Land, you lose immediately.'
      }
    ],
    setupChanges: [
      'Remove all Invaders from the board.',
      'In each Inner Land, add 1 Presence and 1 Town from the player starting on that board. (If illegal, as for Ocean\'s Hungry Grasp, add the Presence in the nearest legal land.)',
      'Each Spirit starts with 2 additional Power Cards, by drawing a single card from each of the 2 Power Decks.'
    ],
    victoryChanges: null,
    lossChanges: 'Anytime after Turn 1: There is a Town or City in an Inner Land.',
    notablyEasierFor: [
      'Spirits with easy Build prevention (e.g., A Spread of Rampant Green)'
    ],
    notablyHarderFor: [
      'Spirits with no Build prevention or Fast way to destroy (e.g., Bringer of Dreams and Nightmares)',
      'Against Adversaries who act quickly (e.g., Brandenburg-Prussia)'
    ],
    strategyTips: 'Focus your efforts on the Inner Lands. The extra Power Cards at start give you a strong opening — use them wisely. Build prevention is king here; destroying Towns after they Build is much harder than preventing the Build in the first place.',
    tags: ['defense', 'inner lands', 'build prevention', 'presence']
  },
  {
    id: 'rituals-of-terror',
    name: 'Rituals of Terror',
    expansion: 'base',
    expansionLabel: 'Base Game',
    difficulty: '3',
    flavorText: 'The Invaders seem resigned to a land of hostility and pain. What must their homeland be like to inspire this dogged determination to stay despite the deaths of their neighbors?',
    overview: 'Terror Levels are earned through a special Ritual instead of Fear. Spirits must gather Dahan and Presence together, spend Energy, and sacrifice Dahan to perform the Ritual and advance Terror Levels.',
    ruleChanges: [
      {
        title: 'No Passive Terror',
        description: 'Terror Levels are not earned via Fear, but by the Ritual of Terror. Do not resolve earned Fear Cards during the Invader Phase.'
      },
      {
        title: 'Ritual of Terror',
        description: 'During either the Spirit or Dahan Phase, the Spirits may perform the Ritual if: there is a land with at least 1 Presence from each Spirit; that land has at least 3 Dahan per player; and the Spirits collectively spend 3 Energy total and destroy 3 Dahan total in that land.'
      },
      {
        title: 'Ritual Effects',
        description: 'When the Ritual is performed: Earn the next Terror Level; Resolve all earned Fear Cards (at the new Terror Level); Push all Dahan from the ritual land, distributing them as evenly as possible among all adjacent lands.'
      }
    ],
    setupChanges: [
      'Put the Terror Level Dividers by the side of the board instead of into the Fear Deck.',
      'Put all Fear Cards into the Fear Deck. If you run out, earn no more Fear Cards.'
    ],
    victoryChanges: 'Victory can be achieved by performing the Ritual of Terror for the third time (reaching Terror Level Victory).',
    lossChanges: null,
    notablyEasierFor: [
      'Spirits with strong Dahan movement (e.g., Thunderspeaker)'
    ],
    notablyHarderFor: [
      'Solo games with a Spirit with poor Energy generation or slow Presence placement'
    ],
    strategyTips: 'Dahan management is critical. You need to gather 3 Dahan per player into a single land with all Spirits\' Presence. Plan your Dahan movement several turns in advance. The Ritual costs Energy and Dahan, so balance your resources carefully.',
    tags: ['ritual', 'dahan', 'fear', 'terror level', 'energy']
  },
  {
    id: 'dahan-insurrection',
    name: 'Dahan Insurrection',
    expansion: 'base',
    expansionLabel: 'Base Game',
    difficulty: '4',
    flavorText: 'Citing strategic importance, the Invaders\' government refuses to back down. They send waves of personnel to support the colony "in response to Dahan belligerence".',
    overview: 'The Dahan rise up with Constant Raiding, but the Invaders respond with Military Reinforcements. Victory requires ensuring Dahan outnumber Invaders, and a final Coordinated Insurrection determines the outcome.',
    ruleChanges: [
      {
        title: 'Constant Raiding',
        description: 'After an Action moves 1 or more Dahan, each Dahan that moved deals 1 Damage in their land. Damage happens after fully resolving the Power or effect which moved them.'
      },
      {
        title: 'Military Response',
        description: 'Whenever a Town is destroyed, add 1 Explorer to the nearest land with Invaders. Whenever a City is destroyed, add 1 Town to the nearest land with Invaders. Add new Invaders after fully resolving the effect which destroyed the old one.'
      },
      {
        title: 'Coordinated Insurrection',
        description: 'If you reach Terror Level "Victory", Dahan immediately Damage Invaders in every land on the board, as if fighting back after a Ravage. If this doesn\'t fulfill the Victory condition, you lose.'
      }
    ],
    setupChanges: [],
    victoryChanges: 'The normal Fear-based Victory is not available. Terror 2: No lands where Towns/Cities outnumber Dahan. Terror 3+: Fewer than 1 land per player where Towns/Cities outnumber Dahan.',
    lossChanges: 'There are fewer than 2 Dahan per player left alive.',
    notablyEasierFor: [
      'Spirits with versatile movement (e.g., Thunderspeaker)',
      'Spirits good at moving or destroying Towns/Cities (e.g., River Surges in Sunlight)'
    ],
    notablyHarderFor: [
      'Against Adversaries that Build lots of Towns/Cities (e.g., Kingdom of England)'
    ],
    strategyTips: 'The Military Response makes destroying Invaders a double-edged sword — each destroyed Town spawns an Explorer, each City spawns a Town. Focus on keeping Dahan alive and numerous. Use Constant Raiding to chip away at Invaders through movement rather than direct destruction.',
    tags: ['dahan', 'insurrection', 'military response', 'movement', 'counterattack']
  },
  {
    id: 'second-wave',
    name: 'Second Wave',
    expansion: 'branch-and-claw',
    expansionLabel: 'Branch & Claw',
    difficulty: '+/- 1',
    difficultyNote: 'Difficulty varies based on the state of the island from the first game',
    flavorText: 'The Invaders have been driven off once, but they are not staying away. The Spirits who first defended the island have grown too powerful and slow to react to this second wave.',
    overview: 'A campaign-style scenario where you play a second game on the same island. The state of the island carries over, with Blight, Dahan, and tokens remaining. New Spirits must rise to defend against a fresh wave of Invaders.',
    ruleChanges: [
      {
        title: 'Carry-Over State',
        description: 'Remove all Presence and Invaders. Leave on the island: one of each token-type per player, 2 Blight per player (return rest to Blight card), and all Dahan (redistribute if over 3 per land).'
      },
      {
        title: 'Assistance from First Spirits',
        description: 'Each Spirit from the first game sets aside one Power Card. Once Stage 3 begins, these may be "played" — they cost no Energy or Card Plays, grant no Elements, may target any land, and thresholds trigger if requiring 10 or fewer Elements. Each is discarded after one use.'
      },
      {
        title: 'Coastal Start',
        description: 'Pre-printed Invaders start closer to the coast: any which would go into land #6+ instead go into the land numbered 3 lower.'
      }
    ],
    setupChanges: [
      'If the Blight card is on the Healthy side: Increase the Adversary Level by 1.',
      'If the Blight card is on the Blighted side: Return it to "Healthy". Leave 2 Blight per player (plus 1) on it.',
      'Do not place pre-printed tokens, Blight, or Dahan.',
      'On each board: Add 1 Explorer to land #5.',
      'Adversary Setup changes apply normally, but any extra Blight comes from the Blight Pool.'
    ],
    victoryChanges: null,
    lossChanges: null,
    notablyEasierFor: [
      'If you delay the prior game\'s victory to stack the board favorably'
    ],
    notablyHarderFor: [
      'Against French Plantation Colony'
    ],
    strategyTips: 'The first game\'s ending state matters enormously. Consider leaving Dahan in strategic positions and clearing Blight before winning. The Stage 3 assistance cards can be game-changing — save your best power for the carry-over.',
    tags: ['campaign', 'carry-over', 'two games', 'blight', 'assistance']
  },
  {
    id: 'powers-long-forgotten',
    name: 'Powers Long Forgotten',
    expansion: 'branch-and-claw',
    expansionLabel: 'Branch & Claw',
    difficulty: '1',
    flavorText: 'There are sources of power on the Island best left undisturbed, their locations deliberately hidden and forgotten. Except that the Invaders seem to be aware of their existence and are hunting for them!',
    overview: 'A treasure-hunt scenario with hidden tokens scattered across the island. Both Spirits (via Dahan) and Invaders can search for ancient powers. Finding them first grants powerful one-time abilities.',
    ruleChanges: [
      {
        title: 'Dahan Search',
        description: 'Whenever a land has 3 or more Dahan in it, the players search it — turn its Scenario token face-up.'
      },
      {
        title: 'Invader Search',
        description: 'Whenever a land has 2 or more Invaders, the Invaders search it. Exception: Against French Plantation Colony, it takes 3 or more Invaders.'
      },
      {
        title: 'Discovery',
        description: 'When a land is searched, turn its token face-up. If it has a number, something has been found! Consult the scenario card for what it does. Place the token above the appropriate column to show which side discovered it.'
      },
      {
        title: 'Hidden Tokens',
        description: 'Tokens are face-down by default. Numbered tokens have special effects when discovered by either side.'
      }
    ],
    setupChanges: [
      'Mix up (face-down) Scenario Markers numbered 1-8. Take one, plus another one per player, without looking.',
      'Take 3 non-numbered Scenario Markers per player, less one.',
      'Shuffle them all together and put 4 face-down on each board, in lands without Dahan.'
    ],
    victoryChanges: null,
    lossChanges: null,
    notablyEasierFor: [
      'Spirits with good Dahan movement (e.g., Thunderspeaker)'
    ],
    notablyHarderFor: [
      'Spirits with poor Dahan movement or control'
    ],
    strategyTips: 'Race to search lands before the Invaders do. Gathering 3 Dahan into a land lets you search it, so Dahan movement is key. The numbered tokens provide powerful effects — finding them first can swing the game dramatically.',
    tags: ['search', 'tokens', 'dahan', 'treasure', 'hidden information']
  },
  {
    id: 'ward-the-shores',
    name: 'Ward the Shores',
    expansion: 'branch-and-claw',
    expansionLabel: 'Branch & Claw',
    difficulty: '2',
    flavorText: 'The Dahan learn that these Invaders are merely one of many groups, any of whom might want to colonize the Island. You decide to set up wardings along the shoreline.',
    overview: 'A long-game scenario where Spirits must place Warding Patterns in every Coastal land while fending off Invaders. Wardings provide Defend 3 but are destroyed by Blight.',
    ruleChanges: [
      {
        title: 'Warding Patterns',
        description: 'Once per turn, each Spirit may play a Power Card face-down as a Warding action: Cost 2 Energy per Sacred Site and 2 Energy per Town/City in the target Coastal land to add a Warding Pattern. This uses a card play.'
      },
      {
        title: 'Warding Defense',
        description: 'Each Warding Pattern grants Defend 3 in its land. They are destroyed any time Blight is added to their land.'
      },
      {
        title: 'Stage III Surge',
        description: 'During Stage III, Explore adds 1 Explorer in addition to the usual 1 Explorer.'
      }
    ],
    setupChanges: [
      'Get out 4 Scenario Markers per player; these represent Warding Patterns.',
      'After making the Fear Deck, put all remaining Fear Cards on the bottom. If they run out, reshuffle the deck.'
    ],
    victoryChanges: 'The normal Fear Victory is not available. Instead: Terror 2+ and there is a Warding Pattern in every Coastal land.',
    lossChanges: null,
    notablyEasierFor: [
      'Spirits strong along the coastline (e.g., Ocean\'s Hungry Grasp)'
    ],
    notablyHarderFor: [
      'Against higher-level Brandenburg-Prussia (brings Stage III much faster)'
    ],
    strategyTips: 'You need to ward every Coastal land, which requires significant Energy investment. Clear Invaders from Coastal lands first to reduce the Energy cost. Protect your Wardings from Blight at all costs — losing a Warding means re-doing expensive work.',
    tags: ['coastal', 'warding', 'defense', 'energy', 'long game']
  },
  {
    id: 'rituals-of-the-destroying-flame',
    name: 'Rituals of the Destroying Flame',
    expansion: 'branch-and-claw',
    expansionLabel: 'Branch & Claw',
    difficulty: '3',
    flavorText: 'The Invaders carry some strange immunity to harm. The Spirits have found a way to break that immunity — but it comes with a price.',
    overview: 'Invaders are immune to damage unless a Flame Marker is nearby or a Spirit pays 2 Energy. Spirits can perform a destructive Ritual to place Flame Markers, but it costs a Fire power card and adds Blight.',
    ruleChanges: [
      {
        title: 'Invader Immunity',
        description: 'Whenever anything would Damage or Destroy Invaders, ignore that Damage/Destruction unless: there is a Flame Marker within Range 1, or the Spirit using the Power pays 2 Energy. For non-Spirit effects (Events, Dahan counterattacks), any Spirit may pay the Energy.'
      },
      {
        title: 'Ritual of the Destroying Flame',
        description: 'Each turn, after all Growth is done, one or more Spirits may perform the Ritual. Each Spirit performing it: Forgets a Power Card that grants Fire; chooses a land where they have Presence; adds a Flame Marker and 1 Blight to that land (destroying Presence normally); gains Energy equal to the current Invader Stage.'
      },
      {
        title: 'Flame Marker Effects',
        description: 'If there are Invaders in the Ritual land, generate Fear equal to the current Invader Stage, and deal 1 Damage per Dahan present. Flame Markers are permanent and not limited in quantity.'
      }
    ],
    setupChanges: [
      'Get out the Scenario Markers; these are used as Flame Markers.'
    ],
    victoryChanges: null,
    lossChanges: null,
    notablyEasierFor: [
      'Spirits that generate lots of Energy (e.g., Keeper of the Forbidden Wilds)'
    ],
    notablyHarderFor: [
      'Spirits that rely heavily on Damage/Destruction (e.g., Lightning\'s Swift Strike, Sharp Fangs Behind the Leaves)'
    ],
    strategyTips: 'The 2 Energy tax on every damage action is brutal. Place Flame Markers strategically to cover the most lands within Range 1. Forgetting a Fire card is a real cost — choose cards you can afford to lose. The Energy gain from the Ritual scales with Invader Stage, making it more worthwhile later.',
    tags: ['immunity', 'flame', 'ritual', 'fire', 'energy tax', 'blight']
  },
  {
    id: 'elemental-invocation',
    name: 'Elemental Invocation',
    expansion: 'jagged-earth',
    expansionLabel: 'Jagged Earth',
    difficulty: '1*',
    difficultyNote: 'Difficulty varies greatly by experience — veterans may find it +0 or easier, new players may find it +2 or +3',
    flavorText: 'The Spirits can call forth wellsprings of essence to empower small areas of the island, strengthening and aligning nature with a particular element.',
    overview: 'Spirits can place Element Markers on the island that boost powers targeting those lands. A skill-testing scenario that rewards experienced players who can leverage the extra elements effectively.',
    ruleChanges: [
      {
        title: 'Element Markers',
        description: 'Element Markers can be placed on lands to provide elemental boosts. When a Power targets a land with a matching Element Marker, the Spirit gains that element for threshold purposes.'
      },
      {
        title: 'Placing Elements',
        description: 'Spirits can place Element Markers through specific game actions, creating zones of elemental power across the island.'
      },
      {
        title: 'Accelerated Invaders',
        description: 'The Invader Deck is accelerated (remove the topmost card of the lowest Invader Stage). This makes the game faster and more aggressive.'
      }
    ],
    setupChanges: [
      'Get out the Element Markers and place them by the island.',
      'On each board, add 1 Element Marker to land #6.',
      'Add 1 Fear Card to Terror Level I.',
      'Accelerate the Invader Deck (remove the topmost card of the lowest Invader Stage).'
    ],
    victoryChanges: null,
    lossChanges: null,
    notablyEasierFor: [
      'Spirits with Innate Powers that benefit from a 1-Element boost (e.g., Starlight Seeks Its Form)',
      'Spirits extremely strong at high element thresholds (e.g., Serpent Slumbering Beneath the Island)'
    ],
    notablyHarderFor: [
      'Spirits which use few or no Elements for land-targeting Powers (e.g., Vital Strength of the Earth)',
      'Spirits with very tight Energy income'
    ],
    strategyTips: 'Place Element Markers where you plan to use powers frequently. The accelerated Invader Deck means you have less time, but the elemental boosts can make your powers significantly stronger. This scenario rewards planning and element synergy.',
    tags: ['elements', 'markers', 'innate powers', 'thresholds', 'accelerated']
  },
  {
    id: 'despicable-theft',
    name: 'Despicable Theft',
    expansion: 'jagged-earth',
    expansionLabel: 'Jagged Earth',
    difficulty: '2',
    flavorText: 'Small groups of Invaders have been searching the island — and a few have found wonders. If they make it home, their people will stop at nothing to seek out more such fantastic treasures.',
    overview: 'Thieves arrive with Explorers and try to escape by ship. If they reach the Ocean, you lose earned Fear (and possibly accelerate the Invader Deck). Thieves can only be stopped in lands with 2+ Dahan and no Town/City.',
    ruleChanges: [
      {
        title: 'Thieves Arrive',
        description: 'After Setup, when Invaders successfully Explore into a land numbered 6 or higher, also add 1 Thief there from the pool.'
      },
      {
        title: 'Seek to Escape by Ship',
        description: 'Before the Ravage Step, all Thieves move: Thieves adjacent to the Ocean escape (lose 4 earned Fear each; numbered Thieves also Accelerate the Invader Deck). Other Thieves move 1 land towards their board\'s Ocean.'
      },
      {
        title: 'Thief Rules',
        description: 'Thieves do not count as Invaders and do not participate in Invader Actions. They may be affected by players\' Actions as if they were Dahan (but are not Dahan). They have 1 Health.'
      },
      {
        title: 'Catching Thieves',
        description: 'Thieves can only be Destroyed/Removed/Replaced in lands with no Town/City and 2 or more Dahan. Otherwise, they are Pushed instead. Thieves are face-down by default but face-up in lands with 2+ Dahan.'
      }
    ],
    setupChanges: [
      'Make a pool of 18 Scenario Markers: 12 blank ones and numbered (1,1,1,2,2,3). They represent Thieves trying to escape with knowledge or treasure.',
      'Mix them to form a face-down supply.'
    ],
    victoryChanges: null,
    lossChanges: null,
    notablyEasierFor: [
      'Spirits with strong movement and Isolate abilities (e.g., Finder of Paths Unseen)'
    ],
    notablyHarderFor: [
      'Spirits with poor ability to move Dahan',
      'Spirits with poor ability to Damage or move Invaders',
      'On Thematic Boards (more lands spawn Thieves)'
    ],
    strategyTips: 'Intercept Thieves before they reach the coast. You need lands with 2+ Dahan and no Town/City to catch them, so clearing Invaders and positioning Dahan is crucial. Numbered Thieves are the most dangerous — they accelerate the Invader Deck when they escape.',
    tags: ['thieves', 'escape', 'dahan', 'fear loss', 'interception', 'movement']
  },
  {
    id: 'the-great-river',
    name: 'The Great River',
    expansion: 'jagged-earth',
    expansionLabel: 'Jagged Earth',
    difficulty: '3',
    flavorText: 'The island is vast, and the Invaders are firmly entrenched in its western lands. They now seek to push east across a mighty river and open up a new frontier.',
    overview: 'Invaders push steadily inland from the coast. Extra Builds and Explores happen in Coastal lands, and Invaders move inland each turn. If too many escape off the eastern edge, you lose.',
    ruleChanges: [
      {
        title: 'Coastal Pressure',
        description: 'After the Build Step, Invaders Build in all Coastal lands without Town/City but with Invaders. After the Explore Step, Invaders Explore into all Coastal lands without Town/City.'
      },
      {
        title: 'Inland March',
        description: 'At the end of the Invader Phase, move each Invader one land Inland (farther from Ocean). Start with the most-Inland lands. When Invaders have a choice, split evenly starting from the northernmost land.'
      },
      {
        title: 'Isolate Resistance',
        description: 'When an Invader would be prevented from moving Inland by Isolate effects, it ignores those effects unless a Spirit pays 1 Energy.'
      },
      {
        title: 'Escape',
        description: 'When an Invader cannot move further Inland and is on the eastern edge, it moves off the map onto the Scenario Card.'
      }
    ],
    setupChanges: [
      'Place Island Boards touching top-to-bottom, so their Oceans are on the same side (the "Oceans" represent an immense river in the west).'
    ],
    victoryChanges: null,
    lossChanges: 'If more than 3 Invaders per player escape off the eastern edge of the map, the Invaders win.',
    notablyEasierFor: [
      'Spirits excellent at destroying Inland (e.g., Lightning\'s Swift Strike)'
    ],
    notablyHarderFor: [
      'Teams with little early control of Inland areas',
      'Spirits focused on defense/counterattack over Destroying/moving (e.g., Vital Strength of the Earth)',
      'Against Adversaries that create lots of extra Invaders'
    ],
    strategyTips: 'The Invaders march relentlessly inland. Focus on destroying them before they reach the eastern edge rather than trying to defend. The extra Coastal Builds and Explores create constant pressure — don\'t neglect the coast entirely or you\'ll be overwhelmed.',
    tags: ['inland', 'march', 'escape', 'coastal', 'board layout', 'movement']
  },
  {
    id: 'a-diversity-of-spirits',
    name: 'A Diversity of Spirits',
    expansion: 'feather-and-flame',
    expansionLabel: 'Feather & Flame',
    difficulty: '0',
    flavorText: 'Why should a Spirit of the open air speak the same language as a Spirit of flame and renewal? The Spirits defending the island are strong in their own nature and have difficulty communicating.',
    overview: 'A social scenario that restricts player communication. Spirits may not use shared language for planning and strategy, simulating the difficulty of different elemental beings coordinating.',
    ruleChanges: [
      {
        title: 'Communication Restriction',
        description: 'For planning and discussing strategy, Spirits may not use any language shared in common at game start, and may not look at each others\' Power Cards in the Spirit Phase. Once the phase starts, you can look at each others\' played cards.'
      },
      {
        title: 'Allowed Communication',
        description: 'Language can be used normally for game mechanics ("2 Fear, please"), describing actions ("I Destroy this Town"), rules questions, out-of-game chat, and keeping the game flowing. The restriction applies only to coordination and planning.'
      },
      {
        title: 'Shared Presence Bonus',
        description: 'After Growth, if you added 1 or more Presence to lands with other Spirits\' Presence: Gain 1 Energy or Reclaim 1 non-Major Power Card.'
      }
    ],
    setupChanges: [],
    victoryChanges: null,
    lossChanges: null,
    notablyEasierFor: [
      'Groups highly familiar with each others\' playstyles',
      'Groups highly familiar with all Spirits being played'
    ],
    notablyHarderFor: [
      'Playing a Spirit new to you or one you don\'t recall well',
      'Spirits with restrictive Presence placement'
    ],
    strategyTips: 'This scenario is more about the social experience than mechanical difficulty. The Shared Presence Bonus encourages clustering, which also helps with non-verbal coordination. Focus on reading your allies\' board state to anticipate their plans.',
    tags: ['communication', 'social', 'cooperation', 'presence', 'roleplaying']
  },
  {
    id: 'varied-terrains',
    name: 'Varied Terrains',
    expansion: 'feather-and-flame',
    expansionLabel: 'Feather & Flame',
    difficulty: '2',
    flavorText: 'The island\'s terrains are diverse: the mists and streams of high mountains, the arid scrub of hot sands, river-valleys and swamps, jungle trees towering high.',
    overview: 'Each terrain type has a unique modifier that makes Invader actions more dangerous. Mountains attract extra Explorers, Jungles get Blighted when Built in, Sands cascade Blight more easily, and Wetlands get double Builds.',
    ruleChanges: [
      {
        title: 'Mountains May Hide Gold',
        description: 'Add +1 Explorer when Exploring Mountains (including during Setup if appropriate).'
      },
      {
        title: 'Jungles Clear-Cut for Land',
        description: 'After Invaders Build 1 or more in a Jungle, add 1 Blight there.'
      },
      {
        title: 'Fragile Sands',
        description: 'After Setup: Blight added to Sands cascades as if Blight were already present, even when it is not.'
      },
      {
        title: 'Fertile Wetlands',
        description: 'After Invaders successfully Build in a Wetland, they Build there a second time.'
      }
    ],
    setupChanges: [
      'Add +1 Explorer when Exploring Mountains (applies during initial Explore).'
    ],
    victoryChanges: null,
    lossChanges: null,
    notablyEasierFor: [
      'Spirits with very good Build prevention in Jungles and Wetlands (e.g., A Spread of Rampant Green)'
    ],
    notablyHarderFor: [
      'Against Adversaries that cause many Builds (e.g., Kingdom of England)'
    ],
    strategyTips: 'Prioritize preventing Builds in Jungles (automatic Blight) and Wetlands (double Build). Mountains will accumulate Explorers faster, so don\'t ignore them. Sands are dangerous because Blight always cascades there — treat every Ravage in Sands as potentially catastrophic.',
    tags: ['terrain', 'mountains', 'jungles', 'sands', 'wetlands', 'blight', 'build']
  },
  {
    id: 'destiny-unfolds',
    name: 'Destiny Unfolds',
    expansion: 'nature-incarnate',
    expansionLabel: 'Nature Incarnate',
    difficulty: '-1*',
    difficultyNote: 'Can be harder for groups of Spirits that want the same Power Cards due to overlapping Elements',
    flavorText: 'Spirits of the primordial deeps have led you through a crucible of fate, where you both discover and create the potentials within yourself for growing greater. May it be enough.',
    overview: 'A draft-based scenario where Spirits build a personal "Destiny" deck of Power Cards before the game begins. When gaining Power Cards during the game, you draw from your Destiny instead of the decks.',
    ruleChanges: [
      {
        title: 'Destiny Deck',
        description: 'Each Spirit has a Destiny (a supply of drafted Power Cards). When a Spirit would gain a Power Card from a deck, instead they gain a Power Card of their choice from their Destiny. If not possible, gain from a deck as normal.'
      },
      {
        title: 'Drafting Process',
        description: 'Before the game, each Spirit drafts Power Cards in two rounds. Deal 6 cards per Spirit per round. Each Spirit splits cards into three piles of 2. First Spirit picks two piles, then second Spirit picks two. Each Spirit takes a third pile in exactly one of the two rounds.'
      },
      {
        title: 'Communication Rules',
        description: 'No communication is allowed during a drafting round, but discussion before each round is fine.'
      }
    ],
    setupChanges: [
      'Before the initial Explore, each Spirit drafts Power Cards into their Destiny in two rounds.',
      'Deal each Spirit a private hand of 6 Power Cards per round.',
      'Each Spirit picks 1 card for their Destiny, then passes remaining cards. Repeat until 5 cards are picked.',
      'Spirits reveal Destiny cards. Discard unpicked cards to Minor/Major discard piles.'
    ],
    victoryChanges: null,
    lossChanges: null,
    notablyEasierFor: [
      'Experienced players who can evaluate Power Cards quickly',
      'Spirits with flexible element needs'
    ],
    notablyHarderFor: [
      'Groups of Spirits that want the same Power Cards (overlapping Elements)'
    ],
    strategyTips: 'Draft with a plan — know what elements and effects your Spirit needs most. The Destiny deck gives you much more control over your power progression, but you\'re locked into what you drafted. Communicate before each round to avoid fighting over the same cards.',
    tags: ['draft', 'destiny', 'power cards', 'planning', 'card selection']
  },
  {
    id: 'surges-of-colonization',
    name: 'Surges of Colonization',
    expansion: 'nature-incarnate',
    expansionLabel: 'Nature Incarnate',
    difficulty: '+2/+7',
    difficultyNote: '+2 for standard surges, +7 for larger surges (higher difficulty variant)',
    flavorText: 'Instead of a steady flow of colonists, the Invaders send larger expeditions in surging waves of exploration, settlement, and exploitation.',
    overview: 'Invader pressure comes in waves — heavy on even turns, light on odd turns. This creates a rhythm of crisis and recovery that rewards adaptive play. A higher-difficulty variant adds even larger surges.',
    ruleChanges: [
      {
        title: 'Distant Expeditions',
        description: 'Distant Expeditions are a source of Invaders for Explore Cards, adding more Invaders to the island.'
      },
      {
        title: 'Surges and Ebbs',
        description: 'On even-numbered turns, resolve one extra Explore Card during the Explore Step (usually 2 Explore Cards). On odd-numbered turns, skip the first normal Explore.'
      },
      {
        title: 'Final Surge',
        description: 'If there are not enough Invader Cards for the final Surges, use unused Stage III cards. If none are left, use the highest-Stage cards in the discard (chosen randomly).'
      },
      {
        title: 'Larger Surges (Higher Difficulty)',
        description: 'Add a Fear Card to each Terror Level during Setup. Resolve another extra Explore Card on even-numbered turns (usually 3 Explore Cards total).'
      }
    ],
    setupChanges: [
      'Resolve one extra Explore Card during the Initial Explore.',
      'For Larger Surges variant: Add a Fear Card to each Terror Level.'
    ],
    victoryChanges: null,
    lossChanges: null,
    notablyEasierFor: [
      'Spirits with burst damage that can capitalize on the ebb turns'
    ],
    notablyHarderFor: [
      'Spirits with consistent effects tuned for every-turn pressure',
      'Best combined with at least a base-level Adversary'
    ],
    strategyTips: 'Plan around the rhythm: even turns are crisis turns with double (or triple) Explores, while odd turns give breathing room. Save your strongest plays for even turns. Defend effects are less reliable since they\'re useless on some turns and extra-useful on others.',
    tags: ['waves', 'surges', 'explore', 'rhythm', 'tempo', 'difficulty scaling']
  }
];

// Helper to get expansion color
export function getScenarioExpansionColor(expansion: string): string {
  const colors: Record<string, string> = {
    'base': '#4ade80',
    'branch-and-claw': '#f59e0b',
    'jagged-earth': '#ef4444',
    'feather-and-flame': '#a78bfa',
    'nature-incarnate': '#06b6d4',
  };
  return colors[expansion] || '#94a3b8';
}

// Helper to get difficulty color
export function getDifficultyColor(difficulty: string): string {
  const num = parseFloat(difficulty.replace(/[^0-9.-]/g, ''));
  if (isNaN(num) || num <= 0) return '#4ade80';
  if (num <= 1) return '#86efac';
  if (num <= 2) return '#fbbf24';
  if (num <= 3) return '#f97316';
  return '#ef4444';
}
