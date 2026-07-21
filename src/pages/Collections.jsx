import { useState, useEffect, useRef, useMemo } from "react";

const GARMENT_IMAGE_POOLS = {
  // ── MEN ────────────────────────────────────────────────────
  Blazer: [
    "photo-1507679799987-c73779587ccf", // Classic structured blazer
    "photo-1617137968427-85924c800a22", // Men's fashion suit blazer
    "photo-1593030761757-71fae45fa0e7", // Tailored fit business blazer
    "photo-1594938298603-c8148c4b29ef", // Casual check/patterned blazer
    "photo-1621570168297-40734ec08be5", // Premium linen blend blazer
    "photo-1550246140-29f40b909e5a", // Double breasted jacket blazer
    "photo-1585233954799-7b4f1b57e0fc", // Modern textured sport coat
    "photo-1618886614638-80e3c103d31a", // Deep Navy blue wool blazer
  ],
  Trousers: [
    "photo-1624378439575-d8705ad7ae80", // Slim fit beige trousers
    "photo-1602810318383-e386cc2a3ccf", // Dark grey tailored trousers
    "photo-1506794778202-cad84cf45f1d", // Modern pleat formal trousers
    "photo-1490367532201-b9bc1dc483f6", // Smart casual khaki chinos trousers
    "photo-1552374196-1ab2a1c593e8", // Clean light grey flannel trousers
    "photo-1594633312681-425c7b97ccd1", // Cropped modern cut suit trousers
    "photo-1519085360753-af0119f7cbe7", // Pinstripe classic dress trousers
    "photo-1598033129183-c4f50c736f10", // Elegant dark charcoal trousers
  ],
  Overcoat: [
    "photo-1519062522084-6ed35a8c9573", // Double-breasted camel overcoat
    "photo-1520975954732-e97dbb9eab44", // Long wool charcoal winter coat
    "photo-1609132718484-cc90df3417f8", // Modern beige minimal overcoat
    "photo-1578681994506-b8f463449011", // Sleek black leather trench-overcoat
    "photo-1544923246-77307dd654cb", // Structured premium wool trench coat
    "photo-1521223890158-f9f7c3d5d504", // Casual winter heavy overcoat
    "photo-1511499767150-a48a237f0083", // Minimalist clean drape duster coat
    "photo-1539185441755-769473a23570", // Heavy olive luxury overcoat
  ],
  "Chelsea Boot": [
    "photo-1608256246200-53e635b5b65f", // Premium tan suede Chelsea boots
    "photo-1603808033176-9d134e6f2df5", // Classic black leather Chelsea boots
    "photo-1520639888713-7851133b1ed0", // Clean dress boots Chelsea style
    "photo-1551107696-a4b0c5a0d9a2", // Dark brown nubuck Chelsea boots
    "photo-1585386959984-a4155224a1ad", // Polished dress leather boots
    "photo-1560343090-f0409e92791a", // Structured urban high-top boot
    "photo-1549298916-b41d501d3772", // Minimalist raw leather ankle boots
    "photo-1613688190779-cb295286a6c4", // Vintage distressed Chelsea boots
  ],
  "Utility Vest": [
    "photo-1614975058789-41316d0e2e9c", // Multi-pocket technical vest
    "photo-1598300042247-d088f8ab3a91", // Minimal canvas tactical vest
    "photo-1534030347209-467a5b0ad3e6", // Tailored premium waist vest
    "photo-1608231387042-66d1773070a5", // Modern nylon pocketed travel vest
    "photo-1604176354204-9268737828e4", // Clean street fashion utility gilet
    "photo-1480074568708-e7b720bb3f09", // Warm down-feathered padded vest
    "photo-1555069519-127aadecd47a", // Technical utility gilet in black
    "photo-1588850561407-ed78c282e89b", // Outdoors hunting and utility vest
  ],
  "Oxford Shirt": [
    "photo-1602810316498-ab67cf68c8e1", // Classic crisp white Oxford shirt
    "photo-1598033129183-c4f50c736f10", // Tailored light blue button-down shirt
    "photo-1603252109303-2751441dd157", // Clean smart button-up shirt
    "photo-1585487000160-6ebcfceb0d03", // Textured cotton Oxford dress shirt
    "photo-1569456537638-23e196b7bacc", // Modern casual linen blend shirt
    "photo-1589310243389-96a5483213a8", // Striped casual premium Oxford shirt
    "photo-1571945153237-4929e783af4a", // Slim fit luxury office dress shirt
    "photo-1621570168297-40734ec08be5", // Oatmeal neutral collar dress shirt
  ],
  "Knit Polo": [
    "photo-1565693413579-8ff3fdc1b03b", // Textured weave premium knit polo
    "photo-1556821840-3a63f15732ce", // Earthy green casual knit polo
    "photo-1503341504253-dff4815485f1", // Sleek dark brown fitted knit polo
    "photo-1611312449408-fcece27cdbb7", // Charcoal grey soft wool polo
    "photo-1516826957135-700dedea698c", // Minimalist high-end retro knit shirt
    "photo-1588361035994-295e21daa761", // Vintage casual short sleeve knit polo
    "photo-1598032895397-b9472444bf93", // Smart casual navy structured knit polo
    "photo-1611312449408-fcece27cdbb7", // Charcoal grey soft wool polo (repeat-safe)
  ],
  "Cuban Shirt": [
    "photo-1530159698630-b1a2f75d4ad8", // Camp-collar relaxed Cuban shirt
    "photo-1550071593-fd1bdaf1f93c", // Earthy abstract print Cuban shirt
    "photo-1542060748-10c28b62716f", // Lightweight tropical print resort shirt
    "photo-1525507119028-ed4c629a60a3", // Casual linen open collar summer shirt
    "photo-1593032465175-481ac7f401a0", // Neutral olive luxury camp shirt
    "photo-1606787619248-f301830a5a57", // Relaxed fit striped vacation shirt
    "photo-1499939667766-4afceb292d05", // Modern short-sleeve resort fashion shirt
    "photo-1615886753866-79396d6c4e05", // Vintage pattern summer Cuban collar shirt
  ],

  // ── WOMEN ──────────────────────────────────────────────────
  "Evening Gown": [
    "photo-1568252542512-9fe8fe9c87bb", // Elegant silk trailing evening gown
    "photo-1509631179647-0177331693ae", // High-fashion sequin evening gown
    "photo-1517841905240-472988babdf9", // Luxurious formal red ball gown
    "photo-1490481651871-ab68de25d43d", // Premium pleated designer couture gown
    "photo-1614251056216-f748f76cd228", // Elegant minimalist dark silk gown
    "photo-1583391733956-3750e0ff4e8b", // Haute-couture layered black gown
    "photo-1595777457583-95e059d581b8", // Elegant off-shoulder evening dress
    "photo-1561731216-c3a4d99437d5", // Structured architectural formal gown
  ],
  "Slip Dress": [
    "photo-1483985988355-763728e1935b", // Minimalist satin slip dress
    "photo-1515886657613-9f3515b0c78f", // Bright yellow clean silhouette slip dress
    "photo-1554412933-514a83d2f3c8", // High-fashion emerald silk slip dress
    "photo-1539109132382-381bb3f1c2b3", // Neutral beige silk strap slip dress
    "photo-1502716119720-b23a93e5fe1b", // Elegant floral printed satin slip dress
    "photo-1581044777550-4cfa60707c03", // Pastel pink minimal strap slip dress
    "photo-1492562080023-ab3db95bfbce", // Soft fabric draped luxury slip dress
    "photo-1564257631407-4deb1f99d992", // Deep burgundy silk modern slip dress
  ],
  "Wrap Skirt": [
    "photo-1520975916090-3105956dac38", // Minimalist linen wrap midi skirt
    "photo-1479064566235-aa2742b96a4e", // Elegant draped asymmetrical wrap skirt
    "photo-1434389677669-e08b4cac3105", // Soft neutral summer wrap skirt
    "photo-1469334031218-e382a71b716b", // Designer patterned luxury wrap skirt
    "photo-1487222477894-8943e31ef7b2", // Tailored cotton wrap dynamic skirt
    "photo-1496747611176-843222e1e57c", // High-fashion pleated abstract wrap skirt
    "photo-1524604519054-fb1ea7de5d21", // Clean structured satin wrap skirt
    "photo-1548690312-e3b507d8c110", // Modern leather structured wrap skirt
  ],
  "Corset Top": [
    "photo-1550639525-c97d455acf70", // Elegant black velvet corset top
    "photo-1521369909029-2afed882baee", // Minimalist white cotton corset top
    "photo-1485125639709-a60c3a500bf1", // High-fashion structured leather corset
    "photo-1594938298603-c8148c4b29ef", // Lace embroidered vintage corset top
    "photo-1529139574466-a303027c1d8b", // Modern chic denim casual corset top
    "photo-1509631179647-0177331693ae", // Satin boned evening wear corset
    "photo-1536766768598-e09213fdcf22", // Clean minimalist tailored ivory corset
    "photo-1581044777550-4cfa60707c03", // Silk blush-pink structural corset top
  ],
  "Palazzo Pants": [
    "photo-1583744946564-b52ac1c389c8", // Wide-leg pleat silk palazzo pants
    "photo-1568252542512-9fe8fe9c87bb", // Elegant flowy white linen palazzo
    "photo-1567401893414-76b7b1e5a7a5", // High-waist luxury fabric palazzo pants
    "photo-1503342394128-c104d54dba01", // Abstract print lightweight palazzo pants
    "photo-1491553895911-0055eca6402d", // Minimalist tan flared palazzo pants
    "photo-1526413425872-a64c787a1cbe", // Heavy satin structured trouser palazzo
    "photo-1506634572416-48cdfe530110", // Lightweight cotton cruise palazzo pants
    "photo-1564257631407-4deb1f99d992", // Rich jewel-toned emerald palazzo pants
  ],
  "Trench Coat": [
    "photo-1539109132382-381bb3f1c2b3", // Heritage double-breasted camel trench coat
    "photo-1520975916090-3105956dac38", // Fluid lightweight linen duster trench coat
    "photo-1551854838-212c9b32b18a", // Clean lines high-collar modern trench
    "photo-1562572159-4efd90232a3f", // Deep slate executive designer trench coat
    "photo-1543076447-215ad9ba6923", // Heavy cotton structured military trench coat
    "photo-1558769132-cb1aea458c5e", // Belted oversized contemporary tan trench
    "photo-1512327428851-af1104cd5a37", // Sleek minimal black waterproof trench coat
    "photo-1547996160-81dfa63595aa", // Classic khaki double-breasted winter trench
  ],
  "Midi Dress": [
    "photo-1515886657613-9f3515b0c78f", // Chic sunshine yellow linen midi dress
    "photo-1509631179647-0177331693ae", // Luxury printed long-sleeve midi dress
    "photo-1568252542512-9fe8fe9c87bb", // Elegant pleated knit designer midi dress
    "photo-1554412933-514a83d2f3c8", // High-neck structured bodycon midi dress
    "photo-1581044777550-4cfa60707c03", // Soft pastel button-front cotton midi
    "photo-1492562080023-ab3db95bfbce", // Drapey wrap-front silk midi dress
    "photo-1502716119720-b23a93e5fe1b", // Elegant print luxury resort midi dress
    "photo-1499952127939-9bbf5af6c51c", // High-fashion asymmetrical hem midi dress
  ],
  Blouse: [
    "photo-1485125639709-a60c3a500bf1", // High-neck silk ruffle white blouse
    "photo-1594938298603-c8148c4b29ef", // Sheer romantic bishop sleeve blouse
    "photo-1521369909029-2afed882baee", // Crisp minimalist structured cotton blouse
    "photo-1529139574466-a303027c1d8b", // Retro wrap satin premium blouse
    "photo-1536766768598-e09213fdcf22", // Minimalist off-shoulder design blouse
    "photo-1526413425872-a64c787a1cbe", // Professional satin striped button blouse
    "photo-1503342394128-c104d54dba01", // Flowing abstract silk luxury blouse
    "photo-1483985988355-763728e1935b", // Classic V-neck designer satin blouse
  ],

  // ── KIDS ───────────────────────────────────────────────────
  Cardigan: [
    "photo-1519457431-44ced64a579b", // Soft cable knit infant cardigan
    "photo-1622243697926-26fc54045353", // Pastel warm knit children's cardigan
    "photo-1607990283143-e81e7a2c93ab", // Classic wool button-up smart cardigan
    "photo-1519238263530-99bdd11df2ea", // Cosy knitted autumn kids sweater-cardigan
    "photo-1566492031773-4f4e44671857", // Organic cotton buttoned lightweight cardigan
    "photo-1503919545889-aef636e10ad4", // Neutral brown warm knit baby cardigan
    "photo-1471286174243-e7a4d9afb34a", // Mustard yellow organic baby cardigan
    "photo-1540475820923-f14d41e7be7d", // Comfy cotton knit kid's play cardigan
  ],
  "Cotton Romper": [
    "photo-1522771739844-6a9f6d5f14af", // Organic waffle knit baby cotton romper
    "photo-1519689680058-324335c77eba", // Light stripe breathable baby sun romper
    "photo-1471286174243-e7a4d9afb34a", // Mustard pure cotton baby playsuit romper
    "photo-1503919545889-aef636e10ad4", // Comfy linen-cotton short button romper
    "photo-1519238263530-99bdd11df2ea", // Cozy long sleeve rib knit baby romper
    "photo-1607990283143-e81e7a2c93ab", // Styled winter knit buttoned romper
    "photo-1566492031773-4f4e44671857", // Plain neutral natural cotton romper
    "photo-1519457431-44ced64a579b", // Ribbed minimalist organic cotton romper
  ],
  "Denim Jacket": [
    "photo-1489424731084-a5d8b219a5bb", // Classic faded blue denim jacket kids
    "photo-1503919545889-aef636e10ad4", // Heavy wash designer denim kid outerwear
    "photo-1519689680058-324335c77eba", // Vintage retro casual children denim jacket
    "photo-1522771739844-6a9f6d5f14af", // Light wash indigo soft cotton denim jacket
    "photo-1471286174243-e7a4d9afb34a", // Sherpa-lined warm winter kids denim coat
    "photo-1540475820923-f14d41e7be7d", // Distressed contemporary kids denim garment
    "photo-1607990283143-e81e7a2c93ab", // Cool urban style classic denim jacket
    "photo-1519238263530-99bdd11df2ea", // Casual daily fit blue denim jacket
  ],
  "Smock Dress": [
    "photo-1519689680058-324335c77eba", // Pastel cotton ruffled smock dress
    "photo-1522771739844-6a9f6d5f14af", // Organic linen pleated kids smock dress
    "photo-1540475820923-f14d41e7be7d", // Checked cotton tiered smock dress
    "photo-1519457431-44ced64a579b", // Vintage-style floral baby smock dress
    "photo-1566492031773-4f4e44671857", // Flowy neutral organic smock dress
    "photo-1471286174243-e7a4d9afb34a", // Mustard yellow long sleeve smock dress
    "photo-1503919545889-aef636e10ad4", // Premium gauze cotton loose smock dress
    "photo-1622243697926-26fc54045353", // Styled cotton-poplin ruffled girl dress
  ],
  Overalls: [
    "photo-1489424731084-a5d8b219a5bb", // Classic indigo denim pocket kids overalls
    "photo-1522771739844-6a9f6d5f14af", // Soft canvas neutral utility overalls
    "photo-1519689680058-324335c77eba", // Light blue cotton corduroy overalls
    "photo-1471286174243-e7a4d9afb34a", // Mustard yellow cotton baby overalls
    "photo-1607990283143-e81e7a2c93ab", // Heavy duty raw denim toddler overalls
    "photo-1540475820923-f14d41e7be7d", // Modern design tan canvas kid overalls
    "photo-1566492031773-4f4e44671857", // Organic linen summer breathable overalls
    "photo-1519457431-44ced64a579b", // Comfortable olive green twill overalls
  ],
  Hoodie: [
    "photo-1622243697926-26fc54045353", // Pastel oversized heavy fleece kids hoodie
    "photo-1519238263530-99bdd11df2ea", // Cosy cotton pullover kids hoodie grey
    "photo-1503919545889-aef636e10ad4", // Deep brown raw cotton pocket hoodie
    "photo-1489424731084-a5d8b219a5bb", // Bright primary color comfortable pullover
    "photo-1519689680058-324335c77eba", // Light striped sporty kids lounge hoodie
    "photo-1522771739844-6a9f6d5f14af", // Soft organic knit hoodie for toddlers
    "photo-1607990283143-e81e7a2c93ab", // Cool typography urban skate kids hoodie
    "photo-1471286174243-e7a4d9afb34a", // Mustard yellow classic heavy cotton hoodie
  ],
  "Sun Hat": [
    "photo-1503919545889-aef636e10ad4", // Woven paper straw classic summer sun hat
    "photo-1566492031773-4f4e44671857", // Floppy wide-brim baby linen sun hat
    "photo-1540475820923-f14d41e7be7d", // Clean cotton chin-strap toddler bucket hat
    "photo-1519457431-44ced64a579b", // Floral print soft brim baby sun hat
    "photo-1622243697926-26fc54045353", // Pastel beige protective kids hiking hat
    "photo-1519238263530-99bdd11df2ea", // Canvas outdoor summer protective beach hat
    "photo-1607990283143-e81e7a2c93ab", // Trendy streetwear canvas kids bucket hat
    "photo-1522771739844-6a9f6d5f14af", // Neutral linen natural white baby sun hat
  ],
  Chinos: [
    "photo-1471286174243-e7a4d9afb34a", // Slim fit tan cotton stretch chinos
    "photo-1519457431-44ced64a579b", // Light khaki smart casual kids chinos
    "photo-1622243697926-26fc54045353", // Soft pastel modern fit comfort chinos
    "photo-1519238263530-99bdd11df2ea", // Classic navy cotton uniform smart chinos
    "photo-1489424731084-a5d8b219a5bb", // Durable grey twill outdoor school chinos
    "photo-1519689680058-324335c77eba", // Light stone white casual summer chinos
    "photo-1503919545889-aef636e10ad4", // Warm brown rugged twill daily kids chinos
    "photo-1566492031773-4f4e44671857", // Elastic waist organic cotton kid chinos
  ],
};

