import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

const AdminOverview = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({
    totalUsers: 0,
    totalListings: 0,
    totalOrders: 0,
    totalRevenue: 0,
    ordersTrend: [],
    categoryCounts: [],
    recentOrders: [],
  });

  useEffect(() => {
    if (!user?.email) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    fetch(`https://scicbackend.vercel.app/admin/summary?email=${user.email}`)
      .then((res) => res.json())
      .then((d) => {
        setSummary({
          totalUsers: d?.totalUsers || 0,
          totalListings: d?.totalListings || 0,
          totalOrders: d?.totalOrders || 0,
          totalRevenue: d?.totalRevenue || 0,
          ordersTrend: Array.isArray(d?.ordersTrend) ? d.ordersTrend : [],
          categoryCounts: Array.isArray(d?.categoryCounts) ? d.categoryCounts : [],
          recentOrders: Array.isArray(d?.recentOrders) ? d.recentOrders : [],
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user?.email]);

  if (loading) {
    return (
      <div className="min-h-[50vh] grid place-items-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold">Admin Overview</h1>
        <p className="text-base-content/70 mt-1">Platform summary & trends.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <Stat title="Total Users" value={summary.totalUsers} />
        <Stat title="Total Listings" value={summary.totalListings} />
        <Stat title="Total Orders" value={summary.totalOrders} />
        <Stat title="Revenue" value={`$${summary.totalRevenue}`} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card title="Orders Trend">
          {summary.ordersTrend.length === 0 ? (
            <EmptyText text="No trend data." />
          ) : (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={summary.ordersTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="orders"
                    stroke="#2563eb"
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>

        <Card title="Listings by Category">
          {summary.categoryCounts.length === 0 ? (
            <EmptyText text="No category data." />
          ) : (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={summary.categoryCounts}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#22c55e" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>
      </div>

      <Card title="Recent Orders">
        {summary.recentOrders.length === 0 ? (
          <EmptyText text="No recent orders found." />
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="bg-base-200">
                  <th>Product</th>
                  <th>Buyer</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {summary.recentOrders.map((o) => (
                  <tr key={o._id} className="hover">
                    <td className="font-semibold">{o.productName || "—"}</td>
                    <td>{o.buyerEmail || o.buyerName || "—"}</td>
                    <td>{o.price ? `$${o.price}` : "—"}</td>
                    <td>{o.quantity ?? "—"}</td>
                    <td>{o.date ? new Date(o.date).toLocaleDateString() : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

const Card = ({ title, children }) => (
  <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
    <h3 className="font-extrabold mb-3">{title}</h3>
    {children}
  </div>
);

const Stat = ({ title, value }) => (
  <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
    <p className="text-sm text-base-content/60 font-semibold">{title}</p>
    <p className="text-2xl font-extrabold mt-2">{value}</p>
  </div>
);

const EmptyText = ({ text }) => (
  <p className="text-sm text-base-content/70">{text}</p>
);

export default AdminOverview;
