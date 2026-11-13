/* Exile Catch-Up, PoE2: the 0.4 catch-up pack, for anyone who skipped The Last of the Druids (2025-12-12).
   Each card says how the game is today. Where 0.5 or a later patch changed the thing again, "now" or "so"
   says so plainly. Schema: spec 5.3. Every source string is an exact quote from sources/0.4.0-patch-notes.txt. */
EXILE.addChanges([

  /* The Druid */

  { id: "v04-druid-class", league: "0.4", area: "build", kind: "new", verdict: "know", priority: 1,
    who: ["leveling"], tags: ["class:druid", "asc:oracle", "asc:shaman", "weapon:talisman"],
    headline: "A new class, the Druid, fights in animal form",
    before: "PoE2 had seven classes: Warrior, Ranger, Huntress, Mercenary, Monk, Sorceress and Witch. Each has its own [[ascendancy|ascendancies]], or subclasses.",
    now: "The [[druid|Druid]] is the eighth class. He fights in animal forms using [[talisman|Talismans]], a new weapon that [[shapeshifting|shapeshifts]] you. 0.4 also added over 20 new skills, and over 250 passives on the Druid's side of the tree.",
    so: "Try him if you want to fight as a beast. His [[ascendancy|ascendancies]] are the [[oracle|Oracle]], who sees possible futures and takes passives from other parts of the tree, and the [[shaman|Shaman]], who turns [[rage|Rage]] into spell power.",
    soType: "fact", viz: null,
    sources: [
      "Added a new playable character class, the Druid.",
      "Added the new Oracle and Shaman Ascendancy Classes for the Druid.",
      "Added over 20 new Skills, primarily Primal Skills.",
      "Added more than 250 new Passive Skills to the Druid side of the passive tree.",
    ] },

  { id: "v04-talisman-weapons", league: "0.4", area: "build", kind: "new", verdict: "skip", priority: 2,
    who: [], tags: ["weapon:talisman", "class:druid"],
    headline: "Talismans are now two-handed weapons that turn you into an animal",
    before: "In PoE2 before 0.4, Talisman was the name of small carved figures you set in gear sockets. There was no Talisman weapon.",
    now: "A [[talisman|Talisman]] is a two-handed [[martial-weapon|martial weapon]]. Equipping one [[shapeshifting|shapeshifts]] you into its animal form and gives you that form's basic attack. You can swap to another form at any time.",
    so: "Skills that can't be used in animal form don't work while a Talisman is in your active [[weapon-set|weapon set]]. Tie those skills to your other weapon set instead.",
    soType: "fact", viz: null,
    sources: [
      "Added a new weapon class: Talismans.",
      "Talismans are two-handed martial weapons that are used for shapeshifting attacks.",
      "Equipping a talisman shapeshifts you into an animal form and grants you a basic attack skill for that form.",
      "You can swap your chosen form at any time.",
    ] },

  /* Gear sockets */

  { id: "v04-talismans-renamed-idols", league: "0.4", area: "crafting", kind: "changed", verdict: "do", priority: 1,
    who: ["all"], tags: [],
    headline: "Old Talismans are now Idols, and Rune Sockets are Augment Sockets",
    before: "Gear had Rune Sockets. What went in them were called Socketables: [[rune|runes]], [[soul-core|Soul Cores]], and small carved Talismans like the Fox Talisman.",
    now: "They are now Augment Sockets, and everything that goes in them is an [[augment|Augment]]. The carved Talismans are now [[idol|Idols]], like the Fox Idol. The word [[talisman|Talisman]] now means a Druid weapon.",
    so: "Search your stash and the [[trade-market|Trade Market]] by the new names, Idols and Augments. Since 0.5, any Idol also fits in a [[sceptre|Sceptre]].",
    soType: "fact", viz: null,
    sources: [
      "Rune Sockets have been renamed to Augment Sockets.",
      "Non-jewel items that go into Augment Sockets have been renamed from Socketables to Augments.",
      "Existing Augment Talismans have been renamed to Idols.",
    ] },

  { id: "v04-augment-limits", league: "0.4", area: "crafting", kind: "changed", verdict: "know", priority: 2,
    who: ["crafting", "trade"], tags: [],
    headline: "Many named runes, Idols and Soul Cores are now limited to one",
    before: "Named [[rune|runes]], [[idol|Idols]] and [[soul-core|Soul Cores]], like Saqawal's Rune of the Sky, had no limit. You could socket as many copies as you liked.",
    now: "Over 40 of them now say 'Limited to: 1', so you can't stack copies. Old gear that broke a limit stopped working until its sockets were fixed. 0.5 and 0.5.5 limited more Idols and Soul Cores.",
    so: "Check the 'Limited to' line before you buy or socket a second copy of a named [[augment|Augment]]. Plain runes, like Iron Runes, have no limit.",
    soType: "fact", viz: null,
    sources: [
      "Existing items that have invalid Augment Sockets from the following Limit changes will be unable to be used until the Sockets are once again valid.",
      "Saqawal's Rune of the Sky is now Limited to: 1.",
      "Idol of Sirrius is now Limited to: 1.",
      "Xopec's Soul Core of Power is now Limited to: 1.",
    ] },

  /* League mechanics that stayed */

  { id: "v04-fate-of-the-vaal-core", league: "0.4", area: "league", kind: "new", verdict: "know", priority: 1,
    who: ["maps", "leveling", "crafting"], tags: [],
    headline: "Fate of the Vaal, the 0.4 league, has you build Atziri's Temple",
    before: "Each [[challenge-league|league]] adds one new mechanic for a season, and popular ones later join the [[core|core game]]. Before 0.4 there was no Vaal temple to build.",
    now: "In [[fate-of-the-vaal|Fate of the Vaal]] you sacrifice monsters at [[vaal-beacon|Vaal Beacons]] for power, and spend it on rooms in [[atziris-temple|Atziri's Temple]] in Lira Vaal. Each room holds rewards, and rooms next to ones that help them level up. [[atziri|Atziri]] and her Royal Architect wait inside.",
    so: "Expect to meet it while levelling, since it has been in every league since 0.5. Place each room where its neighbours boost it; that is how the Temple's rewards grow.",
    soType: "fact", viz: null,
    sources: [
      "In the Fate of the Vaal league you will find remnants of the ancient Vaal civilisation scattered throughout Wraeclast.",
      "Sacrifice the afflicted monsters to power the devices, and travel to Lira Vaal, the ancient temple of Atziri.",
      "Gather enough power to modify the Temple and create your desired layout.",
      "Each room in the Temple offers great rewards, from stashes of currency and equipment to something more interesting.",
      "Placing rooms next to other rooms that benefit them will level them up, adding new challenges and rewards to find.",
      "Her Royal Architect and devoted followers will work against you",
    ] },

  { id: "v04-abyss-core", league: "0.4", area: "league", kind: "changed", verdict: "know", priority: 1,
    who: ["maps", "leveling", "crafting"], tags: [],
    headline: "Abyss, the 0.3 league, is part of the core game",
    before: "[[abyss|Abyss]] came from the 0.3 league, [[rise-of-the-abyssals|Rise of the Abyssals]]. Its cracks showed up in every campaign area, and its loot included bones that add hidden [[desecrated-modifier|Desecrated]] bonuses to gear.",
    now: "Since 0.4 it is in every league. In the [[campaign|campaign]] it appears in set areas from Act 2. In maps, Abyss [[precursor-tablet|Tablets]] add it, and it has its own [[atlas-passive-tree|Atlas tree]].",
    so: "Close Abysses for [[desecrated-currency|Abyss bones]] to craft with. In maps, slot Abyss [[precursor-tablet|Tablets]] when you want more of them.",
    soType: "fact", viz: null,
    sources: [
      "Abyss has been added to the core game.",
      "You can find Abyss encounters in specific campaign areas, starting in Act 2.",
      "Abyss encounters have been added to the Endgame, as well as Abyss Tablets and related modifiers.",
      "Added an Atlas Passive Tree for the Rise of the Abyssal Content.",
      "Abysses no longer spawn in all campaign areas",
    ] },

  /* Endgame */

  { id: "v04-map-tiers-effectiveness", league: "0.4", area: "atlas", kind: "changed", verdict: "know", priority: 2,
    who: ["maps"], tags: [],
    headline: "Higher map tiers now make monsters tougher and more rewarding",
    before: "Higher [[waystone-tier|Waystone tiers]] made each group of monsters bigger. [[modifier|Waystone modifiers]] could add [[pack-size|Pack Size]] too.",
    now: "Higher tiers now raise [[monster-effectiveness|Monster Effectiveness]] for normal, magic and rare monsters. They get more life, give more experience and drop more items. Since 0.5 the experience and item part is half as big.",
    so: "Expect monsters in high tiers to take longer to kill. For bigger packs, look for [[pack-size|Pack Size]] on Waystone modifiers and [[precursor-tablet|Tablets]].",
    soType: "fact", viz: null,
    sources: [
      "Maps no longer scale pack size as you increase in tier, they instead increase non-unique monster Effectiveness.",
      "Effectiveness grants monsters increased life, increased experience granted and increased quantity of items dropped.",
    ] },

  { id: "v04-boss-anti-burst", league: "0.4", area: "bosses", kind: "new", verdict: "know", priority: 2,
    who: ["bosses", "maps"], tags: [],
    headline: "Bosses take less damage when a fight starts",
    before: "Bosses took full damage from the moment they appeared or noticed you.",
    now: "A boss now takes reduced damage at the start of a fight. The reduction fades to nothing over a short time, and fades faster the further the boss moves. Bosses that barely move have a shorter one.",
    so: "Save your strongest hits until a few moments into the fight, or until the boss has moved away from its starting spot.",
    soType: "fact", viz: null,
    sources: [
      "Bosses now have an Anti-Burst damage mechanic:",
      "Once a boss has finished it's emerge or becomes aggro the damage reduction period starts counting down.",
      "The damage reduction tapers down from full effect to no effect over the course of this duration.",
      "For every unit the boss moves from it's starting location the damage reduction will fall off even faster.",
      "Bosses which cannot or barely move have a shorter damage reduction period.",
    ] },

  /* Everyone */

  { id: "v04-cpu-performance", league: "0.4", area: "qol", kind: "buff", verdict: "know", priority: 2,
    who: ["all"], tags: [],
    headline: "The game runs faster on most PCs",
    before: "Frame rate in busy fights depends on two parts of your computer: the processor (CPU) and the graphics card (GPU). Whichever is slower holds the game back.",
    now: "0.4 spread the game's work across more CPU cores. When the CPU is the limit, expect at least 25% better performance and fewer frame spikes. If your graphics card is the limit, nothing changes.",
    so: "If your graphics card is what holds you back, lower the render resolution or turn on Dynamic Resolution in the graphics options.",
    soType: "fact", viz: null,
    sources: [
      "Significant optimizations to CPU performance have been made.",
      "allow us to utilise more of your CPU cores, resulting in higher frame rates",
      "Overall, you should get at least a 25% boost, and significantly less frame spikes when CPU bound.",
      "Note that if you are GPU bound, you will not see any improvement from these changes.",
      "When GPU bound, lowering render resolution or using Dynamic Resolution will improve performance.",
    ] },

  { id: "v04-gem-and-trade-helpers", league: "0.4", area: "qol", kind: "new", verdict: "know", priority: 3,
    who: ["all"], tags: [],
    headline: "Small helpers: support gem matches, trade search, cursor tracking",
    before: "When you cut a [[support-gem|support gem]], the game didn't show which of your skills could use it. Skills like Whirling Assault stopped turning toward your cursor once you let go of the key.",
    now: "Hover a support gem while gem cutting to see which equipped skills it fits. The [[trade-market|Trade Market]] stat filters have a quick search. A new Cursor Tracking option keeps skills aiming at your cursor after you release the key.",
    so: "Cursor Tracking is on by default in WASD mode and off in click-to-move. Try it in the input options if you click to move.",
    soType: "fact", viz: null,
    sources: [
      "Support gem compatibility of all equipped skills is now shown when hovering a support gem in the gemcutting interface.",
      "Added a 'quick search' feature to the Stat Filters in the Trade Market.",
      "Added a new Cursor Tracking input option for keyboard and mouse users",
      "This is particularly impactful for skills such as Rolling Slam and Whirling Assault",
      "By default this option is enabled in WASD mode and disabled in click to move mode.",
    ] },

  /* Builds */

  { id: "v04-bow-surpassing-arrows", league: "0.4", area: "build", kind: "changed", verdict: "skip", priority: 2,
    who: [], tags: ["weapon:bow"],
    headline: "Extra arrows on bows now come as a Surpassing chance",
    before: "[[bow|Bows]] could roll a modifier that made Bow Attacks fire extra arrows. Dualstring, Twin and Gemini Bows fired one extra arrow built in.",
    now: "That modifier is gone. [[bow|Bows]] now roll [[surpassing-chance|Surpassing chance]] to fire an additional arrow, from 25% up to 200%. Those three bows now have +50% built in.",
    so: "Each full 100% is one sure extra arrow, and the rest is a chance for one more. Since 0.5, quivers can roll it too.",
    soType: "fact", viz: null,
    sources: [
      "The modifiers for \"Bow Attacks fire X additional Arrows\" on Bows have been disabled.",
      "A new modifier has been added to Bows",
      "\"of Surplus\" (25 - 50%)",
      "\"of Many\" (175 - 200%)",
      "+50% Surpassing chance to fire an additional",
      "(Previously Bow Attacks fire an additional arrow)",
    ] },

  { id: "v04-staff-spell-mods", league: "0.4", area: "crafting", kind: "changed", verdict: "skip", priority: 3,
    who: [], tags: ["weapon:staff", "weapon:focus"],
    headline: "Staves roll fewer spell levels but more spell damage",
    before: "[[staff|Staves]] rolled big bonuses to spell levels, such as +2 to all spells. A [[focus|Focus]] could roll the top tiers of spell damage.",
    now: "Spell level bonuses on [[staff|staves]] dropped: 'of the Mage' gives +1 instead of +2, and 'of the Evoker' +3 to +4 instead of +4. Staff spell damage bonuses are a third stronger on average. [[focus|Foci]] lost their top two tiers of spell damage.",
    so: "Judge a staff by its damage bonuses as well as its spell levels. A [[divine-orb|Divine Orb]] moves an old staff to the new values, which can cost it a spell level.",
    soType: "fact", viz: null,
    sources: [
      "Spell Damage, Specific Damage Type, Damage as Extra Elemental Damage mods on Staves are now 33% stronger on average. Existing items can be updated using a Divine Orb.",
      "The 'of the Mage' Modifier on Staves now grants +1 level to Spells (from +2). Existing Items will not be affected by this change unless a Divine Orb is used.",
      "The 'of the Evoker' Modifier on Staves now grants +3 to +4 level of Spells (from +4). Existing Items will not be affected by this change unless a Divine Orb is used.",
      "Foci can no longer roll the top 2 tiers of spell damage and specific damage modifiers.",
    ] },

  { id: "v04-rage-rework", league: "0.4", area: "build", kind: "changed", verdict: "skip", priority: 3,
    who: [], tags: ["class:warrior", "class:druid", "asc:shaman"],
    headline: "Rage costs 10 to spend and drains much more slowly",
    before: "[[rage|Rage]] skills each had their own cost. After 2 seconds without gaining Rage or taking damage, you lost 10 Rage per second, and Rage showed in your buff bar.",
    now: "Every Rage-spending skill costs 10 Rage. You lose 5 per second, and only after 4 seconds without gaining Rage or taking damage. A Rage meter sits next to your mana globe.",
    so: "A Rage effect shows on your character once you have 10, enough to spend. While your Rage is regenerating, it never decays.",
    soType: "fact",
    viz: { type: "bars", caption: "Rage lost per second when you stop fighting",
      rows: [ { label: "Before", value: 10, display: "10" }, { label: "0.4", value: 5, display: "5" } ] },
    sources: [
      "All rage spending costs have been changed to 10 rage.",
      "You now lose 5 rage per second if you have not taken damage or gained rage in the past 4 seconds (from 10 rage per second if not taken damage or gained rage in the past 2 seconds).",
      "Rage regeneration now pauses rage decay similarly to other means of gaining rage.",
      "Rage no longer causes a visual effect on your character until you have 10 or more Rage",
      "Instead, there is now a Rage meter next to the mana globe.",
    ] },

  { id: "v04-spirit-costs-halved", league: "0.4", area: "build", kind: "buff", verdict: "skip", priority: 3,
    who: [], tags: ["skill:attrition", "skill:barrier-invocation", "skill:cast-on-minion-death", "skill:elemental-conflux", "skill:rhoa-mount"],
    headline: "Four always-on skills now reserve much less Spirit",
    before: "[[spirit|Spirit]] is the resource that always-on skills reserve. Attrition, Barrier Invocation and Cast on Minion Death each reserved 60, and Elemental Conflux 100.",
    now: "Attrition, Barrier Invocation and Cast on Minion Death reserve 30. Elemental Conflux reserves 60. Rhoa Mount went the other way, from 60 to 100, and no longer adds movement speed.",
    so: "If one of these cost too much before, try it again. The Spirit you save can run another [[persistent-skill|persistent skill]].",
    soType: "fact",
    viz: { type: "bars", caption: "Barrier Invocation: Spirit reserved",
      rows: [ { label: "Before", value: 60, display: "60" }, { label: "0.4", value: 30, display: "30" } ] },
    sources: [
      "Attrition: Now reserves 30 spirit (previously 60).",
      "Barrier Invocation: Now reserves 30 spirit (previously 60).",
      "Cast on Minion Death: Now reserves 30 spirit (previously 60).",
      "Elemental Conflux: Now has a Reservation of 60 spirit (previously 100).",
      "Rhoa Mount: No longer increases your Movement Speed.",
      "Now reserves 100 spirit (previously 60).",
    ] },

]);
