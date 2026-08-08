/**
 * VRF Bricks: all rendered copy, in English and Telugu.
 *
 * Kavali is a Telugu market. The masons, contractors and homeowners who buy
 * these bricks think in Telugu. English is the default because that is what
 * search traffic arrives on, but every string here has a Telugu twin and the
 * toggle swaps the whole site at once.
 *
 * TWO EDITING RULES
 *
 * 1. Change copy HERE, never in a component. If you add an English string you
 *    must add its Telugu twin, or the `T` type will not compile.
 *
 * 2. NO EM DASHES in any rendered string, in either language. The whole site
 *    dropped them in commit 274dec2 and this subtree follows. Use a colon when
 *    the second half explains the first, a full stop when it is a new thought,
 *    a comma when it is an aside, and parentheses when it is genuinely a nested
 *    remark. Do not swap one dash for another: pick the punctuation the
 *    sentence actually wants.
 */

export type Lang = "en" | "te";

export const LANGS: { id: Lang; label: string; short: string }[] = [
  { id: "en", label: "English", short: "EN" },
  { id: "te", label: "తెలుగు", short: "తె" },
];

/** Every leaf is a {en, te} pair. */
export interface T {
  en: string;
  te: string;
}

export const NAV: { href: string; label: T }[] = [
  { href: "/", label: { en: "Home", te: "హోమ్" } },
  { href: "/bricks/", label: { en: "Our Bricks", te: "మా ఇటుకలు" } },
  { href: "/why-fly-ash/", label: { en: "Why Fly Ash", te: "ఫ్లై యాష్ ఎందుకు" } },
  { href: "/delivery/", label: { en: "Delivery", te: "డెలివరీ" } },
  { href: "/visit/", label: { en: "Visit Us", te: "మమ్మల్ని సందర్శించండి" } },
];

