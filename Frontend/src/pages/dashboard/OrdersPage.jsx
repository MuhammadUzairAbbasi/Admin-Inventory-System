import { useEffect } from "react";
import { useOrderStore } from "../../store/useOrderStore";
import Loader from "../../components/Loader";
import { Truck, PackageCheck } from "lucide-react";
import Papa from "papaparse";
import { saveAs } from "file-saver";

const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-700",
  Shipped: "bg-blue-100 text-blue-700",
  Delivered: "bg-green-100 text-green-700",
};

const statusButtonLabel = {
  Pending: { text: "Mark as Shipped", icon: <Truck size={16} /> },
  Shipped: { text: "Mark as Delivered", icon: <PackageCheck size={16} /> },
};

export default function OrderPage() {
  const {
    orders,
    fetchOrders,
    paginatedOrders,
    currentPage,
    setPage,
    updateOrderStatus,
    loading,
    pageSize,
  } = useOrderStore();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const exportToCSV = () => {
    const data = orders.map((order) => ({
      id: order._id,
      status: order.status,
      totalItems: order.items.reduce((acc, cur) => acc + cur.quantity, 0),
      createdAt: new Date(order.createdAt).toLocaleString(),
    }));

    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "orders.csv");
  };

  if (loading) return <Loader fullScreen label="Loading orders..." />;

  const totalPages = Math.ceil(orders.length / pageSize);

  return (
    <div className="fade-in">
      {/* Header + Export */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Order Management</h1>
        {orders.length > 0 && (
          <button
            onClick={exportToCSV}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm rounded-md transition"
          >
            Export Orders to CSV
          </button>
        )}
      </div>

      {/* Order Cards */}
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6">
            {paginatedOrders().map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border p-6 space-y-4"
              >
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-400">
                      Order ID:
                      <span className="ml-1 font-mono break-all text-gray-600">
                        {order._id}
                      </span>
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 font-medium">
                        Status:
                      </span>
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          statusStyles[order.status]
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Update Status Button */}
                  {order.status !== "Delivered" && (
                    <button
                      onClick={() => updateOrderStatus(order._id)}
                      className="mt-4 sm:mt-0 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm rounded-md transition"
                    >
                      {statusButtonLabel[order.status]?.icon}
                      {statusButtonLabel[order.status]?.text}
                    </button>
                  )}
                </div>

                {/* Items */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">
                    Ordered Items
                  </h3>
                  <ul className="space-y-1 text-sm text-gray-600 list-inside list-disc">
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.productId?.title || "Unknown Product"} ×{" "}
                        {item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setPage(page)}
                  className={`px-3 py-1 rounded-md text-sm ${
                    currentPage === page
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
