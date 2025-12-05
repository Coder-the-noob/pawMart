import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { toast } from "react-hot-toast";

const ServiceCard = ({ service }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    toast.success("Service booked successfully!");
    setFormData({ name: "", email: "" }); 
  };

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

      <button
        onClick={openModal}
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
      >
        View Details
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
            <h2 className="text-xl font-bold mb-4">{service.productName}</h2>
            <p className="text-gray-700 mb-4">{service.description}</p>
            <p className="text-gray-800 font-bold mb-4">
              Price: ${service.price}
            </p>
            <p className="flex items-center gap-1 text-yellow-500 font-medium">
              Date: {service.date}
            </p>

            {/* Booking Form */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Book Service</h3>
              <form
                onSubmit={handleFormSubmit}
                className="flex flex-col gap-3"
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  className="border border-gray-300 rounded-lg p-2"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  className="border border-gray-300 rounded-lg p-2"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Book Now
                </button>
              </form>
            </div>

            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 font-bold text-lg"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;
