import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const refresh = () => {
    if (!user?.email) return;

    setLoading(true);
    fetch(`https://scicbackend.vercel.app/admin/users?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        const arr = Array.isArray(data) ? data : [];
        setUsers(arr);
        setFiltered(arr);
      })
      .catch(() => {
        setUsers([]);
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
      setFiltered(users);
      return;
    }

    setFiltered(
      users.filter((u) => {
        const name = (u?.name || u?.displayName || "").toLowerCase();
        const email = (u?.email || "").toLowerCase();
        const role = (u?.role || "user").toLowerCase();
        return name.includes(term) || email.includes(term) || role.includes(term);
      })
    );
  }, [search, users]);

  const updateRole = (id, newRole) => {
    Swal.fire({
      title: `Make ${newRole}?`,
      text: "This will update user role instantly.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, update",
    }).then((result) => {
      if (!result.isConfirmed) return;

      fetch(`https://scicbackend.vercel.app/admin/users/${id}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole, adminEmail: user.email }),
      })
        .then((res) => res.json())
        .then(() => {
          Swal.fire("Updated!", "User role updated.", "success");
          refresh();
        })
        .catch(() => Swal.fire("Error!", "Role update failed.", "error"));
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete user?",
      text: "This will permanently remove the user.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      confirmButtonText: "Yes, delete",
    }).then((result) => {
      if (!result.isConfirmed) return;

      fetch(`https://scicbackend.vercel.app/admin/users/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminEmail: user.email }),
      })
        .then((res) => res.json())
        .then(() => {
          Swal.fire("Deleted!", "User removed.", "success");
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
          <h1 className="text-2xl sm:text-3xl font-extrabold">Manage Users</h1>
          <p className="text-base-content/70 mt-1">
            Search users, update roles and delete users.
          </p>
          <div className="mt-3">
            <span className="badge badge-primary rounded-xl">
              {filtered.length} users
            </span>
          </div>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <input
            className="input input-bordered rounded-xl w-full sm:w-72"
            placeholder="Search by name, email, role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-outline rounded-xl" onClick={refresh}>
            Refresh
          </button>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-2xl border border-base-300 bg-base-100">
        <table className="table w-full">
          <thead>
            <tr className="bg-base-200">
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((u) => (
              <tr key={u._id} className="hover">
                <td className="font-semibold">{u.name || u.displayName || "—"}</td>
                <td>{u.email || "—"}</td>
                <td>
                  <span
                    className={`badge rounded-xl ${
                      u.role === "admin" ? "badge-success" : "badge-outline"
                    }`}
                  >
                    {u.role || "user"}
                  </span>
                </td>

                <td className="text-right">
                  <div className="inline-flex gap-2">
                    {u.role !== "admin" ? (
                      <button
                        className="btn btn-success btn-sm rounded-xl"
                        onClick={() => updateRole(u._id, "admin")}
                      >
                        Make Admin
                      </button>
                    ) : (
                      <button
                        className="btn btn-warning btn-sm rounded-xl"
                        onClick={() => updateRole(u._id, "user")}
                      >
                        Remove Admin
                      </button>
                    )}

                    <button
                      className="btn btn-error btn-sm rounded-xl"
                      onClick={() => handleDelete(u._id)}
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

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {filtered.map((u) => (
          <div
            key={u._id}
            className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-extrabold">{u.name || u.displayName || "—"}</p>
                <p className="text-sm text-base-content/70">{u.email || "—"}</p>
              </div>
              <span
                className={`badge rounded-xl ${
                  u.role === "admin" ? "badge-success" : "badge-outline"
                }`}
              >
                {u.role || "user"}
              </span>
            </div>

            <div className="mt-4 flex gap-2">
              {u.role !== "admin" ? (
                <button
                  className="btn btn-success btn-sm rounded-xl flex-1"
                  onClick={() => updateRole(u._id, "admin")}
                >
                  Make Admin
                </button>
              ) : (
                <button
                  className="btn btn-warning btn-sm rounded-xl flex-1"
                  onClick={() => updateRole(u._id, "user")}
                >
                  Remove Admin
                </button>
              )}

              <button
                className="btn btn-error btn-sm rounded-xl flex-1"
                onClick={() => handleDelete(u._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-base-300 bg-base-100 p-6 text-center">
          <h3 className="font-extrabold">No users found</h3>
          <p className="text-sm text-base-content/70 mt-1">
            Try searching with a different keyword.
          </p>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
