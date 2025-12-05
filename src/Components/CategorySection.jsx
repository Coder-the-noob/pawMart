import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

const CategorySection = () => {
  const categories = [
    {
      name: "Pets (Adoption)",
      icon: "🐶",
      route: "Pets",
      img: "https://i.ibb.co.com/60f8ZxN6/warPets.jpg",
    },
    {
      name: "Pet Food",
      icon: "🍖",
      route: "Pet-Food",
      img: "https://i.ibb.co.com/238v2cM4/Dog-Food-in-Bowl-and-Dog-Biscuits.jpg",
    },
    {
      name: "Accessories",
      icon: "🧸",
      route: "Accessories",
      img: "https://i.ibb.co.com/rfwk49yR/accesory.jpg",
    },
    {
      name: "Pet Care",
      icon: "💊",
      route: "Pet-Care",
      img: "https://i.postimg.cc/CK1MhnBB/health-check.jpg",
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <section className="py-10">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold" data-aos="fade-up">Shop by Category</h2>
        <p className="text-gray-500 mt-3" data-aos="fade-up">
          Find everything your pet needs in one place.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4">
        {categories.map((cat, index) => (
          <Link
            to={`/category-filtered-product/${cat.route}`}
            key={cat.name}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group"
          >
            <img
              src={cat.img}
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10"></div>


            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-xl font-semibold drop-shadow-lg">
              <span className="text-4xl mb-1">{cat.icon}</span>
              {cat.name}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
