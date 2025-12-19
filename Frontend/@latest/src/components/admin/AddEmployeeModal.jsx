import { useState } from "react";
import ImageUploadZone from "./ImageUploadZone.jsx";
import InfoTable from "./InfoTable.jsx";

const AddEmployeeModal = ({
  onSave,
  onCancel,
  initialData,
  viewMode = false,
  onDelete,
}) => {
  const [data, setData] = useState(
    initialData || {
      fullName: "",
      phoneNumber: "",
      email: "",
      startDate: "",
      loginEmail: "",
      password: "",
      id: "",
      role: "Seller",
      status: "working",
    }
  );

  const personalInfo = [
    { label: "Full name", value: data.fullName },
    { label: "Phone number", value: data.phoneNumber },
    { label: "Email", value: data.email },
    { label: "Start date", value: data.startDate },
  ];

  const loginInfo = [
    { label: "Log in email", value: data.loginEmail },
    { label: "Password", value: data.password },
    { label: "ID", value: data.id },
    { label: "Role", value: data.role },
  ];

  const additionalInfo = [
    { label: "Status", value: data.status },
  ];

  const handleValueChange = (section, index, value) => {
    const fieldMaps = {
      personal: ["fullName", "phoneNumber", "email", "startDate"],
      login: ["loginEmail", "password", "id", "role"],
      additional: ["status"],
    };
    const field = fieldMaps[section][index];
    setData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-card min-h-screen p-8">
      {/* Header */}
      <h1 className="text-3xl font-bold text-primary uppercase mb-2">
        {viewMode ? (initialData?.fullName || "Employee Details") : "Add New Employee"}
      </h1>
      <div className="h-1 bg-primary w-full max-w-md mb-8" />

      {/* Content */}
      <div className="flex gap-8 flex-wrap">
        {/* Image Upload */}
        <div className="w-full max-w-md">
          <ImageUploadZone
            image={data.image}
            className="h-80"
            onImageChange={(file) => {
              const url = URL.createObjectURL(file);
              setData((prev) => ({ ...prev, image: url }));
            }}
          />
        </div>

        {/* Forms */}
        <div className="flex-1 min-w-[400px] space-y-4">
          <InfoTable
            title="Personal Information"
            variant="red"
            data={personalInfo}
            editable={!viewMode}
            onValueChange={(i, v) => handleValueChange("personal", i, v)}
          />

          <InfoTable
            title="Log in Information"
            variant="green"
            data={loginInfo}
            editable={!viewMode}
            onValueChange={(i, v) => handleValueChange("login", i, v)}
          />

          <InfoTable
            title="Additional Information"
            variant="gray"
            data={additionalInfo}
            editable={!viewMode}
            onValueChange={(i, v) => handleValueChange("additional", i, v)}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="h-px bg-primary my-8" />
      <div className="flex justify-center gap-4">
        {viewMode ? (
          <button onClick={onDelete} className="btn-cancel">
            Remove (Delete) Employee
          </button>
        ) : (
          <>
            <button onClick={() => onSave(data)} className="btn-save">
              Save
            </button>
            <button onClick={onCancel} className="btn-cancel">
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AddEmployeeModal;
