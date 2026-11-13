/* 3.30 cards: Endgame Changes and Atlas Passive Tree Changes (sources/3.30.0-patch-notes.txt lines 21-175).
   File order teaches the Thread system in sequence: what Threads are, how you use them, old Scarabs,
   Shaped Regions, then the Atlas tree. Schema: spec 5.3 and 5.4. */
EXILE.addChanges([

  /* Threads */

  { id: "threads-replace-scarabs", league: "3.30", area: "maps", kind: "removed", verdict: "do", priority: 1,
    who: ["maps", "trade"], tags: [],
    headline: "Scarabs are gone. Threads replace them.",
    before: "[[scarab|Scarabs]] were items you put in the [[map-device|Map Device]] with your map. Each one added or boosted one kind of extra content, like [[breach|Breach]] or [[legion|Legion]].",
    now: "[[scarab|Scarabs]] are removed from the game. [[thread|Threads]] take their place. There are ten kinds, one for each of ten [[league-mechanic|league mechanics]], such as [[abyss|Abyss]], [[breach|Breach]] and [[ritual|Ritual]].",
    so: "Pick up every [[thread|Thread]] you find. Most places that gave [[scarab|Scarabs]] now give Threads, and Threads are how you add [[breach|Breach]], [[legion|Legion]] and the rest to your maps.",
    soType: "fact", viz: null,
    sources: [
      "Scarabs have been removed from the game. A new item type, Threads, have been added in their place.",
      "Below are the new Thread items available:",
      "The majority of Scarab sources throughout the game instead now grants a number of Threads."
    ] },

  { id: "threads-in-the-map-device", league: "3.30", area: "maps", kind: "changed", verdict: "do", priority: 1,
    who: ["maps"], tags: [],
    headline: "Ten mechanics no longer show up by chance in maps. Bring Threads.",
    before: "[[breach|Breach]], [[legion|Legion]], [[ritual|Ritual]] and seven more [[league-mechanic|league mechanics]] could appear by chance in any map. [[scarab|Scarabs]] made them show up for sure, or added to them.",
    now: "In maps they no longer appear by chance. Spend a [[thread|Thread]] in the [[map-device|Map Device]] as you open a map to add its mechanic, up to eight Threads per map. Each Thread raises the odds of strong random twists to that mechanic.",
    so: "Bring [[thread|Threads]] for the ones you enjoy, or map inside their [[shaped-region|Shaped Region]] for free ones. Extras like [[beyond|Beyond]], [[delirium|Delirium]] mirrors and [[mirage|Mirages]] still appear by chance.",
    soType: "fact",
    viz: { type: "slots", caption: "Up to eight Threads per map. This one has three.", total: 8, filled: 3, labels: null },
    sources: [
      "The following league mechanics no longer have a random chance to spawn in Map areas: Abyss, Bestiary, Betrayal, Breach, Blight, Expedition, Incursion, Legion, Ritual, and Ultimatum.",
      "Threads can be used when entering an Atlas area through the Map Device to apply the associated League mechanic to that Thread to the area.",
      "For each Thread expended, up to a maximum of eight, there are also increasingly higher and higher chances to apply powerful randomised transformative effects to the area related to that League mechanic.",
      "Tertiary League mechanics, such as Beyond, Buried Sentinels, Delirium Mirrors, Mirage, and the Viridian Wildwood now only have Atlas Passive clusters that increase the chance for that mechanic to randomly appear in Maps."
    ] },

  { id: "scarabs-become-threads", league: "3.30", area: "maps", kind: "changed", verdict: "know", priority: 2,
    who: ["maps", "trade"], tags: [],
    headline: "Your old Scarabs turned into Threads or Frayed Threads",
    before: "[[scarab|Scarabs]] came in many kinds, including Veiled Scarabs. They had their own section in the [[stash-tab|Fragment Stash Tab]].",
    now: "Each old [[scarab|Scarab]] became a matching [[thread|Thread]] or a [[frayed-thread|Frayed Thread]], and Veiled Scarabs became Frayed Threads. A Frayed Thread gives you a random Thread. Your Fragment tab now has a Threads section.",
    so: "Use or vendor each [[frayed-thread|Frayed Thread]] to get a random real Thread. In a new league you start with no [[scarab|Scarabs]], so the swap only touches [[standard|Standard]].",
    soType: "fact", viz: null,
    sources: [
      "Existing Scarabs will be converted to either a Thread related to that specific Scarab content, or a Frayed Thread.",
      "Existing Veiled Scarabs will be converted to Frayed Threads.",
      "Added a new Currency Item, Frayed Thread which can be used to grant a random Thread, or vendored for a random Thread.",
      "A new Threads section has been added to the Fragment Stash Tab, and the Scarabs section is now hidden when empty."
    ] },

  /* Shaped Regions and Astrolabes */

  { id: "shaped-regions-free-threads", league: "3.30", area: "maps", kind: "changed", verdict: "do", priority: 1,
    who: ["maps"], tags: [],
    headline: "Shaped Regions now give your maps free Threads",
    before: "[[shaped-region|Shaped Regions]] were zones of maps you made with an [[astrolabe|Astrolabe]]. Clearing a map's objective gave the other maps there bonus [[modifier|modifiers]]. Clearing the whole zone opened a treasure vault.",
    now: "Your [[atlas|Atlas]] starts with ten of them, one for each [[thread|Thread]] type. Maps inside one get free Threads of that type. Each objective you complete there adds one more free Thread to the region's other maps.",
    so: "Run maps inside the region of a mechanic you like. You get its [[thread|Threads]] for free, and the count grows as you go.",
    soType: "fact", viz: null,
    sources: [
      "The Shaped Region system has been completely reworked.",
      "There are 10 types of Shaped Region, each associated with a specific type of Thread. By default your Atlas has a Shaped Region of each Thread type on it.",
      "Shaped Regions grant affected Maps free Threads of that type. Successfully completing the Shaped Region objective in each Map increases the free Thread count by 1 in all other Maps affected by that Shaped Region.",
      "Completing Shaped Region objectives no longer grants other Maps in that Shaped Region bonus modifiers."
    ] },

  { id: "astrolabes-move-regions", league: "3.30", area: "maps", kind: "changed", verdict: "know", priority: 2,
    who: ["maps"], tags: [],
    headline: "Astrolabes now move a Shaped Region onto the map you pick",
    before: "An [[astrolabe|Astrolabe]] made a [[shaped-region|Shaped Region]] in one corner of the [[atlas|Atlas]]. Each type added different content, and none could drop inside a Shaped Region.",
    now: "Using one now puts a region of its type on the map you choose, and removes the old region of that type. Regions made this way give more free [[thread|Threads]]. Old Templar, Fruiting and Deceptive Astrolabes became Cryptic Astrolabes, which give a random other kind.",
    so: "Use [[astrolabe|Astrolabes]] to move a region onto maps you like to run. If you have fewer than ten regions, a button at the centre of the [[atlas|Atlas]] makes a fresh set.",
    soType: "fact", viz: null,
    sources: [
      "Astrolabes have been changed to add a Shaped Region of the specified type to a specific Map on the Atlas, removing existing Shaped Regions of that type from the Atlas.",
      "Shaped Regions applied by Astrolabes have a higher base number of free Threads applied to Maps in the Region.",
      "Templar, Fruiting and Deceptive Astrolabes have been removed. Pre-existing items have been converted to a Cryptic Astrolabe which can be used or vendored to grant a random other Astrolabe.",
      "Astrolabes are no longer restricted from dropping in Shaped Regions.",
      "While you have less than 10 Shaped Regions on your Atlas, you can click a button at the centre of the Atlas to Regenerate all Shaped Regions."
    ] },

  /* Where Threads come from */

  { id: "eldritch-altars-drop-threads", league: "3.30", area: "maps", kind: "changed", verdict: "know", priority: 2,
    who: ["maps"], tags: [],
    headline: "Exarch and Eater altars now offer five kinds of Thread each",
    before: "[[eldritch-altar|Eldritch Altars]] in your maps offer a deal: a harder fight in return for a reward. Some of those rewards were [[scarab|Scarabs]].",
    now: "[[eater-of-worlds|Eater of Worlds]] altars can make the map boss and some monsters drop [[breach|Breach]], [[legion|Legion]], [[blight|Blight]], [[ritual|Ritual]] or [[incursion|Incursion]] [[thread|Threads]]. [[searing-exarch|Searing Exarch]] altars cover [[abyss|Abyss]], [[expedition|Expedition]], [[betrayal|Betrayal]], [[bestiary|Bestiary]] and [[ultimatum|Ultimatum]]. Altar options that could duplicate Scarab drops now work on Threads.",
    so: "Pick altar options by the [[thread|Threads]] you want. Eater altars suit Breach and Legion fans, and Exarch altars suit Abyss and Expedition fans.",
    soType: "fact", viz: null,
    sources: [
      "Eater of Worlds Altars now have Modifiers that can cause Eldritch Monsters or Map Bosses to drop Breach, Legion, Blight, Ritual or Incursion Threads.",
      "Searing Exarch Altars now have Modifiers that can cause Eldritch Monsters or Map Bosses to drop Abyss, Expedition, Betrayal, Bestiary and Ultimatum Threads.",
      "Eldritch Altar Modifiers that granted a chance for Scarabs dropped by slain Enemies to be Duplicated, instead now apply to Threads."
    ] },

  { id: "where-threads-drop", league: "3.30", area: "maps", kind: "changed", verdict: "know", priority: 2,
    who: ["maps", "trade"], tags: [],
    headline: "Threads drop where most Scarabs used to, plus a few new places",
    before: "[[scarab|Scarabs]] dropped from monsters, [[strongbox|Strongboxes]] and other map content. [[mavens-chisel|Maven's Chisel of Scarabs]] and the Skittering [[delirium-orb|Delirium Orb]] found you more.",
    now: "Most old Scarab sources now give [[thread|Threads]] instead. Strongbox [[modifier|modifiers]] now drop 2-5 Threads of one kind, where they gave 1-4 Scarabs. [[tormented-spirit|Tormented Heretics]], ghosts that possess monsters, can now appear in maps on their own, and the monsters they touch can drop Threads.",
    so: "Watch for the renamed [[mavens-chisel|Maven's Chisel of Threads]] and Threaded [[delirium-orb|Delirium Orb]]. Both now bring you more [[thread|Threads]].",
    soType: "fact", viz: null,
    sources: [
      "The majority of Scarab sources throughout the game instead now grants a number of Threads.",
      "Strongbox Modifiers that dropped 1-4 of a specific type of Scarab instead now drop 2-5 of a specific type of Thread.",
      "Tormented Heretics now have a base chance to spawn in Maps. Monsters touched by Tormented Heretics have a chance to drop Threads, and monsters possessed by Tormented Heretics drop additional Threads.",
      "Maven's Chisel of Scarabs has been renamed to Maven's Chisel of Threads, and now increases the quantity of Threads found on a Map (previously Scarabs).",
      "The Skittering Delirium Orb has been renamed to Threaded Delirium Orb, and now grants Thread rewards (previously Scarabs)."
    ] },

  /* One card per mechanic, where the notes say something specific about it */

  { id: "thread-abyss", league: "3.30", area: "maps", kind: "changed", verdict: "skip", priority: 3,
    who: ["maps"], tags: [],
    headline: "Abyss: add it with Threads. Merrick's Ducat now works on its jewels",
    before: "[[abyss|Abyss]] could appear by chance in maps, with pits that release monsters. It is the main source of [[abyssal-jewel|Abyssal Jewels]]. [[memory-trace|Memory]] altars could add it too.",
    now: "In maps, Abyss no longer appears by chance, and [[memory-trace|Memory Trace]] altars no longer add it. Abyss [[thread|Threads]] add it, and [[searing-exarch|Searing Exarch]] altars can make bosses drop them. [[merricks-ducat|Merrick's Ducat]] now works on [[abyssal-jewel|Abyssal Jewels]] directly, and has a new source.",
    so: "Farm Abyss? Pick Exarch altar options and stack Abyss [[thread|Threads]]. Try [[merricks-ducat|Merrick's Ducat]] on a rare [[abyssal-jewel|Abyssal Jewel]] you are happy to corrupt.",
    soType: "fact", viz: null,
    sources: [
      "The following league mechanics no longer have a random chance to spawn in Map areas: Abyss, Bestiary, Betrayal, Breach, Blight, Expedition, Incursion, Legion, Ritual, and Ultimatum.",
      "Memory Altar modifiers that enabled Primary League Mechanics such as Abyss, Breach or Legion have been disabled.",
      "Searing Exarch Altars now have Modifiers that can cause Eldritch Monsters or Map Bosses to drop Abyss, Expedition, Betrayal, Bestiary and Ultimatum Threads.",
      "Merrick's Ducat is now directly usable on Abyssal Jewels without the need for Allflame Crafting.",
      "Merrick's Ducat is now available through a new means outside of Allflame Encounters."
    ] },

  { id: "thread-blight", league: "3.30", area: "maps", kind: "changed", verdict: "skip", priority: 3,
    who: ["maps"], tags: [],
    headline: "Blight: add it with Threads, and Atlas Drops add lane chests",
    before: "[[blight|Blight]] could appear by chance in maps. Monsters march down lanes toward a pump while you build towers to stop them, and chests sit along the lanes.",
    now: "In maps, Blight no longer appears by chance. Blight [[thread|Threads]] add it, and [[eater-of-worlds|Eater of Worlds]] altars can make bosses drop them. The number of chests in each lane now grows with your map's [[atlas-drops|Atlas Drops]].",
    so: "Farm Blight? Pick Eater altar options, stack Blight [[thread|Threads]], and raise [[atlas-drops|Atlas Drops]] for more lane chests.",
    soType: "fact", viz: null,
    sources: [
      "The following league mechanics no longer have a random chance to spawn in Map areas: Abyss, Bestiary, Betrayal, Breach, Blight, Expedition, Incursion, Legion, Ritual, and Ultimatum.",
      "Eater of Worlds Altars now have Modifiers that can cause Eldritch Monsters or Map Bosses to drop Breach, Legion, Blight, Ritual or Incursion Threads.",
      "The number of Blight chests in each Lane within Blight encounters in your Maps is now scaled by a percentage of Atlas Drops."
    ] },

  { id: "thread-breach", league: "3.30", area: "maps", kind: "changed", verdict: "skip", priority: 3,
    who: ["maps"], tags: [],
    headline: "Breach: add it with Threads, and Lavish Wombgifts pay better",
    before: "[[breach|Breach]] rifts could open by chance in maps and pour out waves of monsters. [[memory-trace|Memory]] altars could add them too. Breach drops Wombgifts, seeds for the [[genesis-tree|Genesis Tree]].",
    now: "In maps, Breach no longer appears by chance, and [[memory-trace|Memory Trace]] altars no longer add it. Breach [[thread|Threads]] add it, and [[eater-of-worlds|Eater of Worlds]] altars can make bosses drop them. Lavish [[genesis-tree|Wombgifts]] now grow only more valuable currency.",
    so: "Farm Breach? Pick Eater altar options and stack Breach [[thread|Threads]]. Some [[genesis-tree|Genesis Tree]] currency nodes are weaker to make up for the Wombgift change.",
    soType: "fact", viz: null,
    sources: [
      "The following league mechanics no longer have a random chance to spawn in Map areas: Abyss, Bestiary, Betrayal, Breach, Blight, Expedition, Incursion, Legion, Ritual, and Ultimatum.",
      "Memory Altar modifiers that enabled Primary League Mechanics such as Abyss, Breach or Legion have been disabled.",
      "Eater of Worlds Altars now have Modifiers that can cause Eldritch Monsters or Map Bosses to drop Breach, Legion, Blight, Ritual or Incursion Threads.",
      "Lavish Wombgifts now only birth more valuable Currency items. As a result several nodes that grant additional Currency items have had their values lowered."
    ] },

  { id: "thread-ritual", league: "3.30", area: "maps", kind: "changed", verdict: "skip", priority: 3,
    who: ["maps"], tags: [],
    headline: "Ritual: Blood-Filled Vessels now need Ritual Threads",
    before: "A [[blood-filled-vessel|Blood-Filled Vessel]] holds the monsters from a finished [[ritual|Ritual]] altar. You put it in the [[map-device|Map Device]] with a map to bring those monsters back in a Ritual there.",
    now: "In maps, [[ritual|Ritual]] no longer appears by chance, and Ritual [[thread|Threads]] add it. [[blood-filled-vessel|Vessels]] now go only on maps with Ritual Threads: 4 or more give 2 Vessel slots, and 8 give 3. [[eater-of-worlds|Eater of Worlds]] altars can make bosses drop Ritual Threads.",
    so: "Using Vessels? Spend at least 4 Ritual [[thread|Threads]] on that map, or 8 for the third slot.",
    soType: "fact", viz: null,
    sources: [
      "The following league mechanics no longer have a random chance to spawn in Map areas: Abyss, Bestiary, Betrayal, Breach, Blight, Expedition, Incursion, Legion, Ritual, and Ultimatum.",
      "Blood-Filled Vessels can only be added to Maps that have Ritual Threads applied. 2 Blood-Filled Vessel slots are available for 4 or more Ritual Threads, and 3 Blood-Filled Vessel slots are available for 8 Ritual Threads.",
      "Eater of Worlds Altars now have Modifiers that can cause Eldritch Monsters or Map Bosses to drop Breach, Legion, Blight, Ritual or Incursion Threads."
    ] },

  { id: "unwavering-vision-threads", league: "3.30", area: "maps", kind: "changed", verdict: "skip", priority: 3,
    who: ["maps"], tags: [],
    headline: "Unwavering Vision: one Thread type, but ten per map",
    before: "[[keystone|Keystones]] are big Atlas passives that bend one rule of your maps. Unwavering Vision is one of them, and 3.30 rewrites it.",
    now: "With it, your maps can only use one type of [[thread|Thread]], and Threads you find have a 75% chance to turn into [[gold|Gold]]. In return, maps with Threads get 2 more, even past the usual limit of eight.",
    so: "Consider it if you only ever farm one mechanic, like Breach. Skip it if you like to mix.",
    soType: "fact",
    viz: { type: "slots", caption: "With Unwavering Vision: eight Threads plus two free ones", total: 10, filled: 10, labels: null },
    sources: [
      "The Unwavering Vision Keystone Atlas Passive has been reworked. It now causes you to be only able to apply one type of Thread to your Maps, and 75% chance for Threads found in your Maps to be converted to Gold. Your Maps with Threads applied also gain 2 additional Threads, which can bypass the 8 Thread maximum."
    ] },

  /* Atlas Passive Tree */

  { id: "atlas-tree-rebuilt", league: "3.30", area: "maps", kind: "changed", verdict: "do", priority: 1,
    who: ["maps"], tags: [],
    headline: "The Atlas tree was rebuilt. Old Atlas guides are out of date.",
    before: "The [[atlas-passive-tree|Atlas tree]] is a second skill tree for the endgame. It changes what shows up in your maps, not how strong your character is.",
    now: "You start in the centre and work outward, with up to 150 points instead of 138. Sections for the ten [[thread|Thread]] mechanics were redone, and [[delve|Delve]] and [[heist|Heist]] lost theirs. [[beyond|Beyond]], [[mirage|Mirage]] and similar extras only get nodes that make them appear more often.",
    so: "Find a fresh 3.30 [[atlas-passive-tree|Atlas tree]] before you reach maps. Many old [[scarab|Scarab]] effects now live on the tree itself.",
    soType: "fact",
    viz: { type: "bars", caption: "Atlas skill points you can earn",
      rows: [{ label: "Before", value: 138, display: "138" }, { label: "3.30", value: 150, display: "150" }] },
    sources: [
      "You now begin at the centre of the tree, and head outwards.",
      "The total number of Atlas Passive Skill Points you can earn has been increased to 150 (previously 138).",
      "All Atlas Passive clusters related to Primary League mechanics have been reworked.",
      "Atlas Passive clusters related to Delve and Heist have been removed.",
      "Tertiary League mechanics, such as Beyond, Buried Sentinels, Delirium Mirrors, Mirage, and the Viridian Wildwood now only have Atlas Passive clusters that increase the chance for that mechanic to randomly appear in Maps.",
      "Many effects that previously existed on Scarabs have been partially or fully absorbed by the new Core Atlas Passive Tree."
    ] },

  { id: "atlas-points-from-bosses", league: "3.30", area: "bosses", kind: "buff", verdict: "know", priority: 2,
    who: ["maps", "bosses"], tags: [],
    headline: "Top bosses now give 2 Atlas points, and Uber Elder gives 4",
    before: "Beating the [[maven|Maven]], [[searing-exarch|Searing Exarch]], [[eater-of-worlds|Eater of Worlds]] or [[pinnacle-boss|Uber Elder]] gave 1 [[atlas-passive-tree|Atlas skill point]] and 2 respec points, which let you undo choices. So did each of the Maven's six special [[maven-invitation|Invitations]].",
    now: "Each of those now gives 2 Atlas skill points. The Uber Elder gives 4. Respec points stay at 2.",
    so: "These kills are now a bigger step toward a full Atlas tree. Fit them in when your character is ready.",
    soType: "fact",
    viz: { type: "bars", caption: "Atlas skill points for beating the Maven",
      rows: [{ label: "Before", value: 1, display: "1" }, { label: "3.30", value: 2, display: "2" }] },
    sources: [
      "The quest reward for defeating the Maven, Searing Exarch, Eater of Worlds and for each of Maven's six special Invitations is now 2 Atlas Skill points and 2 Atlas Respec points (previously 1 Atlas Skill point and 2 Atlas Respec points).",
      "The quest reward for defeating the Uber Elder is now 4 Atlas Skill points and 2 Atlas Respec points (previously 1 Atlas Skill point and 2 Atlas Respec points)."
    ] },

  { id: "atlas-keystones-changed", league: "3.30", area: "maps", kind: "changed", verdict: "know", priority: 3,
    who: ["maps"], tags: [],
    headline: "Six Atlas keystones are gone, and one is new",
    before: "[[keystone|Keystones]] are big Atlas passives that bend one rule of your maps, often with a drawback.",
    now: "Crop Rotation, Endless Tide, Lucid Dreams, Meticulous Appraiser, Refiner's Bargain and Synthesised Stability are removed. The new Phantom Anomalies makes [[atlas-anomaly|Atlas Anomalies]] appear when you clear [[shaped-region|Shaped Regions]] instead of maps, from any corner of the Atlas.",
    so: "Plan a new route if your old strategy used a removed keystone. Speaker of the Dead got stronger, and Dimensional Foothold and Enemy at the Gates now offer a choice.",
    soType: "fact", viz: null,
    sources: [
      "The following Keystone Atlas Passives have been removed: Crop Rotation, Endless Tide, Lucid Dreams, Meticulous Appraiser, Refiner's Bargain, and Synthesised Stability.",
      "Added a new Atlas Keystone Passive, Phantom Anomalies, which causes Atlas Anomalies to manifest on completing Shaped Regions instead of Map Completion, and Atlas Anomalies can manifest from any Quadrant.",
      "The Speaker of the Dead Keystone Atlas Passive now allows you to touch up to 50 Normal and Magic Monsters while Possessed (previously 40), and Tormented Spirits now Possess players for 30 seconds (previously 20).",
      "The Dimensional Foothold and Enemy at the Gates Keystone Passive Skills have been converted to multiple-choice Passives."
    ] },

  /* The rest of the Atlas */

  { id: "anomalies-clear-the-map", league: "3.30", area: "maps", kind: "changed", verdict: "do", priority: 2,
    who: ["maps"], tags: [],
    headline: "Kill more of the map before the boss to find more Anomalies",
    before: "[[atlas-anomaly|Atlas Anomalies]] are free one-off areas, added last league. One can appear on your Atlas after you finish a map that a [[voidstone|Voidstone]] affects. [[templar-vault|Templar Vaults]] came from clearing [[shaped-region|Shaped Regions]].",
    now: "The more monsters still alive when you kill the [[map-boss|map boss]], the lower the chance of an Anomaly. Templar Vaults are now Anomalies too. They can appear after you kill a top Eldritch boss, though not inside [[maven-invitation|Maven Invitations]] or [[valdo-map|Valdo Maps]].",
    so: "Clear most of the map before you kill the boss if you want Anomalies. Rushing straight to the boss now lowers your odds.",
    soType: "fact", viz: null,
    sources: [
      "The chance for Atlas Anomalies to spawn is now lowered by the amount of monsters remaining in the Map when the Map Boss is killed.",
      "Templar Vaults are no longer granted by Eagon for completing Shaped Regions. Instead, Templar Vaults are now Atlas Anomalies which have a chance to spawn on killing Pinnacle Eldritch Bosses in each specific Atlas quadrant.",
      "Versions of these bosses killed within Maven Invitations or Valdo Maps do not have a chance to spawn these Atlas Anomalies."
    ] },

  { id: "map-pool-rotated", league: "3.30", area: "maps", kind: "changed", verdict: "know", priority: 3,
    who: ["maps"], tags: [],
    headline: "31 maps return to the Atlas, and 31 leave",
    before: "The [[atlas|Atlas]] holds a set list of map areas. Each league can swap some in or out.",
    now: "Back this league: 31 maps, including Dungeon, Maze, Necropolis and Crimson Temple. Gone: 31 maps, including Toxic Sewer, Vault, Bazaar and Infested Valley.",
    so: "Check your favourite map is still there before you plan around it. Your [[map|map items]] still work, since a map item is not tied to one area.",
    soType: "fact", viz: null,
    sources: [
      "The following Maps have been added back to the Atlas: Academy, Ancient City, Armoury, Barrows, Bone Crypt, Carcass, Castle Ruins, Coves, Crimson Temple, Cursed Crypt, Defiled Cathedral, Dig, Dungeon, Maze, Moon Temple, Mud Geyser, Necropolis, Overgrown Ruin, Pen, Peninsula, Racecourse, Scriptorium, Sepulchre, Shore, Spider Forest, Thicket, Underground River, Underground Sea, Villa, Waste Pool, and Wasteland.",
      "The following Maps have been removed from the Atlas: Alleyways, Arachnid Tomb, Arsenal, Atoll, Bazaar, Beach, Bramble Valley, Cells, Chateau, Courthouse, Dark Forest, Estuary, Flooded Mine, Forbidden Woods, Forking River, Foundry, Frozen Cabins, Gardens, Ghetto, Infested Valley, Ivory Temple, Lair, Orchard, Pier, Plaza, Primordial Blocks, Shipyard, Stagnation, Toxic Sewer, Vault, and Waterways."
    ] },

  { id: "map-rarity-cut", league: "3.30", area: "economy", kind: "nerf", verdict: "know", priority: 2,
    who: ["maps", "trade"], tags: [],
    headline: "Rarity from altars and map mods was cut",
    before: "[[item-rarity|Item Rarity]] makes drops more likely to be better items. [[eldritch-altar|Eldritch Altars]], tough map [[modifier|modifiers]] and boss [[fragment|fragments]] added rarity or [[item-quantity|item quantity]] to maps.",
    now: "Eldritch Altars now give 10-20% rarity, down from 15-30%. [[memory-trace|Memory Trace]] altars, [[mavens-chisel|Maven's Chisel of Procurement]], and [[nightmare-map|Nightmare]] and [[originator|Originator]] map modifiers give less too. Quantity altars are gone, and Shaper, Elder and Conqueror fragments no longer add quantity.",
    so: "Weigh altar options by their other rewards, like [[thread|Threads]]. Keep those boss [[fragment|fragments]] for their own fights. They are no longer used up with a map.",
    soType: "fact",
    viz: { type: "bars", caption: "Eldritch Altar rarity, best roll",
      rows: [{ label: "Before", value: 30, display: "30%" }, { label: "3.30", value: 20, display: "20%" }] },
    sources: [
      "Eldritch Altars can now grant 10-20% increased Rarity of Items found in this Area (previously 15-30%).",
      "Memory Trace Altars can now grant 20-25% increased Rarity of Items found in future Areas (previously 25-40%).",
      "Maven's Chisel of Procurement now grants +25% Item Rarity to Maps at 20% Quality (previously 40%).",
      "Item Rarity values on Nightmare and Originator-influenced Map modifiers that specifically augment Item Rarity have been lowered by approximately 40-50%.",
      "The Eldritch and Memory Trace Altars that granted increased Quantity of Items found have been removed.",
      "Shaper, Elder and Conqueror Fragments no longer grant increased Item Quantity to Maps, and will no longer be consumed when used along with a Map."
    ] },

  { id: "memory-traces-renamed", league: "3.30", area: "maps", kind: "changed", verdict: "know", priority: 3,
    who: ["maps"], tags: [],
    headline: "Memory Threads are renamed Memory Traces",
    before: "[[memory-trace|Memory Threads]] were chains of maps on your [[atlas|Atlas]] that lead to an [[incarnation|Incarnation]], a hard boss. Altars at the end of each of their maps offered bonuses, such as adding [[abyss|Abyss]], [[breach|Breach]] or [[legion|Legion]].",
    now: "They are now called [[memory-trace|Memory Traces]]. Their altars no longer add Abyss, Breach or Legion. New altar options add [[ore-deposit|Ore Deposits]], [[mercenary|Mercenaries]], [[beyond|Beyond]], [[sentinel|Sentinels]], the [[viridian-wildwood|Viridian Wildwood]] or a [[mirage|Mirage]].",
    so: "When you see [[thread|Thread]] in 3.30, it means the new map item. The boss chains are Memory Traces.",
    soType: "fact", viz: null,
    sources: [
      "Memory Threads have been renamed to Memory Traces.",
      "Memory Altar modifiers that enabled Primary League Mechanics such as Abyss, Breach or Legion have been disabled.",
      "Added new Memory Altar modifiers for Ore Deposits, Mercenaries, Beyond, Sentinel, the Viridian Wildwood and Mirage."
    ] },

  /* Crafting bench locks (lines 74-83) */

  { id: "bench-lock-one-modifier", league: "3.30", area: "crafting", kind: "new", verdict: "know", priority: 2,
    who: ["crafting"], tags: [],
    headline: "Lock one prefix or suffix for 1 Divine Orb, or two for 2",
    before: "The [[crafting-bench|crafting bench]] could only lock all [[prefix|prefixes]] or all [[suffix|suffixes]] on an item, so your next craft changed only the rest. Some bench recipes came from [[unique-map|Unique Maps]].",
    now: "Four new [[meta-craft|meta-crafts]] lock just 1 [[prefix|prefix]] or 1 [[suffix|suffix]] for 1 [[divine-orb|Divine Orb]], or 2 prefixes or 2 suffixes for 2 Divine Orbs. Recipes for all meta-crafts moved from Unique Maps to [[nightmare-map|Nightmare Maps]].",
    so: "If you craft, these small locks cost far less than locking a whole side. Their recipes are in [[nightmare-map|Nightmare Maps]], the hardest maps, so plan on getting them late.",
    soType: "fact", viz: null,
    sources: [
      "Crafting Recipes are no longer found in Unique Maps. Crafting Recipes for all Meta-Modifiers have been moved to Nightmare Maps instead.",
      "Added four new Meta-Crafting Bench options:",
      "1 Prefix Modifier cannot be changed, for a cost of 1 Divine Orb.",
      "1 Suffix Modifier cannot be changed, for a cost of 1 Divine Orb.",
      "2 Prefix Modifiers cannot be changed, for a cost of 2 Divine Orbs.",
      "2 Suffix Modifiers cannot be changed, for a cost of 2 Divine Orbs."
    ] },

  { id: "bench-lock-all-costs", league: "3.30", area: "crafting", kind: "nerf", verdict: "know", priority: 3,
    who: ["crafting"], tags: [],
    headline: "Locking every prefix or suffix now costs more, by item type",
    before: "The [[crafting-bench|crafting bench]] options that lock all [[prefix|prefixes]] or all [[suffix|suffixes]] cost 2 [[divine-orb|Divine Orbs]] on any item.",
    now: "They now cost 4 Divine Orbs plus 1 [[sacred-orb|Sacred Orb]] on weapons, 4 [[blessed-orb|Blessed Orbs]] on armour and quivers, or 8 [[exalted-orb|Exalted Orbs]] on jewellery.",
    so: "Price a full lock before you start a craft. If you only need to keep one or two lines, the new small locks are much cheaper.",
    soType: "fact", viz: null,
    sources: [
      "The Crafting Bench options for Prefix Modifiers cannot be changed and Suffix Modifiers cannot be changed have had their costs updated, now with differing costs based on item type:",
      "Prefixes/Suffixes cannot be changed on Weapons now has a cost of 4 Divine Orbs and 1 Sacred Orb.",
      "Prefixes/Suffixes cannot be changed on Armour and Quivers now has a cost of 4 Divine Orbs and 4 Blessed Orbs.",
      "Prefixes/Suffixes cannot be changed on Jewellery now has a cost of 4 Divine Orbs and 8 Exalted Orbs."
    ] },

  { id: "embers-vessels-used-on-maps", league: "3.30", area: "maps", kind: "changed", verdict: "know", priority: 2,
    who: ["maps"], tags: [],
    headline: "Embers and Divine Vessels are now used on the map item itself",
    before: "[[allflame-ember|Allflame Embers]], [[divine-vessel|Divine Vessels]] and [[mercenary-warrant|Mercenary Warrants]] went into the [[map-device|Map Device]] next to your map, like [[fragment|fragments]].",
    now: "Embers and Vessels are now currency you use on the map item itself. Embers now say how many monster packs they swap, and three new Embers exist. Warrants instead open the Proving Grounds, an Atlas area for a rematch with that [[mercenary|Mercenary]].",
    so: "Use Embers and Vessels on your map item before you open it, the way you'd use an orb. Don't look for their slot in the Device.",
    soType: "fact", viz: null,
    sources: [
      "Allflame Embers are no longer fragments which can be used alongside a Map. Instead, these are now Currency items which can be used on a Map to apply an Enchantment which provides their pack substitution effect.",
      "Divine Vessels are now Currency items that can be used on Maps to apply the Deified Enchantment Modifier.",
      "Allflame Embers now specify how many Monsters Packs in the area are substituted.",
      "Added three new Allflame Embers: Allflame Ember of the Cloister, Allflame Ember of the Divine, and Allflame Ember of the Multitude.",
      "Mercenary Warrants are no longer fragments you use alongside a Map. Instead they can be used to open portals to the Proving Grounds area on the Atlas, which is an area where you can rematch the previously fought Mercenary."
    ] },

  { id: "deified-map-bosses", league: "3.30", area: "bosses", kind: "changed", verdict: "know", priority: 3,
    who: ["maps", "bosses"], tags: [],
    headline: "Divine Vessels now make the map boss much tougher",
    before: "To upgrade your [[pantheon|Pantheon]] powers, the god blessings you pick, you ran a map with a [[divine-vessel|Divine Vessel]] and killed certain [[map-boss|map bosses]]. Each Vessel held one soul and did not stack.",
    now: "Using a Vessel now [[deified|Deifies]] the map. Its map bosses get 25% increased damage and speed, 100% increased toughness and 50% increased [[item-rarity|item rarity]]. Vessels now stack to 20.",
    so: "Bring extra defence when you go for a Pantheon upgrade. The boss hits harder than it used to.",
    soType: "fact", viz: null,
    sources: [
      "Divine Vessels are now Currency items that can be used on Maps to apply the Deified Enchantment Modifier.",
      "Deified Areas empower all Map Bosses with 25% increased Damage, 25% increased Attack and Cast Speed, 100% increased Toughness, 25% increased Area of Effect, and 50% increased Rarity of items dropped.",
      "In Deified areas, you can capture the souls of certain Map Bosses, dropping a filled Divine Vessel on death which can be used to upgrade your Pantheon powers.",
      "Divine Vessels now have a stack size of 20 (previously 1)."
    ] },

  /* Delirium and Beyond */

  { id: "delirium-orbs-reworked", league: "3.30", area: "maps", kind: "changed", verdict: "know", priority: 2,
    who: ["maps"], tags: [],
    headline: "Delirium Orbs now give rare maps a Delirious modifier",
    before: "A [[delirium-orb|Delirium Orb]] added an [[enchantment|enchantment]] to a map. It made the map [[delirium|Delirious]] and added rewards of the orb's kind.",
    now: "Each orb now reforges a rare map with a [[delirium|Delirious]] [[modifier|modifier]] of 5 to 50%. More orbs of the same kind add up to 100%, and a different kind resets it. The map gives one reward of that kind, plus one more per 20% Delirious.",
    so: "Stick to one orb type per map so the percentage keeps climbing. Old maps with Delirium layers can't take the new orbs.",
    soType: "fact", viz: null,
    sources: [
      "Delirium Orbs no longer apply enchantments to Maps. Instead they reforge rare Map items with an explicit modifier making players in the area Delirious.",
      "Each Delirium Orb applies between 5 to 50% Delirious percentage.",
      "Applying multiple Delirium Orbs of the same type will add to the current Delirious percentage, up to 100%.",
      "Using a Delirium Orb of a different reward type resets the current Delirious percentage on the Map.",
      "Delirium Orbed Maps have one reward of the specified type and an additional reward of that type for every 20% Delirious Percentage in the area.",
      "Delirium Orbs cannot be used on legacy Maps that have layers of Delirium applied."
    ] },

  { id: "delirium-fog-pays-more", league: "3.30", area: "maps", kind: "buff", verdict: "know", priority: 3,
    who: ["maps"], tags: [],
    headline: "Delirium fog spreads faster and pays more in high maps",
    before: "Touch a [[delirium|Delirium]] mirror in a map and a fog spreads. Monsters in the fog are harder and drop more, and rewards build up while you stay in it.",
    now: "These changes are strongest in higher-level maps. The fog spreads faster at the start and lasts longer, and its monsters drop more [[delirium-orb|Delirium Orbs]] and [[cluster-jewel|Cluster Jewels]]. Its bosses show up more often, and starting at a mirror can add 1 to 3 bonus rewards.",
    so: "Touch [[delirium|Delirium]] mirrors in your [[map-tier|red maps]]. They pay more than they used to.",
    soType: "fact", viz: null,
    sources: [
      "The following changes are more prominent at higher area levels:",
      "The fog wave from Mirrors of Delirium expands much faster at the start of Delirium encounters.",
      "Increased the time before Delirium Fog dissipates.",
      "Increased the chance for Delirium Orbs and Cluster Jewels to drop from Delirious monsters.",
      "Increased the chance for Delirium Bosses to spawn in Delirium fog.",
      "When starting a Delirium Encounter through a Mirror there is a chance for 1-3 bonus rewards."
    ] },

  { id: "beyond-reworked", league: "3.30", area: "maps", kind: "buff", verdict: "know", priority: 3,
    who: ["maps"], tags: [],
    headline: "Beyond is easier to start and pays better",
    before: "In [[beyond|Beyond]], monsters killed near each other can open portals that let demons into the map. Some portals bring Beyond bosses.",
    now: "A [[demonic-evocator|Demonic Evocator]] can appear as a map begins. Touch it and dying monsters can open [[beyond|Beyond]] portals, and maps also have a small natural chance of Beyond. Beyond bosses now grant [[beyond|Demonic Power]] for 60 seconds and may reveal a demon realm.",
    so: "Touch the Evocator if you can handle extra demons. Beyond monsters also drop more [[tainted-currency|Tainted Currency]], orbs for corrupted items.",
    soType: "fact", viz: null,
    sources: [
      "Map areas now have a chance to spawn a Demonic Evocator at the start of the area. Interacting with a Demonic Evocator causes monsters in the area to be able to spawn Beyond portals on death.",
      "Map Areas now have a small chance to naturally have slaying enemies attract Demons from Beyond.",
      "Slaying Beyond Bosses in Maps now has a chance to reveal an entrance to a Demonic realm associated with that slain Beyond Boss.",
      "You now gain Demonic Power for 60 seconds on defeating Beyond Bosses in your Maps.",
      "Beyond Monsters now have an increased chance to drop Tainted Currency."
    ] },

  /* Smaller map content */

  { id: "map-extras-buffed", league: "3.30", area: "maps", kind: "buff", verdict: "know", priority: 3,
    who: ["maps"], tags: [],
    headline: "Sentinels, Shrines, Ore and Rogue Exiles got better",
    before: "Maps can hold small extras by chance, like [[shrine|Shrines]], [[ore-deposit|Ore Deposits]] and [[rogue-exile|Rogue Exiles]]. Buried [[sentinel|Sentinels]] and the [[viridian-wildwood|Viridian Wildwood]] only appeared in tier 16 maps.",
    now: "Buried Sentinels and the Wildwood can now appear in maps of any tier. Covetous Shrines now spawn on their own, and Ore Deposits give 50% more Ore. Rogue Exiles drop loot of much higher rarity and give more experience.",
    so: "Look for the new coloured [[modifier|modifiers]] on rare maps. They promise a [[mirage|Mirage]], a buried [[sentinel|Sentinel]], the [[viridian-wildwood|Wildwood]], a Beyond [[demonic-evocator|Evocator]] or a [[delirium|Delirium]] mirror.",
    soType: "fact", viz: null,
    sources: [
      "Buried Sentinels and the Viridian Wildwood can now spawn randomly in any tier of Map (previously only tier 16 Map areas).",
      "Covetous Shrines now have a base chance to spawn.",
      "Increased the base amount of Ore granted by Ore Deposits in Maps by 50%.",
      "Rogue Exiles have much higher inherent Rarity of items dropped and also grant a higher amount of experience when killed.",
      "Added the following new Modifiers that can roll as suffixes on Maps:",
      "The above Modifiers can only be rolled on Rare Maps, and display in a different colour to regular Map modifiers."
    ] },

  { id: "delve-heist-set-maps", league: "3.30", area: "maps", kind: "changed", verdict: "know", priority: 3,
    who: ["maps"], tags: [],
    headline: "Sulphite and Smuggler's Caches now live in set maps",
    before: "[[delve|Sulphite]], the fuel for the Delve mine, and [[smugglers-cache|Smuggler's Caches]], stashes of [[heist|Heist]] loot, could appear by chance in any map.",
    now: "They no longer appear by chance. Certain maps on the [[atlas|Atlas]] always have Sulphite Veins or Smuggler's Caches. Those give more Sulphite, more [[blueprint|Blueprints]] and more [[heist|Rogue Markers]] than before.",
    so: "If you Delve or Heist, learn which maps hold these and run them. Delve and Heist also lost their Atlas tree sections.",
    soType: "fact", viz: null,
    sources: [
      "Smuggler's Caches and Sulphite Deposits no longer have a random chance to spawn in Map areas.",
      "Several specific Maps on the Atlas now always spawn Sulphite Veins, or Smuggler's Caches or have a chance to contain a chest with a Forbidden Tome.",
      "Increased the chance for Blueprints from Smuggler's Caches as well as the quantity of Rogue Markers dropped.",
      "Increased the amount of Sulphite gained by Sulphite Veins in Maps, up to 50% as much in level 83 Maps.",
      "Atlas Passive clusters related to Delve and Heist have been removed."
    ] },

  { id: "map-corruption-outcome", league: "3.30", area: "maps", kind: "changed", verdict: "know", priority: 3,
    who: ["maps"], tags: [],
    headline: "Corrupting a map no longer rerolls it into an 8-mod rare",
    before: "Using a [[vaal-orb|Vaal Orb]] on a map could reroll it into a rare map with 8 [[modifier|modifiers]]. Players used this to make richer maps.",
    now: "That outcome is gone. Instead, corruption can add 2 more modifiers, up to 9 in total. This also applies to [[expedition|Logbooks]], [[contract|Heist Contracts]], [[blueprint|Blueprints]] and [[maven-invitation|Invitations]].",
    so: "Roll your map's modifiers first, then corrupt it. The new outcome adds to what is already there.",
    soType: "fact", viz: null,
    sources: [
      "Removed the Corruption outcome on non-Unique Maps that rerolls the Map into a Rare Map with 8 Modifiers. This has been replaced with an outcome that will add 2 Explicit Modifiers to a Map (up to a maximum of 9 Modifiers). This change also affects Map-like items such as Logbooks, Heist Contracts, Heist Blueprints and Invitations."
    ] },

  { id: "essences-in-maps", league: "3.30", area: "economy", kind: "changed", verdict: "skip", priority: 3,
    who: ["crafting"], tags: [],
    headline: "Low-tier Essences leave high maps, and a new one arrives",
    before: "[[essence|Essences]] are monsters trapped in crystals in maps. Freeing one gives a currency that makes an item rare with a set bonus. Weeping and Wailing are two of the lower tiers.",
    now: "Weeping Essences no longer appear in [[map-tier|yellow and red maps]], and Wailing ones no longer appear in red maps. The number of Essences per trapped monster now grows with your map's [[atlas-drops|Atlas Drops]]. There is a new Essence of Trickery.",
    so: "Expect stronger [[essence|Essences]] in high maps. [[ruthless|Ruthless]] keeps the old rules for Weeping and Wailing.",
    soType: "fact", viz: null,
    sources: [
      "In Yellow and Red Maps Weeping Essences no longer generate on Monsters, and in Red Maps Wailing Essences no longer generate on Monsters. These changes do not affect Ruthless.",
      "The average number of Essences on Imprisoned Monsters in Maps now scales with Atlas Drop scaling on your Map.",
      "Added a new Essence, Essence of Trickery."
    ] }

]);
