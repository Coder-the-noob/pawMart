import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const ProductDetailsPage = () => {
  const { id } = useParams();
  console.log("Route ID:", id);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/services/products-details/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Backend data:", data); 
        setProduct(data);
      });
  }, [id]);

  if (!product) return <div className="p-6">Loading...</div>;
  return (
    <div className="p-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <img
        src={product.image}
        alt={product.name}
        className="rounded-xl w-full object-cover shadow-lg"
      />

      <div>
        <h1 className="text-4xl font-bold mb-4">{product.productName}</h1>
        <p className="mb-4 text-gray-600">{product.description}</p>

        {product.price && (
          <p className="text-2xl font-semibold mb-4">Price: ${product.price}</p>
        )}

        <button className="btn btn-primary w-full">Adopt / Buy</button>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
