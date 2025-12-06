import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

const RecentListing = () => {
  const [listings, setListings] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", "Pets", "Pet-Food", "Accessories", "Pet-Care"];

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
    });

    fetch("http://localhost:3000/recent-listings")
      .then((res) => res.json())
      .then((data) => {
        setListings(data);
        setFiltered(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let data = [...listings];

    if (category !== "All") {
      data = data.filter((item) => item.category === category);
    }

    if (search.trim() !== "") {
      data = data.filter(
        (item) =>
          item.productName.toLowerCase().includes(search.toLowerCase()) ||
          item.location.toLowerCase().includes(search.toLowerCase()) ||
          item.category.toLowerCase().includes(search.toLowerCase())
      );
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFiltered(data);
  }, [search, category, listings]);

  return (
    <div className="my-12 container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6 text-center" data-aos="fade-up">
        Recent Listings
      </h2>

      {/* Search and Filter Controls */}
      <div
        className="flex flex-col md:flex-row justify-between gap-4 mb-6"
        data-aos="fade-up"
      >
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by name, location, category..."
          className="input input-bordered w-full md:w-1/2
             dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600
             dark:placeholder-gray-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Category Dropdown */}
        <select
          className="select select-bordered w-full md:w-1/4
             dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Skeleton Loader */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="card bg-base-200 shadow-xl">
              <figure className="skeleton h-48 w-full"></figure>

              <div className="card-body space-y-3">
                <div className="skeleton h-4 w-3/4"></div>
                <div className="skeleton h-4 w-1/2"></div>
                <div className="skeleton h-4 w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Listings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.length > 0 ? (
              filtered.map((item) => (
                <div key={item._id} className="card bg-base-100 shadow-xl">
                  <figure>
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="h-48 w-full object-cover"
                    />
                  </figure>

                  <div className="card-body">
                    <h2 className="card-title">{item.productName}</h2>

                    <p className="text-sm text-gray-600">
                      Category: {item.category}
                    </p>

                    <p className="text-sm text-gray-600">
                      Location: {item.location}
                    </p>

                    <p className="text-lg font-semibold mt-2">
                      {item.price > 0 ? `$${item.price}` : "Free for Adoption"}
                    </p>

                    <div className="card-actions justify-end">
                      <Link
                        to={`/products-details/${item._id}`}
                        className="btn btn-primary btn-sm"
                      >
                        See Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-lg col-span-3">
                No results found.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default RecentListing;
