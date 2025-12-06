import React, { useState } from "react";

const UpdateModal = ({ item, close, refresh }) => {
  const [form, setForm] = useState({...item});

  const handleUpdate = async (e) => {
    e.preventDefault();


    const updatedForm = { ...form };
    delete updatedForm._id;

    try {
      const res = await fetch(`http://localhost:3000/services/${item._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedForm),
      });

      const data = await res.json();
      console.log("Update response:", data);

      refresh();
      close();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <form
        onSubmit={handleUpdate}
        className="bg-white p-6 rounded-lg w-96 shadow-lg"
      >
        <h2 className="text-xl font-bold mb-4">Update Listing</h2>

        <input
          type="text"
          value={form.productName}
          onChange={(e) =>
            setForm({ ...form, productName: e.target.value })
          }
          className="input input-bordered w-full mb-3"
          placeholder="Product Name"
        />

        <input
          type="number"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: Number(e.target.value) })
          }
          className="input input-bordered w-full mb-3"
          placeholder="Price"
        />

        <input
          type="text"
          value={form.location}
          onChange={(e) =>
            setForm({ ...form, location: e.target.value })
          }
          className="input input-bordered w-full mb-3"
          placeholder="Location"
        />

        <button type="submit" className="btn btn-primary w-full">
          Update
        </button>

        <button
          type="button"              
          className="btn btn-outline w-full mt-2"
          onClick={close}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateModal;