export const COPY = {
  // ── Global / chrome ───────────────────────────────────────────────────────
  common: {
    getQuote: { en: "Get a price", te: "ధర తెలుసుకోండి" },
    getQuoteLong: { en: "Ask for a price on WhatsApp", te: "వాట్సాప్‌లో ధర అడగండి" },
    callNow: { en: "Call now", te: "ఇప్పుడే కాల్ చేయండి" },
    whatsapp: { en: "WhatsApp", te: "వాట్సాప్" },
    since: { en: "Since", te: "నుండి" },
    years: { en: "years", te: "సంవత్సరాలు" },
    proprietor: { en: "Proprietor", te: "యజమాని" },
    openDaily: { en: "Open every day", te: "ప్రతిరోజూ తెరిచి ఉంటుంది" },
    /** Connector in a time range: "6 AM to 9 PM". */
    to: { en: "to", te: "నుండి" },
    directions: { en: "Get directions", te: "దారి చూపించు" },
    backHome: { en: "Back to home", te: "హోమ్‌కు తిరిగి" },
  },

  // Chapter markers, in the editorial rhythm the rest of the site uses.
  chapters: {
    yard: { en: "The Yard", te: "ప్రాంగణం" },
    make: { en: "How We Make It", te: "మేము ఎలా తయారు చేస్తాము" },
    product: { en: "The Bricks", te: "ఇటుకలు" },
    quality: { en: "Quality", te: "నాణ్యత" },
    trust: { en: "Trust", te: "నమ్మకం" },
    people: { en: "Our Customers", te: "మా కస్టమర్లు" },
    visit: { en: "Come and See", te: "వచ్చి చూడండి" },
    answers: { en: "Answers", te: "సమాధానాలు" },
  },

  // ── Home ──────────────────────────────────────────────────────────────────
  home: {
    eyebrow: { en: "Kavali, Nellore District", te: "కావలి, నెల్లూరు జిల్లా" },
    h1: {
      en: "Venkata Ramana Fly Ash Cement Bricks",
      te: "వెంకట రమణ ఫ్లై యాష్ సిమెంట్ ఇటుకలు",
    },
    tagline: { en: "Standard for Strength", te: "బలానికి ప్రమాణం" },
    lede: {
      en: "A brick yard on Thummalapenta Road in Kavali, run by one family since 2014. We press our bricks. We do not burn them.",
      te: "కావలిలో తుమ్మలపెంట రోడ్డులో ఒక ఇటుక తయారీ కేంద్రం, 2014 నుండి ఒకే కుటుంబం నడుపుతోంది. మేము మా ఇటుకలను ఒత్తిడితో తయారు చేస్తాము. కాల్చము.",
    },

    yardCaption: {
      en: "The yard at Kavali. Bricks laid out to cure in the open, the way they have been since the first year.",
      te: "కావలిలోని మా ప్రాంగణం. మొదటి సంవత్సరం నుండి ఎలా ఉందో అలాగే, ఇటుకలు ఆరబెట్టడానికి బయట పరిచి ఉన్నాయి.",
    },

    storyTitle: { en: "Two ways to make a brick", te: "ఇటుక తయారీలో రెండు మార్గాలు" },
    storyBody: {
      en: "One way is to dig up farm topsoil, shape it, and burn it in a kiln for days. The other is to take fly ash, which is what a coal power station throws away, mix it with cement and stone dust, press it hard in a hydraulic machine, and let it cure in the sun. No kiln. No topsoil. No smoke. That is the brick we have made every day for over a decade.",
      te: "ఒక మార్గం: వ్యవసాయ భూమి పైమట్టిని తవ్వి, ఆకారం ఇచ్చి, బట్టీలో రోజుల తరబడి కాల్చడం. రెండో మార్గం: బొగ్గు విద్యుత్ కేంద్రం పారవేసే ఫ్లై యాష్‌ను తీసుకుని, సిమెంట్ మరియు రాతి పొడితో కలిపి, హైడ్రాలిక్ యంత్రంలో గట్టిగా ఒత్తి, ఎండలో ఆరనివ్వడం. బట్టీ లేదు. పైమట్టి లేదు. పొగ లేదు. దశాబ్దానికి పైగా మేము ప్రతిరోజూ తయారు చేసేది ఆ ఇటుకనే.",
    },

    whyTitle: { en: "What that means on your site", te: "మీ నిర్మాణ స్థలంలో దీని అర్థం" },
    why: [
      {
        title: { en: "Every brick the same size", te: "ప్రతి ఇటుక ఒకే కొలత" },
        body: {
          en: "A pressed brick comes out of the mould the same size every time. A kiln-fired brick warps as it burns. Uniform bricks mean thinner mortar joints and less plaster to level the wall, and that shows up in your cement bill, not just the brick bill.",
          te: "ఒత్తిడితో తయారైన ఇటుక ప్రతిసారీ ఒకే కొలతతో వస్తుంది. బట్టీలో కాల్చిన ఇటుక కాలుతున్నప్పుడు వంకరపోతుంది. ఒకే కొలత ఇటుకలంటే సన్నని మోర్టార్ కీళ్ళు, గోడ సమం చేయడానికి తక్కువ ప్లాస్టర్. ఇది ఇటుక బిల్లులోనే కాదు, మీ సిమెంట్ బిల్లులో కూడా కనిపిస్తుంది.",
        },
      },
      {
        title: { en: "Straight edges, square corners", te: "నిటారు అంచులు, చదరపు మూలలు" },
        body: {
          en: "Sharp arrises mean a mason can run a line and keep it. Walls go up faster, and they go up plumb without a lot of correction.",
          te: "పదునైన అంచులంటే మేస్త్రీ దారం కట్టి దాన్ని నిలబెట్టుకోగలడు. గోడలు వేగంగా పైకి వెళ్తాయి, ఎక్కువ సవరణ లేకుండా నిటారుగా వస్తాయి.",
        },
      },
      {
        title: { en: "Solid, not hollow", te: "సాలిడ్, డొల్ల కాదు" },
        body: {
          en: "We make solid bricks with no cavities. They take a nail, they take a load, and they do not crush at the corner when a slab goes on top.",
          te: "మేము లోపల ఖాళీలు లేని సాలిడ్ ఇటుకలు తయారు చేస్తాము. మేకు దిగుతుంది, బరువు మోస్తుంది, పైన స్లాబ్ వేసినప్పుడు మూల నలగదు.",
        },
      },
      {
        title: { en: "No farmland was burnt", te: "వ్యవసాయ భూమి కాల్చలేదు" },
        body: {
          en: "Red clay bricks eat the top layer of a field and a great deal of coal. Ours are made from a waste stream that would otherwise sit in an ash pond.",
          te: "ఎర్ర మట్టి ఇటుకలు పొలం పై పొరను, చాలా బొగ్గును తినేస్తాయి. మావి లేకపోతే బూడిద చెరువులో పడి ఉండే వ్యర్థం నుండి తయారవుతాయి.",
        },
      },
    ],

    bricksTitle: { en: "Three bricks", te: "మూడు ఇటుకలు" },
    bricksLede: {
      en: "Two we keep in stock. One we press to order.",
      te: "రెండు ఎప్పుడూ స్టాక్‌లో ఉంటాయి. ఒకటి ఆర్డర్‌పై తయారు చేస్తాము.",
    },
    seeAllBricks: { en: "See full sizes and specifications", te: "పూర్తి కొలతలు మరియు వివరాలు చూడండి" },

    processTitle: { en: "How a brick gets made here", te: "ఇక్కడ ఇటుక ఎలా తయారవుతుంది" },

    trustTitle: { en: "Buying bricks is a matter of trust", te: "ఇటుకలు కొనడం నమ్మకంతో కూడిన విషయం" },
    trustBody: {
      en: "You are ordering a few thousand of something you will never be able to inspect one by one, and then you are building your house out of it. So come and see the yard. Pick up a brick. Drop it. Ask what goes into the mix. The address and the hours are below, and the same man who started this in 2014 will be the one answering.",
      te: "మీరు ఒక్కొక్కటిగా పరిశీలించలేని వస్తువును కొన్ని వేలు ఆర్డర్ చేస్తున్నారు, ఆపై దానితో మీ ఇల్లు కడుతున్నారు. కాబట్టి వచ్చి ప్రాంగణాన్ని చూడండి. ఒక ఇటుక తీసుకోండి. కింద పడేయండి. మిశ్రమంలో ఏమి కలుపుతారో అడగండి. చిరునామా మరియు సమయాలు క్రింద ఉన్నాయి, 2014లో దీన్ని ప్రారంభించిన అదే వ్యక్తి మీకు సమాధానం చెబుతారు.",
    },
  },

  // ── Quality ───────────────────────────────────────────────────────────────
  quality: {
    title: { en: "How we keep the quality steady", te: "నాణ్యతను ఎలా స్థిరంగా ఉంచుతాము" },
    lede: {
      en: "A brick is only as good as the batch it came from. These are the four things that decide whether a batch is worth selling.",
      te: "ఇటుక నాణ్యత అది వచ్చిన బ్యాచ్‌పై ఆధారపడి ఉంటుంది. ఒక బ్యాచ్ అమ్మదగినదా కాదా అని నిర్ణయించే నాలుగు విషయాలు ఇవి.",
    },
    points: [
      {
        title: { en: "The proportion never changes", te: "నిష్పత్తి ఎప్పుడూ మారదు" },
        body: {
          en: "Fly ash, cement, stone dust and gypsum go in by a fixed measure, not by eye. Cutting the cement is the easiest way to make a cheaper brick and the fastest way to lose a customer for good.",
          te: "ఫ్లై యాష్, సిమెంట్, రాతి పొడి మరియు జిప్సం కంటికి కాకుండా నిర్ణీత కొలత ప్రకారం వేస్తాము. సిమెంట్ తగ్గించడం చౌక ఇటుక తయారీకి సులభమైన మార్గం, కస్టమర్‌ను శాశ్వతంగా కోల్పోవడానికి వేగవంతమైన మార్గం.",
        },
      },
      {
        title: { en: "Curing is not hurried", te: "క్యూరింగ్‌లో తొందర లేదు" },
        body: {
          en: "Cement gains strength slowly and it needs water while it does. A brick sold too early looks finished and is not. When stock is short we say so instead of shipping green bricks.",
          te: "సిమెంట్ నెమ్మదిగా బలం పుంజుకుంటుంది, ఆ సమయంలో నీరు కావాలి. తొందరగా అమ్మిన ఇటుక పైకి పూర్తయినట్టు కనిపిస్తుంది, కానీ కాదు. స్టాక్ తక్కువగా ఉంటే పచ్చి ఇటుకలు పంపడం కంటే లేదని చెబుతాము.",
        },
      },
      {
        title: { en: "Broken bricks stay here", te: "పగిలిన ఇటుకలు ఇక్కడే ఉంటాయి" },
        body: {
          en: "Bricks chip in handling. Ours get sorted out at loading rather than counted into your load and discovered at your site.",
          te: "ఎత్తడంలో ఇటుకలు దెబ్బతింటాయి. మావి మీ లోడ్‌లో లెక్కించి మీ స్థలంలో బయటపడే బదులు, లోడింగ్ సమయంలోనే వేరు చేస్తాము.",
        },
      },
      {
        title: { en: "You can test before you buy", te: "కొనే ముందు మీరు పరీక్షించవచ్చు" },
        body: {
          en: "Walk into the yard, pull a brick out of any stack you like, and test it on the spot. We would rather you check than take our word for it.",
          te: "ప్రాంగణంలోకి వచ్చి, మీకు నచ్చిన ఏ కుప్ప నుండైనా ఇటుక తీసి, అక్కడికక్కడే పరీక్షించండి. మా మాట నమ్మడం కంటే మీరు పరీక్షించడమే మాకు ఇష్టం.",
        },
      },
    ],
  },

  // ── Trust and safety ──────────────────────────────────────────────────────
  trust: {
    title: { en: "What we promise, and what we do not claim", te: "మేము ఏమి హామీ ఇస్తాము, ఏమి చెప్పము" },
    lede: {
      en: "Plenty of suppliers will tell you anything to close an order. Here is the line we hold.",
      te: "ఆర్డర్ కోసం ఏదైనా చెప్పే సరఫరాదారులు చాలామంది ఉన్నారు. మేము పాటించే హద్దు ఇది.",
    },
    doTitle: { en: "What you can hold us to", te: "మీరు మమ్మల్ని దేనికి నిలదీయవచ్చు" },
    dont: { en: "What we will not pretend", te: "మేము నటించని విషయాలు" },
    promises: [
      {
        en: "The size you are quoted is the size that arrives. Measure a brick off the truck.",
        te: "మీకు చెప్పిన కొలతే వచ్చే కొలత. ట్రక్కు దిగిన ఇటుకను కొలవండి.",
      },
      {
        en: "The count you pay for is the count you get. Recount at your gate, not ours.",
        te: "మీరు చెల్లించిన లెక్కే మీకు వస్తుంది. మా దగ్గర కాదు, మీ గేటు దగ్గర మళ్ళీ లెక్కించండి.",
      },
      {
        en: "One delivered price, freight included, before the truck leaves. No additions afterwards.",
        te: "ట్రక్కు బయలుదేరే ముందే రవాణాతో కలిపి ఒకే ధర. తర్వాత అదనపు ఖర్చులు ఉండవు.",
      },
      {
        en: "If a load turns up under-cured or badly broken, tell us and we will make it right.",
        te: "లోడ్ సరిగా క్యూర్ కాకుండా లేదా ఎక్కువగా పగిలి వస్తే, చెప్పండి, సరిచేస్తాము.",
      },
    ],
    disclaimers: [
      {
        en: "We are a yard, not a laboratory. Where we have not had a batch tested, we say so rather than print a strength figure we cannot back.",
        te: "మేము ఒక ప్రాంగణం, ప్రయోగశాల కాదు. బ్యాచ్ పరీక్షించనప్పుడు, నిరూపించలేని బలం సంఖ్యను ముద్రించే బదులు అలాగే చెబుతాము.",
      },
      {
        en: "Fly ash bricks are not the right choice for every job. If red clay suits your work better, we will tell you that too.",
        te: "ప్రతి పనికీ ఫ్లై యాష్ ఇటుకలే సరైనవి కావు. మీ పనికి ఎర్ర మట్టి ఇటుక బాగుంటే, అదీ చెబుతాము.",
      },
      {
        en: "Prices move with cement and diesel. We quote fresh instead of publishing a number that quietly goes stale.",
        te: "సిమెంట్ మరియు డీజిల్‌తో ధరలు మారుతాయి. నిశ్శబ్దంగా పాతబడే సంఖ్యను ప్రచురించే బదులు తాజా ధర చెబుతాము.",
      },
    ],
    safetyTitle: { en: "Handling them safely", te: "సురక్షితంగా వాడటం" },
    safety: [
      {
        title: { en: "Wear gloves when laying", te: "పేర్చేటప్పుడు గ్లౌజులు వాడండి" },
        body: {
          en: "Cement is alkaline and dries the skin. This is true of any cement product, ours included.",
          te: "సిమెంట్ క్షారస్వభావం కలది, చర్మాన్ని పొడిగా చేస్తుంది. మావి సహా ఏ సిమెంట్ ఉత్పత్తికైనా ఇది వర్తిస్తుంది.",
        },
      },
      {
        title: { en: "Cut them wet, not dry", te: "పొడిగా కాకుండా తడిపి కోయండి" },
        body: {
          en: "Dry cutting any masonry throws fine silica dust. Wet the brick, or use a mask, or both.",
          te: "ఏ ఇటుకనైనా పొడిగా కోస్తే సన్నని సిలికా ధూళి లేస్తుంది. ఇటుకను తడపండి, లేదా మాస్క్ వాడండి, లేదా రెండూ.",
        },
      },
      {
        title: { en: "Stack no higher than head height", te: "తల ఎత్తు కంటే ఎక్కువ పేర్చవద్దు" },
        body: {
          en: "These bricks are dense and heavy. A stack that topples on a site is the most likely accident there is.",
          te: "ఈ ఇటుకలు దట్టంగా, బరువుగా ఉంటాయి. స్థలంలో కుప్ప కూలిపోవడమే అత్యంత సాధారణ ప్రమాదం.",
        },
      },
      {
        title: { en: "Wet the brick before laying", te: "పేర్చే ముందు ఇటుకను తడపండి" },
        body: {
          en: "A dry brick pulls water out of the mortar and weakens the joint. This is the one habit that matters most when switching from red clay.",
          te: "పొడి ఇటుక మోర్టార్ నుండి నీటిని లాగి కీలును బలహీనపరుస్తుంది. ఎర్ర మట్టి నుండి మారేటప్పుడు అత్యంత ముఖ్యమైన అలవాటు ఇదే.",
        },
      },
    ],
  },

  // ── Customers ─────────────────────────────────────────────────────────────
  testimonials: {
    title: { en: "What our customers say", te: "మా కస్టమర్లు ఏమంటున్నారు" },
    lede: {
      en: "Words from people who have built with these bricks.",
      te: "ఈ ఇటుకలతో నిర్మించిన వారి మాటలు.",
    },
    // Shown while there are no verified testimonials on file. Saying plainly
    // that nothing is here yet is worth more than any invented quote.
    emptyTitle: { en: "We would rather show you nothing than show you something invented", te: "కల్పితమైనది చూపించే కంటే ఏమీ చూపించకపోవడమే మేలు" },
    emptyBody: {
      en: "Plenty of sites fill this space with quotes nobody ever said. We have chosen to leave it empty until real customers put their names to their words. In the meantime, ask us for the phone number of somebody who has bought from us and go and ask them yourself. That is a better reference than anything we could print here.",
      te: "చాలా వెబ్‌సైట్లు ఈ చోటును ఎవరూ చెప్పని మాటలతో నింపుతాయి. నిజమైన కస్టమర్లు తమ పేరుతో మాట్లాడేవరకు దీన్ని ఖాళీగా ఉంచాలని మేము నిర్ణయించుకున్నాము. ఈలోగా, మా దగ్గర కొన్నవారి ఫోన్ నంబర్ అడిగి, మీరే వారిని అడగండి. మేము ఇక్కడ రాసే దేనికంటే అది మంచి సిఫారసు.",
    },
    askForRefs: { en: "Ask for a customer reference", te: "కస్టమర్ రిఫరెన్స్ అడగండి" },
    // Prompt shown to past buyers.
    leaveTitle: { en: "Bought from us before?", te: "గతంలో మా దగ్గర కొన్నారా?" },
    leaveBody: {
      en: "Send us a line about how the bricks held up. With your permission we will put it on this page, with your name and your village.",
      te: "ఇటుకలు ఎలా పనిచేశాయో ఒక మాట పంపండి. మీ అనుమతితో మీ పేరు, ఊరుతో సహా ఈ పేజీలో పెడతాము.",
    },
    leaveCta: { en: "Send your experience", te: "మీ అనుభవం పంపండి" },
    built: { en: "Built", te: "నిర్మించినది" },
  },

  // ── Bricks page ───────────────────────────────────────────────────────────
  bricks: {
    h1: { en: "Our Bricks", te: "మా ఇటుకలు" },
    lede: {
      en: "Solid fly ash cement bricks in three sizes. Every dimension below is the size the brick actually comes out of the press, not a nominal size with the mortar joint added in.",
      te: "మూడు కొలతలలో సాలిడ్ ఫ్లై యాష్ సిమెంట్ ఇటుకలు. క్రింద ఉన్న ప్రతి కొలత ఇటుక ప్రెస్ నుండి వచ్చే వాస్తవ కొలత, మోర్టార్ కీలు కలిపిన నామమాత్రపు కొలత కాదు.",
    },
    dimensions: { en: "Dimensions", te: "కొలతలు" },
    length: { en: "Length", te: "పొడవు" },
    width: { en: "Width", te: "వెడల్పు" },
    height: { en: "Height", te: "ఎత్తు" },
    bestFor: { en: "Best for", te: "దేనికి అనుకూలం" },
    perTruck: { en: "Per truck load", te: "ఒక ట్రక్కుకు" },
    bricksUnit: { en: "bricks", te: "ఇటుకలు" },
    madeToOrder: { en: "Pressed to order", te: "ఆర్డర్‌పై తయారీ" },
    madeToOrderNote: {
      en: "Not kept in stock. Tell us how many and when, and we will press them for you.",
      te: "స్టాక్‌లో ఉంచము. ఎన్ని, ఎప్పుడు కావాలో చెప్పండి, మీ కోసం తయారు చేస్తాము.",
    },
    priceNote: {
      en: "Prices move with cement and freight, so we quote them fresh rather than print a number that goes stale. Send the size, the quantity and your village, and you will get a price the same day.",
      te: "సిమెంట్ మరియు రవాణా ఖర్చులతో ధరలు మారుతుంటాయి, కాబట్టి పాతబడిపోయే సంఖ్యను ముద్రించడం కంటే తాజా ధర చెబుతాము. కొలత, పరిమాణం మరియు మీ ఊరు పంపండి, అదే రోజు ధర తెలుస్తుంది.",
    },
    calcTitle: { en: "How many bricks do I need?", te: "నాకు ఎన్ని ఇటుకలు కావాలి?" },
    calcLede: {
      en: "Enter the wall area and we will work out the count, including a 5 percent allowance for breakage and cutting.",
      te: "గోడ విస్తీర్ణం ఇవ్వండి, పగుళ్ళు మరియు కటింగ్ కోసం 5 శాతం కలిపి లెక్క చెబుతాము.",
    },
    calcArea: { en: "Wall area", te: "గోడ విస్తీర్ణం" },
    calcSqft: { en: "square feet", te: "చదరపు అడుగులు" },
    calcResult: { en: "bricks, approximately", te: "ఇటుకలు, సుమారుగా" },
    calcTrucks: { en: "truck loads", te: "ట్రక్కు లోడ్లు" },
    calcDisclaimer: {
      en: "An estimate to help you plan, not a quotation. Openings for doors and windows will bring it down.",
      te: "ప్రణాళిక కోసం అంచనా మాత్రమే, కొటేషన్ కాదు. తలుపులు మరియు కిటికీల ఖాళీలు దీన్ని తగ్గిస్తాయి.",
    },
  },

  // ── Why fly ash ───────────────────────────────────────────────────────────
  why: {
    h1: { en: "Why Fly Ash", te: "ఫ్లై యాష్ ఎందుకు" },
    lede: {
      en: "The honest comparison between a pressed fly ash brick and a kiln-fired red clay brick, including the places where red clay still wins.",
      te: "ఒత్తిడితో తయారైన ఫ్లై యాష్ ఇటుక మరియు బట్టీలో కాల్చిన ఎర్ర మట్టి ఇటుక మధ్య నిజాయితీ పోలిక, ఎర్ర మట్టి ఇంకా గెలిచే చోట్లతో సహా.",
    },
    tableTitle: { en: "Side by side", te: "పక్కపక్కన" },
    colFly: { en: "Fly ash cement brick", te: "ఫ్లై యాష్ సిమెంట్ ఇటుక" },
    colClay: { en: "Kiln-fired red clay brick", te: "బట్టీలో కాల్చిన ఎర్ర ఇటుక" },

    fairTitle: { en: "Where red clay still wins", te: "ఎర్ర మట్టి ఇంకా ఎక్కడ గెలుస్తుంది" },
    fairBody: {
      en: "We are not going to pretend otherwise. A fly ash brick has a smoother face, so mortar grips it less readily than it grips a rough clay brick. Masons should use a 1:4 cement and sand mix rather than a leaner one, and wet the brick before laying. If your mason has spent thirty years on red clay, give him the first hundred bricks to get the feel. And for exposed brickwork where you want that red face on show, clay is the one you want.",
      te: "మేము దాచిపెట్టము. ఫ్లై యాష్ ఇటుక ముఖం నునుపుగా ఉంటుంది, కాబట్టి గరుకైన మట్టి ఇటుకకు పట్టినంత సులభంగా మోర్టార్ దీనికి పట్టదు. మేస్త్రీలు పలుచని మిశ్రమం కాకుండా 1:4 సిమెంట్ ఇసుక వాడాలి, ఇటుకను తడిపి పేర్చాలి. మీ మేస్త్రీ ముప్పై ఏళ్ళు ఎర్ర ఇటుకతో పనిచేసి ఉంటే, అలవాటు కావడానికి మొదటి వంద ఇటుకలు ఇవ్వండి. బయటికి కనిపించే ఇటుక పని కోసం ఆ ఎరుపు రంగు కావాలంటే, మట్టి ఇటుకే సరైనది.",
    },

    standardTitle: { en: "The standard these are measured against", te: "వీటిని కొలిచే ప్రమాణం" },
    standardBody: {
      en: "Fly ash bricks in India are specified under IS 12894:2002. It sets the compressive strength classes, caps water absorption at 20 percent by weight for the common classes, and limits efflorescence. It is worth knowing the numbers before you buy from anyone, including us.",
      te: "భారతదేశంలో ఫ్లై యాష్ ఇటుకలు IS 12894:2002 కింద నిర్దేశించబడ్డాయి. ఇది కంప్రెసివ్ స్ట్రెంత్ తరగతులను నిర్ణయిస్తుంది, సాధారణ తరగతులకు నీటి శోషణను బరువులో 20 శాతానికి పరిమితం చేస్తుంది, మరియు ఎఫ్లోరిసెన్స్‌ను నియంత్రిస్తుంది. మా దగ్గర సహా ఎవరి దగ్గర కొన్నా, కొనే ముందు ఈ సంఖ్యలు తెలుసుకోవడం మంచిది.",
    },
    standardNote: {
      en: "These are the requirements the standard sets for this class of brick. Ask any supplier, including us, for a test report before a large order.",
      te: "ఈ తరగతి ఇటుకకు ప్రమాణం నిర్ణయించిన అవసరాలు ఇవి. పెద్ద ఆర్డర్ ముందు మమ్మల్ని సహా ఏ సరఫరాదారునైనా పరీక్ష నివేదిక అడగండి.",
    },
    maxAbsorption: { en: "Max water absorption", te: "గరిష్ట నీటి శోషణ" },
    howToCheckTitle: { en: "How to check a brick yourself", te: "ఇటుకను మీరే ఎలా పరీక్షించాలి" },
    howToCheckLede: {
      en: "Four things you can do standing in any brick yard, with no equipment. They work on our bricks and on everybody else's.",
      te: "ఏ ఇటుక ప్రాంగణంలోనైనా నిలబడి, ఎలాంటి పరికరాలు లేకుండా చేయగల నాలుగు పనులు. ఇవి మా ఇటుకలపైనా, ఇతరులందరి ఇటుకలపైనా పనిచేస్తాయి.",
    },
  },

  // ── Delivery ──────────────────────────────────────────────────────────────
  delivery: {
    h1: { en: "Delivery", te: "డెలివరీ" },
    lede: {
      en: "Take them yourself or let us bring them. Both are fine by us.",
      te: "మీరే తీసుకెళ్ళండి లేదా మేము తెచ్చిస్తాము. రెండూ మాకు సమ్మతమే.",
    },
    loadsTitle: { en: "What fits on a truck", te: "ఒక ట్రక్కులో ఎన్ని పడతాయి" },
    perTruckUnit: { en: "bricks per truck load", te: "ఒక ట్రక్కుకు ఇటుకలు" },
    calcHint: {
      en: "Working out how many loads your wall needs? The calculator on the bricks page turns wall area into a brick count and a number of truck loads.",
      te: "మీ గోడకు ఎన్ని లోడ్లు కావాలో తెలుసుకోవాలా? ఇటుకల పేజీలోని కాలిక్యులేటర్ గోడ విస్తీర్ణాన్ని ఇటుకల సంఖ్యగా, ట్రక్కు లోడ్లుగా మారుస్తుంది.",
    },
    leadTitle: { en: "How long it takes", te: "ఎంత సమయం పడుతుంది" },
    leadBody: {
      en: "We try to reach you within one to two days of your request. If you need a specific day because a slab pour or a mason is booked, say so when you ask, and we will tell you honestly whether we can make it.",
      te: "మీరు అడిగిన ఒకటి రెండు రోజుల్లో చేరుకోవడానికి ప్రయత్నిస్తాము. స్లాబ్ వేయడం లేదా మేస్త్రీ బుక్ చేసి ఉండటం వల్ల మీకు ఒక నిర్దిష్ట రోజు కావాలంటే, అడిగేటప్పుడే చెప్పండి, మేము చేయగలమో లేదో నిజం చెబుతాము.",
    },
    days: { en: "days", te: "రోజులు" },
    everyDay: { en: "every day", te: "ప్రతిరోజూ" },
    chargesTitle: { en: "Delivery charges", te: "డెలివరీ ఛార్జీలు" },
    chargesBody: {
      en: "Charged by distance from the yard. Ask for the delivered price rather than the yard price so there is no surprise at the end. Tell us your village and we will give you one number that includes the freight.",
      te: "ప్రాంగణం నుండి దూరాన్ని బట్టి ఛార్జీ. చివర్లో ఆశ్చర్యం లేకుండా ఉండాలంటే ప్రాంగణం ధర కాదు, డెలివరీ ధర అడగండి. మీ ఊరు చెప్పండి, రవాణాతో కలిపి ఒకే సంఖ్య చెబుతాము.",
    },
    pickupTitle: { en: "Self pick-up", te: "మీరే తీసుకెళ్ళడం" },
    pickupBody: {
      en: "Bring your own vehicle any day between 6 AM and 9 PM. Loading help is available at the yard.",
      te: "ఏ రోజైనా ఉదయం 6 నుండి రాత్రి 9 మధ్య మీ వాహనం తీసుకురండి. ప్రాంగణంలో లోడింగ్ సహాయం ఉంటుంది.",
    },
  },

  // ── Visit ─────────────────────────────────────────────────────────────────
  visit: {
    h1: { en: "Visit Us", te: "మమ్మల్ని సందర్శించండి" },
    lede: {
      en: "Come and look at the bricks before you order. That is the whole point of buying local.",
      te: "ఆర్డర్ చేసే ముందు వచ్చి ఇటుకలు చూడండి. స్థానికంగా కొనడంలో అసలు ఉద్దేశం అదే.",
    },
    addressTitle: { en: "Address", te: "చిరునామా" },
    hoursTitle: { en: "Working hours", te: "పని వేళలు" },
    contactTitle: { en: "Talk to us", te: "మాతో మాట్లాడండి" },
    contactBody: {
      en: "WhatsApp is quickest. Send the brick type, how many, and your village, and you will get a price back. If you would rather talk, call.",
      te: "వాట్సాప్ అత్యంత వేగవంతం. ఇటుక రకం, ఎన్ని కావాలి, మీ ఊరు పంపండి, ధర తిరిగి వస్తుంది. మాట్లాడాలనుకుంటే, కాల్ చేయండి.",
    },
    mapTitle: { en: "Find the yard", te: "ప్రాంగణాన్ని కనుగొనండి" },
  },

  // ── Quote composer ────────────────────────────────────────────────────────
  quote: {
    title: { en: "Ask for a price", te: "ధర అడగండి" },
    lede: {
      en: "Fill this in and it opens WhatsApp with your message ready. Nothing is stored on this website.",
      te: "దీన్ని పూరించండి, మీ సందేశంతో వాట్సాప్ తెరుచుకుంటుంది. ఈ వెబ్‌సైట్‌లో ఏమీ నిల్వ చేయబడదు.",
    },
    fName: { en: "Your name", te: "మీ పేరు" },
    fBrick: { en: "Which brick", te: "ఏ ఇటుక" },
    fQty: { en: "How many", te: "ఎన్ని కావాలి" },
    fPlace: { en: "Your village or town", te: "మీ ఊరు లేదా పట్టణం" },
    fNeed: { en: "When do you need them", te: "ఎప్పుడు కావాలి" },
    fNotes: { en: "Anything else (optional)", te: "ఇంకేమైనా (ఐచ్ఛికం)" },
    notSure: { en: "Not sure yet", te: "ఇంకా ఖచ్చితంగా తెలియదు" },
    send: { en: "Open WhatsApp", te: "వాట్సాప్ తెరవండి" },
    orCall: { en: "or call", te: "లేదా కాల్ చేయండి" },
    msgIntro: {
      en: "Hello, I would like a price for fly ash bricks.",
      te: "నమస్కారం, ఫ్లై యాష్ ఇటుకల ధర కావాలి.",
    },
    msgRef: {
      en: "Hello, could you share the number of a customer who has bought from you?",
      te: "నమస్కారం, మీ దగ్గర కొన్న ఒక కస్టమర్ నంబర్ ఇవ్వగలరా?",
    },
    msgReview: {
      en: "Hello, I bought bricks from you and would like to share my experience.",
      te: "నమస్కారం, నేను మీ దగ్గర ఇటుకలు కొన్నాను, నా అనుభవం పంచుకోవాలనుకుంటున్నాను.",
    },
  },

  // ── FAQ ───────────────────────────────────────────────────────────────────
  faq: {
    title: { en: "Questions people ask", te: "ప్రజలు అడిగే ప్రశ్నలు" },
    lede: {
      en: "The things we get asked on the phone most days.",
      te: "దాదాపు ప్రతిరోజూ ఫోన్‌లో మమ్మల్ని అడిగే విషయాలు.",
    },
  },

  // ── 404 ───────────────────────────────────────────────────────────────────
  notFound: {
    h1: { en: "This page is not here", te: "ఈ పేజీ ఇక్కడ లేదు" },
    body: {
      en: "The link may be old, or we may have moved it. Here is everything on the site.",
      te: "లింక్ పాతది కావచ్చు, లేదా మేము దాన్ని మార్చి ఉండవచ్చు. సైట్‌లో ఉన్నవన్నీ ఇక్కడ ఉన్నాయి.",
    },
  },

  footer: {
    builtBy: { en: "Site by", te: "సైట్ రూపకల్పన" },
    rights: { en: "All rights reserved.", te: "అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి." },
  },
} as const;

