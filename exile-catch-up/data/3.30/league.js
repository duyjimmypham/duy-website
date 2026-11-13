/* Exile Catch-Up: league file for 3.30. Schema: spec 5.6.
   recap is grounded in sources/3.28.0, 3.29.0 and 3.30.0 notes. sections keys match data/3.30/notes.js ids.
   tldr: the five cards a returning casual player most needs (league mechanic, Threads, Atlas tree, loot, Mirage). */
EXILE.addLeague({
  version: "3.30",
  name: "Covens of Umbra",
  launch: "2026-11-13",
  oneLine: "Stop the [[covens-of-umbra|Coven]]'s rites, then pick [[fate|Fates]] for the area's boss: a harder fight for better loot. Put its [[viscera|Viscera]] on your [[wickerman|Wickerman]] for bonuses.",
  officialUrl: "https://www.pathofexile.com/covens",
  notesSource: "poedb.tw copy of the official 3.30.0 notes, fetched 2026-11-11",

  recap: [
    { version: "3.28", name: "Mirage",
      oneThing: "[[map|Map items]] lost their names: a map is just a tier now, and you pick the area on your [[atlas|Atlas]]. From 3.30, [[mirage|Mirages]] can also appear in your maps." },
    { version: "3.29", name: "Curse of the Allflame",
      oneThing: "[[mercenary|Mercenaries]] became a permanent part of the game, any gem now fits any [[socket|socket]], and [[abyss|Abyss]] and [[legion|Legion]] were rebuilt." },
    { version: "3.30", name: "Covens of Umbra",
      oneThing: "[[scarab|Scarabs]] are gone. You now put [[thread|Threads]] in the [[map-device|Map Device]] to add league mini-games, which no longer appear in maps by chance. The [[atlas-passive-tree|Atlas tree]] was rebuilt." },
  ],

  tldr: ["covens-fates", "threads-in-the-map-device", "atlas-tree-rebuilt", "item-tiers-on-drops", "mirage-in-every-league"],

  sections: {
    "the-covens-of-umbra-challenge-league": "The new league. Stop the [[covens-of-umbra|Coven]]'s rites to pick [[fate|Fates]] for an area's boss, making it harder and richer, then put its [[viscera|Viscera]] on your [[wickerman|Wickerman]] for bonuses.",
    "new-content-and-features": "Two new skills, [[arcane-link|Arcane Link]] and [[transfigured-gem|Fireball of Radiation]], plus 11 new [[unique-item|uniques]] and a new jewel base, the [[mycelium-core|Mycelium Core]]. [[valdo-map|Valdo's Maps]] and the [[voidborn-reliquary|Voidborn Reliquary]] can give many more foil rewards.",
    "endgame-changes": "[[scarab|Scarabs]] are removed and ten kinds of [[thread|Threads]] replace them, and ten league mechanics no longer appear in maps by chance. [[shaped-region|Shaped Regions]], [[astrolabe|Astrolabes]], [[delirium-orb|Delirium Orbs]], [[divine-vessel|Divine Vessels]] and map rarity bonuses all work differently.",
    "atlas-passive-tree-changes": "The [[atlas-passive-tree|Atlas tree]] is rebuilt: you start in the centre, can earn up to 150 points, and the Delve and Heist clusters are gone. Several [[keystone|keystones]] are removed, and Scarab clusters become Thread clusters.",
    "mirage-as-a-core-league": "[[mirage|Mirage]], the 3.28 league, is now core, so Mirages can appear in maps in every league. Two kinds of [[djinn-coin|Djinn Coin]] are deleted, the [[saresh|Saresh]] fight is much harder, and Mirage [[incubator|Incubators]] stop dropping.",
    "league-changes": "Many old league mechanics change. [[atziri|Atziri]] moves into the [[temple-of-atzoatl|Incursion Temple]], [[harvest|Harvest]] happens right in the map, [[expedition|Gwennen]] stops gambling, [[bestiary|Bestiary]] stops capturing yellow beasts, and [[whakano|Whakano]] sells [[heist|Heist]] jobs for [[gold|Gold]].",
    "item-generation-changes": "Drops work differently now. Monsters with more [[item-rarity|Item Rarity]] drop better currency, maps use [[atlas-drops|Atlas Drops]] in place of [[item-quantity|Item Quantity]], and from Act 6 magic and rare items can roll an [[item-tier|Item Tier]] from 2 to 5.",
    "general-changes-and-improvements": "A grab bag of smaller changes. Every town vendor sells [[scroll-of-wisdom|Scrolls of Wisdom]] for 15 Gold, a [[crafting-bench|bench]] craft makes all sockets white, and more tooltip words are [[keyword|keyworded]].",
    "ascendancy-changes": "Five [[ascendancy|ascendancies]] change. The [[reliquarian|Reliquarian]]'s notables are shuffled again, [[warden|Warden]] and [[trickster|Trickster]] get stronger, [[pathfinder|Pathfinder]]'s flask passives change, and the [[luminary|Luminary]]'s [[light-radius|Light Radius]] bonus to mercenaries is halved.",
    "skill-gem-changes": "Very few skill changes. [[link-skill|Flame Link]] and Pact of Beidat are adjusted, [[golem|golem]] bonuses shrink, and Winter Orb is cut back after its 3.29 buff.",
    "support-gem-changes": "Two [[support-gem|support gems]] change. Transfusion now gives a nearby [[minion|minion]] charges instead of souls, and Vaal Sacrifice now leaves you 20% of your maximum Life and [[energy-shield|Energy Shield]], up from 1 point.",
    "unique-item-changes": "A handful of [[unique-item|uniques]] change. Doedre's Tongue now drops only from [[covens-of-umbra|Covens of Umbra]] encounters, Living Blade lets you run two extra [[tincture|Tinctures]], and Femurs of the Saints and Shavronne's Wrappings are reworked.",
    "item-changes": "[[orb-of-chance|Orbs of Chance]] are far more likely to make a unique, but much rarer and no longer sold by vendors. [[orb-of-binding|Orbs of Binding]] stop dropping, and several [[vendor-recipe|vendor recipes]] and base item bonuses change.",
    "mercenary-changes": "Hired [[mercenary|mercenaries]] gain more life, but at high levels they deal less attack damage, take more damage, and lose 30% [[resistance|resistances]] in mid-level areas and 60% in maps. A few uniques and supports stop working on them or change for them.",
    "divination-card-changes": "[[divination-card|Divination cards]] can no longer reward items from the current league, and eight cards are switched off for now.",
    "monster-changes": "The monster packs that guard [[strongbox|Strongboxes]] can now be magic or rare.",
    "user-interface-changes": "Two small changes. Hold Alt over a [[keyword|keyword]] in the area modifier list to pin its help, and controller players can switch between stash and inventory while the [[currency-exchange|Currency Exchange]] is open.",
    "microtransaction-changes": "Changes to cosmetic items bought from the shop. None of them affect how the game plays.",
    "bug-fixes": "A long list of fixes for skills, items, monsters and display text. Read it only if something in your build behaved oddly last league.",
  },
});
