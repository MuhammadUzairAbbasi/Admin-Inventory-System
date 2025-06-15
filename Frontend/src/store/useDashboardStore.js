import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useDashboardStore = create((set) => ({
  stats: null,
  loading: false,

  fetchStats: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/dashboard/stats");
      set({ stats: res.data });
    } catch (err) {
      console.error("Fetch dashboard stats error:", err);
    } finally {
      set({ loading: false });
    }
  },
}));
