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
    "photo-16222519407650-3df9883f76a5", // Creamy beige lightweight knit polo
    "photo-1588361035994-295e21daa761", // Vintage casual short sleeve knit polo
    "photo-1598032895397-b9472444bf93", // Smart casual navy structured knit polo
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

/* Helper dynamic metadata generator based on the item clicked */
function getCollectionDetails(item) {
  const titleLower = item.title.toLowerCase();
  
  // Default general fallback
  let description = "An exquisite curation designed to blend premium fabrication with modern urban silhouettes.";
  let theme = "Modernist Luxury";
  let occasions = "High-End Gatherings, Evening Lounges, & Architectural Showcases";
  let styleTip = "Layer with neutral monochrome basics to emphasize the custom structure and rich drape.";
  let callToAction = "Explore this collection and find your perfect look!";

  // Determine specifics based on Keywords
  if (item.category === "Men") {
    if (titleLower.includes("blazer") || titleLower.includes("trousers") || titleLower.includes("shirt")) {
      description = "Tailored to sharp perfection using lightweight luxury blends. Made for the modern professional seeking an effortless structural drape.";
      theme = "Contemporary Sartorial";
      occasions = "Executive Meetings, Gallery Openings, & Formal Dinners";
      styleTip = "Ditch the traditional tie. Pair with leather Chelsea boots and a minimalist steel watch for an understated power statement.";
      callToAction = "Explore this collection and find your perfect look!";
    } else if (titleLower.includes("overcoat") || titleLower.includes("vest")) {
      description = "Sculpted outwear providing optimal warmth without sacrificing structural beauty. Finished with high-grade metal accents and water-repellent weaves.";
      theme = "Urban Avant-Garde Outwear";
      occasions = "Transit Lounge, Autumn Escapes, & Semi-Formal Socials";
      styleTip = "Layer a mock-neck cashmere sweater beneath the overcoat to introduce elegant depth and soft textural play.";
      callToAction = "Explore this collection and find your perfect look!";
    } else {
      description = "Relaxed luxury staples prioritizing absolute tactility, structured hems, and breathability for off-duty days.";
      theme = "Artisanal Smart Casual";
      occasions = "Weekend Brunches, Luxury Yacht Escapes, & Casual Fridays";
      styleTip = "Keep the footwear clean. Opt for minimalist low-top suede sneakers to round out the relaxed silhouette.";
      callToAction = "Discover styles designed just for you.";
    }
  } else if (item.category === "Women") {
    if (titleLower.includes("gown") || titleLower.includes("dress")) {
      description = "Flowing, masterfully stitched silks and heavy-weight chiffons that contour gracefully. Engineered to move fluidly with your natural stride.";
      theme = "High-Glamour Red Carpet";
      occasions = "Soirées, Gala Dinners, & Architectural Black-Tie Weddings";
      styleTip = "Elevate with raw metallic statement earrings and a sleek, high-slicked bun to draw focus to the neckline.";
      callToAction = "Explore this collection and find your perfect look!";
    } else if (titleLower.includes("skirt") || titleLower.includes("pants") || titleLower.includes("blouse")) {
      description = "Voluminous, architectural separate pieces utilizing drape dynamics to emphasize soft structural silhouettes.";
      theme = "Editorial High-Fashion Coordinates";
      occasions = "Art Exhibits, Executive Lounges, & High-Tea Reunions";
      styleTip = "Tuck structured blouses neatly into wide-leg palazzo pants to elongate the body profile.";
      callToAction = "Discover styles designed just for you.";
    } else {
      description = "A strong feminine outerwear shield that updates classic patterns with modern oversized lines and structural belting.";
      theme = "Modern Heritage Trench Style";
      occasions = "C-Suite Showcases, Global Commutes, & Rainy Afternoons";
      styleTip = "Wear open with sleeves pushed high on the forearm for an effortless, confident style.";
      callToAction = "Discover styles designed just for you.";
    }
  } else if (item.category === "Kids") {
    description = "Premium hypoallergenic natural cottons and soft denims designed with maximum mobility and durability in mind.";
    theme = "Luxurious Miniature Playwear";
    occasions = "Family Portrait Days, Outdoor Adventures, & Elite Academy Mornings";
    styleTip = "Roll up the trouser and jacket hems slightly for a relaxed look that handles growing room beautifully.";
    callToAction = "Discover styles designed just for you.";
  }

  return { description, theme, occasions, styleTip, callToAction };
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
      description: "A masterclass in modern silhouette and fabric integrity. Designed for the 2026 global aesthetic.",
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

/* ─── COMPONENT: COLLECTION CARD ─────────────────────────── */
function CollectionCard({ col, className = "", onClick }) {
  const [hovered, setHovered] = useState(false);
  const [ref, visible] = useReveal();
  const [imgError, setImgError] = useState(false);

  const fallbackSrc = `https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80`;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setHovered(false)}
      onClick={onClick} // Click event attached to the card container
      className={`relative overflow-hidden rounded-[2rem] md:rounded-[3rem] cursor-pointer bg-[#111] transition-all duration-1000 ease-out w-full ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        boxShadow: hovered ? "0 40px 80px -20px rgba(0,112,243,0.3)" : "none",
      }}
    >
      <img
        src={imgError ? fallbackSrc : col.image}
        alt={`${col.title} — ${col.category} fashion`}
        loading="lazy"
        decoding="async"
        onError={() => setImgError(true)}
        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-[1.5s] ease-out"
        style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
      />
      <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent transition-opacity duration-700 ${hovered ? "opacity-95" : "opacity-75"}`} />

      <div className="absolute top-4 left-4 md:top-6 md:left-6">
        <span
          className="text-[9px] font-black tracking-[0.2em] uppercase px-4 py-2 rounded-full backdrop-blur-xl border border-white/10 text-white"
          style={{ backgroundColor: `${col.accent}33` }}
        >
          {col.tag}
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <p className="text-[10px] font-bold tracking-[0.3em] uppercase mb-2 text-white/40 transition-colors duration-300" style={{ color: hovered ? col.accent : "" }}>
          {col.subtitle}
        </p>
        <h3 className="text-xl md:text-3xl font-black text-white italic uppercase tracking-tighter mb-3 leading-tight">
          {col.title}
        </h3>

        <div className={`overflow-hidden transition-all duration-700 ease-in-out ${hovered ? "max-h-32 opacity-100" : "max-h-0 opacity-0"}`}>
          <p className="text-xs text-white/50 leading-relaxed mb-6">
            {col.description}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div
            className="h-px bg-white/20 transition-all duration-500"
            style={{
              width: hovered ? "48px" : "32px",
              backgroundColor: hovered ? col.accent : "",
            }}
          />
          <span className="text-[10px] font-black uppercase tracking-widest text-white">
            Discover
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
    // Collect the dynamic metadata generated specifically for the garment category
    const dynamicData = getCollectionDetails(item);
    setSelectedItem({
      ...item,
      ...dynamicData
    });
  };

  // Close popup logic helper
  const closeDetailsModal = () => setSelectedItem(null);

  // Close modal when hitting the Escape Key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeDetailsModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section className="bg-[#050505] min-h-screen py-16 md:py-32 px-4 md:px-10 overflow-x-hidden relative">
      <div ref={headerRef} className="max-w-[1400px] mx-auto mb-16 md:mb-24">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          
          <div className="space-y-6 p-6 max-w-4xl">
            <div className="inline-flex items-center gap-2 border border-white/10 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0070f3] animate-ping" />
              <span className="text-[9px] font-black tracking-[0.3em] text-white/70 uppercase">
                Explore Collections
              </span>
            </div>

            <h2 className="text-white text-4xl sm:text-6xl md:text-5xl lg:text-8xl font-black tracking-tighter leading-[0.9] uppercase italic break-words">
              Discover Our <br />
              <span className="text-transparent" style={{ WebkitTextStroke: "1px #0070f3" }}>Exclusive</span> Collections
            </h2>

            <p className="text-white/60 text-xs md:text-sm font-medium tracking-wide leading-relaxed max-w-2xl">
              Explore carefully curated styles, trending outfits, and must have pieces designed to elevate your wardrobe. Browse our latest arrivals and discover collections crafted for every occasion.
            </p>

            <p className="text-[#0070f3] text-[9px] md:text-xs font-black tracking-[0.5em] uppercase pt-2">
              The Achieved Global Studio 2026
            </p>
          </div>

          <div className="flex overflow-x-auto no-scrollbar bg-white/5 p-1.5 rounded-full border border-white/10 backdrop-blur-2xl max-w-full touch-pan-x self-start lg:self-end">
            {["All", "Men", "Women", "Kids"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 md:px-12 py-3 md:py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shrink-0 ${
                  activeTab === tab ? "bg-[#0070f3] text-white shadow-lg shadow-blue-600/30" : "text-white/30 hover:text-white"
                }`}
              >
                {tab}
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
                onClick={() => handleCardClick(item)} // Sent the click down to the card handler
              />
            );
          })}
        </div>

        <div className="mt-32 text-center border-t border-white/5 pt-24">
          <p className="text-white/10 text-[10px] font-bold tracking-[1em] uppercase mb-10">
            End of Current Curation
          </p>
          <button className="group relative px-12 md:px-16 py-6 md:py-8 bg-transparent text-white border border-white/20 font-black text-xs uppercase tracking-[0.4em] rounded-full overflow-hidden transition-all hover:border-[#0070f3]">
            <span className="relative z-10 group-hover:text-white transition-colors duration-500">
              Request Custom Fit
            </span>
            <div className="absolute inset-0 bg-[#0070f3] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
        </div>
      </div>

      {/* DYNAMIC SIDE-BY-SIDE INFORMATION POPUP/MODAL OVERLAY */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-[5000] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={closeDetailsModal}
        >
          <div 
            className="relative w-full max-w-4xl bg-[#0c0c0e] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl transition-all text-white max-h-[90vh] overflow-y-auto flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()} // Prevent closing when inside popup
          >
            {/* Left Column: Visual Image Cover Block */}
            <div className="w-full md:w-1/2 h-64 md:h-auto min-h-[300px] md:min-h-full relative shrink-0">
              <img 
                src={selectedItem.image} 
                alt={selectedItem.title} 
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-transparent to-transparent" />
            </div>

            {/* Right Column: Dynamic Text Description Details block */}
            <div className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-between relative">
              {/* Close Button */}
              <button 
                onClick={closeDetailsModal}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full border border-white/10 hover:border-white/40 bg-white/5 text-white/70 hover:text-white transition-colors cursor-pointer z-10"
                aria-label="Close details"
              >
                ✕
              </button>

              {/* Header Meta Content */}
              <div>
                <div className="mb-4">
                  <span 
                    className="text-[9px] font-black tracking-[0.25em] uppercase px-3.5 py-1.5 rounded-full border border-white/10"
                    style={{ backgroundColor: `${selectedItem.accent}25`, color: selectedItem.accent }}
                  >
                    {selectedItem.tag}
                  </span>
                </div>

                <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/40 mb-1">
                  {selectedItem.subtitle}
                </p>
                <h3 className="text-2xl sm:text-3xl font-black italic uppercase tracking-tighter mb-6 leading-tight">
                  {selectedItem.title}
                </h3>

                {/* Body details list block */}
                <div className="space-y-5 text-sm">
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30 mb-1">About Collection</h4>
                    <p className="text-white/80 leading-relaxed font-medium text-xs sm:text-sm">
                      {selectedItem.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30 mb-1">Theme / Style</h4>
                      <p className="text-white font-black text-[11px] uppercase tracking-wider">{selectedItem.theme}</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30 mb-1">Best Occasion</h4>
                      <p className="text-white font-medium text-[11px] leading-relaxed">{selectedItem.occasions}</p>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.15em] text-blue-500 mb-1">Styling Suggestion</h4>
                    <p className="text-white/70 text-xs italic leading-relaxed">
                      "{selectedItem.styleTip}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Call-to-action Footer layout */}
              <div className="border-t border-white/5 pt-6 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-white/60 font-semibold tracking-wide text-center sm:text-left">
                  {selectedItem.callToAction}
                </p>
                <button 
                  onClick={closeDetailsModal}
                  className="px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest text-white transition-all w-full sm:w-auto hover:bg-white hover:text-black shrink-0 border border-white/20"
                  style={{ backgroundColor: selectedItem.accent }}
                >
                  Close Explorer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@700&display=swap');
        h2 { font-family: 'Syncopate', sans-serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        body { background-color: #050505; }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </section>
  );
}