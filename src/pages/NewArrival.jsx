import { useState } from "react";

const products = [
  // WOMEN (40 ITEMS)
  {
    id: 1,
    name: "Ivory Linen Blazer",
    category: "Women",
    price: "₦42,500",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
  },
  {
    id: 2,
    name: "Caramel Wrap Dress",
    category: "Women",
    price: "₦28,000",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80",
  },
  {
    id: 3,
    name: "Satin Slip Co-ord Set",
    category: "Women",
    price: "₦35,000",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
  },
  {
    id: 4,
    name: "Onyx Pleated Trousers",
    category: "Women",
    price: "₦19,500",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&q=80",
  },
  {
    id: 5,
    name: "Blush Puff-Sleeve Blouse",
    category: "Women",
    price: "₦16,000",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&q=80",
  },
  {
    id: 6,
    name: "Mocha Trench Coat",
    category: "Women",
    price: "₦67,000",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&q=80",
  },
  {
    id: 7,
    name: "Gold-Buckle Midi Skirt",
    category: "Women",
    price: "₦22,000",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&q=80",
  },
  {
    id: 8,
    name: "Terracotta Knit Jumper",
    category: "Women",
    price: "₦24,500",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80",
  },
  {
    id: 9,
    name: "White Structured Blazer",
    category: "Women",
    price: "₦39,000",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&q=80",
  },
  {
    id: 10,
    name: "Sage Maxi Sundress",
    category: "Women",
    price: "₦26,000",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80",
  },
  {
    id: 11,
    name: "Black Cutout Bodysuit",
    category: "Women",
    price: "₦14,500",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80",
  },
  {
    id: 12,
    name: "Cream Tailored Suit",
    category: "Women",
    price: "₦58,000",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?w=600&q=80",
  },
  {
    id: 13,
    name: "Dusty Rose Midi Dress",
    category: "Women",
    price: "₦31,000",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1495385794356-15371f348c31?w=600&q=80",
  },
  {
    id: 14,
    name: "Leopard Print Cardigan",
    category: "Women",
    price: "₦18,500",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1485231183945-faa1866779db?w=600&q=80",
  },
  {
    id: 15,
    name: "Navy High-Waist Trousers",
    category: "Women",
    price: "₦17,000",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1594633313231-2059a239b858?w=600&q=80",
  },
  {
    id: 16,
    name: "Faux Leather Mini Skirt",
    category: "Women",
    price: "₦15,000",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=600&q=80",
  },
  {
    id: 17,
    name: "Lilac Silk Shirt Dress",
    category: "Women",
    price: "₦29,500",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80",
  },
  {
    id: 18,
    name: "Monochrome Jogger Set",
    category: "Women",
    price: "₦21,000",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
  },
  {
    id: 19,
    name: "Bronze Sequin Top",
    category: "Women",
    price: "₦13,500",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1550639525-c97d455acf70?w=600&q=80",
  },
  {
    id: 20,
    name: "Off-White Boho Blouse",
    category: "Women",
    price: "₦12,000",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1518622358354-972fd40f8069?w=600&q=80",
  },
  {
    id: 21,
    name: "Charcoal Power Suit",
    category: "Women",
    price: "₦62,000",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80",
  },
  {
    id: 22,
    name: "Rust Flare Pants",
    category: "Women",
    price: "₦20,000",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
  },
  {
    id: 23,
    name: "Pearl Button Shacket",
    category: "Women",
    price: "₦32,000",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80",
  },
  {
    id: 24,
    name: "Stone Asymmetric Hem Dress",
    category: "Women",
    price: "₦27,500",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&q=80",
  },
  {
    id: 25,
    name: "Midnight Velvet Blazer",
    category: "Women",
    price: "₦44,000",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?w=600&q=80",
  },
  {
    id: 26,
    name: "Emerald Green Satin Gown",
    category: "Women",
    price: "₦48,000",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1539008835279-43469388149b?w=600&q=80",
  },
  {
    id: 27,
    name: "Beige Cashmere Cardigan",
    category: "Women",
    price: "₦34,000",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1583846714263-924c15112851?w=600&q=80",
  },
  {
    id: 28,
    name: "Polka Dot Midi Skirt",
    category: "Women",
    price: "₦16,500",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=600&q=80",
  },
  {
    id: 29,
    name: "Cinnamon Ribbed Tank",
    category: "Women",
    price: "₦9,500",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80",
  },
  {
    id: 30,
    name: "Denim Utility Dress",
    category: "Women",
    price: "₦25,000",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1515347648452-f8dc2ad30fdc?w=600&q=80",
  },
  {
    id: 31,
    name: "Oatmeal Turtle Neck",
    category: "Women",
    price: "₦18,000",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80",
  },
  {
    id: 32,
    name: "Silver Pleated Skirt",
    category: "Women",
    price: "₦21,500",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1582142306909-195724d33ffc?w=600&q=80",
  },
  {
    id: 33,
    name: "Classic Navy Peacoat",
    category: "Women",
    price: "₦55,000",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600&q=80",
  },
  {
    id: 34,
    name: "Lace Overlay Top",
    category: "Women",
    price: "₦15,000",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=600&q=80",
  },
  {
    id: 35,
    name: "Burgundy Wide-Leg Trousers",
    category: "Women",
    price: "₦22,500",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&q=80",
  },
  {
    id: 36,
    name: "Checkered Shacket",
    category: "Women",
    price: "₦31,000",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
  },
  {
    id: 37,
    name: "Fuchsia Cocktail Dress",
    category: "Women",
    price: "₦39,500",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80",
  },
  {
    id: 38,
    name: "Beige Wide-Brim Hat",
    category: "Women",
    price: "₦12,000",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1533227432537-70133748f5c8?w=600&q=80",
  },
  {
    id: 39,
    name: "Mauve Knit Vest",
    category: "Women",
    price: "₦14,000",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1556905055-8f358a7a4bb4?w=600&q=80",
  },
  {
    id: 40,
    name: "Slate Grey Poncho",
    category: "Women",
    price: "₦28,000",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80",
  },

  // MEN (40 ITEMS)
  {
    id: 41,
    name: "Slate Grey Linen Suit",
    category: "Men",
    price: "₦75,000",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  },
  {
    id: 42,
    name: "Camel Overcoat",
    category: "Men",
    price: "₦88,000",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=600&q=80",
  },
  {
    id: 43,
    name: "Charcoal Turtleneck",
    category: "Men",
    price: "₦14,000",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1614676466645-fd9b9516641b?w=600&q=80",
  },
  {
    id: 44,
    name: "Navy Chino Trousers",
    category: "Men",
    price: "₦18,500",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80",
  },
  {
    id: 45,
    name: "Ecru Relaxed Linen Shirt",
    category: "Men",
    price: "₦16,000",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1598411031711-da3ad309e7a3?w=600&q=80",
  },
  {
    id: 46,
    name: "Olive Utility Jacket",
    category: "Men",
    price: "₦48,000",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&q=80",
  },
  {
    id: 47,
    name: "Black Slim Fit Blazer",
    category: "Men",
    price: "₦55,000",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80",
  },
  {
    id: 48,
    name: "Burgundy Knit Polo",
    category: "Men",
    price: "₦11,500",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1618517351616-38fb9c5210c6?w=600&q=80",
  },
  {
    id: 49,
    name: "White Oxford Button-Down",
    category: "Men",
    price: "₦13,000",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80",
  },
  {
    id: 50,
    name: "Khaki Cargo Trousers",
    category: "Men",
    price: "₦22,000",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1475178626620-a4d074967452?w=600&q=80",
  },
  {
    id: 51,
    name: "Stone Tailored Joggers",
    category: "Men",
    price: "₦19,000",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80",
  },
  {
    id: 52,
    name: "Forest Green Bomber",
    category: "Men",
    price: "₦46,000",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&q=80",
  },
  {
    id: 53,
    name: "Striped Linen Blazer",
    category: "Men",
    price: "₦41,000",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1556622123-5e81f7d5440d?w=600&q=80",
  },
  {
    id: 54,
    name: "Rust Crewneck Sweater",
    category: "Men",
    price: "₦15,500",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80",
  },
  {
    id: 55,
    name: "Grey Marl Hoodie",
    category: "Men",
    price: "₦12,500",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80",
  },
  {
    id: 56,
    name: "Black Denim Jacket",
    category: "Men",
    price: "₦37,000",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?w=600&q=80",
  },
  {
    id: 57,
    name: "Cobalt Blue Dress Shirt",
    category: "Men",
    price: "₦14,500",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1598411031711-da3ad309e7a3?w=600&q=80",
  },
  {
    id: 58,
    name: "Sand Linen Shorts",
    category: "Men",
    price: "₦9,500",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&q=80",
  },
  {
    id: 59,
    name: "Charcoal Slim Chinos",
    category: "Men",
    price: "₦20,000",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80",
  },
  {
    id: 60,
    name: "Mocha Suede Shirt",
    category: "Men",
    price: "₦28,000",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1555421689-d68471e189f2?w=600&q=80",
  },
  {
    id: 61,
    name: "Ivory Quilted Vest",
    category: "Men",
    price: "₦23,500",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1614676466645-fd9b9516641b?w=600&q=80",
  },
  {
    id: 62,
    name: "Navy Pinstripe Trousers",
    category: "Men",
    price: "₦25,000",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80",
  },
  {
    id: 63,
    name: "Black Rollneck Knit",
    category: "Men",
    price: "₦13,000",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1614676466645-fd9b9516641b?w=600&q=80",
  },
  {
    id: 64,
    name: "Tan Leather Biker Jacket",
    category: "Men",
    price: "₦92,000",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80",
  },
  {
    id: 65,
    name: "Ecru Oversized Hoodie",
    category: "Men",
    price: "₦16,000",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1523380677598-64d85d2e4b43?w=600&q=80",
  },
  {
    id: 66,
    name: "Teal Summer Shirt",
    category: "Men",
    price: "₦12,500",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=600&q=80",
  },
  {
    id: 67,
    name: "Classic Trench Coat",
    category: "Men",
    price: "₦78,000",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
  },
  {
    id: 68,
    name: "Graphite V-Neck Sweater",
    category: "Men",
    price: "₦14,500",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80",
  },
  {
    id: 69,
    name: "White Linen Trousers",
    category: "Men",
    price: "₦19,500",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1504198266287-1659872e6590?w=600&q=80",
  },
  {
    id: 70,
    name: "Burgundy Velvet Tuxedo",
    category: "Men",
    price: "₦110,000",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80",
  },
  {
    id: 71,
    name: "Denim Trucker Jacket",
    category: "Men",
    price: "₦32,000",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?w=600&q=80",
  },
  {
    id: 72,
    name: "Beige Ribbed Beanie",
    category: "Men",
    price: "₦6,000",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600&q=80",
  },
  {
    id: 73,
    name: "Mauve Oversized Tee",
    category: "Men",
    price: "₦8,500",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
  },
  {
    id: 74,
    name: "Dark Green Harrington",
    category: "Men",
    price: "₦42,000",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
  },
  {
    id: 75,
    name: "Black Combat Boots",
    category: "Men",
    price: "₦45,000",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=600&q=80",
  },
  {
    id: 76,
    name: "Brown Corduroy Shirt",
    category: "Men",
    price: "₦18,000",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1598411031711-da3ad309e7a3?w=600&q=80",
  },
  {
    id: 77,
    name: "Striped Jersey Top",
    category: "Men",
    price: "₦9,000",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80",
  },
  {
    id: 78,
    name: "Grey Wool Scarf",
    category: "Men",
    price: "₦11,000",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600&q=80",
  },
  {
    id: 79,
    name: "Tan Chelsea Boots",
    category: "Men",
    price: "₦58,000",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=600&q=80",
  },
  {
    id: 80,
    name: "Navy Knit Beanie",
    category: "Men",
    price: "₦5,500",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600&q=80",
  },

  // KIDS (20 ITEMS)
  {
    id: 81,
    name: "Mint Dungaree Set",
    category: "Kids",
    price: "₦8,500",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&q=80",
  },
  {
    id: 82,
    name: "Rainbow Stripe T-Shirt",
    category: "Kids",
    price: "₦5,000",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&q=80",
  },
  {
    id: 83,
    name: "Navy Puffer Gilet",
    category: "Kids",
    price: "₦14,000",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=600&q=80",
  },
  {
    id: 84,
    name: "Floral Smock Dress",
    category: "Kids",
    price: "₦9,500",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600&q=80",
  },
  {
    id: 85,
    name: "Dino Print Jogger Set",
    category: "Kids",
    price: "₦7,500",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&q=80",
  },
  {
    id: 86,
    name: "Red Tartan Shirt",
    category: "Kids",
    price: "₦6,500",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1533228100845-08145b01de14?w=600&q=80",
  },
  {
    id: 87,
    name: "Yellow Knit Cardigan",
    category: "Kids",
    price: "₦8,000",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600&q=80",
  },
  {
    id: 88,
    name: "Pastel Tie-Dye Hoodie",
    category: "Kids",
    price: "₦7,000",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1537815749002-de6a533c64db?w=600&q=80",
  },
  {
    id: 89,
    name: "Striped Cotton Shorts",
    category: "Kids",
    price: "₦4,500",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600&q=80",
  },
  {
    id: 90,
    name: "Mustard Corduroy Jacket",
    category: "Kids",
    price: "₦12,000",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=600&q=80",
  },
  {
    id: 91,
    name: "Lavender Tutu Dress",
    category: "Kids",
    price: "₦11,000",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1518826778770-a729fb53327c?w=600&q=80",
  },
  {
    id: 92,
    name: "Sky Blue Linen Shirt",
    category: "Kids",
    price: "₦5,500",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1444124818704-4d89a495bdec?w=600&q=80",
  },
  {
    id: 93,
    name: "Cream Cable Knit Sweater",
    category: "Kids",
    price: "₦9,000",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80",
  },
  {
    id: 94,
    name: "Animal Print Leggings",
    category: "Kids",
    price: "₦4,000",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=600&q=80",
  },
  {
    id: 95,
    name: "Forest Print Raincoat",
    category: "Kids",
    price: "₦16,500",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
  },
  {
    id: 96,
    name: "Coral Swimsuit",
    category: "Kids",
    price: "₦6,000",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&q=80",
  },
  {
    id: 97,
    name: "Grey Marl Tracksuit",
    category: "Kids",
    price: "₦10,500",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1519612333659-3c386769da53?w=600&q=80",
  },
  {
    id: 98,
    name: "Pink Quilted Jacket",
    category: "Kids",
    price: "₦13,500",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1504707748692-419802cf939d?w=600&q=80",
  },
  {
    id: 99,
    name: "Emerald Velvet Dress",
    category: "Kids",
    price: "₦10,000",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80",
  },
  {
    id: 100,
    name: "White Embroidered Romper",
    category: "Kids",
    price: "₦7,500",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&q=80",
  },
];

