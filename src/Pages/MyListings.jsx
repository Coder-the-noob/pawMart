import React, { useEffect, useState } from "react";
import UpdateModal from "../Components/UpdateModal";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";

const MyListings = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshListings = () => {
    if (!user?.email) return;

    setLoading(true);
    fetch(`https://scicbackend.vercel.app/my-listings/${user.email}`)
      .then((res) => res.json())
      .then((data) => setListings(Array.isArray(data) ? data : []))
      .catch(() => setListings([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!user?.email) return;
    refreshListings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete this listing?",
      text: "This item will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://scicbackend.vercel.app/services/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            Swal.fire("Deleted!", "Your listing has been removed.", "success");
            refreshListings();
          })
          .catch(() => {
            Swal.fire("Error!", "Could not delete the item.", "error");
          });
      }
    });
  };

  return (
    <section className="min-h-[70vh] bg-base-200">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              My Listings
            </h1>
            <p className="text-base-content/70 mt-2">
              Manage your posted items — update details or remove listings.
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="badge badge-primary rounded-xl">
                {loading ? "Loading..." : `${listings.length} listing(s)`}
              </span>
              {user?.email && (
                <span className="badge badge-outline rounded-xl">
                  {user.email}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="divider my-8" />

        {/* Card container */}
        <div className="bg-base-100 border border-base-300 rounded-2xl shadow-xl overflow-hidden">
          {/* Top bar */}
          <div className="p-5 sm:p-6 border-b border-base-300 flex items-center justify-between">
            <h2 className="text-lg font-extrabold">Listings Table</h2>
            <button
              type="button"
              className="btn btn-outline btn-sm rounded-xl"
              onClick={refreshListings}
              disabled={loading}
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="loading loading-spinner loading-sm" />
                  Refreshing
                </span>
              ) : (
                "Refresh"
              )}
            </button>
          </div>

          {/* Content */}
          {loading ? (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-base-300 bg-base-100 p-4"
                  >
                    <div className="flex gap-4 items-center">
                      <div className="skeleton w-16 h-16 rounded-2xl" />
                      <div className="flex-1 space-y-2">
                        <div className="skeleton h-4 w-2/3" />
                        <div className="skeleton h-4 w-1/2" />
                        <div className="skeleton h-4 w-1/3" />
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <div className="skeleton h-9 w-24 rounded-xl" />
                      <div className="skeleton h-9 w-24 rounded-xl" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : listings.length === 0 ? (
            <div className="p-8 text-center">
              <h3 className="text-lg font-bold">No listings found</h3>
              <p className="text-base-content/70 mt-2">
                You haven’t added any listings yet.
              </p>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr className="bg-base-200 text-base-content">
                      <th>Item</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Location</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listings.map((item) => (
                      <tr key={item._id} className="hover">
                        <td>
                          <div className="flex items-center gap-4">
                            <div className="avatar">
                              <div className="w-14 h-14 rounded-2xl border border-base-300">
                                <img
                                  src={item.image}
                                  alt={item.productName}
                                  className="object-cover"
                                />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">
                                {item.productName}
                              </div>
                              <div className="text-sm text-base-content/60">
                                ID: {item._id?.slice?.(0, 8)}...
                              </div>
                            </div>
                          </div>
                        </td>

                        <td>
                          <span className="badge badge-outline rounded-xl">
                            {item.category}
                          </span>
                        </td>

                        <td className="font-semibold">
                          {Number(item.price) > 0
                            ? `$${item.price}`
                            : "Free / Adoption"}
                        </td>

                        <td className="text-base-content/80">
                          {item.location || "—"}
                        </td>

                        <td className="text-right">
                          <div className="inline-flex gap-2">
                            <button
                              className="btn btn-info btn-sm rounded-xl"
                              onClick={() => setSelected(item)}
                            >
                              Update
                            </button>
                            <button
                              className="btn btn-error btn-sm rounded-xl"
                              onClick={() => handleDelete(item._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="md:hidden p-4 space-y-4">
                {listings.map((item) => (
                  <div
                    key={item._id}
                    className="rounded-2xl border border-base-300 bg-base-100 shadow-sm overflow-hidden"
                  >
                    <div className="flex gap-4 p-4">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden border border-base-300 bg-base-200">
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-extrabold text-lg leading-tight">
                          {item.productName}
                        </h3>
                        <div className="mt-1 flex flex-wrap gap-2">
                          <span className="badge badge-outline rounded-xl">
                            {item.category}
                          </span>
                          <span className="badge badge-primary rounded-xl">
                            {Number(item.price) > 0
                              ? `$${item.price}`
                              : "Free / Adoption"}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-base-content/70">
                          Location: {item.location || "—"}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 pt-0 flex gap-2">
                      <button
                        className="btn btn-info btn-sm rounded-xl flex-1"
                        onClick={() => setSelected(item)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-error btn-sm rounded-xl flex-1"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Modal */}
        {selected && (
          <UpdateModal
            item={selected}
            close={() => setSelected(null)}
            refresh={refreshListings}
          />
        )}
      </div>
    </section>
  );
};

export default MyListings;
