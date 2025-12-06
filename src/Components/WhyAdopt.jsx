import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const WhyAdopt = () => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const reasons = [
    {
      icon: "❤️",
      title: "Save a Life",
      desc: "Every adoption gives a homeless pet a second chance at life, love, and a forever home.",
    },
    {
      icon: "🐾",
      title: "End Animal Cruelty",
      desc: "By adopting instead of buying, you help stop unethical breeding and support animal welfare.",
    },
    {
      icon: "🏡",
      title: "Find a Loving Companion",
      desc: "Rescued pets are loyal and loving. They bond deeply with families who give them a new start.",
    },
    {
      icon: "💸",
      title: "Affordable & Trusted",
      desc: "Adoption is much more affordable than buying from breeders, and includes basic health checks.",
    },
  ];

  return (
    <section className="py-16 mt-12">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-10" data-aos="fade-up">
           <h2
        className="text-3xl md:text-4xl font-bold text-center mb-4"
        data-aos="fade-up"
      >Why Adopt from PawMart?</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Choosing adoption means saving a precious life and giving adorable
            pets the chance they truly deserve.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {reasons.map((item, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 text-center"
            >
              <div className="text-5xl mb-3">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyAdopt;
