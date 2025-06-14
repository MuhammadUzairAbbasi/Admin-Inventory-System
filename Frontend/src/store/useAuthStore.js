import { create } from "zustand";
import { toast } from "react-toastify";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
  // Auth State
  isLoggingIn: false,
  isLoggedIn: !!localStorage.getItem("token"),
  authUser: null,
  token: localStorage.getItem("token") || null,

  // Login Function
  login: async (credentials) => {
    set({ isLoggingIn: true });

    try {
      const res = await axiosInstance.post("/auth/login", credentials);
      const { token, email } = res.data;

      // Save token in localStorage
      localStorage.setItem("token", token);

      set({
        authUser: { email },
        token,
        isLoggedIn: true,
      });

      toast.success("Login successful!");
    } catch (error) {
      const message =
        error?.response?.data?.message || "Login failed. Try again.";
      toast.error(message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  // Logout Function
  logout: async () => {
    try {
      // Optionally: hit backend logout route
      await axiosInstance.post("/auth/logout");

      // Clear everything
      localStorage.removeItem("token");

      set({
        authUser: null,
        token: null,
        isLoggedIn: false,
      });

      toast.success("Logged out successfully!");
    } catch (error) {
      const message =
        error?.response?.data?.message || "Logout failed. Try again.";
      toast.error(message);
    }
  },
}));
