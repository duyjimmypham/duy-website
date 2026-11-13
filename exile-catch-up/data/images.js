/* Exile Catch-Up image manifest (spec 5.8). Keys are "league:<version>", "term:<id>", "card:<id>" or
   "site:fallback", the Path of Exile icon shown where nothing else has a picture.
   Every file is official Grinding Gear Games art saved in assets/img/; sources are in assets/CREDITS.md.
   On a card with no chart, the alt text is also shown as the picture's name, so it starts with the item's name.
   "One kind of" means the picture is one example of a family of items. */
(function () {
  const img = (file, alt) => ({ src: `assets/img/${file}`, alt });

  const orbOfChance = img('orb-of-chance.png', 'Orb of Chance');
  const abyssThread = img('abyss-thread.png', 'Abyss Thread, one of the ten Threads');
  const abyssScarab = img('scarab.png', 'Abyss Scarab, one of the old Scarabs');
  const luminary = img('luminary.png', 'Luminary ascendancy portrait');
  const viscera = img('viscera.png', "Shaper's Head, one of the Viscera");
  const bloodVessel = img('blood-filled-vessel.png', 'Blood-filled Vessel');
  const essence = img('essence.png', 'Shrieking Essence of Greed, one kind of Essence');
  const djinnCoin = img('djinn-coin.png', 'Coin of Knowledge, one of the old Djinn Coins');
  const contract = img('contract.png', 'A Heist Contract');
  const golem = img('summon-stone-golem.png', 'Summon Stone Golem, one of the golem skill gems');
  const covensLogo = img('covens-of-umbra-logo.png', 'Covens of Umbra logo');
  const abyssJewel = img('abyssal-jewel.png', 'Ghastly Eye Jewel, an Abyssal Jewel from Abyss');
  const bestiaryOrb = img('bestiary-orb.png', 'Bestiary Orb, an item from Bestiary');
  const betrayalMark = img('betrayal.png', "Betrayal minimap icon, the mark of Catarina, the Syndicate's leader");
  const breachstone = img('breachstone.png', "Chayula's Breachstone, an item from Breach");
  const timelessEmblem = img('timeless-emblem.png', 'Timeless Eternal Emblem, an item from Legion');
  const omen = img('omen.png', 'Omen of Amelioration, one kind of Omen, an item from Ritual');
  const inscribedUltimatum = img('inscribed-ultimatum.png', 'Inscribed Ultimatum, an item from Ultimatum');
  const mirage = img('mirage.png', 'Mirage minimap icon');
  const harvestLifeforce = img('vivid-lifeforce.png', 'Vivid Crystallised Lifeforce, the resource Harvest gives');
  const simulacrum = img('simulacrum.png', 'Simulacrum, an item from Delirium');
  const strongbox = img('strongbox.png', 'Strongbox minimap icon');
  const mercenary = img('mercenary.png', 'Mercenary minimap icon, which marks a duel');
  const vaalSideArea = img('vaal-side-area.png', 'Vaal Side Area minimap icon');
  const eldritchAltar = img('eldritch-altar.png', 'Searing Exarch altar minimap icon, one of the two kinds of Eldritch Altar');
  const kingsmarchShipping = img('kingsmarch-shipping.png', 'Kingsmarch shipping minimap icon');
  const craftingBench = img('crafting-bench.png', 'Crafting Bench minimap icon');
  const temple = img('chronicle-of-atzoatl.png', 'Chronicle of Atzoatl, the item that opens the Temple');
  const minion = img('raise-zombie.png', 'Raise Zombie, one of the minion skill gems');

  EXILE.addImages({
    'site:fallback': img('poe-icon.png', 'Path of Exile'),
    'league:3.30': img('league-3-30.jpg', 'Covens of Umbra key art: the Wickerman, a figure of woven sticks wreathed in blue flame'),
    'term:covens-of-umbra': covensLogo,

    /* League mechanics and other activities */
    'term:abyss': abyssJewel,
    'term:bestiary': bestiaryOrb,
    'term:betrayal': betrayalMark,
    'term:blight': img('golden-oil.png', 'Golden Oil, one kind of Oil, an item from Blight'),
    'term:breach': breachstone,
    'term:expedition': img('logbook.png', 'Expedition Logbook, an item from Expedition'),
    'term:incursion': img('chronicle-of-atzoatl.png', 'Chronicle of Atzoatl, the item that holds the temple Incursions build'),
    'term:legion': timelessEmblem,
    'term:ritual': omen,
    'term:ultimatum': inscribedUltimatum,
    'term:mirage': mirage,
    'term:harvest': harvestLifeforce,
    'term:delve': img('fossil.png', 'Pristine Fossil, one kind of Fossil, an item from Delve'),
    'term:heist': img('rogues-marker.png', "Rogue's Marker, the Heist currency"),
    'term:delirium': simulacrum,
    'term:strongbox': strongbox,
    'term:shrine': img('shrine.png', 'Shrine minimap icon'),
    'term:ore-deposit': img('ore-deposit.png', 'Crimson Iron minimap icon, one kind of Ore Deposit'),
    'term:sentinel': img('sentinel.png', 'Sentinel minimap icon'),
    'term:smugglers-cache': img('smugglers-cache.png', "Smuggler's Cache minimap icon"),
    'term:mercenary': mercenary,
    'term:vaal-side-area': vaalSideArea,
    'term:deified': img('divine-vessel.png', 'Divine Vessel, which makes a map Deified'),

    /* Systems and places */
    'term:map-device': img('map-device.png', 'Map Device minimap icon'),
    'term:eldritch-altar': eldritchAltar,
    'term:voidstone': img('voidstone.png', 'Ceremonial Voidstone, one of the four Voidstones'),
    'term:kingsmarch': kingsmarchShipping,
    'term:crafting-bench': craftingBench,
    'term:recombinator': img('recombinator.png', 'Recombinator minimap icon'),
    'term:temple-of-atzoatl': temple,
    'term:altar-of-corruption': img('altar-of-corruption.png', 'Altar of Corruption minimap icon'),
    'term:altar-of-sacrifice': img('altar-of-sacrifice.png', 'Altar of Sacrifice minimap icon'),
    'term:lapidary-lens': img('lapidary-lens.png', 'Lapidary Lens minimap icon'),
    'term:genesis-tree': img('wombgift.png', 'Lavish Wombgift, one of the Wombgifts you feed the Genesis Tree'),

    /* Currency */
    'term:orb-of-transmutation': img('orb-of-transmutation.png', 'Orb of Transmutation'),
    'term:orb-of-alteration': img('orb-of-alteration.png', 'Orb of Alteration'),
    'term:orb-of-alchemy': img('orb-of-alchemy.png', 'Orb of Alchemy'),
    'term:chaos-orb': img('chaos-orb.png', 'Chaos Orb'),
    'term:exalted-orb': img('exalted-orb.png', 'Exalted Orb'),
    'term:divine-orb': img('divine-orb.png', 'Divine Orb'),
    'term:orb-of-scouring': img('orb-of-scouring.png', 'Orb of Scouring'),
    'term:orb-of-chance': orbOfChance,
    'term:orb-of-binding': img('orb-of-binding.png', 'Orb of Binding'),
    'term:blessed-orb': img('blessed-orb.png', 'Blessed Orb'),
    'term:sacred-orb': img('sacred-orb.png', 'Sacred Orb'),
    'term:ancient-orb': img('ancient-orb.png', 'Ancient Orb'),
    'term:vaal-orb': img('vaal-orb.png', 'Vaal Orb'),
    'term:chromatic-orb': img('chromatic-orb.png', 'Chromatic Orb'),
    'term:mirror-of-kalandra': img('mirror-of-kalandra.png', 'Mirror of Kalandra'),
    'term:scroll-of-wisdom': img('scroll-of-wisdom.png', 'Scroll of Wisdom'),
    'term:catalyst': img('catalyst.png', 'Prismatic Catalyst, one kind of Catalyst'),
    'term:oil': img('oil.png', 'Silver Oil, one kind of Oil'),
    'term:essence': essence,
    'term:mavens-chisel': img('mavens-chisel.png', "Maven's Chisel of Procurement"),
    'term:delirium-orb': img('delirium-orb.png', 'Fine Delirium Orb, one kind of Delirium Orb'),
    'term:divine-vessel': img('divine-vessel.png', 'Divine Vessel'),
    'term:allflame-ember': img('allflame-ember.png', 'Allflame Ember of Toads, one kind of Allflame Ember'),
    'term:royal-visage': img('royal-visage.png', 'Royal Visage'),
    'term:soul-core': img('soul-core.png', 'Soul Core of Might, one kind of Soul Core'),
    'term:astrolabe': img('astrolabe.png', 'Lightless Astrolabe, one kind of Astrolabe'),
    'term:refracting-fog': img('refracting-fog.png', 'Refracting Fog'),
    'term:gold': img('gold.png', 'A pile of Gold'),
    'term:lifeforce': img('lifeforce.png', 'Wild Crystallised Lifeforce, one of the three colours'),
    'term:djinn-coin': djinnCoin,
    'term:orb-of-augmentation': img('orb-of-augmentation.png', 'Orb of Augmentation'),
    'term:regal-orb': img('regal-orb.png', 'Regal Orb'),
    'term:orb-of-regret': img('orb-of-regret.png', 'Orb of Regret'),
    'term:portal-scroll': img('portal-scroll.png', 'Portal Scroll'),
    'term:volatile-vaal-orb': img('volatile-vaal-orb.png', 'Volatile Vaal Orb'),
    'term:tainted-currency': img('tainted-currency.png', 'Tainted Chaos Orb, one kind of tainted currency'),
    'term:merricks-ducat': img('merricks-ducat.png', "Merrick's Ducat"),

    /* Items */
    'term:thread': abyssThread,
    'term:scarab': abyssScarab,
    'term:map': img('map.png', 'A tier 16 map'),
    'term:fragment': img('fragment.png', 'Fragment of the Hydra, one kind of fragment'),
    'term:vaal-fragment': img('vaal-fragment.png', 'Sacrifice at Dusk, one of the old Vaal Fragments'),
    'term:valdo-map': img('valdo-map.png', "Valdo's Puzzle Box, which holds a Valdo's Map"),
    'term:voidborn-reliquary': img('voidborn-reliquary.png', 'Voidborn Reliquary Key'),
    'term:black-barya': img('black-barya.png', 'The Black Barya'),
    'term:jewel': img('jewel.png', 'Crimson Jewel, one kind of jewel'),
    'term:abyssal-jewel': img('abyssal-jewel.png', 'Ghastly Eye Jewel, one kind of Abyssal Jewel'),
    'term:cluster-jewel': img('cluster-jewel.png', 'Large Cluster Jewel'),
    'term:timeless-jewel': img('heroic-tragedy.png', 'Heroic Tragedy, one of the Timeless Jewels'),
    'term:heroic-tragedy': img('heroic-tragedy.png', 'Heroic Tragedy'),
    'term:divination-card': img('divination-card.png', 'A divination card, as it looks in your inventory'),
    'term:tincture': img('tincture.png', 'Prismatic Tincture, one kind of Tincture'),
    'term:talisman': img('talisman.png', 'Wereclaw Talisman, one kind of Talisman'),
    'term:incubator': img('incubator.png', "Diviner's Incubator, one kind of Incubator"),
    'term:vial': img('vial.png', 'Vial of Fate, one of the old Vials'),
    'term:viscera': viscera,
    'term:blood-filled-vessel': bloodVessel,
    'term:audience-with-the-king': img('audience-with-the-king.png', 'An Audience With The King'),
    'term:maven-invitation': img('maven-invitation.png', "Maven's Invitation: The Feared, one kind of Invitation"),
    'term:contract': contract,
    'term:blueprint': img('blueprint.png', 'A Heist Blueprint'),
    'term:mercenary-warrant': img('mercenary-warrant.png', 'Mercenary Warrant'),
    'term:enshrouding-crystal': img('enshrouding-crystal.png', 'Afarud Enshrouding Crystal, the kind new in 3.30'),
    'term:veiled-item': img('veiled-item.png', 'Veiled Chaos Orb'),
    'term:wickerman': img('wickerman.jpg', 'The Wickerman, cropped from the Covens of Umbra key art'),
    'term:unique-item': img('headhunter.png', 'Headhunter, one kind of unique item'),
    'term:rogue-equipment': img('rogue-equipment.png', 'Silver Brooch, one kind of Rogue Equipment'),
    'term:flask': img('flask.png', 'Divine Life Flask, one kind of Flask'),

    /* Skills, ascendancies, characters */
    'term:arcane-link': img('arcane-link.png', 'Arcane Link skill gem'),
    'term:transfigured-gem': img('fireball-of-radiation.png', 'Fireball of Radiation, a transfigured skill gem'),
    'term:link-skill': img('flame-link.png', 'Flame Link, one of the link skill gems'),
    'term:golem': golem,
    'term:exceptional-gem': img('transfusion-support.png', 'Transfusion Support, one of the Exceptional gems'),
    'term:scion': img('scion.png', 'Scion character portrait'),
    'term:reliquarian': img('reliquarian.png', 'Reliquarian ascendancy portrait'),
    'term:luminary': luminary,
    'term:pathfinder': img('pathfinder.png', 'Pathfinder ascendancy portrait'),
    'term:warden': img('warden.png', 'Warden ascendancy portrait'),
    'term:trickster': img('trickster.png', 'Trickster ascendancy portrait'),
    'term:kirac': img('kirac.png', 'Kirac, as his hideout decoration'),
    'term:skill-gem': img('fireball.png', 'Fireball, one kind of skill gem'),
    'term:support-gem': img('spell-echo-support.png', 'Spell Echo Support, one kind of support gem'),
    'term:vaal-skill-gem': img('vaal-haste.png', 'Vaal Haste, one kind of Vaal skill gem'),
    'term:minion': minion,
    'term:ascendancy': img('pathfinder.png', 'Pathfinder ascendancy portrait, one kind of ascendancy'),
    'term:syndicate': betrayalMark,

    /* Bosses */
    'term:maven': img('mavens-writ.png', "The Maven's Writ, which opens the Maven's fight"),
    'term:searing-exarch': img('incandescent-invitation.png', 'Incandescent Invitation, which opens the Uber Searing Exarch fight'),
    'term:eater-of-worlds': img('screaming-invitation.png', 'Screaming Invitation, which opens the Uber Eater of Worlds fight'),
    'term:saresh': img('black-barya.png', 'The Black Barya, where you fight Saresh'),

    /* Cards whose subject is one item, gem, unique or ascendancy */
    'card:covens-viscera-wickerman': viscera,
    'card:arcane-link-new-skill': img('arcane-link.png', 'Arcane Link skill gem'),
    'card:fireball-of-radiation-new': img('fireball-of-radiation.png', 'Fireball of Radiation skill gem'),
    'card:reliquarian-notables-shuffled': img('reliquarian.png', 'Reliquarian ascendancy portrait'),
    'card:luminary-golden-glory-nerf': luminary,
    'card:pathfinder-flask-notables': img('pathfinder.png', 'Pathfinder ascendancy portrait'),
    'card:warden-buffs': img('warden.png', 'Warden ascendancy portrait'),
    'card:trickster-buffs': img('trickster.png', 'Trickster ascendancy portrait'),
    'card:flame-link-rebalanced': img('flame-link.png', 'Flame Link skill gem'),
    'card:pact-of-beidat-nerf': img('pact-of-beidat.png', 'Pact of Beidat skill gem'),
    'card:winter-orb-nerf': img('winter-orb.png', 'Winter Orb skill gem'),
    'card:transfusion-support-rework': img('transfusion-support.png', 'Transfusion Support gem'),
    'card:vaal-sacrifice-support-safer': img('vaal-sacrifice-support.png', 'Vaal Sacrifice Support gem'),
    'card:threads-replace-scarabs': abyssThread,
    'card:scarabs-become-threads': abyssScarab,
    'card:astrolabes-move-regions': img('astrolabe.png', 'Lightless Astrolabe, one kind of Astrolabe'),
    'card:thread-abyss': img('abyss-thread.png', 'Abyss Thread'),
    'card:thread-blight': img('blight-thread.png', 'Blight Thread'),
    'card:thread-ritual': bloodVessel,
    'card:deified-map-bosses': img('divine-vessel.png', 'Divine Vessel'),
    'card:delirium-orbs-reworked': img('delirium-orb.png', 'Fine Delirium Orb, one kind of Delirium Orb'),
    'card:saresh-harder-black-barya-stays': img('black-barya.png', 'The Black Barya'),
    'card:heroic-tragedy-ward-nerf': img('heroic-tragedy.png', 'Heroic Tragedy'),
    'card:vials-removed-altar-of-sacrifice': img('vial.png', 'Vial of Fate, one of the old Vials'),
    'card:royal-visage-alluring-incursions': img('royal-visage.png', 'Royal Visage'),
    'card:gem-coins-become-soul-cores': img('soul-core.png', 'Soul Core of Might, once the Coin of Power'),
    'card:vaal-orb-recipe-cheaper': img('vaal-orb.png', 'Vaal Orb'),
    'card:horticrafting-two-colour-costs': img('lifeforce.png', 'Wild Crystallised Lifeforce, one of the three colours'),
    'card:wisdom-scrolls-for-gold': img('scroll-of-wisdom.png', 'Scroll of Wisdom'),
    'card:shavronnes-wrappings-rework': img('shavronnes-wrappings.png', "Shavronne's Wrappings"),
    'card:femurs-of-the-saints-rework': img('femurs-of-the-saints.png', 'Femurs of the Saints'),
    'card:atziris-acuity-rework': img('atziris-acuity.png', "Atziri's Acuity"),
    'card:doedres-tongue-league-only': img('doedres-tongue.png', "Doedre's Tongue"),
    'card:orb-of-chance-rework': orbOfChance,
    'card:orb-of-chance-prices-replaced': orbOfChance,
    'card:same-name-rares-sell-for-chaos': img('chaos-orb.png', 'Chaos Orb'),
    'card:orb-of-binding-removed': img('orb-of-binding.png', 'Orb of Binding'),
    'card:div-cards-no-league-rewards': img('divination-card.png', 'A divination card, as it looks in your inventory'),
    'card:scion-unlocked-luminary': luminary,
    'card:talismans-drop-from-beasts': img('talisman.png', 'Wereclaw Talisman, one kind of Talisman'),
    'card:catalysts-only-from-ultimatum': img('catalyst.png', 'Prismatic Catalyst, one kind of Catalyst'),
    'card:covens-rites': covensLogo,
    'card:golem-buffs-smaller': golem,
    'card:minions-stop-pausing': minion,
    'card:mercenary-kinetic-blast-nerf': img('kinetic-blast.png', 'Kinetic Blast skill gem'),
    'card:mercenaries-became-core': mercenary,
    'card:mercenary-resistance-penalty': mercenary,
    'card:mercenary-weaker-high-level': mercenary,
    'card:threads-in-the-map-device': abyssThread,
    'card:where-threads-drop': abyssThread,
    'card:eldritch-altars-drop-threads': eldritchAltar,
    'card:thread-breach': breachstone,
    'card:abyss-pits-start-open': abyssJewel,
    'card:legion-auto-breaks-at-90': timelessEmblem,
    'card:delirium-fog-pays-more': simulacrum,
    'card:essences-in-maps': essence,
    'card:mirage-in-every-league': mirage,
    'card:mirage-sigils-replace-djinn-coins': djinnCoin,
    'card:harvest-sacred-flora-in-maps': harvestLifeforce,
    'card:betrayal-scarab-rewards-replaced': betrayalMark,
    'card:einhar-skips-yellow-beasts': bestiaryOrb,
    'card:heist-jobs-sold-for-gold': contract,
    'card:ultimatum-rewards-past-round-10': inscribedUltimatum,
    'card:ritual-tribute-and-rerolls': omen,
    'card:strongbox-items-any-rarity': strongbox,
    'card:vaal-side-areas-leave-maps': vaalSideArea,
    'card:temple-room-bonuses-reshuffled': temple,
    'card:kingsmarch-shipping-currency': kingsmarchShipping,
    'card:bench-in-every-town': craftingBench,
    'card:white-socket-bench-craft': craftingBench
  });
})();
