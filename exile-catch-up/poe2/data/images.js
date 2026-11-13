/* Exile Catch-Up image manifest (spec 5.8). Keys are "league:<version>", "term:<id>", "card:<id>" or
   "site:fallback", the Path of Exile 2 icon shown where nothing else has a picture.
   Every file is official Grinding Gear Games art saved in assets/img/; sources are in assets/CREDITS.md.
   On a card with no chart, the alt text is also shown as the picture's name, so it starts with the item's name.
   "One kind of" means the picture is one example of a family of items. */
(function () {
  const img = (file, alt) => ({ src: `assets/img/${file}`, alt });

  const remnant = img('remnant.png', 'Remnant minimap icon');
  const expedition = img('expedition.png', 'Expedition icon on the Atlas');
  const abyss = img('abyss.png', 'Abyss icon on the Atlas');
  const breach = img('breach.png', 'Breach icon on the Atlas');
  const delirium = img('delirium.png', 'Delirium icon on the Atlas');
  const ritual = img('ritual.png', 'Ritual icon on the Atlas');
  const atzirisTemple = img('atziris-temple.png', "Atziri's Temple minimap icon");
  const forbiddenRites = img('forbidden-rites.jpg', 'Forbidden Rites art: a ritual totem of antlers and skulls around a candle');
  const logbook = img('expedition-logbook.png', 'Expedition Logbook, which reveals a stretch of the Ocean');
  const verisiumAnvil = img('verisium-anvil.png', 'Verisium Anvil, where you Runeforge, as a hideout decoration');
  const waystone = img('waystone.png', 'Waystone (Tier 15)');
  const breachstone = img('breachstone.png', 'Breachstone');
  const wombgift = img('wombgift.png', 'Lavish Wombgift, one kind of Wombgift');
  const crisisFragment = img('crisis-fragment.png', 'Ancient Crisis Fragment, one of the three Crisis Fragments');
  const originCore = img('origin-core.png', 'Origin Core, the key to the Arbiter of Divinity');
  const inscribedUltimatum = img('inscribed-ultimatum.png', 'Inscribed Ultimatum, the key to the Trial of Chaos');
  const headOfTheKing = img('head-of-the-king.png', 'Head of the King, which starts the Rite of the Nameless');
  const idol = img('idol.png', 'Fox Idol, one kind of Idol');
  const priceless = img('priceless-idol.png', 'Golden Idol, one of the three Priceless Idols from Act 3');
  const soulCore = img('soul-core.png', "Atmohua's Soul Core of Retreat, one kind of Soul Core");
  const skyfall = img('skyfall.png', 'Skyfall, one of the Kalguuran skill gems');
  const tameBeast = img('tame-beast.png', 'Tame Beast, the skill gem that makes a beast your Companion');
  const raiseZombie = img('raise-zombie.png', 'Raise Zombie, one of the minion skill gems');
  const olrothsConviction = img('olroths-conviction.png', "Olroth's Conviction, one of the Lineage supports");
  const martialArtist = img('martial-artist.jpg', 'Martial Artist ascendancy portrait');
  const spiritWalker = img('spirit-walker.jpg', 'Spirit Walker ascendancy portrait');

  EXILE.addImages({
    'site:fallback': img('poe2-icon.png', 'Path of Exile 2'),
    'league:0.5': img('league-0-5.jpg', 'Return of the Ancients key art: a winged figure in golden armour holding a spear, a tall tower behind'),

    /* Leagues and league mechanics */
    'term:runes-of-aldur': img('remnant.png', 'Remnant minimap icon, the rune stone at the heart of Runes of Aldur'),
    'term:forbidden-rites': forbiddenRites,
    'term:fate-of-the-vaal': img('fate-of-the-vaal.png', 'Fate of the Vaal quest icon, a Vaal temple'),
    'term:rise-of-the-abyssals': img('abyss.png', 'Abyss icon on the Atlas, the mechanic of Rise of the Abyssals'),
    'term:remnant': remnant,
    'term:runeshape': img('remnant-rune.png', 'Adaptive Rune, one of the runes you set in a Remnant'),
    'term:expedition': expedition,
    'term:grand-expedition': logbook,
    'term:abyss': abyss,
    'term:breach': breach,
    'term:breach-domain': img('breachstone.png', 'Breachstone, which reveals a Breach Domain'),
    'term:delirium': delirium,
    'term:simulacrum': img('simulacrum.png', 'Simulacrum'),
    'term:ritual': ritual,
    'term:rite-of-the-nameless': headOfTheKing,
    'term:atziris-temple': atzirisTemple,
    'term:azmeri-spirit': img('azmeri-spirit.png', 'Azmeri Spirit minimap icon'),
    'term:viridian-wildwood': img('sacred-bloom.png', 'Sacred Bloom, which adds the Wildwood to maps in Forbidden Rites'),
    'term:shrine': img('shrine.png', 'Shrine minimap icon'),
    'term:strongbox': img('strongbox.png', 'Strongbox minimap icon'),

    /* Systems and places */
    'term:map': img('waystone.png', 'Waystone, the key that opens a map'),
    'term:precursor-tower': img('precursor-tower.png', 'Precursor Tower quest icon'),
    'term:corrupted-nexus': img('corrupted-nexus.png', 'Corrupted Nexus icon on the Atlas'),
    'term:trial-of-the-sekhemas': img('djinn-barya.png', 'Djinn Barya, the key to the Trial of the Sekhemas'),
    'term:trial-of-chaos': inscribedUltimatum,
    'term:genesis-tree': img('wombgift.png', 'Lavish Wombgift, one of the Wombgifts you grow on the Genesis Tree'),
    'term:runeforging': verisiumAnvil,

    /* Items */
    'term:waystone': waystone,
    'term:precursor-tablet': img('precursor-tablet.png', 'Breach Tablet, one kind of Precursor Tablet'),
    'term:breachstone': breachstone,
    'term:crisis-fragment': crisisFragment,
    'term:calamity-fragment': img('calamity-fragment.png', 'Primary Calamity Fragment, one of the old Calamity Fragments'),
    'term:fragment': img('breach-splinter.png', 'Breach Splinter, one kind of fragment'),
    'term:relic': img('relic.png', 'Urn Relic, one kind of Relic'),
    'term:charm': img('charm.png', 'Thawing Charm, one kind of Charm'),
    'term:flask': img('flask.png', 'Grand Life Flask, one kind of Flask'),
    'term:talisman': img('talisman.png', 'Changeling Talisman, one kind of Talisman'),
    'term:sceptre': img('sceptre.png', 'Rattling Sceptre, one kind of Sceptre'),
    'term:quarterstaff': img('quarterstaff.png', 'Wrapped Quarterstaff, one kind of Quarterstaff'),
    'term:spear': img('spear.png', 'Hunting Spear, one kind of Spear'),
    'term:buckler': img('buckler.png', 'Wooden Buckler, one kind of Buckler'),
    'term:focus': img('focus.png', 'Twig Focus, one kind of Focus'),
    'term:crossbow': img('crossbow.png', 'Sturdy Crossbow, one kind of Crossbow'),
    'term:staff': img('staff.png', 'Ashen Staff, one kind of Staff'),
    'term:bow': img('bow.png', 'Recurve Bow, one kind of Bow'),
    'term:body-armour': img('body-armour.png', 'Iron Cuirass, one kind of Body Armour'),
    'term:augment': img('rune.png', 'Iron Rune, one kind of Augment'),
    'term:rune': img('rune.png', 'Iron Rune, one kind of rune'),
    'term:soul-core': soulCore,
    'term:idol': idol,
    'term:jewel': img('jewel.png', 'Ruby, one of the basic Jewels'),
    'term:time-lost-jewel': img('time-lost-jewel.png', 'Time-Lost Ruby, one kind of Time-Lost Jewel'),
    'term:uncut-gem': img('uncut-skill-gem.png', 'Uncut Skill Gem, one kind of uncut gem'),
    'term:priceless-idol': priceless,

    /* Currency */
    'term:orb-of-transmutation': img('orb-of-transmutation.png', 'Orb of Transmutation'),
    'term:orb-of-augmentation': img('orb-of-augmentation.png', 'Orb of Augmentation'),
    'term:exalted-orb': img('exalted-orb.png', 'Exalted Orb'),
    'term:chaos-orb': img('chaos-orb.png', 'Chaos Orb'),
    'term:divine-orb': img('divine-orb.png', 'Divine Orb'),
    'term:vaal-orb': img('vaal-orb.png', 'Vaal Orb'),
    'term:orb-of-chance': img('orb-of-chance.png', 'Orb of Chance'),
    'term:fracturing-orb': img('fracturing-orb.png', 'Fracturing Orb'),
    'term:hinekoras-lock': img('hinekoras-lock.png', "Hinekora's Lock"),
    'term:jewellers-orb': img('jewellers-orb.png', "Lesser Jeweller's Orb, one of the three Jeweller's Orbs"),
    'term:greater-perfect-orbs': img('exalted-orb.png', 'Perfect Exalted Orb, one of the Perfect orbs (it shares the Exalted Orb picture)'),
    'term:orb-of-sacrifice': img('orb-of-sacrifice.png', "Kamasa's Orb of Sacrifice, one of the four Orbs of Sacrifice"),
    'term:vaal-cultivation-orb': img('vaal-cultivation-orb.png', 'Vaal Cultivation Orb'),
    'term:vaal-infuser': img('vaal-infuser.png', "Vaal Armourer's Infuser, one of the four Vaal Infusers"),
    'term:omen': img('omen.png', 'Omen of Sinistral Exaltation, one kind of Omen'),
    'term:essence': img('essence.png', 'Essence of the Body, one kind of Essence'),
    'term:catalyst': img('catalyst.png', 'Flesh Catalyst, one kind of Catalyst'),
    'term:liquid-emotion': img('liquid-emotion.png', 'Diluted Liquid Ire, one kind of Liquid Emotion'),
    'term:alloy': img('alloy.png', 'Runic Alloy, one of the 13 Alloys'),
    'term:flux': img('flux.png', 'Blazing Flux, one kind of Flux'),
    'term:verisium': img('verisium.png', 'Verisium'),
    'term:wombgift': wombgift,
    'term:desecrated-currency': img('desecrated-currency.png', 'Ancient Jawbone, one kind of Desecrated currency'),
    'term:gold': img('gold.png', 'A pile of Gold'),

    /* Bosses, by the key that opens their fight */
    'term:arbiter-of-ash': img('crisis-fragment.png', 'Ancient Crisis Fragment, one of the keys to the Arbiter of Ash'),
    'term:arbiter-of-divinity': originCore,
    'term:king-in-the-mists': img('audience-with-the-king.png', 'An Audience with the King, which summons the King in the Mists'),
    'term:raven-trickster': img('ravens-reflection.png', "Raven's Reflection, the key to the Raven Trickster"),
    'term:the-aberration': img('triskelion-reforged.png', 'The Triskelion Reforged, the key to the Aberration'),
    'term:xesht': img('breachlord-sac.png', 'Breachlord Sac, the key to Xesht'),
    'term:kulemak': img('kulemaks-invitation.png', "Kulemak's Invitation, which opens Kulemak's fight"),
    'term:trialmaster': img('inscribed-ultimatum.png', 'Inscribed Ultimatum, which the Trialmaster drops'),

    /* Characters */
    'term:farrow': img('farrow.png', 'Farrow, as his hideout decoration'),
    'term:doryani': img('doryani.png', 'Doryani, as his hideout decoration'),
    'term:hilda': img('hilda.png', 'Hilda, as her hideout decoration'),
    'term:jado': img('jado.png', 'Jado, as a hideout decoration'),
    'term:expedition-vendor': img('dannig.png', 'Dannig, one of the Expedition traders, as his hideout decoration'),

    /* Skills, classes, ascendancies */
    'term:skill-gem': img('comet.png', 'Comet, one kind of skill gem'),
    'term:support-gem': img('uncut-support-gem.png', 'Uncut Support Gem, which you cut into a support gem'),
    'term:lineage-support': olrothsConviction,
    'term:meta-gem': img('cast-on-critical.png', 'Cast on Critical, one kind of Meta Gem'),
    'term:invocation': img('elemental-invocation.png', 'Elemental Invocation, one of the Invocation gems'),
    'term:herald': img('herald-of-ash.png', 'Herald of Ash, one of the Herald skill gems'),
    'term:mark': img('snipers-mark.png', "Sniper's Mark, one of the Mark skill gems"),
    'term:curse': img('despair.png', 'Despair, one of the curse skill gems'),
    'term:warcry': img('infernal-cry.png', 'Infernal Cry, one of the Warcry skill gems'),
    'term:banner': img('war-banner.png', 'War Banner, one of the Banner skill gems'),
    'term:minion': raiseZombie,
    'term:totem': img('spell-totem.png', 'Spell Totem, one of the totem skill gems'),
    'term:companion': tameBeast,
    'term:kalguuran-skill': skyfall,
    'term:parry': img('parry.png', 'Parry skill icon'),
    'term:ascendancy': img('martial-artist.jpg', 'Martial Artist ascendancy portrait, one kind of ascendancy'),
    'term:warrior': img('warrior.jpg', 'Warrior class portrait'),
    'term:ranger': img('ranger.jpg', 'Ranger class portrait'),
    'term:huntress': img('huntress.jpg', 'Huntress class portrait'),
    'term:mercenary': img('mercenary.jpg', 'Mercenary class portrait'),
    'term:monk': img('monk.jpg', 'Monk class portrait'),
    'term:sorceress': img('sorceress.jpg', 'Sorceress class portrait'),
    'term:witch': img('witch.jpg', 'Witch class portrait'),
    'term:druid': img('druid.jpg', 'Druid class portrait'),
    'term:titan': img('titan.jpg', 'Titan ascendancy portrait'),
    'term:warbringer': img('warbringer.jpg', 'Warbringer ascendancy portrait'),
    'term:smith-of-kitava': img('smith-of-kitava.jpg', 'Smith of Kitava ascendancy portrait'),
    'term:deadeye': img('deadeye.jpg', 'Deadeye ascendancy portrait'),
    'term:pathfinder': img('pathfinder.jpg', 'Pathfinder ascendancy portrait'),
    'term:amazon': img('amazon.jpg', 'Amazon ascendancy portrait'),
    'term:ritualist': img('ritualist.jpg', 'Ritualist ascendancy portrait'),
    'term:spirit-walker': spiritWalker,
    'term:witchhunter': img('witchhunter.jpg', 'Witchhunter ascendancy portrait'),
    'term:gemling-legionnaire': img('gemling-legionnaire.jpg', 'Gemling Legionnaire ascendancy portrait'),
    'term:tactician': img('tactician.jpg', 'Tactician ascendancy portrait'),
    'term:invoker': img('invoker.jpg', 'Invoker ascendancy portrait'),
    'term:acolyte-of-chayula': img('acolyte-of-chayula.jpg', 'Acolyte of Chayula ascendancy portrait'),
    'term:martial-artist': martialArtist,
    'term:stormweaver': img('stormweaver.jpg', 'Stormweaver ascendancy portrait'),
    'term:chronomancer': img('chronomancer.jpg', 'Chronomancer ascendancy portrait'),
    'term:disciple-of-varashta': img('disciple-of-varashta.jpg', 'Disciple of Varashta ascendancy portrait'),
    'term:infernalist': img('infernalist.jpg', 'Infernalist ascendancy portrait'),
    'term:blood-mage': img('blood-mage.jpg', 'Blood Mage ascendancy portrait'),
    'term:lich': img('lich.jpg', 'Lich ascendancy portrait'),
    'term:oracle': img('oracle.jpg', 'Oracle ascendancy portrait'),
    'term:shaman': img('shaman.jpg', 'Shaman ascendancy portrait'),

    /* Cards whose subject is one item, gem, unique, mechanic or ascendancy */
    'card:aldur-remnant-rune-crafting': remnant,
    'card:aldur-remnant-rewards-raised': remnant,
    'card:aldur-expedition-moved-to-core': expedition,
    'card:expedition-explosives-wait-remnants-spread': expedition,
    'card:aldur-expedition-tablet-stacking': img('expedition-tablet.png', 'Expedition Tablet'),
    'card:aldur-farrow-campaign-quests': img('farrow.png', 'Farrow, as his hideout decoration'),
    'card:aldur-runeforging-runic-ward': verisiumAnvil,
    'card:aldur-unique-runeforging': verisiumAnvil,
    'card:aldur-alloys-crafted-modifiers': img('alloy.png', 'Runic Alloy, one of the 13 Alloys'),
    'card:aldur-kalguuran-skills-supports': skyfall,
    'card:aldur-logbooks-open-the-ocean': logbook,
    'card:aldur-grand-expeditions-richer': logbook,
    'card:aldur-aberration-faction-leaders': img('triskelion-reforged.png', 'The Triskelion Reforged, the key Olroth gives to the Aberration'),
    'card:forbidden-rites-campaign-rituals': forbiddenRites,
    'card:forbidden-rites-sacred-blooms': img('sacred-bloom.png', 'Sacred Bloom'),
    'card:ritual-rewards-uniques-and-omens': ritual,
    'card:ritual-party-tribute': ritual,
    'card:ritual-rite-of-the-nameless': headOfTheKing,
    'card:delirium-depth-bar-and-shards': delirium,
    'card:delirium-trial-of-madness': delirium,
    'card:delirium-simulacrum-raven-trickster': img('simulacrum.png', 'Simulacrum'),
    'card:delirium-emotions-craft-jewels': img('liquid-emotion.png', 'Diluted Liquid Ire, one kind of Liquid Emotion'),
    'card:breach-stabilise-bar-vruun': breach,
    'card:breach-genesis-tree-crafting': wombgift,
    'card:breach-domains-tul-esh-xesht': breachstone,
    'card:vaal-temple-now-core': atzirisTemple,
    'card:vaal-temple-tier-4-rooms': atzirisTemple,
    'card:v04-fate-of-the-vaal-core': atzirisTemple,
    'card:vaal-infusers-four-kinds': img('vaal-infuser.png', "Vaal Armourer's Infuser, one of the four Vaal Infusers"),
    'card:vaal-cultivation-unique-rolls': img('vaal-cultivation-orb.png', 'Vaal Cultivation Orb'),
    'card:abyss-atlas-cracks-and-ravines': abyss,
    'card:v04-abyss-core': abyss,
    'card:abyss-kulemak-fight-changes': img('kulemaks-invitation.png', "Kulemak's Invitation"),
    'card:abyss-bosses-drop-desecrated-currency': img('desecrated-currency.png', 'Ancient Jawbone, one kind of Desecrated currency'),
    'card:azmeri-spirits-release-chance': img('azmeri-spirit.png', 'Azmeri Spirit minimap icon'),
    'card:waystones-must-be-identified': waystone,
    'card:waystone-modifiers-resorted': waystone,
    'card:waystone-sustain-atlas-passives': waystone,
    'card:tablets-stack-empty-slots-random': img('precursor-tablet.png', 'Breach Tablet, one kind of Precursor Tablet'),
    'card:corrupted-nexus-can-retry': img('corrupted-nexus.png', 'Corrupted Nexus icon on the Atlas'),
    'card:arbiter-divinity-completes-fortress': originCore,
    'card:arbiter-of-divinity-new-pinnacle': originCore,
    'card:burning-monolith-in-fortress': crisisFragment,
    'card:trial-of-chaos-leave-and-resume': inscribedUltimatum,
    'card:trial-of-chaos-milder-modifiers': inscribedUltimatum,
    'card:trial-of-chaos-continue-runs': inscribedUltimatum,
    'card:martial-artist-new-monk-ascendancy': martialArtist,
    'card:martial-artist-launch-fixes': martialArtist,
    'card:spirit-walker-new-huntress-ascendancy': spiritWalker,
    'card:acolyte-of-chayula-flames-leech-more': img('acolyte-of-chayula.jpg', 'Acolyte of Chayula ascendancy portrait'),
    'card:blood-mage-leech-and-flasks': img('blood-mage.jpg', 'Blood Mage ascendancy portrait'),
    'card:chronomancer-phased-form-rework': img('chronomancer.jpg', 'Chronomancer ascendancy portrait'),
    'card:gemling-legionnaire-gem-quality-rework': img('gemling-legionnaire.jpg', 'Gemling Legionnaire ascendancy portrait'),
    'card:pathfinder-poison-and-speed-nerf': img('pathfinder.jpg', 'Pathfinder ascendancy portrait'),
    'card:witchhunter-obsessive-rituals-nerf': img('witchhunter.jpg', 'Witchhunter ascendancy portrait'),
    'card:v04-druid-class': img('druid.jpg', 'Druid class portrait'),
    'card:lineage-supports-24-new': olrothsConviction,
    'card:companions-tame-beast-trusted-kinship': tameBeast,
    'card:comet-damage-nerf': img('comet.png', 'Comet skill gem'),
    'card:minion-damage-bug-fixed': raiseZombie,
    'card:orbs-of-sacrifice-upgrade-enchantments': img('orb-of-sacrifice.png', "Kamasa's Orb of Sacrifice, one of the four Orbs of Sacrifice"),
    'card:jewellers-orbs-on-item-skills': img('jewellers-orb.png', "Lesser Jeweller's Orb, one of the three Jeweller's Orbs"),
    'card:catalysts-genesis-tree-and-necrotic': img('catalyst.png', 'Flesh Catalyst, one kind of Catalyst'),
    'card:basic-runes-stronger': img('rune.png', 'Iron Rune, one of the basic runes'),
    'card:oswald-pays-more-for-priceless-idols': priceless,
    'card:idols-fit-sceptres': idol,
    'card:v04-talismans-renamed-idols': idol,
    'card:seventeen-new-soul-cores': img('jiquanis-soul-core.png', "Jiquani's Soul Core of Abundance, one of the 17 new Soul Cores"),
    'card:soul-cores-limit-one-but-stronger': soulCore,
    'card:new-uniques-including-mageblood': img('mageblood.png', 'Mageblood'),
    'card:v04-talisman-weapons': img('talisman.png', 'Changeling Talisman, one kind of Talisman'),
    'card:v04-bow-surpassing-arrows': img('bow.png', 'Recurve Bow, one kind of Bow'),
    'card:v04-staff-spell-mods': img('staff.png', 'Ashen Staff, one kind of Staff')
  });
})();