/* ─── GARMENT-COUNTERS */
const garmentCounters = {};

function getUniqueImage(garmentKey) {
  const pool = GARMENT_IMAGE_POOLS[garmentKey];
  if (!pool) {
    return `https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80`;
  }

  if (garmentCounters[garmentKey] === undefined)
    garmentCounters[garmentKey] = 0;

  // Choose photo deterministically from the audited pool
  const photoId = pool[garmentCounters[garmentKey] % pool.length];
  garmentCounters[garmentKey]++;

  return `https://images.unsplash.com/${photoId}?w=800&auto=format&fit=crop&q=80`;
}

/* Editorial copy fragments — rotated by index so 150 cards don't
   all read the same sentence back at the person. */
const DESCRIPTION_FRAGMENTS = {
  Men: [
    "Cut from responsibly sourced cloth and finished with hand-set buttons, built to hold its line through a full day on your feet.",
    "A tailoring-house silhouette relaxed just enough for daily wear, in a weight suited to transitional weather.",
    "Constructed with a full canvas interior for a roll that softens with wear rather than creasing.",
    "Finished in-house with horn buttons and a half-lined body, so the drape stays honest after the tenth wear.",
  ],
  Women: [
    "Cut on the bias so the fabric follows the body without needing to be pinned into place.",
    "Finished with a hand-rolled hem and covered buttons, built for movement as much as for standing still.",
    "Draped from a single length of cloth, keeping the seam count low and the silhouette uninterrupted.",
    "Constructed with internal boning only where the shape asks for it, nowhere else.",
  ],
  Kids: [
    "Made from a double-washed cotton that softens further with every cycle, sized with room to grow into.",
    "Finished with flat-felled seams and reinforced knees, built for a Tuesday as much as for photographs.",
    "Cut with a wider armhole for full range of motion, closed with buttons a small hand can manage alone.",
    "Made in a mid-weight cotton blend chosen to survive both nap time and the playground.",
  ],
};