const filters = ["All", "Women", "Men", "Kids"];

// Refactored to premium translucent dark tags to keep system consistency
const categoryColors = {
  Women: "bg-white/5 text-white/80 border border-white/10",
  Men: "bg-white/5 text-white/80 border border-white/10",
  Kids: "bg-white/5 text-white/80 border border-white/10",
};

export default function NewArrival() {
  const [active, setActive] = useState("All");
  const brandBlue = "#0070f3";

  const visible =
    active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <section
      className="min-h-screen py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-[#020202]"
    >
      {/* ── Header ── */}
      <div className="max-w-7xl mx-auto mb-12 text-center px-4">
        <p
          className="text-[10px] sm:text-xs tracking-[0.35em] uppercase mb-3 font-semibold"
          style={{ color: brandBlue }}
        >
          Just Landed
        </p>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 uppercase"
          style={{
            fontFamily: "inherit",
            color: "#ffffff",
            letterSpacing: "-0.02em",
          }}
        >
          New Arrivals
        </h2>
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="h-px w-12 sm:w-16 bg-white/10" />
          <div
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: brandBlue }}
          />
          <div className="h-px w-12 sm:w-16 bg-white/10" />
        </div>
        <p className="text-xs sm:text-sm text-white/50 mt-4 max-w-md mx-auto leading-relaxed">
          Discover the freshest pieces curated for every style — from boardroom
          to playground.
        </p>
      </div>

      {/* ── Filter Tabs ── */}
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-10 px-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className="relative px-5 sm:px-7 py-2 sm:py-2.5 text-xs sm:text-sm font-black rounded-sm transition-all duration-300 tracking-widest uppercase overflow-hidden min-w-[70px] sm:min-w-[90px] text-center border"
            style={
              active === f
                ? {
                    background: brandBlue,
                    borderColor: brandBlue,
                    color: "#ffffff",
                    boxShadow: "0 4px 20px rgba(0,112,243,0.3)",
                    transform: "translateY(-1px)",
                  }
                : {
                    background: "rgba(255,255,255,0.03)",
                    borderColor: "rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.6)",
                  }
            }
          >
            {f}
          </button>
        ))}
      </div>

      {/* ── Count ── */}
      <div className="max-w-7xl mx-auto mb-6 px-2">
        <p className="text-[10px] sm:text-xs text-white/40 tracking-widest uppercase text-center sm:text-left font-bold">
          Showing {visible.length} item{visible.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* ── Grid ── */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 px-0">
        {visible.map((product) => (
          <ProductCard key={product.id} product={product} brandBlue={brandBlue} />
        ))}
      </div>

      {/* ── Footer CTA ── */}
      <div className="max-w-7xl mx-auto text-center mt-14 sm:mt-16 px-4">
        <button
          className="w-full sm:w-auto px-8 sm:px-10 py-4 text-xs sm:text-sm font-black tracking-widest uppercase rounded-sm transition-all duration-300 active:scale-95 border border-white/10 bg-white text-black hover:bg-zinc-200"
        >
          Explore All Collections
        </button>
      </div>
    </section>
  );
}

