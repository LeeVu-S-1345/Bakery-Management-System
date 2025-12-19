import { Plus } from "lucide-react";

const ImageUploadZone = ({ image, onImageChange, className = "" }) => {
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && onImageChange) {
      onImageChange(file);
    }
  };

  return (
    <div className={`image-upload-zone relative ${className}`}>
      {image ? (
        <img src={image} alt="Upload" className="w-full h-full object-cover rounded-xl" />
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
          <Plus className="w-16 h-16 text-muted-foreground/50 mb-2" />
          <span className="text-muted-foreground/60 text-sm">
            Insert/Drag/Drop your file here!
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
};

export default ImageUploadZone;
