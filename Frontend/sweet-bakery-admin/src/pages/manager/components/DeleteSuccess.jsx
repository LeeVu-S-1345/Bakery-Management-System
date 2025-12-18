import { useEffect } from "react";

const DeleteSuccess = ({ type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="delete-success-overlay">
      <div className="bg-success/10 border-2 border-primary rounded-lg p-8 max-w-lg w-full mx-4">
        <p className="text-center text-lg">
          {type.charAt(0).toUpperCase() + type.slice(1)} removed successfully
        </p>
      </div>
    </div>
  );
};

export default DeleteSuccess;
