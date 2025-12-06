import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import OrderModal from "../Components/OrderModal";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const [allProducts, setAllProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    fetch(`http://localhost:3000/services/products-details/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:3000/services`)
      .then((res) => res.json())
      .then((data) => setAllProducts(data));
  }, []);

  if (!product) return <div className="p-6">Loading...</div>;

  const isPet = product.category === "Pets";

  const filteredProducts = allProducts.filter((item) => {
    if (categoryFilter === "All") return item._id !== id;
    return item.category === categoryFilter && item._id !== id;
  });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <img
          src={product.image}
          alt={product.productName}
          className="rounded-xl w-full object-cover shadow-lg"
        />

        <div>
          <h1 className="text-4xl font-bold mb-4">{product.productName}</h1>
          <p className="mb-4 text-gray-600">{product.description}</p>

          <p className="text-2xl font-semibold mb-4">Price: ${product.price}</p>

          <button
            onClick={() => setOpenModal(true)}
            className="btn btn-primary w-full"
          >
            {isPet ? "Adopt Now" : "Order Now"}
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-3">Explore More</h2>

        <select
          className="select select-bordered w-full md:w-1/3"
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
        {filteredProducts.slice(0, 6).map((item) => (
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
              <p className="text-sm text-gray-600">{item.category}</p>

              <p className="text-lg font-semibold mt-2">${item.price}</p>

              <div className="card-actions justify-end">
                <Link
                  className="btn btn-sm btn-primary"
                  to={`/products-details/${item._id}`}
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {openModal && (
        <OrderModal product={product} close={() => setOpenModal(false)} />
      )}
    </div>
  );
};

export default ProductDetailsPage;
