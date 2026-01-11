import { useContext } from "react";
import { Link } from "react-router-dom";
import { WishListContext } from "../Provider/WishListContext";

const Wishlist = () => {
  const { items, remove, clear } = useContext(WishListContext);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Wishlist</h1>
          <p className="text-base-content/70 mt-2">
            Save items you like and come back later.
          </p>
        </div>

        {items.length > 0 && (
          <button onClick={clear} className="btn btn-outline btn-sm">
            Clear all
          </button>
        )}
      </div>

      <div className="divider"></div>

      {items.length === 0 ? (
        <div className="card bg-base-100 border border-base-200 rounded-2xl">
          <div className="card-body items-center text-center">
            <div className="text-5xl">💜</div>
            <h2 className="text-xl font-semibold mt-2">
              Your wishlist is empty
            </h2>
            <p className="text-base-content/70 max-w-md">
              Browse listings and tap the heart icon to save items here.
            </p>
            <Link to="/browse" className="btn btn-primary mt-4">
              Browse Listings
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((s) => (
            <div
              key={s._id}
              className="card bg-base-100 border border-base-200 rounded-2xl overflow-hidden hover:shadow-md transition"
            >
              <figure className="h-44">
                <img
                  src={s.image}
                  alt={s.productName || s.title || "Wishlist item"}
                  className="h-full w-full object-cover"
                />
              </figure>

              <div className="card-body">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold leading-tight">
                    {s.productName || s.title || "Untitled"}
                  </h3>
                  {s.category && (
                    <span className="badge badge-outline">{s.category}</span>
                  )}
                </div>

                <div className="text-sm text-base-content/70 space-y-1">
                  {s.location && <p>📍 {s.location}</p>}
                  {s.date && <p>🗓 {s.date}</p>}
                </div>

                <div className="mt-3 flex gap-2">
                  <Link
                    to={`/products-details/${s._id}`}
                    className="btn btn-primary btn-sm flex-1"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => remove(s._id)}
                    className="btn btn-outline btn-sm"
                    title="Remove"
                  >
                    ✕
                  </button>
                </div>

                {s.price && (
                  <p className="mt-2 font-semibold text-primary">
                    ৳{s.price}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Wishlist;
