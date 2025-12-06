import React, { useEffect, useState } from "react";
import UpdateModal from "../Components/UpdateModal";
import useAuth from "../Hooks/useAuth";

const MyListings = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [selected, setSelected] = useState(null);

  const refreshListings = () => {
    if (!user?.email) return;

    fetch(`http://localhost:3000/my-listings/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Refreshed listings:", data);
        setListings(data);
      });
  };

  useEffect(() => {
    refreshListings();
  }, [user]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    fetch(`http://localhost:3000/services/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        refreshListings();
      });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Listings</h1>

      <table className="table w-full border">
        <thead>
          <tr className="bg-gray-200 dark:bg-white-10">
            <th>Image</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Location</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {listings.map((item) => (
            <tr key={item._id}>
              <td>
                <img src={item.image} className="w-16 rounded" />
              </td>
              <td>{item.productName}</td>
              <td>{item.category}</td>
              <td>${item.price}</td>
              <td>{item.location}</td>

              <td>
                <button
                  className="btn btn-sm btn-info"
                  onClick={() => setSelected(item)}
                >
                  Update
                </button>
              </td>

              <td>
                <button
                  className="btn btn-sm btn-error"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <UpdateModal
          item={selected}
          close={() => setSelected(null)}
          refresh={refreshListings}
        />
      )}
    </div>
  );
};

export default MyListings;
