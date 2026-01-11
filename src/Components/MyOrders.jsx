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

    setLoading(true);
    fetch(`https://scicbackend.vercel.app/my-orders/${user.email}`)
      .then((res) => res.json())
      .then((data) => setOrders(Array.isArray(data) ? data : []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!user?.email) return;
    refreshOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email]);

  const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString() : "—";

  const money = (v) =>
    v === 0 ? "Free" : v ? `$${v}` : "—";

  const downloadPDF = () => {
    if (!orders.length) return;

    const doc = new jsPDF();

    // Header
    doc.setFontSize(18);
    doc.text("My Orders Report", 14, 16);

    doc.setFontSize(11);
    doc.text(`Buyer: ${user?.email || "—"}`, 14, 23);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 29);

    const rows = orders.map((o) => [
      o.productName || "—",
      o.buyerName || "—",
      money(o.price),
      o.quantity ?? "—",
      o.address || "—",
      o.phone || "—",
      formatDate(o.date),
    ]);

    doc.autoTable({
      startY: 35,
      head: [["Product", "Buyer", "Price", "Qty", "Address", "Phone", "Date"]],
      body: rows,
      theme: "grid",
      styles: { fontSize: 9, cellPadding: 2 },
      headStyles: { fillColor: [30, 41, 59] }, // subtle dark header
      columnStyles: {
        0: { cellWidth: 30 },
        1: { cellWidth: 24 },
        2: { cellWidth: 18 },
        3: { cellWidth: 12 },
        4: { cellWidth: 40 },
        5: { cellWidth: 25 },
        6: { cellWidth: 18 },
      },
    });

    doc.save("MyOrdersReport.pdf");
  };

  return (
    <section className="min-h-[70vh] bg-base-200">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              My Orders
            </h1>
            <p className="text-base-content/70 mt-2">
              View your order history and download a PDF report anytime.
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="badge badge-primary rounded-xl">
                {loading ? "Loading..." : `${orders.length} order(s)`}
              </span>
              {user?.email && (
                <span className="badge badge-outline rounded-xl">
                  {user.email}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={refreshOrders}
              className="btn btn-outline rounded-xl"
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

            <button
              type="button"
              onClick={downloadPDF}
              className="btn btn-primary rounded-xl"
              disabled={loading || orders.length === 0}
              title={orders.length === 0 ? "No orders to export" : "Download PDF"}
            >
              <FaFileDownload className="mr-2" />
              Download Report
            </button>
          </div>
        </div>

        <div className="divider my-8" />

        {/* Card */}
        <div className="bg-base-100 border border-base-300 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-base-300 flex items-center justify-between">
            <h2 className="text-lg font-extrabold">Orders Table</h2>
            <span className="text-sm text-base-content/60">
              Keep your receipts organized
            </span>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-base-300 bg-base-100 p-4"
                  >
                    <div className="space-y-2">
                      <div className="skeleton h-4 w-2/3"></div>
                      <div className="skeleton h-4 w-1/2"></div>
                      <div className="skeleton h-4 w-1/3"></div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div className="skeleton h-9 w-full rounded-xl"></div>
                      <div className="skeleton h-9 w-full rounded-xl"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : orders.length === 0 ? (
            <div className="p-8 text-center">
              <h3 className="text-lg font-bold">No orders found</h3>
              <p className="text-base-content/70 mt-2">
                When you place an order, it will appear here.
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr className="bg-base-200 text-base-content">
                      <th>Product</th>
                      <th>Buyer</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Address</th>
                      <th>Phone</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr key={o._id} className="hover">
                        <td className="font-semibold">{o.productName || "—"}</td>
                        <td>{o.buyerName || "—"}</td>
                        <td className="font-semibold">{money(o.price)}</td>
                        <td>{o.quantity ?? "—"}</td>
                        <td className="max-w-[240px] truncate" title={o.address}>
                          {o.address || "—"}
                        </td>
                        <td>{o.phone || "—"}</td>
                        <td>{formatDate(o.date)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden p-4 space-y-4">
                {orders.map((o) => (
                  <div
                    key={o._id}
                    className="rounded-2xl border border-base-300 bg-base-100 shadow-sm overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-extrabold leading-tight">
                            {o.productName || "—"}
                          </h3>
                          <p className="text-sm text-base-content/70 mt-1">
                            Buyer: {o.buyerName || "—"}
                          </p>
                        </div>
                        <span className="badge badge-primary rounded-xl">
                          {money(o.price)}
                        </span>
                      </div>

                      <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                        <div className="rounded-xl bg-base-200 p-3">
                          <p className="text-xs text-base-content/60 font-semibold">
                            Quantity
                          </p>
                          <p className="font-bold">{o.quantity ?? "—"}</p>
                        </div>

                        <div className="rounded-xl bg-base-200 p-3">
                          <p className="text-xs text-base-content/60 font-semibold">
                            Date
                          </p>
                          <p className="font-bold">{formatDate(o.date)}</p>
                        </div>
                      </div>

                      <div className="mt-3 rounded-xl bg-base-200 p-3 text-sm">
                        <p className="text-xs text-base-content/60 font-semibold">
                          Address
                        </p>
                        <p className="text-base-content/80">
                          {o.address || "—"}
                        </p>
                      </div>

                      <div className="mt-3 rounded-xl bg-base-200 p-3 text-sm">
                        <p className="text-xs text-base-content/60 font-semibold">
                          Phone
                        </p>
                        <p className="font-bold">{o.phone || "—"}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default MyOrders;
