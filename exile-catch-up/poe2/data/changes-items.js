/* Exile Catch-Up, PoE2: 0.5 cards for currency, drops, item bases, modifiers, runes, Idols, Soul Cores, trade and uniques.
   From poe2/sources/0.5.0-patch-notes.txt: "Unique Item Changes", "Item Changes", the new uniques and items in
   "New Content and Features", and the item, loot and trade lines of the 0.5.5 and "Later patch" sections. Runeforging,
   Verisium, Alloys and Remnant crafting are in changes-league.js. Schema: spec 5.3. Every sources string is an exact
   quote from one line of the notes. "Now" is the game after the last 0.5.x patch. */
EXILE.addChanges([

  /* Currency and crafting rules */

  { id: "basic-orbs-rarer-divines-commoner", league: "0.5", area: "crafting", kind: "changed", verdict: "do", priority: 1,
    who: ["all"], tags: [],
    headline: "Basic orbs got much rarer, and Divine Orbs more common",
    before: "[[orb-of-transmutation|Orbs of Transmutation]] turn a plain item magic, and [[orb-of-augmentation|Orbs of Augmentation]] add a second bonus to it. [[greater-perfect-orbs|Greater and Perfect]] versions add a stronger bonus. [[divine-orb|Divine Orbs]] reroll the numbers on an item and are a top trade currency.",
    now: "Transmutation and Augmentation orbs are now much rarer, and Greater and Perfect orbs a bit rarer. Greater Transmutation and Augmentation now drop from Act 4 and add bonuses from level 44, down from 55, so they work on lower-level items. Divine Orbs are more common.",
    so: "Save Transmutation and Augmentation orbs for bases worth crafting, and pick up good magic items instead of making your own. Divine Orbs will likely trade for a bit less than before.",
    soType: "prediction",
    viz: { type: "bars", caption: "Greater Transmutation and Augmentation: lowest level of the bonus they add",
      rows: [ { label: "Before", value: 55, display: "55" }, { label: "Now", value: 44, display: "44" } ] },
    sources: [
      "Greater and Perfect currencies have been made somewhat rarer, with Transmutation and Augmentation being made significantly rarer.",
      "Greater Orbs of Transmutation and Greater Orbs of Augmentation now have a minimum Modifier Level of 44 (previously 55), making them more accessible. They can now begin dropping in Act 4.",
      "Divine Orbs are now more common."
    ] },

  { id: "one-crafted-one-desecrated-modifier", league: "0.5", area: "crafting", kind: "changed", verdict: "know", priority: 2,
    who: ["crafting"], tags: [],
    headline: "Items hold one crafted and one Desecrated modifier",
    before: "A [[crafted-modifier|crafted modifier]] is a bonus you add on purpose, not by chance. [[desecrated-modifier|Desecrated modifiers]], the hidden Abyss bonuses you reveal at the Well of Souls, counted as crafted ones.",
    now: "An item can hold only one crafted modifier at a time, such as one from an [[alloy|Alloy]]. Desecrated modifiers no longer count as crafted, and an item can also hold one of those.",
    so: "Plan each item around one crafted bonus plus one Desecrated bonus at most.",
    soType: "fact", viz: null,
    sources: [
      "All crafted modifiers are now guaranteed, but items can only have 1 crafted modifier at a time. Desecrated modifiers no longer count as crafted modifiers, but items are limited to 1 Desecrated modifier."
    ] },

  { id: "corruption-and-sanctify-now-multiply", league: "0.5", area: "crafting", kind: "changed", verdict: "know", priority: 2,
    who: ["crafting", "trade"], tags: [],
    headline: "Corrupting and Sanctifying now scale your current rolls",
    before: "A [[vaal-orb|Vaal Orb]] [[corrupted|corrupts]] an item for a random result, and one outcome pushes its numbers past their normal range. [[sanctified|Sanctifying]] rerolled every number once, for good. An [[omen|Omen]] of Corruption made your next Vaal Orb always change something.",
    now: "That corruption outcome and Sanctifying now multiply each number based on its current value, instead of rolling a new one. Omens of Corruption can no longer be found, and they trade on the [[currency-exchange|Currency Exchange]] only in [[standard|Standard]].",
    so: "Results now scale from the rolls you start with, so roll your numbers well before you corrupt or Sanctify.",
    soType: "fact", viz: null,
    sources: [
      "The Corruption outcome that randomises the numeric values of the modifiers on an item beyond the normal range now multiplies each modifier based on the current value, instead of randomising the value.",
      "Sanctifying an item now multiplies each modifier value based on the current value, instead of randomising values.",
      "Omen of Corruption can no longer be obtained.",
      "The following items only appear on the Currency Exchange in Standard Leagues: Omen of Corruption, Omen of Homogenising Coronation, and Omen of Homogenising Exaltation."
    ] },

  // poe2db: the four orb names and "only for specific item types" (the card says so).
  { id: "orbs-of-sacrifice-upgrade-enchantments", league: "0.5", area: "crafting", kind: "new", verdict: "know", priority: 2,
    who: ["crafting", "trade"], tags: [],
    headline: "New Orbs of Sacrifice upgrade a corrupted item's enchantment",
    before: "[[corrupted|Corrupting]] an item can add a Corrupted [[enchantment|Enchantment]], a bonus line kept apart from its normal bonuses. Once corrupted, an item can hardly be changed.",
    now: "Since 0.5.4, [[atziri|Atziri's]] vault can drop one of four [[orb-of-sacrifice|Orbs of Sacrifice]]. Each upgrades the Corrupted Enchantment but removes a random other bonus. poe2db names them Kamasa's, Kopec's, Yaomac's and Yugul's, each for certain item types.",
    so: "Use one only on a corrupted item that can afford to lose any of its bonuses. They trade on the [[currency-exchange|Currency Exchange]] and will likely be pricey, since only Atziri drops them.",
    soType: "prediction", viz: null,
    sources: [
      "After killing Atziri, the Red Queen, her Vault now has a chance to drop 1 of 4 new Orb of Sacrifice currency items. These currencies upgrade Corrupted Enchantments on items, at the cost of randomly removing an Explicit Modifier.",
      "The Orb of Sacrifice currency items have been added to the Currency Exchange."
    ] },

  { id: "jewellers-orbs-on-item-skills", league: "0.5", area: "crafting", kind: "changed", verdict: "know", priority: 3,
    who: ["crafting"], tags: [],
    headline: "Jeweller's Orbs now add sockets to skills that items grant",
    before: "A [[jewellers-orb|Jeweller's Orb]] adds a support socket to a [[skill-gem|skill gem]]. Skills that come from an item, like a unique's built-in skill, could not get extra sockets this way.",
    now: "Lesser, Greater and Perfect Jeweller's Orbs now work on items with skills, adding sockets to every skill the item grants. Since a 0.5.0 hotfix you can also apply them from the Skill Gems panel.",
    so: "If a unique gives you a skill you use, socket more supports into it with Jeweller's Orbs.",
    soType: "fact", viz: null,
    sources: [
      "Lesser, Greater and Perfect Jeweller's Orbs can now be used on items with skills on them to increase the number of sockets on the item's granted skills.",
      "Jewellers Orbs can now be applied to skills granted by items (such as Unique Items) via the Skill Gems panel interface, in addition to being applicable to the source item itself."
    ] },

  { id: "catalysts-genesis-tree-and-necrotic", league: "0.5", area: "crafting", kind: "changed", verdict: "know", priority: 3,
    who: ["crafting"], tags: [],
    headline: "Catalysts come only from the Genesis Tree, with new kinds",
    before: "A [[catalyst|Catalyst]] adds a special [[quality|quality]] to a ring or amulet that boosts one kind of bonus on it. Monsters dropped them.",
    now: "Catalysts no longer drop from monsters. You grow them on the [[genesis-tree|Genesis Tree]], the [[breach|Breach]] crafting tree. 0.5 added 12 Catalysts for [[jewel|jewels]], and 0.5.2 a Necrotic Catalyst that boosts minion bonuses on rings and amulets.",
    so: "Run Breach if you want Catalysts. Salvaging an item with Catalyst quality now gives back some of the Catalysts used.",
    soType: "fact", viz: null,
    sources: [
      "Catalysts can no longer drop from Monsters, these are now solely obtained from the Genesis Tree.",
      "Added a new set of 12 Catalysts that can add new quality modifiers to Jewels.",
      "Added a new Necrotic Catalyst which adds quality that enhances Minion Modifiers on a Ring or Amulet. There is also a Refined Necrotic Catalyst, both of which are available through the Genesis Tree.",
      "Alternate Quality items (from Breach Catalysts) may now be salvaged to return a portion of the Catalysts used."
    ] },

  { id: "abyss-bosses-drop-desecrated-currency", league: "0.5", area: "crafting", kind: "buff", verdict: "know", priority: 3,
    who: ["crafting", "maps"], tags: [],
    headline: "Abyss bosses now always drop Desecrated currency",
    before: "[[desecrated-currency|Desecrated currency]] is Abyss bones, like Ancient Jawbones and Ribs, found by closing Abysses. You use them to add a hidden [[desecrated-modifier|Desecrated]] bonus to gear.",
    now: "Since 0.5.3, Tasgul and Vandroth, two Abyss bosses, always drop it, and so does the last large chest in the [[abyss|Abyssal Depths]]. Beating [[kulemak|Kulemak]] can drop Ancient Jawbones, Ribs and Collarbones. Bonuses to chests found now also count in Abysses.",
    so: "Want Desecrated crafts? Clear Abyssal Depths to the end and fight Abyss bosses. Abyssal [[strongbox|Strongboxes]] also drop Abyss currency, after a 0.5.5 fix.",
    soType: "fact", viz: null,
    sources: [
      "Conquering the Vessel of Kulemak now has a chance to drop Ancient Jawbones, Ancient Ribs and Ancient Collarbones.",
      "Tasgul, Swallower of Light will now always drop Desecrated Currency.",
      "Vandroth, Blackblooded Enslaver will now always drop Desecrated Currency.",
      "The final Large Abyssal Trove in Abyssal Depths will now always contain Desecrated Currency.",
      "Modifiers to the number of chests found now apply to Chests found in Abyss.",
      "Fixed a bug where Abyssal Strongboxes were not dropping Abyssal Currency."
    ] },

  /* Drops in the campaign */

  { id: "campaign-drops-better-bases-essences", league: "0.5", area: "crafting", kind: "buff", verdict: "know", priority: 2,
    who: ["leveling"], tags: [],
    headline: "Campaign drops: better weapon bases and more useful Essences",
    before: "Weapons and [[flask|flasks]] in the [[campaign|campaign]] often dropped as older [[base-type|base types]] than the best one for your level. Many campaign [[essence|Essences]] were Essences of the Infinite, which only add an attribute.",
    now: "[[martial-weapon|Martial weapons]] and flasks in the campaign are more likely to be the best base type for that level. You find more Essences overall, and far fewer of them are Essences of the Infinite.",
    so: "Check weapon drops while you level, since upgrades show up more often. Use spare Essences to turn good magic items rare.",
    soType: "fact", viz: null,
    sources: [
      "Martial Weapons and Flasks found in the campaign are now more likely to be of the highest base type available at that level.",
      "The overall number of Essences found in the campaign has been increased, though the proportion of these being Essences of the Infinite has been significantly decreased."
    ] },

  // "know", not "do": poe2db lists the Act 3 idols as quest items you exchange with Oswald, so there is no other buyer to avoid.
  { id: "oswald-pays-more-for-priceless-idols", league: "0.5", area: "crafting", kind: "buff", verdict: "know", priority: 3,
    who: ["leveling"], tags: [],
    headline: "Sell Act 3's Priceless Idols to Oswald for up to 6,000 Gold",
    before: "In Act 3 you find three [[priceless-idol|Priceless Idols]]. Oswald, the treasure hunter at the Ziggurat Encampment, buys them, but he paid only 500, 1,000 and 1,500 [[gold|Gold]].",
    now: "Oswald no longer undercuts you. He now offers 3,000, 4,000 and 6,000 Gold for them.",
    so: "Pick up all three Priceless Idols and sell them to Oswald while you level. Spend the Gold at vendors or on passive refunds.",
    soType: "fact", viz: null,
    sources: [
      "Oswald no longer undercuts you for the Priceless Idols found in Act 3, now offering you 3,000, 4,000, and 6,000 Gold for each (previously 500, 1,000, and 1,500)."
    ] },

  /* Item bases and modifiers */

  { id: "gear-gives-more-armour-and-evasion", league: "0.5", area: "build", kind: "buff", verdict: "know", priority: 2,
    who: ["all"], tags: [],
    headline: "Gear gives about a third more Armour and Evasion at level 65",
    before: "[[armour|Armour]], [[evasion|Evasion]] and [[energy-shield|Energy Shield]] come mostly from your gear, from its base type and its bonuses.",
    now: "Items give about 33% more Armour and Evasion at level 65, tapering to 15% more at level 80 and up. Energy Shield is about 8% higher at 65 and unchanged from 80. The Vile Robe base gives 171 Energy Shield, down from 184.",
    so: "Armour and Evasion builds are tougher in the early endgame. Old items update their base Armour on their own, and a [[divine-orb|Divine Orb]] updates their Armour bonuses.",
    soType: "fact", viz: null,
    sources: [
      "The amount of Armour granted by items and modifiers has been increased as you get to higher levels. At level 65, you should have approximately 33% more Armour, tapering down to 15% at level 80+.",
      "The amount of Evasion granted by items and modifiers has been increased as you get to higher levels. At level 65, you should have approximately 33% more evasion, tapering down to 15% at level 80+.",
      "The amount of Energy Shield granted by items is now roughly 8% more at level 65, and unchanged at level 80+.",
      "The Vile Robe Armour Base Type now has 171 Base Energy Shield (previously 184).",
      "The Base Armour of existing items will be automatically adjusted, while Armour Modifiers on existing items can be updated with a Divine Orb."
    ] },

  { id: "attack-weapon-skill-level-mods-cut", league: "0.5", area: "crafting", kind: "nerf", verdict: "know", priority: 2,
    who: ["crafting", "trade"], tags: [],
    headline: "Plus-to-level bonuses on attack weapons and quivers are lower",
    before: "Attack weapons and quivers can roll a bonus that raises the level of all your melee or projectile skills. The Perfect [[essence|Essence]] of Battle adds a similar bonus.",
    now: "The best two-handed roll is now +5, down from +7, and one-handed +4, down from +5. Quivers give +1, down from +2. Perfect Essence of Battle gives +3 on two-handers and +2 on one-handers.",
    so: "Attack builds now get one or two fewer skill levels from a top weapon. Weigh other damage bonuses higher when you buy or craft.",
    soType: "fact",
    viz: { type: "bars", caption: "Two-handed weapon, best roll of melee skill levels",
      rows: [ { label: "Before", value: 7, display: "+7" }, { label: "Now", value: 5, display: "+5" } ] },
    sources: [
      "The plus to Level of all Melee Skills modifiers on Two Handed Attack Weapons now has a value of +5 at Tier 1 (previously +7), the lower tiers have also been adjusted.",
      "The plus to Level of all Projectile Skills modifiers on Two Handed Attack Weapons now has a value of +5 at Tier 1 (previously +7), the lower tiers have also been adjusted.",
      "The plus to Level of all Melee Skills modifiers on One-handed Attack Weapons now has a value of +4 at Tier 1 (previously +5), the lower tiers have also been adjusted.",
      "The +2 to level of Projectile Skills modifier on Quivers now has a value of +1.",
      "The Perfect Essence of Battle now provides +3 to Level of all Attack Skills on Two Hand Melee Weapons or Crossbows (previously +5), and +2 to Level of all Attack Skills on One Handed Melee Weapons or Bows (previously +3)."
    ] },

  { id: "energy-shield-recharge-cut-on-gear", league: "0.5", area: "crafting", kind: "nerf", verdict: "know", priority: 3,
    who: ["crafting"], tags: ["unique:apeps-supremacy", "unique:sierran-inheritance"],
    headline: "Energy Shield recharge bonuses on gear were cut and moved",
    before: "[[energy-shield|Energy Shield]] recharges after a short time without damage. Gear could roll big bonuses to recharge faster, or to start recharging sooner, on Foci, Intelligence body armours and jewels.",
    now: "Faster-start bonuses no longer roll on Foci, Intelligence body armours or jewels, and those armours roll recharge rate instead. Top recharge-rate suffixes fell by half or more, and so did Essence of Hysteria on Foci. Apep's Supremacy and Sierran Inheritance lost their faster-start lines.",
    so: "Energy Shield builds recover more slowly. Don't use a [[divine-orb|Divine Orb]] on old \"of Suffusion\" gear, since it can only lower the roll.",
    soType: "fact",
    viz: { type: "bars", caption: "\"of Suffusion\" suffix, best recharge rate roll",
      rows: [ { label: "Before", value: 50, display: "50%" }, { label: "Now", value: 23, display: "23%" } ] },
    sources: [
      "Suffix modifiers granting faster start of Energy Shield Recharge can no longer roll on Foci, Intelligence Body Armours, or Jewels.",
      "Increased Energy Shield Recharge Rate Suffix modifiers can now roll on Intelligence Body Armours.",
      "The \"of Suffusion\" Suffix modifier now grants 20-23% increased Energy Shield Recharge Rate (previously 46-50%). You can divine existing items to make them worse.",
      "Essence of Hysteria now grants 20-23% increased Energy Shield Recharge Rate when applied to Foci (previously 41-45%).",
      "The Apep's Supremacy Unique Focus no longer has 30-50% faster start of Energy Shield Recharge.",
      "The Sierran Inheritance Unique Body Armour now grants 15-30% increased Energy Shield Recharge Rate instead of 30-50% faster start of Energy Shield Recharge."
    ] },

  { id: "small-jewel-and-jewellery-modifier-tweaks", league: "0.5", area: "crafting", kind: "changed", verdict: "skip", priority: 3,
    who: ["crafting"], tags: [],
    headline: "Small modifier tweaks on jewels, rings, amulets and Augments",
    before: "[[jewel|Jewels]], rings, amulets and weapons each roll from their own list of [[modifier|modifiers]]. Patches often nudge a few of them.",
    now: "Ruby jewels can roll +1-2 maximum [[rage|Rage]], and Sapphires 7-13% chaos damage. [[banner|Banner]] area on jewels is 6-16%, cast speed on rings and amulets rolls at slightly higher levels, and Desecrated instant leech is gone. Nine [[augment|Augments]] no longer fit corrupted or sanctified items.",
    so: "A [[divine-orb|Divine Orb]] may update old Ruby, Sapphire and banner jewels. Most players can skip this.",
    soType: "fact", viz: null,
    sources: [
      "Maximum Rage on Ruby Jewels can now roll between +1-2 to Maximum Rage (previously +1).",
      "Increased Chaos Damage on Sapphire Jewels can now roll between 7-13% (previously 6-12%).",
      "Increased Banner Area of Effect Modifiers on Jewels now have values of 6-16% (previously 10-20%).",
      "Cast Speed Modifiers on Rings and Amulets are no longer shared with Foci and Wands. For Rings and Amulets these Modifiers now roll at slightly higher levels.",
      "Desecrated Modifiers granting Instant Leech can no longer roll, existing Items will not be affected by this change.",
      "The following Augments can no longer be socketed into Augment Sockets on Corrupted or Sanctified items"
    ] },

  /* Runes, Idols and Soul Cores */

  { id: "basic-runes-stronger", league: "0.5", area: "crafting", kind: "buff", verdict: "know", priority: 2,
    who: ["leveling", "crafting"], tags: [],
    headline: "Basic runes give more life, mana and resistances",
    before: "A [[rune|rune]] goes in a gear [[socket|socket]] and gives a bonus based on the gear type. Basic runes, like Body, Mind and Desert runes, come in three sizes: Lesser, normal and Greater.",
    now: "Most basic runes got stronger. A Body rune in armour now gives up to +60 life, up from +40, and elemental resistance runes up to +18%, up from +14%. Attribute runes give up to +12, up from +10.",
    so: "Fill empty sockets with runes while you level. Basic runes now add more life and resistance than before.",
    soType: "fact",
    viz: { type: "bars", caption: "Body rune in armour, best size, maximum life",
      rows: [ { label: "Before", value: 40, display: "+40" }, { label: "Now", value: 60, display: "+60" } ] },
    sources: [
      "Body Runes now grant +30/45/60 Maximum Life when socketed in Armour items (previously +20/30/40)",
      "Mind Runes now grant +20/30/40 Maximum Mana when socketed in Armour items (previously +15/25/35)",
      "Desert Runes now grant +10/14/18% to Fire Resistance when socketed in Armour items (previously +10/12/14%).",
      "Glacial Runes now grant +10/14/18% to Cold Resistance when socketed in Armour items (previously +10/12/14%).",
      "Storm Runes now grant +10/14/18% to Lightning Resistance when socketed in Armour items (previously +10/12/14%)",
      "Robust Runes now grant +6/9/12 to Strength when socketed in Equipment (previously +6/8/10)."
    ] },

  { id: "some-special-runes-weaker", league: "0.5", area: "crafting", kind: "nerf", verdict: "skip", priority: 3,
    who: ["crafting"], tags: [],
    headline: "Some special runes got weaker",
    before: "Besides basic [[rune|runes]], there are named runes, like Lady Hestra's Rune of Winter, that add flat damage. Rebirth runes and Craiceann's Rune of Recovery helped [[energy-shield|Energy Shield]] recharge faster.",
    now: "Lady Hestra's, Thane Leld's and Thane Myrk's runes now add their damage only against chilled, shocked or ignited enemies. Rebirth runes in wands and [[staff|staves]] give less recharge rate, and Craiceann's Rune of Recovery 30%, down from 50%. Both recharge changes hit runes already socketed.",
    so: "If you use one of the three damage runes, pair it with a skill that chills, shocks or ignites. Otherwise you can skip this.",
    soType: "fact", viz: null,
    sources: [
      "Lady Hestra's Rune of Winter no longer grants Adds 19 to 28 Cold Damage, it instead grants Adds 19 to 28 Cold Damage against Chilled or Frozen Enemies.",
      "Thane Leld's Rune of Spring no longer grants Adds 1 to 60 Lightning Damage, it instead grants Adds 1 to 60 Lightning Damage against Shocked Enemies.",
      "Thane Myrk's Rune of Summer no longer grants Adds 23 to 34 Fire Damage, it instead grants Adds 23 to 34 Fire Damage against Ignited Enemies.",
      "Rebirth Runes now grant 6% increased Energy Shield Recharge Rate when socketed in a Wand or Staff (previously 15%). This change applies to existing items.",
      "Craiceann's Rune of Recovery now grants 30% increased Energy Shield Recharge Rate when socketed in a Body Armour (previously 50%). Existing items are affected by this change."
    ] },

  { id: "idols-fit-sceptres", league: "0.5", area: "crafting", kind: "buff", verdict: "know", priority: 2,
    who: ["crafting", "trade"], tags: [],
    headline: "Every Idol now fits in a Sceptre, and many got stronger",
    before: "[[idol|Idols]] are small figures you set in gear [[socket|sockets]] for a bonus that depends on the gear type. They were called Talismans before 0.4. Not all of them could go in a [[sceptre|Sceptre]].",
    now: "All Idols now fit in Sceptres, and many gained a Sceptre bonus, often for allies in your [[presence|Presence]] or your [[companion|Companion]]. Many bonuses rose, such as the Rabbit Idol's [[item-rarity|item rarity]] in body armour. Fox, Rabbit and Stag Idols are now limited to one each.",
    so: "If you use a [[sceptre|Sceptre]], look at Idols again, since many now have a Sceptre bonus.",
    soType: "fact",
    viz: { type: "bars", caption: "Rabbit Idol in body armour, item rarity",
      rows: [ { label: "Before", value: 5, display: "5%" }, { label: "Now", value: 12, display: "12%" } ] },
    sources: [
      "All Idols can now also be socketed into Sceptres.",
      "Idol of Ralakesh now grants 40% increased Armour, Evasion and Energy Shield while your Companion is in your Presence when socketed into a Sceptre.",
      "Primate Idol now grants Minions have 15% increased maximum Life when socketed in a Helmet (previously 12%), and Allies in your Presence deal 40% increased Damage when socketed in a Sceptre (previously 30%).",
      "Rabbit Idol now has a limit of 1. It now grants 12% increased Rarity of Items found when socketed in Body Armours (previously 5%)",
      "Fox Idol now has a limit of 1.",
      "Stag Idol now has a limit of 1."
    ] },

  { id: "new-idols-from-possessed-monsters", league: "0.5", area: "crafting", kind: "new", verdict: "know", priority: 3,
    who: ["maps", "trade"], tags: [],
    headline: "Eight new Idols drop only from spirit-possessed monsters",
    before: "[[azmeri-spirit|Azmeri Spirits]] drift through maps and possess monsters, making them stronger and more rewarding. [[idol|Idols]] are small figures you set in gear sockets.",
    now: "0.5 added 8 new Idols. They come only from monsters possessed by Azmeri Spirits.",
    so: "Kill possessed monsters when you see them in maps. They are the only source of these Idols, so the Idols will likely sell well.",
    soType: "prediction", viz: null,
    sources: [
      "Added 8 new Idols that come exclusively from monsters possessed by Azmerian Spirits."
    ] },

  { id: "seventeen-new-soul-cores", league: "0.5", area: "crafting", kind: "new", verdict: "know", priority: 2,
    who: ["crafting", "trade"], tags: [],
    headline: "0.5.5 added 17 new Soul Cores",
    before: "A [[soul-core|Soul Core]] is an ancient Vaal stone you set in a gear [[socket|socket]] for a bonus based on the gear type. Each kind fits only certain gear, like weapons or helmets.",
    now: "0.5.5 added 13 Jiquani's Soul Cores and 4 Atziri's Soul Cores. Runs of the [[trial-of-chaos|Trial of Chaos]] now reward only currency and Soul Cores, with no corrupted items.",
    so: "Run the Trial of Chaos if you want Soul Cores. Check new ones on the [[trade-market|Trade Market]] before you sell them to a vendor.",
    soType: "fact", viz: null,
    sources: [
      "Added the following new Soul Cores:",
      "Jiquani's Soul Core of Abundance",
      "Atziri's Soul Core of Devotion",
      "The rewards for completing a Trial of Chaos run now consists of only Currency and Soul Cores. Corrupted items are no longer a reward outcome in the Trial of Chaos."
    ] },

  { id: "soul-cores-limit-one-but-stronger", league: "0.5", area: "crafting", kind: "changed", verdict: "know", priority: 3,
    who: ["crafting"], tags: [],
    headline: "Many Soul Cores now allow only one copy, but do more",
    before: "Each kind of [[soul-core|Soul Core]], like the Soul Core of Jiquani, gives one bonus in weapons and another in armour. You could socket several of the same kind.",
    now: "0.5.5 gave many a Limit of 1, so you can use one copy at a time. They got stronger: the Soul Core of Jiquani gives 5% increased maximum life in body armour, up from 3%. Atmohua's Soul Core of Retreat now boosts Energy Shield.",
    so: "Don't plan on doubling up one Soul Core. Spread different kinds across your gear.",
    soType: "fact",
    viz: { type: "bars", caption: "Soul Core of Jiquani in body armour, increased maximum life",
      rows: [ { label: "Before", value: 3, display: "3%" }, { label: "Now", value: 5, display: "5%" } ] },
    sources: [
      "The Soul Core of Jiquani now has a Limit of 1. It now grants Recover 5% of Maximum Life on Kill when socketed into a Martial Weapon (previously 2%), and 5% increased Maximum Life when socketed into Body Armour (previously 3%).",
      "The Soul Core of Ticaba now has a Limit of 1.",
      "The Soul Core of Tzamoto now has a Limit of 1.",
      "Atmohua's Soul Core of Retreat no longer grants 30% faster start of Energy Shield Recharge when socketed in a Body Armour or Focus.",
      "Atmohua's Soul Core of Retreat now grants 40% Increased Max Energy Shield from Focus when socketed into Body Armour, and 30% Increased Max Energy Shield from Body Armour when socketed into a Focus"
    ] },

  /* Trade */

  { id: "price-check-from-your-inventory", league: "0.5", area: "crafting", kind: "new", verdict: "do", priority: 2,
    who: ["trade"], tags: [],
    headline: "Shift-Alt click an item to price-check it on the Trade Market",
    before: "The [[trade-market|Trade Market]] lets you buy items other players list, even while they are offline. To check what your own item was worth, you set up the search filters yourself.",
    now: "Shift-Alt click an item, or hold Y or Triangle on controller, to fill in a market search for it. On rares you can switch each [[modifier|modifier]] on or off to see its effect on price. The [[gold|Gold]] fee for weapons is about 50% higher.",
    so: "Check prices this way before you sell a rare to a vendor. Keep extra Gold for weapon purchases.",
    soType: "fact", viz: null,
    sources: [
      "Added the ability to quickly search the trade market with an item you have.",
      "Shift-Alt Clicking on an item will populate the filters for searching the trade market so you can see the current prices.",
      "For Rare items, you can enable and disable each modifier to easily determine the effect each one has on an item's price.",
      "For controller users, you can use this feature by holding Y or Triangle on the item.",
      "The gold price of Weapons for asynchronous trade have been increased by approximately 50%"
    ] },

  { id: "currency-exchange-favourites-and-buttons", league: "0.5", area: "crafting", kind: "changed", verdict: "know", priority: 3,
    who: ["trade"], tags: [],
    headline: "The Currency Exchange got favourites and handier buttons",
    before: "The [[currency-exchange|Currency Exchange]] is an in-game market for swapping one currency for another. Your offer fills when another player's matches, even while you're away.",
    now: "With mouse and keyboard you can mark favourite trades, and the search box gets focus at once. A 0.5.5 button swaps between your stash and inventory. Controller players can swap the pair and see sale history.",
    so: "Mark the trades you repeat as favourites to save clicks. Holding Alt on a currency now shows how many you have, even in trade windows.",
    soType: "fact", viz: null,
    sources: [
      "You can now set Favourite trades on the Currency Exchange when using Mouse and Keyboard.",
      "When opening the \"I Want\" or \"I Have\" currency selectors in the Currency Exchange, the search box will now have immediate focus when using Mouse and Keyboard.",
      "Added a button to the Currency Exchange window that toggles between having your Stash or your Inventory panel open.",
      "Added a button to swap the currency pair while editing a trade.",
      "Added a button to open Sale History.",
      "Holding Alt on a Currency item or stackable Fragment will now show the count of that Currency or Fragment within the same inventory, including trade windows."
    ] },

  /* New uniques and unique rules */

  // poe2db: Mageblood rolls four Mage's Legacies (the card says so); the 42 is a count of the 0.5.0 "New Unique item" lines.
  { id: "new-uniques-including-mageblood", league: "0.5", area: "crafting", kind: "new", verdict: "know", priority: 2,
    who: ["maps", "trade"], tags: ["unique:mageblood", "unique:the-masters-reach"],
    headline: "42 new uniques, including a PoE2 Mageblood",
    before: "Unique items have a set name and set bonuses, unlike random rares. The 0.4 patch added over 10 new ones.",
    now: "0.5.0 added 42 new uniques, and 0.5.4 added The Master's Reach, gloves from a fully empowered [[kulemak|Kulemak]] fight. Mageblood joins PoE2 as a belt, but poe2db shows it is not PoE1's version: it rolls four random [[mages-legacy|Mage's Legacies]].",
    so: "Look up unfamiliar uniques before you sell them to a vendor. Mageblood will likely be one of the most expensive.",
    soType: "prediction", viz: null,
    sources: [
      "New Unique item: Mageblood",
      "New Unique item: Berek's Grip",
      "New Unique item: Voices",
      "Added a new Unique item: The Master's Reach. This has a chance to drop from the Vessel of Kulemak Pinnacle Boss Fight when he's fully empowered by the Liches."
    ] },

  { id: "unique-skills-scale-with-your-level", league: "0.5", area: "build", kind: "changed", verdict: "know", priority: 2,
    who: ["leveling"], tags: ["unique:lifesprig", "unique:sacred-flame", "unique:eventide-petals", "unique:choir-of-the-storm"],
    headline: "Uniques that grant a skill can be worn from a low level",
    before: "Some uniques give you a skill at a set level. Lifesprig, a wand, grants level 20 Mana Drain, and before 0.5.4 you could not equip it at level 1.",
    now: "Since 0.5.4 the skill grows with you, starting low and reaching the item's full level once you meet its requirements. Sacred Flame, Eventide Petals and Choir of the Storm now need level 55.",
    so: "Try skill-granting uniques early in the campaign. Lifesprig now gives level 1 Mana Drain to a level 1 character.",
    soType: "fact", viz: null,
    sources: [
      "Unique Items that grant Skills now use the lowest level of the Skill that you meet the requirements of when equipped, scaling up to the maximum described level on the item as you meet the Skill requirements.",
      "As an example, the Lifesprig Unique Wand that grants Level 20 Mana Drain is now able to be equipped at level 1, which will grant level 1 Mana Drain.",
      "The Sacred Flame Unique Sceptre now has a level requirement of 55.",
      "The Eventide Petals Unique Amulet now has a level requirement of 55.",
      "The Choir of the Storm Unique Amulet now has a level requirement of 55."
    ] },

  /* Weapon bases (matter only if you use the weapon) */

  { id: "weapon-bases-range-and-implicits", league: "0.5", area: "build", kind: "changed", verdict: "skip", priority: 3,
    who: [], tags: ["weapon:mace", "weapon:quarterstaff", "weapon:bow", "weapon:talisman"],
    headline: "Maces and Quarterstaves reach further, and some bows changed",
    before: "A weapon's [[base-type|base type]] sets its built-in stats, like attack speed and reach, called [[weapon-range|Weapon Range]]. A [[talisman|Talisman]] here is the Druid's shapeshifting weapon, not PoE1's amulet.",
    now: "One-handed maces now reach 1.3, two-handed maces 1.5 and [[quarterstaff|Quarterstaves]] 1.4. Obliterator and Artillery Bows attack a bit slower, Warden and Guardian Bows chain more, and some Talismans changed their built-in [[rage|Rage]] or [[shock|Shock]] bonus.",
    so: "Mace and Quarterstaff users hit from a bit further away. A [[divine-orb|Divine Orb]] updates old bows and Talismans to the new built-in values.",
    soType: "fact",
    viz: { type: "bars", caption: "Two-handed mace, base Weapon Range",
      rows: [ { label: "Before", value: 1.3, display: "1.3" }, { label: "Now", value: 1.5, display: "1.5" } ] },
    sources: [
      "Increased the base Weapon Range of some Martial Weapon basetypes. One-hand Maces now have a base Weapon Range of 1.3 (previously 1.1), 1.5 for Two-hand Maces (previously 1.3), and 1.4 for Quarterstaves (previously 1.3).",
      "The Obliterator Bow and Artillery Bow basetypes now have 1.1 Attacks per second (previously 1.15).",
      "The implicit modifier for Warden and Guardian Bows now provides 25-35% chance to Chain an additional time (previously 20-30%). Existing items can be updated with a Divine Orb.",
      "The implicit modifier for Rabid, Fury and Maji Talismans now provides +7-10 Maximum Rage (previously +8-12). Existing items can be updated with a Divine Orb.",
      "The implicit modifier for Voltfang and Thunder Talismans now provides 20-30% increased Magnitude of Shock you inflict (previously 15-25%). Existing items can be updated with a Divine Orb."
    ] },

  /* Unique item changes (matter only if you wear the item) */

  { id: "defence-uniques-buffed-ab-aeterno", league: "0.5", area: "build", kind: "buff", verdict: "skip", priority: 3,
    who: [], tags: ["unique:ab-aeterno", "unique:sine-aequo", "unique:keeper-of-the-arc"],
    headline: "Ab Aeterno, Sine Aequo and Keeper of the Arc gain defences",
    before: "All three are unique armour pieces. Ab Aeterno boots slowed you after each [[dodge-roll|dodge roll]], Sine Aequo gloves made immobilised enemies take more damage, and Keeper of the Arc is a helmet with 150-250% Armour and Energy Shield.",
    now: "Ab Aeterno now has 200-250% defences and ignores slows while you sprint, but each dodge roll slows you a little for 4 seconds. Sine Aequo has 150-200% defences and 30-50% increased damage against immobilised enemies. Keeper of the Arc has 240-340% Armour and Energy Shield.",
    so: "A [[divine-orb|Divine Orb]] gives old Ab Aeterno and Keeper of the Arc the new defence roll. An old Ab Aeterno keeps its old speed penalty, though.",
    soType: "fact",
    viz: { type: "bars", caption: "Keeper of the Arc, best Armour and Energy Shield roll",
      rows: [ { label: "Before", value: 250, display: "250%" }, { label: "Now", value: 340, display: "340%" } ] },
    sources: [
      "The Ab Aeterno Unique boots no longer grant 10% less Movement and Skill Speed per Dodge Roll in the past 20 seconds, and now have 200-250% increased Armour, Evasion and Energy Shield (previously 100-150%).",
      "It now has Your speed is unaffected by Slows while Sprinting, and Gain Overencumbrance for 4 seconds when you Dodge Roll.",
      "Existing versions of this Unique can be updated to the new Armour, Evasion and Energy Shield values using a Divine Orb, but will not receive any other changes.",
      "The Keeper of the Arc Unique Helmet now has 240-340% increased Armour and Energy Shield (previously 150-250%). Existing items can be updated to the new values using a Divine Orb.",
      "The Sine Aequo Unique Gloves now have 150-200% increased Armour, Evasion and Energy Shield (previously 100-150%). It no longer has Enemies Immobilised by you take 20% more Damage, and instead now has 30-50% increased Damage against Immobilised Enemies."
    ] },

  // poe2db: Gravebind has "Enemies in your Presence killed by anyone count as being killed by you instead" (unchanged in 0.5).
  { id: "brass-dome-hyrri-gravebind-nerfs", league: "0.5", area: "build", kind: "nerf", verdict: "skip", priority: 3,
    who: [], tags: ["unique:the-brass-dome", "unique:hyrris-ire", "unique:gravebind", "unique:deaths-harp"],
    headline: "Brass Dome, Hyrri's Ire, Gravebind and Death's Harp got weaker",
    before: "The Brass Dome is a body armour with 700-800% increased Armour. Hyrri's Ire is an Evasion body armour that adds cold damage. Gravebind gloves count kills near you as yours, and Death's Harp is a bow that fired 3 extra arrows.",
    now: "Brass Dome drops to 500-600% Armour, and Hyrri's Ire to 100-150% Evasion. Gravebind gives 15-20% [[item-rarity|item rarity]] but turns off all your other rarity, even on old copies. Death's Harp has a 250-330% [[surpassing-chance|Surpassing]] chance for an extra arrow.",
    so: "Don't use a [[divine-orb|Divine Orb]] on an old Brass Dome or Hyrri's Ire, since it can only lower them. Gravebind no longer suits rarity stacking.",
    soType: "fact",
    viz: { type: "bars", caption: "The Brass Dome, best Armour roll",
      rows: [ { label: "Before", value: 800, display: "800%" }, { label: "Now", value: 600, display: "600%" } ] },
    sources: [
      "The Brass Dome Unique Body Armour now has 500-600% increased Armour (previously 700-800%). Existing versions of this Unique can be made worse with a Divine Orb.",
      "The Hyrri's Ire Unique Body Armour now has 100-150% Increased Evasion Rating (previously 200-250%), and Gain 10-20% of Damage as Extra Cold Damage (previously 15-25%). Existing versions of this Unique can be made worse with a Divine Orb.",
      "The Gravebind Unique Gloves now have 15-20% Increased Rarity of Items Found, and Your other Modifiers to Rarity of Items found do not apply. This change will affect existing items.",
      "The Death's Harp Unique Bow no longer has Bow Attacks Fire 3 Additional Arrows, instead it now has +250-330% Surpassing Chance to Fire an Additional Arrow."
    ] },

  // poe2db version history: Atziri's Acuity had 30-50% increased Critical Hit chance from 0.1.1 until the 0.5 rework.
  { id: "atziris-acuity-and-reverie-reworked", league: "0.5", area: "build", kind: "changed", verdict: "skip", priority: 3,
    who: [], tags: ["unique:atziris-acuity", "unique:reverie"],
    headline: "Atziri's Acuity and Husk of Dreams were reworked",
    before: "Atziri's Acuity are Vaal gloves that had a critical hit chance bonus, among others. Husk of Dreams is a body armour that gave you more [[flask|flask]] charges and used fewer.",
    now: "New Atziri's Acuity give Armour, life, life [[leech|leech]], Blood Loss, the Vaal Pact keystone and a Herald skill. Husk of Dreams is renamed Reverie: you can't drink Life Flasks, but non-unique ones apply their effect all the time, at 40-60% less recovery.",
    so: "Old copies of both keep their old bonuses, so keep them if your build uses them. New drops play very differently.",
    soType: "fact", viz: null,
    sources: [
      "The Aztiri's Acuity Unique Gloves have been reworked.",
      "They now grant 150-200% increased Armour, +100-150 to maximum Life, Leech 10% of Physical Attack Damage as Life, and 10% of Physical damage dealt by your Hits causes Blood Loss and Vaal Pact. They also grant the Herald of the Royal Queen Skill.",
      "Vaal Cultivation Orb outcomes on Atziri's Acuity have also changed. Existing items are not affected by this change.",
      "The Husk of Dreams Unique Body Armour has been renamed to Reverie. It no longer has 20-30% increased Flask Charges gained, or 50% less Flask Charges used.",
      "It now grants the Rite of Restoration Skill, and has Non-Unique Life Flasks apply their effects constantly.",
      "Existing versions of this item cannot obtain these new modifiers."
    ] },

  { id: "sekhemas-resolve-now-three-rings", league: "0.5", area: "build", kind: "changed", verdict: "skip", priority: 3,
    who: [], tags: ["unique:safrins-resolve", "unique:zaidas-longevity", "unique:eshteras-path"],
    headline: "Sekhema's Resolve is now three named rings",
    before: "Sekhema's Resolve rings came in three versions. Each made one [[resistance|resistance]] immune to the campaign's resistance penalty.",
    now: "They are renamed Safrin's Resolve, Zaida's Longevity and Eshtera's Path. Instead of ignoring the penalty, each gives +5-10% to two resistances for every equipped item with a bonus to the third.",
    so: "Old rings keep their old bonus. New ones reward gear that rolls the matching resistance.",
    soType: "fact", viz: null,
    sources: [
      "The Sekhema's Resolve Unique Rings have been renamed to Safrin's Resolve, Zaida's Longevity, and Eshtera's Path.",
      "The Safrin's Resolve Unique Ring no longer has Lightning Resistance is unaffected by Area Penalties. It now has +5-10% to Cold and Lightning Resistance per Equipped Item with a Fire Resistance Modifier. Existing items are not affected by this change.",
      "The Zaida's Longevity Unique Ring no longer has Lightning Resistance is unaffected by Area Penalties.",
      "The Eshtera's Path Unique Ring no longer has Cold Resistance is unaffected by Area Penalties."
    ] },

  { id: "ailment-uniques-blackflame-levinstone", league: "0.5", area: "build", kind: "changed", verdict: "skip", priority: 3,
    who: [], tags: ["unique:blackflame", "unique:levinstone", "unique:blistering-bond", "unique:plaguefinger"],
    headline: "Blackflame, Levinstone, Blistering Bond and Plaguefinger changed",
    before: "Blackflame is a ring that turned your Ignites into chaos damage, and Levinstone a ring with +1 to lightning skill levels. Blistering Bond is a ring that makes Bleeding you take deal fire damage, and Plaguefinger are poison gloves.",
    now: "Blackflame [[ignite|Ignites]] deal chaos damage with 80-100% increased magnitude but 60-75% reduced duration, and its Withered raises fire damage taken. Levinstone makes lightning skills chain once more. Blistering Bond turns your Bleeding into fire damage, and Plaguefinger can't inflict elemental ailments.",
    so: "A [[divine-orb|Divine Orb]] updates the Ignite numbers on an old Blackflame. Old Blistering Bonds don't get the new lines.",
    soType: "fact", viz: null,
    sources: [
      "The Blackflame Unique Ring no longer has Enemies Ignited by you take Chaos Damage instead of Fire Damage from Ignite.",
      "It now has Withered you inflict also increases Fire Damage taken, Ignite you Inflict deals Chaos Damage instead of Fire damage, and Withered does not expire on enemies Ignited by you.",
      "Additionally, it now has 80-100% increased Ignite Magnitude (previously 50%), and 60-75% reduced Ignite Duration on Enemies (previously 50%). Ignite Magnitude and Duration modifiers can be updated to the new values using a Divine Orb, other modifiers will remain unchanged.",
      "The Levinstone Unique Ring no longer has +1 to Level of all Lightning Skills. It now has Lightning Skills Chain +1 times.",
      "The Blistering Bond Unique Ring now has Fire Damage also Contributes to Bleeding Magnitude, and Bleeding you Inflict deals Fire damage instead of Physical damage, in addition to its other modifiers. Existing items are not affected by this change.",
      "The Plaguefinger Unique Gloves now have Cannot inflict Elemental Ailments."
    ] },

  { id: "uniques-new-lines-new-copies-only", league: "0.5", area: "build", kind: "changed", verdict: "skip", priority: 3,
    who: [], tags: ["unique:carnage-heart", "unique:chober-chaber", "unique:glowswarm", "unique:prized-pain", "unique:soul-mantle", "unique:seed-of-cataclysm"],
    headline: "Six uniques gained new lines, but only on new copies",
    before: "Carnage Heart, Chober Chaber, Glowswarm, Prized Pain, Soul Mantle and Seed of Cataclysm are uniques from earlier patches.",
    now: "Carnage Heart adds damage while [[leech|leeching]], and Chober Chaber +2-3 to minion skill levels. Glowswarm grants [[guard|Guard]] when you use a mana flask, Prized Pain a chance of [[thorns|Thorns]] on melee hits, and Soul Mantle +75 [[spirit|Spirit]]. Seed of Cataclysm can make spell crits lucky.",
    so: "None of this reaches copies you already own. Look for fresh drops if you want the new lines.",
    soType: "fact", viz: null,
    sources: [
      "The Carnage Heart Unique Amulet now has 25-50% increased Damage while Leeching. Existing items are unaffected by this change.",
      "The Chober Chaber Unique Mace now has +2-3 to Level of All Minion Skills. Existing items are not affected by this change.",
      "The Glowswarm Unique Ring now has Using a Mana Flask grants Guard equal to 100% of the Flask's Recovery amount for 4 seconds. Existing items are not affected by this change.",
      "The Prized Pain Unique Ring no longer has Deal your Thorns Damage to Enemies you Stun with Melee Attacks. It now has 15-25% chance to deal your Thorns damage to enemies you Hit with Melee Attacks. Existing items are not affected by this change.",
      "The Soul Mantle Unique Body Armour no longer has 20-30% reduced Totem Life, it instead now has +75 to Spirit. Existing versions of this item are not affected by this change.",
      "It now has 5% reduced Critical Spell Damage Bonus per Critical Hit you've dealt with Spells Recently, and 15-30% chance for Spell Damage with Critical Hits to be Lucky. Existing items are not affected by this change."
    ] },

  { id: "svalinn-and-olroths-resolve-runic-ward", league: "0.5", area: "build", kind: "changed", verdict: "skip", priority: 3,
    who: [], tags: ["unique:svalinn", "unique:olroths-resolve"],
    headline: "Svalinn and Olroth's Resolve now work with Runic Ward",
    before: "Svalinn is a unique shield with a skill it casts when you block. Olroth's Resolve is a unique flask that turned extra life recovery into [[guard|Guard]].",
    now: "Skills that Svalinn casts when you block now cost nothing, and new copies add 50-100 [[runic-ward|Runic Ward]]. Olroth's Resolve lost its instant recovery and Guard. It now regenerates Runic Ward during its effect and gives Guard equal to your Runic Ward when it ends.",
    so: "Pair either one with Runic Ward from [[runeforging|Runeforging]]. Old Svalinns don't get the Runic Ward line.",
    soType: "fact", viz: null,
    sources: [
      "The Svalinn Unique Shield's Cast on Block Skill now has Supported Skills Cost nothing. It also now has +50-100 Runic Ward, existing items are not affected by this change.",
      "It no longer has Instant Recovery or Excess Life Recovery added as Guard for 20 seconds, instead now providing Regenerate 2.5-5% of maximum Runic Ward per second during Effect, and Gain Guard equal to current Runic Ward for 10 seconds when effect ends."
    ] },

  { id: "elevore-radiant-grief-zerphi-buffs", league: "0.5", area: "build", kind: "buff", verdict: "skip", priority: 3,
    who: [], tags: ["unique:elevore", "unique:radiant-grief", "unique:zerphis-genesis"],
    headline: "Elevore, Radiant Grief and Zerphi's Genesis got stronger",
    before: "Elevore is a helmet that refills [[charm|Charm]] charges. Radiant Grief is a helmet that ignites enemies around you. Zerphi's Genesis is a belt for Charm and [[flask|flask]] builds.",
    now: "Elevore gives 1 Charm charge per second, up from 0.5, and +1-2 Charm slots. Radiant Grief ignites as if dealing 200 base fire damage, up from 100. Zerphi's Genesis now passes half the charges your Life Flasks use on to your Charms.",
    so: "A [[divine-orb|Divine Orb]] updates an old Elevore or Radiant Grief. The notes don't say whether old Zerphi's Genesis belts change.",
    soType: "fact",
    viz: { type: "bars", caption: "Radiant Grief, base fire damage of its Ignite",
      rows: [ { label: "Before", value: 100, display: "100" }, { label: "Now", value: 200, display: "200" } ] },
    sources: [
      "The Elevore Unique Helmet now grants Charms gain 1 Charge per second (previously 0.5), and now provides +1-2 Charm Slots (previously +1). Existing items can be buffed using a Divine Orb.",
      "The Radiant Grief Unique Helmet now has Enemies in your Presence are Ignited as though dealt 200 Base Fire Damage (previously 100). Existing items can be updated to the new value with a Divine Orb.",
      "The Zerphi's Genesis Unique Belt no longer has 10-30% increased Charm Charges used. It now has 50% of Charges consumed by used Life Flasks are granted to your Charms"
    ] },

  // poe2db: Grip of Kulemak inflicts Abyssal Wasting and can gain custom Desecrated modifiers; The Unborn Lich has
  // Desecrated modifiers and grants His Grave Command, which captures a Rare Undead to summon later as a companion.
  { id: "grip-of-kulemak-and-abyss-staff-mods", league: "0.5", area: "build", kind: "buff", verdict: "skip", priority: 3,
    who: [], tags: ["unique:grip-of-kulemak", "unique:the-unborn-lich", "weapon:staff"],
    headline: "Grip of Kulemak and Abyss staff modifiers improved in 0.5.3",
    before: "Grip of Kulemak is an Abyss ring that inflicts [[abyssal-wasting|Abyssal Wasting]] and gains its own [[desecrated-modifier|Desecrated modifiers]]. The Unborn Lich is a unique [[staff|staff]] with Desecrated modifiers and skills, such as one that captures undead to fight for you.",
    now: "Grip of Kulemak gained 13 new Abyssal Wasting modifiers, and many old ones were merged or raised. The Unborn Lich's His Grave Command skill no longer costs [[spirit|Spirit]]. [[staff|Staves]] gained new Abyss modifiers, like 40-50% of damage as extra chaos damage.",
    so: "Use a [[divine-orb|Divine Orb]] on an old Grip of Kulemak to raise its numbers. The new modifiers appear only on new copies.",
    soType: "fact", viz: null,
    sources: [
      "Added 13 new Abyssal Wasting Modifiers for the Grip of Kulemak Unique Ring.",
      "Many of the Grip of Kulemak Desecrated Modifiers have been combined into a single Modifier, increased numerically, or disabled. Existing items can be updated using a Divine Orb to receive the new values, however new Modifiers will only generate on new versions of the item.",
      "The His Grave Command Skill granted by The Unborn Lich Unique Staff no longer has a Spirit cost",
      "Added a new 'Amanamu's' Staff Prefix Modifier granting Gain 40-50% of Damage as Extra Chaos Damage.",
      "The 'of Amanamu' Staff Suffix Modifier granting +12-16% to Block Chance now grants +20-25% to Block Chance."
    ] }

]);
