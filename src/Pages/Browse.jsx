import { useEffect, useMemo, useState } from "react";
import ServiceCard from "../Components/ServiceCard";
import AOS from "aos";
import "aos/dist/aos.css";

const Browse = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Newest"); // Newest | A-Z

  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-in-out",
      once: true,
    });

    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://scicbackend.vercel.app/services");
        const data = await res.json();
        setServices(Array.isArray(data) ? data : []);
        setTimeout(() => AOS.refresh(), 0);
      } catch (e) {
        console.error(e);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // Build unique categories from data (no hardcoding)
  const categories = useMemo(() => {
    const set = new Set();
    services.forEach((s) => s?.category && set.add(s.category));
    return ["All", ...Array.from(set)];
  }, [services]);

  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    let list = [...services];

    if (category !== "All") {
      list = list.filter((s) => (s?.category || "") === category);
    }

    if (term) {
      list = list.filter((s) => {
        const title = (s?.title || "").toLowerCase();
        const name = (s?.name || "").toLowerCase();
        const cat = (s?.category || "").toLowerCase();
        return (
          title.includes(term) || name.includes(term) || cat.includes(term)
        );
      });
    }

    if (sortBy === "A-Z") {
      list.sort((a, b) =>
        (a?.title || a?.name || "").localeCompare(b?.title || b?.name || "")
      );
    }

    // If your backend has createdAt, you can sort by it.
    // Otherwise Newest just keeps original order from API.
    return list;
  }, [services, searchTerm, category, sortBy]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div data-aos="fade-up">
          <h1 className="text-3xl md:text-4xl font-bold">Browse Listings</h1>
          <p className="text-base-content/70 mt-2">
            Explore pets, products, and care services — all in one place.
          </p>
        </div>

        {/* Controls */}
        <div
          className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto"
          data-aos="fade-up"
        >
          <input
            type="text"
            placeholder="Search by name, title, or category..."
            className="input input-bordered w-full sm:w-80"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="select select-bordered w-full sm:w-52"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            className="select select-bordered w-full sm:w-40"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="Newest">Newest</option>
            <option value="A-Z">A-Z</option>
          </select>
        </div>
      </div>

      <div className="divider"></div>

      {/* Loading Skeletons */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="card bg-base-100 border border-base-200 rounded-2xl"
            >
              <div className="skeleton h-40 w-full"></div>
              <div className="card-body space-y-3">
                <div className="skeleton h-4 w-3/4"></div>
                <div className="skeleton h-4 w-1/2"></div>
                <div className="skeleton h-10 w-full"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Results */}
      {!loading && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((service) => (
            <div key={service._id} data-aos="zoom-in">
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filtered.length === 0 && (
        <div className="card bg-base-100 border border-base-200 rounded-2xl">
          <div className="card-body">
            <h3 className="text-lg font-semibold">No matching items found</h3>
            <p className="text-base-content/70">
              Try a different search term or select another category.
            </p>
            <div className="flex gap-2 mt-3">
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setSearchTerm("")}
              >
                Clear Search
              </button>
              <button
                className="btn btn-outline btn-sm"
                onClick={() => setCategory("All")}
              >
                Reset Category
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Browse;
