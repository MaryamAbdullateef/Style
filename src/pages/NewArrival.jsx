import { useState, useEffect } from "react";
// Import the application cart context hook to seamlessly sync states across the application navbar
import { useCart } from "../context/CartContext";

const products = [
  // WOMEN (40 ITEMS)
  {
    id: 1,
    name: "Ivory Linen Blazer",
    category: "Women",
    price: "₦22,500",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8V29tZW4lMjBJdm9yeSUyMExpbmVuJTIwQmxhemVyfGVufDB8fDB8fHww",
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
      "https://images.unsplash.com/photo-1766056278825-55168658f120?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8V29tZW4lMjBTYXRpbiUyMFNsaXAlMjBDby1vcmQlMjBTZXR8ZW58MHx8MHx8fDA%3D",
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
      "https://images.unsplash.com/photo-1673658173863-a28be73c7f90?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8V29tZW4lMjBXaGl0ZSUyMFN0cnVjdHVyZWQlMjBCbGF6ZXJ8ZW58MHx8MHx8fDA%3D",
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
      "https://images.unsplash.com/photo-1734292417928-f18d6f223afd?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 15,
    name: "Navy High-Waist Trousers",
    category: "Women",
    price: "₦17,000",
    isNew: false,
    image:
      "https://media.istockphoto.com/id/2266861931/photo/womens-baggy-leggings-fitness-outfit-mockup-loose-fit-pants-front-and-back-view.webp?a=1&b=1&s=612x612&w=0&k=20&c=XqZP0wr0u17QzJgTqlgzicONBKGIJPYsXPZSjcmM_3A=",
  },
  {
    id: 16,
    name: "Faux Leather Mini Skirt",
    category: "Women",
    price: "₦15,000",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1725071421723-a191fdfa71ea?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fFdvbWVuJTIwRmF1eCUyMExlYXRoZXIlMjBNaW5pJTIwU2tpcnR8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 17,
    name: "Lilac Silk Shirt Dress",
    category: "Women",
    price: "₦29,500",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1645641909565-88babb6ccf5c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fFdvbWVuJTIwTGlsYWMlMjBTaWxrJTIwU2hpcnQlMjBEcmVzc3xlbnwwfHwwfHx8MA%3D%3D",
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
      "https://images.unsplash.com/photo-1554787497-98caae0f95df?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8V29tZW4lMjBCcm9uemUlMjBTZXF1aW4lMjBUb3B8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 20,
    name: "Off-White Boho Blouse",
    category: "Women",
    price: "₦12,000",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8V29tZW4lMjBPZmYtV2hpdGUlMjBCb2hvJTIwQmxvdXNlfGVufDB8fDB8fHww",
  },
  {
    id: 21,
    name: "Charcoal Power Suit",
    category: "Women",
    price: "₦62,000",
    isNew: true,
    image:
      "https://media.istockphoto.com/id/2273265588/photo/elegant-businesswoman-standing-outdoors-near-modern-office-building.webp?a=1&b=1&s=612x612&w=0&k=20&c=ci5-CQyFD6zhlgTCUrnkT5d7s6ZpbwcliiEnCBdaD1g=",
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
      "https://images.unsplash.com/photo-1672380300750-6294c5614695?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8V29tZW4lMjBQZWFybCUyMEJ1dHRvbiUyMFNoYWNrZXR8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 24,
    name: "Stone Asymmetric Hem Dress",
    category: "Women",
    price: "₦27,500",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1624278268445-6a58c27656ec?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8V29tZW4lMjBTdG9uZSUyMEFzeW1tZXRyaWMlMjBIZW0lMjBEcmVzc3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 25,
    name: "Midnight Velvet Blazer",
    category: "Women",
    price: "₦44,000",
    isNew: true,
    image:
      "https://media.istockphoto.com/id/185068880/photo/happy-smiling-young-woman-in-blazer.webp?a=1&b=1&s=612x612&w=0&k=20&c=lZK32hZdJEyIxu6235M_Td_YlqqBsxt4V9pNigTeOVk=",
  },
  {
    id: 26,
    name: "Emerald Green Satin Gown",
    category: "Women",
    price: "₦48,000",
    isNew: true,
    image:
      "https://media.istockphoto.com/id/1155692472/photo/fashion-model-in-long-dress-back-view-woman-beauty-in-gown-rear-view-full-length-on-white.webp?a=1&b=1&s=612x612&w=0&k=20&c=tmmfL7nwmUYfXtxX07O0_VQCJz15sqPJ5Ln2gCQs2nU=",
  },
  {
    id: 27,
    name: "Beige Cashmere Cardigan",
    category: "Women",
    price: "₦34,000",
    isNew: false,
    image:
      "https://media.istockphoto.com/id/2255365081/photo/graceful-young-woman-in-warm-beige-sweater-against-smooth-gradient-background-conveying-beauty.webp?a=1&b=1&s=612x612&w=0&k=20&c=tVtHQLXTx2_HcZzGRasI_gOS-LX-pWTWYoemjtIXai8=",
  },
  {
    id: 28,
    name: "Polka Dot Midi Skirt",
    category: "Women",
    price: "₦16,500",
    isNew: true,
    image:
      "https://media.istockphoto.com/id/1393755192/photo/joyful-young-woman-dancing.webp?a=1&b=1&s=612x612&w=0&k=20&c=owT68b3GmkNDAn2zBtxl7Y8gIMnnNhDCdtO4bVfD7_o=",
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
      "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8V29tZW4lMjBEZW5pbSUyMFV0aWxpdHklMjBEcmVzc3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 31,
    name: "Oatmeal Turtle Neck",
    category: "Women",
    price: "₦18,000",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1573197138497-40400501ac3d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8V29tZW4lMjBPYXRtZWFsJTIwVHVydGxlJTIwTmVja3xlbnwwfHwwfHx8MA%3D%3D",
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
      "https://images.unsplash.com/photo-1581081874522-5178e6d08e74?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fFdvbWVuJTIwQ2xhc3NpYyUyME5hdnklMjBQZWFjb2F0fGVufDB8fDB8fHww",
  },
  {
    id: 34,
    name: "Lace Overlay Top",
    category: "Women",
    price: "₦15,000",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1552273130-aa3b24fb22b2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8V29tZW4lMjBMYWNlJTIwT3ZlcmxheSUyMFRvcHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 35,
    name: "Burgundy Wide-Leg Trousers",
    category: "Women",
    price: "₦22,500",
    isNew: false,
    image:
      "https://plus.unsplash.com/premium_photo-1783874829440-b99f435a1d77?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fFdvbWVuJTIwQnVyZ3VuZHklMjBXaWRlLUxlZyUyMFRyb3VzZXJzfGVufDB8fDB8fHww",
  },
  {
    id: 36,
    name: "Checkered Shacket",
    category: "Women",
    price: "₦31,000",
    isNew: true,
    image:
      "https://media.istockphoto.com/id/2275967379/photo/woman-and-girl-in-shirts-and-jeans-posing-in-studio.webp?a=1&b=1&s=612x612&w=0&k=20&c=_QLdnBPd19QbDzQqs-f-yPDGljFv0VfiWkG3lKrbfjQ=",
  },
  {
    id: 37,
    name: "Fuchsia Cocktail Dress",
    category: "Women",
    price: "₦39,500",
    isNew: false,
    image:
      "https://media.istockphoto.com/id/1165095819/photo/happy-beautiful-woman-in-purple-dress-is-looking-up-and-shouting.webp?a=1&b=1&s=612x612&w=0&k=20&c=d5hFdElk7TiOkT1J2wp-ramK3c-XjLV-RV4CKF5a59U=",
  },
  {
    id: 38,
    name: "Beige Wide-Brim Hat",
    category: "Women",
    price: "₦12,000",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1629381565968-90a5dfe1dd57?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fFdvbWVuJTIwQmVpZ2UlMjBXaWRlLUJyaW0lMjBIYXR8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 39,
    name: "Mauve Knit Vest",
    category: "Women",
    price: "₦14,000",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1625722675156-0d24f0181d8f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8V29tZW4lMjBNYXV2ZSUyMEtuaXQlMjBWZXN0fGVufDB8fDB8fHww",
  },
  {
    id: 40,
    name: "Slate Grey Poncho",
    category: "Women",
    price: "₦28,000",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1679101893304-045625840a94?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TWVuJTIwU2xhdGUlMjBHcmV5JTIwTGluZW4lMjBTdWl0fGVufDB8fDB8fHwwhttps://images.unsplash.com/photo-1621062089461-01f1eaebb66c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8TWVuJTIwU2xhdGUlMjBHcmV5JTIwTGluZW4lMjBTdWl0fGVufDB8fDB8fHww",
  },

  // MEN (40 ITEMS)
  {
    id: 41,
    name: "Slate Grey Linen Suit",
    category: "Men",
    price: "₦75,000",
    isNew: true,
    image:
      "https://imageshttps://images.unsplash.com/photo-1679101893304-045625840a94?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TWVuJTIwU2xhdGUlMjBHcmV5JTIwTGluZW4lMjBTdWl0fGVufDB8fDB8fHww.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  },
  {
    id: 42,
    name: "Camel Overcoat",
    category: "Men",
    price: "₦88,000",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=600&q=80https://images.unsplash.com/photo-1619603364937-8d7af41ef206?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TWVuJTIwQ2FtZWwlMjBPdmVyY29hdHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 43,
    name: "Charcoal Turtleneck",
    category: "Men",
    price: "₦14,000",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1599542829769-9ab0c324b4dd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fE1lbiUyMENoYXJjb2FsJTIwVHVydGxlbmVja3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 44,
    name: "Navy Chino Trousers",
    category: "Men",
    price: "₦18,500",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1624378441864-6eda7eac51cb?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 45,
    name: "Ecru Relaxed Linen Shirt",
    category: "Men",
    price: "₦16,000",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1690576639506-aebeccf53744?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8TWVuJTIwRWNydSUyMFJlbGF4ZWQlMjBMaW5lbiUyMFNoaXJ0fGVufDB8fDB8fHww",
  },
  {
    id: 46,
    name: "Olive Utility Jacket",
    category: "Men",
    price: "₦48,000",
    isNew: false,
    image:
      "https://media.istockphoto.com/id/2228418745/photo/man-browsing-through-selections-of-clothes-on-a-rack-while-shopping-in-a-mall.webp?a=1&b=1&s=612x612&w=0&k=20&c=H9L-CFIdzKUaxeFkxWUKFiznyPZ1JPGfh31Y5d4gwxc=",
  },
  {
    id: 47,
    name: "Black Slim Fit Blazer",
    category: "Men",
    price: "₦55,000",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=https://plus.unsplash.com/premium_photo-1661328296168-a176df63bcfc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8TWVuJTIwQmxhY2slMjBTbGltJTIwRml0JTIwQmxhemVyfGVufDB8fDB8fHww&q=80",
  },
  {
    id: 48,
    name: "Burgundy Knit Polo",
    category: "Men",
    price: "₦11,500",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1618517351616-https://media.istockphoto.com/id/2208261043/photo/photo-of-attractive-young-confident-businessman-look-empty-space-brainstorming-isolated-on.webp?a=1&b=1&s=612x612&w=0&k=20&c=7JOcnpIoo5h5eix7yR_VIJyVeHnSV8rujHm2mJtwc08=?w=600&q=80",
  },
  {
    id: 49,
    name: "White Oxford Button-Down",
    category: "Men",
    price: "₦13,000",
    isNew: false,
    image:
      "https://plus.unsplash.com/premium_photo-1678218594563-9fe0d16c6838?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TWVuJTIwV2hpdGUlMjBPeGZvcmQlMjBCdXR0b24tRG93bnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 50,
    name: "Khaki Cargo Trousers",
    category: "Men",
    price: "₦22,000",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1706287043719-3fad472e98a6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TWVuJTIwS2hha2klMjBDYXJnbyUyMFRyb3VzZXJzJTIwaW4lMjBoYW5nZXJ8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 51,
    name: "Stone Tailored Joggers",
    category: "Men",
    price: "₦19,000",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1634564235572-cd6f37694266?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fE1lbiUyMFN0b25lJTIwVGFpbG9yZWQlMjBKb2dnZXJzJTIwaW4lMjBoYW5nZXJ8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 52,
    name: "Forest Green Bomber",
    category: "Men",
    price: "₦46,000",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1549399239-fb3c102d3d71?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TWVuJTIwRm9yZXN0JTIwR3JlZW4lMjBCb21iZXJ8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 53,
    name: "Striped Linen Blazer",
    category: "Men",
    price: "₦41,000",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1480429370139-e0132c086e2a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TWVuJTIwU3RyaXBlZCUyMExpbmVuJTIwQmxhemVyfGVufDB8fDB8fHww",
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
      "https://images.unsplash.com/photo-1665873493506-b37aae50de97?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8TWVuJTIwR3JleSUyME1hcmwlMjBIb29kaWV8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 56,
    name: "Black Denim Jacket",
    category: "Men",
    price: "₦37,000",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1549237511-bbe6a0979d6a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TWVuJTIwQmxhY2slMjBEZW5pbSUyMEphY2tldHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 57,
    name: "Cobalt Blue Dress Shirt",
    category: "Men",
    price: "₦14,500",
    isNew: true,
    image:
      "https://media.istockphoto.com/id/2195403526/photo/fashion-of-a-salary-man.webp?a=1&b=1&s=612x612&w=0&k=20&c=U691gl25q7aIIwYXmuxspCBT44MW5sGyRpPt2HowCEM=",
  },
  {
    id: 58,
    name: "Sand Linen Shorts",
    category: "Men",
    price: "₦9,500",
    isNew: false,
    image:
      "https://media.istockphoto.com/id/637314404/photo/brown-chino-pants.webp?a=1&b=1&s=612x612&w=0&k=20&c=A95NQ3Ql3pEnWoXzRDbmaBe8j6Q7pdH18D7AmbZEHEQ=",
  },
  {
    id: 59,
    name: "Charcoal Slim Chinos",
    category: "Men",
    price: "₦20,000",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1636533105123-a47d57a99aa1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fE1lbiUyMENoYXJjb2FsJTIwU2xpbSUyMENoaW5vc3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 60,
    name: "Mocha Suede Shirt",
    category: "Men",
    price: "₦28,000",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1582975854796-16ebbd9367c0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fE1lbiUyME1vY2hhJTIwU3VlZGUlMjBTaGlydHxlbnwwfHwwfHx8MA%3D%3D",
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
      "https://plus.unsplash.com/premium_photo-1731938155813-a0a73400d8e1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fE1lbiUyME5hdnklMjBQaW5zdHJpcGUlMjBUcm91c2VycyUyMGluJTIwaGFuZ2VyfGVufDB8fDB8fHww",
  },
  {
    id: 63,
    name: "Black Rollneck Knit",
    category: "Men",
    price: "₦13,000",
    isNew: true,
    image:
      "https://media.istockphoto.com/id/2189421564/photo/black-man-looking-to-the-side-with-joined-hands-isolated-on-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=PXI7SiUcYfhmDocwxq6Wj7lqbgiR4tT7xK2OjdLhPGg=",
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
      "https://media.istockphoto.com/id/1945302404/photo/front-and-back-views-of-a-man-wearing-a-white-oversized-hoodie-with-blank-space-ideal-for-a.webp?a=1&b=1&s=612x612&w=0&k=20&c=WYob5yCpwJznT0AfHmi3er70w4WLqwNP6k_4AVm54Fo=",
  },
  {
    id: 66,
    name: "Teal Summer Shirt",
    category: "Men",
    price: "₦12,500",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1717724162644-75f624f413ca?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TWVuJTIwVGVhbCUyMFN1bW1lciUyMFNoaXJ0fGVufDB8fDB8fHww",
  },
  {
    id: 67,
    name: "Classic Trench Coat",
    category: "Men",
    price: "₦78,000",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1575862980084-cd0645edddba?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8TWVuJTIwQ2xhc3NpYyUyMFRyZW5jaCUyMENvYXR8ZW58MHx8MHx8fDA%3D",
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
      "https://media.istockphoto.com/id/2023896997/photo/white-classic-pants-on-hanger-mockup.webp?a=1&b=1&s=612x612&w=0&k=20&c=_cGjcS-bltreCBryYBwpExk5Zr8_7G646m5vPdkJ1lE=",
  },
  {
    id: 70,
    name: "Burgundy Velvet Tuxedo",
    category: "Men",
    price: "₦110,000",
    isNew: true,
    image:
      "https://media.istockphoto.com/id/643056998/photo/formal-dinner-jacket-and-bow-tie.webp?a=1&b=1&s=612x612&w=0&k=20&c=Xtz_Of216Ye0xZOymZ18RJctzlIIa0ByaNFA-krbpas=",
  },
  {
    id: 71,
    name: "Denim Trucker Jacket",
    category: "Men",
    price: "₦32,000",
    isNew: false,
    image:
      "https://plus.unsplash.com/premium_photo-1671030274122-b6ac34f87b8b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TWVuJTIwRGVuaW0lMjBUcnVja2VyJTIwSmFja2V0JTIwaW4lMjBoYW5nZXJ8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 72,
    name: "Beige Ribbed Beanie",
    category: "Men",
    price: "₦6,000",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1630691650107-53dd500d2907?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fE1lbiUyMEJlaWdlJTIwUmliYmVkJTIwQmVhbmllaW4lMjBoYW5nZXJ8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 73,
    name: "Mauve Oversized Tee",
    category: "Men",
    price: "₦8,500",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1626497764746-6dc36546b388?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8TWVuJTIwTWF1dmUlMjBpbiUyMGhhbmdlcnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 74,
    name: "Dark Green Harrington",
    category: "Men",
    price: "₦42,000",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1595790751907-75201e9996e5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TWVuJTIwRGFyayUyMEdyZWVuJTIwSGFycmluZ3RvbnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 75,
    name: "Red Combat Boots",
    category: "Men",
    price: "₦45,000",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1608976989382-d913f97920c8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 76,
    name: "Brown Corduroy Shirt",
    category: "Men",
    price: "₦18,000",
    isNew: true,
    image:
      "https://media.istockphoto.com/id/2217624499/photo/stylish-man-adjusting-sunglasses-on-yellow-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=idEAdfHfSNSIsLlIpk9cX5IFBIV9wITVZpiXcbwfyew=",
  },
  {
    id: 77,
    name: "Striped Jersey Top",
    category: "Men",
    price: "₦9,000",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1754167695553-10d09845100b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 78,
    name: "Grey Wool Scarf",
    category: "Men",
    price: "₦8,000",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1737061556932-f4930f59b8d0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fE1lbiUyMEdyZXklMjBXb29sJTIwU2NhcmZ8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 79,
    name: "Tan Top",
    category: "Men",
    price: "₦38,000",
    isNew: false,
    image:
      "https://media.istockphoto.com/id/1370390365/photo/young-man-in-blank-beige-t-shirt-mockup-front-and-back-used-as-design-template-isolated-on.webp?a=1&b=1&s=612x612&w=0&k=20&c=XrTWv8p2q3dzY16KfSnpDGHozd3661cdMxptnOsCuOs=",
  },
  {
    id: 80,
    name: "Navy Knit Beanie",
    category: "Men",
    price: "₦5,500",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1611312449297-a69dc9c3987b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TWVuJTIwTmF2eSUyMEtuaXQlMjBCZWFuaWVpbiUyMGhhbmdlcnxlbnwwfHwwfHx8MA%3D%3D",
  },

  // KIDS (20 ITEMS)
  {
    id: 81,
    name: "Mint Dungaree Set",
    category: "Kids",
    price: "₦8,500",
    isNew: true,
    image:
      "https://media.istockphoto.com/id/2077770267/photo/portrait-of-a-lovely-asian-baby-girl-posing-on-a-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=hpPyu9nh43tFiQRyG88i8h-ZqDSZaeR6f91NoH--GpA=",
  },
  {
    id: 82,
    name: "Rainbow Stripe T-Shirt",
    category: "Kids",
    price: "₦5,000",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1760287363879-6012adab292c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8S2lkcyUyMFJhaW5ib3clMjBTdHJpcGUlMjBULVNoaXJ0fGVufDB8fDB8fHww",
  },
  {
    id: 83,
    name: "Navy Puffer Gilet",
    category: "Kids",
    price: "₦14,000",
    isNew: true,
    image:
      "https://media.istockphoto.com/id/1134073802/photo/blue-vest-isolated.webp?a=1&b=1&s=612x612&w=0&k=20&c=G7s4gf3wz9xFo3blXgh4GmID1goLIl5lSwTX1BSDpPE=",
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
      "https://images.unsplash.com/photo-1778283222098-da1f8fc1e5ea?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8S2lkcyUyMERpbm8lMjBQcmludCUyMEpvZ2dlciUyMFNldHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 86,
    name: "Red Tartan Shirt",
    category: "Kids",
    price: "₦6,500",
    isNew: false,
    image:
      "https://media.istockphoto.com/id/137311353/photo/red-checkered-twofer-shirt-on-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=wIc_kCyrgfVp6N97zFAu4D5aclcn9U7b1PLdJeKxH8Y=",
  },
  {
    id: 87,
    name: "Yellow Knit Cardigan",
    category: "Kids",
    price: "₦8,000",
    isNew: true,
    image:
      "https://plus.unsplash.com/premium_photo-1700415239623-a50fabf4beb3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fEtpZHMlMjBZZWxsb3clMjBLbml0JTIwQ2FyZGlnYW58ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 88,
    name: "Pastel Tie-Dye Hoodie",
    category: "Kids",
    price: "₦7,000",
    isNew: false,
    image:
      "https://plus.unsplash.com/premium_photo-1706151505939-919f37af4002?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fEtpZHMlMjBQYXN0ZWwlMjBUaWUtRHllJTIwSG9vZGllfGVufDB8fDB8fHww",
  },
  {
    id: 89,
    name: "Striped Cotton Shorts",
    category: "Kids",
    price: "₦4,500",
    isNew: false,
    image:
      "https://media.istockphoto.com/id/875988506/photo/object-on-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=_X8_0orSdF70v7pxcUuA7OahLll528HgUBbBYgFMjYQ=",
  },
  {
    id: 90,
    name: "Mustard Corduroy Jacket",
    category: "Kids",
    price: "₦12,000",
    isNew: true,
    image:
      "https://plus.unsplash.com/premium_photo-1760179325525-ec3edff26677?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8S2lkcyUyMENvcmR1cm95JTIwSmFja2V0fGVufDB8fDB8fHww",
  },
  {
    id: 91,
    name: "Lavender Tutu Dress",
    category: "Kids",
    price: "₦11,000",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1723772385644-8819ab4c0d27?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 92,
    name: "Sky Blue Linen Shirt",
    category: "Kids",
    price: "₦5,500",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1629299342971-6ee572a039b5?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 93,
    name: "Cream Cable Knit Sweater",
    category: "Kids",
    price: "₦9,000",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1642597280978-ee2525e9ecbd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fEtpZHMlMjBDcmVhbSUyMENhYmxlJTIwS25pdCUyMFN3ZWF0ZXJ8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 94,
    name: "Animal Print Leggings",
    category: "Kids",
    price: "₦4,000",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1586537333652-9446c3d604a7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8S2lkcyUyMEFuaW1hbCUyMFByaW50JTIwTGVnZ2luZ3N8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 95,
    name: "Forest Print Raincoat",
    category: "Kids",
    price: "₦16,500",
    isNew: false,
    image:
      "https://plus.unsplash.com/premium_photo-1661715319384-437cc4d1bbfc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8S2lkcyUyMEZvcmVzdCUyMFByaW50JTIwUmFpbmNvYXR8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 96,
    name: "Coral Swimsuit",
    category: "Kids",
    price: "₦6,000",
    isNew: true,
    image:
      "https://media.istockphoto.com/id/512059838/photo/little-girls-summer-vacation-accessories.webp?a=1&b=1&s=612x612&w=0&k=20&c=fSPQPp4VL7rLY11cFbr58bl_Ua6wveWJzWcWzYg55-A=",
  },
  {
    id: 97,
    name: "Grey Marl Tracksuit",
    category: "Kids",
    price: "₦10,500",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1637161065514-ef262771257a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fEtpZHMlMjBUcmFja3N1aXR8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 98,
    name: "Pink Quilted Jacket",
    category: "Kids",
    price: "₦13,500",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1640072460556-c9ea588cc3e2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8S2lkcyUyMFBpbmslMjBRdWlsdGVkJTIwSmFja2V0fGVufDB8fDB8fHww",
  },
  {
    id: 99,
    name: "Emerald Velvet Dress",
    category: "Kids",
    price: "₦20,000",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1742942866477-4173d56d3142?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fEtpZHMlMjBFbWVyYWxkJTIwVmVsdmV0JTIwRHJlc3N8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 100,
    name: "White Embroidered Romper",
    category: "Kids",
    price: "₦7,500",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1618232674171-5ea51c38b80b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8S2lkcyUyMFdoaXRlJTIwRW1icm9pZGVyZWQlMjBSb21wZXJ8ZW58MHx8MHx8fDA%3D",
  },
];

const filters = ["All", "Women", "Men", "Kids"];

const categoryColors = {
  Women: "bg-white/5 text-white/80 border border-white/10",
  Men: "bg-white/5 text-white/80 border border-white/10",
  Kids: "bg-white/5 text-white/80 border border-white/10",
};

export default function NewArrival() {
  const [active, setActive] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const brandBlue = "#0070f3";

  // Connects with the Navbar cart state engine
  let cartCtx = null;
  try {
    cartCtx = useCart();
  } catch (e) {
    // Context fallback container
  }

  // Self-initializing global storage system for automatic navbar update fallbacks
  const fallbackAddToCart = (product, quantity, selectedSize, selectedColor) => {
    const savedCart = localStorage.getItem("styler_cart");
    let currentCart = savedCart ? JSON.parse(savedCart) : [];
    
    const existingIndex = currentCart.findIndex(
      (item) => 
        item.id === product.id && 
        item.size === selectedSize && 
        item.color === selectedColor
    );

    if (existingIndex > -1) {
      currentCart[existingIndex].quantity += quantity;
    } else {
      currentCart.push({
        ...product,
        quantity,
        size: selectedSize,
        color: selectedColor
      });
    }

    localStorage.setItem("styler_cart", JSON.stringify(currentCart));
    window.dispatchEvent(new Event("storage"));
  };

  const handleGlobalCartAdd = (product, quantity = 1, selectedSize = "M", selectedColor = "Default") => {
    if (cartCtx && typeof cartCtx.addToCart === "function") {
      cartCtx.addToCart({ ...product, size: selectedSize, color: selectedColor }, quantity);
    } else {
      fallbackAddToCart(product, quantity, selectedSize, selectedColor);
    }

    // Trigger Toast Notification
    setToastMessage(`Added ${product.name} to cart!`);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const visible =
    active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <section className="min-h-screen py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-[#020202]">
      {/* ── Toast Notification Popup ── */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[2000] bg-zinc-950 border border-white/10 text-white text-xs font-black tracking-widest uppercase px-6 py-4 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          {toastMessage}
        </div>
      )}

      {/* ── Header ── */}
      <div className="max-w-7xl mx-auto mb-12 text-center p-20">
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
          <ProductCard 
            key={product.id} 
            product={product} 
            brandBlue={brandBlue} 
            onQuickView={() => setSelectedProduct(product)}
            onDirectAdd={() => handleGlobalCartAdd(product, 1)}
          />
        ))}
      </div>

      {/* ── Footer CTA ── */}
      <div className="max-w-7xl mx-auto text-center mt-14 sm:mt-16 px-4">
        {/* <button
          className="w-full sm:w-auto px-8 sm:px-10 py-4 text-xs sm:text-sm font-black tracking-widest uppercase rounded-sm transition-all duration-300 active:scale-95 border border-white/10 bg-white text-black hover:bg-zinc-200"
        >
          Explore All Collections
        </button> */}
      </div>

      {/* ── Quick View Overlay Modal Component Drawer ── */}
      {selectedProduct && (
        <QuickViewModal 
          product={selectedProduct} 
          brandBlue={brandBlue} 
          onClose={() => setSelectedProduct(null)} 
          onAddToCart={handleGlobalCartAdd}
        />
      )}
    </section>
  );
}

