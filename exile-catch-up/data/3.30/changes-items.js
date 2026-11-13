/* Exile Catch-Up: 3.30 cards for loot, items, crafting, uniques, divination cards, monsters, UI and bug fixes.
   Lines 328-425, 453-530 and 548-626 of sources/3.30.0-patch-notes.txt. The bench lock (meta-crafting) costs
   are in changes-endgame.js, which owns lines 74-83. Schema: spec 5.3. Every sources string is an exact quote
   from one line of the notes. */
EXILE.addChanges([

  /* Loot: how items are generated */

  { id: "loot-rarity-picks-drops", league: "3.30", area: "economy", kind: "changed", verdict: "know", priority: 1,
    who: ["all"], tags: [],
    headline: "Monsters with more Item Rarity now drop better currency",
    before: "When a monster dropped loot, the game rolled a [[rarity|rarity]] first, then picked the kind of item. For currency, that roll barely mattered. To balance this, magic and rare monsters dropped less currency.",
    now: "[[item-rarity|Item Rarity]] now decides which kinds of items can drop. Cheap orbs like [[orb-of-alteration|Alteration]] need a magic roll, and orbs like [[chaos-orb|Chaos]] and [[divine-orb|Divine]] need a rare roll. Magic and rare monsters lost their old currency penalty.",
    so: "Kill the rare and unique monsters in your maps. Much more of your valuable currency will come from them now.",
    soType: "fact", viz: null,
    sources: [
      "Magic monsters (which have much higher Item Rarity compared to Normal monsters) had 50% less chance to drop items that can't have rarity",
      "Item Rarity on monsters and chests has changed to now affect which Drop Pools can be selected.",
      "Magic Currency can only generate if the selected \"Rarity\" was Magic, and Rare Currency can only generate if the selected \"Rarity\" was Rare.",
      "As a result, a much greater percentage of valuable currency items you find will now be coming from Rare and Unique Monsters."
    ] },

  { id: "item-quantity-to-atlas-drops", league: "3.30", area: "maps", kind: "changed", verdict: "know", priority: 2,
    who: ["maps"], tags: [],
    headline: "Item Quantity on maps is now Atlas Drops",
    before: "[[item-quantity|Item Quantity]] meant more items of every kind. [[map|Map]] modifiers raised it, and so did extras like [[delirium|Delirium]] fog and [[ritual|Rituals]].",
    now: "On maps it is now [[atlas-drops|Atlas Drops]], at the same values, even on old maps. Each 1% means 1% more maps and [[thread|Threads]], plus more league resources like [[lifeforce|Lifeforce]]. The extras give monsters more [[item-rarity|Item Rarity]] instead.",
    so: "Read map modifiers with fresh eyes. Atlas Drops mostly means more maps, Threads and league resources.",
    soType: "fact", viz: null,
    sources: [
      "Replaced Item Quantity on Map Modifiers with Atlas Drops at the same values. This change affects pre-existing items.",
      "Each percentage of increased Atlas Drops increases the quantity of Maps and Threads found in the area by 1%.",
      "It also affects the quantity of League-specific resources found, such as Hiveblood from Breach monsters or Lifeforce from Harvest monsters.",
      "For the following changes where Item Quantity has been removed, Item Rarity has been increased to compensate:",
      "Delirium Fog no longer grants increased Item Quantity to Monsters.",
      "Opulent Rituals no longer grant Ritual Monsters increased Item Quantity."
    ] },

  { id: "item-tiers-on-drops", league: "3.30", area: "economy", kind: "new", verdict: "do", priority: 1,
    who: ["all"], tags: [],
    headline: "Magic and rare drops now have a tier from 2 to 5",
    before: "[[rarity|Magic and rare]] drops had no grade. You had to [[unidentified-item|identify]] each one to see if its bonuses were any good.",
    now: "From Act 6, magic and rare items can drop with an [[item-tier|Item Tier]] from 2 to 5. A higher tier means stronger bonuses once identified, plus better odds of good bases, [[quality|quality]] and [[socket|sockets]]. Item Rarity, on monsters or on you, makes tiers more likely.",
    so: "Pick up and identify rares with a high Item Tier, especially tier 5. Those are the drops most likely to roll strong bonuses. [[ruthless|Ruthless]] items have no tiers.",
    soType: "fact", viz: null,
    sources: [
      "In Act 6 onwards, Rare and Magic Items now have a change to generate with an Item Tier, ranging from 2 to 5.",
      "Items in Ruthless do not have Item Tiers.",
      "The tier of the item influences the modifier tier rating on the item when it is identified, higher tier resulting in higher modifier tier rating.",
      "Item Tier will influence the chance for the item to be a higher level base type (for Weapons and Armours), chance to have Quality, chance for higher Quality, and chance to have more Sockets and Socket links.",
      "Item Rarity on Monsters affects the chance for Rare and Magic items to have Item Tiers.",
      "Player Item Rarity now affects the chance to find Tiered Magic and Rare items."
    ] },

  { id: "gear-rarity-weaker", league: "3.30", area: "economy", kind: "nerf", verdict: "know", priority: 2,
    who: ["maps", "trade"], tags: [],
    headline: "Item Rarity on your gear does less",
    before: "[[item-rarity|Item Rarity]] on your gear made drops more likely to be magic, rare or [[unique-item|unique]]. Some players gave up defences to stack it.",
    now: "It is now less effective at that. Instead, it raises your chance to find magic and rare items with an [[item-tier|Item Tier]].",
    so: "Rarity on gear now mainly helps you find better rares. Don't give up life or [[resistance|resistances]] for it unless rares are what you farm.",
    soType: "fact", viz: null,
    sources: [
      "Decreased the efficacy of player Item Rarity on finding Magic, Rare and Unique Rarity items.",
      "Player Item Rarity now affects the chance to find Tiered Magic and Rare items."
    ] },

  { id: "fractured-items-rarer", league: "3.30", area: "crafting", kind: "nerf", verdict: "know", priority: 3,
    who: ["crafting", "trade"], tags: [],
    headline: "Fractured items drop far less often",
    before: "A [[fractured-item|fractured item]] has one bonus locked in place. Crafters prize them, and many came from [[legion|Legion]], [[ritual|Ritual]], [[heist|Heist]], [[delirium|Delirium]] and other mechanics.",
    now: "Most of those sources are gone, and rare monsters no longer turn their drops fractured. The new source is tier 5 [[item-tier|Item Tier]] drops, which can come as fractured magic items.",
    so: "Fractured bases will likely cost more on trade. Keep any good ones you find.",
    soType: "prediction", viz: null,
    sources: [
      "Removed many sources of Fractured Items dropping, primarily from League Mechanics such as Legion, Ritual, Heist, Blight, Delirium, Delve and Incursion.",
      "Removed the random Rare monster modifier conversion for all Items dropping as Fractured.",
      "Tier 5 items have a chance to drop as Fractured Magic items."
    ] },

  { id: "popular-bases-need-item-tier", league: "3.30", area: "crafting", kind: "changed", verdict: "know", priority: 2,
    who: ["crafting", "trade"], tags: [],
    headline: "Popular bases now need a high Item Tier to drop",
    before: "A [[base-type|base type]] is the kind of item under the random bonuses. Bases like Steel Ring, Vermillion Ring and Two-Toned Boots also dropped as plain white items, ready to craft.",
    now: "Eighteen bases now drop only as magic or rare items with a high enough [[item-tier|Item Tier]], such as tier 3 for Steel Ring. Eleven more, like Stygian Vise, join normal drops the same way. Most of the eighteen got a bigger [[implicit-modifier|built-in bonus]].",
    so: "Most old copies can get the bigger bonus with a [[blessed-orb|Blessed Orb]]. Fresh copies will likely be harder to find and cost more.",
    soType: "prediction",
    viz: { type: "bars", caption: "Two-Toned Boots: best roll of two resistances",
      rows: [ { label: "Before", value: 12, display: "12%" }, { label: "3.30", value: 20, display: "20%" } ] },
    sources: [
      "The following core drop pool item base types can now only drop on Magic and Rare items with a certain Item Tier or higher",
      "For example, Stygian Vise requires an Item Tier of 5 to drop, while Steel Ring requires an Item Tier of at least 3 to drop.",
      "The Implicit Modifiers on the following Atlas Item Types have been adjusted:",
      "Two-Toned Boots now has +16-20% to two Elemental Resistances (previously +8-12%).",
      "The following item base types have been added to the core drop pool:",
      "All the above items can be updated to the new values using Blessed Orbs."
    ] },

  { id: "modifier-tier-rating-rework", league: "3.30", area: "crafting", kind: "changed", verdict: "skip", priority: 3,
    who: ["crafting"], tags: [],
    headline: "Modifier Tier Rating was reworked behind the scenes",
    before: "[[modifier-tier-rating|Modifier Tier Rating]] is a hidden number that pushes new items toward stronger bonuses. Small amounts often did nothing, and high amounts made some bonuses, like weapon physical damage, show up less.",
    now: "Every bit now helps a little, and it no longer changes which kinds of bonus appear. Rares from [[kingsmarch|Kingsmarch]] and gear grown on the [[genesis-tree|Genesis Tree]] get less of it.",
    so: "Nothing to do. If you farmed rares from Kingsmarch or the Genesis Tree, expect somewhat weaker rolls.",
    soType: "fact", viz: null,
    sources: [
      "High Modifier Tier Rating would drastically lower the chance to see increased Physical Damage modifiers.",
      "resulting in additional small amounts having little to no impact unless reaching specific value breakpoints",
      "In the new system the chance for a specific type of Modifier to appear is not affected by Modifier Tier Rating.",
      "In the new system every bit of Modifier Tier Rating results in higher tier Modifiers on average and there are no longer breakpoints where a large effect is noticed.",
      "Reduced the amount of Modifier Tier Rating granted to random Rare Items rewarded from Kingsmarch Mapping and Shipping.",
      "small nodes now grant Birthed Equipment has +10 to Modifier Tier Rating (previously +20)."
    ] },

  { id: "rog-and-recombinator-changes", league: "3.30", area: "crafting", kind: "changed", verdict: "skip", priority: 3,
    who: ["crafting"], tags: [],
    headline: "Rog rerolls fewer times, and the Recombinator keeps item level",
    before: "Rog, the [[expedition|Expedition]] trader, offers deals that reroll an item's bonuses several times and keep the best result. The [[recombinator|Recombinator]] merges two items into one, averaging their item levels.",
    now: "Rog's reroll deals now go 1, 3 or 5 times, down from 3, 6 or 10. A Recombinator result now always has the [[item-level|item level]] of the base you pick. It can't be used on [[corrupted|corrupted]] items.",
    so: "Rog crafting gets weaker. Merging a low-level item into a high-level base is safer now.",
    soType: "fact",
    viz: { type: "bars", caption: "Rog's biggest reroll deal",
      rows: [ { label: "Before", value: 10, display: "10 times" }, { label: "3.30", value: 5, display: "5 times" } ] },
    sources: [
      "Rog now offers deals to Reroll Prefixes and Suffixes 1, 3, or 5 times, keeping the best outcome (previously 3, 6, or 10).",
      "All deals that upgraded the tiers of Modifiers have lower chances to appear.",
      "When using the Recombinator, the resultant item always has the item level of the selected input base type, rather than averaging the item level of the input base types.",
      "The Recombinator cannot be used on Corrupted items, even if those items have the \"Can be modified while Corrupted\" Modifier."
    ] },

  { id: "kingsmarch-shipping-currency", league: "3.30", area: "economy", kind: "changed", verdict: "skip", priority: 3,
    who: ["trade"], tags: [],
    headline: "Kingsmarch shipments now pay only rarer currency",
    before: "In [[kingsmarch|Kingsmarch]], the port town from 3.25, you ship ores and bars to faraway ports. Shipments paid out a mix of currency, cheap quality orbs included.",
    now: "Shipments now pay only rarer currency, with no quality currency at all. [[ruthless|Ruthless]] is unchanged. Rare items from Kingsmarch also roll a bit weaker.",
    so: "Expect fewer piles of cheap orbs from shipping. If you never used Kingsmarch, you can skip this.",
    soType: "fact", viz: null,
    sources: [
      "Rewards from shipping Ores and Bars from Kingsmarch now reward only rarer Currency items and excludes all quality Currency items (this change does not affect Ruthless).",
      "Reduced the amount of Modifier Tier Rating granted to random Rare Items rewarded from Kingsmarch Mapping and Shipping."
    ] },

  { id: "vendor-gambling-costs", league: "3.30", area: "economy", kind: "changed", verdict: "know", priority: 3,
    who: ["leveling"], tags: [],
    headline: "Gambling at vendors: cheaper mid-campaign, weaker late",
    before: "Town vendors let you gamble [[gold|Gold]] on gear whose bonuses you can't see until you buy it. Unidentified rares from vendors also cost an [[orb-of-chance|Orb of Chance]] on top of their price.",
    now: "Gambles for gear other than jewellery cost less Gold in the middle of the campaign. At high levels every gamble costs more, and the gear rolls weaker bonuses and fewer [[socket|sockets]] and links. Vendor rares no longer need the Orb of Chance.",
    so: "Gamble for gear upgrades while you level, when it's cheaper. At high levels it costs more for less.",
    soType: "fact", viz: null,
    sources: [
      "Reduced the Gold cost of Gambling during the mid-Campaign levels for non-Jewellery.",
      "Increased the Gold cost of Gambling for all items at high levels.",
      "At high level, equipment purchased from the Gambler has less Modifier Tier Rating as well as fewer Sockets and Socket Links than before.",
      "Unidentified Rare items sold by vendors no longer require an Orb of Chance along with that item's normal cost."
    ] },

  /* General changes */

  { id: "wisdom-scrolls-for-gold", league: "3.30", area: "qol", kind: "changed", verdict: "know", priority: 2,
    who: ["all"], tags: [],
    headline: "Buy Scrolls of Wisdom from any vendor for 15 Gold",
    before: "A [[scroll-of-wisdom|Scroll of Wisdom]] identifies an item so you can see its bonuses. Monsters dropped piles of them.",
    now: "Every town vendor sells them for 15 [[gold|Gold]]. Monsters with high [[item-rarity|Item Rarity]] drop fewer scrolls now. Vendors also sell [[orb-of-transmutation|Orbs of Transmutation]] for an [[orb-of-augmentation|Orb of Augmentation]], no longer for [[portal-scroll|Portal Scrolls]].",
    so: "Run low on scrolls? Buy a stack with Gold in any town.",
    soType: "fact", viz: null,
    sources: [
      "Scrolls of Wisdom are now purchasable from vendors in all towns for 15 Gold.",
      "This means as monsters have more Item Rarity they will drop fewer Scrolls of Wisdom and Portal Scrolls.",
      "Orbs of Transmutation are now purchasable for an Orb of Augmentation (previously Portal Scrolls)."
    ] },

  { id: "white-socket-bench-craft", league: "3.30", area: "crafting", kind: "new", verdict: "skip", priority: 3,
    who: ["crafting"], tags: ["unique:untouched-soul"],
    headline: "A new bench craft makes every socket white",
    before: "Since 3.29, any gem fits any [[socket|socket]]. Most sockets are white, and a coloured one only adds a little [[quality|quality]] to a gem of its colour.",
    now: "A new [[crafting-bench|Crafting Bench]] option turns all sockets on an item white for one [[orb-of-scouring|Orb of Scouring]]. On a [[corrupted|corrupted]] item it also costs a [[vaal-orb|Vaal Orb]].",
    so: "Most players can skip it. It helps with items that reward empty white sockets, like The Untouched Soul amulet.",
    soType: "fact", viz: null,
    sources: [
      "Added a new Crafting Bench option to set all Sockets on an item to be White for a cost of an Orb of Scouring (or an Orb of Scouring and a Vaal Orb for Corrupted items)."
    ] },

  { id: "stash-tab-slots-shuffled", league: "3.30", area: "qol", kind: "changed", verdict: "know", priority: 3,
    who: ["maps", "trade"], tags: [],
    headline: "Orb shards leave the Currency tab, and new items get slots",
    before: "Special [[stash-tab|stash tabs]], like the Currency tab, have a set slot for each kind of item. Shards, the small pieces that add up to a full orb, had slots there.",
    now: "Binding, Annulment, Chaos, Exalted and Regal Shards can no longer go in the Currency tab. New slots hold league items like [[soul-core|Soul Cores]], [[royal-visage|Royal Visages]] and [[divine-vessel|Divine Vessels]], plus two [[essence|Essences]] and both [[catalyst|Catalysts]].",
    so: "Keep room for orb shards in a normal tab. Most new league items already have a slot in your special tabs.",
    soType: "fact", viz: null,
    sources: [
      "Binding Shards, Annulment Shards, Chaos Shards, Exalted Shards, and Regal Shards can no longer be stored in the Currency Stash Tab.",
      "Reflecting Mist can now be stored in the Currency Stash Tab.",
      "Added the following items to the League section of the Currency Stash Tab:",
      "Added the following items to the Atlas section of the Currency Stash Tab: Divine Vessel, Feral Astrolabe, Immortal Astrolabe, and Royal Astrolabe.",
      "Added the Essence of Desolation and Essence of Trickery to the Essence Stash Tab.",
      "Added the Dextral and Sinistral Catalysts to the Ultimatum Stash Tab."
    ] },

  { id: "campaign-wildwood-and-mirage", league: "3.30", area: "qol", kind: "new", verdict: "know", priority: 3,
    who: ["leveling"], tags: [],
    headline: "Mirages and the Wildwood can now appear in the campaign",
    before: "[[mirage|Mirages]] and the [[viridian-wildwood|Viridian Wildwood]] are side activities from recent leagues. Both add extra monsters and loot to an area.",
    now: "The Northern Forest and Dread Thicket in Act 7 can spawn the Wildwood. The Vastiri Desert and the Oasis in Act 9 can spawn a Mirage. [[ruthless|Ruthless]] is left out.",
    so: "Nothing changes unless you see one. Try it if you have time while levelling.",
    soType: "fact", viz: null,
    sources: [
      "The Northern Forest and the Dread Thicket in Act 7 have a chance to spawn the Viridian Wildwood. This does not apply in Ruthless.",
      "The Vastiri Desert and the Oasis in Act 9 have a chance to spawn a Mirage. This does not apply in Ruthless."
    ] },

  /* Unique items */

  { id: "shavronnes-wrappings-rework", league: "3.30", area: "build", kind: "buff", verdict: "skip", priority: 3,
    who: [], tags: ["unique:shavronnes-wrappings"],
    headline: "Shavronne's Wrappings gains Energy Shield and recoup",
    before: "Shavronne's Wrappings is a [[unique-item|unique]] body armour that stops chaos damage from skipping past your [[energy-shield|Energy Shield]]. Builds that live on Energy Shield wear it.",
    now: "It loses 10% faster start of [[energy-shield|Energy Shield]] recharge. It gains 20-30% of damage taken [[recoup|recouped]], so it comes back as Energy Shield over a few seconds. Its Energy Shield bonus is now 150-200%, up from 100-150%.",
    so: "An old copy can get the new Energy Shield roll with a [[divine-orb|Divine Orb]]. The notes don't say old copies get the recoup.",
    soType: "fact",
    viz: { type: "bars", caption: "Increased Energy Shield, best roll",
      rows: [ { label: "Before", value: 150, display: "150%" }, { label: "3.30", value: 200, display: "200%" } ] },
    sources: [
      "The Shavronne's Wrappings Unique Body Armour no longer has 10% faster start of Energy Shield Recharge.",
      "It now has 20-30% of Damage Taken Recouped as Energy Shield, and 150-200% increased Energy Shield (previously 100-150%).",
      "Existing items can receive the new increased Energy Shield values with a Divine Orb."
    ] },

  { id: "femurs-of-the-saints-rework", league: "3.30", area: "build", kind: "changed", verdict: "skip", priority: 3,
    who: [], tags: ["unique:femurs-of-the-saints"],
    headline: "Femurs of the Saints, a minion staff, gets random bonuses",
    before: "Femurs of the Saints is a two-handed staff for [[minion|minion]] builds. It had one fixed bonus per minion type, like extra block per Skeleton or regeneration per Zombie.",
    now: "It gives +2-3 to minion gem levels, up from +2, and 80-100% increased minion damage, up from 60-80%. The per-minion bonuses now roll at random: up to four from a set of seven.",
    so: "A [[divine-orb|Divine Orb]] gives an old copy the new gem level and damage rolls. Check new copies for the per-minion bonuses your build uses.",
    soType: "fact",
    viz: { type: "bars", caption: "Minion damage, best roll",
      rows: [ { label: "Before", value: 80, display: "80%" }, { label: "3.30", value: 100, display: "100%" } ] },
    sources: [
      "The Femurs of the Saints Unique now has +2-3 to level of Socketed Minion Gems (previously +2), and Minions deal 80-100% increased Damage (previously 60-80%), a Divine Orb can be used to receive the new values.",
      "It no longer has +1% Chance to Block Attack Damage per Summoned Skeleton",
      "Instead, it can now roll up to 4 Modifiers from a new set:",
      "Regenerate 0.8-1% of Life per second for each Raised Zombie."
    ] },

  { id: "atziris-acuity-rework", league: "3.30", area: "build", kind: "changed", verdict: "skip", priority: 3,
    who: [], tags: ["unique:atziris-acuity"],
    headline: "Atziri's Acuity trades Vaal Pact for instant crit leech",
    before: "Atziri's Acuity are gloves for critical strike builds. They gave you [[keystone|Vaal Pact]], a life [[leech|leech]] keystone, if you had dealt a critical strike recently.",
    now: "New copies make life [[leech|leech]] from critical strikes instant, so you heal at once from your crits. They also stop all life regeneration and [[recoup|recoup]]. Copies you already own stay as they are.",
    so: "If your build uses them, keep your old pair. A new pair plays very differently.",
    soType: "fact", viz: null,
    sources: [
      "The Atziri's Acuity Unique Gloves no longer grants you have Vaal Pact if you've dealt a Critical Strike Recently.",
      "It now has Life Leech from Critical Strikes is instant, and Cannot Regenerate or Recoup Life.",
      "Existing versions of this Unique are not affected by these changes."
    ] },

  { id: "doedres-tongue-league-only", league: "3.30", area: "build", kind: "buff", verdict: "skip", priority: 3,
    who: [], tags: ["unique:doedres-tongue"],
    headline: "Doedre's Tongue is stronger and drops only in Covens fights",
    before: "Doedre's Tongue is a [[unique-item|unique]] amulet for curse builds, with [[resistance|resistances]] and a 20-25% chance to [[ailment|freeze, shock and ignite]].",
    now: "It now has 30-35% to all elemental resistances, up from 20-25%, and a 25-50% chance to freeze, shock and ignite. It also rolls a line from a new set, like letting all damage ignite cursed enemies.",
    so: "Update an old copy with a [[divine-orb|Divine Orb]]. New copies come only from [[covens-of-umbra|Covens of Umbra]] encounters, so they will likely be scarce.",
    soType: "prediction",
    viz: { type: "bars", caption: "All elemental resistances, best roll",
      rows: [ { label: "Before", value: 25, display: "25%" }, { label: "3.30", value: 35, display: "35%" } ] },
    sources: [
      "The Doedre's Tongue Unique Amulet can no longer drop outside of Covens of Umbra encounters.",
      "It now has 30-35% to all Elemental Resistances (previously 20-25%), and 25-50% chance to Freeze, Shock and Ignite (previously 20-25%).",
      "Existing items can receive these new values with a Divine Orb.",
      "All Damage can Ignite against Cursed Enemies."
    ] },

  { id: "build-uniques-retuned", league: "3.30", area: "build", kind: "changed", verdict: "skip", priority: 3,
    who: [], tags: ["unique:the-living-blade", "unique:shadowstitch", "unique:malachais-loop"],
    headline: "Living Blade, Shadowstitch and Malachai's Loop were retuned",
    before: "Each of these uniques anchors a few builds. Living Blade boosts [[tincture|Tinctures]], Shadowstitch rewards wearing [[corrupted|corrupted]] items, and Malachai's Loop feeds you [[charge|Power Charges]].",
    now: "Living Blade allows 2 extra Tinctures, up from 1. Shadowstitch gives more life and Energy Shield per corrupted item, but a bigger resistance penalty. Malachai's Loop gains Energy Shield and Power Charge chance, but holds 1 fewer charge.",
    so: "Shadowstitch and Malachai's Loop owners can update with a [[divine-orb|Divine Orb]]. Check first, since each update has a downside.",
    soType: "fact", viz: null,
    sources: [
      "The Living Blade Unique Sword now has you can have 2 additional Tinctures active (previously 1).",
      "-8 to -6% to all Resistances for each Corrupted Item Equipped (previously -6 to -4%), 10-12% increased Maximum Energy Shield for each Corrupted Item Equipped (previously 8%), and 8-10% increased Maximum Life for each Corrupted Item Equipped (previously 6%).",
      "Existing versions of this Unique can be updated using a Divine Orb.",
      "The Malachai's Loop Unique Shield now has 240-300% increased Energy Shield (previously 210-250%), +1 to Maximum Power Charges (previously +2), and 20-40% chance to gain a Power Charge on Hit (previously 20%).",
      "Existing items can be updated to the new values with a Divine Orb."
    ] },

  { id: "light-radius-rares-up-uniques-down", league: "3.30", area: "build", kind: "changed", verdict: "skip", priority: 3,
    who: [], tags: ["unique:the-hallowed-monarch", "unique:rotmothers-mutiny"],
    headline: "Light Radius: bigger on rare gear, smaller on two uniques",
    before: "Some builds stack [[light-radius|Light Radius]], because a few items and passives turn it into other bonuses. The Hallowed Monarch helmet and Rotmother's Mutiny amulet were big sources.",
    now: "Light Radius on rare weapons, helmets and rings now reaches 30%, up from 15%. The Hallowed Monarch drops to 25-35%, from 50%. Rotmother's Mutiny drops to 20-40%, from 25-75%.",
    so: "Don't use a [[divine-orb|Divine Orb]] on an old Hallowed Monarch or Rotmother's Mutiny, since it would lower the roll. Use it on old rare gear instead.",
    soType: "fact",
    viz: { type: "bars", caption: "Light Radius on rare gear, top tier",
      rows: [ { label: "Before", value: 15, display: "15%" }, { label: "3.30", value: 30, display: "30%" } ] },
    sources: [
      "Light Radius Rare Item modifiers on Weapons, Helmets and Rings now scale up to 30% at the highest tier (previously 15%). Existing items can be improved with a Divine Orb.",
      "The Hallowed Monarch Unique Helmet now has 25-35% increased Light Radius (previously 50%). Existing versions of this Unique can be made worse with a Divine Orb.",
      "The Rotmother's Mutiny Unique Amulet now has 20-40% increased Light Radius (previously 25-75%). Existing versions of this Unique can be made worse with a Divine Orb."
    ] },

  { id: "doryani-ralakesh-steelworm-tweaks", league: "3.30", area: "build", kind: "changed", verdict: "skip", priority: 3,
    who: [], tags: ["unique:doryanis-invitation", "unique:ralakeshs-impatience", "unique:steelworm"],
    headline: "Three more unique tweaks: Doryani's, Ralakesh's and Steelworm",
    before: "Doryani's Invitation is a belt that came in four versions, one per damage type. Ralakesh's Impatience boots count you as having maximum [[charge|charges]]. Steelworm is a quiver built around Steel Shards.",
    now: "Doryani's now always drops [[corrupted|corrupted]], with four bonuses each picked at random from a set. Ralakesh's now also has -1 to maximum Power, Endurance or Frenzy Charges. Steelworm gains 20-30% increased [[impale|Impale]] effect.",
    so: "Keep an old Ralakesh's Impatience, since old copies don't get the drawback. The notes don't say whether old copies of the other two change.",
    soType: "fact", viz: null,
    sources: [
      "The Doryani's Invitation Unique Belt now always dropped Corrupted with an Implicit. It now has 4 Modifier, each randomly picked from a set:",
      "The Ralakesh's Impatience Unique Boots now has either -1 to maximum Power, Endurance or Frenzy charges. Existing versions of this item are unaffected by this change.",
      "The Steelworm Unique Quiver now has 20-30% increased Impale Effect."
    ] },

  /* Items, currency and crafting */

  { id: "orb-of-chance-rework", league: "3.30", area: "economy", kind: "changed", verdict: "do", priority: 1,
    who: ["all"], tags: [],
    headline: "Orbs of Chance are rare now, and much better at making uniques",
    before: "An [[orb-of-chance|Orb of Chance]] turns a plain white item into a random rarity, with a small chance of a [[unique-item|unique]]. They were common, vendors sold them, and many prices were paid in them.",
    now: "The chance of a unique is much higher, and the orbs are much rarer. Vendors no longer sell them, and the [[currency-exchange|Currency Exchange]] charges a bigger [[gold|Gold]] fee. The bench option that rerolls an item's rarity got the same boost.",
    so: "Save each one for a base whose unique you actually want. Don't waste them on random items.",
    soType: "fact", viz: null,
    sources: [
      "Significantly increased the chances to get a Unique Item from an Orb of Chance, or the crafting bench option to reroll the rarity of a non-Unique item.",
      "Orbs of Chance are now much rarer, due to becoming much more effective at resulting in Unique items, and are no longer offered by Vendors.",
      "Orbs of Chance now have a higher Gold fee on the Currency Exchange.",
      "Orbs of Chance no longer drop at higher stack sizes in higher level areas."
    ] },

  { id: "orb-of-chance-prices-replaced", league: "3.30", area: "economy", kind: "changed", verdict: "know", priority: 3,
    who: ["trade", "leveling"], tags: [],
    headline: "Prices paid in Orbs of Chance now use other orbs",
    before: "Many costs were paid in [[orb-of-chance|Orbs of Chance]]: some bench crafts, some vendor gems and amulets, and [[kirac|Kirac's]] maps.",
    now: "Those bench crafts cost the same number of [[orb-of-alteration|Orbs of Alteration]]. Vendor [[skill-gem|gems]] needing level 28 to 33 cost an Alteration, and 34 to 37 an [[orb-of-alchemy|Orb of Alchemy]]. Kirac's rare maps cost an extra Alchemy, where they took 3 Orbs of Chance.",
    so: "Keep a few Alterations and Alchemies on hand while levelling. Vendors want them for gems now.",
    soType: "fact", viz: null,
    sources: [
      "Crafting Bench Options that cost Orbs of Chance now cost an equivalent amount of Orbs of Alteration.",
      "Skill Gems with a starting level requirement between level 28 and level 33 now sell for an Orb of Alteration (previously an Orb of Chance).",
      "Skill Gems with a starting level requirement between level 34 and level 37 now sell for an Orb of Alchemy (previously an Orb of Chance).",
      "Rare Maps sold by Kirac now cost an additional Orb of Alchemy (previously 3 Orbs of Chance).",
      "Magic Amulets from vendors now cost 2 Orbs of Alteration (previously an Orb of Chance).",
      "Orbs of Scouring now cost 4 Orbs of Fusing (previously 4 Orbs of Chance)"
    ] },

  { id: "same-name-rares-sell-for-chaos", league: "3.30", area: "economy", kind: "changed", verdict: "do", priority: 2,
    who: ["all"], tags: [],
    headline: "Two rares with the same name now sell for a Chaos Orb",
    before: "A [[vendor-recipe|vendor recipe]] gives a set reward for selling certain items together. Two [[rarity|rare]] items with the same name gave an [[orb-of-chance|Orb of Chance]] or [[orb-of-alchemy|Orb of Alchemy]], and three gave an Alchemy or a [[regal-orb|Regal Orb]].",
    now: "Two now give a [[chaos-orb|Chaos Orb]] and three an [[exalted-orb|Exalted Orb]], whatever their [[quality|quality]]. A full rare set with an item below level 60 gives Orbs of Alchemy. One item of each rarity on the same base gives 1 Orb of Chance, down from 5.",
    so: "Check rare names before you sell. Sell a matching pair together and you get a Chaos Orb.",
    soType: "fact", viz: null,
    sources: [
      "Vendoring 2 Rare items with the same name now grants a Chaos Orb (previously an Orb of Chance or Orb of Alchemy)",
      "vendoring 3 Rare items with the same name now grants an Exalted Orb (previously an Orb of Alchemy or Regal Orb)",
      "These vendor recipes no longer take into account the Quality of the input items.",
      "Vendoring a full set of Rare items, with at least one of the items being below level 60 now returns Orbs of Alchemy instead of Orbs of Chance.",
      "Vendoring a Normal, Magic, Rare and Unique item of the same base type now awards 1 Orb of Chance (previously 5)."
    ] },

  { id: "orb-of-binding-removed", league: "3.30", area: "economy", kind: "removed", verdict: "know", priority: 2,
    who: ["crafting", "trade"], tags: [],
    headline: "Orbs of Binding are gone. Orbs of Alchemy drop more.",
    before: "An [[orb-of-binding|Orb of Binding]] turned a plain white item into a [[rarity|rare]] one, with some [[socket|sockets]] linked. Players often used it while levelling.",
    now: "They no longer drop, though old ones still work. [[orb-of-alchemy|Orbs of Alchemy]] drop more often to make up for it. [[sacred-orb|Sacred Orbs]] are more common too, and a [[bestiary|Bestiary]] recipe that made Bindings now makes [[orb-of-regret|Orbs of Regret]].",
    so: "Use up any old Bindings you have. For a new linked rare, use an Alchemy, then link the sockets at the [[crafting-bench|Crafting Bench]].",
    soType: "fact", viz: null,
    sources: [
      "Orbs of Binding can no longer be obtained, though existing ones will still function.",
      "Orbs of Alchemy are now relatively more common as a result of Orbs of Binding being removed.",
      "The Bestiary Recipe to create a stack of 2 Orbs of Binding instead now creates a stack of 2 Orbs of Regret.",
      "Sacred Orbs have been made more common."
    ] },

  { id: "strongbox-items-any-rarity", league: "3.30", area: "economy", kind: "buff", verdict: "know", priority: 3,
    who: ["maps"], tags: [],
    headline: "Strongboxes hold better items and tougher guards",
    before: "A [[strongbox|Strongbox]] is a locked chest in a map that spawns guards when you open it. Its bonus lines that added extra items only added plain white ones.",
    now: "Those extra items can now be any rarity, and item quality rolls 5-20%, up from 1-20%. Guard packs can now be magic or rare. The lines for identified and mirrored items are gone.",
    so: "Open the strongboxes you find in maps. They pay a bit more now, and fight back a bit harder.",
    soType: "fact", viz: null,
    sources: [
      "Strongbox Modifiers to contain additional items can now generate items at any Rarity (previously would only generate Normal items).",
      "The Contained Items have Quality Strongbox Modifier now has values of +5-20% (previously +1-20%).",
      "Monster Packs spawned by Strongboxes now inherently have a chance to be Magic or Rare.",
      "Strongboxes can no longer roll Contains Identified Items or Contains Mirrored Items.",
      "The Chest level Strongbox Modifier now has values of +1-2 (previously +1)."
    ] },

  /* Divination cards */

  { id: "div-cards-no-league-rewards", league: "3.30", area: "economy", kind: "changed", verdict: "know", priority: 3,
    who: ["trade"], tags: [],
    headline: "Divination cards: no league-item rewards, and eleven are paused",
    before: "A full set of a [[divination-card|Divination Card]] trades in for the reward printed on it. Some cards could pay out items from the current league.",
    now: "Cards can no longer reward current league items. Eleven cards, such as The Card Sharp, The Deal and Her Mask, are turned off for now. Monsters with high [[item-rarity|Item Rarity]] drop rarer cards, and very high rarity stops some common ones.",
    so: "Before you farm a card, check that it isn't one of the eleven paused ones.",
    soType: "fact", viz: null,
    sources: [
      "Divination Cards can no longer reward current league-specific items in their potential pool of rewards.",
      "The following Divination Cards have been temporarily disabled: Buried Treasure, Cameria's Cut, Man With Bear, More is Never Enough, The Card Sharp, The Deal, The Rabbit's Foot, and The Silly Boy.",
      "The following Divination Cards has been temporarily disabled: Her Mask, Last Hope, and Sambodhi's Vow.",
      "Monsters with high Item Rarity will now have a higher chance to drop rarer Divination Cards.",
      "Certain common Divination Cards will be restricted from dropping from monsters with very high Item Rarity."
    ] },

  /* Quality of life and bug fixes */

  { id: "small-fixes-buffs-carry-over", league: "3.30", area: "qol", kind: "changed", verdict: "know", priority: 3,
    who: ["all"], tags: [],
    headline: "Small fixes: buffs carry between areas, clearer ranges",
    before: "Buffs from [[blood-shrine|Blood Shrines]] and [[beyond|Beyond]] bosses ended when you left the area. Tooltips said \"nearby\" without saying how near. One Beyond buff, Ghorr's, even made you take more damage by mistake.",
    now: "Those buffs now carry over to the next area, and the Ghorr's bug is fixed. Most tooltips now give exact ranges in metres. You now hold Alt to pin a [[keyword|keyword]] in the area modifier list.",
    so: "Nothing to do. Also, the lightning rods in the [[temple-of-atzoatl|Temple]] are no longer so loud.",
    soType: "fact", viz: null,
    sources: [
      "Blood Shrine buffs will now be retained when transitioning between combat areas.",
      "K'Tash's Magnificence, Ghorr's Magnificence, and Beidat's Magnificence now are retained when transitioning from one area to another.",
      "Fixed a bug where the Ghorr's Magnificence Demonic Power caused the player to take more Damage instead of less.",
      "Almost all effects that were described as \"nearby\" now instead describe the exact range of the effect in metres.",
      "You now need to hold Alt on keywords in the Area Modifier list to be able to pin the keyword information.",
      "Fixed an issue where the Lighting Rods in the Temple of Atzoatl were very loud."
    ] }

]);
