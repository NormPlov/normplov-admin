
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface ImageUploadAreaProps {
  image: File | string | null; 
  onImageUpload: (file: File | null) => void;
  label: string;
  className?: string;
  imageClassName?: string;
}

export function ImageUploadArea({
  image,
  onImageUpload,
  label,
  className = "",
  imageClassName = "",
}: ImageUploadAreaProps) {
  return (
    <div className={`relative ${className}`}>
      {image ? (
        typeof image === "string" ? (
          <>
            <img
              src={`${process.env.NEXT_PUBLIC_NORMPLOV_API}${image || "/assets/placeholder.jpg"}`|| "/assets/placeholder.jpg"} // Use the URL directly
              alt={label}
              className={`w-full h-full object-cover ${imageClassName}`}
            />
            <Button
              type="button"
              onClick={() => document.getElementById(label)?.click()}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary/80 hover:bg-primary"
            >
              <Upload className="mr-2 h-4 w-4" /> Re-upload
            </Button>
          </>
        ) : (
          <>
            <img
              src={URL.createObjectURL(image)}
              alt={label}
              className={`w-full h-full object-cover ${imageClassName}`}
            />
            <Button
              type="button"
              onClick={() => document.getElementById(label)?.click()}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary/80 hover:bg-primary"
            >
              <Upload className="mr-2 h-4 w-4" /> Re-upload
            </Button>
          </>
        )
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <img
            src={
              label === "Cover Image"
                ? "https://placehold.co/1200x400"
                : "https://placehold.co/400x400"
            }
            alt={`${label} placeholder`}
            className="w-full h-full object-cover"
          />
          <Button
            type="button"
            onClick={() => document.getElementById(label)?.click()}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary/80 hover:bg-primary"
          >
            <Upload className="mr-2 h-4 w-4" /> Upload {label}
          </Button>
        </div>
      )}
      <input
        id={label}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            onImageUpload(file);
          }
        }}
        className="hidden"
      />
    </div>
  );
}
