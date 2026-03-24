import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const ManageListings = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const [listings, setListings] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const refresh = () => {
    if (!user?.email) return;

    setLoading(true);
    fetch(`https://scicbackend.vercel.app/admin/listings?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        const arr = Array.isArray(data) ? data : [];
        setListings(arr);
        setFiltered(arr);
      })
      .catch(() => {
        setListings([]);
        setFiltered([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email]);

  useEffect(() => {
    const term = search.trim().toLowerCase();
    if (!term) {
      setFiltered(listings);
      return;
    }

    setFiltered(
      listings.filter((l) => {
        const name = (l?.productName || "").toLowerCase();
        const cat = (l?.category || "").toLowerCase();
        const loc = (l?.location || "").toLowerCase();
        const owner = (l?.email || l?.ownerEmail || "").toLowerCase();
        return (
          name.includes(term) ||
          cat.includes(term) ||
          loc.includes(term) ||
          owner.includes(term)
        );
      })
    );
  }, [search, listings]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete this listing?",
      text: "This will permanently remove the listing.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      confirmButtonText: "Yes, delete",
    }).then((result) => {
      if (!result.isConfirmed) return;

      fetch(`https://scicbackend.vercel.app/admin/listings/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminEmail: user.email }),
      })
        .then((res) => res.json())
        .then(() => {
          Swal.fire("Deleted!", "Listing removed.", "success");
          refresh();
        })
        .catch(() => Swal.fire("Error!", "Delete failed.", "error"));
    });
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] grid place-items-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">Manage Listings</h1>
          <p className="text-base-content/70 mt-1">
            Search & delete listings posted by users.
          </p>
          <div className="mt-3">
            <span className="badge badge-primary rounded-xl">
              {filtered.length} listings
            </span>
          </div>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <input
            className="input input-bordered rounded-xl w-full sm:w-72"
            placeholder="Search name, category, location, owner..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-outline rounded-xl" onClick={refresh}>
            Refresh
          </button>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto rounded-2xl border border-base-300 bg-base-100">
        <table className="table w-full">
          <thead>
            <tr className="bg-base-200">
              <th>Item</th>
              <th>Category</th>
              <th>Price</th>
              <th>Location</th>
              <th>Owner</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((l) => (
              <tr key={l._id} className="hover">
                <td>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-base-300 bg-base-200">
                      <img
                        src={l.image}
                        alt={l.productName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-extrabold">{l.productName || "—"}</p>
                      <p className="text-xs text-base-content/60">
                        ID: {l._id?.slice?.(0, 8)}...
                      </p>
                    </div>
                  </div>
                </td>

                <td>
                  <span className="badge badge-outline rounded-xl">
                    {l.category || "—"}
                  </span>
                </td>

                <td className="font-semibold">
                  {Number(l.price) > 0 ? `$${l.price}` : "Free / Adoption"}
                </td>

                <td>{l.location || "—"}</td>

                <td className="max-w-[220px] truncate" title={l.email || l.ownerEmail}>
                  {l.email || l.ownerEmail || "—"}
                </td>

                <td className="text-right">
                  <button
                    className="btn btn-error btn-sm rounded-xl"
                    onClick={() => handleDelete(l._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {filtered.map((l) => (
          <div
            key={l._id}
            className="rounded-2xl border border-base-300 bg-base-100 shadow-sm overflow-hidden"
          >
            <div className="flex gap-4 p-4">
              <div className="w-20 h-20 rounded-2xl overflow-hidden border border-base-300 bg-base-200">
                <img
                  src={l.image}
                  alt={l.productName}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-extrabold text-lg leading-tight">
                  {l.productName || "—"}
                </h3>

                <div className="mt-1 flex flex-wrap gap-2">
                  <span className="badge badge-outline rounded-xl">
                    {l.category || "—"}
                  </span>
                  <span className="badge badge-primary rounded-xl">
                    {Number(l.price) > 0 ? `$${l.price}` : "Free / Adoption"}
                  </span>
                </div>

                <p className="mt-2 text-sm text-base-content/70">
                  Location: {l.location || "—"}
                </p>

                <p className="mt-1 text-xs text-base-content/60 truncate">
                  Owner: {l.email || l.ownerEmail || "—"}
                </p>
              </div>
            </div>

            <div className="p-4 pt-0">
              <button
                className="btn btn-error btn-sm rounded-xl w-full"
                onClick={() => handleDelete(l._id)}
              >
                Delete Listing
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-base-300 bg-base-100 p-6 text-center">
          <h3 className="font-extrabold">No listings found</h3>
          <p className="text-sm text-base-content/70 mt-1">
            Try a different search term.
          </p>
        </div>
      )}
    </div>
  );
};

export default ManageListings;
