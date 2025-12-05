import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ServiceCard from "./ServiceCard";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const PopularCare = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
    });

    fetch("http://localhost:3000/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        AOS.refresh();
      })
      .catch((err) => console.error("Failed to load services:", err));
  }, []);

  console.log(services);

  return (
    <div className="container mx-auto mt-10 px-4">
      <h1
        className="text-3xl text-center font-bold mb-6 text-violet-800"
        data-aos="fade-up"
      >
        Popular Winter Care Services
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-center">
        {services.slice(0, 7).map((service) => (
          <div key={service.serviceId} data-aos="fade-up">
            <ServiceCard service={service} />
          </div>
        ))}

        <div className="flex justify-center items-center" data-aos="fade-up">
          <Link to="/services">
            <div className="flex items-center gap-2 cursor-pointer">
              <span className="text-blue-700 font-semibold hover:underline">
                View All Services
              </span>
              <div className="w-10 h-10 bg-blue-700 hover:bg-blue-800 text-white rounded-full flex justify-center items-center shadow-lg transition">
                <FaArrowRight />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PopularCare;
