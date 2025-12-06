import React, { useState } from "react";
import useAuth from "../Hooks/useAuth";

const OrderModal = ({ product, close }) => {
  const { user } = useAuth();

  const [form, setForm] = useState({
    buyerName: user?.displayName || "",
    buyerEmail: user?.email || "",
    productId: product._id,
    productName: product.productName,
    quantity: product.category === "Pets" ? 1 : 1,
    price: product.price,
    address: "",
    phone: "",
    date: "",
    notes: "",
  });

  const handleOrder = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Order Successful!");
        close();
      });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <form
        onSubmit={handleOrder}
        className="bg-white p-6 rounded-xl w-96 shadow-xl space-y-4"
      >
        <h2 className="text-2xl font-bold">Complete Your Order</h2>

        <input className="input input-bordered w-full" value={form.buyerName} readOnly />

        <input className="input input-bordered w-full" value={form.buyerEmail} readOnly />

        <input className="input input-bordered w-full" value={form.productId} readOnly />

        <input className="input input-bordered w-full" value={form.productName} readOnly />

        <input className="input input-bordered w-full" value={form.price} readOnly />

        <input
          type="text"
          placeholder="Address"
          className="input input-bordered w-full"
          required
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <input
          type="text"
          placeholder="Phone"
          className="input input-bordered w-full"
          required
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <input
          type="date"
          className="input input-bordered w-full"
          required
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <textarea
          placeholder="Additional Notes"
          className="textarea textarea-bordered w-full"
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        ></textarea>

        <button className="btn btn-primary w-full">Confirm Order</button>
        <button type="button" onClick={close} className="btn btn-outline w-full">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default OrderModal;
