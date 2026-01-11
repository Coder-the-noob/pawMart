/* eslint-disable react-hooks/set-state-in-effect */
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
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });

    fetch("https://scicbackend.vercel.app/recent-listings")
      .then((res) => res.json())
      .then((data) => {
        const safe = Array.isArray(data) ? data : [];
        setListings(safe);
        setFiltered(safe);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    let data = [...listings];

    if (category !== "All") {
      data = data.filter((item) => item.category === category);
    }

    const q = search.trim().toLowerCase();
    if (q) {
      data = data.filter((item) => {
        const name = (item.productName || "").toLowerCase();
        const loc = (item.location || "").toLowerCase();
        const cat = (item.category || "").toLowerCase();
        return name.includes(q) || loc.includes(q) || cat.includes(q);
      });
    }

    setFiltered(data);
  }, [search, category, listings]);

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
  };

  return (
    <section className="my-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Recent Listings
          </h2>
          <p className="mt-2 text-base-content/70">
            Discover the latest pets, food, accessories, and care items.
          </p>
        </div>

        {/* Controls */}
        <div
          className="mt-8 bg-base-100 border border-base-300 rounded-2xl shadow-xl p-4 sm:p-5"
          data-aos="fade-up"
        >
          <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
            {/* Search */}
            <label className="form-control w-full md:flex-1">
              <span className="label-text text-sm font-semibold text-base-content/70">
                Search
              </span>
              <input
                type="text"
                placeholder="Search by name, location, category..."
                className="input input-bordered w-full rounded-xl"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>

            {/* Category */}
            <label className="form-control w-full md:w-64">
              <span className="label-text text-sm font-semibold text-base-content/70">
                Category
              </span>
              <select
                className="select select-bordered w-full rounded-xl"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </label>

            {/* Clear */}
            <button
              type="button"
              onClick={clearFilters}
              className="btn btn-outline rounded-xl md:mt-6"
              disabled={!search && category === "All"}
              title="Clear filters"
            >
              Clear
            </button>
          </div>

          {/* Result count */}
          <div className="mt-3 flex items-center justify-between">
            <p className="text-sm text-base-content/70">
              Showing{" "}
              <span className="font-bold text-base-content">
                {loading ? "..." : filtered.length}
              </span>{" "}
              results
            </p>
            {(search || category !== "All") && (
              <div className="text-xs text-base-content/60">
                Filters active
              </div>
            )}
          </div>
        </div>

        {/* Skeleton Loader */}
        {loading ? (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-base-300 bg-base-100 shadow-md overflow-hidden"
              >
                <div className="skeleton h-48 w-full" />
                <div className="p-4 space-y-3">
                  <div className="skeleton h-5 w-4/5 rounded-lg" />
                  <div className="skeleton h-4 w-1/2 rounded-lg" />
                  <div className="skeleton h-4 w-2/3 rounded-lg" />
                  <div className="skeleton h-9 w-28 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8">
            {/* Empty state */}
            {filtered.length === 0 ? (
              <div className="bg-base-100 border border-base-300 rounded-2xl shadow-md p-8 text-center">
                <p className="text-lg font-bold">No results found</p>
                <p className="mt-2 text-sm text-base-content/70">
                  Try changing the category or search term.
                </p>
                <button
                  onClick={clearFilters}
                  className="btn btn-primary rounded-xl mt-5"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <>
                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((item) => {
                    const priceText =
                      Number(item.price) > 0 ? `$${item.price}` : "Free for Adoption";

                    return (
                      <div
                        key={item._id}
                        className="group rounded-2xl border border-base-300 bg-base-100 shadow-md hover:shadow-xl transition overflow-hidden"
                        data-aos="fade-up"
                      >
                        <div className="relative">
                          <img
                            src={item.image}
                            alt={item.productName}
                            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                            loading="lazy"
                          />

                          {/* Price badge */}
                          <div className="absolute left-3 top-3">
                            <span className="badge badge-primary rounded-xl font-semibold">
                              {priceText}
                            </span>
                          </div>
                        </div>

                        <div className="p-4">
                          <h3 className="text-lg font-extrabold leading-snug line-clamp-1">
                            {item.productName}
                          </h3>

                          <div className="mt-2 space-y-1">
                            <p className="text-sm text-base-content/70">
                              Category:{" "}
                              <span className="font-semibold text-base-content">
                                {item.category}
                              </span>
                            </p>
                            <p className="text-sm text-base-content/70">
                              Location:{" "}
                              <span className="font-semibold text-base-content">
                                {item.location}
                              </span>
                            </p>
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            <Link
                              to={`/products-details/${item._id}`}
                              className="btn btn-primary btn-sm rounded-xl"
                            >
                              See Details
                            </Link>

                            <span className="text-xs text-base-content/60">
                              Tap for more →
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Footer hint */}
                <p className="mt-6 text-center text-sm text-base-content/60">
                  Showing the latest available items.
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentListing;
