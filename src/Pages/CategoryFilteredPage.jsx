import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const CategoryFilteredPage = () => {
  
const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/services/category/${categoryName}`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [categoryName]);
  
  
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">{categoryName}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="card bg-base-100 shadow-xl">
            <figure>
              <img
                src={product.image}
                alt={product.name}
                className="h-52 w-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title">{product.name}</h2>
              <p>{product.shortDescription}</p>

              <div className="card-actions justify-end">
                <Link
                  to={`/products-details/${product._id}`}
                  className="btn btn-primary btn-sm"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilteredPage;
