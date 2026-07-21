// src/pages/Women.jsx
import React, { useState, useMemo, useRef } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const womenCategories = ["Dresses", "Tops", "Trousers", "Outerwear", "Accessories"];

const womenProducts = [
  {
    id: 300,
    name: "Silk Wrap Dress Edt. 1",
    price: 17500,
    tag: "New",
    category: "Dresses",
    img: "https://images.unsplash.com/photo-1704775990154-b87562565d4c?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: 301,
    name: "Linen Crop Top Edt. 2",
    price: 18050,
    tag: "Sale",
    category: "Tops",
    img: "https://images.unsplash.com/photo-1623052760790-9605a8579730?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: 302,
    name: "Satin High-Waist Pants Edt. 3",
    price: 18600,
    tag: "Exclusive",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 303,
    name: "Floral Cardigan Shrug Edt. 4",
    price: 19150,
    tag: "",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 304,
    name: "Structured Drop Earrings Edt. 5",
    price: 19700,
    tag: "New",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 305,
    name: "Chic Midi Skirt Set Edt. 7",
    price: 20250,
    tag: "Sale",
    category: "Dresses",
    img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 306,
    name: "Knitwear Ribbed Bodysuit Edt. 8",
    price: 20800,
    tag: "Exclusive",
    category: "Tops",
    img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 307,
    name: "Pleated Tailored Shorts Edt. 9",
    price: 21350,
    tag: "",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 308,
    name: "Velvet Bouclé Jacket Edt. 10",
    price: 21900,
    tag: "New",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 309,
    name: "Asymmetric Clutch Bag Edt. 12",
    price: 22450,
    tag: "Sale",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 310,
    name: "Tailored Slip Dress Edt. 13",
    price: 23000,
    tag: "Exclusive",
    category: "Dresses",
    img: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 311,
    name: "Couture Silk Camisole Edt. 14",
    price: 23550,
    tag: "",
    category: "Tops",
    img: "https://images.unsplash.com/photo-1548624149-f7b316a333d4?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 312,
    name: "Minimal Straight Denim Edt. 15",
    price: 24100,
    tag: "New",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 313,
    name: "Resort Blazer Set Edt. 16",
    price: 24650,
    tag: "Sale",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 314,
    name: "Silk Statement Belt Edt. 18",
    price: 25200,
    tag: "Exclusive",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1624222247344-550fb8ecf7db?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 315,
    name: "Satin Maxi Gown Edt. 19",
    price: 25750,
    tag: "",
    category: "Dresses",
    img: "https://images.unsplash.com/photo-1518049360904-1318494f1ab2?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 316,
    name: "Floral Crop Top Edt. 20",
    price: 26300,
    tag: "New",
    category: "Tops",
    img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 317,
    name: "Structured High-Waist Pants Edt. 21",
    price: 26850,
    tag: "Sale",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 318,
    name: "Boho Cardigan Shrug Edt. 22",
    price: 27400,
    tag: "Exclusive",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1574164904299-3a102b110380?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 319,
    name: "Chic Drop Earrings Edt. 23",
    price: 27950,
    tag: "",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 320,
    name: "Pleated Wrap Dress Edt. 22",
    price: 28500,
    tag: "New",
    category: "Dresses",
    img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 321,
    name: "Velvet Silk Camisole Edt. 24",
    price: 29050,
    tag: "Sale",
    category: "Tops",
    img: "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 322,
    name: "Monochrome Tailored Shorts Edt. 25",
    price: 29600,
    tag: "Exclusive",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1582142407894-ec85a1268a4e?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 323,
    name: "Asymmetric Blazer Set Edt. 26",
    price: 30150,
    tag: "",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 324,
    name: "Tailored Structured Tote Edt. 28",
    price: 30700,
    tag: "New",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 325,
    name: "Minimal Midi Skirt Set Edt. 29",
    price: 31250,
    tag: "Sale",
    category: "Dresses",
    img: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 326,
    name: "Resort Ribbed Bodysuit Edt. 30",
    price: 31800,
    tag: "Exclusive",
    category: "Tops",
    img: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 327,
    name: "Silk High-Waist Pants Edt. 31",
    price: 32350,
    tag: "",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 328,
    name: "Linen Trench Coat Edt. 33",
    price: 32900,
    tag: "New",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 329,
    name: "Satin Leather Mules Edt. 34",
    price: 33450,
    tag: "Sale",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 330,
    name: "Floral Slip Dress Edt. 35",
    price: 34000,
    tag: "Exclusive",
    category: "Dresses",
    img: "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 331,
    name: "Structured Crop Top Edt. 36",
    price: 34550,
    tag: "",
    category: "Tops",
    img: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 332,
    name: "Boho Wide Leg Trousers Edt. 37",
    price: 35100,
    tag: "New",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 333,
    name: "Chic Blazer Set Edt. 38",
    price: 35650,
    tag: "Sale",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1548624149-f7b316a333d4?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 334,
    name: "Knitwear Drop Earrings Edt. 40",
    price: 36200,
    tag: "Exclusive",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 335,
    name: "Pleated Wrap Dress Edt. 41",
    price: 36750,
    tag: "",
    category: "Dresses",
    img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 336,
    name: "Velvet Blouse Edt. 42",
    price: 37300,
    tag: "New",
    category: "Tops",
    img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 337,
    name: "Monochrome Straight Denim Edt. 43",
    price: 37850,
    tag: "Sale",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 338,
    name: "Asymmetric Bouclé Jacket Edt. 44",
    price: 38400,
    tag: "Exclusive",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 339,
    name: "Couture Structured Tote Edt. 46",
    price: 38950,
    tag: "",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 340,
    name: "Minimal Evening Dress Edt. 47",
    price: 39500,
    tag: "New",
    category: "Dresses",
    img: "https://images.unsplash.com/photo-1518049360904-1318494f1ab2?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 341,
    name: "Resort Silk Camisole Edt. 48",
    price: 40050,
    tag: "Sale",
    category: "Tops",
    img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 342,
    name: "Silk High-Waist Pants Edt. 49",
    price: 40600,
    tag: "Exclusive",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 343,
    name: "Linen Trench Coat Edt. 50",
    price: 41150,
    tag: "",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 344,
    name: "Satin Leather Mules Edt. 52",
    price: 41700,
    tag: "New",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 345,
    name: "Floral Slip Dress Edt. 53",
    price: 42250,
    tag: "Sale",
    category: "Dresses",
    img: "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 346,
    name: "Structured Crop Top Edt. 54",
    price: 42800,
    tag: "Exclusive",
    category: "Tops",
    img: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 347,
    name: "Boho Wide Leg Trousers Edt. 55",
    price: 43350,
    tag: "",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 348,
    name: "Chic Blazer Set Edt. 57",
    price: 43900,
    tag: "New",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 349,
    name: "Knitwear Drop Earrings Edt. 58",
    price: 44450,
    tag: "Sale",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 350,
    name: "Pleated Wrap Dress Edt. 59",
    price: 45000,
    tag: "Exclusive",
    category: "Dresses",
    img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 351,
    name: "Velvet Blouse Edt. 60",
    price: 45550,
    tag: "",
    category: "Tops",
    img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 352,
    name: "Monochrome Straight Denim Edt. 61",
    price: 46100,
    tag: "New",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 353,
    name: "Asymmetric Bouclé Jacket Edt. 62",
    price: 46650,
    tag: "Sale",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 354,
    name: "Couture Structured Tote Edt. 64",
    price: 47200,
    tag: "Exclusive",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 355,
    name: "Minimal Evening Dress Edt. 65",
    price: 47750,
    tag: "",
    category: "Dresses",
    img: "https://images.unsplash.com/photo-1518049360904-1318494f1ab2?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 356,
    name: "Resort Silk Camisole Edt. 66",
    price: 48300,
    tag: "New",
    category: "Tops",
    img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 357,
    name: "Silk High-Waist Pants Edt. 67",
    price: 48850,
    tag: "Sale",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 358,
    name: "Linen Trench Coat Edt. 68",
    price: 49400,
    tag: "Exclusive",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 359,
    name: "Satin Leather Mules Edt. 70",
    price: 49950,
    tag: "",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 360,
    name: "Floral Slip Dress Edt. 71",
    price: 50500,
    tag: "New",
    category: "Dresses",
    img: "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 361,
    name: "Structured Crop Top Edt. 72",
    price: 51050,
    tag: "Sale",
    category: "Tops",
    img: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 362,
    name: "Boho Wide Leg Trousers Edt. 73",
    price: 51600,
    tag: "Exclusive",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 363,
    name: "Chic Blazer Set Edt. 74",
    price: 52150,
    tag: "",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 364,
    name: "Knitwear Drop Earrings Edt. 76",
    price: 52700,
    tag: "New",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 365,
    name: "Pleated Wrap Dress Edt. 77",
    price: 53250,
    tag: "Sale",
    category: "Dresses",
    img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 366,
    name: "Velvet Blouse Edt. 78",
    price: 53800,
    tag: "Exclusive",
    category: "Tops",
    img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 367,
    name: "Monochrome Straight Denim Edt. 79",
    price: 54350,
    tag: "",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 368,
    name: "Asymmetric Bouclé Jacket Edt. 80",
    price: 54900,
    tag: "New",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 369,
    name: "Couture Structured Tote Edt. 82",
    price: 55450,
    tag: "Sale",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 370,
    name: "Minimal Evening Dress Edt. 83",
    price: 56000,
    tag: "Exclusive",
    category: "Dresses",
    img: "https://images.unsplash.com/photo-1518049360904-1318494f1ab2?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 371,
    name: "Resort Silk Camisole Edt. 84",
    price: 56550,
    tag: "",
    category: "Tops",
    img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 372,
    name: "Silk High-Waist Pants Edt. 85",
    price: 57100,
    tag: "New",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 373,
    name: "Linen Trench Coat Edt. 86",
    price: 57650,
    tag: "Sale",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 374,
    name: "Satin Leather Mules Edt. 88",
    price: 58200,
    tag: "Exclusive",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 375,
    name: "Floral Slip Dress Edt. 89",
    price: 58750,
    tag: "",
    category: "Dresses",
    img: "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 376,
    name: "Structured Crop Top Edt. 90",
    price: 59300,
    tag: "New",
    category: "Tops",
    img: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 377,
    name: "Boho Wide Leg Trousers Edt. 91",
    price: 59850,
    tag: "Sale",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 378,
    name: "Chic Blazer Set Edt. 92",
    price: 60400,
    tag: "Exclusive",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 379,
    name: "Knitwear Drop Earrings Edt. 93",
    price: 60950,
    tag: "",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 380,
    name: "Pleated Wrap Dress Edt. 94",
    price: 61500,
    tag: "New",
    category: "Dresses",
    img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 381,
    name: "Velvet Blouse Edt. 96",
    price: 62050,
    tag: "Sale",
    category: "Tops",
    img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 382,
    name: "Monochrome Straight Denim Edt. 97",
    price: 62600,
    tag: "Exclusive",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 383,
    name: "Asymmetric Bouclé Jacket Edt. 98",
    price: 63150,
    tag: "",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 384,
    name: "Couture Structured Tote Edt. 100",
    price: 63700,
    tag: "New",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 385,
    name: "Minimal Evening Dress Edt. 101",
    price: 64250,
    tag: "Sale",
    category: "Dresses",
    img: "https://images.unsplash.com/photo-1518049360904-1318494f1ab2?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 386,
    name: "Resort Silk Camisole Edt. 102",
    price: 64800,
    tag: "Exclusive",
    category: "Tops",
    img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 387,
    name: "Silk High-Waist Pants Edt. 103",
    price: 65350,
    tag: "",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 388,
    name: "Linen Trench Coat Edt. 104",
    price: 65900,
    tag: "New",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 389,
    name: "Satin Leather Mules Edt. 106",
    price: 66450,
    tag: "Sale",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 390,
    name: "Floral Slip Dress Edt. 107",
    price: 67000,
    tag: "Exclusive",
    category: "Dresses",
    img: "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 391,
    name: "Structured Crop Top Edt. 108",
    price: 67550,
    tag: "",
    category: "Tops",
    img: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 392,
    name: "Boho Wide Leg Trousers Edt. 109",
    price: 68100,
    tag: "New",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 393,
    name: "Chic Blazer Set Edt. 110",
    price: 68650,
    tag: "Sale",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 394,
    name: "Knitwear Drop Earrings Edt. 112",
    price: 69200,
    tag: "Exclusive",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 395,
    name: "Pleated Wrap Dress Edt. 113",
    price: 69750,
    tag: "",
    category: "Dresses",
    img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 396,
    name: "Velvet Blouse Edt. 114",
    price: 70300,
    tag: "New",
    category: "Tops",
    img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 397,
    name: "Monochrome Straight Denim Edt. 115",
    price: 70850,
    tag: "Sale",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 398,
    name: "Asymmetric Bouclé Jacket Edt. 116",
    price: 71400,
    tag: "Exclusive",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 399,
    name: "Couture Structured Tote Edt. 118",
    price: 71950,
    tag: "",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 400,
    name: "Minimal Evening Dress Edt. 119",
    price: 72500,
    tag: "New",
    category: "Dresses",
    img: "https://images.unsplash.com/photo-1518049360904-1318494f1ab2?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 401,
    name: "Resort Silk Camisole Edt. 120",
    price: 73050,
    tag: "Sale",
    category: "Tops",
    img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 402,
    name: "Silk High-Waist Pants Edt. 121",
    price: 73600,
    tag: "Exclusive",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 403,
    name: "Linen Trench Coat Edt. 122",
    price: 74150,
    tag: "",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 404,
    name: "Satin Leather Mules Edt. 124",
    price: 74700,
    tag: "New",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 405,
    name: "Floral Slip Dress Edt. 125",
    price: 75250,
    tag: "Sale",
    category: "Dresses",
    img: "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 406,
    name: "Structured Crop Top Edt. 126",
    price: 75800,
    tag: "Exclusive",
    category: "Tops",
    img: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 407,
    name: "Boho Wide Leg Trousers Edt. 127",
    price: 76350,
    tag: "",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 408,
    name: "Chic Blazer Set Edt. 128",
    price: 76900,
    tag: "New",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 409,
    name: "Knitwear Drop Earrings Edt. 129",
    price: 77450,
    tag: "Sale",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 410,
    name: "Pleated Wrap Dress Edt. 131",
    price: 78000,
    tag: "Exclusive",
    category: "Dresses",
    img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 411,
    name: "Velvet Blouse Edt. 132",
    price: 78550,
    tag: "",
    category: "Tops",
    img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 412,
    name: "Monochrome Straight Denim Edt. 133",
    price: 79100,
    tag: "New",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 413,
    name: "Asymmetric Bouclé Jacket Edt. 134",
    price: 79650,
    tag: "Sale",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 414,
    name: "Couture Structured Tote Edt. 136",
    price: 80200,
    tag: "Exclusive",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 415,
    name: "Minimal Evening Dress Edt. 137",
    price: 80750,
    tag: "",
    category: "Dresses",
    img: "https://images.unsplash.com/photo-1518049360904-1318494f1ab2?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 416,
    name: "Resort Silk Camisole Edt. 138",
    price: 81300,
    tag: "New",
    category: "Tops",
    img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 417,
    name: "Silk High-Waist Pants Edt. 139",
    price: 81850,
    tag: "Sale",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 418,
    name: "Linen Trench Coat Edt. 140",
    price: 82400,
    tag: "Exclusive",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&auto=format&fit=crop&q=80"
  }
];

