import React, { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = () => {
    if (!user?.email) return;

    fetch(`http://localhost:3000/my-orders/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">My Orders</h1>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <tbody>
              {[1, 2, 3].map((i) => (
                <tr key={i}>
                  <td><div className="skeleton h-6 w-32"></div></td>
                  <td><div className="skeleton h-6 w-20"></div></td>
                  <td><div className="skeleton h-6 w-16"></div></td>
                  <td><div className="skeleton h-6 w-12"></div></td>
                  <td><div className="skeleton h-6 w-32"></div></td>
                  <td><div className="skeleton h-6 w-24"></div></td>
                  <td><div className="skeleton h-6 w-20"></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <>
          <table className="table w-full border">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Buyer Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.productName}</td>
                  <td>{order.buyerName}</td>
                  <td>${order.price}</td>
                  <td>{order.quantity}</td>
                  <td>{order.address}</td>
                  <td>{order.phone}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}

              {orders.length === 0 && (
                <tr>
                  <td colSpan="7" className="py-4 text-center">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default MyOrders;
