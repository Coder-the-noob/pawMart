import React, { useEffect, useState } from "react";
import ServiceCard from "../Components/ServiceCard";
import AOS from "aos";
import "aos/dist/aos.css";

const Services = () => {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-in-out",
      once: true,
    });

    fetch("https://scicbackend.vercel.app/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        AOS.refresh();
      });
  }, []);

  const filteredServices = services.filter((service) => {
    if (!searchTerm.trim()) return true;

    const term = searchTerm.toLowerCase();

    return (
      service.title?.toLowerCase().includes(term) ||
      service.name?.toLowerCase().includes(term) ||
      service.category?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="container mx-auto mt-10 px-4">
      <h1 className="text-3xl text-center font-bold mb-6" data-aos="fade-up">
        Pets and Supplies
      </h1>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search pets or supplies..."
          className="input input-bordered w-full max-w-md rounded-full px-4 py-2 shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <div key={service._id} data-aos="zoom-in">
              <ServiceCard service={service} />
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 text-lg">
            No matching items found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Services;