/** The four-step process. */
export const PROCESS: { n: string; title: T; body: T }[] = [
  {
    n: "01",
    title: { en: "The mix", te: "మిశ్రమం" },
    body: {
      en: "Fly ash, cement, stone dust and gypsum go into the pan mixer in a fixed proportion with water. Get the proportion wrong and the brick is worthless, so this is the step nobody rushes.",
      te: "ఫ్లై యాష్, సిమెంట్, రాతి పొడి మరియు జిప్సం నీటితో కలిపి నిర్ణీత నిష్పత్తిలో పాన్ మిక్సర్‌లోకి వెళ్తాయి. నిష్పత్తి తప్పితే ఇటుక పనికిరాదు, కాబట్టి ఈ దశలో ఎవరూ తొందరపడరు.",
    },
  },
  {
    n: "02",
    title: { en: "The press", te: "ప్రెస్" },
    body: {
      en: "The mix is filled into steel moulds and compacted under hydraulic pressure with vibration. Pressure is what gives the brick its density and its sharp edges. There is no fire anywhere in this process.",
      te: "మిశ్రమాన్ని ఉక్కు మూసల్లో నింపి, కంపనంతో పాటు హైడ్రాలిక్ ఒత్తిడితో గట్టిపరుస్తారు. ఇటుకకు సాంద్రత మరియు పదునైన అంచులు ఇచ్చేది ఈ ఒత్తిడే. ఈ ప్రక్రియలో ఎక్కడా మంట ఉండదు.",
    },
  },
  {
    n: "03",
    title: { en: "The curing", te: "క్యూరింగ్" },
    body: {
      en: "Green bricks come off the machine and are laid out in rows in the open. They are watered for days while the cement hydrates and takes up strength. This is slow and it cannot be hurried.",
      te: "యంత్రం నుండి వచ్చిన పచ్చి ఇటుకలను బయట వరుసలుగా పరుస్తారు. సిమెంట్ గట్టిపడి బలం పుంజుకునేవరకు రోజుల తరబడి నీరు పోస్తారు. ఇది నెమ్మదైన ప్రక్రియ, తొందరపెట్టలేము.",
    },
  },
  {
    n: "04",
    title: { en: "The stack", te: "పేర్చడం" },
    body: {
      en: "Cured bricks are stacked and counted, ready to load. What you see in the yard is finished stock, and you are welcome to pick any brick out of any stack and test it.",
      te: "ఆరిన ఇటుకలను పేర్చి, లెక్కించి, లోడ్ చేయడానికి సిద్ధం చేస్తారు. ప్రాంగణంలో మీరు చూసేది పూర్తయిన సరుకు, ఏ కుప్ప నుండైనా ఏ ఇటుకనైనా తీసి పరీక్షించవచ్చు.",
    },
  },
];

