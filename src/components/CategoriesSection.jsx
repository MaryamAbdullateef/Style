import React from "react";

const categories = [
  {
    name: "Women",
    desc: "Elegant, trendy and bold styles for every woman.",
    img: "https://images.unsplash.com/photo-1520975916090-3105956dac38",
  },
  {
    name: "Men",
    desc: "Classic and modern outfits for the confident man.",
    img: "https://images.unsplash.com/photo-1516826957135-700dedea698c",
  },
  {
    name: "Kids",
    desc: "Fun, colorful and comfy outfits for kids.",
    img: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9",
  },
];

const Categories = () => {
  return (
    <section className="bg-stone-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-5xl font-bold text-stone-900"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Shop by Category
          </h2>
          <p className="text-stone-500 mt-3 italic">
            Discover styles for everyone at StyleHub
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((item, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-xl shadow-md h-[450px]"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-8">
                <h3 className="text-white text-2xl font-bold mb-2">
                  {item.name}
                </h3>
                <p className="text-stone-200 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.desc}
                </p>
                <button className="bg-white text-black hover:bg-amber-400 px-6 py-2 rounded-full w-fit text-sm font-semibold transition-colors">
                  Explore
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