/* Helper dynamic metadata generator based on the item clicked */
function getCollectionDetails(item) {
  const titleLower = item.title.toLowerCase();

  // Default general fallback
  let composition = "A considered mix of natural fibre and modern construction, made to be worn often.";
  let styledFor = "Considered dressing, any day it's needed";
  let styleTip = "Let the piece anchor the outfit — keep everything worn alongside it quiet.";
  let callToAction = "View the full look and its styling notes.";

  if (item.category === "Men") {
    if (titleLower.includes("blazer") || titleLower.includes("trousers") || titleLower.includes("shirt")) {
      composition = "Lightweight wool-blend, half-canvassed, finished with horn buttons and a working cuff.";
      styledFor = "Client meetings, gallery openings, dinners that start early and run long";
      styleTip = "Leave the tie at home. A leather Chelsea boot and a slim steel watch say more with less.";
    } else if (titleLower.includes("overcoat") || titleLower.includes("vest")) {
      composition = "Dense wool exterior, water-resistant finish, horn toggles at the collar.";
      styledFor = "Platform waits, early flights, the walk between meetings in October";
      styleTip = "A mock-neck knit underneath adds warmth without adding bulk at the shoulder.";
    } else {
      composition = "Brushed cotton with a soft hand-feel, pre-shrunk so the fit holds after washing.";
      styledFor = "Saturday markets, the studio, anywhere a blazer would be overdressed";
      styleTip = "Keep the footwear low-profile — a suede sneaker lets the fabric do the talking.";
    }
    callToAction = "View the full look and its styling notes.";
  } else if (item.category === "Women") {
    if (titleLower.includes("gown") || titleLower.includes("dress")) {
      composition = "Silk-blend crepe with a fluid, weighted drape and a fully finished interior seam.";
      styledFor = "Dinners with place cards, openings, the one night that calls for it";
      styleTip = "One statement earring, hair swept back — let the neckline stay the only line of interest.";
    } else if (titleLower.includes("skirt") || titleLower.includes("pants") || titleLower.includes("blouse")) {
      composition = "Structured mid-weight fabric that holds its shape without needing a lining.";
      styledFor = "Studio visits, long lunches, a Tuesday that deserves better than jeans";
      styleTip = "Tuck in, and let the waistband do the defining — no belt required.";
    } else {
      composition = "Densely woven cotton-blend shell with a soft brushed lining at the collar.";
      styledFor = "The commute, the airport, the in-between hours of a long day";
      styleTip = "Worn open with the sleeves pushed back reads more confident than buttoned to the top.";
    }
    callToAction = "View the full look and its styling notes.";
  } else if (item.category === "Kids") {
    composition = "Double-washed organic cotton, flat-felled seams, sized with room in the shoulder.";
    styledFor = "School mornings, the garden, portraits that need to survive a scraped knee first";
    styleTip = "One roll at the cuff and hem buys a full season of growing room.";
    callToAction = "View the full look and care notes.";
  }

  const fragments = DESCRIPTION_FRAGMENTS[item.category] || DESCRIPTION_FRAGMENTS.Men;
  const description = fragments[item.id % fragments.length];

  return { description, composition, styledFor, styleTip, callToAction };
}