/** Fly ash vs red clay. `advantage` drives the emphasis, not a "winner" badge. */
export const COMPARISON: { feature: T; fly: T; clay: T; advantage: "fly" | "clay" | "even" }[] = [
  {
    feature: { en: "Made by", te: "తయారీ విధానం" },
    fly: { en: "Hydraulic pressing, cured in air", te: "హైడ్రాలిక్ ఒత్తిడి, గాలిలో క్యూరింగ్" },
    clay: { en: "Moulding, then fired in a kiln", te: "మూస, తర్వాత బట్టీలో కాల్చడం" },
    advantage: "even",
  },
  {
    feature: { en: "Raw material", te: "ముడి పదార్థం" },
    fly: { en: "Power-station fly ash, cement, stone dust", te: "విద్యుత్ కేంద్రం ఫ్లై యాష్, సిమెంట్, రాతి పొడి" },
    clay: { en: "Agricultural topsoil", te: "వ్యవసాయ పైమట్టి" },
    advantage: "fly",
  },
  {
    feature: { en: "Size consistency", te: "కొలత స్థిరత్వం" },
    fly: { en: "High, same mould and same pressure every time", te: "ఎక్కువ, ప్రతిసారీ ఒకే మూస, ఒకే ఒత్తిడి" },
    clay: { en: "Varies, bricks warp in the kiln", te: "మారుతుంది, బట్టీలో వంకరపోతాయి" },
    advantage: "fly",
  },
  {
    feature: { en: "Mortar and plaster used", te: "మోర్టార్ మరియు ప్లాస్టర్ వాడకం" },
    fly: { en: "Less, flat faces allow thin joints", te: "తక్కువ, చదునైన ముఖాలతో సన్నని కీళ్ళు" },
    clay: { en: "More, uneven faces need levelling", te: "ఎక్కువ, అసమాన ముఖాలను సమం చేయాలి" },
    advantage: "fly",
  },
  {
    feature: { en: "Water absorption", te: "నీటి శోషణ" },
    fly: { en: "Lower", te: "తక్కువ" },
    clay: { en: "Higher, so more risk of damp", te: "ఎక్కువ, తేమ ప్రమాదం ఎక్కువ" },
    advantage: "fly",
  },
  {
    feature: { en: "Mortar grip", te: "మోర్టార్ పట్టు" },
    fly: { en: "Smoother face. Use a 1:4 mix and wet before laying", te: "నునుపు ముఖం. 1:4 మిశ్రమం వాడి, తడిపి పేర్చండి" },
    clay: { en: "Rough face grips readily", te: "గరుకు ముఖం సులభంగా పడుతుంది" },
    advantage: "clay",
  },
  {
    feature: { en: "Exposed brickwork look", te: "బయటికి కనిపించే ఇటుక పని" },
    fly: { en: "Grey, so usually plastered", te: "బూడిద రంగు, సాధారణంగా ప్లాస్టర్ చేస్తారు" },
    clay: { en: "The red face people want on show", te: "బయటికి కనిపించాలనుకునే ఎరుపు రంగు" },
    advantage: "clay",
  },
  {
    feature: { en: "Fuel burnt to make it", te: "తయారీకి కాల్చే ఇంధనం" },
    fly: { en: "None", te: "ఏమీ లేదు" },
    clay: { en: "Coal or firewood, for days", te: "బొగ్గు లేదా కట్టెలు, రోజుల తరబడి" },
    advantage: "fly",
  },
];

