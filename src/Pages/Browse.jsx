import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ServiceCard from "../Components/ServiceCard";
import AOS from "aos";
import "aos/dist/aos.css";

const Browse = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();
  const type = searchParams.get("type"); 

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Newest"); 

  useEffect(() => {
    AOS.init({ duration: 700, easing: "ease-in-out", once: true });

    const load = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch("https://scicbackend.vercel.app/services");
        const data = await res.json();
        setServices(Array.isArray(data) ? data : []);
        setTimeout(() => AOS.refresh(), 0);
      } catch (e) {
        console.error(e);
        setServices([]);
        setError("Failed to load listings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  useEffect(() => {
    if (type === "services") setCategory("Pet-Care");
    else if (type === "adoption") setCategory("Pets");
    else if (type === "products") setCategory("All"); 
    else setCategory("All");
  }, [type]);

  // Build unique categories from fetched data
  const categories = (() => {
    const set = new Set();
    services.forEach((s) => s?.category && set.add(s.category));
    return ["All", ...Array.from(set)];
  })();

  // Filter + search + type mapping (menu support)
  const filtered = (() => {
    const term = searchTerm.trim().toLowerCase();
    let list = [...services];

    // type filter from navbar (best effort)
    if (type === "services") {
      list = list.filter((s) => (s?.category || "").toLowerCase().includes("pet-care"));
    } else if (type === "adoption") {
      list = list.filter((s) => (s?.category || "") === "Pets" || Number(s?.price) <= 0);
    } else if (type === "products") {
      list = list.filter((s) => (s?.category || "").toLowerCase() !== "pet-care");
    }

    // category filter
    if (category !== "All") {
      list = list.filter((s) => (s?.category || "") === category);
    }

    // search
    if (term) {
      list = list.filter((s) => {
        // your API sometimes uses productName; keep fallbacks too
        const name = (s?.productName || s?.name || "").toLowerCase();
        const title = (s?.title || "").toLowerCase();
        const cat = (s?.category || "").toLowerCase();
        const location = (s?.location || "").toLowerCase();

        return (
          name.includes(term) ||
          title.includes(term) ||
          cat.includes(term) ||
          location.includes(term)
        );
      });
    }

    // sort
    if (sortBy === "A-Z") {
      list.sort((a, b) =>
        (a?.productName || a?.title || a?.name || "").localeCompare(
          b?.productName || b?.title || b?.name || ""
        )
      );
    }
    return list;
  })();

  const clearAll = () => {
    setSearchTerm("");
    setCategory("All");
    setSortBy("Newest");
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div data-aos="fade-up">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Browse Listings
          </h1>
          <p className="text-base-content/70 mt-2">
            Explore pets, products, and care services — all in one place.
          </p>

          {/* small status row */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {type && (
              <span className="badge badge-outline rounded-xl">
                Filter: {type}
              </span>
            )}
            {!loading && (
              <span className="badge badge-primary rounded-xl">
                {filtered.length} result{filtered.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>

        {/* Controls */}
        <div
          className="w-full lg:w-auto"
          data-aos="fade-up"
        >
          <div className="bg-base-100 border border-base-300 rounded-2xl shadow-xl p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row gap-3">
              <label className="form-control w-full sm:w-80">
                <span className="label-text text-sm font-semibold text-base-content/70">
                  Search
                </span>
                <input
                  type="text"
                  placeholder="Search by name, location, category..."
                  className="input input-bordered w-full rounded-xl"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </label>

              <label className="form-control w-full sm:w-52">
                <span className="label-text text-sm font-semibold text-base-content/70">
                  Category
                </span>
                <select
                  className="select select-bordered w-full rounded-xl"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>

              <label className="form-control w-full sm:w-40">
                <span className="label-text text-sm font-semibold text-base-content/70">
                  Sort
                </span>
                <select
                  className="select select-bordered w-full rounded-xl"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="Newest">Newest</option>
                  <option value="A-Z">A-Z</option>
                </select>
              </label>
            </div>

            <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <p className="text-sm text-base-content/70">
                Tip: Use filters to find items faster.
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="btn btn-outline btn-sm rounded-xl"
                disabled={!searchTerm && category === "All" && sortBy === "Newest"}
              >
                Clear all
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="divider my-8" />

      {/* Error */}
      {!loading && error && (
        <div className="bg-base-100 border border-base-300 rounded-2xl shadow-md p-6 mb-6">
          <h3 className="text-lg font-bold">Something went wrong</h3>
          <p className="text-base-content/70 mt-1">{error}</p>
        </div>
      )}

      {/* Loading Skeletons */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-base-300 bg-base-100 shadow-sm overflow-hidden"
            >
              <div className="skeleton h-40 w-full" />
              <div className="p-4 space-y-3">
                <div className="skeleton h-4 w-3/4 rounded-lg" />
                <div className="skeleton h-4 w-1/2 rounded-lg" />
                <div className="skeleton h-10 w-full rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Results */}
      {!loading && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((service, i) => (
            <div key={service._id} data-aos="zoom-in" data-aos-delay={i * 40}>
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filtered.length === 0 && (
        <div className="bg-base-100 border border-base-300 rounded-2xl shadow-md p-8 text-center">
          <h3 className="text-lg font-bold">No matching items found</h3>
          <p className="text-base-content/70 mt-2">
            Try a different search term or select another category.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center mt-5">
            <button className="btn btn-primary rounded-xl" onClick={() => setSearchTerm("")}>
              Clear Search
            </button>
            <button className="btn btn-outline rounded-xl" onClick={() => setCategory("All")}>
              Reset Category
            </button>
            <button className="btn btn-outline rounded-xl" onClick={clearAll}>
              Reset All
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Browse;
