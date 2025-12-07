import React, { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import { jsPDF } from "jspdf";
import { applyPlugin } from "jspdf-autotable";
import { FaFileDownload } from "react-icons/fa";

applyPlugin(jsPDF);

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshOrders = () => {
    if (!user?.email) return;

    fetch(`https://scicbackend.vercel.app/my-orders/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    refreshOrders();
  }, [user]);

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("My Orders Report", 10, 15);

    const rows = orders.map((o) => [
      o.productName || "—",
      o.buyerName || "—",
      o.price ? `$${o.price}` : "—",
      o.quantity ?? "—",
      o.address || "—",
      o.phone || "—",
      o.date ? new Date(o.date).toLocaleDateString() : "—",
    ]);

    console.log("autoTable check:", typeof doc.autoTable);
    console.log("rows:", rows);

    doc.autoTable({
      startY: 25,
      head: [["Product", "Buyer", "Price", "Qty", "Address", "Phone", "Date"]],
      body: rows,
      theme: "grid",
    });

    doc.save("MyOrdersReport.pdf");
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Orders</h1>

        <button
          onClick={downloadPDF}
          className="btn btn-primary px-4 py-2 rounded-md shadow-md"
        >
          <FaFileDownload></FaFileDownload>Download Report
        </button>
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <tbody>
              {[1, 2, 3].map((i) => (
                <tr key={i}>
                  <td>
                    <div className="skeleton h-6 w-32"></div>
                  </td>
                  <td>
                    <div className="skeleton h-6 w-20"></div>
                  </td>
                  <td>
                    <div className="skeleton h-6 w-16"></div>
                  </td>
                  <td>
                    <div className="skeleton h-6 w-12"></div>
                  </td>
                  <td>
                    <div className="skeleton h-6 w-32"></div>
                  </td>
                  <td>
                    <div className="skeleton h-6 w-24"></div>
                  </td>
                  <td>
                    <div className="skeleton h-6 w-20"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <>
          <table className="table w-full border">
            <thead>
              <tr className="bg-gray-200 dark:bg-white-10">
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
                  <td>
                    {order.date
                      ? new Date(order.date).toLocaleDateString()
                      : "No Date Selected"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default MyOrders;
