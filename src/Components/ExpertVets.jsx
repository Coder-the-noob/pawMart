import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const experts = [
  {
    id: 1,
    name: "Dr. Emily Parker",
    specialization: "Veterinarian - Dogs & Cats",
    experience: 8,
    image: "https://i.ibb.co/zh72scHN/doc-1.jpg"
  },
  {
    id: 2,
    name: "Dr. Liam Johnson",
    specialization: "Exotic Pets Specialist",
    experience: 5,
    image: "https://i.ibb.co/f6q3Jmv/doc-2.jpg"
  },
  {
    id: 3,
    name: "Dr. David Lee",
    specialization: "Pet Nutrition Expert",
    experience: 6,
    image: "https://i.ibb.co/7dk9TCxc/doc-4.jpg"
  },
  {
    id: 4,
    name: "Dr. Steve Smith",
    specialization: "Emergency & Surgery",
    experience: 10,
    image: "https://i.ibb.co/2Y7Pkvbg/doc-3.jpg"
  }
];

const ExpertVets = () => {

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out" });
  }, []);
  return (
    <div className="container mx-auto mt-16 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-violet-800" data-aos="fade">
        Meet Our Expert Vets
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
        {experts.map((vet) => (
          <div key={vet.id} className="card bg-base-100 w-80 shadow-lg hover:shadow-xl transition" data-aos="zoom-in-up">
            <figure>
              <img
                src={vet.image}
                alt={vet.name}
                className="h-64 object-cover w-full"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title  font-bold">{vet.name}</h2>
              <p className="text-gray-600">{vet.specialization}</p>
              <p className="text-gray-500 mt-1">
                Experience: {vet.experience} {vet.experience === 1 ? "year" : "years"}
              </p>
              <div className="card-actions justify-center mt-4">
                <button className="btn btn-primary w-full">Book Appointment</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpertVets;