/** Practical field tests a buyer can run on any brick, from any supplier. */
export const FIELD_TESTS: { title: T; body: T }[] = [
  {
    title: { en: "The drop test", te: "పడేసే పరీక్ష" },
    body: {
      en: "Drop a brick flat from about waist height onto hard ground. A sound brick survives or chips at a corner. A weak one breaks into pieces.",
      te: "నడుము ఎత్తు నుండి గట్టి నేలపై ఇటుకను చదునుగా పడేయండి. మంచి ఇటుక తట్టుకుంటుంది లేదా మూలలో చిన్న ముక్క ఊడుతుంది. బలహీనమైనది ముక్కలవుతుంది.",
    },
  },
  {
    title: { en: "The scratch test", te: "గీత పరీక్ష" },
    body: {
      en: "Run a fingernail hard across the face. It should leave nothing. If it leaves a groove, the brick is under-cured or short on cement.",
      te: "గోటితో ముఖం మీద గట్టిగా గీయండి. ఏమీ కనిపించకూడదు. గాడి పడితే, ఇటుక సరిగా క్యూర్ కాలేదు లేదా సిమెంట్ తక్కువ.",
    },
  },
  {
    title: { en: "The two-brick ring", te: "రెండు ఇటుకల శబ్దం" },
    body: {
      en: "Strike two bricks together. A well-cured brick gives a clear ring. A dull thud means moisture still inside.",
      te: "రెండు ఇటుకలను ఒకదానికొకటి కొట్టండి. బాగా క్యూర్ అయిన ఇటుక స్పష్టమైన శబ్దం ఇస్తుంది. మెత్తని శబ్దం అంటే లోపల ఇంకా తేమ ఉంది.",
    },
  },
  {
    title: { en: "The soak test", te: "నానబెట్టే పరీక్ష" },
    body: {
      en: "Weigh a brick dry, soak it in water for 24 hours, then weigh it again. Under IS 12894 the gain should not exceed 20 percent of the dry weight for the common classes.",
      te: "పొడి ఇటుకను తూకం వేయండి, 24 గంటలు నీటిలో నానబెట్టి, మళ్ళీ తూకం వేయండి. IS 12894 ప్రకారం సాధారణ తరగతులకు పెరుగుదల పొడి బరువులో 20 శాతం మించకూడదు.",
    },
  },
];

