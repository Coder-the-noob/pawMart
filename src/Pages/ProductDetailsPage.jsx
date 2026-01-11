/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import OrderModal from "../Components/OrderModal";

const ProductDetailsPage = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const [allProducts, setAllProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [loading, setLoading] = useState(true);
  const [loadingAll, setLoadingAll] = useState(true);
  const [error, setError] = useState("");

  const refreshOrders = () => {};

  // Fetch product details
  useEffect(() => {
    setLoading(true);
    setError("");

    fetch(`https://scicbackend.vercel.app/services/products-details/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch(() => setError("Failed to load product details. Please try again."))
      .finally(() => setLoading(false));
  }, [id]);

  // Fetch all products
  useEffect(() => {
    setLoadingAll(true);
    fetch(`https://scicbackend.vercel.app/services`)
      .then((res) => res.json())
      .then((data) => setAllProducts(data))
      .catch(() => {})
      .finally(() => setLoadingAll(false));
  }, []);

  const isPet = product?.category === "Pets";

  // No useMemo (beginner friendly)
  const filteredProducts = allProducts.filter((item) => {
    if (!item?._id) return false;
    if (categoryFilter === "All") return item._id !== id;
    return item.category === categoryFilter && item._id !== id;
  });

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 text-base-content flex items-center justify-center px-4">
        <div className="w-full max-w-3xl bg-base-100 rounded-2xl border border-base-300 shadow-xl p-6">
          <div className="flex items-center gap-3">
            <span className="loading loading-spinner loading-md text-primary" />
            <p className="font-semibold">Loading product details...</p>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="skeleton h-64 md:h-[420px] w-full rounded-2xl" />
            <div className="space-y-3">
              <div className="skeleton h-8 w-3/4 rounded-xl" />
              <div className="skeleton h-4 w-full rounded-lg" />
              <div className="skeleton h-4 w-11/12 rounded-lg" />
              <div className="skeleton h-4 w-10/12 rounded-lg" />
              <div className="skeleton h-10 w-40 rounded-xl" />
              <div className="skeleton h-11 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-base-200 text-base-content flex items-center justify-center px-4">
        <div className="w-full max-w-xl bg-base-100 rounded-2xl border border-base-300 shadow-xl p-6">
          <h2 className="text-xl font-bold">Something went wrong</h2>
          <p className="mt-2 text-base-content/70">{error}</p>
          <div className="mt-5 flex gap-3 flex-col sm:flex-row">
            <Link to="/services" className="btn btn-primary rounded-xl flex-1">
              Back to Services
            </Link>
            <button
              className="btn btn-outline rounded-xl flex-1"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        {/* Product Section */}
        <div className="bg-base-100 rounded-2xl shadow-xl border border-base-300 overflow-hidden">
          {/* Image banner */}
          <div className="relative">
            <img
              src={product.image}
              alt={product.productName}
              className="w-full h-64 sm:h-80 md:h-[440px] object-cover"
              loading="lazy"
            />

            {/* Top chips */}
            <div className="absolute left-4 top-4 flex gap-2">
              <span className="badge badge-outline rounded-xl bg-base-100/80 backdrop-blur border-base-300">
                {product.category}
              </span>
              {isPet ? (
                <span className="badge badge-success rounded-xl">Adoption</span>
              ) : (
                <span className="badge badge-info rounded-xl">Order</span>
              )}
            </div>

            {/* Price chip */}
            <div className="absolute right-4 top-4">
              <span className="badge badge-primary badge-lg rounded-xl px-4 py-3 font-bold">
                ${product.price}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 sm:p-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              {product.productName}
            </h1>

            <p className="mt-3 text-base-content/70 leading-relaxed">
              {product.description}
            </p>

            {/* Desktop CTA */}
            <div className="hidden md:flex gap-3 mt-6">
              <button
                onClick={() => setOpenModal(true)}
                className="btn btn-primary rounded-xl flex-1"
              >
                {isPet ? "Adopt Now" : "Order Now"}
              </button>

              <Link to="/services" className="btn btn-outline rounded-xl flex-1">
                Browse More
              </Link>
            </div>

            {/* Trust row */}
            <div className="mt-6 rounded-2xl border border-base-300 bg-base-100 p-4">
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <p className="text-sm text-base-content/70">
                  Secure checkout • Fast response • Support available
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="badge badge-outline rounded-xl">
                    Responsive
                  </span>
                  <span className="badge badge-outline rounded-xl">
                    Accessible
                  </span>
                  <span className="badge badge-outline rounded-xl">
                    Consistent
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Explore More */}
        <div className="mt-8 bg-base-100 rounded-2xl shadow-xl border border-base-300 p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">Explore More</h2>
              <p className="mt-1 text-sm text-base-content/70">
                Filter by category to discover related items.
              </p>
            </div>

            <select
              className="select select-bordered rounded-xl w-full sm:w-72"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Pets">Pets</option>
              <option value="Pet-Food">Pet Food</option>
              <option value="Accessories">Accessories</option>
              <option value="Pet-Care">Pet Care</option>
            </select>
          </div>

          {/* Related grid */}
          <div className="mt-6">
            {loadingAll ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-base-300 bg-base-100 overflow-hidden"
                  >
                    <div className="skeleton h-44 w-full" />
                    <div className="p-4 space-y-2">
                      <div className="skeleton h-5 w-4/5 rounded-lg" />
                      <div className="skeleton h-4 w-1/2 rounded-lg" />
                      <div className="skeleton h-5 w-1/3 rounded-lg" />
                      <div className="skeleton h-9 w-32 rounded-xl" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="rounded-2xl border border-base-300 bg-base-200 p-6 text-center">
                <p className="font-semibold">No related items found.</p>
                <p className="text-sm text-base-content/70 mt-1">
                  Try selecting a different category.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProducts.slice(0, 6).map((item) => (
                  <Link
                    key={item._id}
                    to={`/products-details/${item._id}`}
                    className="group block rounded-2xl border border-base-300 bg-base-100 overflow-hidden shadow-md hover:shadow-xl transition"
                  >
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                      <div className="absolute left-3 top-3">
                        <span className="badge badge-primary rounded-xl font-semibold">
                          ${item.price}
                        </span>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-bold text-lg leading-snug line-clamp-1">
                        {item.productName}
                      </h3>
                      <p className="text-sm text-base-content/70">
                        {item.category}
                      </p>

                      <div className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                        View details{" "}
                        <span className="transition group-hover:translate-x-0.5">
                          →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40">
        <div className="bg-base-100 border-t border-base-300 px-4 py-3">
          <div className="max-w-6xl mx-auto flex gap-3">
            <button
              onClick={() => setOpenModal(true)}
              className="btn btn-primary rounded-xl flex-1"
            >
              {isPet ? "Adopt Now" : "Order Now"}
            </button>
            <Link to="/services" className="btn btn-outline rounded-xl">
              More
            </Link>
          </div>
        </div>
      </div>

      {/* Spacer for sticky CTA */}
      <div className="md:hidden h-20" />

      {/* Modal */}
      {openModal && (
        <OrderModal
          product={product}
          close={() => setOpenModal(false)}
          refreshOrders={refreshOrders}
        />
      )}
    </div>
  );
};

export default ProductDetailsPage;
