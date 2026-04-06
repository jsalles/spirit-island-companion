/*
 * Rules Quick-Reference Data — Spirit Island
 * Comprehensive categorized rules with keyword tags for search
 */

export interface RuleEntry {
  id: string;
  title: string;
  content: string;
  keywords: string[];
  related?: string[];
  expansion?: string;
  tip?: string;
}

export interface RuleCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  color: string;
  entries: RuleEntry[];
}

export const RULES_DATA: RuleCategory[] = [
  {
    id: 'setup',
    title: 'Game Setup',
    icon: 'layout',
    description: 'How to prepare the board, decks, and components before play begins.',
    color: '#5BC0BE',
    entries: [
      {
        id: 'setup-invader-board',
        title: 'Setting Up the Invader Board',
        content: 'Place the Invader Board on one side of the play area. This board holds the Invader Deck, the Fear Pool, the Fear Deck (with Terror Level dividers), the Blight Card, and tracks for Invader actions (Ravage, Build, Explore). The board organizes the Invader phase and tracks game progression.',
        keywords: ['invader board', 'setup', 'fear pool', 'terror level', 'blight card', 'invader deck'],
        related: ['setup-fear', 'setup-invader-deck', 'setup-blight'],
      },
      {
        id: 'setup-fear',
        title: 'Fear Pool & Fear Deck',
        content: 'Place 4 Fear Markers per player into the Fear Pool. Shuffle the Fear Cards and deal 9 face-down into the Fear Deck, inserting Terror Level dividers to create 3 groups of 3 cards each. The dividers separate Terror Level I, II, and III. As Spirits generate Fear, markers move from the Pool to the Generated Fear area. When the Pool empties, a Fear Card is earned.',
        keywords: ['fear', 'fear pool', 'fear markers', 'fear cards', 'fear deck', 'terror level', 'terror', 'generate fear'],
        related: ['fear-terror-levels', 'fear-cards-earned'],
        tip: 'Remember: 4 Fear Markers per player. With 3 players, that\'s 12 markers in the pool.',
      },
      {
        id: 'setup-invader-deck',
        title: 'Building the Invader Deck',
        content: 'Shuffle Stage I, II, and III Invader Cards separately. Make the Invader Deck with 3 Stage I cards on top, then 4 Stage II cards, then 5 Stage III cards on the bottom. The remaining cards are returned to the box without looking at them. Each card shows a terrain type that determines where Invaders act.',
        keywords: ['invader deck', 'stage', 'invader cards', 'terrain', 'explore', 'build', 'ravage'],
        related: ['invader-explore', 'invader-build', 'invader-ravage'],
        tip: 'The deck structure (3-4-5) ensures the game escalates: early turns have simpler Invader actions, later turns are more dangerous.',
      },
      {
        id: 'setup-blight',
        title: 'Blight Card Setup',
        content: 'Place a random Blight Card "Healthy Island" side up (don\'t read the Blighted side yet). Add Blight tokens equal to the number of players plus 1 onto the card. When the last Blight is removed from the card, flip it to the "Blighted Island" side and follow its instructions. This usually adds more Blight to the card and triggers a negative effect.',
        keywords: ['blight', 'blight card', 'healthy island', 'blighted island', 'blight tokens'],
        related: ['blight-cascade', 'blight-effects'],
        tip: 'For a 2-player game, place 3 Blight on the card (2 + 1).',
      },
      {
        id: 'setup-island-boards',
        title: 'Island Boards & Layout',
        content: 'Each player uses one Island Board. Arrange boards so they connect along matching edges to form the island. Standard boards (A-D) have a balanced layout. Thematic boards (E-H) have asymmetric terrain and specific setup instructions. Populate each board with the starting Invaders, Dahan, and Blight as shown by the icons printed on the board.',
        keywords: ['island board', 'board', 'thematic', 'standard', 'layout', 'terrain', 'dahan', 'populate'],
        related: ['setup-starting-invaders'],
      },
      {
        id: 'setup-starting-invaders',
        title: 'Starting Invader Placement',
        content: 'Each Island Board has icons showing where to place starting pieces. Typically: 1 City in land #1, 1 Town in land #2, 1 Explorer in lands #1, #2, and #3. 1 Dahan in lands #2, #3, and a few others. 1 Blight is not placed at start (it stays on the Blight Card). Check each board\'s specific icons carefully.',
        keywords: ['starting', 'placement', 'city', 'town', 'explorer', 'dahan', 'initial setup', 'invaders'],
        related: ['setup-island-boards'],
      },
      {
        id: 'setup-spirit',
        title: 'Spirit Setup',
        content: 'Each player chooses a Spirit. Take the Spirit Panel and 4 Unique Power Cards. Place Presence tokens on the dashed circles of the Spirit Panel\'s Presence tracks. Follow any special setup instructions on the back of the Spirit Panel (these vary by Spirit and may include placing Presence on the island, adding tokens, etc.).',
        keywords: ['spirit', 'spirit panel', 'presence', 'unique power', 'power cards', 'presence track', 'setup'],
        related: ['spirit-presence', 'spirit-growth'],
      },
      {
        id: 'setup-first-explore',
        title: 'Initial Explore',
        content: 'After all setup is complete, reveal the top card of the Invader Deck. Explore in that land type (add 1 Explorer to each land of that type that is adjacent to a Town, City, or Ocean). Then place the card face-up in the "Build" action space. This gives the Invaders a head start before the first full turn.',
        keywords: ['initial explore', 'first explore', 'starting action', 'explore', 'invader deck'],
        related: ['invader-explore'],
      },
    ],
  },
  {
    id: 'spirit-phase',
    title: 'Spirit Phase',
    icon: 'sparkles',
    description: 'Growth, gaining energy, and playing power cards.',
    color: '#D4A843',
    entries: [
      {
        id: 'spirit-growth',
        title: 'Growth',
        content: 'Each Spirit chooses one Growth option from their Spirit Panel. Growth options typically include combinations of: adding Presence to the island, gaining Power Cards, reclaiming played Power Cards, and gaining Energy. Growth is mandatory — you must choose one option and carry out as much of it as possible. Some Spirits have unique growth options.',
        keywords: ['growth', 'presence', 'reclaim', 'energy', 'power cards', 'spirit phase', 'add presence'],
        related: ['spirit-presence', 'spirit-energy', 'spirit-gain-power'],
      },
      {
        id: 'spirit-presence',
        title: 'Presence & Presence Tracks',
        content: 'Presence tokens represent a Spirit\'s connection to the island. Each Spirit Panel has two Presence tracks: one for Card Plays (how many Power Cards you can play per turn) and one for Energy gain (how much Energy you gain per turn). As you add Presence to the island, you uncover higher values on these tracks. Presence on the island also defines your "Sacred Sites" (lands with 2+ of your Presence).',
        keywords: ['presence', 'presence track', 'card plays', 'energy', 'sacred site', 'sacred sites'],
        related: ['spirit-growth', 'spirit-energy'],
        tip: 'Sacred Sites (2+ Presence) are important for many Innate Powers and targeting.',
      },
      {
        id: 'spirit-energy',
        title: 'Gain Energy',
        content: 'After Growth, gain Energy equal to the highest uncovered value on your Energy Presence track. Energy is the resource used to play Power Cards. Unspent Energy carries over between turns. Some Growth options also grant bonus Energy.',
        keywords: ['energy', 'gain energy', 'energy track', 'resource', 'spirit phase'],
        related: ['spirit-presence', 'spirit-play-cards'],
      },
      {
        id: 'spirit-play-cards',
        title: 'Play Power Cards',
        content: 'Play Power Cards from your hand face-down, up to the number shown on your Card Plays Presence track. Pay the Energy cost of each card played. Cards are placed face-down to keep your plans hidden from other players (though you can discuss strategy). Cards are revealed when resolved during the Fast or Slow Power phases.',
        keywords: ['play cards', 'power cards', 'card plays', 'energy cost', 'hand', 'face down'],
        related: ['spirit-energy', 'spirit-presence', 'fast-powers', 'slow-powers'],
      },
      {
        id: 'spirit-gain-power',
        title: 'Gaining New Power Cards',
        content: 'When a Growth option says "Gain a Power Card," draw 4 cards from either the Minor or Major Power deck. Keep 1 and discard the rest to the appropriate discard pile. If you gain a Major Power, you must also "Forget" (permanently remove) one of your Power Cards. Minor Powers are generally weaker but free to keep; Major Powers are stronger but require forgetting a card.',
        keywords: ['gain power', 'minor power', 'major power', 'draw', 'forget', 'discard'],
        related: ['spirit-growth'],
        tip: 'Gaining a Major Power and forgetting a weak Unique Power can dramatically increase your strength in the mid-game.',
      },
      {
        id: 'spirit-innate',
        title: 'Innate Powers',
        content: 'Each Spirit has Innate Powers printed on their Spirit Panel. These are not cards — they activate automatically if you have played enough matching Elements from your Power Cards. Check the Element thresholds on the Innate Power: if you meet or exceed each threshold, that level of the Innate Power activates. Multiple levels can activate in a single turn if you meet all their thresholds.',
        keywords: ['innate power', 'innate', 'elements', 'threshold', 'spirit panel', 'automatic'],
        related: ['elements-overview'],
        tip: 'Innate Powers can trigger at multiple levels. Read from top to bottom — each level is checked independently.',
      },
    ],
  },
  {
    id: 'fast-powers',
    title: 'Fast Powers Phase',
    icon: 'zap',
    description: 'Resolve Fast Power Cards and Fast Innate Powers before Invaders act.',
    color: '#E85D3A',
    entries: [
      {
        id: 'fast-overview',
        title: 'Fast Powers Overview',
        content: 'Fast Powers resolve before the Invader Phase. This is your chance to affect the board before Invaders Ravage, Build, or Explore. Power Cards with a red bird symbol in the upper-left corner are Fast Powers. Fast Innate Powers (marked with the same symbol on the Spirit Panel) also resolve now. Spirits may resolve their Fast Powers in any order they choose.',
        keywords: ['fast power', 'fast', 'resolve', 'before invaders', 'red bird', 'speed', 'fast innate'],
        related: ['slow-overview', 'spirit-play-cards'],
      },
      {
        id: 'fast-targeting',
        title: 'Targeting Rules',
        content: 'Each Power Card specifies a target: a land, a Spirit, or sometimes "any." Range is measured from your Presence (or Sacred Sites). Range 0 means the land must contain your Presence. Range 1 means adjacent to your Presence. "Sacred Site" targeting means you measure range from lands with 2+ of your Presence. Some Powers also have terrain requirements (e.g., target must be Jungle or Wetland).',
        keywords: ['target', 'targeting', 'range', 'sacred site', 'presence', 'adjacent', 'terrain', 'jungle', 'wetland', 'mountain', 'sand', 'coastal'],
        related: ['spirit-presence'],
        tip: 'Range is always measured from your Presence or Sacred Sites, not from the land where the effect happens.',
      },
      {
        id: 'fast-elements',
        title: 'Elements on Power Cards',
        content: 'Each Power Card shows Elements in the upper-left corner. When you play a card, those Elements count toward your Innate Power thresholds for the entire turn. Elements don\'t "spend" — they just need to be present. The eight Elements are: Sun, Moon, Fire, Air, Water, Earth, Plant, and Animal.',
        keywords: ['elements', 'sun', 'moon', 'fire', 'air', 'water', 'earth', 'plant', 'animal', 'innate', 'threshold'],
        related: ['elements-overview', 'spirit-innate'],
      },
    ],
  },
  {
    id: 'invader-phase',
    title: 'Invader Phase',
    icon: 'swords',
    description: 'The Invaders Ravage, Build, and Explore in sequence.',
    color: '#C0392B',
    entries: [
      {
        id: 'invader-blighted-island',
        title: 'Blighted Island Card',
        content: 'If the Blight Card has been flipped to its "Blighted Island" side, check for any ongoing effects at the start of the Invader Phase. Some Blighted Island cards have effects that trigger each turn, while others are one-time effects that already resolved when flipped.',
        keywords: ['blighted island', 'blight card', 'ongoing', 'invader phase'],
        related: ['setup-blight', 'blight-effects'],
      },
      {
        id: 'invader-fear-cards',
        title: 'Earn & Resolve Fear Cards',
        content: 'If any Fear Cards were earned (the Fear Pool was emptied one or more times), resolve them now, before Ravage. Flip earned Fear Cards face-up and resolve them in order. Fear Card effects depend on the current Terror Level. Each card has three effect tiers (Terror Level I, II, III) — use the one matching the current Terror Level. After resolving, discard the Fear Cards.',
        keywords: ['fear cards', 'fear', 'terror level', 'resolve fear', 'earned fear', 'fear pool'],
        related: ['setup-fear', 'fear-terror-levels'],
        tip: 'Fear Cards get stronger at higher Terror Levels. Pushing to Terror Level III can make Fear Cards devastatingly powerful.',
      },
      {
        id: 'invader-ravage',
        title: 'Ravage',
        content: 'Invaders Ravage in the land type shown on the Ravage action space card. In each matching land with Invaders: (1) Invaders deal Damage to the land — each Explorer deals 1, each Town deals 2, each City deals 3. (2) If total Damage ≥ 2, add 1 Blight to that land (and remove 1 from the Blight Card). (3) Dahan in the land take damage and are destroyed if they take 2+ damage. (4) Surviving Dahan fight back, each dealing 2 Damage to Invaders.',
        keywords: ['ravage', 'damage', 'blight', 'dahan', 'counterattack', 'dahan fight back', 'explorer', 'town', 'city', 'invader damage', 'destroy'],
        related: ['invader-damage', 'dahan-counterattack', 'blight-cascade'],
        tip: 'Dahan counterattack happens in the same Ravage step. 2 Dahan fighting back deal 4 damage — enough to destroy a Town!',
      },
      {
        id: 'invader-damage',
        title: 'Invader Damage Values',
        content: 'Explorers deal 1 Damage and have 1 Health. Towns deal 2 Damage and have 2 Health. Cities deal 3 Damage and have 3 Health. Damage to Invaders is assigned by the acting player. Excess damage on a single piece is wasted (it doesn\'t carry over). Dahan have 2 Health and deal 2 Damage when counterattacking.',
        keywords: ['damage', 'health', 'explorer', 'town', 'city', 'dahan', 'hit points', 'invader health', 'invader damage'],
        related: ['invader-ravage', 'dahan-counterattack'],
      },
      {
        id: 'dahan-counterattack',
        title: 'Dahan Counterattack',
        content: 'After Invaders deal damage during Ravage, surviving Dahan in the same land fight back. Each Dahan deals 2 Damage to Invaders. The player controlling that board decides how to assign Dahan damage among the Invaders. Destroying Invaders this way generates Fear (1 for a Town, 2 for a City). Dahan counterattack is part of the Ravage step, not a separate action.',
        keywords: ['dahan', 'counterattack', 'fight back', 'dahan damage', 'surviving dahan', 'ravage', 'fear generation'],
        related: ['invader-ravage', 'invader-damage', 'fear-generation'],
      },
      {
        id: 'invader-build',
        title: 'Build',
        content: 'Invaders Build in the land type shown on the Build action space card. In each matching land containing at least one Invader: if the land has more Towns than Cities (or equal), add a City. Otherwise, add a Town. Building only occurs in lands that already have Invaders — empty matching lands are skipped.',
        keywords: ['build', 'town', 'city', 'invader', 'build action', 'add town', 'add city'],
        related: ['invader-explore'],
        tip: 'Preventing Builds is crucial. A land with just 1 Explorer will Build a Town, which then Ravages for 2 damage next turn.',
      },
      {
        id: 'invader-explore',
        title: 'Explore',
        content: 'Reveal the top card of the Invader Deck. Add 1 Explorer to each land of the shown type that is adjacent to a Town, City, or the Ocean. Lands of the matching type that are not adjacent to any Town, City, or Ocean do not get an Explorer. The revealed card then moves to the Build action space, pushing existing cards along the track (Build → Ravage → discard).',
        keywords: ['explore', 'explorer', 'invader deck', 'adjacent', 'ocean', 'town', 'city', 'terrain type'],
        related: ['invader-build', 'invader-ravage'],
        tip: 'Wiping out all Invaders in a region prevents Explore from reaching there (unless it\'s adjacent to Ocean).',
      },
      {
        id: 'invader-card-advance',
        title: 'Advancing Invader Cards',
        content: 'After Explore, the Invader action track advances: the card in the Ravage space is discarded, the card in Build moves to Ravage, and the newly revealed Explore card moves to Build. This means each terrain type is Explored one turn, Built the next, and Ravaged the turn after. You can predict upcoming Ravages by looking at the Build space.',
        keywords: ['invader track', 'advance', 'card track', 'predict', 'upcoming', 'ravage next turn'],
        related: ['invader-explore', 'invader-build', 'invader-ravage'],
      },
    ],
  },
  {
    id: 'slow-powers',
    title: 'Slow Powers Phase',
    icon: 'turtle',
    description: 'Resolve Slow Power Cards and Slow Innate Powers after Invaders act.',
    color: '#2980B9',
    entries: [
      {
        id: 'slow-overview',
        title: 'Slow Powers Overview',
        content: 'Slow Powers resolve after the Invader Phase. Power Cards with a blue turtle symbol in the upper-left corner are Slow Powers. Slow Innate Powers (marked similarly on the Spirit Panel) also resolve now. While Slow Powers can\'t prevent the current turn\'s Ravage, they are excellent for setting up defenses, moving pieces, or dealing damage before the next turn.',
        keywords: ['slow power', 'slow', 'resolve', 'after invaders', 'blue turtle', 'speed', 'slow innate'],
        related: ['fast-overview', 'spirit-play-cards'],
      },
      {
        id: 'slow-strategy',
        title: 'Slow Power Strategy',
        content: 'Slow Powers are often more powerful than Fast Powers of the same cost because they resolve after Invaders act. Use Slow Powers to: destroy Invaders after they\'ve Ravaged (preventing next turn\'s Build), move Dahan into position for counterattacks, push Invaders out of lands before next turn\'s Ravage, add Defend to lands that will be Ravaged next turn, or generate Fear from destroying pieces.',
        keywords: ['strategy', 'slow power', 'defend', 'push', 'move', 'destroy', 'timing'],
        related: ['slow-overview', 'defend-mechanic'],
      },
    ],
  },
  {
    id: 'time-passes',
    title: 'Time Passes (Cleanup)',
    icon: 'clock',
    description: 'End-of-turn cleanup and preparation for the next turn.',
    color: '#8E44AD',
    entries: [
      {
        id: 'time-passes-overview',
        title: 'Time Passes Overview',
        content: 'After all Powers resolve: (1) All Damage on Invaders and Dahan heals (damage doesn\'t persist between turns). (2) Discard all played Power Cards to your personal discard pile. (3) Remove all "Defend" and single-turn effect markers from the board. (4) Any "this turn" effects end. Then the next turn begins with the Spirit Phase.',
        keywords: ['time passes', 'cleanup', 'heal', 'discard', 'defend', 'end of turn', 'damage heals', 'reset'],
        related: ['defend-mechanic'],
        tip: 'Damage heals every turn! If you deal 2 damage to a City (3 Health) but don\'t finish it off, it\'s back to full next turn.',
      },
    ],
  },
  {
    id: 'fear-terror',
    title: 'Fear & Terror',
    icon: 'ghost',
    description: 'How Fear is generated, Terror Levels advance, and Fear Cards resolve.',
    color: '#9B59B6',
    entries: [
      {
        id: 'fear-generation',
        title: 'Generating Fear',
        content: 'Fear is generated by: destroying a Town (1 Fear), destroying a City (2 Fear), and various Power Card effects. When you generate Fear, move that many markers from the Fear Pool to the Generated Fear area. When the Fear Pool is empty, you\'ve earned a Fear Card — refill the Pool with 4 markers per player and set the earned card aside.',
        keywords: ['fear', 'generate fear', 'fear pool', 'destroy town', 'destroy city', 'fear markers', 'earn fear card'],
        related: ['invader-fear-cards', 'setup-fear'],
      },
      {
        id: 'fear-terror-levels',
        title: 'Terror Levels',
        content: 'The game starts at Terror Level I. As Fear Cards are earned and the Fear Deck depletes, Terror Level dividers are revealed, advancing the Terror Level. Terror Level I: Victory requires destroying all Invaders. Terror Level II: Victory requires no Cities and no Invader Cards in the Ravage space. Terror Level III: Victory requires no Cities on the island. Terror Level IV (deck empty): Instant victory — the Invaders flee!',
        keywords: ['terror level', 'terror', 'victory condition', 'fear deck', 'divider', 'terror I', 'terror II', 'terror III', 'instant victory'],
        related: ['victory-conditions', 'fear-generation'],
        tip: 'Reaching Terror Level III makes winning much easier — you only need to eliminate Cities, not all Invaders.',
      },
      {
        id: 'fear-cards-earned',
        title: 'Resolving Fear Cards',
        content: 'Earned Fear Cards are resolved at the start of the Invader Phase, before Ravage. Each Fear Card has three tiers of effects corresponding to Terror Levels I, II, and III. You always use the effect matching the current Terror Level. Effects range from removing Explorers to destroying Towns and Cities. Multiple earned Fear Cards are resolved in order.',
        keywords: ['fear cards', 'resolve', 'terror level', 'earned', 'invader phase', 'fear effects'],
        related: ['invader-fear-cards', 'fear-terror-levels'],
      },
    ],
  },
  {
    id: 'elements',
    title: 'Elements',
    icon: 'flame',
    description: 'The eight Elements and how they interact with Innate Powers.',
    color: '#E67E22',
    entries: [
      {
        id: 'elements-overview',
        title: 'The Eight Elements',
        content: 'Spirit Island has eight Elements: Sun (☀), Moon (🌙), Fire (🔥), Air (💨), Water (💧), Earth (⛰), Plant (🌿), and Animal (🐾). Elements appear on Power Cards and are used to activate Innate Powers. Playing a card with Fire and Air gives you those elements for the entire turn. Elements don\'t "spend" — they\'re always available once played.',
        keywords: ['elements', 'sun', 'moon', 'fire', 'air', 'water', 'earth', 'plant', 'animal', 'innate power'],
        related: ['spirit-innate', 'fast-elements'],
      },
      {
        id: 'elements-thresholds',
        title: 'Element Thresholds',
        content: 'Innate Powers have Element thresholds — you need a certain combination of Elements from your played Power Cards to activate them. For example, an Innate Power might require "2 Fire, 1 Air" for its first level and "3 Fire, 2 Air, 1 Earth" for its second level. Each level is checked independently. You can activate multiple levels if you meet all their thresholds.',
        keywords: ['threshold', 'innate power', 'element requirement', 'activate', 'level', 'combination'],
        related: ['elements-overview', 'spirit-innate'],
      },
    ],
  },
  {
    id: 'tokens-pieces',
    title: 'Tokens & Game Pieces',
    icon: 'puzzle',
    description: 'Invaders, Dahan, Blight, and special tokens explained.',
    color: '#27AE60',
    entries: [
      {
        id: 'invader-pieces',
        title: 'Invader Pieces',
        content: 'Explorers: 1 Health, 1 Damage. The weakest Invaders, added during Explore. Towns: 2 Health, 2 Damage. Built when Invaders Build in a land. Destroying one generates 1 Fear. Cities: 3 Health, 3 Damage. Built when a land has more Towns than Cities. Destroying one generates 2 Fear. All Invader damage heals at end of turn.',
        keywords: ['explorer', 'town', 'city', 'invader', 'health', 'damage', 'fear', 'pieces'],
        related: ['invader-damage'],
      },
      {
        id: 'dahan-pieces',
        title: 'Dahan',
        content: 'Dahan are the indigenous people of the island. They have 2 Health and deal 2 Damage when counterattacking during Ravage. Dahan are not controlled by any player — they fight back automatically when Invaders Ravage their land. Many Power Cards can move Dahan, add Dahan, or use them for effects. If all Dahan in a land are destroyed, Spirits lose a potential ally there.',
        keywords: ['dahan', 'indigenous', 'counterattack', 'health', 'damage', 'fight back', 'ally'],
        related: ['dahan-counterattack'],
      },
      {
        id: 'blight-effects',
        title: 'Blight',
        content: 'Blight represents ecological destruction. When Invaders deal 2+ damage to a land during Ravage, 1 Blight is added (taken from the Blight Card). Adding Blight to a land that already has Blight causes a Blight Cascade — the extra Blight is added to an adjacent land (which may cascade further). Each Blight added to a land also destroys 1 Presence of each Spirit in that land.',
        keywords: ['blight', 'cascade', 'blight cascade', 'destroy presence', 'ecological', 'ravage', 'damage'],
        related: ['blight-cascade', 'setup-blight'],
      },
      {
        id: 'blight-cascade',
        title: 'Blight Cascade',
        content: 'When Blight is added to a land that already contains Blight, a cascade occurs: add 1 additional Blight to any adjacent land. If that adjacent land also already has Blight, it cascades again. Each land can only cascade once per Ravage action. Cascading Blight still destroys Presence and still comes from the Blight Card.',
        keywords: ['cascade', 'blight cascade', 'adjacent', 'chain reaction', 'spread blight'],
        related: ['blight-effects'],
        tip: 'Cascades can be devastating. Try to prevent Blight from accumulating in adjacent lands.',
      },
      {
        id: 'defend-mechanic',
        title: 'Defend',
        content: 'Defend X in a land reduces Invader damage during Ravage by X. Defend applies to the total Invader damage before it hits the land and Dahan. For example, Defend 3 in a land with 1 Town (2 damage) means the Town\'s damage is fully absorbed. Defend does not persist between turns — it\'s removed during Time Passes.',
        keywords: ['defend', 'defense', 'reduce damage', 'protect', 'ravage', 'absorb'],
        related: ['invader-ravage', 'time-passes-overview'],
        tip: 'Defend is one of the most efficient ways to prevent Blight. Even Defend 2 can stop an Explorer from causing Blight.',
      },
      {
        id: 'tokens-beasts',
        title: 'Beasts Token',
        content: 'Beasts are animal tokens added by Branch & Claw and later expansions. They don\'t act on their own but are referenced by many Power Cards and Events. Some Powers let Beasts deal damage, and Events may cause Beasts to attack Invaders or move. Beasts start on specific lands during setup with Branch & Claw.',
        keywords: ['beasts', 'beast', 'token', 'animal', 'branch and claw', 'event'],
        related: ['tokens-wilds', 'tokens-disease'],
        expansion: 'Branch & Claw',
      },
      {
        id: 'tokens-wilds',
        title: 'Wilds Token',
        content: 'Wilds tokens represent untamed wilderness. During Explore, if a land has a Wilds token, Explorers are not added there (the Wilds prevents Explore). The Wilds token is then removed. This is a powerful defensive tool — placing Wilds in a land that will be Explored prevents Invader expansion.',
        keywords: ['wilds', 'wild', 'token', 'prevent explore', 'branch and claw', 'defense'],
        related: ['tokens-beasts', 'invader-explore'],
        expansion: 'Branch & Claw',
        tip: 'Wilds tokens are consumed when they prevent an Explore. Place them strategically in lands you know will be Explored.',
      },
      {
        id: 'tokens-disease',
        title: 'Disease Token',
        content: 'Disease tokens weaken Invaders. During Build, if a land has a Disease token, Invaders do not Build there. The Disease token is then removed. Like Wilds, Disease is consumed on use. It\'s excellent for preventing the Build step in critical lands.',
        keywords: ['disease', 'token', 'prevent build', 'branch and claw', 'weaken'],
        related: ['tokens-beasts', 'invader-build'],
        expansion: 'Branch & Claw',
        tip: 'Disease prevents Build, Wilds prevents Explore. Together they can completely shut down Invader progression in a land.',
      },
      {
        id: 'tokens-strife',
        title: 'Strife Token',
        content: 'Strife tokens represent internal conflict among Invaders. When an Invader with Strife would deal damage during Ravage, it instead deals no damage and the Strife token is removed. Strife only affects one Ravage — the Invader skips dealing damage once. Strife is placed on a specific Invader piece, not on the land.',
        keywords: ['strife', 'token', 'no damage', 'skip damage', 'branch and claw', 'invader conflict'],
        related: ['invader-ravage'],
        expansion: 'Branch & Claw',
        tip: 'Place Strife on the most dangerous Invader in a land (usually the City) to neutralize the biggest threat.',
      },
      {
        id: 'tokens-badlands',
        title: 'Badlands Token',
        content: 'Badlands tokens (from Jagged Earth) increase damage dealt in a land. Each Badlands token adds +1 damage to every damage-dealing action in that land — both Invader Ravage damage AND Dahan/Spirit damage. This is a double-edged sword: it helps your attacks but also makes Invader Ravages more dangerous.',
        keywords: ['badlands', 'token', 'extra damage', 'jagged earth', 'double-edged'],
        related: ['invader-ravage'],
        expansion: 'Jagged Earth',
      },
      {
        id: 'tokens-vitality',
        title: 'Vitality Token',
        content: 'Vitality tokens (from Nature Incarnate) represent the land\'s life force. They can absorb Blight — when Blight would be added to a land with Vitality, remove the Vitality token instead. This effectively prevents one Blight placement.',
        keywords: ['vitality', 'token', 'prevent blight', 'nature incarnate', 'life force'],
        expansion: 'Nature Incarnate',
      },
    ],
  },
  {
    id: 'victory-defeat',
    title: 'Victory & Defeat',
    icon: 'trophy',
    description: 'How to win and lose the game.',
    color: '#F1C40F',
    entries: [
      {
        id: 'victory-conditions',
        title: 'Victory Conditions',
        content: 'Victory depends on the current Terror Level. Terror Level I: No Invaders remain on the island (no Explorers, Towns, or Cities). Terror Level II: No Cities remain and no Invader Card is in the Ravage space. Terror Level III: No Cities remain on the island. Terror Level IV (Fear Deck empty): Instant victory — the Invaders flee in terror! Victory is checked continuously throughout the game.',
        keywords: ['victory', 'win', 'terror level', 'win condition', 'no invaders', 'no cities', 'instant victory', 'fear deck empty'],
        related: ['fear-terror-levels'],
      },
      {
        id: 'loss-conditions',
        title: 'Loss Conditions',
        content: 'You lose if any of these occur: (1) Any Spirit has no Presence on the island (all Presence destroyed by Blight). (2) The Blight Card runs out of Blight tokens and you need to add more. (3) You need to draw an Invader Card but the Invader Deck is empty (time runs out). Loss is checked continuously and takes priority over victory if both happen simultaneously.',
        keywords: ['loss', 'lose', 'defeat', 'no presence', 'blight', 'invader deck empty', 'time runs out', 'game over'],
        related: ['blight-effects', 'setup-blight'],
        tip: 'The most common loss is running out of Blight. Keep an eye on the Blight Card and prioritize preventing Ravages in lands with existing Blight.',
      },
    ],
  },
  {
    id: 'expansion-rules',
    title: 'Expansion Rules',
    icon: 'package',
    description: 'Rules added or changed by each expansion.',
    color: '#1ABC9C',
    entries: [
      {
        id: 'expansion-bc-events',
        title: 'Event Deck (Branch & Claw)',
        content: 'Branch & Claw adds the Event Deck. At the start of the Invader Phase (before Fear Cards), draw and resolve an Event Card. Events have two halves: a Dahan/Spirit effect (usually helpful) and a Blight/Invader effect (usually harmful). Some Events reference tokens (Beasts, Wilds, Disease, Strife). The Event Deck adds unpredictability and thematic storytelling.',
        keywords: ['event', 'event deck', 'event card', 'branch and claw', 'dahan event', 'invader event', 'unpredictable'],
        related: ['tokens-beasts', 'tokens-wilds', 'tokens-disease', 'tokens-strife'],
        expansion: 'Branch & Claw',
      },
      {
        id: 'expansion-bc-tokens',
        title: 'Token Overview (Branch & Claw)',
        content: 'Branch & Claw introduces four token types: Beasts (animal allies), Wilds (prevents Explore), Disease (prevents Build), and Strife (prevents Invader damage). These tokens are placed on the board by Power Cards and Events. Each is consumed when it activates its effect. The tokens add a new strategic layer to the game.',
        keywords: ['tokens', 'beasts', 'wilds', 'disease', 'strife', 'branch and claw'],
        related: ['tokens-beasts', 'tokens-wilds', 'tokens-disease', 'tokens-strife'],
        expansion: 'Branch & Claw',
      },
      {
        id: 'expansion-je-overview',
        title: 'Jagged Earth Overview',
        content: 'Jagged Earth adds 10 new Spirits, Badlands tokens, 2 new Adversaries (Russia and Habsburg Monarchy), support for 5-6 players, new Scenarios, and many new Power Cards. Badlands tokens add +1 damage to all damage sources in a land. The expansion also adds new Event Cards to shuffle into the Event Deck.',
        keywords: ['jagged earth', 'badlands', 'russia', 'habsburg', '5 players', '6 players', 'expansion'],
        related: ['tokens-badlands'],
        expansion: 'Jagged Earth',
      },
      {
        id: 'expansion-ff-overview',
        title: 'Feather & Flame Overview',
        content: 'Feather & Flame collects content from Promo Packs 1 and 2. It includes 4 new Spirits, 1 new Adversary (Habsburg Mining Expedition), and new Scenarios. It does not add new token types but provides additional variety in Spirits and challenges.',
        keywords: ['feather and flame', 'promo', 'promo pack', 'expansion'],
        expansion: 'Feather & Flame',
      },
      {
        id: 'expansion-ni-overview',
        title: 'Nature Incarnate Overview',
        content: 'Nature Incarnate adds 8 new Spirits, Vitality and Depletion tokens, 1 new Adversary, and 2 new Scenarios. Vitality tokens can absorb Blight, while Depletion tokens represent exhausted lands. The expansion focuses on the natural cycles of the island.',
        keywords: ['nature incarnate', 'vitality', 'depletion', 'expansion'],
        related: ['tokens-vitality'],
        expansion: 'Nature Incarnate',
      },
      {
        id: 'expansion-horizons',
        title: 'Horizons of Spirit Island',
        content: 'Horizons is a standalone introductory set compatible with the base game. It includes 5 new low-complexity Spirits and 2 new Island Boards. It does not add new mechanics or tokens — it\'s designed as an accessible entry point. The Spirits from Horizons can be used with any expansion.',
        keywords: ['horizons', 'introductory', 'standalone', 'low complexity', 'beginner'],
        expansion: 'Horizons of Spirit Island',
      },
      {
        id: 'adversary-rules',
        title: 'Adversary Rules',
        content: 'Adversaries represent specific colonizing nations with unique rules that modify the game. Each Adversary has levels 0-6, with higher levels adding more rules and increasing difficulty. Adversary effects can change Setup (additional starting pieces), Explore, Build, Ravage, and other game mechanics. Some Adversaries add Escalation effects that trigger each turn.',
        keywords: ['adversary', 'difficulty', 'level', 'escalation', 'colonizer', 'nation', 'england', 'sweden', 'prussia', 'france', 'russia', 'habsburg', 'scotland'],
        related: ['setup-invader-board'],
      },
      {
        id: 'scenario-rules',
        title: 'Scenario Rules',
        content: 'Scenarios modify the game with special rules, alternate victory conditions, or changed mechanics. Each Scenario has a difficulty modifier that adjusts the overall challenge. Scenarios can be combined with Adversaries for additional complexity. Some Scenarios change the board layout, add special tokens, or alter how certain game phases work.',
        keywords: ['scenario', 'difficulty', 'modifier', 'special rules', 'alternate victory', 'challenge'],
      },
    ],
  },
  {
    id: 'key-concepts',
    title: 'Key Concepts',
    icon: 'lightbulb',
    description: 'Important game concepts, terminology, and common questions.',
    color: '#3498DB',
    entries: [
      {
        id: 'concept-sacred-site',
        title: 'Sacred Sites',
        content: 'A Sacred Site is any land containing 2 or more Presence of a single Spirit. Sacred Sites are important for targeting — many Power Cards and Innate Powers can only target from Sacred Sites or have extended range from them. Building Sacred Sites early gives you more flexibility in where you can use your powers.',
        keywords: ['sacred site', 'sacred sites', 'presence', '2 presence', 'targeting', 'range'],
        related: ['spirit-presence', 'fast-targeting'],
      },
      {
        id: 'concept-coastal',
        title: 'Coastal Lands',
        content: 'Coastal lands are any lands adjacent to the Ocean. The Ocean itself is not a land — pieces cannot normally be placed there. Coastal lands are significant because Explorers can Explore into coastal lands even without adjacent Towns/Cities (the Ocean counts as a source). Some Powers specifically target or affect coastal lands.',
        keywords: ['coastal', 'ocean', 'adjacent', 'explore', 'land type'],
        related: ['invader-explore'],
      },
      {
        id: 'concept-inland',
        title: 'Inland Lands',
        content: 'Inland lands are any lands NOT adjacent to the Ocean. They are generally safer from Explore (Invaders need an adjacent Town or City to Explore there) but can still be reached as the game progresses. Some Spirits specialize in protecting inland areas.',
        keywords: ['inland', 'not coastal', 'interior', 'safe'],
        related: ['concept-coastal'],
      },
      {
        id: 'concept-push-gather',
        title: 'Push & Gather',
        content: 'Push means to move pieces OUT of a land to adjacent lands. Gather means to move pieces INTO a land from adjacent lands. "Push 1 Explorer" means move 1 Explorer from the target land to any adjacent land. "Gather 1 Dahan" means move 1 Dahan from an adjacent land into the target land. You choose which adjacent land for each piece.',
        keywords: ['push', 'gather', 'move', 'adjacent', 'explorer', 'dahan', 'invader', 'relocate'],
      },
      {
        id: 'concept-isolate',
        title: 'Isolate',
        content: 'Isolate means a land is treated as if it has no adjacent lands for the purpose of Invader actions. An Isolated land cannot be Explored into (no adjacency to Towns/Cities matters), and pieces cannot be pushed or gathered to/from it by Invader effects. Spirit Powers can still target Isolated lands normally.',
        keywords: ['isolate', 'isolated', 'no adjacency', 'prevent explore', 'cut off'],
        expansion: 'Jagged Earth',
      },
      {
        id: 'concept-replace',
        title: 'Replace & Downgrade',
        content: 'Replace means to swap one piece for another. "Replace 1 City with 1 Town" removes the City and puts a Town in its place. This generates Fear as if the City were destroyed (2 Fear). Downgrade specifically means replacing a piece with a weaker version (City → Town, Town → Explorer). Downgrading also generates appropriate Fear.',
        keywords: ['replace', 'downgrade', 'swap', 'city to town', 'town to explorer', 'fear generation'],
        related: ['fear-generation'],
      },
      {
        id: 'concept-repeat',
        title: 'Repeat a Power',
        content: 'Some effects let you "Repeat" a Power. This means you resolve the Power\'s effect again with the same or different targeting. You do not pay the Energy cost again. The repeated use can target a different land if the Power\'s targeting allows it. Elements from the repeated card still count (they were already played).',
        keywords: ['repeat', 'repeat power', 'resolve again', 'free', 'no cost'],
      },
      {
        id: 'concept-damage-destroy',
        title: 'Damage vs. Destroy',
        content: '"Deal X Damage" means you assign X points of damage among Invaders in the target land. Excess damage on a single piece is wasted. "Destroy" means immediately remove the piece regardless of its remaining Health. Destroying always generates Fear (1 for Town, 2 for City). "Remove" is like Destroy but does NOT generate Fear.',
        keywords: ['damage', 'destroy', 'remove', 'fear', 'health', 'assign damage', 'excess damage'],
        related: ['invader-damage', 'fear-generation'],
        tip: '"Remove" and "Destroy" are different! Destroy generates Fear, Remove does not.',
      },
    ],
  },
];

