import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const DashboardHome = () => {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalListings: 0,
    totalSpent: 0,
    totalAdoptions: 0,
    monthlyOrders: [],
    categoryCounts: [],
    recentOrders: [],
  });

  const PIE_COLORS = ["#2563eb", "#22c55e", "#f59e0b", "#ef4444"];

 useEffect(() => {
  if (!user?.email) {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(false);
    return;
  }

  setLoading(true);

  fetch(`https://scicbackend.vercel.app/dashboard/summary/${user.email}`)
    .then((res) => {
      if (!res.ok) throw new Error("No dashboard data");
      return res.json();
    })
    .then((data) => {
      setStats({
        totalOrders: data?.totalOrders || 0,
        totalListings: data?.totalListings || 0,
        totalSpent: data?.totalSpent || 0,
        totalAdoptions: data?.totalAdoptions || 0,
        monthlyOrders: Array.isArray(data?.monthlyOrders)
          ? data.monthlyOrders
          : [],
        categoryCounts: Array.isArray(data?.categoryCounts)
          ? data.categoryCounts
          : [],
        recentOrders: Array.isArray(data?.recentOrders)
          ? data.recentOrders
          : [],
      });
    })
    .catch(() => {
      // ✅ fallback empty dashboard (VERY IMPORTANT)
      setStats({
        totalOrders: 0,
        totalListings: 0,
        totalSpent: 0,
        totalAdoptions: 0,
        monthlyOrders: [],
        categoryCounts: [],
        recentOrders: [],
      });
    })
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
        <h1 className="text-2xl sm:text-3xl font-extrabold">Dashboard Overview</h1>
        <p className="text-base-content/70 mt-1">
          Your activity summary with charts & recent orders.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <Stat title="Total Orders" value={stats.totalOrders} />
        <Stat title="Total Listings" value={stats.totalListings} />
        <Stat title="Total Spent" value={`$${stats.totalSpent}`} />
        <Stat title="Adoptions" value={stats.totalAdoptions} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card title="Orders by Month">
          {stats.monthlyOrders.length === 0 ? (
            <EmptyText text="No monthly data found." />
          ) : (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.monthlyOrders}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="orders" fill="#2563eb" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>

        <Card title="Listings by Category">
          {stats.categoryCounts.length === 0 ? (
            <EmptyText text="No category data found." />
          ) : (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.categoryCounts}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={110}
                    paddingAngle={3}
                  >
                    {stats.categoryCounts.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>
      </div>

      {/* Recent Orders */}
      <Card title="Recent Orders">
        {stats.recentOrders.length === 0 ? (
          <EmptyText text="No recent orders found." />
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="bg-base-200">
                  <th>Product</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map((o) => (
                  <tr key={o._id} className="hover">
                    <td className="font-semibold">{o.productName || "—"}</td>
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
    <div className="mt-3 h-1 w-full bg-base-200 rounded-full overflow-hidden">
      <div className="h-full w-2/3 bg-primary/70" />
    </div>
  </div>
);

const EmptyText = ({ text }) => (
  <p className="text-sm text-base-content/70">{text}</p>
);

export default DashboardHome;
