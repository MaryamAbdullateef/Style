// src/pages/Kids.jsx
import React, { useState, useMemo, useRef } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const kidCategories = ["Boys", "Girls", "Unisex"];

const kidProducts = [
  {
    id: 500,
    name: "Boys Organic Chino Shorts Set No. 1",
    price: 8500,
    tag: "New",
    category: "Boys",
    img: "https://media.istockphoto.com/id/878276908/photo/toddler-kids-shorts-hanging-on-rope.webp?a=1&b=1&s=612x612&w=0&k=20&c=ilBSDNg_6W0YGAzwJ8SBRZknKcsPOwP1dwP4VU5hsSo="
  },
  {
    id: 501,
    name: "Girls Mini Floral Skirt Combo No. 2",
    price: 8880,
    tag: "Trending",
    category: "Girls",
    img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80&sig=501&q=girl,kids,floral,skirt,apparel"
  },
  {
    id: 502,
    name: "Unisex Organic Cotton Romper No. 3",
    price: 9260,
    tag: "Sale",
    category: "Unisex",
    img: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&auto=format&fit=crop&q=80&sig=502&q=baby,unisex,romper,apparel"
  },
  {
    id: 503,
    name: "Boys Denim Dungaree Set No. 4",
    price: 9640,
    tag: "",
    category: "Boys",
    img: "https://media.istockphoto.com/id/1325080525/photo/portrait-of-a-mixed-race-toddler-boy.webp?a=1&b=1&s=612x612&w=0&k=20&c=XFJ4Ier0AJe2-Q5xVkK80Lh0U4_bTP1Ty997S5vgM9w="
  },
  {
    id: 504,
    name: "Girls Tulle Party Dress No. 5",
    price: 10020,
    tag: "New",
    category: "Girls",
    img: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&auto=format&fit=crop&q=80&sig=504&q=girl,kids,tulle,dress,apparel"
  },
  {
    id: 505,
    name: "Unisex Cozy Fleece Hooded Sweatshirt No. 6",
    price: 10400,
    tag: "Trending",
    category: "Unisex",
    img: "https://images.unsplash.com/photo-1571821324176-52ff15e96348?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fFVuaXNleCUyMENvenklMjBGbGVlY2UlMjBIb29kZWQlMjBTd2VhdHNoaXJ0JTIwTm8uJTIwNnxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 506,
    name: "Boys Graphic Sport Varsity Tee No. 7",
    price: 10780,
    tag: "Sale",
    category: "Boys",
    img: "https://images.unsplash.com/photo-1519457431-44ced64a64e7?w=600&auto=format&fit=crop&q=80&sig=506&q=boy,kids,varsity,tee,apparel"
  },
  {
    id: 507,
    name: "Girls Pastel Ribbed Cardigan No. 8",
    price: 11160,
    tag: "",
    category: "Girls",
    img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80&sig=507&q=girl,kids,cardigan,knitwear,apparel"
  },
  {
    id: 508,
    name: "Unisex Durable Canvas Overalls No. 9",
    price: 11540,
    tag: "New",
    category: "Unisex",
    img: "https://images.unsplash.com/photo-1713546239485-4b7dfd691959?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8VW5pc2V4JTIwRHVyYWJsZSUyMENhbnZhcyUyME92ZXJhbGxzfGVufDB8fDB8fHww"
  },
  {
    id: 509,
    name: "Boys Casual Plaid Button-Up No. 10",
    price: 11920,
    tag: "Trending",
    category: "Boys",
    img: "https://images.unsplash.com/photo-1622290319146-7b12c071b521?w=600&auto=format&fit=crop&q=80&sig=509&q=boy,kids,plaid,shirt,apparel"
  },
  {
    id: 510,
    name: "Girls Silk Bow Collar Blouse No. 11",
    price: 12300,
    tag: "Sale",
    category: "Girls",
    img: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&auto=format&fit=crop&q=80&sig=510&q=girl,kids,blouse,apparel"
  },
  {
    id: 511,
    name: "Unisex Premium Ribbed Loungewear Set No. 12",
    price: 12680,
    tag: "",
    category: "Unisex",
    img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80&sig=511&q=unisex,kids,loungewear,pyjamas,apparel"
  },
  {
    id: 512,
    name: "Boys Active Windbreaker Tracksuit No. 13",
    price: 13060,
    tag: "New",
    category: "Boys",
    img: "https://media.istockphoto.com/id/1146772927/photo/young-nerd-boys-at-track.webp?a=1&b=1&s=612x612&w=0&k=20&c=vNDSSm4Bdr8hB_LOjau1vgFGDMQESWUkzC6_VCwul3o="
  },
  {
    id: 513,
    name: "Girls Lightweight Linen Dress No. 14",
    price: 13440,
    tag: "Trending",
    category: "Girls",
    img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80&sig=513&q=girl,kids,linen,dress,apparel"
  },
  {
    id: 514,
    name: "Unisex Utility Pocket Romper No. 15",
    price: 13820,
    tag: "Sale",
    category: "Unisex",
    img: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&auto=format&fit=crop&q=80&sig=514&q=unisex,kids,utility,romper,apparel"
  },
  {
    id: 515,
    name: "Boys Summer Cotton Shorts Set No. 16",
    price: 14200,
    tag: "",
    category: "Boys",
    img: "https://images.unsplash.com/photo-1622290319146-7b12c071b521?w=600&auto=format&fit=crop&q=80&sig=515&q=boy,kids,summer,shorts,apparel"
  },
  {
    id: 516,
    name: "Girls Tiered Rose Dress No. 17",
    price: 14580,
    tag: "New",
    category: "Girls",
    img: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&auto=format&fit=crop&q=80&sig=516&q=girl,kids,tiered,rose,dress,apparel"
  },
  {
    id: 517,
    name: "Unisex Neutral Cotton Jumpsuit No. 18",
    price: 14960,
    tag: "Trending",
    category: "Unisex",
    img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80&sig=517&q=unisex,kids,neutral,jumpsuit,apparel"
  },
  {
    id: 518,
    name: "Boys Tough Canvas Dungarees No. 19",
    price: 15340,
    tag: "Sale",
    category: "Boys",
    img: "https://images.unsplash.com/photo-1519457431-44ced64a64e7?w=600&auto=format&fit=crop&q=80&sig=518&q=boy,kids,canvas,dungarees,apparel"
  },
  {
    id: 519,
    name: "Girls Sweet Lace Sundress No. 20",
    price: 15720,
    tag: "",
    category: "Girls",
    img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80&sig=519&q=girl,kids,lace,dress,apparel"
  },
  {
    id: 520,
    name: "Unisex Ultra Cozy Sherpa Pullover No. 21",
    price: 16100,
    tag: "New",
    category: "Unisex",
    img: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&auto=format&fit=crop&q=80&sig=520&q=unisex,kids,sherpa,pullover,apparel"
  },
  {
    id: 521,
    name: "Boys Graphic Skate T-Shirt No. 22",
    price: 16480,
    tag: "Trending",
    category: "Boys",
    img: "https://images.unsplash.com/photo-1622290319146-7b12c071b521?w=600&auto=format&fit=crop&q=80&sig=521&q=boy,kids,skate,shirt,apparel"
  },
  {
    id: 522,
    name: "Girls Floral Pattern Knit Cardigan No. 23",
    price: 16860,
    tag: "Sale",
    category: "Girls",
    img: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&auto=format&fit=crop&q=80&sig=522&q=girl,kids,pattern,cardigan,apparel"
  },
  {
    id: 523,
    name: "Unisex Playful Fleece Dungarees No. 24",
    price: 17240,
    tag: "",
    category: "Unisex",
    img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80&sig=523&q=unisex,kids,fleece,dungarees,apparel"
  },
  {
    id: 524,
    name: "Boys Lightweight Flannel Over-shirt No. 25",
    price: 17620,
    tag: "New",
    category: "Boys",
    img: "https://images.unsplash.com/photo-1519457431-44ced64a64e7?w=600&auto=format&fit=crop&q=80&sig=524&q=boy,kids,flannel,shirt,apparel"
  },
  {
    id: 525,
    name: "Girls Ruffle Sleeves Party Blouse No. 26",
    price: 18000,
    tag: "Trending",
    category: "Girls",
    img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80&sig=525&q=girl,kids,ruffle,blouse,apparel"
  },
  {
    id: 526,
    name: "Unisex Soft Waffle Lounge Set No. 27",
    price: 18380,
    tag: "Sale",
    category: "Unisex",
    img: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&auto=format&fit=crop&q=80&sig=526&q=unisex,kids,waffle,loungewear,apparel"
  },
  {
    id: 527,
    name: "Boys Retro Sport Tracksuit No. 28",
    price: 18760,
    tag: "",
    category: "Boys",
    img: "https://images.unsplash.com/photo-1622290319146-7b12c071b521?w=600&auto=format&fit=crop&q=80&sig=527&q=boy,kids,retro,tracksuit,apparel"
  },
  {
    id: 528,
    name: "Girls Tiered Cotton Sun Dress No. 29",
    price: 19140,
    tag: "New",
    category: "Girls",
    img: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&auto=format&fit=crop&q=80&sig=528&q=girl,kids,tiered,dress,apparel"
  },
  {
    id: 529,
    name: "Unisex Utility Pocket Play Suit No. 30",
    price: 19520,
    tag: "Trending",
    category: "Unisex",
    img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80&sig=529&q=unisex,kids,utility,playsuit,apparel"
  },
  {
    id: 530,
    name: "Boys Comfort Denim Cargo Shorts Set No. 31",
    price: 19900,
    tag: "Sale",
    category: "Boys",
    img: "https://images.unsplash.com/photo-1519457431-44ced64a64e7?w=600&auto=format&fit=crop&q=80&sig=530&q=boy,kids,cargo,shorts,apparel"
  },
  {
    id: 531,
    name: "Girls Flowy Pleated Skirt Set No. 32",
    price: 20280,
    tag: "",
    category: "Girls",
    img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80&sig=531&q=girl,kids,pleated,skirt,apparel"
  },
  {
    id: 532,
    name: "Unisex Organic Cotton Footie Sleepsuit No. 33",
    price: 20660,
    tag: "New",
    category: "Unisex",
    img: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&auto=format&fit=crop&q=80&sig=532&q=unisex,baby,sleepsuit,apparel"
  },
  {
    id: 533,
    name: "Boys Heavy Wash Denim Dungarees No. 34",
    price: 21040,
    tag: "Trending",
    category: "Boys",
    img: "https://images.unsplash.com/photo-1622290319146-7b12c071b521?w=600&auto=format&fit=crop&q=80&sig=533&q=boy,kids,washed,dungarees,apparel"
  },
  {
    id: 534,
    name: "Girls Sparkly Tulle Dress No. 35",
    price: 21420,
    tag: "Sale",
    category: "Girls",
    img: "https://images.unsplash.com/photo-1652501400422-947c737ec616?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEdpcmxzJTIwVHVsbGUlMjBQYXJ0eSUyMERyZXNzJTIwTm8uJTIwNXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 535,
    name: "Unisex Oversized Minimalist Crew Sweatshirt No. 36",
    price: 21800,
    tag: "",
    category: "Unisex",
    img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80&sig=535&q=unisex,kids,crew,sweatshirt,apparel"
  },
  {
    id: 536,
    name: "Boys Funky Street Graphic Tee No. 37",
    price: 22180,
    tag: "New",
    category: "Boys",
    img: "https://media.istockphoto.com/id/462046997/photo/t-shirt.webp?a=1&b=1&s=612x612&w=0&k=20&c=NCfk2oU8vpIeiGZRrSzjzL_rtTNV4omiGk0PY7JUgDs="
  },
  {
    id: 537,
    name: "Girls Sweet Knit Cardigan with Pockets No. 38",
    price: 22560,
    tag: "Trending",
    category: "Girls",
    img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80&sig=537&q=girl,kids,knit,cardigan,apparel"
  },
  {
    id: 538,
    name: "Unisex Relaxed Canvas Utility Overalls No. 39",
    price: 22940,
    tag: "Sale",
    category: "Unisex",
    img: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&auto=format&fit=crop&q=80&sig=538&q=unisex,kids,utility,overalls,apparel"
  },
  {
    id: 539,
    name: "Boys Multi-Colored Checkered Shirt No. 40",
    price: 23320,
    tag: "",
    category: "Boys",
    img: "https://images.unsplash.com/photo-1622290319146-7b12c071b521?w=600&auto=format&fit=crop&q=80&sig=539&q=boy,kids,checkered,shirt,apparel"
  },
  {
    id: 540,
    name: "Girls Elegant Satin Flutter Dress No. 41",
    price: 23700,
    tag: "New",
    category: "Girls",
    img: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&auto=format&fit=crop&q=80&sig=540&q=girl,kids,flutter,dress,apparel"
  },
  {
    id: 541,
    name: "Unisex Cozy Cotton Ribbed Playwear No. 42",
    price: 24080,
    tag: "Trending",
    category: "Unisex",
    img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80&sig=541&q=unisex,kids,ribbed,playwear,apparel"
  },
  {
    id: 542,
    name: "Boys Casual Outdoor Tracksuit No. 43",
    price: 24460,
    tag: "Sale",
    category: "Boys",
    img: "https://images.unsplash.com/photo-1519457431-44ced64a64e7?w=600&auto=format&fit=crop&q=80&sig=542&q=boy,kids,outdoor,tracksuit,apparel"
  },
  {
    id: 543,
    name: "Girls Pastel Tiered Sun Dress No. 44",
    price: 24840,
    tag: "",
    category: "Girls",
    img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80&sig=543&q=girl,kids,pastel,sundress,apparel"
  },
  {
    id: 544,
    name: "Unisex Lightweight Organic Jumpsuit No. 45",
    price: 25220,
    tag: "New",
    category: "Unisex",
    img: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&auto=format&fit=crop&q=80&sig=544&q=unisex,kids,organic,jumpsuit,apparel"
  },
  {
    id: 545,
    name: "Boys Vintage Cotton Chino Shorts No. 46",
    price: 25600,
    tag: "Trending",
    category: "Boys",
    img: "https://images.unsplash.com/photo-1622290319146-7b12c071b521?w=600&auto=format&fit=crop&q=80&sig=545&q=boy,kids,vintage,chino,apparel"
  },
  {
    id: 546,
    name: "Girls Spring Garden Skirt Suit No. 47",
    price: 25980,
    tag: "Sale",
    category: "Girls",
    img: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&auto=format&fit=crop&q=80&sig=546&q=girl,kids,spring,garden,skirt,apparel"
  },
  {
    id: 547,
    name: "Unisex Ultra Soft Ribbed Bodysuit No. 48",
    price: 26360,
    tag: "",
    category: "Unisex",
    img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80&sig=547&q=unisex,kids,soft,bodysuit,apparel"
  },
  {
    id: 548,
    name: "Boys Classic Denim Overalls No. 49",
    price: 26740,
    tag: "New",
    category: "Boys",
    img: "https://images.unsplash.com/photo-1519457431-44ced64a64e7?w=600&auto=format&fit=crop&q=80&sig=548&q=boy,kids,classic,denim,apparel"
  },
  {
    id: 549,
    name: "Girls Princess Sparkle Ball Dress No. 50",
    price: 27120,
    tag: "Trending",
    category: "Girls",
    img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80&sig=549&q=girl,kids,princess,sparkle,dress,apparel"
  },
  {
    id: 550,
    name: "Unisex Heavyweight Fleece Hoody No. 51",
    price: 27500,
    tag: "Sale",
    category: "Unisex",
    img: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&auto=format&fit=crop&q=80&sig=550&q=unisex,kids,heavyweight,hoody,apparel"
  },
  {
    id: 551,
    name: "Boys Street Style Graphic Tee No. 52",
    price: 27880,
    tag: "",
    category: "Boys",
    img: "https://images.unsplash.com/photo-1622290319146-7b12c071b521?w=600&auto=format&fit=crop&q=80&sig=551&q=boy,kids,streetwear,graphic,tee,apparel"
  },
  {
    id: 552,
    name: "Girls Floral Knit Autumn Cardigan No. 53",
    price: 28260,
    tag: "New",
    category: "Girls",
    img: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&auto=format&fit=crop&q=80&sig=552&q=girl,kids,autumn,cardigan,apparel"
  },
  {
    id: 553,
    name: "Unisex Cozy Cotton Romper Overalls No. 54",
    price: 28640,
    tag: "Trending",
    category: "Unisex",
    img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80&sig=553&q=unisex,kids,romper,overalls,apparel"
  },
  {
    id: 554,
    name: "Boys Smart Flannel Button-Down No. 55",
    price: 29020,
    tag: "Sale",
    category: "Boys",
    img: "https://images.unsplash.com/photo-1519457431-44ced64a64e7?w=600&auto=format&fit=crop&q=80&sig=554&q=boy,kids,smart,flannel,shirt,apparel"
  },
  {
    id: 555,
    name: "Girls Silk Ribbon Tie Top No. 56",
    price: 29400,
    tag: "",
    category: "Girls",
    img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80&sig=555&q=girl,kids,ribbon,top,apparel"
  },
  {
    id: 556,
    name: "Unisex Premium Earthy Waffle Set No. 57",
    price: 29780,
    tag: "New",
    category: "Unisex",
    img: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&auto=format&fit=crop&q=80&sig=556&q=unisex,kids,earthy,waffle,apparel"
  },
  {
    id: 557,
    name: "Boys Modern Two-Piece Tracksuit No. 58",
    price: 30160,
    tag: "Trending",
    category: "Boys",
    img: "https://images.unsplash.com/photo-1622290319146-7b12c071b521?w=600&auto=format&fit=crop&q=80&sig=557&q=boy,kids,modern,tracksuit,apparel"
  },
  {
    id: 558,
    name: "Girls Sweet Meadow Dress No. 59",
    price: 30540,
    tag: "Sale",
    category: "Girls",
    img: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&auto=format&fit=crop&q=80&sig=558&q=girl,kids,meadow,dress,apparel"
  },
  {
    id: 559,
    name: "Unisex Organic Slub Playsuit No. 60",
    price: 30920,
    tag: "",
    category: "Unisex",
    img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80&sig=559&q=unisex,kids,slub,playsuit,apparel"
  },
  {
    id: 560,
    name: "Boys Smart Chino Outfit No. 61",
    price: 31300,
    tag: "New",
    category: "Boys",
    img: "https://images.unsplash.com/photo-1519457431-44ced64a64e7?w=600&auto=format&fit=crop&q=80&sig=560&q=boy,kids,chino,outfit,apparel"
  },
  {
    id: 561,
    name: "Girls Pastel Ruffle Skirt Combo No. 62",
    price: 31680,
    tag: "Trending",
    category: "Girls",
    img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80&sig=561&q=girl,kids,ruffle,skirt,apparel"
  },
  {
    id: 562,
    name: "Unisex Cozy Organic Knit Onesie No. 63",
    price: 32060,
    tag: "Sale",
    category: "Unisex",
    img: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&auto=format&fit=crop&q=80&sig=562&q=unisex,kids,knit,onesie,apparel"
  },
  {
    id: 563,
    name: "Boys Heavy Denim Overall Shorts No. 64",
    price: 32440,
    tag: "",
    category: "Boys",
    img: "https://images.unsplash.com/photo-1622290319146-7b12c071b521?w=600&auto=format&fit=crop&q=80&sig=563&q=boy,kids,denim,overalls,apparel"
  },
  {
    id: 564,
    name: "Girls Delicate Flutter Tutu Dress No. 65",
    price: 32820,
    tag: "New",
    category: "Girls",
    img: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&auto=format&fit=crop&q=80&sig=564&q=girl,kids,flutter,tutu,apparel"
  },
  {
    id: 565,
    name: "Unisex Minimalist Cotton Crew Sweater No. 66",
    price: 33200,
    tag: "Trending",
    category: "Unisex",
    img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8VW5pc2V4JTIwTWluaW1hbGlzdCUyMENvdHRvbiUyMENyZXclMjBTd2VhdGVyJTIwTm8uJTIwNjZ8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 566,
    name: "Boys Vintage Bold Varsity Tee No. 67",
    price: 33580,
    tag: "Sale",
    category: "Boys",
    img: "https://plus.unsplash.com/premium_photo-1707816508752-9200197a824c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Qm95cyUyMFZpbnRhZ2UlMjBCb2xkJTIwVmFyc2l0eSUyMFRlZSUyME5vLiUyMDY3fGVufDB8fDB8fHww"
  },
  {
    id: 567,
    name: "Girls Fine Knit  Cardigan No. 68",
    price: 33960,
    tag: "",
    category: "Girls",
    img: "https://images.unsplash.com/photo-1642597280975-62bf5e607170?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8R2lybHMlMjBGaW5lJTIwS25pdCUyMENhcmRpZ2FuJTIwTm8uJTIwNjh8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 568,
    name: "Unisex Tough Outdoor Canvas Dungarees No. 69",
    price: 34340,
    tag: "New",
    category: "Unisex",
    img: "https://media.istockphoto.com/id/2158689569/photo/closeup-men-old-tough-durable-canvas-shoes-sneakers-with-jeans-outdoors.webp?a=1&b=1&s=612x612&w=0&k=20&c=g4xKi4eNGYrjcqHS2NCmxb13DXpXZrYwcT_CpdI7a7U="
  },
  {
    id: 569,
    name: "Boys Casual Lumberjack Checkered Shirt No. 70",
    price: 34720,
    tag: "Trending",
    category: "Boys",
    img: "https://images.unsplash.com/photo-1622290319146-7b12c071b521?w=600&auto=format&fit=crop&q=80&sig=569&q=boy,kids,lumberjack,shirt,apparel"
  },
  {
    id: 570,
    name: "Girls Elegant Silk Ribbon Dress No. 71",
    price: 35100,
    tag: "Sale",
    category: "Girls",
    img: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&auto=format&fit=crop&q=80&sig=570&q=girl,kids,silk,ribbon,dress,apparel"
  },
  {
    id: 571,
    name: "Unisex Earthy Tone Waffle Set No. 72",
    price: 35480,
    tag: "",
    category: "Unisex",
    img: "https://images.unsplash.com/photo-1656991483595-8a11da8d2bde?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8VW5pc2V4JTIwRWFydGh5JTIwVG9uZSUyMFdhZmZsZSUyMGZvciUyMGtpZHMlMjBTZXQlMjBOby4lMjA3MnxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 572,
    name: "Boys Casual Outdoor Track Jacket Set No. 73",
    price: 35860,
    tag: "New",
    category: "Boys",
    img: "https://images.unsplash.com/photo-1519457431-44ced64a64e7?w=600&auto=format&fit=crop&q=80&sig=572&q=boy,kids,track,jacket,apparel"
  },
  {
    id: 573,
    name: "Girls Tiered Flowy Sun Dress No. 74",
    price: 36240,
    tag: "Trending",
    category: "Girls",
    img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80&sig=573&q=girl,kids,flowy,sundress,apparel"
  },
  {
    id: 574,
    name: "Unisex Light Organic Cotton Romper No. 75",
    price: 36620,
    tag: "Sale",
    category: "Unisex",
    img: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&auto=format&fit=crop&q=80&sig=574&q=unisex,kids,light,romper,apparel"
  },
  {
    id: 575,
    name: "Boys Retro Cargo Shorts Set No. 76",
    price: 37000,
    tag: "",
    category: "Boys",
    img: "https://images.unsplash.com/photo-1622290319146-7b12c071b521?w=600&auto=format&fit=crop&q=80&sig=575&q=boy,kids,cargo,shorts,apparel"
  },
  {
    id: 576,
    name: "Girls Sweet Spring Rose Dress No. 77",
    price: 37380,
    tag: "New",
    category: "Girls",
    img: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&auto=format&fit=crop&q=80&sig=576&q=girl,kids,spring,rose,dress,apparel"
  },
  {
    id: 577,
    name: "Unisex Warm Cozy Sherpa Hoodie No. 78",
    price: 37760,
    tag: "Trending",
    category: "Unisex",
    img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80&sig=577&q=unisex,kids,sherpa,hoodie,apparel"
  },
  {
    id: 578,
    name: "Boys Heavy Wear Denim Overalls No. 79",
    price: 38140,
    tag: "Sale",
    category: "Boys",
    img: "https://images.unsplash.com/photo-1519457431-44ced64a64e7?w=600&auto=format&fit=crop&q=80&sig=578&q=boy,kids,heavy,denim,apparel"
  },
  {
    id: 579,
    name: "Girls Premium Tiered Tulle Dress No. 80",
    price: 38520,
    tag: "",
    category: "Girls",
    img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80&sig=579&q=girl,kids,tiered,tulle,apparel"
  },
  {
    id: 580,
    name: "Unisex Neutral Solid Knit Crew No. 81",
    price: 38900,
    tag: "New",
    category: "Unisex",
    img: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&auto=format&fit=crop&q=80&sig=580&q=unisex,kids,solid,crew,apparel"
  },
  {
    id: 581,
    name: "Boys Urban Skate Graphic Tee No. 82",
    price: 39280,
    tag: "Trending",
    category: "Boys",
    img: "https://images.unsplash.com/photo-1622290319146-7b12c071b521?w=600&auto=format&fit=crop&q=80&sig=581&q=boy,kids,urban,skate,tee,apparel"
  },
  {
    id: 582,
    name: "Girls Button-Up Textured Cardigan No. 83",
    price: 39660,
    tag: "Sale",
    category: "Girls",
    img: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&auto=format&fit=crop&q=80&sig=582&q=girl,kids,textured,cardigan,apparel"
  },
  {
    id: 583,
    name: "Unisex Tough Adventure Utility Overalls No. 84",
    price: 40040,
    tag: "",
    category: "Unisex",
    img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80&sig=583&q=unisex,kids,utility,overalls,apparel"
  },
  {
    id: 584,
    name: "Boys Casual Flannel Button-Down No. 85",
    price: 40420,
    tag: "New",
    category: "Boys",
    img: "https://images.unsplash.com/photo-1519457431-44ced64a64e7?w=600&auto=format&fit=crop&q=80&sig=584&q=boy,kids,flannel,shirt,apparel"
  },
  {
    id: 585,
    name: "Girls Elegant Flutter Collar Blouse No. 86",
    price: 40800,
    tag: "Trending",
    category: "Girls",
    img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80&sig=585&q=girl,kids,collar,blouse,apparel"
  },
  {
    id: 586,
    name: "Unisex Cozy Organic Ribbed Sweatpants No. 87",
    price: 41180,
    tag: "Sale",
    category: "Unisex",
    img: "https://plus.unsplash.com/premium_photo-1755534537548-f0692ae3dcb0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8VW5pc2V4JTIwUHJlbWl1bSUyMFJpYmJlZCUyMExvdW5nZXdlYXIlMjBmb3IlMjBraWRzU2V0JTIwTm8uJTIwMTJ8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 587,
    name: "Boys Active Retro Athletic Tracksuit No. 88",
    price: 41560,
    tag: "",
    category: "Boys",
    img: "https://images.unsplash.com/photo-1622290319146-7b12c071b521?w=600&auto=format&fit=crop&q=80&sig=587&q=boy,kids,athletic,tracksuit,apparel"
  },
  {
    id: 588,
    name: "Girls Flowy Spring Garden Sundress No. 89",
    price: 41940,
    tag: "New",
    category: "Girls",
    img: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&auto=format&fit=crop&q=80&sig=588&q=girl,kids,garden,sundress,apparel"
  },
  {
    id: 589,
    name: "Unisex Utility Slub Playsuit No. 90",
    price: 42320,
    tag: "Trending",
    category: "Unisex",
    img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80&sig=589&q=unisex,kids,utility,playsuit,apparel"
  },
  {
    id: 590,
    name: "Boys Cotton Casual Shorts Outfit No. 91",
    price: 42700,
    tag: "Sale",
    category: "Boys",
    img: "https://images.unsplash.com/photo-1519457431-44ced64a64e7?w=600&auto=format&fit=crop&q=80&sig=590&q=boy,kids,cotton,shorts,apparel"
  },
  {
    id: 591,
    name: "Girls Velvet Trim Skirt Combo No. 92",
    price: 43080,
    tag: "",
    category: "Girls",
    img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80&sig=591&q=girl,kids,skirt,combo,apparel"
  },
  {
    id: 592,
    name: "Unisex Premium Ribbed Cotton Sleeper No. 93",
    price: 43460,
    tag: "New",
    category: "Unisex",
    img: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&auto=format&fit=crop&q=80&sig=592&q=unisex,kids,sleeper,pajamas,apparel"
  },
  {
    id: 593,
    name: "Boys Classic Bleached Dungarees No. 94",
    price: 43840,
    tag: "Trending",
    category: "Boys",
    img: "https://images.unsplash.com/photo-1622290319146-7b12c071b521?w=600&auto=format&fit=crop&q=80&sig=593&q=boy,kids,bleached,dungarees,apparel"
  },
  {
    id: 594,
    name: "Girls Layered Princess Tulle Gown No. 95",
    price: 44220,
    tag: "Sale",
    category: "Girls",
    img: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&auto=format&fit=crop&q=80&sig=594&q=girl,kids,princess,gown,apparel"
  },
  {
    id: 595,
    name: "Unisex Cozy High-Neck Fleece No. 96",
    price: 44600,
    tag: "",
    category: "Unisex",
    img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80&sig=595&q=unisex,kids,fleece,pullover,apparel"
  },
  {
    id: 596,
    name: "Boys Graphic Retro Sports Tee No. 97",
    price: 44980,
    tag: "New",
    category: "Boys",
    img: "https://images.unsplash.com/photo-1519457431-44ced64a64e7?w=600&auto=format&fit=crop&q=80&sig=596&q=boy,kids,retro,tee,apparel"
  },
  {
    id: 597,
    name: "Girls Soft Knit Classic Cardigan No. 98",
    price: 45360,
    tag: "Trending",
    category: "Girls",
    img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80&sig=597&q=girl,kids,knit,cardigan,apparel"
  },
  {
    id: 598,
    name: "Unisex Earthy Cotton Play Romper No. 99",
    price: 45740,
    tag: "Sale",
    category: "Unisex",
    img: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&auto=format&fit=crop&q=80&sig=598&q=unisex,kids,earthy,romper,apparel"
  },
  {
    id: 599,
    name: "Boys Classic Plaid Soft Shirt No. 100",
    price: 46120,
    tag: "",
    category: "Boys",
    img: "https://images.unsplash.com/photo-1604303768345-038b79a8c47a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Qm95cyUyMENhc3VhbCUyMFBsYWlkJTIwQnV0dG9uLVVwJTIwTm8uJTIwMTB8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 600,
    name: "Girls Elegant Flutter Sleeve Dress No. 101",
    price: 46500,
    tag: "New",
    category: "Girls",
    img: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&auto=format&fit=crop&q=80&sig=600&q=girl,kids,flutter,dress,apparel"
  },
  {
    id: 601,
    name: "Unisex Soft Ribbed PJ Loungewear No. 102",
    price: 46880,
    tag: "Trending",
    category: "Unisex",
    img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80&sig=601&q=unisex,kids,pajamas,loungewear,apparel"
  },
  {
    id: 602,
    name: "Boys Modern Athletic Two-Piece Set No. 103",
    price: 47260,
    tag: "Sale",
    category: "Boys",
    img: "https://images.unsplash.com/photo-1519457431-44ced64a64e7?w=600&auto=format&fit=crop&q=80&sig=602&q=boy,kids,athletic,set,apparel"
  },
  {
    id: 603,
    name: "Girls Breathable Linen Sun Dress No. 104",
    price: 47640,
    tag: "",
    category: "Girls",
    img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80&sig=603&q=girl,kids,linen,sundress,apparel"
  },
  {
    id: 604,
    name: "Unisex Neutral Cotton Slub Playwear No. 105",
    price: 48020,
    tag: "New",
    category: "Unisex",
    img: "https://plus.unsplash.com/premium_photo-1675183690442-b5de4b8a3571?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8VW5pc2V4JTIwTmV1dHJhbCUyMENvdHRvbiUyMEp1bXBzdWl0JTIwZm9yJTIwa2lkcyUyME5vLiUyMDE4fGVufDB8fDB8fHww"
  },
  {
    id: 605,
    name: "Boys Vintage Wash Chino Shorts No. 106",
    price: 48400,
    tag: "Trending",
    category: "Boys",
    img: "https://images.unsplash.com/photo-1622290319146-7b12c071b521?w=600&auto=format&fit=crop&q=80&sig=605&q=boy,kids,vintage,chino,apparel"
  },
  {
    id: 606,
    name: "Girls Tiered Rose Flower Dress No. 107",
    price: 48780,
    tag: "Sale",
    category: "Girls",
    img: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&auto=format&fit=crop&q=80&sig=606&q=girl,kids,rose,dress,apparel"
  },
  {
    id: 607,
    name: "Unisex Premium Soft Ribbed Bodysuit No. 108",
    price: 49160,
    tag: "",
    category: "Unisex",
    img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80&sig=607&q=unisex,kids,ribbed,bodysuit,apparel"
  },
  {
    id: 608,
    name: "Boys Classic Canvas Overall Straps No. 109",
    price: 49540,
    tag: "New",
    category: "Boys",
    img: "https://images.unsplash.com/photo-1519457431-44ced64a64e7?w=600&auto=format&fit=crop&q=80&sig=608&q=boy,kids,canvas,overalls,apparel"
  },
  {
    id: 609,
    name: "Girls Royal Sparkle Tulle Dress No. 110",
    price: 49920,
    tag: "Trending",
    category: "Girls",
    img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80&sig=609&q=girl,kids,sparkle,tulle,apparel"
  },
  {
    id: 610,
    name: "Unisex Comfort Fleece Lounge Pullover No. 111",
    price: 50300,
    tag: "Sale",
    category: "Unisex",
    img: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&auto=format&fit=crop&q=80&sig=610&q=unisex,kids,fleece,pullover,apparel"
  },
  {
    id: 611,
    name: "Boys Bold Varsity Graphic T-Shirt No. 112",
    price: 50680,
    tag: "",
    category: "Boys",
    img: "https://images.unsplash.com/photo-1622290319146-7b12c071b521?w=600&auto=format&fit=crop&q=80&sig=611&q=boy,kids,varsity,shirt,apparel"
  },
  {
    id: 612,
    name: "Girls Heavy Patterned Knit Cardigan No. 113",
    price: 51060,
    tag: "New",
    category: "Girls",
    img: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&auto=format&fit=crop&q=80&sig=612&q=girl,kids,knit,cardigan,apparel"
  },
  {
    id: 613,
    name: "Unisex Tough Outdoor Canvas Dungarees No. 114",
    price: 51440,
    tag: "Trending",
    category: "Unisex",
    img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80&sig=613&q=unisex,kids,outdoor,dungarees,apparel"
  }
];

