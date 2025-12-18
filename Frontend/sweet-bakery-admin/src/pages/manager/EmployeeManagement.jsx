import { useState } from "react";
import { Plus } from "lucide-react";
import ManagerHeader from "./components/ManagerHeader.jsx";
import ManagerSidebar from "./components/ManagerSidebar.jsx";
import ManagerFooter from "./components/ManagerFooter.jsx";
import AddEmployeeModal from "./components/AddEmployeeModal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import DeleteSuccess from "./components/DeleteSuccess.jsx";

const mockEmployees = Array(15).fill(null).map((_, i) => ({
  id: `#OR00${i + 1}`,
  fullName: "Nguyen Van A",
  empId: "001",
  email: "0912345678",
  phone: "12:30 12/10/25",
  salary: "150,000 đ",
  status: "confirmed",
}));

const EmployeeManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [employees, setEmployees] = useState(mockEmployees);

  const handleRowClick = (emp) => {
    setSelectedEmployee({
      fullName: emp.fullName,
      phoneNumber: "0912345678",
      email: "sample@gmail.com",
      startDate: "12/10/2025",
      loginEmail: "sample@gmail.com",
      password: "password",
      id: emp.empId,
      role: "Seller",
      status: "working / stopped working",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    });
    setShowViewModal(true);
  };

  const handleSaveEmployee = (data) => {
    console.log("Saving employee:", data);
    setShowAddModal(false);
  };

  const handleDeleteEmployee = () => {
    setShowViewModal(false);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setShowDeleteConfirm(false);
    setShowDeleteSuccess(true);
    setEmployees((prev) => prev.slice(0, -1));
  };

  if (showAddModal) {
    return (
      <AddEmployeeModal
        onSave={handleSaveEmployee}
        onCancel={() => setShowAddModal(false)}
      />
    );
  }

  if (showViewModal && selectedEmployee) {
    return (
      <AddEmployeeModal
        onSave={() => {}}
        onCancel={() => setShowViewModal(false)}
        initialData={selectedEmployee}
        viewMode
        onDelete={handleDeleteEmployee}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ManagerSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <ManagerHeader onMenuClick={() => setSidebarOpen(true)} />

      <main className="flex-1 p-8">
        {/* Header */}
        <h1 className="text-4xl font-bold text-primary uppercase mb-2">
          Human Resource
        </h1>
        <h1 className="text-4xl font-bold text-primary uppercase mb-4">
          Management
        </h1>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold text-secondary">List of Employee</h2>
            <div className="h-0.5 bg-secondary w-full mt-1" />
          </div>
          <button onClick={() => setShowAddModal(true)} className="btn-add">
            ADD NEW EMPLOYEE <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Table */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="py-3 px-4 text-left text-sm font-medium">Full name</th>
                <th className="py-3 px-4 text-left text-sm font-medium">ID</th>
                <th className="py-3 px-4 text-left text-sm font-medium">Email</th>
                <th className="py-3 px-4 text-left text-sm font-medium">Phone number</th>
                <th className="py-3 px-4 text-left text-sm font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, index) => (
                <tr
                  key={index}
                  onClick={() => handleRowClick(emp)}
                  className="border-b border-border last:border-b-0 hover:bg-muted/30 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-4 text-sm">{emp.fullName}</td>
                  <td className="py-3 px-4 text-sm">{emp.empId}</td>
                  <td className="py-3 px-4 text-sm">{emp.email}</td>
                  <td className="py-3 px-4 text-sm">{emp.phone}</td>
                  <td className="py-3 px-4 text-sm">{emp.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <ManagerFooter />

      {showDeleteConfirm && (
        <DeleteConfirmation
          type="employee"
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}

      {showDeleteSuccess && (
        <DeleteSuccess
          type="employee"
          onClose={() => setShowDeleteSuccess(false)}
        />
      )}
    </div>
  );
};

export default EmployeeManagement;
