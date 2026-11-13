/* Exile Catch-Up, PoE2 0.5 cards: the endgame and Atlas, pinnacle bosses, the campaign, the Trials, rules for your
   character, and the interface. Sections of poe2/sources/0.5.0-patch-notes.txt: Endgame, Origins of Divinity, Masters
   of the Atlas, Other Endgame Changes, Campaign Replayability, Player Changes, Monster Changes, Quest Changes, User
   Interface Changes, and the 0.5.5 Trial of Chaos, Endgame and User Interface sections, plus later-patch lines on the
   same topics. "Now" is the game after the last 0.5.x patch. Schema: spec 5.3 and 5.4. Every sources string is an
   exact quote from one line of the notes. */
EXILE.addChanges([

  /* The new Atlas and the Precursor Fortress */

  { id: "atlas-reset-fixed-places", league: "0.5", area: "atlas", kind: "changed", verdict: "do", priority: 1,
    who: ["maps"], tags: [],
    headline: "The Atlas was reset, with fixed places and quests to follow",
    before: "The [[atlas|Atlas]] was an endless map that grew in every direction. You opened [[map|maps]] next to ones you had finished, and league content turned up at random or through [[precursor-tablet|Tablets]].",
    now: "Your Atlas starts fresh, with fixed places to aim for and 30 new maps. Each league mechanic has a quest line that teaches it and leads to its [[pinnacle-boss|pinnacle boss]]. Old [[waystone|Waystones]] and Tablets still work.",
    so: "Follow the quest tracker from your Atlas start. Pick the mechanics you enjoy and follow their quests toward their bosses.",
    soType: "fact", viz: null,
    sources: [
      "The Atlas now has fixed points of interest at specific locations, giving you distinct objectives that are easy to find.",
      "All league mechanics on the Atlas now have quests that introduce the mechanic and guide you through its various stages up to the Pinnacle Boss.",
      "Added 30 new Endgame Map Areas.",
      "With the introduction of the new Endgame storyline, the Atlas has been reset. Your existing tablets and waystones will continue to work so you can continue your progression as normal, but in order to gain points for the Atlas Tree you will need to do the Origins of Divinity storyline."
    ] },

  { id: "fortress-maps-give-atlas-points", league: "0.5", area: "atlas", kind: "changed", verdict: "do", priority: 1,
    who: ["maps"], tags: [],
    headline: "Atlas tree points now come from the Precursor Fortress",
    before: "Before 0.5 you earned points for your main [[atlas-passive-tree|Atlas tree]] in other ways, such as clearing [[corrupted-nexus|Corrupted Nexuses]]. The tree had more nodes than you had points, so you picked a path and respecced to change it.",
    now: "Finish your first [[precursor-tower|Precursor Tower]] and the [[precursor-fortress|Precursor Fortress]] rises. Its maps now give these points, and 0.5.1 raised how many. Clearing them all fills the whole 300+ node tree, so there is no respec, and multi-choice nodes switch any time.",
    so: "Head for the Fortress as soon as you reach maps, since your main Atlas tree now grows only there. Later, one kill of the repeatable [[arbiter-of-divinity|Arbiter of Divinity]] completes the whole Fortress at once.",
    soType: "fact", viz: null,
    sources: [
      "On completion of your first tower, a Fortress will rise from the earth",
      "Maps inside the fortress grant one or more passive points for the Atlas Passive Tree. This entirely replaces the previous method of gaining Atlas Points.",
      "The Atlas Tree has been significantly expanded with over 300 nodes. After completing all the maps inside the fortress, you will gain enough passive points to fully allocate the Atlas Tree.",
      "As the entire atlas tree can be fully allocated, there is no need to allow respecialisation for it any more. Multi-choice nodes on the tree can be changed between options at any time.",
      "Fortress Towers, Gateways, Enigma Chambers, and Halls now award more Atlas Passive Skill Points. Players who have already completed these areas will be granted the additional Passive Skill Points upon logging in.",
      "Defeating the Arbiter of Divinity using the non-quest version of the Origin Core now completes the entire Precursor Fortress for the Map owner, allowing you to allocate the Atlas Passive Tree as desired."
    ] },

  { id: "arbiter-divinity-completes-fortress", league: "0.5", area: "atlas", kind: "changed", verdict: "know", priority: 1,
    who: ["maps", "bosses"], tags: [],
    headline: "Beat the repeatable Arbiter of Divinity once to finish the Fortress",
    before: "At 0.5 launch, killing the [[arbiter-of-divinity|Arbiter of Divinity]] five times could stand in for clearing [[precursor-fortress|Fortress]] maps. Each kill completed one section of the Fortress.",
    now: "Since 0.5.5, one kill of his repeatable version, opened with a non-quest Origin Core, completes the whole Fortress for the map owner. That unlocks your full [[atlas-passive-tree|Atlas tree]] at once. The quest version no longer completes any section.",
    so: "If your build can kill him, this skips the long Fortress map grind. The tradeable Origin Fragments that start the fight are on the [[currency-exchange|Currency Exchange]].",
    soType: "fact", viz: null,
    sources: [
      "Maps in the fortress can be alternatively completed by killing the Arbiter of Divinity 5 times to complete different sections of the fortress automatically in order to gain Atlas Tree points.",
      "Defeating the Arbiter of Divinity using the non-quest version of the Origin Core now completes the entire Precursor Fortress for the Map owner, allowing you to allocate the Atlas Passive Tree as desired.",
      "Defeating the Arbiter of Divinity using the quest version of the Origin Core no longer allows the completion of a section of the Precursor Fortress.",
      "Fixed an issue where tradeable Origin Fragments used to start the Arbiter of Divinity pinnacle fight were missing from the Currency Exchange."
    ] },

  { id: "masters-of-the-atlas-bonuses", league: "0.5", area: "atlas", kind: "new", verdict: "do", priority: 1,
    who: ["maps"], tags: [],
    headline: "New: Masters of the Atlas, swappable bonuses for your maps",
    before: "Your [[atlas-passive-tree|Atlas tree]] and the [[precursor-tablet|Tablets]] you slotted were the ways to shape what your [[map|maps]] held.",
    now: "[[doryani|Doryani]], [[hilda|Hilda]] and [[jado|Jado]] each offer 12 bonuses, like an [[ascendancy|ascendancy]] for your maps. Pick 4 from each master and change them before any map. Doing their missions unlocks the bonuses 3 at a time.",
    so: "Start all three quest lines early. Visit Hilda's camp south-west of your Atlas start, finish the anomaly map near the start for Jado, and clear a [[corrupted-nexus|Corrupted Nexus]] for Doryani.",
    soType: "fact", viz: null,
    sources: [
      "Alongside the Atlas tree, a new system called Masters of the Atlas introduces Ascendancy-style progression for the endgame. Players can align with different masters - such as Jado of the Order of the Djinn or the monster hunter Hilda - each offering unique, asymmetric bonuses that can be swapped between maps at will, enabling build-defining bonuses.",
      "Each master has 12 nodes of which 4 can be selected at the same time. You can change your selection at any time.",
      "Unlock each row of 3 nodes by performing missions for the masters.",
      "New Atlas Master: Doryani's Science questline is unlocked by clearing a corruption nexus.",
      "New Atlas Master: Hilda's Hunting questline is unlocked by visting Hilda's Campsite slightly south-west of your starting location on the atlas",
      "New Atlas Master: Jado's Spycraft questline is unlocked by completing an anomaly map near the starting location."
    ] },

  { id: "fortress-party-be-present", league: "0.5", area: "atlas", kind: "changed", verdict: "know", priority: 3,
    who: ["party"], tags: [],
    headline: "In a party, stay for every Fortress boss kill",
    before: "Each player has their own [[atlas|Atlas]] and their own progress on it, even when friends run maps together.",
    now: "Clearing a fixed place on the Atlas now counts for every party member. Since 0.5.5c, you must be present when the bosses of the Halls and Enigma Chambers die, or you can't pick up their quest items.",
    so: "Playing with friends? Stay in each [[precursor-fortress|Fortress]] boss fight until the boss dies, or your Fortress quest can stall.",
    soType: "fact", viz: null,
    sources: [
      "Completion of fixed locations on the Atlas is now shared with party members.",
      "You now have to have been present when the bosses of the Patriarch Halls and Matriarch Halls die in order to pick up the Origin Spark and Origin Cradle.",
      "You now have to have been present when the bosses of the Western Enigma Chamber and Eastern Enigma Chamber die in order to pick up the Ancient Crisis Fragment and Weathered Crisis Fragment."
    ] },

  /* Waystones, Tablets and what your maps hold */

  { id: "waystones-must-be-identified", league: "0.5", area: "atlas", kind: "changed", verdict: "do", priority: 1,
    who: ["maps"], tags: [],
    headline: "Identify your Waystones, or the Map Device won't take them",
    before: "A [[waystone|Waystone]] is PoE2's map key. You could put one in the Map Device without identifying it and run its [[modifier|modifiers]] blind.",
    now: "The Map Device now only takes identified Waystones. Waystones also have new art, so they look different in your stash.",
    so: "Identify every Waystone before you open a map. It also shows you which modifiers you are taking on.",
    soType: "fact", viz: null,
    sources: [
      "Waystones must now be identified in order to activate them in the Map Device.",
      "Waystones have received new 2D art."
    ] },

  { id: "waystone-modifiers-resorted", league: "0.5", area: "atlas", kind: "changed", verdict: "know", priority: 2,
    who: ["maps"], tags: [],
    headline: "Waystone prefixes now mean monsters hitting you harder",
    before: "Since 0.3, each [[waystone|Waystone]] [[modifier|modifier]] pairs a downside, such as monsters dealing extra cold damage, with an upside like more [[pack-size|Pack Size]], plus some extra Waystone drop chance.",
    now: "[[prefix|Prefixes]] are now mostly about monsters hurting you, and [[suffix|suffixes]] about you or monster defences. Upsides give more [[monster-effectiveness|Monster Effectiveness]], Pack Size, [[item-rarity|Item Rarity]], [[monster-rarity|Monster Rarity]] or Waystone drop chance. Pack Size also adds a chance for an extra rare monster.",
    so: "Read a Waystone's prefixes to see how much harder monsters will hit you. The suffixes tell you what changes for you and for monster defences.",
    soType: "fact", viz: null,
    sources: [
      "Whether a Map Modifier is a Suffix or a Prefix has been adjusted so that generally Prefixes are Modifiers that affect a monster output towards the player, and Suffixes are Modifiers that affect the player or monster defences.",
      "Waystone Modifier bonuses have been updated. They now provide more Monster Effectiveness, Pack Size, Item Rarity, Monster Rarity, or Waystone Drop Chance, depending on the modifier. These Modifiers are multiplicative with other sources, such as those found on the Atlas Passive Tree.",
      "Modifiers to Pack Size now also provide a chance for an additional Rare Monster to appear in Rare Monster packs.",
      "Monster Rarity is a new stat available that affects the chances of magic and rare monsters, and the chance for additional modifiers on Rare Monsters.",
      "The following Modifiers can no longer roll on Waystones: Baron's, Beastly, Brambled, Doryani's, Enervating, Faridun's, Hallowed, of Nemeses, Perennial's, Rusted, and Sacrificial."
    ] },

  { id: "monster-effectiveness-loot-halved", league: "0.5", area: "atlas", kind: "nerf", verdict: "know", priority: 2,
    who: ["maps"], tags: [],
    headline: "Monster Effectiveness now adds half as much loot and experience",
    before: "Since 0.4, higher [[waystone-tier|Waystone tiers]] raise [[monster-effectiveness|Monster Effectiveness]] instead of [[pack-size|Pack Size]]. It gives monsters more life, and they give more experience and drop more items.",
    now: "The extra item quantity and experience it gives were halved, including in [[atziris-temple|Atziri's Temple]]. Some Waystone modifiers now give more of it. The new [[omen|Omen]] of Chaotic Effectiveness makes your next [[chaos-orb|Chaos Orb]] reroll a Waystone into modifiers with no Effectiveness.",
    so: "Tougher monsters now pay less for the risk. If you reroll Waystones with [[omen|Omens]] of Chaotic Rarity, Quantity or Monsters, note they now keep that kind of modifier off instead of forcing it. Up to 3 of these Omens work at once.",
    soType: "fact", viz: null,
    sources: [
      "Halved the bonus to Quantity of Item Dropped and Experience Gain provided by increased Monster Effectiveness (such as from Atziri's Temple).",
      "Waystone Modifier bonuses have been updated. They now provide more Monster Effectiveness, Pack Size, Item Rarity, Monster Rarity, or Waystone Drop Chance, depending on the modifier. These Modifiers are multiplicative with other sources, such as those found on the Atlas Passive Tree.",
      "Added the new Omen of Chaotic Effectiveness. While this item is active in your inventory your next Chaos Orb will replace all Modifiers on a Waystone with Modifiers that do not grant Monster Effectiveness.",
      "The functionality of the Omen of Chaotic Rarity, Omen of Chaotic Quantity and Omen of Chaotic Monsters have been inverted. Instead of guaranteeing the new modifiers are of their type, they instead prevent the modifiers from being of their type.",
      "Up to 3 of the above Omens may be used simultaneously."
    ] },

  { id: "tablets-stack-empty-slots-random", league: "0.5", area: "atlas", kind: "changed", verdict: "do", priority: 1,
    who: ["maps"], tags: [],
    headline: "Stack the same Tablet type, and empty slots add random content",
    before: "[[precursor-tablet|Precursor Tablets]] go in the Map Device beside your [[waystone|Waystone]]. Most added or boosted one league mechanic, and other mechanics showed up in [[map|maps]] at random.",
    now: "Tablets of the same type now stack for more of that content. Each empty slot adds random league content, so full slots give only what your Tablets add. [[orb-of-chance|Orbs of Chance]] work on Tablets, and 0.5.5b made Expedition, Temple and Delirium Tablets drop more.",
    so: "Fill every slot with Tablets for the mechanic you farm. Leave slots empty if you like a random mix.",
    soType: "fact", viz: null,
    sources: [
      "Tablets of the same type may now be used together to increase the amount of the league content that is spawned. The specifics of this are different for each content type. In some cases adding multiple tablets will increase the size of a single encounter, while in other cases it will increase the number of encounters spawned.",
      "Each empty tablet slot now contributes to the amount of random non-tablet spawned league content in the area. This means that if all tablets slots are full, you will only see the league content from the tablets you are using. The intent of this change is to make sure that you do not need to complete the atlas trees for leagues you do not intend to run.",
      "You can now use Orbs of Chance on Tablets.",
      "Increased the droprate of Expedition, Temple & Delirium Tablets."
    ] },

  { id: "atlas-passives-gate-drops", league: "0.5", area: "atlas", kind: "changed", verdict: "know", priority: 2,
    who: ["maps", "crafting"], tags: [],
    headline: "Some drops now need Atlas passives, and map extras start rarer",
    before: "Map extras like [[essence|Essences]], [[shrine|Shrines]], [[strongbox|Strongboxes]] and [[summoning-circle|Summoning Circles]] showed up at a set base chance. [[fracturing-orb|Fracturing Orbs]] and Overseer [[precursor-tablet|Tablets]] needed no special setup to find.",
    now: "Those base chances in [[map|maps]] were lowered somewhat, because the [[atlas-passive-tree|Atlas tree]] can now raise them much more. Exceptional items, Fracturing Orbs, and Basic and Overseer Tablets now need Atlas passives before you can find them.",
    so: "Take the Atlas passives for the extras and drops you want. Without them you will see less of that content.",
    soType: "fact", viz: null,
    sources: [
      "Some items and content now require you to specialise in them through Atlas Passive Skills including Exceptional Items, Fracturing Orbs, Basic and Overseer precursor tablets.",
      "Lowered the base chances for Essences, Azmeri Spirits, Shrines, Strongboxes, Summoning Circles and Rogue Exiles appearing in Maps somewhat due to the much larger increase now available on the Atlas Tree."
    ] },

  { id: "waystone-sustain-atlas-passives", league: "0.5", area: "atlas", kind: "buff", verdict: "know", priority: 2,
    who: ["maps"], tags: [],
    headline: "Four Atlas passives now make map bosses drop more Waystones",
    before: "[[map-boss|Map bosses]] are a main source of new [[waystone|Waystones]]. In the first days of 0.5, players worried about keeping enough of them in high tiers.",
    now: "A hotfix added more Waystones from map bosses to four [[atlas-passive-tree|Atlas passives]]. Pathkeepers now gives 15%, up from 10%. Atop the World, Archaeological Interest and Valuable Paths each add 10%.",
    so: "Take these passives if you keep running out of high-tier Waystones.",
    soType: "fact",
    viz: { type: "bars", caption: "Pathkeepers: more Waystones from map bosses",
      rows: [{ label: "Before", value: 10, display: "10%" }, { label: "Now", value: 15, display: "15%" }] },
    sources: [
      "To alleviate concerns about sustain of Waystones from Map Bosses, specifically when playing in higher tiers, we have added the following bonuses to the Atlas Passive Skill Tree:",
      "Atop the World now also grants 10% increased Quantity of Waystones dropped by Map Bosses.",
      "Pathkeepers now grants 15% increased Quantity of Waystones dropped by Map Bosses (from 10%).",
      "Archaeological Interest now also grants 10% increased Quantity of Waystones dropped by Map Bosses.",
      "Valuable Paths now also grants 10% increased Quantity of Waystones dropped by Map Bosses."
    ] },

  { id: "retried-maps-less-experience", league: "0.5", area: "atlas", kind: "nerf", verdict: "know", priority: 2,
    who: ["maps"], tags: [],
    headline: "Going back into a map you already tried now costs experience too",
    before: "Going back into a [[map|map]] you had already attempted gave reduced item rewards.",
    now: "Since 0.5.3, it also gives 50% less experience, on top of the item penalty.",
    so: "Try to finish each map on the first attempt. If one goes badly, a fresh map pays better than a retry.",
    soType: "fact", viz: null,
    sources: [
      "Previously attempted Maps now additionally have 50% reduced Experience earned on top of the already penalised Item Rewards."
    ] },

  { id: "corrupted-nexus-can-retry", league: "0.5", area: "atlas", kind: "buff", verdict: "know", priority: 2,
    who: ["maps"], tags: [],
    headline: "You can now retry a Corrupted Nexus you failed",
    before: "A [[corrupted-nexus|Corrupted Nexus]] is a map guarded by a strong Corrupted Boss. Once you failed one, you could not run it again.",
    now: "Since 0.5.5 you can retry a failed Nexus, and old failed ones were reopened. Dying to the [[map-boss|map boss]] and respawning no longer stops the Corrupted Boss from appearing.",
    so: "Go back to any Nexus you failed. Clearing one also starts [[doryani|Doryani]]'s quest line as a Master of the Atlas.",
    soType: "fact", viz: null,
    sources: [
      "Corrupted Nexus Maps are now able to be retried if previously failed, and previously failed Corrupted Nexus Maps that were completed have been uncompleted. Dying to a Map Boss and respawning no longer prevents the Corrupted Boss from spawning.",
      "New Atlas Master: Doryani's Science questline is unlocked by clearing a corruption nexus."
    ] },

  { id: "map-extras-shrines-strongboxes", league: "0.5", area: "atlas", kind: "changed", verdict: "know", priority: 3,
    who: ["maps"], tags: [],
    headline: "Shrines, Strongboxes and Summoning Circles were adjusted",
    before: "Maps can hold small extras. [[shrine|Shrines]] give a short buff when you touch them, [[strongbox|Strongboxes]] are chests that release monsters, and [[summoning-circle|Summoning Circles]] call up a boss to fight.",
    now: "[[shrine|Shrines]] now last 45 seconds, and four damage Shrines give half as much. [[strongbox|Strongboxes]] gained new [[item-rarity|rarity]] and quantity [[modifier|modifiers]]. A map's Summoning Circle has Reactivation Runes for more fights, and since 0.5.1 a checkpoint beside it.",
    so: "Open [[strongbox|Strongboxes]] with skill modifiers, like Casts Chaos Barrages. They now hold rarer loot. Use the new checkpoint to get back to a Summoning Circle fast.",
    soType: "fact", viz: null,
    sources: [
      "Halved the Damage as Extra buffs granted from the following shrines: Freezing Shrine, Gloom Shrine, Meteoric Shrine, and Tempest Shrine.",
      "The base duration of all Shrines is now 45 seconds.",
      "Prefix modifiers on Strongboxes that use skills, such as \"Casts Chaos Barrages\" now additionally have 10-20% more Rarity of Contained Items.",
      "Added two new Prefix modifiers to Strongboxes: 40-60% increased Rarity of Items Dropped from Strongbox Monsters and 40-60% more Rarity of Contained Items. 15-30% increased Effectiveness of Strongbox Monsters and 20-30% more Quantity of Contained Items.",
      "Summoning Circles added to Maps are now described as containing a single Summoning Circle, with multiple Reactivation Runes. Reactivation Runes now describe what they do, and have been made easier to notice.",
      "There is now a checkpoint besides the Summoning Circle, and Reactivation Runes that are far from the circle will create a checkpoint when they are activated to allow easy navigation back to the circle."
    ] },

  /* Pinnacle bosses */

  { id: "pinnacle-quest-and-farm-versions", league: "0.5", area: "bosses", kind: "changed", verdict: "know", priority: 1,
    who: ["bosses", "maps"], tags: [],
    headline: "Every pinnacle boss now has a quest version and a farm version",
    before: "[[pinnacle-boss|Pinnacle bosses]] were opened with keys or splinters you farmed, and at the [[realmgate|Realmgate]] you picked a difficulty. A harder Uber [[arbiter-of-ash|Arbiter of Ash]] needed [[calamity-fragment|Calamity Fragments]] from [[citadel|Citadel]] bosses.",
    now: "Each one now has a quest version, reached in a set way through its story, and a harder repeatable version for farming. Calamity Fragments can no longer be found.",
    so: "Beat each boss's quest version first. It comes from the story, so you don't need to farm or buy a key for it.",
    soType: "fact", viz: null,
    sources: [
      "All Pinnacle Bosses now have quest versions that can be accessed deterministically, alongside repeatable non-quest versions that offer a greater challenge.",
      "There are now two versions of each pinnacle boss, the Quest version and the Infinite Farm version. As such Primary, Secondary and Tertiary Calamity Fragments can no longer be obtained."
    ] },

  { id: "arbiter-of-divinity-new-pinnacle", league: "0.5", area: "bosses", kind: "new", verdict: "know", priority: 2,
    who: ["bosses"], tags: [],
    headline: "New pinnacle boss: the Arbiter of Divinity",
    before: "Before 0.5, the [[arbiter-of-ash|Arbiter of Ash]] was the big boss you worked toward through the [[citadel|Citadels]]. Each of three Citadels gave one key piece.",
    now: "The [[arbiter-of-divinity|Arbiter of Divinity]] is the new pinnacle boss of the [[precursor-fortress|Fortress]] story. Bosses in two new Citadels drop his keys. 0.5.4b made his fight fairer, with longer gaps between attacks and bigger clones to hit.",
    so: "Treat him as the goal of the new endgame story. One kill of his repeatable version also completes the whole Fortress.",
    soType: "fact", viz: null,
    sources: [
      "Added two new Citadel maps with two new bosses that drop keys to the new Pinnacle Boss",
      "Added Arbiter of Divinity Pinnacle Boss",
      "Increased the windows of time between certain attacks and many of the combo skills to make dodge rolling these skills more consistent. This is also accompanied by a number of visual telegraphing improvements and reduction in aggression on target tracking speed.",
      "The Divinity Clones created during the second phase of the fight now have a significantly larger hitbox allowing them to more easily be hit and killed while you have the Divinity buff.",
      "Defeating the Arbiter of Divinity using the non-quest version of the Origin Core now completes the entire Precursor Fortress for the Map owner, allowing you to allocate the Atlas Passive Tree as desired."
    ] },

  { id: "burning-monolith-in-fortress", league: "0.5", area: "bosses", kind: "changed", verdict: "know", priority: 2,
    who: ["bosses", "maps"], tags: [],
    headline: "The Arbiter of Ash and his Monolith moved into the Fortress",
    before: "The [[arbiter-of-ash|Arbiter of Ash]] waits in the Burning Monolith. You opened it with three [[crisis-fragment|Crisis Fragments]], one each from the Copper, Iron and Stone [[citadel|Citadels]], reached with Tier 15+ [[waystone|Waystones]].",
    now: "The Burning Monolith now stands inside the [[precursor-fortress|Precursor Fortress]]. Quest versions of the Crisis Fragments come from two Enigma Chambers there.",
    so: "Do his quest fight as part of the Fortress story. Clear the Enigma Chambers to get the quest fragments.",
    soType: "fact", viz: null,
    sources: [
      "The Burning Monolith along with Arbiter of Ash has been moved into the Fortress.",
      "Quest versions of the Crisis fragments have been added to two Enigma chambers inside the Fortress."
    ] },

  { id: "pinnacle-bosses-lost-all-resists", league: "0.5", area: "bosses", kind: "buff", verdict: "know", priority: 2,
    who: ["bosses"], tags: [],
    headline: "Pinnacle bosses no longer resist every element",
    before: "[[pinnacle-boss|Pinnacle bosses]] like the [[arbiter-of-ash|Arbiter of Ash]] had [[resistance|resistance]] to all elements, so fire, cold and lightning all did less damage to them.",
    now: "Since 0.5.5 the Arbiter of Ash resists fire but takes extra cold damage. The [[arbiter-of-divinity|Arbiter of Divinity]] resists lightning but takes extra fire. The [[raven-trickster|Raven Trickster]] lost its resistances, and 0.5.4 lowered others that were too high.",
    so: "Think about your element before a pinnacle fight. Cold builds do well against Ash, and fire builds against Divinity.",
    soType: "fact", viz: null,
    sources: [
      "The Arbiter of Ash no longer has All Elemental Resistances, they instead now have Fire Resistance and Cold Vulnerability.",
      "The Arbiter of Divinity no longer has All Elemental Resistances, they instead now have Lightning Resistance and Fire Vulnerability.",
      "The Raven Trickster no longer has All Elemental Resistances.",
      "A number of the Pinnacle Bosses have had their resistances lowered as they were unintentionally too high."
    ] },

  { id: "fortress-boss-fights-eased", league: "0.5", area: "bosses", kind: "buff", verdict: "know", priority: 3,
    who: ["bosses"], tags: [],
    headline: "The Arbiter of Ash and Phya fights got fairer",
    before: "At 0.5 launch, the [[arbiter-of-ash|Arbiter of Ash]] got damage boosts for 30 seconds when he plunged his sword into a sphere. Phya, the Matriarch Halls boss in the [[precursor-fortress|Fortress]], had a Generator firing projectiles that chilled the ground.",
    now: "His sphere boosts now last 20 seconds and give less chaos damage, and you get more time to reach the first Flame Seed. Phya's Generator fires fewer projectiles and no longer chills the ground.",
    so: "If either fight stopped you before, give it another try.",
    soType: "fact",
    viz: { type: "bars", caption: "Arbiter of Ash sphere damage boost, in seconds",
      rows: [{ label: "Before", value: 30, display: "30 seconds" }, { label: "Now", value: 20, display: "20 seconds" }] },
    sources: [
      "Reduced the duration of the damage bonuses The Arbiter of Ash gains after plunging his sword into the Chaos or Cold Spheres from 30 seconds to 20 seconds.",
      "Reduced the Chaos Damage bonus granted to The Arbiter of Ash when he plunges his sword into the Chaos Sphere.",
      "Extended the time the player has to get into the first Flame Seed during the combo skill that begins with the Large Laser in the Arbiter of Ash boss fight.",
      "Reduced the frequency and count of projectiles fired by the Generator.",
      "Removed the chilling ground from the projectiles fired by the Generator."
    ] },

  /* Campaign */

  { id: "campaign-faster-to-replay", league: "0.5", area: "campaign", kind: "changed", verdict: "know", priority: 1,
    who: ["all"], tags: [],
    headline: "The campaign is quicker to replay",
    before: "The [[campaign|campaign]] is Acts 1 to 4 plus the [[interlude|Interludes]], taking you to about level 65. You play it again with each new character, including in every new league.",
    now: "Several areas now hold hints that point the way. Some areas are shorter, Act 2's second Dreadnaught area is gone, Act 3 is reordered and the Waterways levers are pressure pads. The second half, mostly the Interludes, has fewer monsters.",
    so: "Watch for the new hints in each area. Your next character should reach the endgame sooner.",
    soType: "fact", viz: null,
    sources: [
      "we've added added elements to multiple Campaign areas that tell you where to go, if you know what to look for.",
      "Some areas throughout the game that have been shortened.",
      "Removed the second dreadnaught area, \"The Dreadnaught Vanguard\". The Act 2 boss is now in \"The Dreadnaught.\"",
      "Area order in Act 3 has been somewhat rearranged in order to make progression smoother.",
      "The Waterways levers have been turned into pressure pads that you simply need to walk over, and the final part of the level has the water pre-drained.",
      "Monster density in the second half of the campaign has been reduced, especially in the Interludes to allow getting through these areas more quickly."
    ] },

  { id: "act4-handins-unlock-islands", league: "0.5", area: "campaign", kind: "changed", verdict: "know", priority: 3,
    who: ["leveling"], tags: [],
    headline: "Act 4: turn in your Map Pieces and Boat Charter first",
    before: "In Act 4 you hire a ship in [[kingsmarch|Kingsmarch]] and sail out to its islands.",
    now: "Plunder's Point stays shut until you turn in all 4 Map Pieces in Kingsmarch. Since 0.5.5c, no island opens until you hand the Boat Charter to Makoru. Navali now gives a Greater Mind [[rune|Rune]], and the Tribal Medicine quest pays better.",
    so: "Do these hand-ins as soon as you get the items, or the islands stay locked.",
    soType: "fact", viz: null,
    sources: [
      "You can no longer enter Plunder's Point until you have turned in all 4 Map Pieces in Kingsmarch.",
      "In order to access Act 4 Islands, you must now have turned in the Boat Charter to Makoru. Existing characters that did not do this already will be unaffected.",
      "You now receive a Greater Mind Rune in the Halls of the Dead when interacting with Navali (previously a Lesser Mind Rune).",
      "Improved the rewards offered for completing the Tribal Medicine quest. Happy shark hunting."
    ] },

  { id: "campaign-bosses-hit-softer", league: "0.5", area: "campaign", kind: "buff", verdict: "know", priority: 3,
    who: ["leveling"], tags: [],
    headline: "Several bosses hit softer after later patches",
    before: "Each act has big boss fights, like Count Geonor in Act 1 and Jamanra in Act 2. Some bosses also come back in other, tougher versions.",
    now: "Jamanra lost about 17% of his life, and two of Count Geonor's attacks are weaker in every version of his fight. Veynar, Malgor and Serath also deal less damage with their big attacks.",
    so: "If one of these bosses stopped you before, it is an easier fight now.",
    soType: "fact", viz: null,
    sources: [
      "Lowered the life of Jamanra, the Abomination by roughly 17%.",
      "Reduced the damage of Count Geonor's Reverse Cleave skill in all versions of this Boss Fight.",
      "Reduced the damage, area of effect and freeze build-up of Geonor, The Putrid Wolf's Moonbeam skill in all versions of this Boss Fight.",
      "Reduced the damage of Veynar, the Frostbane's Cascading Slam skill, this change also applies to variations of this boss.",
      "Reduced the damage of the Cannon Barrage and both Slam skills used by Malgor, the Nautilord. This also applies to variations of this boss.",
      "Reduced the damage of the Flame Geysers and both Slams skills used by Serath, the Scaled One. This also applies to variations of this boss."
    ] },

  /* The Trials */

  { id: "trial-of-chaos-leave-and-resume", league: "0.5", area: "campaign", kind: "changed", verdict: "do", priority: 1,
    who: ["trials"], tags: [],
    headline: "Trial of Chaos: leave any time and pick up where you left off",
    before: "Once you started a [[trial-of-chaos|Trial of Chaos]] run, you had to finish it before you could leave. Dying lost you the rewards of the whole run.",
    now: "Since 0.5.5 you can leave at any point and resume later from the same room. Each room ends with its own reward chest. Run rewards are now only currency and [[soul-core|Soul Cores]], with no [[corrupted|corrupted]] items.",
    so: "Stop a run whenever you need to trade or log off. Open each room's chest as you go, so a death costs you less.",
    soType: "fact", viz: null,
    sources: [
      "A very frustrating point of the Trial of Chaos was that once you started a run, you had to complete that entire run before being able to leave, this meant if you needed to say trade, or stop playing the game for the night, you couldn't do so. Now you can leave the Trial of Chaos at any point and resume your run at a later time from the same room.",
      "There is now a reward chest at the end of each room in the Trial of Chaos. This makes dying less punitive as you don't lose your entire set of rewards.",
      "The rewards for completing a Trial of Chaos run now consists of only Currency and Soul Cores. Corrupted items are no longer a reward outcome in the Trial of Chaos."
    ] },

  { id: "trial-of-chaos-milder-modifiers", league: "0.5", area: "campaign", kind: "buff", verdict: "know", priority: 2,
    who: ["trials"], tags: [],
    headline: "Trial of Chaos modifiers are milder and say exactly what they do",
    before: "Before each room of the [[trial-of-chaos|Trial of Chaos]] you pick a [[modifier|modifier]] that makes it harder for better rewards. Many were vague, and the [[trialmaster|Trialmaster]] froze time in almost every room.",
    now: "Modifiers have more tiers, add much less difficulty and show real numbers. Harder ones between rooms also raise the quality of drops. The Trialmaster stops time only at the start, and doors and elevators move faster.",
    so: "Pick harder modifiers more freely. Each one adds less difficulty, and the ones between rooms now always improve your drops.",
    soType: "fact", viz: null,
    sources: [
      "The Modifiers you select at the start of each encounter have been adjusted. In general we have added more Modifier Tiers, and significantly reduced the amount of difficulty they were applying.",
      "Modifiers are now more explicit in what they do and display actual values. For example, the Shielding Monsters Modifier now describes the percentage of Maximum Life Monsters gain as Extra Maximum Energy Shield, instead of simply saying Monsters are protected by Energy Shield.",
      "The Modifiers applied between rooms in the Trial of Chaos that add difficulty now always also increase the quality of drops from slain monsters.",
      "The Trialmaster will now interrupt your Trial of Chaos less often with his timestopping abilities, now only stopping time at the very start of the entire run as opposed to in almost every single room. He will still appear to deliver his dialogue, but will just not stop time.",
      "The doors between each encounter which open based on your proximity now start opening sooner as you approach them, and you allow you to walk through them earlier. These changes should make progressing between rooms much smoother, especially when using characters with higher movement speeds.",
      "The levers to call the elevator now make the elevators start their ascent or descent much faster."
    ] },

  { id: "trial-of-chaos-continue-runs", league: "0.5", area: "campaign", kind: "new", verdict: "know", priority: 2,
    who: ["trials"], tags: [],
    headline: "Trial of Chaos: finish a 10-trial run, then keep going twice more",
    before: "In the endgame, each [[trial-of-chaos|Trial of Chaos]] run is opened with an Inscribed Ultimatum. Magic ones from the [[trialmaster|Trialmaster]] offered a double-or-nothing bet on your currency.",
    now: "After a 10-trial run you may continue twice more without a new key, for a different Trialmaster Fragment each time. You keep the run's modifiers and reward quality, and get the double-or-nothing bet then. The Trialmaster no longer drops Magic Inscribed Ultimatums.",
    so: "Continue if your build handled the first run with ease. Each extra run keeps its harder modifiers, so it only gets tougher.",
    soType: "fact", viz: null,
    sources: [
      "When completing an Inscribed Ultimatum with 10 Trials, you are now able to continue your run immediately without providing another Inscribed Ultimatum item. You're able to do this twice per Inscribed Ultimatum, and if successful, will be awarded a different Trialmaster Fragment for each subsequent successful run. The Modifiers and quality of rewards will be carried over when continuing a run, so you can choose to have better rewards and more difficulty.",
      "When given the option to continue your run, you are also offered an optional double or nothing wager of Currency, similar to the existing Magic Inscribed Ultimatums that could drop from the Trialmaster.",
      "The Trialmaster can no longer drop Magic Rarity Inscribed Ultimatums."
    ] },

  { id: "trials-endgame-loot-bonuses", league: "0.5", area: "campaign", kind: "buff", verdict: "know", priority: 2,
    who: ["trials"], tags: [],
    headline: "Both Trials now get built-in loot bonuses at endgame levels",
    before: "The [[trial-of-the-sekhemas|Trial of the Sekhemas]] and [[trial-of-chaos|Trial of Chaos]] unlock your [[ascendancy|ascendancy]], and you can run them again later. Your [[atlas-passive-tree|Atlas passives]] never applied inside them.",
    now: "Since 0.5.5, both add more magic and rare monsters and better boss drops by area level, from level 65 in the Sekhemas. Your max [[runic-ward|Runic Ward]] adds to your starting [[honour|Honour]], and a [[reforging-bench|Reforging Bench]] waits at the Sekhemas entrance.",
    so: "If you enjoy the Trials, high-level runs now pay more. Balbala at the Sekhemas can also identify your items.",
    soType: "fact", viz: null,
    sources: [
      "The Trial of Chaos now has various inherent bonuses depending on the level of the Area. These bonuses are modifiers such as chance of Magic or Rare Monsters, Pack Size of Magic or Rare Monsters, amount of modifiers Rare Monsters can have, Quality and Quantity of items dropped from Bosses, and the ability for the area to drop Exceptional items. This is to compensate for Atlas Passive Bonuses not applying inside the Trial of Chaos.",
      "The Trial of Sekhemas now has inherent bonuses starting at Area Level 65. These bonuses are modifiers such as chance of Magic or Rare Monsters, Pack Size of Magic or Rare Monsters, amount of modifiers Rare Monsters can have, Quality and Quantity of items dropped from Bosses, and the ability for the area to drop Exceptional items. This is to compensate for Atlas Passive Bonuses not applying inside the Trial of Sekhemas.",
      "Your maximum Runic Ward is now added to your starting Honour when beginning a Trial of the Sekhemas.",
      "Added a Reforging Bench to the entrance of the Trial of the Sekhemas.",
      "Added an \"Identify Items\" option to Balbala in the Trial of the Sekhemas."
    ] },

  /* Rules for your character */

  { id: "player-bleed-no-move-penalty", league: "0.5", area: "build", kind: "buff", verdict: "know", priority: 2,
    who: ["all"], tags: [],
    headline: "Bleeding no longer hurts you more while you move",
    before: "[[bleeding|Bleeding]] deals physical damage over time. On players, it dealt more damage while you were moving, so running from a fight made it worse.",
    now: "Bleeding on you no longer gets stronger while you move. Bleeds that you put on monsters still work the old way.",
    so: "Keep moving and dodging when you bleed. Standing still no longer helps.",
    soType: "fact", viz: null,
    sources: [
      "Bleed damage on players is no longer increased while the player is moving. This change does not affect bleeds players apply to monsters."
    ] },

  { id: "player-leech-one-instance", league: "0.5", area: "build", kind: "nerf", verdict: "know", priority: 2,
    who: ["maps", "bosses"], tags: [],
    headline: "Only your strongest Leech works at a time",
    before: "[[leech|Leech]] heals you from the damage you deal. Several leech effects for the same resource could run at once and add up.",
    now: "Only one leech per resource, life, mana or Energy Shield, works at a time: the one that heals fastest. A hit counts as at most 40,000 damage for leech. Monsters also resist leech less, starting at a later level.",
    so: "If you rely on leech, raise your leech percentage rather than counting on huge hits. Hits past 40,000 damage add no more.",
    soType: "fact", viz: null,
    sources: [
      "Only a single Leech instance per resource (Life, Mana, or Energy Shield) can apply at a time. When multiple Leech instances are active, only the one with the highest recovery rate will recover you until it expires, after which the next-highest recovery rate instance will apply.",
      "There is now a limit on the maximum amount of damage a hit can be considered to deal for Leech. Hits that deal less than 40,000 total damage are unaffected, but if a hit would deal more than 40,000 total damage, it is treated as dealing only 40,000 damage for purposes of Leech calculation. The values of each damage type in the hit are scaled down evenly to reach this limit. This means that extremely high-damage hits stop improving Leech past a certain point, but increasing your leech percentage will always increase the amount of the resource you are gaining.",
      "Monster Leech resistance now starts at a later level, and values are lower at every level. All monster rarities now have the same amount of Leech resistance."
    ] },

  { id: "culling-strike-normal-35", league: "0.5", area: "build", kind: "buff", verdict: "know", priority: 3,
    who: ["maps"], tags: [],
    headline: "Culling Strike now kills normal monsters at 35% life",
    before: "[[culling-strike|Culling Strike]] kills an enemy outright once its life drops low enough. For normal monsters, that point was 30% of their life.",
    now: "Normal monsters are now culled at 35% of their life.",
    so: "If your skills or gear Cull, packs of normal monsters die a little sooner. There is nothing to change.",
    soType: "fact",
    viz: { type: "bars", caption: "Culling Strike point for normal monsters",
      rows: [{ label: "Before", value: 30, display: "30%" }, { label: "Now", value: 35, display: "35%" }] },
    sources: [
      "The Culling Strike Threshold for Normal enemies is now 35% of their Maximum Life (previously 30%)."
    ] },

  { id: "presence-bonuses-no-party-stack", league: "0.5", area: "build", kind: "nerf", verdict: "know", priority: 3,
    who: ["party"], tags: ["weapon:sceptre"],
    headline: "The same ally bonus from two party members no longer stacks",
    before: "[[presence|Presence]] is the area around you. Bonuses for allies in it, like those on [[sceptre|Sceptres]], reach party members, and several players with the same bonus all added up.",
    now: "If several party members have the same kind of ally bonus, only one counts. The Leer Cast helmet's 50% increased damage for allies is not affected.",
    so: "Playing in a group? Spread out your ally bonuses. Two players with the same Sceptre bonus no longer double it.",
    soType: "fact", viz: null,
    sources: [
      "Modifiers that applies to Allies in your Presence, such as those on Sceptres and the Grip of Kulemak Unique Ring, no longer stack in a party if multiple party members have Modifiers of the same type. This change does not affect the \"Allies in your Presence deal 50% increased Damage\" Modifier from the Leer Cast Unique Helmet."
    ] },

  { id: "player-rule-small-tweaks", league: "0.5", area: "build", kind: "changed", verdict: "skip", priority: 3,
    who: [], tags: ["skill:whirling-assault", "unique:cat-o-nine-tails", "unique:indigon"],
    headline: "Smaller rule changes: Deflection, Splash and recovery",
    before: "[[deflection|Deflection]] turns some hits into glancing blows that deal less damage. [[melee-splash|Melee Splash]] spreads a hit to nearby enemies. Some effects, like the Vaal Pact [[keystone|keystone]], stop you recovering life in the normal ways.",
    now: "Deflection chance now scales better with more Deflection Rating, up to 95%. [[melee-splash|Melee Splash]] hits once per damaging area. Effects like Vaal Pact no longer block healing from checkpoints, wells or levelling up, so changing areas can't drain your life.",
    so: "Evasion builds get more from Deflection Rating now. Most players don't need to do anything.",
    soType: "fact", viz: null,
    sources: [
      "The formula for chance to Deflect has been adjusted to provide better scaling with investment into Deflection Rating, with a cap of 95% chance to Deflect (similar to chance to Evade being capped at 95%).",
      "Melee Attacks can now only apply Splash Damage once per damaging area. Some Attacks create multiple damaging areas during use. For example, Whirling Assault creates multiple damaging areas around you as you move.",
      "Effects that prevent players from recovering Life, Mana or Energy Shield except in specific ways, such as Vaal Pact, Cat O' Nine Tails or Indigon, no longer prevent recovery caused by core game systems (including but not limited to: checkpoints, healing wells, levelling up). This also means that changing areas while you have one of these effects can no longer cause you to lose Life, Mana or Energy Shield. Effects that prevent all forms of recovery (such as Lich's Eternal Life) have not received this change."
    ] },

  /* Interface and controller */

  { id: "dodge-roll-no-sprint-key", league: "0.5", area: "qol", kind: "new", verdict: "know", priority: 2,
    who: ["all"], tags: [],
    headline: "A new key lets you dodge roll without sprinting",
    before: "Holding the [[dodge-roll|dodge roll]] button makes you sprint after the roll. If a monster hits you while you sprint, you fall down.",
    now: "An optional dodge-roll key never starts a sprint, even when held. It is unbound at first, so you set it yourself in the input options. 0.5.4f also fixed an extra roll that could fire after a sprint.",
    so: "Bind the dodge-only key if you sprint into packs by accident. Keep your old key for running between fights.",
    soType: "fact", viz: null,
    sources: [
      "Added a dedicated keybind to perform a dodge roll, which will not cause the player to sprint when held down. This keybind is unbound by default, and must be manually assigned in input options if you wish to use it.",
      "Fixed an issue where you would sometimes perform another Dodge Roll when releasing the input after sprinting."
    ] },

  { id: "atlas-screen-search-travel", league: "0.5", area: "qol", kind: "new", verdict: "know", priority: 3,
    who: ["maps"], tags: [],
    headline: "The Atlas screen gained search, travel and bigger icons",
    before: "The [[atlas|Atlas]] screen shows your [[map|maps]] and what each one holds. You found things on it by panning around and looking.",
    now: "You can search the Atlas and zoom out further. Click your Town to travel there, content icons are 50% bigger, and the map reopens where you last panned to. A notice tells you when you earn Atlas passive points.",
    so: "Use Atlas search to find a mechanic or a boss map fast.",
    soType: "fact", viz: null,
    sources: [
      "Added support for searching to the Endgame Atlas Map.",
      "You can now zoom out slightly further on the Atlas screen.",
      "You can now click the Town on the Atlas to travel there via waypoint, or Ctrl-Click the quick travel button at the side of the Atlas screen.",
      "With the addition of more varied content on the Atlas Map the size of content indicators has been increased 50%.",
      "Panning to a location on the Endgame Map, closing, then reopening your Map in the same instance will now re-open to the same area you panned to.",
      "Added a notification for when you have received Atlas Passive Skill Points."
    ] },

  { id: "controller-trade-atlas-menus", league: "0.5", area: "qol", kind: "changed", verdict: "know", priority: 2,
    who: ["controller"], tags: [],
    headline: "Controller players got better trade and Atlas menus",
    before: "On controller, the [[trade-market|trade market]] had no search box, and there was no quick way to change the currency you were applying.",
    now: "The [[currency-exchange|Currency Exchange]] screen was rebuilt for controller, and you can quickly switch the currency you are applying. The market gained a search box and a trade website button. Holding X or Square on the Endgame Map opens a quick-action menu.",
    so: "Try the Endgame Map quick-action menu and the market search box. Both save a lot of button presses.",
    soType: "fact", viz: null,
    sources: [
      "Added a feature to quickly change the Currency you are currently applying when playing with a controller.",
      "Reworked the Currency Exchange UI when playing with a controller",
      "Added a search textbox for filtering Trade Market items when playing with a controller.",
      "Added a button to open the Path of Exile Trade website from the market panel when playing with a controller.",
      "Added a quick-action menu to the Endgame Map when playing with a controller. Press-hold X/Square with the Endgame Map open to show this menu."
    ] },

  { id: "interface-small-upgrades-0-5", league: "0.5", area: "qol", kind: "changed", verdict: "know", priority: 3,
    who: ["all"], tags: [],
    headline: "Small interface upgrades: bigger popups, clearer maps and Marks",
    before: "With click-to-move, clicking to walk broke a channelled skill, even one you could use while moving. A [[mark|Mark]] you put on an enemy did not show on its life bar.",
    now: "Click-to-move no longer breaks channelled skills like Incinerate. Marks show on enemy life bars, the Acts 1 to 3 world maps load faster and read better, and popups can be made bigger in the UI options.",
    so: "Turn on bigger popups in Options, under UI, if text is hard to read.",
    soType: "fact", viz: null,
    sources: [
      "For players using click to move, clicking to move while channelling a skill that can be used while moving will no longer interrupt channelling. This should significantly improve the usability of skills such as Flame Breath and Incinerate on click to move.",
      "Marking an enemy now shows the Mark on their life bar.",
      "Improved visual clarity, load times and performance on the Acts 1-3 World Maps. Additionally they have been made to more accurately reflect the in-game directionality of area layouts.",
      "Added accessibility settings to increase the size of popups. These can be found in the UI section of the Options panel."
    ] }

]);
