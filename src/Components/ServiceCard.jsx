import { useContext } from "react";
import { Link } from "react-router-dom";
import { WishListContext } from "../Provider/WishListContext";

const ServiceCard = ({ service }) => {
  const { toggle, isInWishlist } = useContext(WishListContext);

  const {
    _id,
    image,
    productName,
    title,
    price,
    category,
    date,
    location,
  } = service;

  const name = productName || title || "Untitled Listing";
  const saved = isInWishlist(_id);

  return (
    <div className="group relative rounded-2xl overflow-hidden bg-base-100 border border-base-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />

        {/* Always visible fade */}
        <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/15 to-transparent transition group-hover:from-black/65" />

        {/* Category */}
        {category && (
          <span className="absolute top-3 left-3 badge badge-primary badge-sm shadow-sm">
            {category}
          </span>
        )}

        {/* Price */}
        {price && (
          <span className="absolute top-3 right-12 px-3 py-1 rounded-full text-sm font-semibold bg-primary/90 text-primary-content shadow-md backdrop-blur border border-primary/30">
            ৳{price}
          </span>
        )}

        {/* Wishlist Heart */}
        <button
          type="button"
          onClick={() => toggle(service)}
          className={`absolute top-3 right-3 btn btn-circle btn-sm ${
            saved ? "btn-primary" : "btn-ghost"
          } bg-base-100/70 hover:bg-base-100 backdrop-blur`}
          title={saved ? "Remove from wishlist" : "Add to wishlist"}
        >
          {saved ? "♥" : "♡"}
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h2 className="text-lg font-semibold leading-tight group-hover:text-primary transition">
          {name}
        </h2>

        <div className="text-sm text-base-content/70 space-y-1">
          {location && (
            <p className="flex items-center gap-2">
              <span className="opacity-80">📍</span>
              <span>{location}</span>
            </p>
          )}
          {date && (
            <p className="flex items-center gap-2">
              <span className="opacity-80">🗓</span>
              <span>{date}</span>
            </p>
          )}
        </div>

        <Link to={`/products-details/${_id}`} className="btn btn-primary btn-sm w-full mt-2">
          View Details
        </Link>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-base-200/70 group-hover:ring-primary/25 transition" />
    </div>
  );
};

export default ServiceCard;
