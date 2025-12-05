import React, { useEffect, useState } from "react";
import ServiceCard from "../Components/ServiceCard";
import AOS from "aos";
import "aos/dist/aos.css";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-in-out",
      once: true,
    });

    fetch("http://localhost:3000/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        AOS.refresh();
      });
  }, []);

  return (
    <div className="container mx-auto mt-10 px-4">
      <h1
        className="text-3xl text-center font-bold mb-6 text-gray-800"
        data-aos="fade-up"
      >
        All Winter Care Services
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <div key={service._id} data-aos="zoom-in">
            <ServiceCard service={service} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
