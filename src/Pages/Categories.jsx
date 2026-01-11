import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Categories = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 700, easing: "ease-in-out", once: true });

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

  const categories = useMemo(() => {
    const map = new Map();
    services.forEach((s) => {
      const cat = s?.category;
      if (!cat) return;
      map.set(cat, (map.get(cat) || 0) + 1);
    });
    return Array.from(map.entries()).map(([name, count]) => ({ name, count }));
  }, [services]);

  const handleGo = (catName) => {
    // If you want query param filtering later:
    navigate(`/browse?category=${encodeURIComponent(catName)}`);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div data-aos="fade-up">
        <h1 className="text-3xl font-bold">Categories</h1>
        <p className="text-base-content/70 mt-2">
          Browse by category from real listings.
        </p>
      </div>

      <div className="divider"></div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="card border border-base-200 rounded-2xl">
              <div className="card-body space-y-3">
                <div className="skeleton h-4 w-2/3"></div>
                <div className="skeleton h-4 w-1/3"></div>
                <div className="skeleton h-10 w-full"></div>
              </div>
            </div>
          ))}
        </div>
      ) : categories.length === 0 ? (
        <div className="card border border-base-200 rounded-2xl">
          <div className="card-body">
            <h3 className="font-semibold">No categories available</h3>
            <p className="text-base-content/70">
              Add listings so categories can appear here.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((c, i) => (
            <button
              key={c.name}
              onClick={() => handleGo(c.name)}
              data-aos="fade-up"
              data-aos-delay={i * 60}
              className="card bg-base-100 border border-base-200 rounded-2xl hover:shadow-md transition text-left group"
            >
              <div className="card-body">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-semibold group-hover:text-primary transition">
                    {c.name}
                  </h3>
                  <span className="badge badge-outline">{c.count}</span>
                </div>
                <p className="text-base-content/70 text-sm">
                  {c.count} item{c.count > 1 ? "s" : ""} available
                </p>

                <div className="mt-3">
                  <span className="text-primary font-medium text-sm">
                    Explore →
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default Categories;
