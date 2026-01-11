import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const tips = [
  {
    id: 1,
    title: "Keep Pets Warm",
    description:
      "Provide cozy blankets, jackets, or sweaters to protect pets from cold temperatures.",
    image: "https://i.ibb.co/gbMn3Tj6/warPets.jpg",
  },
  {
    id: 2,
    title: "Protect Paws",
    description:
      "Use pet-safe booties or paw balms to prevent frostbite and irritation from snow or ice.",
    image: "https://i.ibb.co/SwknqJ0f/paw-Protect.jpg",
  },
  {
    id: 3,
    title: "Maintain Hydration",
    description:
      "Ensure your pets always have access to fresh water as they can get dehydrated in winter.",
    image: "https://i.ibb.co/N2MhSj5X/hydration.jpg",
  },
  {
    id: 4,
    title: "Indoor Exercise",
    description:
      "Keep pets active indoors if it’s too cold outside. Play games or use toys to stay fit.",
    image: "https://i.ibb.co/CpkD7wmZ/indoor.webp",
  },
];

const WinterCareTips = () => {
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto" data-aos="fade-up">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Winter Care Tips for Pets
        </h1>
        <p className="mt-3 text-base-content/70">
          Simple, practical tips to keep your pets healthy, warm, and active
          during the winter season.
        </p>
      </div>

      {/* Cards */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {tips.map((tip, index) => (
          <div
            key={tip.id}
            data-aos="fade-up"
            data-aos-delay={index * 80}
            className="
              group
              rounded-2xl
              border border-base-300
              bg-base-100
              shadow-sm
              hover:shadow-xl
              transition-all duration-300
              overflow-hidden
            "
          >
            {/* Image */}
            <div className="relative h-44 overflow-hidden">
              <img
                src={tip.image}
                alt={tip.title}
                loading="lazy"
                className="
                  h-full w-full object-cover
                  transition-transform duration-300
                  group-hover:scale-[1.05]
                "
              />
            </div>

            {/* Content */}
            <div className="p-5 text-center">
              <h2 className="text-lg font-extrabold">{tip.title}</h2>
              <p className="mt-2 text-sm text-base-content/70 leading-relaxed">
                {tip.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <p className="mt-10 text-center text-sm text-base-content/60">
        Caring for your pet in winter helps prevent illness and discomfort.
      </p>
    </section>
  );
};

export default WinterCareTips;
