import { useState } from "react";
import { Plus } from "lucide-react";
// Đảm bảo import đúng đường dẫn các component chung
import ManagerHeader from "./components/ManagerHeader.jsx";
import ManagerSidebar from "./components/ManagerSidebar.jsx";
import ManagerFooter from "./components/ManagerFooter.jsx";
import AddEmployeeModal from "./components/AddEmployeeModal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import DeleteSuccess from "./components/DeleteSuccess.jsx";

// 1. DATA: Bổ sung Address, DOB, Gender
const mockEmployees = Array(15).fill(null).map((_, i) => ({
  id: i,
  empId: `00${i + 1}`,
  fullName: "Nguyen Van A",
  email: "sample@gmail.com",
  phone: "0912345678",
  address: "1 Dai Co Viet, Hai Ba Trung, Hanoi", // Mới
  dob: "12/10/1999", // Mới
  gender: i % 2 === 0 ? "Male" : "Female", // Mới
  salary: "150,000 đ",
  status: "confirmed",
  role: "Seller",
  startDate: "12/10/2025"
}));

const EmployeeManagement = () => {
  // State quản lý giao diện
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [employees, setEmployees] = useState(mockEmployees);

  // Xử lý click vào dòng nhân viên -> Xem chi tiết
  const handleRowClick = (emp) => {
    setSelectedEmployee({
      ...emp,
      // Đảm bảo map đúng các trường dữ liệu vào Modal
      loginEmail: emp.email,
      password: "password123", // Giả lập
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      status: "working", 
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

  // --- RENDERING MODALS ---
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

  // --- RENDERING MAIN LAYOUT (Chuẩn theo ProductManagement) ---
  return (
    // 1. Container chính: min-h-screen để footer tự đẩy xuống đáy
    <div className="flex flex-col min-h-screen bg-[#FDFBF0]">
      
      {/* Sidebar (Overlay) */}
      <ManagerSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Header (Sticky Top) */}
      <div className="sticky top-0 z-30">
        <ManagerHeader onMenuClick={() => setSidebarOpen(true)} />
      </div>

      {/* 2. Main Content: Căn giữa, giới hạn chiều rộng */}
      <main className="flex-1 p-4 lg:p-8 w-full max-w-7xl mx-auto">
        
        {/* Title Section */}
        <div className="mb-8 pt-4">
          <h1 className="text-3xl lg:text-4xl font-bold text-[#d32f2f] uppercase mb-2 font-sans tracking-wide">
            Human Resource
          </h1>
          <h1 className="text-3xl lg:text-4xl font-bold text-[#d32f2f] uppercase mb-6 font-sans tracking-wide">
             Management
          </h1>
          
          {/* Toolbar: Sub-title + Add Button */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b-2 border-[#b99f56] pb-2">
            <h2 className="text-xl font-bold text-[#b99f56] uppercase">
              List of Employee
            </h2>
            <button 
              onClick={() => setShowAddModal(true)} 
              className="flex items-center gap-2 bg-[#d32f2f] text-white px-6 py-2.5 rounded-lg font-bold shadow-lg hover:bg-[#b71c1c] hover:-translate-y-0.5 transition-all duration-200"
            >
              ADD NEW EMPLOYEE <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200">
                  <th className="py-4 px-6 text-left text-sm font-extrabold text-gray-700 uppercase tracking-wider">ID</th>
                  <th className="py-4 px-6 text-left text-sm font-extrabold text-gray-700 uppercase tracking-wider">Full name</th>
                  <th className="py-4 px-6 text-left text-sm font-extrabold text-gray-700 uppercase tracking-wider">Gender</th>
                  <th className="py-4 px-6 text-left text-sm font-extrabold text-gray-700 uppercase tracking-wider">Date of Birth</th>
                  <th className="py-4 px-6 text-left text-sm font-extrabold text-gray-700 uppercase tracking-wider">Phone</th>
                  {/* Address có thể ẩn trên mobile hoặc hiển thị dạng rút gọn nếu cần */}
                  <th className="py-4 px-6 text-left text-sm font-extrabold text-gray-700 uppercase tracking-wider hidden xl:table-cell">Address</th>
                  <th className="py-4 px-6 text-left text-sm font-extrabold text-gray-700 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {employees.map((emp, index) => (
                  <tr
                    key={index}
                    onClick={() => handleRowClick(emp)}
                    className="hover:bg-red-50/50 cursor-pointer transition-colors duration-150 group"
                  >
                    <td className="py-4 px-6 text-sm text-gray-500 font-medium group-hover:text-[#d32f2f]">{emp.empId}</td>
                    <td className="py-4 px-6 text-sm text-gray-800 font-bold">{emp.fullName}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{emp.gender}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{emp.dob}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{emp.phone}</td>
                    <td className="py-4 px-6 text-sm text-gray-600 hidden xl:table-cell truncate max-w-[200px]">{emp.address}</td>
                    <td className="py-4 px-6 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        emp.status === 'confirmed' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {emp.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Footer (Nằm cuối trang, không đè nội dung) */}
      <ManagerFooter />

      {/* Popups */}
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