/* ─── DYNAMIC DATA GENERATOR (150 Unique Items) ──────────────── */
const generateData = () => {
  const categories = ["Men", "Women", "Kids"];
  const accents = ["#0070f3", "#3a92ff", "#1f80f5", "#5ca4ff", "#0051b0"];

  const descriptors = [
    "Tailored", "Silk", "Linen", "Oversized", "Vintage",
    "Minimalist", "Velvet", "Cashmere", "Structured", "Flowing",
  ];

  const garments = {
    Men: ["Blazer", "Trousers", "Overcoat", "Chelsea Boot", "Utility Vest", "Oxford Shirt", "Knit Polo", "Cuban Shirt"],
    Women: ["Evening Gown", "Slip Dress", "Wrap Skirt", "Corset Top", "Palazzo Pants", "Trench Coat", "Midi Dress", "Blouse"],
    Kids: ["Cardigan", "Cotton Romper", "Denim Jacket", "Smock Dress", "Overalls", "Hoodie", "Sun Hat", "Chinos"],
  };

  Object.keys(garmentCounters).forEach((k) => {
    garmentCounters[k] = 0;
  });

  return Array.from({ length: 150 }, (_, i) => {
    const category = categories[i % categories.length];
    const styleList = garments[category];
    const descriptor = descriptors[i % descriptors.length];
    const garment = styleList[i % styleList.length];
    const title = `${descriptor} ${garment}`;

    return {
      id: i + 1,
      category,
      title,
      subtitle: `${category} · Edition No. ${i + 1}`,
      tag: i % 10 === 0 ? "Limited Edition" : i % 5 === 0 ? "New Arrival" : "Essential",
      image: getUniqueImage(garment),
      accent: accents[i % accents.length],
    };
  });
};

