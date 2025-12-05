import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const tips = [
  {
    id: 1,
    title: "Keep Pets Warm",
    description: "Provide cozy blankets, jackets, or sweaters to protect pets from cold temperatures.",
    image: "https://i.ibb.co/gbMn3Tj6/warPets.jpg"
  },
  {
    id: 2,
    title: "Protect Paws",
    description: "Use pet-safe booties or paw balms to prevent frostbite and irritation from snow or ice.",
    image: "https://i.ibb.co/SwknqJ0f/paw-Protect.jpg"
  },
  {
    id: 3,
    title: "Maintain Hydration",
    description: "Ensure your pets always have access to fresh water as they can get dehydrated in winter.",
    image: "https://i.ibb.co/N2MhSj5X/hydration.jpg"
  },
  {
    id: 4,
    title: "Indoor Exercise",
    description: "Keep pets active indoors if it’s too cold outside. Play games or use toys to stay fit.",
    image: "https://i.ibb.co/CpkD7wmZ/indoor.webp"
  }
];

const WinterCareTips = () => {

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out" });
  }, []);

  return (
    <div className="container mx-auto mt-16 px-4">
      <h1 
        className="text-3xl font-bold mb-8 text-center text-violet-800"
        data-aos="fade"
      >
        Winter Care Tips for Pets
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
        {tips.map((tip) => (
          <div
            key={tip.id}
            className="card bg-base-100 w-72 shadow-md hover:shadow-lg transition"
            data-aos="zoom-in"
          >
            <figure>
              <img
                src={tip.image}
                alt={tip.title}
                className="h-40 object-cover w-full"
              />
            </figure>
            <div className="card-body text-center">
              <h2 className="card-title">{tip.title}</h2>
              <p className="text-gray-600">{tip.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WinterCareTips;
