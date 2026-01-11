import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Categories = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 750, easing: "ease-in-out", once: true });

    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://scicbackend.vercel.app/services");
        const data = await res.json();
        setServices(Array.isArray(data) ? data : []);
        // refresh AOS after state paint
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

  const categories = useMemo(() => {
    const map = new Map();
    services.forEach((s) => {
      const cat = s?.category;
      if (!cat) return;
      map.set(cat, (map.get(cat) || 0) + 1);
    });

    // sort by count desc, then name asc (polished feel)
    return Array.from(map.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => (b.count !== a.count ? b.count - a.count : a.name.localeCompare(b.name)));
  }, [services]);

  const handleGo = (catName) => {
    navigate(`/browse?category=${encodeURIComponent(catName)}`);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div data-aos="fade-up" className="text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Categories
        </h1>
        <p className="text-base-content/70 mt-2">
          Browse by category from real listings.
        </p>
      </div>

      <div className="divider my-8" />

      {/* Loading */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-base-300 bg-base-100 shadow-sm overflow-hidden"
            >
              <div className="p-5 space-y-3">
                <div className="skeleton h-5 w-2/3 rounded-lg" />
                <div className="skeleton h-4 w-1/3 rounded-lg" />
                <div className="skeleton h-10 w-full rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      ) : categories.length === 0 ? (
        /* Empty state */
        <div className="rounded-2xl border border-base-300 bg-base-100 shadow-sm p-6">
          <h3 className="text-lg font-bold">No categories available</h3>
          <p className="text-base-content/70 mt-1">
            Add listings so categories can appear here.
          </p>
        </div>
      ) : (
        <>
          {/* Summary row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <p className="text-sm text-base-content/70">
              Found{" "}
              <span className="font-bold text-base-content">
                {categories.length}
              </span>{" "}
              categories
            </p>
            <p className="text-sm text-base-content/60">
              Tap a category to explore items
            </p>
          </div>

          {/* Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((c, i) => (
              <button
                key={c.name}
                type="button"
                onClick={() => handleGo(c.name)}
                data-aos="fade-up"
                data-aos-delay={i * 60}
                className="
                  group text-left
                  rounded-2xl border border-base-300 bg-base-100
                  shadow-sm hover:shadow-xl
                  transition-all duration-200
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40
                "
              >
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-extrabold leading-snug group-hover:text-primary transition">
                      {c.name}
                    </h3>

                    <span className="badge badge-outline rounded-xl">
                      {c.count}
                    </span>
                  </div>

                  <p className="text-sm text-base-content/70 mt-1">
                    {c.count} item{c.count > 1 ? "s" : ""} available
                  </p>

                  {/* Interactive footer */}
                  <div className="mt-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      Explore
                      <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                        →
                      </span>
                    </span>

                    <span className="text-xs text-base-content/60">
                      Click to view
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Categories;
