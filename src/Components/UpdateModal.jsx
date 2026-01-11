import React, { useEffect, useState } from "react";

const UpdateModal = ({ item, close, refresh }) => {
  const [form, setForm] = useState({ ...item });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm({ ...item });
  }, [item]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (loading) return;

    const updatedForm = { ...form };
    delete updatedForm._id;

    setLoading(true);
    try {
      const res = await fetch(`https://scicbackend.vercel.app/services/${item._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedForm),
      });

      if (!res.ok) throw new Error("Update failed");

      await res.json();
      refresh?.();
      close?.();
    } catch (err) {
      console.error("Update error:", err);
    } finally {
      setLoading(false);
    }
  };

  // click outside to close
  const onBackdrop = (e) => {
    if (e.target === e.currentTarget) close?.();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-end md:items-center justify-center p-0 md:p-6"
      onMouseDown={onBackdrop}
      role="dialog"
      aria-modal="true"
    >
      <form
        onSubmit={handleUpdate}
        className="
          w-full md:max-w-lg
          bg-base-100 text-base-content
          rounded-t-3xl md:rounded-3xl
          shadow-2xl border border-base-300
          overflow-hidden
        "
      >
        {/* Header */}
        <div className="p-5 border-b border-base-300 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold">
              Update Listing
            </h2>
            <p className="mt-1 text-sm text-base-content/70">
              Edit the details and save changes.
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
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-sm font-semibold text-base-content/70">
                Product Name
              </span>
            </label>
            <input
              type="text"
              value={form.productName || ""}
              onChange={(e) => setForm({ ...form, productName: e.target.value })}
              className="input input-bordered w-full rounded-xl"
              placeholder="Product Name"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-sm font-semibold text-base-content/70">
                  Price
                </span>
              </label>
              <input
                type="number"
                min={0}
                value={form.price ?? ""}
                onChange={(e) =>
                  setForm({ ...form, price: Number(e.target.value) })
                }
                className="input input-bordered w-full rounded-xl"
                placeholder="Price"
                required
              />
              <p className="mt-1 text-xs text-base-content/60">
                Enter a numeric value (e.g., 499).
              </p>
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-sm font-semibold text-base-content/70">
                  Location
                </span>
              </label>
              <input
                type="text"
                value={form.location || ""}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="input input-bordered w-full rounded-xl"
                placeholder="Location"
                required
              />
            </div>
          </div>

          {/* small live preview (interactive, no extra data) */}
          <div className="rounded-2xl border border-base-300 bg-base-200 p-4">
            <p className="text-xs font-semibold text-base-content/60">Preview</p>
            <div className="mt-2 flex items-center justify-between gap-3">
              <div>
                <p className="font-bold leading-snug line-clamp-1">
                  {form.productName || "—"}
                </p>
                <p className="text-sm text-base-content/70">
                  {form.location || "—"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-base-content/60">Price</p>
                <p className="text-lg font-extrabold">
                  ${Number(form.price || 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-base-300 flex flex-col gap-3">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full rounded-xl"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <span className="loading loading-spinner loading-sm" />
                Updating...
              </span>
            ) : (
              "Update"
            )}
          </button>

          <button
            type="button"
            className="btn btn-outline w-full rounded-xl"
            onClick={close}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateModal;
