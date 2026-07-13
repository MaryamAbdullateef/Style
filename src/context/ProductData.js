// src/ProductData.js

const menCategories = ["Shirts", "Tees", "Trousers", "Outerwear", "Accessories"];
const menAdjectives = ["Premium", "Classic", "Slim Fit", "Tailored", "Urban", "Vintage", "Luxury", "Minimalist", "Oversized", "Structured", "Modern", "Heritage", "Studio", "Essential", "Archival", "Techwear"];
const menItemsPool = {
  Shirts: ["Linen Shirt", "Oxford Button-Down", "Cuban Collar Shirt", "Chambray Shirt", "Flannel Piece"],
  Tees: ["Pique Polo", "Graphic Archive Tee", "Heavyweight Boxy Tee", "Slub Henley", "V-Neck Essential"],
  Trousers: ["Chino Pants", "Selvedge Denim", "Cargo Trousers", "Pleated Dress Pants", "Linen Slacks"],
  Outerwear: ["Suede Bomber", "Technical Windbreaker", "Denim Jacket", "Trench Coat", "Track Jacket"],
  Accessories: ["Leather Watch", "Polarized Sunglasses", "Minimalist Wallet", "Suede Belt", "Canvas Tote"]
};
const menImageSeeds = ["1534030347209-467a5b0ad3e6", "1505633560063-d824df76f744", "1479064555552-3ef4979f8908", "1516257984-b1b4d707412e", "1617137968427-85924c800a22", "1618886614638-80e3c103d31a"];

export const menProducts = Array.from({ length: 200 }, (_, i) => {
  const category = menCategories[i % menCategories.length];
  const adj = menAdjectives[(i + Math.floor(i / 5)) % menAdjectives.length];
  const itemType = menItemsPool[category][Math.floor(i / menCategories.length) % menItemsPool[category].length];
  const name = `${adj} ${itemType} Vol. ${Math.floor(i / 25) + i + 1}`;
  const price = 14500 + (i * 450);
  const img = `https://images.unsplash.com/photo-${menImageSeeds[i % menImageSeeds.length]}?w=600&auto=format&fit=crop&q=80&sig=${i}&q=${category.toLowerCase()},men,fashion`;
  return { id: 100 + i, name, price, category, img, section: "Men", tags: [category.toLowerCase(), "men", "menswear", adj.toLowerCase()] };
});

const womenCategories = ["Dresses", "Tops", "Trousers", "Outerwear", "Accessories"];
const womenAdjectives = ["Silk", "Linen", "Satin", "Floral", "Structured", "Boho", "Chic", "Knitwear", "Pleated", "Velvet", "Monochrome", "Asymmetric", "Tailored", "Couture", "Minimal", "Resort"];
const womenItemsPool = {
  Dresses: ["Wrap Dress", "Midi Skirt Set", "Slip Dress", "Maxi Gown", "Evening Dress"],
  Tops: ["Blouse", "Crop Top", "Ribbed Bodysuit", "Silk Camisole", "Corset Top"],
  Trousers: ["Wide Leg Trousers", "High-Waist Pants", "Tailored Shorts", "Culottes", "Straight Denim"],
  Outerwear: ["Blazer Set", "Trench Coat", "Bouclé Jacket", "Cardigan Shrug", "Leather Jacket"],
  Accessories: ["Structured Tote", "Leather Mules", "Statement Belt", "Clutch Bag", "Drop Earrings"]
};
const womenImageSeeds = ["1494790108377-be9c29b29330", "1524504388940-b1c1722653e1", "1509631179647-0177331693ae", "1515886657613-9f3515b0c78f", "1485462537746-965f33f7f6a7", "1539109136881-3be0616acf4b"];

export const womenProducts = Array.from({ length: 200 }, (_, i) => {
  const category = womenCategories[i % womenCategories.length];
  const adj = womenAdjectives[(i + Math.floor(i / 4)) % womenAdjectives.length];
  const itemType = womenItemsPool[category][Math.floor(i / womenCategories.length) % womenItemsPool[category].length];
  const name = `${adj} ${itemType} Edt. ${Math.floor(i / 20) + i + 1}`;
  const price = 17500 + (i * 550);
  const img = `https://images.unsplash.com/photo-${womenImageSeeds[i % womenImageSeeds.length]}?w=600&auto=format&fit=crop&q=80&sig=${i + 300}&q=${category.toLowerCase()},women,style`;
  return { id: 300 + i, name, price, category, img, section: "Women", tags: [category.toLowerCase(), "women", "womenswear", "ladies", adj.toLowerCase()] };
});

const kidsAdjectives = ["Organic", "Mini", "Playful", "Toddler", "Junior", "Classic", "Cozy", "Active", "Comfy", "Premium"];
const kidsDescriptions = {
  Boys: ["Chino Shorts Set", "Denim Dungarees", "Graphic Varsity Tee", "Plaid Button-Up", "Tracksuit Set"],
  Girls: ["Linen Sun Dress", "Floral Skirt Combo", "Tulle Party Dress", "Ribbed Knit Cardigan", "Satin Bow Blouse"],
  Unisex: ["Organic Cotton Onesie", "Cozy Fleece Sweatshirt", "Canvas Overalls", "Ribbed Loungewear", "Pocket Romper"]
};
const kidsImageSeeds = ["1519457431-44ced64a64e7", "1602810318383-e386cc2a3ccf", "1503919545889-aef636e10ad4", "1622290319146-7b12c071b521", "1519238263530-99bdd11df2ea", "1566492031773-4f4e44671857"];

export const kidProducts = Array.from({ length: 150 }, (_, i) => {
  const segments = ["Boys", "Girls", "Unisex"];
  const category = segments[i % segments.length];
  const adj = kidsAdjectives[(i + Math.floor(i / 3)) % kidsAdjectives.length];
  const description = kidsDescriptions[category][Math.floor(i / segments.length) % kidsDescriptions[category].length];
  const name = `${adj} ${description} No. ${Math.floor(i / 15) + i + 1}`;
  const price = 8500 + (i * 380);
  const img = `https://images.unsplash.com/photo-${kidsImageSeeds[i % kidsImageSeeds.length]}?w=600&auto=format&fit=crop&q=80&sig=${i + 600}&q=${category.toLowerCase()},child,kid`;
  return { id: 500 + i, name, price, category, img, section: "Kids", tags: [category.toLowerCase(), "kids", "children", "junior", adj.toLowerCase()] };
});

// The master catalog list compiled for smart fuzzy/global matching
export const allProducts = [...menProducts, ...womenProducts, ...kidProducts];