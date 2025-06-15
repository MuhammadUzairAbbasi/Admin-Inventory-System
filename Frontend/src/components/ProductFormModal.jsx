import { useEffect, useState } from "react";
import { useProductStore } from "../store/useProductStore";
import { Dialog } from "./ui/Dialog";

export default function ProductFormModal({ isOpen, onClose, product }) {
  const isEdit = Boolean(product);
  const { addProduct, updateProduct } = useProductStore();

  const [form, setForm] = useState({
    title: "",
    category: "",
    price: "",
    stock: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (product) {
      setForm({
        title: product.title,
        category: product.category,
        price: product.price,
        stock: product.stock,
        image: null,
      });
      setPreview(product.image);
    } else {
      setForm({ title: "", category: "", price: "", stock: "", image: null });
      setPreview(null);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const val = files ? files[0] : value;
    setForm((prev) => ({ ...prev, [name]: val }));

    if (files) {
      const fileURL = URL.createObjectURL(files[0]);
      setPreview(fileURL);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (val) formData.append(key, val);
    });

    if (isEdit) await updateProduct(product._id, formData);
    else await addProduct(formData);
    onClose();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Edit Product" : "Add New Product"}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="Enter product title"
            className="w-full px-4 py-2 rounded-md border focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            placeholder="Product category"
            className="w-full px-4 py-2 rounded-md border focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Price & Stock */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price ($)
            </label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              required
              placeholder="0.00"
              className="w-full px-4 py-2 rounded-md border focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stock
            </label>
            <input
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              required
              placeholder="e.g., 100"
              className="w-full px-4 py-2 rounded-md border focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image
          </label>
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="h-24 w-24 mt-3 rounded-md border object-cover"
            />
          )}
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm transition"
          >
            {isEdit ? "Update Product" : "Add Product"}
          </button>
        </div>
      </form>
    </Dialog>
  );
}
