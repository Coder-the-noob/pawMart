import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const WhyAdopt = () => {
  const [active, setActive] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 750, easing: "ease-in-out", once: true });
  }, []);

  const reasons = [
    {
      icon: "❤️",
      title: "Save a Life",
      desc: "Every adoption gives a homeless pet a second chance at life, love, and a forever home.",
      details: [
        "Adopting frees up space in shelters for other pets.",
        "You give a pet safety, stability, and a loving home.",
        "Rescues often come vaccinated or checked by vets.",
      ],
      cta: { label: "Browse Adoption", to: "/browse?type=adoption" },
    },
    {
      icon: "🐾",
      title: "End Animal Cruelty",
      desc: "By adopting instead of buying, you help stop unethical breeding and support animal welfare.",
      details: [
        "Adoption reduces demand for unethical breeding practices.",
        "You support responsible rescue and welfare programs.",
        "You encourage humane treatment of animals.",
      ],
      cta: { label: "See Pets", to: "/browse?type=adoption" },
    },
    {
      icon: "🏡",
      title: "Find a Loving Companion",
      desc: "Rescued pets are loyal and loving. They bond deeply with families who give them a new start.",
      details: [
        "Rescues can be incredibly affectionate and grateful.",
        "You can choose a pet that matches your lifestyle.",
        "Many rescues are already socialized and trained.",
      ],
      cta: { label: "Find Your Match", to: "/browse?type=adoption" },
    },
    {
      icon: "💸",
      title: "Affordable & Trusted",
      desc: "Adoption is much more affordable than buying from breeders, and includes basic health checks.",
      details: [
        "Lower cost than breeders and pet stores.",
        "Often includes basic vet checks and guidance.",
        "Better value with trusted support.",
      ],
      cta: { label: "Explore Listings", to: "/browse" },
    },
  ];

  const closeModal = () => setActive(null);

  // click outside to close
  const onBackdrop = (e) => {
    if (e.target === e.currentTarget) closeModal();
  };

  return (
    <section className="py-16 mt-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-10" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
            Why Adopt from PawMart?
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Choosing adoption means saving a precious life and giving adorable
            pets the chance they truly deserve.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((item, index) => (
            <button
              key={index}
              type="button"
              data-aos="fade-up"
              data-aos-delay={index * 90}
              onClick={() => setActive(item)}
              className="
                group text-left
                rounded-2xl border border-base-300 bg-base-100
                shadow-sm hover:shadow-xl transition-all duration-300
                p-6
                focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40
              "
            >
              <div className="flex items-start justify-between gap-3">
                <div className="w-14 h-14 rounded-2xl bg-base-200 flex items-center justify-center text-3xl transition-transform duration-300 group-hover:scale-105">
                  {item.icon}
                </div>
                <span className="badge badge-outline rounded-xl">
                  Tap
                </span>
              </div>

              <h3 className="mt-4 text-lg font-extrabold">{item.title}</h3>
              <p className="mt-2 text-sm text-base-content/70 leading-relaxed">
                {item.desc}
              </p>

              <div className="mt-4 text-sm font-semibold text-primary inline-flex items-center gap-2">
                Learn more{" "}
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {active && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-end md:items-center justify-center px-0 md:px-4"
          onMouseDown={onBackdrop}
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full md:max-w-lg bg-base-100 text-base-content rounded-t-3xl md:rounded-3xl border border-base-300 shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="p-5 border-b border-base-300 flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-base-200 flex items-center justify-center text-2xl">
                  {active.icon}
                </div>
                <div>
                  <h4 className="text-xl font-extrabold">{active.title}</h4>
                  <p className="text-sm text-base-content/70 mt-0.5">
                    Quick tips for adoption
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="btn btn-ghost btn-sm rounded-xl"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="p-5">
              <p className="text-sm text-base-content/70 leading-relaxed">
                {active.desc}
              </p>

              <div className="mt-4 rounded-2xl border border-base-300 bg-base-200 p-4">
                <p className="text-xs font-semibold text-base-content/60">
                  Helpful reminders
                </p>
                <ul className="mt-2 space-y-2 text-sm">
                  {active.details.map((d, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="mt-0.5 text-primary">•</span>
                      <span className="text-base-content/80">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-base-300 flex flex-col sm:flex-row gap-3">
              <Link
                to={active.cta.to}
                className="btn btn-primary rounded-xl flex-1"
                onClick={closeModal}
              >
                {active.cta.label}
              </Link>
              <button
                type="button"
                className="btn btn-outline rounded-xl flex-1"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default WhyAdopt;
