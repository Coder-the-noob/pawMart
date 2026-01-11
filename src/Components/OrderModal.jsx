import React, { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";

const OrderModal = ({ product, close, refreshOrders }) => {
  const { user } = useAuth();
  const isPet = product?.category === "Pets";

  const [form, setForm] = useState({
    buyerName: user?.displayName || "",
    buyerEmail: user?.email || "",
    productId: product?._id || "",
    productName: product?.productName || "",
    quantity: 1,
    price: product?.price || 0,
    address: "",
    phone: "",
    date: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  /* 🔒 Lock background scroll */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  /* ⌨️ ESC key close */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  const validate = () => {
    const e = {};
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    if (form.phone && form.phone.length < 9)
      e.phone = "Enter a valid phone number";
    if (!form.date) e.date = "Please select a date";
    return e;
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    if (loading) return;

    const eObj = validate();
    setErrors(eObj);
    if (Object.keys(eObj).length) return;

    setLoading(true);
    try {
      const res = await fetch("https://scicbackend.vercel.app/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();

      await res.json();

      Swal.fire({
        title: isPet ? "Request Submitted!" : "Order Successful!",
        text: isPet
          ? "Your adoption request has been sent."
          : "Your order has been submitted.",
        icon: "success",
      });

      refreshOrders?.();
      close();
    } catch {
      Swal.fire({
        title: "Failed",
        text: "Something went wrong. Please try again.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  /* Click outside close */
  const onBackdrop = (e) => {
    if (e.target === e.currentTarget) close();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-end md:items-center justify-center"
      onMouseDown={onBackdrop}
    >
      {/* Modal panel */}
      <form
        onSubmit={handleOrder}
        className="
          w-full md:max-w-lg
          bg-base-100 text-base-content
          rounded-t-3xl md:rounded-3xl
          shadow-2xl border border-base-300
          max-h-[92vh] overflow-y-auto
          animate-[slideUp_0.25s_ease-out]
        "
      >
        {/* Header */}
        <div className="p-5 border-b border-base-300 flex justify-between items-start">
          <div>
            <h2 className="text-xl font-extrabold">
              {isPet ? "Adoption Request" : "Complete Your Order"}
            </h2>
            <p className="text-sm text-base-content/70 mt-1">
              {product.productName} • ${product.price}
            </p>
          </div>

          <button
            type="button"
            onClick={close}
            className="btn btn-ghost btn-sm rounded-xl"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          {/* Read only */}
          <input
            className="input input-bordered w-full rounded-xl"
            value={form.buyerName}
            readOnly
          />
          <input
            className="input input-bordered w-full rounded-xl"
            value={form.buyerEmail}
            readOnly
          />

          {/* Address */}
          <div>
            <input
              placeholder="Address"
              className={`input input-bordered w-full rounded-xl ${
                errors.address ? "input-error" : ""
              }`}
              onChange={(e) =>
                setForm({ ...form, address: e.target.value })
              }
            />
            {errors.address && (
              <p className="text-sm text-error mt-1">{errors.address}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <input
              placeholder="Phone"
              className={`input input-bordered w-full rounded-xl ${
                errors.phone ? "input-error" : ""
              }`}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />
            {errors.phone && (
              <p className="text-sm text-error mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Date */}
          <div>
            <input
              type="date"
              className={`input input-bordered w-full rounded-xl ${
                errors.date ? "input-error" : ""
              }`}
              onChange={(e) =>
                setForm({ ...form, date: e.target.value })
              }
            />
            {errors.date && (
              <p className="text-sm text-error mt-1">{errors.date}</p>
            )}
          </div>

          {/* Notes */}
          <textarea
            placeholder="Additional notes (optional)"
            className="textarea textarea-bordered w-full rounded-xl"
            rows={3}
            onChange={(e) =>
              setForm({ ...form, notes: e.target.value })
            }
          />
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-base-300 space-y-3">
          <button
            disabled={loading}
            className="btn btn-primary w-full rounded-xl"
          >
            {loading ? "Submitting..." : isPet ? "Submit Request" : "Confirm Order"}
          </button>

          <button
            type="button"
            onClick={close}
            className="btn btn-outline w-full rounded-xl"
          >
            Cancel
          </button>

          <p className="text-xs text-base-content/60 text-center">
            Press <kbd className="kbd kbd-sm">ESC</kbd> to close
          </p>
        </div>
      </form>

      {/* Animation keyframes */}
      <style>
        {`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default OrderModal;