/**
 * FAQ, rendered visibly AND emitted as FAQPage structured data.
 *
 * Google requires the answer to be visible on the page it is marked up on, so
 * these live here in one place and both the <VRFFaq> component and the
 * page-level JSON-LD read from the same array. Never emit an FAQ in schema
 * that is not on screen.
 */
export const FAQ: { q: T; a: T; pages: ("home" | "bricks" | "why" | "delivery")[] }[] = [
  {
    q: { en: "Where can I buy fly ash bricks in Kavali?", te: "కావలిలో ఫ్లై యాష్ ఇటుకలు ఎక్కడ కొనాలి?" },
    a: {
      en: "At our yard on Thummalapenta Road, Kavali, Andhra Pradesh 524203, in SPSR Nellore district. We have been pressing bricks there since 2014 and the yard is open every day from 6 AM to 9 PM.",
      te: "కావలిలో తుమ్మలపెంట రోడ్డులోని మా ప్రాంగణంలో, ఆంధ్రప్రదేశ్ 524203. 2014 నుండి అక్కడ ఇటుకలు తయారు చేస్తున్నాము, ప్రతిరోజూ ఉదయం 6 నుండి రాత్రి 9 వరకు తెరిచి ఉంటుంది.",
    },
    pages: ["home"],
  },
  {
    q: { en: "How much do fly ash bricks cost?", te: "ఫ్లై యాష్ ఇటుకల ధర ఎంత?" },
    a: {
      en: "Prices move with cement and diesel, so we quote fresh instead of publishing a number that goes stale. Send the brick size, the quantity and your village on WhatsApp and you will get a delivered price the same day.",
      te: "సిమెంట్ మరియు డీజిల్‌తో ధరలు మారుతాయి, కాబట్టి పాతబడే సంఖ్యను ప్రచురించే బదులు తాజా ధర చెబుతాము. ఇటుక కొలత, పరిమాణం మరియు మీ ఊరు వాట్సాప్‌లో పంపండి, అదే రోజు డెలివరీ ధర తెలుస్తుంది.",
    },
    pages: ["home", "bricks"],
  },
  {
    q: { en: "What sizes do you make?", te: "మీరు ఏ కొలతలు తయారు చేస్తారు?" },
    a: {
      en: "Three solid sizes, all 11 inches long: 11 by 5.5 by 7 inches for load-bearing walls, 11 by 4 by 7 inches for partition walls, and an 11 by 5.5 by 9 inch Mega brick pressed to order.",
      te: "మూడు సాలిడ్ కొలతలు, అన్నీ 11 అంగుళాల పొడవు: బరువు మోసే గోడలకు 11 x 5.5 x 7 అంగుళాలు, పార్టిషన్ గోడలకు 11 x 4 x 7 అంగుళాలు, ఆర్డర్‌పై తయారయ్యే 11 x 5.5 x 9 అంగుళాల మెగా ఇటుక.",
    },
    pages: ["home", "bricks"],
  },
  {
    q: { en: "How many bricks fit on a truck?", te: "ఒక ట్రక్కులో ఎన్ని ఇటుకలు పడతాయి?" },
    a: {
      en: "About 400 of the 11 by 5.5 by 7 inch bricks, and about 500 of the smaller 11 by 4 by 7 inch bricks.",
      te: "11 x 5.5 x 7 అంగుళాల ఇటుకలు సుమారు 400, చిన్నవైన 11 x 4 x 7 అంగుళాల ఇటుకలు సుమారు 500.",
    },
    pages: ["home", "delivery"],
  },
  {
    q: { en: "Do you deliver, and how long does it take?", te: "మీరు డెలివరీ చేస్తారా, ఎంత సమయం పడుతుంది?" },
    a: {
      en: "Yes. Delivery is usually within one to two days of the request. Charges depend on distance from the yard. Self pick-up is welcome any day between 6 AM and 9 PM.",
      te: "అవును. సాధారణంగా అడిగిన ఒకటి రెండు రోజుల్లో డెలివరీ. ప్రాంగణం నుండి దూరాన్ని బట్టి ఛార్జీలు. ఏ రోజైనా ఉదయం 6 నుండి రాత్రి 9 మధ్య మీరే వచ్చి తీసుకెళ్ళవచ్చు.",
    },
    pages: ["home", "delivery"],
  },
  {
    q: { en: "Are fly ash bricks as strong as red clay bricks?", te: "ఫ్లై యాష్ ఇటుకలు ఎర్ర ఇటుకలంత బలంగా ఉంటాయా?" },
    a: {
      en: "Yes. Fly ash bricks in India are specified under IS 12894:2002, which sets compressive strength classes such as Class 7.5 and Class 10 in newtons per square millimetre. Red clay brick strength varies widely with the clay and the firing, from about 5 to 40.",
      te: "అవును. భారతదేశంలో ఫ్లై యాష్ ఇటుకలు IS 12894:2002 కింద నిర్దేశించబడ్డాయి, ఇది క్లాస్ 7.5, క్లాస్ 10 వంటి బలం తరగతులను నిర్ణయిస్తుంది. ఎర్ర మట్టి ఇటుక బలం మట్టి, కాల్చే విధానాన్ని బట్టి సుమారు 5 నుండి 40 వరకు మారుతుంది.",
    },
    pages: ["why"],
  },
  {
    q: { en: "What is the disadvantage of fly ash bricks?", te: "ఫ్లై యాష్ ఇటుకల లోపం ఏమిటి?" },
    a: {
      en: "The face is smoother than a rough clay brick, so mortar grips it less readily. Use a 1:4 cement to sand mortar rather than a leaner mix, and wet the bricks before laying. They are also grey, so they are usually plastered rather than left as exposed brickwork.",
      te: "గరుకైన మట్టి ఇటుక కంటే ముఖం నునుపుగా ఉంటుంది, కాబట్టి మోర్టార్ అంత సులభంగా పట్టదు. పలుచని మిశ్రమం కాకుండా 1:4 సిమెంట్ ఇసుక వాడండి, పేర్చే ముందు ఇటుకలు తడపండి. బూడిద రంగులో ఉంటాయి కాబట్టి సాధారణంగా ప్లాస్టర్ చేస్తారు.",
    },
    pages: ["why"],
  },
  {
    q: { en: "Can I see the bricks before I order?", te: "ఆర్డర్ ముందు ఇటుకలు చూడవచ్చా?" },
    a: {
      en: "Please do. Come to the yard any day between 6 AM and 9 PM, pull a brick out of any stack, and test it on the spot. We would rather you check than take our word for it.",
      te: "తప్పకుండా. ఏ రోజైనా ఉదయం 6 నుండి రాత్రి 9 మధ్య ప్రాంగణానికి రండి, ఏ కుప్ప నుండైనా ఇటుక తీసి అక్కడికక్కడే పరీక్షించండి. మా మాట నమ్మడం కంటే మీరు పరీక్షించడమే మాకు ఇష్టం.",
    },
    pages: ["home"],
  },
];