const allItems = generateData();

/* ─── HOOK: TYPEWRITER EFFECT (Untouched) ────────────────── */
function useTypewriter(words, speed = 150) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2000);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(
      () => {
        setSubIndex((prev) => prev + (reverse ? -1 : 1));
      },
      reverse ? 75 : speed,
    );
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words, speed]);

  return words[index].substring(0, subIndex);
}

/* ─── HOOK: REVEAL ON SCROLL ─────────────────────────────── */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.05 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* Zero-pad an edition number, e.g. 4 -> "004" */
const editionNumber = (id) => String(id).padStart(3, "0");

/* ─── COMPONENT: COLLECTION CARD ─────────────────────────── */
function CollectionCard({ col, className = "", onClick }) {
  const [hovered, setHovered] = useState(false);
  const [ref, visible] = useReveal();
  const [imgError, setImgError] = useState(false);

  const fallbackSrc = `https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80`;

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      ref={ref}
      role="button"
      tabIndex={0}
      aria-label={`View ${col.title}, ${col.subtitle}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setHovered(false)}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={`group/card relative overflow-hidden rounded-[1.25rem] cursor-pointer bg-[var(--panel)] transition-[box-shadow,transform] duration-700 ease-out w-full outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ink)] ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 900ms ease-out, transform 900ms ease-out, box-shadow 700ms ease-out",
        boxShadow: hovered ? "0 30px 60px -24px rgba(0,0,0,0.55)" : "0 1px 0 var(--hairline)",
      }}
    >
      <img
        src={imgError ? fallbackSrc : col.image}
        alt={`${col.title} — ${col.category} fashion`}
        loading="lazy"
        decoding="async"
        onError={() => setImgError(true)}
        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-[1.4s] ease-out"
        style={{ transform: hovered ? "scale(1.045)" : "scale(1)" }}
      />

      {/* tonal wash, warmer than pure black */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background: "linear-gradient(180deg, rgba(10,10,12,0) 40%, rgba(10,10,12,0.55) 72%, rgba(10,10,12,0.94) 100%)",
          opacity: hovered ? 1 : 0.9,
        }}
      />

      {/* faint watermark edition numeral — real sequence data, not decoration */}
      <span
        aria-hidden="true"
        className="font-display absolute top-4 right-5 md:top-6 md:right-7 select-none pointer-events-none tabular-nums transition-opacity duration-700"
        style={{
          fontSize: "clamp(2rem, 4vw, 3.25rem)",
          fontStyle: "italic",
          fontWeight: 400,
          color: "transparent",
          WebkitTextStroke: "1px rgba(243,241,234,0.22)",
          opacity: hovered ? 1 : 0.6,
        }}
      >
        {editionNumber(col.id)}
      </span>

      <div className="absolute top-4 left-4 md:top-6 md:left-6">
        <span className="font-ui text-[9px] font-semibold tracking-[0.2em] uppercase px-3 py-[7px] rounded-full border border-[var(--hairline-strong)] text-[var(--ivory)] bg-[var(--ink)]/40">
          {col.tag}
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <p
          className="font-ui text-[10px] font-bold tracking-[0.28em] uppercase mb-2 transition-colors duration-300"
          style={{ color: hovered ? "var(--accent)" : "rgba(243,241,234,0.45)" }}
        >
          {col.subtitle}
        </p>
        <h3 className="font-display text-2xl md:text-3xl text-[var(--ivory)] tracking-tight mb-3 leading-[1.05]">
          {col.title}
        </h3>

        <div
          className="flex items-center gap-3 pt-1 border-t transition-[border-color] duration-500"
          style={{ borderColor: hovered ? "var(--accent)" : "var(--hairline)" }}
        >
          <span className="font-ui text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--ivory)] pt-3">
            View the Look
          </span>
          <span
            aria-hidden="true"
            className="font-ui text-[13px] pt-3 transition-transform duration-500"
            style={{
              color: "var(--accent)",
              transform: hovered ? "translateX(4px)" : "translateX(0)",
            }}
          >
            →
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────────────────── */
export default function Collections() {
  const [activeTab, setActiveTab] = useState("All");
  const typedWord = useTypewriter(["Masterpieces", "Silhouettes", "Traditions", "Elegance"]);
  const [headerRef, headerVisible] = useReveal();

  // State handles details for currently active collection popup item
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = useMemo(() => {
    return activeTab === "All" ? allItems : allItems.filter((item) => item.category === activeTab);
  }, [activeTab]);

  const handleCardClick = (item) => {
    const dynamicData = getCollectionDetails(item);
    setSelectedItem({ ...item, ...dynamicData });
  };

  const closeDetailsModal = () => setSelectedItem(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeDetailsModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const tokenStyle = {
    "--ink": "#0a0a0c",
    "--panel": "#131316",
    "--hairline": "rgba(243,241,234,0.09)",
    "--hairline-strong": "rgba(243,241,234,0.18)",
    "--ivory": "#f3f1ea",
    "--muted": "rgba(243,241,234,0.55)",
    "--accent": "#0070f3",
    "--accent-deep": "#052e6b",
  };

  return (
    <section
      className="min-h-screen py-16 md:py-32 px-4 md:px-10 overflow-x-hidden relative bg-[var(--ink)]"
      style={tokenStyle}
    >
      <div ref={headerRef} className="max-w-[1400px] mx-auto mb-16 md:mb-24">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">

          <div className="space-y-6 max-w-4xl">
            <div className="inline-flex items-center gap-2.5 border border-[var(--hairline-strong)] px-4 py-1.5 rounded-full">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inline-flex w-full h-full rounded-full bg-[var(--accent)] animate-breathe" />
              </span>
              <span className="font-ui text-[9px] font-bold tracking-[0.3em] text-[var(--muted)] uppercase">
                Explore Collections
              </span>
            </div>

            <h2 className="font-ui text-white text-4xl sm:text-6xl md:text-5xl lg:text-7xl font-black tracking-tight leading-[0.95] uppercase break-words">
              Discover Our{" "}
              <span className="font-display font-normal italic normal-case tracking-normal text-transparent" style={{ WebkitTextStroke: "1px var(--accent)" }}>
                Exclusive
              </span>{" "}
              Collections
            </h2>

            <p className="font-ui text-[var(--muted)] text-xs md:text-sm font-medium tracking-wide leading-relaxed max-w-2xl">
              Every piece is catalogued as an individual look — numbered, composed, and styled on its
              own terms. Currently typing {" "}
              <span className="text-[var(--ivory)] font-semibold">{typedWord}</span>
              <span aria-hidden="true" className="text-[var(--accent)]">|</span>
              {" "}into the archive.
            </p>

            <p className="font-ui text-[var(--accent)] text-[9px] md:text-[10px] font-black tracking-[0.5em] uppercase pt-2">
              Atelier 0070 — Season 2026
            </p>
          </div>

          <div className="flex overflow-x-auto no-scrollbar gap-8 border-b border-[var(--hairline)] max-w-full touch-pan-x self-start lg:self-end pb-1">
            {["All", "Men", "Women", "Kids"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="font-ui relative pb-3 text-[11px] font-bold uppercase tracking-[0.22em] transition-colors shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-sm"
                style={{ color: activeTab === tab ? "var(--ivory)" : "var(--muted)" }}
              >
                {tab}
                <span
                  className="absolute left-0 right-0 -bottom-px h-[2px] transition-transform duration-300 origin-left"
                  style={{
                    backgroundColor: "var(--accent)",
                    transform: activeTab === tab ? "scaleX(1)" : "scaleX(0)",
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8">
          {filteredItems.map((item, idx) => {
            let colSpan = "lg:col-span-4";
            if (idx % 10 === 0) colSpan = "lg:col-span-12";
            else if (idx % 7 === 0) colSpan = "lg:col-span-8";
            else if (idx % 3 === 0) colSpan = "lg:col-span-4";

            return (
              <CollectionCard
                key={item.id}
                col={item}
                className={`${colSpan} h-[400px] md:h-[500px] lg:h-[600px]`}
                onClick={() => handleCardClick(item)}
              />
            );
          })}
        </div>

        <div className="mt-32 text-center border-t border-[var(--hairline)] pt-20">
          <p className="font-ui text-[var(--muted)] text-[10px] font-bold tracking-[0.8em] uppercase mb-10 opacity-60">
            End of Current Edit
          </p>
          <button className="group relative px-12 md:px-16 py-5 md:py-6 bg-transparent text-[var(--ivory)] border border-[var(--hairline-strong)] font-ui font-bold text-[11px] uppercase tracking-[0.35em] rounded-full overflow-hidden transition-colors duration-500 hover:border-[var(--accent)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]">
            <span className="relative z-10">Request a Custom Fit</span>
            <div className="absolute inset-0 bg-[var(--accent)] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
        </div>
      </div>

      {/* LOOKBOOK DETAIL MODAL */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-[5000] flex items-center justify-center p-4 bg-[var(--ink)]/90 backdrop-blur-sm animate-overlayIn"
          onClick={closeDetailsModal}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedItem.title} — look details`}
            className="relative w-full max-w-4xl bg-[var(--panel)] border border-[var(--hairline-strong)] rounded-[1.5rem] overflow-hidden shadow-2xl text-[var(--ivory)] max-h-[90vh] overflow-y-auto flex flex-col md:flex-row animate-modalIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left: image panel with edition mark */}
            <div className="w-full md:w-[45%] h-64 md:h-auto min-h-[280px] md:min-h-full relative shrink-0 bg-[var(--ink)]">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(180deg, rgba(10,10,12,0) 55%, rgba(10,10,12,0.75) 100%)" }}
              />
              <div className="absolute bottom-5 left-5 md:bottom-7 md:left-7">
                <span className="font-ui text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--ivory)]/70 block mb-1">
                  Look
                </span>
                <span className="font-display italic text-4xl md:text-5xl tabular-nums text-[var(--ivory)]">
                  {editionNumber(selectedItem.id)}
                </span>
              </div>
            </div>

            {/* Right: editorial spec panel */}
            <div className="w-full md:w-[55%] p-6 sm:p-10 flex flex-col justify-between relative">
              <button
                onClick={closeDetailsModal}
                className="absolute top-6 right-6 w-9 h-9 flex items-center justify-center rounded-full border border-[var(--hairline-strong)] hover:border-[var(--accent)] text-[var(--muted)] hover:text-[var(--ivory)] transition-colors cursor-pointer z-10 outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                aria-label="Close look details"
              >
                <span className="font-ui text-sm leading-none">×</span>
              </button>

              <div>
                <div className="mb-5">
                  <span className="font-ui text-[9px] font-bold tracking-[0.25em] uppercase px-3 py-[7px] rounded-full border border-[var(--hairline-strong)]" style={{ color: "var(--accent)" }}>
                    {selectedItem.tag}
                  </span>
                </div>

                <p className="font-ui text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--muted)] mb-2">
                  {selectedItem.subtitle}
                </p>
                <h3 className="font-display text-3xl sm:text-4xl tracking-tight mb-6 leading-[1.05]">
                  {selectedItem.title}
                </h3>

                <div className="space-y-5 text-sm">
                  <p className="font-ui text-[var(--ivory)]/85 leading-relaxed font-medium text-xs sm:text-sm">
                    {selectedItem.description}
                  </p>

                  <div className="grid grid-cols-2 gap-5 border-t border-[var(--hairline)] pt-5">
                    <div>
                      <h4 className="font-ui text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--muted)] mb-1.5">
                        Composition
                      </h4>
                      <p className="font-ui text-[var(--ivory)] text-[11px] leading-relaxed">
                        {selectedItem.composition}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-ui text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--muted)] mb-1.5">
                        Styled For
                      </h4>
                      <p className="font-ui text-[var(--ivory)] text-[11px] leading-relaxed">
                        {selectedItem.styledFor}
                      </p>
                    </div>
                  </div>

                  <div className="pl-4 border-l-2" style={{ borderColor: "var(--accent)" }}>
                    <h4 className="font-ui text-[9px] font-bold uppercase tracking-[0.18em] mb-1.5" style={{ color: "var(--accent)" }}>
                      Stylist's Note
                    </h4>
                    <p className="font-display italic text-[var(--ivory)]/80 text-sm leading-relaxed">
                      {selectedItem.styleTip}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-[var(--hairline)] pt-6 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="font-ui text-xs text-[var(--muted)] font-medium tracking-wide text-center sm:text-left">
                  {selectedItem.callToAction}
                </p>
                <button
                  onClick={closeDetailsModal}
                  className="font-ui px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.22em] transition-colors w-full sm:w-auto shrink-0 border border-[var(--hairline-strong)] text-[var(--ivory)] hover:border-[var(--accent)] hover:text-[var(--accent)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  Close the Look
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@400;500;600;700;800;900&display=swap');

        .font-display { font-family: 'Fraunces', 'Iowan Old Style', Georgia, serif; }
        .font-ui { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        @keyframes overlayIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-overlayIn { animation: overlayIn 0.25s ease-out forwards; }

        @keyframes modalIn {
          from { opacity: 0; transform: translateY(18px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-modalIn { animation: modalIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        @keyframes breathe {
          0%, 100% { opacity: 0.35; transform: scale(0.85); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        .animate-breathe { animation: breathe 2.6s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .animate-overlayIn, .animate-modalIn, .animate-breathe {
            animation: none !important;
          }
          * { transition-duration: 0.01ms !important; }
        }
      `}</style>
    </section>
  );
}