import React, { useState, useMemo, useRef } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext"; 
import { useNavigate } from "react-router-dom"; // Import Router Navigation Engine

const menCategories = ["Shirts", "Tees", "Trousers", "Outerwear", "Accessories"];

const menProducts = [
  {
    id: 100,
    name: "Premium Linen Shirt ",
    price: 14500,
    tag: "New",
    category: "Shirts",
    img: "https://plus.unsplash.com/premium_photo-1725075088969-73798c9b422c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVuJTIwUHJlbWl1bSUyMExpbmVuJTIwU2hpcnR8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 101,
    name: "Classic Pique Polo ",
    price: 14950,
    tag: "Sale",
    category: "Tees",
    img: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWVuJTIwQ2xhc3NpYyUyMFBvbG98ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 102,
    name: "Slim Fit Chino Trousers ",
    price: 15400,
    tag: "Exclusive",
    category: "Trousers",
    img: "https://media.istockphoto.com/id/530930442/photo/row-of-black-pants-hangs-in-wardrobe-at-home.webp?a=1&b=1&s=612x612&w=0&k=20&c=OzMJSnfpXk3NzNWj8QECvfp2A6NJ2IFgJJmKqnMXXKI="
  },
  {
    id: 103,
    name: "Tailored Suede Bomber Jacket ",
    price: 15850,
    tag: "Trending",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVuVGFpbG9yZWQlMjBTdWVkZSUyMEJvbWJlciUyMEphY2tldCUyMGluJTIwaGFuZ2VyfGVufDB8fDB8fHww"
  },
  {
    id: 104,
    name: "Urban Leather Watch ",
    price: 16300,
    tag: "",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1565530557873-14ab8a68a85b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1lbiUyMFVyYmFuJTIwTGVhdGhlciUyMFdhdGNofGVufDB8fDB8fHww"
  },
  {
    id: 105,
    name: "Vintage Linen Shirt ",
    price: 16750,
    tag: "New",
    category: "Shirts",
    img: "https://images.unsplash.com/photo-1740711152088-88a009e877bb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVuJTIwVmludGFnZSUyMExpbmVuJTIwU2hpcnR8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 106,
    name: "Luxury Pique Polo ",
    price: 17200,
    tag: "Sale",
    category: "Tees",
    img: "https://images.unsplash.com/photo-1604898426702-4b4f1c5e973a?q=80&w=1557&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 107,
    name: "Minimalist Chino Trousers ",
    price: 17650,
    tag: "Exclusive",
    category: "Trousers",
    img: "https://plus.unsplash.com/premium_photo-1731938155813-a0a73400d8e1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bWVuJTIwTWluaW1hbGlzdCUyMENoaW5vJTIwVHJvdXNlcnMlMjBpbiUyMGhhbmdlcnxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 108,
    name: "Oversized Suede Bomber Jacket ",
    price: 18100,
    tag: "Trending",
    category: "Outerwear",
    img: "https://media.istockphoto.com/id/1405990292/photo/person-choosing-vintage-jacket-in-a-used-goods-store.webp?a=1&b=1&s=612x612&w=0&k=20&c=cmFwE8_0WugLkkK5uhSTBzSLFtvtxaAPgDuTD9pJdwE="
  },
  {
    id: 109,
    name: "Structured Leather Watch ",
    price: 18550,
    tag: "",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1641058569208-836b2063319d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWVuJTIwU3RydWN0dXJlZCUyMExlYXRoZXIlMjBXYXRjaHxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 110,
    name: "Modern Linen Shirt Vol. 11",
    price: 19000,
    tag: "New",
    category: "Shirts",
    img: ""
  },
  {
    id: 111,
    name: "Heritage Pique Polo ",
    price: 19450,
    tag: "Sale",
    category: "Tees",
    img: "https://images.unsplash.com/photo-1717127036020-83774f354008?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1lbiUyMEhlcml0YWdlJTIwUGlxdWUlMjBQb2xvfGVufDB8fDB8fHww"
  },
  {
    id: 112,
    name: "Studio Chino Trousers ",
    price: 19900,
    tag: "Exclusive",
    category: "Trousers",
    img: "https://plus.unsplash.com/premium_photo-1721742731158-72e78eaa5df8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVuJTIwU3R1ZGlvJTIwQ2hpbm8lMjBUcm91c2VycyUyMGluJTIwaGFuZ2VyfGVufDB8fDB8fHww"
  },
  {
    id: 113,
    name: "Essential Suede Bomber Jacket ",
    price: 20350,
    tag: "Trending",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1575862469245-c43f1b89bee1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVuJTIwRXNzZW50aWFsJTIwU3VlZGUlMjBCb21iZXIlMjBKYWNrZXR8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 114,
    name: "Archival Leather Watch ",
    price: 20800,
    tag: "",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVuJTIwQXJjaGl2YWwlMjBMZWF0aGVyJTIwV2F0Y2h8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 115,
    name: "Techwear Oxford Button-Down ",
    price: 21250,
    tag: "New",
    category: "Shirts",
    img: "https://images.unsplash.com/photo-1637989621168-994b37a3352b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TWVuJTIwVGVjaHdlYXIlMjBvdXRmaXR8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 116,
    name: "Premium Graphic Archive Tee ",
    price: 21700,
    tag: "Sale",
    category: "Tees",
    img: "https://media.istockphoto.com/id/2214460792/photo/man-in-white-t-shirt-collage-of-photos-on-grey-background-mockup-for-design.webp?a=1&b=1&s=612x612&w=0&k=20&c=5SvWTBppZDIWbMNrkUZzsdQSgprk5CubA12BHXqTGG8="
  },
  {
    id: 117,
    name: "Classic Selvedge Denim Trousers ",
    price: 22150,
    tag: "Exclusive",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1714143136372-ddaf8b606da7?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 118,
    name: "Slim Fit Technical Windbreaker Jacket ",
    price: 22600,
    tag: "Trending",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1714143136372-ddaf8b606da7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGplYW5zfGVufDB8fDB8fHww"
  },
  {
    id: 119,
    name: "Tailored Polarized Sunglasses ",
    price: 23050,
    tag: "",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TWVuJTIwVGFpbG9yZWQlMjBQb2xhcml6ZWQlMjBTdW5nbGFzc2VzfGVufDB8fDB8fHww"
  },
  {
    id: 120,
    name: "Urban Oxford Button-Down ",
    price: 23500,
    tag: "New",
    category: "Shirts",
    img: "https://images.unsplash.com/photo-1732605559386-bc59426d1b16?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fE1lbiUyMFVyYmFuJTIwT3hmb3JkJTIwQnV0dG9uLURvd258ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 121,
    name: "Vintage Graphic Archive Tee ",
    price: 23950,
    tag: "Sale",
    category: "Tees",
    img: "https://media.istockphoto.com/id/1393264539/photo/model-wearing-black-mens-t-shirt-mockup-for-your-own-design.webp?a=1&b=1&s=612x612&w=0&k=20&c=40HzZ_FeHPJXOwOBwRXXnQ1upDY7WJKR2OWoFqUsv2M="
  },
  {
    id: 122,
    name: "Luxury Selvedge Denim Trousers ",
    price: 24400,
    tag: "Exclusive",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1715758890151-2c15d5d482aa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fE1lbiUyMERlbmltJTIwVHJvdXNlcnN8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 123,
    name: "Minimalist Technical Windbreaker Jacket ",
    price: 24850,
    tag: "Trending",
    category: "Outerwear",
    img: "https://media.istockphoto.com/id/1091149156/photo/row-of-women-down-jackets-at-american-outdoor-clothing-store.webp?a=1&b=1&s=612x612&w=0&k=20&c=MG5B3wfqZQ4-VkwTrwDOFxltKWZWsXwnKSfpepozNwA="
  },
  {
    id: 124,
    name: "Oversized Polarized Sunglasses ",
    price: 15300,
    tag: "",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1752128002864-ae2e798dade6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TWVuJTIwT3ZlcnNpemVkJTIwUG9sYXJpemVkJTIwU3VuZ2xhc3Nlc3xlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 125,
    name: "Structured Oxford Button-Down ",
    price: 25750,
    tag: "New",
    category: "Shirts",
    img: "https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8TWVuJTIwU3RydWN0dXJlZCUyME94Zm9yZCUyMEJ1dHRvbi1Eb3duJTIwc2hpcnR8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 126,
    name: "Modern Graphic Archive Tee ",
    price: 26200,
    tag: "Sale",
    category: "Tees",
    img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fE1lbiUyME1vZGVybiUyMEdyYXBoaWMlMjBBcmNoaXZlJTIwVGVlfGVufDB8fDB8fHww"
  },
  {
    id: 127,
    name: "Heritage Selvedge Denim Trousers ",
    price: 26650,
    tag: "Exclusive",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1584865288642-42078afe6942?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWVuJTIwVHJvdXNlcnN8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 128,
    name: "Studio Technical Windbreaker Jacket ",
    price: 27100,
    tag: "Trending",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1594167307527-9cc767ea56d1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWVuJTIwU3R1ZGlvJTIwVGVjaG5pY2FsJTIwV2luZGJyZWFrZXIlMjBKYWNrZXR8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 129,
    name: "Essential Polarized Sunglasses ",
    price: 27550,
    tag: "",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1610136649349-0f646f318053?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWVuJTIwRXNzZW50aWFsJTIwUG9sYXJpemVkJTIwU3VuZ2xhc3Nlc3xlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 130,
    name: "Archival Oxford Button-Down ",
    price: 28000,
    tag: "New",
    category: "Shirts",
    img: "https://images.unsplash.com/photo-1562657916-d8ce834d5f50?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1lbiUyMEFyY2hpdmFsJTIwT3hmb3JkJTIwQnV0dG9uLURvd24lMjBzaGlydHxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 131,
    name: "Techwear Heavyweight Boxy Tee ",
    price: 28450,
    tag: "Sale",
    category: "Tees",
    img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVuJTIwQm94eSUyMFRlZSUyMHNoaXJ0fGVufDB8fDB8fHww"
  },
  {
    id: 132,
    name: "Premium Cargo Trousers Vol. 33",
    price: 28900,
    tag: "Exclusive",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80&sig=32&q=trousers,men,fashion,clothing"
  },
  {
    id: 133,
    name: "Classic Denim Jacket Vol. 34",
    price: 29350,
    tag: "Trending",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80&sig=33&q=outerwear,men,fashion,clothing"
  },
  {
    id: 134,
    name: "Slim Fit Minimalist Wallet Vol. 35",
    price: 29800,
    tag: "",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=600&auto=format&fit=crop&q=80&sig=34&q=accessories,men,fashion,clothing"
  },
  {
    id: 135,
    name: "Tailored Cuban Collar Shirt Vol. 36",
    price: 30250,
    tag: "New",
    category: "Shirts",
    img: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&auto=format&fit=crop&q=80&sig=35&q=shirts,men,fashion,clothing"
  },
  {
    id: 136,
    name: "Urban Heavyweight Boxy Tee Vol. 37",
    price: 30700,
    tag: "Sale",
    category: "Tees",
    img: "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=600&auto=format&fit=crop&q=80&sig=36&q=tees,men,fashion,clothing"
  },
  {
    id: 137,
    name: "Vintage Cargo Trousers Vol. 38",
    price: 31150,
    tag: "Exclusive",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1505633560063-d824df76f744?w=600&auto=format&fit=crop&q=80&sig=37&q=trousers,men,fashion,clothing"
  },
  {
    id: 138,
    name: "Luxury Denim Jacket ",
    price: 31600,
    tag: "Trending",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=600&auto=format&fit=crop&q=80&sig=38&q=outerwear,men,fashion,clothing"
  },
  {
    id: 139,
    name: "Minimalist Minimalist Wallet Vol. 40",
    price: 32050,
    tag: "",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600&auto=format&fit=crop&q=80&sig=39&q=accessories,men,fashion,clothing"
  },
  {
    id: 140,
    name: "Oversized Cuban Collar Shirt Vol. 41",
    price: 32500,
    tag: "New",
    category: "Shirts",
    img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&auto=format&fit=crop&q=80&sig=40&q=shirts,men,fashion,clothing"
  },
  {
    id: 141,
    name: "Structured Heavyweight Boxy Tee Vol. 42",
    price: 32950,
    tag: "Sale",
    category: "Tees",
    img: "https://images.unsplash.com/photo-1618886614638-80e3c103d31a?w=600&auto=format&fit=crop&q=80&sig=41&q=tees,men,fashion,clothing"
  },
  {
    id: 142,
    name: "Modern Cargo Trousers Vol. 43",
    price: 33400,
    tag: "Exclusive",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80&sig=42&q=trousers,men,fashion,clothing"
  },
  {
    id: 143,
    name: "Heritage Denim Jacket Vol. 44",
    price: 33850,
    tag: "Trending",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80&sig=43&q=outerwear,men,fashion,clothing"
  },
  {
    id: 144,
    name: "Studio Minimalist Wallet Vol. 45",
    price: 34300,
    tag: "",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80&sig=44&q=accessories,men,fashion,clothing"
  },
  {
    id: 145,
    name: "Essential Cuban Collar Shirt Vol. 46",
    price: 34750,
    tag: "New",
    category: "Shirts",
    img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80&sig=45&q=shirts,men,fashion,clothing"
  },
  {
    id: 146,
    name: "Archival Heavyweight Boxy Tee Vol. 47",
    price: 35200,
    tag: "Sale",
    category: "Tees",
    img: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=600&auto=format&fit=crop&q=80&sig=46&q=tees,men,fashion,clothing"
  },
  {
    id: 147,
    name: "Techwear Cargo Trousers Vol. 48",
    price: 35650,
    tag: "Exclusive",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&auto=format&fit=crop&q=80&sig=47&q=trousers,men,fashion,clothing"
  },
  {
    id: 148,
    name: "Premium Denim Jacket Vol. 49",
    price: 36100,
    tag: "Trending",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=600&auto=format&fit=crop&q=80&sig=48&q=outerwear,men,fashion,clothing"
  },
  {
    id: 149,
    name: "Classic Minimalist Wallet Vol. 50",
    price: 36550,
    tag: "",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1505633560063-d824df76f744?w=600&auto=format&fit=crop&q=80&sig=49&q=accessories,men,fashion,clothing"
  },
  {
    id: 150,
    name: "Slim Fit Chambray Shirt Vol. 51",
    price: 37000,
    tag: "New",
    category: "Shirts",
    img: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=600&auto=format&fit=crop&q=80&sig=50&q=shirts,men,fashion,clothing"
  },
  {
    id: 151,
    name: "Tailored Slub Henley Vol. 52",
    price: 37450,
    tag: "Sale",
    category: "Tees",
    img: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600&auto=format&fit=crop&q=80&sig=51&q=tees,men,fashion,clothing"
  },
  {
    id: 152,
    name: "Urban Pleated Dress Trousers Vol. 53",
    price: 37900,
    tag: "Exclusive",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&auto=format&fit=crop&q=80&sig=52&q=trousers,men,fashion,clothing"
  },
  {
    id: 153,
    name: "Vintage Trench Coat Jacket Vol. 54",
    price: 38350,
    tag: "Trending",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1618886614638-80e3c103d31a?w=600&auto=format&fit=crop&q=80&sig=53&q=outerwear,men,fashion,clothing"
  },
  {
    id: 154,
    name: "Luxury Suede Belt Vol. 55",
    price: 38800,
    tag: "",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80&sig=54&q=accessories,men,fashion,clothing"
  },
  {
    id: 155,
    name: "Minimalist Chambray Shirt Vol. 56",
    price: 39250,
    tag: "New",
    category: "Shirts",
    img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80&sig=55&q=shirts,men,fashion,clothing"
  },
  {
    id: 156,
    name: "Oversized Slub Henley Vol. 57",
    price: 39700,
    tag: "Sale",
    category: "Tees",
    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80&sig=56&q=tees,men,fashion,clothing"
  },
  {
    id: 157,
    name: "Structured Pleated Dress Trousers Vol. 58",
    price: 40150,
    tag: "Exclusive",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80&sig=57&q=trousers,men,fashion,clothing"
  },
  {
    id: 158,
    name: "Modern Trench Coat Jacket Vol. 59",
    price: 40600,
    tag: "Trending",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=600&auto=format&fit=crop&q=80&sig=58&q=outerwear,men,fashion,clothing"
  },
  {
    id: 159,
    name: "Heritage Suede Belt Vol. 60",
    price: 41050,
    tag: "",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&auto=format&fit=crop&q=80&sig=59&q=accessories,men,fashion,clothing"
  },
  {
    id: 160,
    name: "Studio Chambray Shirt Vol. 61",
    price: 41500,
    tag: "New",
    category: "Shirts",
    img: "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=600&auto=format&fit=crop&q=80&sig=60&q=shirts,men,fashion,clothing"
  },
  {
    id: 161,
    name: "Essential Slub Henley Vol. 62",
    price: 41950,
    tag: "Sale",
    category: "Tees",
    img: "https://images.unsplash.com/photo-1505633560063-d824df76f744?w=600&auto=format&fit=crop&q=80&sig=61&q=tees,men,fashion,clothing"
  },
  {
    id: 162,
    name: "Archival Pleated Dress Trousers Vol. 63",
    price: 42400,
    tag: "Exclusive",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=600&auto=format&fit=crop&q=80&sig=62&q=trousers,men,fashion,clothing"
  },
  {
    id: 163,
    name: "Techwear Trench Coat Jacket Vol. 64",
    price: 42850,
    tag: "Trending",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600&auto=format&fit=crop&q=80&sig=63&q=outerwear,men,fashion,clothing"
  },
  {
    id: 164,
    name: "Premium Suede Belt Vol. 65",
    price: 43300,
    tag: "",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&auto=format&fit=crop&q=80&sig=64&q=accessories,men,fashion,clothing"
  },
  {
    id: 165,
    name: "Classic Chambray Shirt Vol. 66",
    price: 43750,
    tag: "New",
    category: "Shirts",
    img: "https://images.unsplash.com/photo-1618886614638-80e3c103d31a?w=600&auto=format&fit=crop&q=80&sig=65&q=shirts,men,fashion,clothing"
  },
  {
    id: 166,
    name: "Slim Fit Slub Henley Vol. 67",
    price: 44200,
    tag: "Sale",
    category: "Tees",
    img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80&sig=66&q=tees,men,fashion,clothing"
  },
  {
    id: 167,
    name: "Tailored Pleated Dress Trousers Vol. 68",
    price: 44650,
    tag: "Exclusive",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80&sig=67&q=trousers,men,fashion,clothing"
  },
  {
    id: 168,
    name: "Urban Trench Coat Jacket Vol. 69",
    price: 45100,
    tag: "Trending",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80&sig=68&q=outerwear,men,fashion,clothing"
  },
  {
    id: 169,
    name: "Vintage Suede Belt Vol. 70",
    price: 45550,
    tag: "",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80&sig=69&q=accessories,men,fashion,clothing"
  },
  {
    id: 170,
    name: "Luxury Flannel Shirt Vol. 71",
    price: 46000,
    tag: "New",
    category: "Shirts",
    img: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=600&auto=format&fit=crop&q=80&sig=70&q=shirts,men,fashion,clothing"
  },
  {
    id: 171,
    name: "Minimalist V-Neck Tee Vol. 72",
    price: 46450,
    tag: "Sale",
    category: "Tees",
    img: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&auto=format&fit=crop&q=80&sig=71&q=tees,men,fashion,clothing"
  },
  {
    id: 172,
    name: "Oversized Linen Slacks Vol. 73",
    price: 46900,
    tag: "Exclusive",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=600&auto=format&fit=crop&q=80&sig=72&q=trousers,men,fashion,clothing"
  },
  {
    id: 173,
    name: "Structured Track Jacket Vol. 74",
    price: 47350,
    tag: "Trending",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1505633560063-d824df76f744?w=600&auto=format&fit=crop&q=80&sig=73&q=outerwear,men,fashion,clothing"
  },
  {
    id: 174,
    name: "Modern Canvas Tote Vol. 75",
    price: 47800,
    tag: "",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=600&auto=format&fit=crop&q=80&sig=74&q=accessories,men,fashion,clothing"
  },
  {
    id: 175,
    name: "Heritage Flannel Shirt Vol. 76",
    price: 48250,
    tag: "New",
    category: "Shirts",
    img: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600&auto=format&fit=crop&q=80&sig=75&q=shirts,men,fashion,clothing"
  },
  {
    id: 176,
    name: "Studio V-Neck Tee Vol. 77",
    price: 48700,
    tag: "Sale",
    category: "Tees",
    img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&auto=format&fit=crop&q=80&sig=76&q=tees,men,fashion,clothing"
  },
  {
    id: 177,
    name: "Essential Linen Slacks Vol. 78",
    price: 49150,
    tag: "Exclusive",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1618886614638-80e3c103d31a?w=600&auto=format&fit=crop&q=80&sig=77&q=trousers,men,fashion,clothing"
  },
  {
    id: 178,
    name: "Archival Track Jacket Vol. 79",
    price: 49600,
    tag: "Trending",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80&sig=78&q=outerwear,men,fashion,clothing"
  },
  {
    id: 179,
    name: "Techwear Canvas Tote Vol. 80",
    price: 50050,
    tag: "",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80&sig=79&q=accessories,men,fashion,clothing"
  },
  {
    id: 180,
    name: "Premium Flannel Shirt Vol. 81",
    price: 50500,
    tag: "New",
    category: "Shirts",
    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80&sig=80&q=shirts,men,fashion,clothing"
  },
  {
    id: 181,
    name: "Classic V-Neck Tee Vol. 82",
    price: 50950,
    tag: "Sale",
    category: "Tees",
    img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80&sig=81&q=tees,men,fashion,clothing"
  },
  {
    id: 182,
    name: "Slim Fit Linen Slacks Vol. 83",
    price: 51400,
    tag: "Exclusive",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=600&auto=format&fit=crop&q=80&sig=82&q=trousers,men,fashion,clothing"
  },
  {
    id: 183,
    name: "Tailored Track Jacket Vol. 84",
    price: 51850,
    tag: "Trending",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&auto=format&fit=crop&q=80&sig=83&q=outerwear,men,fashion,clothing"
  },
  {
    id: 184,
    name: "Urban Canvas Tote Vol. 85",
    price: 52300,
    tag: "",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=600&auto=format&fit=crop&q=80&sig=84&q=accessories,men,fashion,clothing"
  },
  {
    id: 185,
    name: "Vintage Flannel Shirt Vol. 86",
    price: 52750,
    tag: "New",
    category: "Shirts",
    img: "https://images.unsplash.com/photo-1505633560063-d824df76f744?w=600&auto=format&fit=crop&q=80&sig=85&q=shirts,men,fashion,clothing"
  },
  {
    id: 186,
    name: "Luxury V-Neck Tee Vol. 87",
    price: 53200,
    tag: "Sale",
    category: "Tees",
    img: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=600&auto=format&fit=crop&q=80&sig=86&q=tees,men,fashion,clothing"
  },
  {
    id: 187,
    name: "Minimalist Linen Slacks Vol. 88",
    price: 53650,
    tag: "Exclusive",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600&auto=format&fit=crop&q=80&sig=87&q=trousers,men,fashion,clothing"
  },
  {
    id: 188,
    name: "Oversized Track Jacket Vol. 89",
    price: 54100,
    tag: "Trending",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&auto=format&fit=crop&q=80&sig=88&q=outerwear,men,fashion,clothing"
  },
  {
    id: 189,
    name: "Structured Canvas Tote Vol. 90",
    price: 54550,
    tag: "",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1618886614638-80e3c103d31a?w=600&auto=format&fit=crop&q=80&sig=89&q=accessories,men,fashion,clothing"
  },
  {
    id: 190,
    name: "Modern Flannel Shirt Vol. 91",
    price: 55000,
    tag: "New",
    category: "Shirts",
    img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80&sig=90&q=shirts,men,fashion,clothing"
  },
  {
    id: 191,
    name: "Heritage V-Neck Tee Vol. 92",
    price: 55450,
    tag: "Sale",
    category: "Tees",
    img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80&sig=91&q=tees,men,fashion,clothing"
  },
  {
    id: 192,
    name: "Studio Linen Slacks Vol. 93",
    price: 55900,
    tag: "Exclusive",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80&sig=92&q=trousers,men,fashion,clothing"
  },
  {
    id: 193,
    name: "Essential Track Jacket Vol. 94",
    price: 56350,
    tag: "Trending",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80&sig=93&q=outerwear,men,fashion,clothing"
  },
  {
    id: 194,
    name: "Archival Canvas Tote Vol. 95",
    price: 56800,
    tag: "",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=600&auto=format&fit=crop&q=80&sig=94&q=accessories,men,fashion,clothing"
  },
  {
    id: 195,
    name: "Techwear Linen Shirt Vol. 96",
    price: 57250,
    tag: "New",
    category: "Shirts",
    img: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&auto=format&fit=crop&q=80&sig=95&q=shirts,men,fashion,clothing"
  },
  {
    id: 196,
    name: "Premium Pique Polo Vol. 97",
    price: 57700,
    tag: "Sale",
    category: "Tees",
    img: "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=600&auto=format&fit=crop&q=80&sig=96&q=tees,men,fashion,clothing"
  },
  {
    id: 197,
    name: "Classic Chino Trousers Vol. 98",
    price: 58150,
    tag: "Exclusive",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1505633560063-d824df76f744?w=600&auto=format&fit=crop&q=80&sig=97&q=trousers,men,fashion,clothing"
  },
  {
    id: 198,
    name: "Slim Fit Suede Bomber Jacket Vol. 99",
    price: 58600,
    tag: "Trending",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=600&auto=format&fit=crop&q=80&sig=98&q=outerwear,men,fashion,clothing"
  },
  {
    id: 199,
    name: "Tailored Leather Watch Vol. 100",
    price: 59050,
    tag: "",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600&auto=format&fit=crop&q=80&sig=99&q=accessories,men,fashion,clothing"
  },
  {
    id: 200,
    name: "Urban Linen Shirt Vol. 101",
    price: 59500,
    tag: "New",
    category: "Shirts",
    img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&auto=format&fit=crop&q=80&sig=100&q=shirts,men,fashion,clothing"
  },
  {
    id: 201,
    name: "Vintage Pique Polo Vol. 102",
    price: 59950,
    tag: "Sale",
    category: "Tees",
    img: "https://images.unsplash.com/photo-1618886614638-80e3c103d31a?w=600&auto=format&fit=crop&q=80&sig=101&q=tees,men,fashion,clothing"
  },
  {
    id: 202,
    name: "Luxury Chino Trousers Vol. 103",
    price: 60400,
    tag: "Exclusive",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80&sig=102&q=trousers,men,fashion,clothing"
  },
  {
    id: 203,
    name: "Minimalist Suede Bomber Jacket Vol. 104",
    price: 60850,
    tag: "Trending",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80&sig=103&q=outerwear,men,fashion,clothing"
  },
  {
    id: 204,
    name: "Oversized Leather Watch Vol. 105",
    price: 61300,
    tag: "",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80&sig=104&q=accessories,men,fashion,clothing"
  },
  {
    id: 205,
    name: "Structured Linen Shirt Vol. 106",
    price: 61750,
    tag: "New",
    category: "Shirts",
    img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80&sig=105&q=shirts,men,fashion,clothing"
  },
  {
    id: 206,
    name: "Modern Pique Polo Vol. 107",
    price: 62200,
    tag: "Sale",
    category: "Tees",
    img: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=600&auto=format&fit=crop&q=80&sig=106&q=tees,men,fashion,clothing"
  },
  {
    id: 207,
    name: "Heritage Chino Trousers Vol. 108",
    price: 62650,
    tag: "Exclusive",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&auto=format&fit=crop&q=80&sig=107&q=trousers,men,fashion,clothing"
  },
  {
    id: 208,
    name: "Studio Suede Bomber Jacket Vol. 109",
    price: 63100,
    tag: "Trending",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=600&auto=format&fit=crop&q=80&sig=108&q=outerwear,men,fashion,clothing"
  },
  {
    id: 209,
    name: "Essential Leather Watch Vol. 110",
    price: 63550,
    tag: "",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1505633560063-d824df76f744?w=600&auto=format&fit=crop&q=80&sig=109&q=accessories,men,fashion,clothing"
  },
  {
    id: 210,
    name: "Archival Linen Shirt Vol. 111",
    price: 64000,
    tag: "New",
    category: "Shirts",
    img: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=600&auto=format&fit=crop&q=80&sig=110&q=shirts,men,fashion,clothing"
  },
  {
    id: 211,
    name: "Techwear Pique Polo Vol. 112",
    price: 64450,
    tag: "Sale",
    category: "Tees",
    img: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600&auto=format&fit=crop&q=80&sig=111&q=tees,men,fashion,clothing"
  },
  {
    id: 212,
    name: "Premium Chino Trousers Vol. 113",
    price: 64900,
    tag: "Exclusive",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&auto=format&fit=crop&q=80&sig=112&q=trousers,men,fashion,clothing"
  },
  {
    id: 213,
    name: "Classic Suede Bomber Jacket Vol. 114",
    price: 65350,
    tag: "Trending",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1618886614638-80e3c103d31a?w=600&auto=format&fit=crop&q=80&sig=113&q=outerwear,men,fashion,clothing"
  },
  {
    id: 214,
    name: "Slim Fit Leather Watch Vol. 115",
    price: 65800,
    tag: "",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80&sig=114&q=accessories,men,fashion,clothing"
  },
  {
    id: 215,
    name: "Tailored Oxford Button-Down Vol. 116",
    price: 66250,
    tag: "New",
    category: "Shirts",
    img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80&sig=115&q=shirts,men,fashion,clothing"
  },
  {
    id: 216,
    name: "Urban Graphic Archive Tee Vol. 117",
    price: 66700,
    tag: "Sale",
    category: "Tees",
    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80&sig=116&q=tees,men,fashion,clothing"
  },
  {
    id: 217,
    name: "Vintage Selvedge Denim Trousers Vol. 118",
    price: 67150,
    tag: "Exclusive",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80&sig=117&q=trousers,men,fashion,clothing"
  },
  {
    id: 218,
    name: "Luxury Technical Windbreaker Jacket Vol. 119",
    price: 67600,
    tag: "Trending",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=600&auto=format&fit=crop&q=80&sig=118&q=outerwear,men,fashion,clothing"
  },
  {
    id: 219,
    name: "Minimalist Polarized Sunglasses Vol. 120",
    price: 68050,
    tag: "",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&auto=format&fit=crop&q=80&sig=119&q=accessories,men,fashion,clothing"
  },
  {
    id: 220,
    name: "Oversized Oxford Button-Down Vol. 121",
    price: 68500,
    tag: "New",
    category: "Shirts",
    img: "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=600&auto=format&fit=crop&q=80&sig=120&q=shirts,men,fashion,clothing"
  },
  {
    id: 221,
    name: "Structured Graphic Archive Tee Vol. 122",
    price: 68950,
    tag: "Sale",
    category: "Tees",
    img: "https://images.unsplash.com/photo-1505633560063-d824df76f744?w=600&auto=format&fit=crop&q=80&sig=121&q=tees,men,fashion,clothing"
  },
  {
    id: 222,
    name: "Modern Selvedge Denim Trousers Vol. 123",
    price: 69400,
    tag: "Exclusive",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=600&auto=format&fit=crop&q=80&sig=122&q=trousers,men,fashion,clothing"
  },
  {
    id: 223,
    name: "Heritage Technical Windbreaker Jacket Vol. 124",
    price: 69850,
    tag: "Trending",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600&auto=format&fit=crop&q=80&sig=123&q=outerwear,men,fashion,clothing"
  },
  {
    id: 224,
    name: "Studio Polarized Sunglasses Vol. 125",
    price: 70300,
    tag: "",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&auto=format&fit=crop&q=80&sig=124&q=accessories,men,fashion,clothing"
  },
  {
    id: 225,
    name: "Essential Oxford Button-Down Vol. 126",
    price: 70750,
    tag: "New",
    category: "Shirts",
    img: "https://images.unsplash.com/photo-1618886614638-80e3c103d31a?w=600&auto=format&fit=crop&q=80&sig=125&q=shirts,men,fashion,clothing"
  },
  {
    id: 226,
    name: "Archival Graphic Archive Tee Vol. 127",
    price: 71200,
    tag: "Sale",
    category: "Tees",
    img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80&sig=126&q=tees,men,fashion,clothing"
  },
  {
    id: 227,
    name: "Techwear Selvedge Denim Trousers Vol. 128",
    price: 71650,
    tag: "Exclusive",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80&sig=127&q=trousers,men,fashion,clothing"
  },
  {
    id: 228,
    name: "Premium Technical Windbreaker Jacket Vol. 129",
    price: 72100,
    tag: "Trending",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80&sig=128&q=outerwear,men,fashion,clothing"
  },
  {
    id: 229,
    name: "Classic Polarized Sunglasses Vol. 130",
    price: 72550,
    tag: "",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80&sig=129&q=accessories,men,fashion,clothing"
  },
  {
    id: 230,
    name: "Slim Fit Oxford Button-Down Vol. 131",
    price: 73000,
    tag: "New",
    category: "Shirts",
    img: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=600&auto=format&fit=crop&q=80&sig=130&q=shirts,men,fashion,clothing"
  },
  {
    id: 231,
    name: "Tailored Heavyweight Boxy Tee Vol. 132",
    price: 73450,
    tag: "Sale",
    category: "Tees",
    img: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&auto=format&fit=crop&q=80&sig=131&q=tees,men,fashion,clothing"
  },
  {
    id: 232,
    name: "Urban Cargo Trousers Vol. 133",
    price: 73900,
    tag: "Exclusive",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=600&auto=format&fit=crop&q=80&sig=132&q=trousers,men,fashion,clothing"
  },
  {
    id: 233,
    name: "Vintage Denim Jacket Vol. 134",
    price: 74350,
    tag: "Trending",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1505633560063-d824df76f744?w=600&auto=format&fit=crop&q=80&sig=133&q=outerwear,men,fashion,clothing"
  },
  {
    id: 234,
    name: "Luxury Minimalist Wallet Vol. 135",
    price: 74800,
    tag: "",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=600&auto=format&fit=crop&q=80&sig=134&q=accessories,men,fashion,clothing"
  },
  {
    id: 235,
    name: "Minimalist Cuban Collar Shirt Vol. 136",
    price: 75250,
    tag: "New",
    category: "Shirts",
    img: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600&auto=format&fit=crop&q=80&sig=135&q=shirts,men,fashion,clothing"
  },
  {
    id: 236,
    name: "Oversized Heavyweight Boxy Tee Vol. 137",
    price: 75700,
    tag: "Sale",
    category: "Tees",
    img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&auto=format&fit=crop&q=80&sig=136&q=tees,men,fashion,clothing"
  },
  {
    id: 237,
    name: "Structured Cargo Trousers Vol. 138",
    price: 76150,
    tag: "Exclusive",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1618886614638-80e3c103d31a?w=600&auto=format&fit=crop&q=80&sig=137&q=trousers,men,fashion,clothing"
  },
  {
    id: 238,
    name: "Modern Denim Jacket Vol. 139",
    price: 76600,
    tag: "Trending",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80&sig=138&q=outerwear,men,fashion,clothing"
  },
  {
    id: 239,
    name: "Heritage Minimalist Wallet Vol. 140",
    price: 77050,
    tag: "",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80&sig=139&q=accessories,men,fashion,clothing"
  },
  {
    id: 240,
    name: "Studio Cuban Collar Shirt Vol. 141",
    price: 77500,
    tag: "New",
    category: "Shirts",
    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80&sig=140&q=shirts,men,fashion,clothing"
  },
  {
    id: 241,
    name: "Essential Heavyweight Boxy Tee Vol. 142",
    price: 77950,
    tag: "Sale",
    category: "Tees",
    img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80&sig=141&q=tees,men,fashion,clothing"
  },
  {
    id: 242,
    name: "Archival Cargo Trousers Vol. 143",
    price: 78400,
    tag: "Exclusive",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=600&auto=format&fit=crop&q=80&sig=142&q=trousers,men,fashion,clothing"
  },
  {
    id: 243,
    name: "Techwear Denim Jacket Vol. 144",
    price: 78850,
    tag: "Trending",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&auto=format&fit=crop&q=80&sig=143&q=outerwear,men,fashion,clothing"
  },
  {
    id: 244,
    name: "Premium Minimalist Wallet Vol. 145",
    price: 79300,
    tag: "",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=600&auto=format&fit=crop&q=80&sig=144&q=accessories,men,fashion,clothing"
  },
  {
    id: 245,
    name: "Classic Cuban Collar Shirt Vol. 146",
    price: 79750,
    tag: "New",
    category: "Shirts",
    img: "https://images.unsplash.com/photo-1505633560063-d824df76f744?w=600&auto=format&fit=crop&q=80&sig=145&q=shirts,men,fashion,clothing"
  },
  {
    id: 246,
    name: "Slim Fit Heavyweight Boxy Tee Vol. 147",
    price: 80200,
    tag: "Sale",
    category: "Tees",
    img: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=600&auto=format&fit=crop&q=80&sig=146&q=tees,men,fashion,clothing"
  },
  {
    id: 247,
    name: "Tailored Cargo Trousers Vol. 148",
    price: 80650,
    tag: "Exclusive",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600&auto=format&fit=crop&q=80&sig=147&q=trousers,men,fashion,clothing"
  },
  {
    id: 248,
    name: "Urban Denim Jacket Vol. 149",
    price: 81100,
    tag: "Trending",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&auto=format&fit=crop&q=80&sig=148&q=outerwear,men,fashion,clothing"
  },
  {
    id: 249,
    name: "Vintage Minimalist Wallet Vol. 150",
    price: 81550,
    tag: "",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1618886614638-80e3c103d31a?w=600&auto=format&fit=crop&q=80&sig=149&q=accessories,men,fashion,clothing"
  },
  {
    id: 250,
    name: "Luxury Chambray Shirt Vol. 151",
    price: 82000,
    tag: "New",
    category: "Shirts",
    img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80&sig=150&q=shirts,men,fashion,clothing"
  },
  {
    id: 251,
    name: "Minimalist Slub Henley Vol. 152",
    price: 82450,
    tag: "Sale",
    category: "Tees",
    img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80&sig=151&q=tees,men,fashion,clothing"
  },
  {
    id: 252,
    name: "Oversized Pleated Dress Trousers Vol. 153",
    price: 82900,
    tag: "Exclusive",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80&sig=152&q=trousers,men,fashion,clothing"
  },
  {
    id: 253,
    name: "Structured Trench Coat Jacket Vol. 154",
    price: 83350,
    tag: "Trending",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80&sig=153&q=outerwear,men,fashion,clothing"
  },
  {
    id: 254,
    name: "Modern Suede Belt Vol. 155",
    price: 83800,
    tag: "",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=600&auto=format&fit=crop&q=80&sig=154&q=accessories,men,fashion,clothing"
  },
  {
    id: 255,
    name: "Heritage Chambray Shirt Vol. 156",
    price: 84250,
    tag: "New",
    category: "Shirts",
    img: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&auto=format&fit=crop&q=80&sig=155&q=shirts,men,fashion,clothing"
  },
  {
    id: 256,
    name: "Studio Slub Henley Vol. 157",
    price: 84700,
    tag: "Sale",
    category: "Tees",
    img: "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=600&auto=format&fit=crop&q=80&sig=156&q=tees,men,fashion,clothing"
  },
  {
    id: 257,
    name: "Essential Pleated Dress Trousers Vol. 158",
    price: 85150,
    tag: "Exclusive",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1505633560063-d824df76f744?w=600&auto=format&fit=crop&q=80&sig=157&q=trousers,men,fashion,clothing"
  },
  {
    id: 258,
    name: "Archival Trench Coat Jacket Vol. 159",
    price: 85600,
    tag: "Trending",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=600&auto=format&fit=crop&q=80&sig=158&q=outerwear,men,fashion,clothing"
  },
  {
    id: 259,
    name: "Techwear Suede Belt Vol. 160",
    price: 86050,
    tag: "",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600&auto=format&fit=crop&q=80&sig=159&q=accessories,men,fashion,clothing"
  },
  {
    id: 260,
    name: "Premium Chambray Shirt Vol. 161",
    price: 86500,
    tag: "New",
    category: "Shirts",
    img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&auto=format&fit=crop&q=80&sig=160&q=shirts,men,fashion,clothing"
  },
  {
    id: 261,
    name: "Classic Slub Henley Vol. 162",
    price: 86950,
    tag: "Sale",
    category: "Tees",
    img: "https://images.unsplash.com/photo-1618886614638-80e3c103d31a?w=600&auto=format&fit=crop&q=80&sig=161&q=tees,men,fashion,clothing"
  },
  {
    id: 262,
    name: "Slim Fit Pleated Dress Trousers Vol. 163",
    price: 87400,
    tag: "Exclusive",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80&sig=162&q=trousers,men,fashion,clothing"
  },
  {
    id: 263,
    name: "Tailored Trench Coat Jacket Vol. 164",
    price: 87850,
    tag: "Trending",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80&sig=163&q=outerwear,men,fashion,clothing"
  },
  {
    id: 264,
    name: "Urban Suede Belt Vol. 165",
    price: 88300,
    tag: "",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80&sig=164&q=accessories,men,fashion,clothing"
  },
  {
    id: 265,
    name: "Vintage Chambray Shirt Vol. 166",
    price: 88750,
    tag: "New",
    category: "Shirts",
    img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80&sig=165&q=shirts,men,fashion,clothing"
  },
  {
    id: 266,
    name: "Luxury Slub Henley Vol. 167",
    price: 89200,
    tag: "Sale",
    category: "Tees",
    img: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=600&auto=format&fit=crop&q=80&sig=166&q=tees,men,fashion,clothing"
  },
  {
    id: 267,
    name: "Minimalist Pleated Dress Trousers Vol. 168",
    price: 89650,
    tag: "Exclusive",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&auto=format&fit=crop&q=80&sig=167&q=trousers,men,fashion,clothing"
  },
  {
    id: 268,
    name: "Oversized Trench Coat Jacket Vol. 169",
    price: 90100,
    tag: "Trending",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=600&auto=format&fit=crop&q=80&sig=168&q=outerwear,men,fashion,clothing"
  },
  {
    id: 269,
    name: "Structured Suede Belt Vol. 170",
    price: 90550,
    tag: "",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1505633560063-d824df76f744?w=600&auto=format&fit=crop&q=80&sig=169&q=accessories,men,fashion,clothing"
  },
  {
    id: 270,
    name: "Modern Flannel Shirt Vol. 171",
    price: 91000,
    tag: "New",
    category: "Shirts",
    img: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=600&auto=format&fit=crop&q=80&sig=170&q=shirts,men,fashion,clothing"
  },
  {
    id: 271,
    name: "Heritage V-Neck Tee Vol. 172",
    price: 91450,
    tag: "Sale",
    category: "Tees",
    img: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600&auto=format&fit=crop&q=80&sig=171&q=tees,men,fashion,clothing"
  },
  {
    id: 272,
    name: "Studio Linen Slacks Vol. 173",
    price: 91900,
    tag: "Exclusive",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&auto=format&fit=crop&q=80&sig=172&q=trousers,men,fashion,clothing"
  },
  {
    id: 273,
    name: "Essential Track Jacket Vol. 174",
    price: 92350,
    tag: "Trending",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1618886614638-80e3c103d31a?w=600&auto=format&fit=crop&q=80&sig=173&q=outerwear,men,fashion,clothing"
  },
  {
    id: 274,
    name: "Archival Canvas Tote Vol. 175",
    price: 92800,
    tag: "",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80&sig=174&q=accessories,men,fashion,clothing"
  },
  {
    id: 275,
    name: "Techwear Flannel Shirt Vol. 176",
    price: 93250,
    tag: "New",
    category: "Shirts",
    img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80&sig=175&q=shirts,men,fashion,clothing"
  },
  {
    id: 276,
    name: "Premium V-Neck Tee Vol. 177",
    price: 93700,
    tag: "Sale",
    category: "Tees",
    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80&sig=176&q=tees,men,fashion,clothing"
  },
  {
    id: 277,
    name: "Classic Linen Slacks Vol. 178",
    price: 94150,
    tag: "Exclusive",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80&sig=177&q=trousers,men,fashion,clothing"
  },
  {
    id: 278,
    name: "Slim Fit Track Jacket Vol. 179",
    price: 94600,
    tag: "Trending",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=600&auto=format&fit=crop&q=80&sig=178&q=outerwear,men,fashion,clothing"
  },
  {
    id: 279,
    name: "Tailored Canvas Tote Vol. 180",
    price: 95050,
    tag: "",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&auto=format&fit=crop&q=80&sig=179&q=accessories,men,fashion,clothing"
  },
  {
    id: 280,
    name: "Urban Flannel Shirt Vol. 181",
    price: 95500,
    tag: "New",
    category: "Shirts",
    img: "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=600&auto=format&fit=crop&q=80&sig=180&q=shirts,men,fashion,clothing"
  },
  {
    id: 281,
    name: "Vintage V-Neck Tee Vol. 182",
    price: 95950,
    tag: "Sale",
    category: "Tees",
    img: "https://images.unsplash.com/photo-1505633560063-d824df76f744?w=600&auto=format&fit=crop&q=80&sig=181&q=tees,men,fashion,clothing"
  },
  {
    id: 282,
    name: "Luxury Linen Slacks Vol. 183",
    price: 96400,
    tag: "Exclusive",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=600&auto=format&fit=crop&q=80&sig=182&q=trousers,men,fashion,clothing"
  },
  {
    id: 283,
    name: "Minimalist Track Jacket Vol. 184",
    price: 96850,
    tag: "Trending",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600&auto=format&fit=crop&q=80&sig=183&q=outerwear,men,fashion,clothing"
  },
  {
    id: 284,
    name: "Oversized Canvas Tote Vol. 185",
    price: 97300,
    tag: "",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&auto=format&fit=crop&q=80&sig=184&q=accessories,men,fashion,clothing"
  },
  {
    id: 285,
    name: "Structured Flannel Shirt Vol. 186",
    price: 97750,
    tag: "New",
    category: "Shirts",
    img: "https://images.unsplash.com/photo-1618886614638-80e3c103d31a?w=600&auto=format&fit=crop&q=80&sig=185&q=shirts,men,fashion,clothing"
  },
  {
    id: 286,
    name: "Modern V-Neck Tee Vol. 187",
    price: 98200,
    tag: "Sale",
    category: "Tees",
    img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80&sig=186&q=tees,men,fashion,clothing"
  },
  {
    id: 287,
    name: "Heritage Linen Slacks Vol. 188",
    price: 98650,
    tag: "Exclusive",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80&sig=187&q=trousers,men,fashion,clothing"
  },
  {
    id: 288,
    name: "Studio Track Jacket Vol. 189",
    price: 99100,
    tag: "Trending",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80&sig=188&q=outerwear,men,fashion,clothing"
  },
  {
    id: 289,
    name: "Essential Canvas Tote Vol. 190",
    price: 99550,
    tag: "",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80&sig=189&q=accessories,men,fashion,clothing"
  },
  {
    id: 290,
    name: "Archival Linen Shirt Vol. 191",
    price: 100000,
    tag: "New",
    category: "Shirts",
    img: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=600&auto=format&fit=crop&q=80&sig=190&q=shirts,men,fashion,clothing"
  },
  {
    id: 291,
    name: "Techwear Pique Polo Vol. 192",
    price: 100450,
    tag: "Sale",
    category: "Tees",
    img: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&auto=format&fit=crop&q=80&sig=191&q=tees,men,fashion,clothing"
  },
  {
    id: 292,
    name: "Premium Chino Trousers Vol. 193",
    price: 100900,
    tag: "Exclusive",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=600&auto=format&fit=crop&q=80&sig=192&q=trousers,men,fashion,clothing"
  },
  {
    id: 293,
    name: "Classic Suede Bomber Jacket Vol. 194",
    price: 101350,
    tag: "Trending",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1505633560063-d824df76f744?w=600&auto=format&fit=crop&q=80&sig=193&q=outerwear,men,fashion,clothing"
  },
  {
    id: 294,
    name: "Slim Fit Leather Watch Vol. 195",
    price: 101800,
    tag: "",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=600&auto=format&fit=crop&q=80&sig=194&q=accessories,men,fashion,clothing"
  },
  {
    id: 295,
    name: "Tailored Linen Shirt Vol. 196",
    price: 102250,
    tag: "New",
    category: "Shirts",
    img: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600&auto=format&fit=crop&q=80&sig=195&q=shirts,men,fashion,clothing"
  },
  {
    id: 296,
    name: "Urban Pique Polo Vol. 197",
    price: 102700,
    tag: "Sale",
    category: "Tees",
    img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&auto=format&fit=crop&q=80&sig=196&q=tees,men,fashion,clothing"
  },
  {
    id: 297,
    name: "Vintage Chino Trousers Vol. 198",
    price: 103150,
    tag: "Exclusive",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1618886614638-80e3c103d31a?w=600&auto=format&fit=crop&q=80&sig=197&q=trousers,men,fashion,clothing"
  },
  {
    id: 298,
    name: "Luxury Suede Bomber Jacket Vol. 199",
    price: 103600,
    tag: "Trending",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80&sig=198&q=outerwear,men,fashion,clothing"
  },
  {
    id: 299,
    name: "Minimalist Leather Watch Vol. 200",
    price: 104050,
    tag: "",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80&sig=199&q=accessories,men,fashion,clothing"
  }
];

