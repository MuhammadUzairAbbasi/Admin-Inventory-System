import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import { toast } from "react-toastify";

export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  pageSize: 5,
  currentPage: 1,
  selectedProduct: null,

  // Fetch all products
  fetchProducts: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/products");
      set({ products: res.data });
    } catch (err) {
      toast.error("Failed to load products");
      console.error("Fetch error:", err);
    } finally {
      set({ loading: false });
    }
  },

  // Add new product (expects FormData with image)
  addProduct: async (formData) => {
    try {
      const res = await axiosInstance.post("/products/addProduct", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      set((state) => ({
        products: [res.data, ...state.products],
      }));
      toast.success("Product added");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to add product");
    }
  },

  // Delete a product
  deleteProduct: async (id) => {
    try {
      await axiosInstance.delete(`/products/${id}`);
      set((state) => ({
        products: state.products.filter((p) => p._id !== id),
      }));
      toast.success("Product deleted");
    } catch (err) {
      toast.error("Failed to delete product");
    }
  },

  // Update product by ID (can include image or not)
  updateProduct: async (id, formData) => {
    try {
      const res = await axiosInstance.put(
        `/products/updateProduct/${id}`,
        formData
      );
      set((state) => ({
        products: state.products.map((p) => (p._id === id ? res.data : p)),
      }));
      toast.success("Product updated");
    } catch (err) {
      toast.error("Update failed");
    }
  },

  // Search by title
  searchProducts: async (title) => {
    try {
      const res = await axiosInstance.get(`/products/${title}`);
      set({ products: res.data });
    } catch (err) {
      toast.error("Search failed");
    }
  },

  // Pagination support (client-side)
  setPage: (page) => set({ currentPage: page }),
  paginatedProducts: () => {
    const { products, currentPage, pageSize } = get();
    const start = (currentPage - 1) * pageSize;
    return products.slice(start, start + pageSize);
  },
}));
