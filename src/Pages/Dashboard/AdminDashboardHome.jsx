import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const AdminDashboardHome = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const [timeRange, setTimeRange] = useState("30d");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const [payload, setPayload] = useState({
    stats: {},
    ordersTrend: [],
    revenueTrend: [],
    categoryCounts: [],
    recentOrders: [],
    categories: [],
    topCategory: null,
    avgOrderValue: 0,
    newUsers: 0,
    canceledOrders: 0,
  });

  const PIE_COLORS = ["#2563eb", "#22c55e", "#f59e0b", "#ef4444", "#a855f7"];

  const fetchData = () => {
    if (!user?.email) return;

    setLoading(true);
    fetch(
      `https://scicbackend.vercel.app/admin/dashboard?email=${encodeURIComponent(
        user.email
      )}&range=${encodeURIComponent(timeRange)}&category=${encodeURIComponent(
        category
      )}`
    )
      .then((res) => res.json())
      .then((d) => {
        setPayload({
          stats: d?.stats || {},
          ordersTrend: Array.isArray(d?.ordersTrend) ? d.ordersTrend : [],
          revenueTrend: Array.isArray(d?.revenueTrend) ? d.revenueTrend : [],
          categoryCounts: Array.isArray(d?.categoryCounts) ? d.categoryCounts : [],
          recentOrders: Array.isArray(d?.recentOrders) ? d.recentOrders : [],
          categories: Array.isArray(d?.categories) ? d.categories : [],
          topCategory: d?.topCategory || null,
          avgOrderValue: d?.avgOrderValue || 0,
          newUsers: d?.newUsers || 0,
          canceledOrders: d?.canceledOrders || 0,
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email, timeRange, category]);

  const term = search.trim().toLowerCase();
  const tableRows = term
    ? payload.recentOrders.filter((o) => {
        const p = (o?.productName || "").toLowerCase();
        const e = (o?.buyerEmail || o?.buyerName || "").toLowerCase();
        const c = (o?.category || "").toLowerCase();
        return p.includes(term) || e.includes(term) || c.includes(term);
      })
    : payload.recentOrders;

  if (loading) {
    return (
      <div className="min-h-[50vh] grid place-items-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">Admin Dashboard</h1>
          <p className="text-base-content/70 mt-1">
            Filters + charts + real backend table.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <select
            className="select select-bordered rounded-xl w-full sm:w-44"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>

          <select
            className="select select-bordered rounded-xl w-full sm:w-56"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            {payload.categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <button className="btn btn-outline rounded-xl" onClick={fetchData}>
            Refresh
          </button>
        </div>
      </div>

      <div className="divider" />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <Stat title="Total Users" value={payload.stats.totalUsers ?? 0} />
        <Stat title="Total Listings" value={payload.stats.totalListings ?? 0} />
        <Stat title="Total Orders" value={payload.stats.totalOrders ?? 0} />
        <Stat title="Revenue" value={`$${payload.stats.totalRevenue ?? 0}`} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card title="Orders Trend">
          {payload.ordersTrend.length === 0 ? (
            <EmptyText text="No orders trend data." />
          ) : (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={payload.ordersTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="orders" fill="#2563eb" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>

        <Card title="Revenue Trend">
          {payload.revenueTrend.length === 0 ? (
            <EmptyText text="No revenue trend data." />
          ) : (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={payload.revenueTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#22c55e"
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card title="Listings by Category">
          {payload.categoryCounts.length === 0 ? (
            <EmptyText text="No category data found." />
          ) : (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={payload.categoryCounts}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={110}
                    paddingAngle={3}
                  >
                    {payload.categoryCounts.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>

        <Card title="Quick Insights">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Insight
              label="Top Category"
              value={payload.topCategory?.name || "—"}
              sub={`${payload.topCategory?.value ?? 0} listings`}
            />
            <Insight
              label="Avg Order Value"
              value={`$${payload.avgOrderValue || 0}`}
              sub="Based on range"
            />
            <Insight label="New Users" value={payload.newUsers || 0} sub="In range" />
            <Insight
              label="Canceled Orders"
              value={payload.canceledOrders || 0}
              sub="Needs review"
            />
          </div>
        </Card>
      </div>

      {/* Table */}
      <Card title="Recent Orders (Search)">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-3">
          <p className="text-sm text-base-content/70">
            Search by product, buyer, category.
          </p>
          <input
            className="input input-bordered rounded-xl w-full sm:w-80"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {tableRows.length === 0 ? (
          <EmptyText text="No matching orders found." />
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="bg-base-200">
                  <th>Product</th>
                  <th>Buyer</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((o) => (
                  <tr key={o._id} className="hover">
                    <td className="font-semibold">{o.productName || "—"}</td>
                    <td className="max-w-[220px] truncate" title={o.buyerEmail || o.buyerName}>
                      {o.buyerEmail || o.buyerName || "—"}
                    </td>
                    <td>
                      <span className="badge badge-outline rounded-xl">
                        {o.category || "—"}
                      </span>
                    </td>
                    <td className="font-semibold">{o.price ? `$${o.price}` : "—"}</td>
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

const Insight = ({ label, value, sub }) => (
  <div className="rounded-2xl border border-base-300 bg-base-200 p-4">
    <p className="text-xs text-base-content/60 font-semibold">{label}</p>
    <p className="text-lg font-extrabold mt-1">{value}</p>
    <p className="text-sm text-base-content/70 mt-1">{sub}</p>
  </div>
);

const EmptyText = ({ text }) => (
  <p className="text-sm text-base-content/70">{text}</p>
);

export default AdminDashboardHome;
