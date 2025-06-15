import { useEffect } from "react";
import { useDashboardStore } from "../../store/useDashboardStore";
import Loader from "../../components/Loader";
import StatCard from "../../components/statCard";
import { Package, ClipboardList, Clock } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const DashboardPage = () => {
  const { stats, fetchStats, loading } = useDashboardStore();

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  if (loading || !stats)
    return <Loader fullScreen label="Loading dashboard..." />;

  const cards = [
    {
      label: "Total Products",
      value: stats.totalProducts,
      icon: Package,
      color: "blue",
    },
    {
      label: "Total Orders",
      value: stats.totalOrders,
      icon: ClipboardList,
      color: "green",
    },
    {
      label: "Pending Orders",
      value: stats.pendingOrders,
      icon: Clock,
      color: "amber",
    },
  ];

  const chartData = [
    {
      name: "Products",
      value: stats.totalProducts,
    },
    {
      name: "Orders",
      value: stats.totalOrders,
    },
    {
      name: "Pending",
      value: stats.pendingOrders,
    },
  ];

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 animate-fade-in">
        Welcome Admin 👋
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {cards.map((card) => (
          <StatCard
            key={card.label}
            label={card.label}
            value={card.value}
            Icon={card.icon}
            color={card.color}
          />
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardPage;
