const categories = [
  {
    name: "Women",
    desc: "Elegant, trendy and bold styles for every woman.",
    img: "https://images.unsplash.com/photo-1520975916090-3105956dac38"
  },
  {
    name: "Men",
    desc: "Classic and modern outfits for the confident man.",
    img: "https://images.unsplash.com/photo-1516826957135-700dedea698c"
  },
  {
    name: "Kids",
    desc: "Fun, colorful and comfy outfits for kids.",
    img: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9"
  }
];

const Categories = () => {
  return (
    <div className="bg-gray-50 min-h-screen px-4 py-10">
      
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">
          Shop by Category
        </h2>
        <p className="text-gray-600 mt-2">
          Discover styles for everyone at StyleHub
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        
        {categories.map((item, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-2xl shadow-lg"
          >
            {/* Image */}
            <img
              src={item.img}
              alt={item.name}
              className="w-full h-[400px] object-cover group-hover:scale-110 transition duration-500"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6">
              <h3 className="text-white text-2xl font-bold">
                {item.name}
              </h3>
              <p className="text-gray-200 text-sm mb-3">
                {item.desc}
              </p>

              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg w-fit">
                Explore
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Categories;