import { useState } from "react";
import { Plus } from "lucide-react";
import ManagerHeader from "../../components/admin/ManagerHeader.jsx";
import ManagerSidebar from "../../components/admin/ManagerSidebar.jsx";
import ManagerFooter from "../../components/admin/ManagerFooter.jsx";
import AddProductModal from "../../components/admin/AddProductModal.jsx";
import DeleteConfirmation from "../../components/admin/DeleteConfirmation.jsx";
import DeleteSuccess from "../../components/admin/DeleteSuccess.jsx";

const mockProducts = Array(15).fill(null).map((_, i) => ({
  sku: `#OR00${i + 1}`,
  fullName: "Nguyen Van A",
  empId: "001",
  email: "0912345678",
  phone: "12:30 12/10/25",
  price: "150,000 đ",
  status: "confirmed",
}));

const ProductManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [products, setProducts] = useState(mockProducts);

  const handleRowClick = (product) => {
    setSelectedProduct({
      productName: "Cake 01",
      price: "150,000 đ",
      category: "Birthday Cake",
      description: "Super Ngon",
      count: "1000000",
      status: "Selling",
      sku: product.sku,
      originalPrice: "80,000 đ",
    });
    setShowViewModal(true);
  };

  const handleSaveProduct = (data) => {
    console.log("Saving product:", data);
    setShowAddModal(false);
  };

  const handleDeleteProduct = () => {
    setShowViewModal(false);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setShowDeleteConfirm(false);
    setShowDeleteSuccess(true);
    setProducts((prev) => prev.slice(0, -1));
  };

  if (showAddModal) {
    return (
      <AddProductModal
        onSave={handleSaveProduct}
        onCancel={() => setShowAddModal(false)}
      />
    );
  }

  if (showViewModal && selectedProduct) {
    return (
      <AddProductModal
        onSave={() => {}}
        onCancel={() => setShowViewModal(false)}
        initialData={selectedProduct}
        viewMode
        onDelete={handleDeleteProduct}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ManagerSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <ManagerHeader onMenuClick={() => setSidebarOpen(true)} />

      <main className="flex-1 p-8">
        {/* Header */}
        <h1 className="text-4xl font-bold text-primary uppercase mb-4">
          Add New Product
        </h1>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold text-secondary">Added product history</h2>
            <div className="h-0.5 bg-secondary w-full mt-1" />
          </div>
          <button onClick={() => setShowAddModal(true)} className="btn-add">
            ADD NEW <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Table */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="py-3 px-4 text-left text-sm font-medium">Product SKU</th>
                <th className="py-3 px-4 text-left text-sm font-medium">Product name</th>
                <th className="py-3 px-4 text-left text-sm font-medium">Category</th>
                <th className="py-3 px-4 text-left text-sm font-medium">Price</th>
                <th className="py-3 px-4 text-left text-sm font-medium">Count</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr
                  key={index}
                  onClick={() => handleRowClick(product)}
                  className="border-b border-border last:border-b-0 hover:bg-muted/30 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-4 text-sm">{product.sku}</td>
                  <td className="py-3 px-4 text-sm">{product.fullName}</td>
                  <td className="py-3 px-4 text-sm">{product.email}</td>
                  <td className="py-3 px-4 text-sm">{product.price}</td>
                  <td className="py-3 px-4 text-sm">{product.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <ManagerFooter />

      {showDeleteConfirm && (
        <DeleteConfirmation
          type="product"
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}

      {showDeleteSuccess && (
        <DeleteSuccess
          type="product"
          onClose={() => setShowDeleteSuccess(false)}
        />
      )}
    </div>
  );
};

export default ProductManagement;
