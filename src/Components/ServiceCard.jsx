import React from "react";

import { Link } from "react-router";

const ServiceCard = ({ service }) => {
  return (
    <div
      className="bg-white rounded-xl shadow-md p-4 
                  transform transition duration-300 hover:shadow-lg hover:-translate-y-2"
    >
      <img
        src={service.image}
        alt={service.productName}
        className="w-full h-40 object-cover rounded-lg"
      />

      <h2 className="text-lg font-semibold mt-3 text-gray-800">
        {service.productName}
      </h2>

      <div className="flex items-center gap-1 mt-1 text-yellow-500">
        Date: <span className="text-gray-700 font-medium">{service.date}</span>
      </div>

      <p className="text-gray-800 font-bold mt-2">Price: ${service.price}</p>

      <Link to={`/products-details/${service._id}`} className="btn btn-primary">
        View Details
      </Link>
    </div>
  );
};

export default ServiceCard;