// Flatten all entries for search
export function getAllRuleEntries(): (RuleEntry & { categoryId: string; categoryTitle: string; categoryColor: string })[] {
  return RULES_DATA.flatMap(cat =>
    cat.entries.map(entry => ({
      ...entry,
      categoryId: cat.id,
      categoryTitle: cat.title,
      categoryColor: cat.color,
    }))
  );
}

// Search function
export function searchRules(query: string): (RuleEntry & { categoryId: string; categoryTitle: string; categoryColor: string })[] {
  if (!query.trim()) return [];
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const allEntries = getAllRuleEntries();

  return allEntries
    .map(entry => {
      let score = 0;
      const titleLower = entry.title.toLowerCase();
      const contentLower = entry.content.toLowerCase();
      const keywordsJoined = entry.keywords.join(' ').toLowerCase();

      for (const term of terms) {
        // Title match (highest weight)
        if (titleLower.includes(term)) score += 10;
        // Keyword match (high weight)
        if (keywordsJoined.includes(term)) score += 7;
        // Content match (lower weight)
        if (contentLower.includes(term)) score += 3;
        // Exact keyword match (bonus)
        if (entry.keywords.some(k => k.toLowerCase() === term)) score += 5;
      }

      return { ...entry, score };
    })
    .filter(e => e.score > 0)
    .sort((a, b) => b.score - a.score);
}
