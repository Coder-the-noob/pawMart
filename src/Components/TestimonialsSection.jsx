import React, { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const TestimonialsSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const testimonials = [
    {
      id: 1,
      parentName: "Sarah Thompson",
      petName: "Bella",
      review:
        "I chose this service because they truly care about pets. Bella received exceptional attention and the process was transparent and comforting. A perfect place for both adoption and pet care.",
      rating: 5,
      imgParent: "https://i.ibb.co/B5PgHCq8/woman-1.jpg",
      imgPet: "https://i.ibb.co/Gvbp59hr/cat-1.jpg",
    },
    {
      id: 2,
      parentName: "James Carter",
      petName: "Milo",
      review:
        "They provide trustworthy, reliable care and make adoption stress-free. Milo felt safe the entire time. I can see why so many people choose them—highly recommended!",
      rating: 4,
      imgParent: "https://i.ibb.co/rGNpbDWt/man-1.jpg",
      imgPet: "https://i.ibb.co/WW5TpJyP/dog.jpg",
    },
    {
      id: 3,
      parentName: "Emily Watson",
      petName: "Luna",
      review:
        "I chose their service because the staff genuinely understands pets’ needs. Luna's adoption process was smooth, and their care services are top-notch. Very professional and loving team!",
      rating: 5,
      imgParent: "https://i.ibb.co/TJx7T2n/woman-2.jpg",
      imgPet: "https://i.ibb.co/PXdtyXL/cat-2.jpg",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h2
        className="text-3xl md:text-4xl font-bold text-center mb-4"
        data-aos="fade-up"
      >
        Meet Our Happy Pet Parents
      </h2>

      <p
        className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        Hear from loving pet parents who trust our care and services.
      </p>

      <div className="grid gap-10 md:grid-cols-3">
        {testimonials.map((t, index) => (
          <div
            key={t.id}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition"
            data-aos="zoom-in"
            data-aos-delay={index * 200}
          >
            {/* Photos */}
            <div className="flex items-center justify-center gap-4 mb-5">
              <img
                src={t.imgParent}
                alt={t.parentName}
                className="w-20 h-20 rounded-full object-cover"
              />
              <img
                src={t.imgPet}
                alt={t.petName}
                className="w-20 h-20 rounded-full object-cover border-4 border-blue-500"
              />
            </div>

            {/* Rating */}
            <div className="flex justify-center mb-3">
              {[...Array(t.rating)].map((_, i) => (
                <FaStar key={i} className="text-yellow-500 text-xl" />
              ))}
            </div>

            {/* Review */}
            <p className="text-gray-700 italic mb-4">“{t.review}”</p>

            {/* Parent info */}
            <h3 className="text-lg font-semibold">
              {t.parentName} &{" "}
              <span className="text-blue-600">{t.petName}</span>
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
