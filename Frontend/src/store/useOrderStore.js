import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useOrderStore = create((set, get) => ({
  orders: [],
  loading: false,
  currentPage: 1,
  pageSize: 5,

  fetchOrders: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/orders");
      set({ orders: res.data });
    } catch (err) {
      console.error("Fetch orders error:", err);
    } finally {
      set({ loading: false });
    }
  },

  setPage: (page) => set({ currentPage: page }),

  paginatedOrders: () => {
    const { orders, currentPage, pageSize } = get();
    const start = (currentPage - 1) * pageSize;
    return orders.slice(start, start + pageSize);
  },

  updateOrderStatus: async (id) => {
    try {
      const res = await axiosInstance.put(`/orders/${id}/status`);
      set((state) => ({
        orders: state.orders.map((o) => (o._id === id ? res.data.order : o)),
      }));
    } catch (err) {
      console.error("Update order status error:", err);
    }
  },
}));