export default function Kids({ onAddToCart }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const gridRef = useRef(null);
  const brandBlue = "#0070f3";
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    addToCart(product);
    if (onAddToCart) onAddToCart(product);
  };

  const handleProductClick = (product) => {
    navigate("/product-details", { state: { product } });
  };

  const filteredItems = useMemo(() => {
    return activeFilter === "All" ? kidProducts : kidProducts.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  const navigationCategories = useMemo(() => ["All", ...kidCategories], []);

  return (
    <main className="min-h-screen bg-[#020202] text-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header Section */}
        <div className="mb-16 md:mb-20">
          <span style={{ color: brandBlue }} className="text-xs font-black tracking-widest uppercase">KIDSWEAR HOCKEOUT</span>
          <h1 className="text-4xl font-black uppercase italic mt-1">Kids' Department</h1>
        </div>

        {/* Brand Presentation Text Block with Marquee */}
        <div className="mb-16 md:mb-24 max-w-full border-l-2 pl-4 transition-all duration-300 overflow-hidden" style={{ borderColor: brandBlue }}>
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-wide text-white">
            Discover Our Kids' Collection
          </h2>

          <div className="relative flex overflow-x-hidden w-full mt-2 group cursor-pointer">
            <div className="animate-marquee whitespace-nowrap flex gap-16 text-xs md:text-sm text-white/60 font-medium leading-relaxed group-hover:[animation-play-state:paused]">
              <span>Explore playful essentials, cozy layers, and durable everyday wear.</span>
              <span>• Soft Organic Fabrics Built for All-Day Adventures.</span>
              <span>• Discover Boys, Girls, and Unisex Styles for Every Occasion.</span>
            </div>
            <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex gap-16 text-xs md:text-sm text-white/60 font-medium leading-relaxed group-hover:[animation-play-state:paused]">
              <span>Explore playful essentials, cozy layers, and durable everyday wear.</span>
              <span>• Soft Organic Fabrics Built for All-Day Adventures.</span>
              <span>• Discover Boys, Girls, and Unisex Styles for Every Occasion.</span>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
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

        {/* Product Grid */}
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredItems.map((p) => (
            <div
              key={p.id}
              onClick={() => handleProductClick(p)}
              className="group bg-[#0d0d0d] border border-white/5 rounded-xl overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-300 hover:border-white/10"
            >
              <div className="relative aspect-[3/4] bg-white/5 overflow-hidden">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {p.tag && (
                  <span className="absolute top-3 left-3 bg-white text-black text-[10px] font-black uppercase tracking-widest px-2 py-1 z-10 rounded">
                    {p.tag}
                  </span>
                )}
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

      {/* Embedded CSS Engine Stylesheet for Marquee Animation */}
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