import { useEffect } from "react";
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
      badge: "Adopt",
    },
    {
      name: "Pet Food",
      icon: "🍖",
      route: "Pet-Food",
      img: "https://i.ibb.co.com/238v2cM4/Dog-Food-in-Bowl-and-Dog-Biscuits.jpg",
      badge: "Shop",
    },
    {
      name: "Accessories",
      icon: "🧸",
      route: "Accessories",
      img: "https://i.ibb.co.com/rfwk49yR/accesory.jpg",
      badge: "Gear",
    },
    {
      name: "Pet Care",
      icon: "💊",
      route: "Pet-Care",
      img: "https://i.postimg.cc/CK1MhnBB/health-check.jpg",
      badge: "Care",
    },
  ];

  useEffect(() => {
    AOS.init({ duration: 700, easing: "ease-in-out", once: true });
  }, []);

  return (
    <section className="py-12 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header + CTA */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold" data-aos="fade-up">
              Shop by Category
            </h2>
            <p className="text-base-content/70 mt-2 max-w-xl" data-aos="fade-up">
              Explore adoption, food, accessories, and care services — all curated for pet parents.
            </p>
          </div>

          <div className="flex gap-2" data-aos="fade-up">
            <Link to="/browse" className="btn btn-primary btn-sm md:btn-md">
              Browse All
            </Link>
            <Link to="/categories" className="btn btn-outline btn-sm md:btn-md">
              View Categories
            </Link>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <Link
              to={`/category-filtered-product/${cat.route}`}
              key={cat.name}
              data-aos="fade-up"
              data-aos-delay={index * 80}
              className="group card overflow-hidden rounded-2xl border border-base-200 bg-base-100 hover:shadow-lg transition"
            >
              <div className="relative">
                {/* image */}
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* badge */}
                <div className="absolute top-3 left-3 badge badge-primary badge-sm">
                  {cat.badge}
                </div>

                {/* content */}
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-2xl">{cat.icon}</span>
                    <h3 className="font-semibold text-lg">{cat.name}</h3>
                  </div>
                  <p className="text-white/80 text-sm mt-1">
                    Tap to explore listings →
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom micro CTA */}
        <div className="mt-8 card bg-base-200 border border-base-200 rounded-2xl">
          <div className="card-body flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h3 className="font-semibold text-lg">Want to post your own listing?</h3>
              <p className="text-base-content/70 text-sm">
                Add adoption posts, products, or care services in seconds.
              </p>
            </div>
            <Link to="/add-service" className="btn btn-primary btn-sm md:btn-md">
              Add Listing
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
