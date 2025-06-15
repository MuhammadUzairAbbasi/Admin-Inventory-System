// Coming up next:

import { useEffect, useState } from "react";
import { useProductStore } from "../../store/useProductStore";
import Loader from "../..//components/Loader";
import { Pencil, Trash2, Plus } from "lucide-react";
import ProductFormModal from "../../components/ProductFormModal";
import ConfirmModal from "../../components/ConfirmationModal";

const ProductPage = () => {
  const {
    products,
    fetchProducts,
    paginatedProducts,
    currentPage,
    setPage,
    pageSize,
    deleteProduct,
    searchProducts,
  } = useProductStore();

  const [search, setSearch] = useState("");
  const [showFormModal, setShowFormModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) searchProducts(search);
    else fetchProducts();
  };

  const totalPages = Math.ceil(products.length / pageSize);

  return (
    <div className="fade-in">
      {/* Header */}
      <div className="bg-blue-100 px-4 py-6 rounded-lg mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-blue-800">
            Product Management
          </h1>
          <p className="text-sm text-blue-600">
            Manage your inventory efficiently
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search by title..."
              className="px-3 py-2 border rounded-md text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="submit"
              className="text-sm bg-blue-600 text-white px-3 py-2 rounded-md"
            >
              Search
            </button>
          </form>
          <button
            onClick={() => {
              setEditProduct(null);
              setShowFormModal(true);
            }}
            className="bg-green-600 text-white px-4 py-2 text-sm rounded-md hover:bg-green-700"
          >
            <Plus size={16} className="inline mr-1" /> Add Product
          </button>
        </div>
      </div>

      {/* Table */}
      {products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-sm border rounded-lg">
            <thead className="bg-gray-100 text-gray-700 text-sm font-semibold">
              <tr>
                <th className="px-4 py-3 text-left">Image</th>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Stock</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts().map((product) => (
                <tr
                  key={product._id}
                  className="border-b last:border-none hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-12 w-12 object-cover rounded-md border"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">
                    {product.title}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {product.category}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    ${product.price}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {product.stock}
                  </td>
                  <td className="px-4 py-3 text-right flex justify-end gap-3">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => {
                        setEditProduct(product);
                        setShowFormModal(true);
                      }}
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => setConfirmDeleteId(product._id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded-md text-sm ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Modals */}
      {showFormModal && (
        <ProductFormModal
          isOpen={showFormModal}
          onClose={() => setShowFormModal(false)}
          product={editProduct}
        />
      )}

      {confirmDeleteId && (
        <ConfirmModal
          message="Are you sure you want to delete this product?"
          onConfirm={() => {
            deleteProduct(confirmDeleteId);
            setConfirmDeleteId(null);
          }}
          onCancel={() => setConfirmDeleteId(null)}
        />
      )}
    </div>
  );
};

export default ProductPage;