export default function Men({ onAddToCart }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const gridRef = useRef(null);
  const brandBlue = "#0070f3";
  const { addToCart } = useCart();
  const navigate = useNavigate(); // Navigation hook initialized

  const handleAddToCart = (product, e) => {
    e.stopPropagation(); // Prevents triggering card layout open details click
    addToCart(product); 
    if (onAddToCart) onAddToCart(product); 
  };

  const handleProductClick = (product) => {
    navigate("/product-details", { state: { product } });
  };

  const filteredItems = useMemo(() => {
    return activeFilter === "All" ? menProducts : menProducts.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  // Derived category list dynamically starting with "All"
  const navigationCategories = useMemo(() => ["All", ...menCategories], []);

  return (
    <main className="min-h-screen bg-[#020202] text-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Restructured Header Section (Search completely removed) */}
        <div className="mb-16 md:mb-20">
          <span style={{ color: brandBlue }} className="text-xs font-black tracking-widest uppercase">MENSWEAR HOCKEOUT</span>
          <h1 className="text-4xl font-black uppercase italic mt-1">Men's Department</h1>
        </div>

        {/* Brand Presentation Text Block with Added Layout Spacing & Marquee */}
        <div className="mb-16 md:mb-24 max-w-full border-l-2 pl-4 transition-all duration-300 overflow-hidden" style={{ borderColor: brandBlue }}>
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-wide text-white">
            Discover Our Men's Collection
          </h2>
          
          {/* Smooth, Infinite-Loop CSS Marquee Container */}
          <div className="relative flex overflow-x-hidden w-full mt-2 group cursor-pointer">
            <div className="animate-marquee whitespace-nowrap flex gap-16 text-xs md:text-sm text-white/60 font-medium leading-relaxed group-hover:[animation-play-state:paused]">
              <span>Explore structural outerwear, fine tailored shirts, and contemporary street essentials.</span>
              <span>• Engineered Technical Textiles Built for Sophisticated Practicality.</span>
              <span>• Discover Essential Basics, Selvedge Denim, and Archive Pieces.</span>
            </div>
            <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex gap-16 text-xs md:text-sm text-white/60 font-medium leading-relaxed group-hover:[animation-play-state:paused]">
              <span>Explore structural outerwear, fine tailored shirts, and contemporary street essentials.</span>
              <span>• Engineered Technical Textiles Built for Sophisticated Practicality.</span>
              <span>• Discover Essential Basics, Selvedge Denim, and Archive Pieces.</span>
            </div>
          </div>
        </div>

        {/* Clean Filter Controls */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {navigationCategories.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="px-5 py-2 text-xs font-black tracking-wider uppercase border border-white/10 transition-colors duration-200 shrink-0"
              style={activeFilter === f ? { backgroundColor: brandBlue, borderColor: brandBlue } : {}}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Untouched Grid Component Presentation Deck */}
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredItems.map((p) => (
            <div 
              key={p.id} 
              onClick={() => handleProductClick(p)}
              className="group bg-[#0d0d0d] border border-white/5 rounded-xl overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-300 hover:border-white/10"
            >
              <div className="relative aspect-[3/4] bg-white/5 overflow-hidden">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <button
                  onClick={(e) => handleAddToCart(p, e)}
                  className="absolute bottom-0 left-0 right-0 py-3 text-[11px] font-black uppercase tracking-wider text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2"
                  style={{ backgroundColor: brandBlue }}
                >
                  <ShoppingBag size={14} /> Add To Cart
                </button>
              </div>
              <div className="p-4">
                <p className="text-[10px] opacity-40 font-bold uppercase tracking-wider">{p.category}</p>
                <h3 className="text-sm font-black mt-1 line-clamp-1">{p.name}</h3>
                <p className="font-black text-sm mt-2">₦{p.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Embedded CSS Engine Stylesheet to handle custom Marquee Animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee2 {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee {
          animation: marquee 28s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 28s linear infinite;
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  );
}