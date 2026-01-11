import React, { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const TestimonialsSection = () => {
  useEffect(() => {
    AOS.init({ duration: 750, easing: "ease-in-out", once: true });
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
    <section className="bg-base-200">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Meet Our Happy Pet Parents
          </h2>
          <p className="mt-3 text-base-content/70">
            Hear from loving pet parents who trust our care and services.
          </p>
        </div>

        {/* Testimonials */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <div
              key={t.id}
              data-aos="fade-up"
              data-aos-delay={index * 90}
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
              <div className="p-6">
                {/* Images */}
                <div className="flex items-center justify-center gap-4 mb-5">
                  {/* Parent image */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-base-300 bg-base-200">
                    <img
                      src={t.imgParent}
                      alt={t.parentName}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Pet image with name overlay */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-base-300 bg-base-200">
                    <img
                      src={t.imgPet}
                      alt={t.petName}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Pet name */}
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
                      <span className="text-xs font-semibold text-white tracking-wide">
                        {t.petName}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex justify-center mb-4">
                  <div className="inline-flex items-center gap-1 rounded-xl bg-base-200 border border-base-300 px-3 py-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-sm ${
                          i < t.rating
                            ? "text-yellow-500"
                            : "text-base-content/20"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-xs font-semibold text-base-content/70">
                      {t.rating}.0
                    </span>
                  </div>
                </div>

                {/* Review */}
                <p className="text-sm text-base-content/80 leading-relaxed">
                  <span className="text-base-content/50">“</span>
                  {t.review}
                  <span className="text-base-content/50">”</span>
                </p>

                {/* Footer */}
                <div className="mt-5 text-center">
                  <p className="font-extrabold">{t.parentName}</p>
                  <p className="text-xs text-base-content/60 mt-1">
                    Verified Pet Parent
                  </p>
                </div>
              </div>

              {/* Accent bar */}
              <div className="h-1 bg-primary/60 w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