function ProductCard({ product, brandBlue, onQuickView, onDirectAdd }) {
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

        {/* Improved Quick View Button Trigger */}
        <div className="absolute bottom-2 sm:bottom-3 left-0 right-0 flex justify-center opacity-0 sm:group-hover:opacity-100 transition-all duration-300 translate-y-2 sm:group-hover:translate-y-0 px-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView();
            }}
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
            onClick={(e) => {
              e.stopPropagation();
              onDirectAdd();
            }}
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

// ── Built-in Reusable Premium Quick View Modal Component ──
function QuickViewModal({ product, brandBlue, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Standard");

  // Premium defaults to fit your luxury dark themed catalog setup
  const mockSizes = product.category === "Kids" ? ["4Y", "6Y", "8Y", "10Y"] : ["S", "M", "L", "XL"];
  const mockColors = ["Classic Onyx", "Alabaster", "Sand Dune"];

  const handleCartSubmit = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onAddToCart(product, quantity, selectedSize, selectedColor);
      setIsProcessing(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-[#0c0c0d] border border-white/10 rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 grid grid-cols-1 md:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button Anchor */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full border border-white/10 bg-black/60 text-white/70 hover:text-white flex items-center justify-center transition-colors focus:outline-none"
        >
          ✕
        </button>

        {/* LEFT COLUMN: Media Showcase */}
        <div className="relative w-full bg-zinc-900 flex items-center justify-center aspect-[4/5] md:aspect-auto">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          {product.isNew && (
            <div 
              className="absolute top-4 left-4 px-3 py-1 text-[9px] font-black tracking-widest uppercase rounded-sm"
              style={{ background: brandBlue, color: "#fff" }}
            >
              New
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Details Configuration Wrapper */}
        <div className="p-6 sm:p-8 flex flex-col justify-between h-full bg-[#0c0c0d]">
          <div>
            <span className="text-[10px] font-black tracking-widest uppercase text-white/40 px-2.5 py-1 rounded-sm bg-white/5 border border-white/10 inline-block mb-4">
              {product.category} Collection
            </span>
            <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-wide mb-2 leading-tight">
              {product.name}
            </h3>
            <p className="text-lg font-black text-white mb-4" style={{ color: brandBlue }}>
              {product.price}
            </p>
            <div className="h-px w-full bg-white/5 mb-4" />
            <p className="text-xs text-white/60 leading-relaxed mb-6 font-medium">
              Premium tailored finish engineered with premium comfort fit fabrics. An optimal design silhouette suitable for upscale collections and regular layering.
            </p>

            {/* Sizes Selection Block */}
            <div className="mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-2">Available Sizes</span>
              <div className="flex flex-wrap gap-2">
                {mockSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1.5 text-xs font-black tracking-wider rounded border transition-all ${
                      selectedSize === size 
                        ? "border-blue-500 text-white bg-blue-600/10" 
                        : "border-white/5 text-white/60 bg-white/5 hover:text-white hover:border-white/20"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors Selection Block */}
            <div className="mb-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-2">Available Colors</span>
              <div className="flex flex-wrap gap-2">
                {mockColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded border transition-all ${
                      selectedColor === color 
                        ? "border-blue-500 text-white bg-blue-600/10" 
                        : "border-white/5 text-white/60 bg-white/5 hover:text-white hover:border-white/20"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Configuration Actions Tray (Quantity Selector & Checkout Trigger) */}
          <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-auto">
            {/* Quantity Container Block */}
            <div className="flex items-center border border-white/10 rounded-sm bg-white/5 h-12">
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-4 text-white/60 hover:text-white font-black transition-colors"
                disabled={isProcessing}
              >
                -
              </button>
              <span className="px-3 min-w-[2.5rem] text-center text-xs font-black text-white">
                {quantity}
              </span>
              <button 
                onClick={() => setQuantity(q => q + 1)}
                className="px-4 text-white/60 hover:text-white font-black transition-colors"
                disabled={isProcessing}
              >
                +
              </button>
            </div>

            {/* Submission Checkout CTA Action */}
            <button
              onClick={handleCartSubmit}
              disabled={isProcessing}
              className="flex-1 h-12 text-center text-xs font-black tracking-widest uppercase rounded-sm transition-all duration-300 disabled:opacity-40 bg-white text-black hover:bg-zinc-200 active:scale-95"
            >
              {isProcessing ? "Processing..." : "Add To Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}