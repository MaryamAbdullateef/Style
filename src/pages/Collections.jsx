import { useState, useEffect, useRef, useMemo } from "react";

const GARMENT_IMAGE_POOLS = {
  // ── MEN ────────────────────────────────────────────────────
  Blazer: [
    "photo-1617137968427-85924c800a22",
    "photo-1593030761757-71fae45fa0e7",
    "photo-1600359756856-77b8f55b2889",
    "photo-1598033129183-c4f50c736f10",
    "photo-1550246140-29f40b909e5a",
    "photo-1585233954799-7b4f1b57e0fc",
    "photo-1507679799987-c73779587ccf",
    "photo-1618886614638-80e3c103d31a",
  ],
  Trousers: [
    "photo-1624378439575-d8705ad7ae80",
    "photo-1473966968600-fa801b869a1a",
    "photo-1602810318383-e386cc2a3ccf",
    "photo-1519085360753-af0119f7cbe7",
    "photo-1490367532201-b9bc1dc483f6",
    "photo-1617196034183-421b4040d20d",
    "photo-1552374196-1ab2a1c593e8",
    "photo-1596755389378-c31d21fd1273",
  ],
  Overcoat: [
    "photo-1519062522084-6ed35a8c9573",
    "photo-1520975954732-e97dbb9eab44",
    "photo-1609132718484-cc90df3417f8",
    "photo-1578681994506-b8f463449011",
    "photo-1548536631-42ae3fae0d5b",
    "photo-1521223890158-f9f7c3d5d504",
    "photo-1511499767150-a48a237f0083",
    "photo-1539185441755-769473a23570",
  ],
  "Chelsea Boot": [
    "photo-1542291026-7eec264c27ff",
    "photo-1608256246200-53e635b5b65f",
    "photo-1603808033176-9d134e6f2df5",
    "photo-1520639888713-7851133b1ed0",
    "photo-1551107696-a4b0c5a0d9a2",
    "photo-1585386959984-a4155224a1ad",
    "photo-1491553895911-0055eca6402d",
    "photo-1560343090-f0409e92791a",
  ],
  "Utility Vest": [
    "photo-1614975058789-41316d0e2e9c",
    "photo-1624378439575-d8705ad7ae80",
    "photo-1534030347209-467a5b0ad3e6",
    "photo-1598300042247-d088f8ab3a91",
    "photo-1480074568708-e7b720bb3f09",
    "photo-1555069519-127aadecd47a",
    "photo-1604176354204-9268737828e4",
    "photo-1588850561407-ed78c282e89b",
  ],
  "Oxford Shirt": [
    "photo-1621570168297-40734ec08be5",
    "photo-1602810316498-ab67cf68c8e1",
    "photo-1571945153237-4929e783af4a",
    "photo-1598033129183-c4f50c736f10",
    "photo-1603252109303-2751441dd157",
    "photo-1585487000160-6ebcfceb0d03",
    "photo-1569456537638-23e196b7bacc",
    "photo-1589310243389-96a5483213a8",
  ],
  "Knit Polo": [
    "photo-1565693413579-8ff3fdc1b03b",
    "photo-1556821840-3a63f15732ce",
    "photo-1503341504253-dff4815485f1",
    "photo-1611312449408-fcece27cdbb7",
    "photo-1516826957135-700dedea698c",
    "photo-16222519407650-3df9883f76a5",
    "photo-1588361035994-295e21daa761",
    "photo-1598032895397-b9472444bf93",
  ],
  "Cuban Shirt": [
    "photo-1530159698630-b1a2f75d4ad8",
    "photo-1550071593-fd1bdaf1f93c",
    "photo-1542060748-10c28b62716f",
    "photo-1525507119028-ed4c629a60a3",
    "photo-1593032465175-481ac7f401a0",
    "photo-1606787619248-f301830a5a57",
    "photo-1499939667766-4afceb292d05",
    "photo-1615886753866-79396d6c4e05",
  ],

  // ── WOMEN ──────────────────────────────────────────────────
  "Evening Gown": [
    "photo-1490481651871-ab68de25d43d",
    "photo-1509631179647-0177331693ae",
    "photo-1568252542512-9fe8fe9c87bb",
    "photo-1517841905240-472988babdf9",
    "photo-1614251056216-f748f76cd228",
    "photo-1583391733956-3750e0ff4e8b",
    "photo-1595777457583-95e059d581b8",
    "photo-1561731216-c3a4d99437d5",
  ],
  "Slip Dress": [
    "photo-1483985988355-763728e1935b",
    "photo-1515886657613-9f3515b0c78f",
    "photo-1554412933-514a83d2f3c8",
    "photo-1539109132382-381bb3f1c2b3",
    "photo-1502716119720-b23a93e5fe1b",
    "photo-1581044777550-4cfa60707c03",
    "photo-1492562080023-ab3db95bfbce",
    "photo-1564257631407-4deb1f99d992",
  ],
  "Wrap Skirt": [
    "photo-1520975916090-3105956dac38",
    "photo-1479064566235-aa2742b96a4e",
    "photo-1434389677669-e08b4cac3105",
    "photo-1469334031218-e382a71b716b",
    "photo-1487222477894-8943e31ef7b2",
    "photo-1496747611176-843222e1e57c",
    "photo-1524604519054-fb1ea7de5d21",
    "photo-1548690312-e3b507d8c110",
  ],
  "Corset Top": [
    "photo-1550639525-c97d455acf70",
    "photo-1502716119720-b23a93e5fe1b",
    "photo-1485125639709-a60c3a500bf1",
    "photo-1594938298603-c8148c4b29ef",
    "photo-1521369909029-2afed882baee",
    "photo-1529139574466-a303027c1d8b",
    "photo-1509631179647-0177331693ae",
    "photo-1536766768598-e09213fdcf22",
  ],
  "Palazzo Pants": [
    "photo-1583744946564-b52ac1c389c8",
    "photo-1568252542512-9fe8fe9c87bb",
    "photo-1567401893414-76b7b1e5a7a5",
    "photo-1503342394128-c104d54dba01",
    "photo-1491553895911-0055eca6402d",
    "photo-1526413425872-a64c787a1cbe",
    "photo-1506634572416-48cdfe530110",
    "photo-1564257631407-4deb1f99d992",
  ],
  "Trench Coat": [
    "photo-1539109132382-381bb3f1c2b3",
    "photo-1520975916090-3105956dac38",
    "photo-1551854838-212c9b32b18a",
    "photo-1562572159-4efd90232a3f",
    "photo-1543076447-215ad9ba6923",
    "photo-1558769132-cb1aea458c5e",
    "photo-1512327428851-af1104cd5a37",
    "photo-1547996160-81dfa63595aa",
  ],
  "Midi Dress": [
    "photo-1515886657613-9f3515b0c78f",
    "photo-1509631179647-0177331693ae",
    "photo-1568252542512-9fe8fe9c87bb",
    "photo-1554412933-514a83d2f3c8",
    "photo-1581044777550-4cfa60707c03",
    "photo-1492562080023-ab3db95bfbce",
    "photo-1502716119720-b23a93e5fe1b",
    "photo-1499952127939-9bbf5af6c51c",
  ],
  Blouse: [
    "photo-1485125639709-a60c3a500bf1",
    "photo-1594938298603-c8148c4b29ef",
    "photo-1521369909029-2afed882baee",
    "photo-1529139574466-a303027c1d8b",
    "photo-1536766768598-e09213fdcf22",
    "photo-1526413425872-a64c787a1cbe",
    "photo-1503342394128-c104d54dba01",
    "photo-1483985988355-763728e1935b",
  ],

  // ── KIDS ───────────────────────────────────────────────────
  Cardigan: [
    "photo-1519457431-44ced64a579b",
    "photo-1622243697926-26fc54045353",
    "photo-1607990283143-e81e7a2c93ab",
    "photo-1519238263530-99bdd11df2ea",
    "photo-1566492031773-4f4e44671857",
    "photo-1503919545889-aef636e10ad4",
    "photo-1471286174243-e7a4d9afb34a",
    "photo-1540475820923-f14d41e7be7d",
  ],
  "Cotton Romper": [
    "photo-1522771739844-6a9f6d5f14af",
    "photo-1519689680058-324335c77eba",
    "photo-1471286174243-e7a4d9afb34a",
    "photo-1503919545889-aef636e10ad4",
    "photo-1519238263530-99bdd11df2ea",
    "photo-1607990283143-e81e7a2c93ab",
    "photo-1566492031773-4f4e44671857",
    "photo-1519457431-44ccd64a579b",
  ],
  "Denim Jacket": [
    "photo-1489424731084-a5d8b219a5bb",
    "photo-1503919545889-aef636e10ad4",
    "photo-1519689680058-324335c77eba",
    "photo-1522771739844-6a9f6d5f14af",
    "photo-1471286174243-e7a4d9afb34a",
    "photo-1540475820923-f14d41e7be7d",
    "photo-1607990283143-e81e7a2c93ab",
    "photo-1519238263530-99bdd11df2ea",
  ],
  "Smock Dress": [
    "photo-1519689680058-324335c77eba",
    "photo-1522771739844-6a9f6d5f14af",
    "photo-1540475820923-f14d41e7be7d",
    "photo-1519457431-44ccd64a579b",
    "photo-1566492031773-4f4e44671857",
    "photo-1471286174243-e7a4d9afb34a",
    "photo-1503919545889-aef636e10ad4",
    "photo-1622243697926-26fc54045353",
  ],
  Overalls: [
    "photo-1489424731084-a5d8b219a5bb",
    "photo-1522771739844-6a9f6d5f14af",
    "photo-1519689680058-324335c77eba",
    "photo-1471286174243-e7a4d9afb34a",
    "photo-1607990283143-e81e7a2c93ab",
    "photo-1540475820923-f14d41e7be7d",
    "photo-1566492031773-4f4e44671857",
    "photo-1519457431-44ccd64a579b",
  ],
  Hoodie: [
    "photo-1622243697926-26fc54045353",
    "photo-1519238263530-99bdd11df2ea",
    "photo-1503919545889-aef636e10ad4",
    "photo-1489424731084-a5d8b219a5bb",
    "photo-1519689680058-324335c77eba",
    "photo-1522771739844-6a9f6d5f14af",
    "photo-1607990283143-e81e7a2c93ab",
    "photo-1471286174243-e7a4d9afb34a",
  ],
  "Sun Hat": [
    "photo-1503919545889-aef636e10ad4",
    "photo-1566492031773-4f4e44671857",
    "photo-1540475820923-f14d41e7be7d",
    "photo-1519457431-44ccd64a579b",
    "photo-1622243697926-26fc54045353",
    "photo-1519238263530-99bdd11df2ea",
    "photo-1607990283143-e81e7a2c93ab",
    "photo-1522771739844-6a9f6d5f14af",
  ],
  Chinos: [
    "photo-1471286174243-e7a4d9afb34a",
    "photo-1519457431-44ccd64a579b",
    "photo-1622243697926-26fc54045353",
    "photo-1519238263530-99bdd11df2ea",
    "photo-1489424731084-a5d8b219a5bb",
    "photo-1519689680058-324335c77eba",
    "photo-1503919545889-aef636e10ad4",
    "photo-1566492031773-4f4e44671857",
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
  const photoId = pool[garmentCounters[garmentKey] % pool.length];
  garmentCounters[garmentKey]++;

  return `https://images.unsplash.com/${photoId}?w=800&auto=format&fit=crop&q=80`;
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

  const filteredItems = useMemo(() => {
    return activeTab === "All" ? allItems : allItems.filter((item) => item.category === activeTab);
  }, [activeTab]);

  // Click handler to display information when a card is clicked
  const handleCardClick = (item) => {
    alert(`Discovering details for: ${item.title}\nCategory: ${item.category}\nEdition: ${item.subtitle}`);
  };

  return (
    <section className="bg-[#050505] min-h-screen py-16 md:py-32 px-4 md:px-10 overflow-x-hidden">
      <div ref={headerRef} className="max-w-[1400px] mx-auto mb-16 md:mb-24">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          
          <div className="space-y-6 max-w-4xl">
            <div className="inline-flex items-center gap-2 border border-white/10 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0070f3] animate-ping" />
              <span className="text-[9px] font-black tracking-[0.3em] text-white/70 uppercase">
                Explore Collections
              </span>
            </div>

            <h2 className="text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] uppercase italic break-words">
              Discover Our <br />
              <span className="text-transparent" style={{ WebkitTextStroke: "1px #0070f3" }}>Exclusive</span> Collections
            </h2>

            <p className="text-white/60 text-xs md:text-sm font-medium tracking-wide leading-relaxed max-w-2xl">
              Explore carefully curated styles, trending outfits, and must-have pieces designed to elevate your wardrobe. Browse our latest arrivals and discover collections crafted for every occasion.
            </p>

            <p className="text-[#0070f3] text-[9px] md:text-xs font-black tracking-[0.5em] uppercase pt-2">
              The Archive — Global Studio 2026
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

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@700&display=swap');
        h2 { font-family: 'Syncopate', sans-serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        body { background-color: #050505; }
      `}</style>
    </section>
  );
}