function ProductCard({ product, brandBlue }) {
  return (
    <div
      className="group relative bg-[#0b0b0c] rounded-2xl overflow-hidden flex flex-col cursor-pointer w-full border border-white/[0.06]"
      style={{
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        transition: "box-shadow 0.35s ease, transform 0.35s ease, border-color 0.35s ease",
      }}
      onMouseEnter={(e) => {
        if (window.innerWidth >= 640) {
          e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.6)";
          e.currentTarget.style.transform = "translateY(-6px)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
      }}
    >
      <div className="relative overflow-hidden w-full" style={{ aspectRatio: "3/4" }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 sm:group-hover:scale-105"
          loading="lazy"
        />

        <div
          className="absolute inset-0 opacity-40 sm:group-hover:opacity-60 transition-opacity duration-400 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)",
          }}
        />

        {product.isNew && (
          <div
            className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2.5 py-1 text-[8px] sm:text-[9px] font-black tracking-[0.2em] uppercase rounded-sm"
            style={{
              background: brandBlue,
              color: "#fff",
              boxShadow: "0 2px 10px rgba(0,112,243,0.4)",
            }}
          >
            New
          </div>
        )}

        {/* Quick View Button */}
        <div className="absolute bottom-2 sm:bottom-3 left-0 right-0 flex justify-center opacity-0 sm:group-hover:opacity-100 transition-all duration-300 translate-y-2 sm:group-hover:translate-y-0 px-3">
          <button
            className="w-full px-3 py-2 text-[9px] sm:text-xs font-black tracking-widest uppercase rounded-sm truncate"
            style={{ background: "#fff", color: "#000" }}
          >
            Quick View
          </button>
        </div>
      </div>

      <div className="p-3 sm:p-4 flex flex-col gap-2 flex-1 bg-[#0b0b0c]">
        <span
          className={`self-start text-[8px] sm:text-[9px] font-black tracking-widest uppercase px-2.5 py-1 rounded-sm ${categoryColors[product.category]}`}
        >
          {product.category}
        </span>

        <h3
          className="text-xs sm:text-sm font-medium leading-snug line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem] text-white/80 group-hover:text-white transition-colors"
        >
          {product.name}
        </h3>

        <div className="flex items-center justify-between mt-auto pt-2.5 border-t border-white/[0.06] gap-1">
          <span className="text-sm sm:text-base font-black truncate text-white">
            {product.price}
          </span>
          <button
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 flex-shrink-0 border border-white/10 text-white/70 hover:text-black"
            style={{ background: "rgba(255,255,255,0.03)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#ffffff";
              e.currentTarget.style.borderColor = "#ffffff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.03)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
            }}
            aria-label="Add to cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5 sm:w-4 sm:h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: "inherit" }}
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}