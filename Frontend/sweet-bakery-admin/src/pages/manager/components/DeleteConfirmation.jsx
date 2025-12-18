const DeleteConfirmation = ({ type, onConfirm, onCancel }) => {
  return (
    <div className="delete-confirm-overlay">
      <div className="bg-warning border-2 border-primary rounded-lg p-8 max-w-lg w-full mx-4">
        <p className="text-center text-lg mb-6">
          Are you sure you want to remove this {type}?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-muted text-foreground rounded-full font-medium hover:bg-muted/80 transition-colors"
          >
            Quit
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            Remove (Delete) {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