export default function Women({ onAddToCart }) {
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
    return activeFilter === "All" ? womenProducts : womenProducts.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  const navigationCategories = useMemo(() => ["All", ...womenCategories], []);

  return (
    <main className="min-h-screen bg-[#020202] text-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header Section */}
        <div className="mb-16 md:mb-20">
          <span style={{ color: brandBlue }} className="text-xs font-black tracking-widest uppercase">WOMENSWEAR HOCKEOUT</span>
          <h1 className="text-4xl font-black uppercase italic mt-1">Women's Department</h1>
        </div>

        {/* Brand Presentation Text Block with Marquee */}
        <div className="mb-16 md:mb-24 max-w-full border-l-2 pl-4 transition-all duration-300 overflow-hidden" style={{ borderColor: brandBlue }}>
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-wide text-white">
            Discover Our Women's Collection
          </h2>

          <div className="relative flex overflow-x-hidden w-full mt-2 group cursor-pointer">
            <div className="animate-marquee whitespace-nowrap flex gap-16 text-xs md:text-sm text-white/60 font-medium leading-relaxed group-hover:[animation-play-state:paused]">
              <span>Explore tailored dresses, fine silk tops, and contemporary essentials.</span>
              <span>• Engineered Luxury Fabrics Built for Elevated Sophistication.</span>
              <span>• Discover Statement Pieces, Sleek Trousers, and Refined Accessories.</span>
            </div>
            <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex gap-16 text-xs md:text-sm text-white/60 font-medium leading-relaxed group-hover:[animation-play-state:paused]">
              <span>Explore tailored dresses, fine silk tops, and contemporary essentials.</span>
              <span>• Engineered Luxury Fabrics Built for Elevated Sophistication.</span>
              <span>• Discover Statement Pieces, Sleek Trousers, and Refined Accessories.</span>
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