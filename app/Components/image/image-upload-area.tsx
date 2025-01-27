
// import React, { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Upload } from "lucide-react";
// import Image from "next/image";

// interface ImageUploadAreaProps {
 
//   image: File | string | null;
//   onImageUpload: (file: File | null) => void;
//   label: string;
//   className?: string;
//   imageClassName?: string;
// }

// export function ImageUploadArea({
//   image = "/assets/placeholder.png",
//   onImageUpload,
//   label,
//   className = "",
//   imageClassName = "",
// }: ImageUploadAreaProps) {
//   // Local state for preview
//   const [preview, setPreview] = useState<string>("");

//   // Update preview based on the prop `image` whenever it changes
//   useEffect(() => {
//     if (typeof image === "string") {
//       // If it’s a string from your database or a placeholder
//       // (If you want to prefix with `NEXT_PUBLIC_NORMPLOV_API`, do so here.)
//       if (image.startsWith("http") || image === "/assets/placeholder.png") {
//         // It's already a complete URL or placeholder
//         setPreview(image);
//       } else {
//         // Prepend your API endpoint if needed
//         setPreview(`${process.env.NEXT_PUBLIC_NORMPLOV_API}${image}`);
//       }
//     } else if (image instanceof File) {
//       // If it’s a File, create a local blob URL
//       setPreview(URL.createObjectURL(image));
//     } else {
//       // If null, decide which placeholder to use
//       if (label === "Cover Image") {
//         setPreview("https://placehold.co/1200x400");
//       } else {
//         setPreview("https://placehold.co/400x400");
//       }
//     }
//   }, [image, label]);

//   // Clean up blob URLs when unmounting or changing
//   useEffect(() => {
//     return () => {
//       if (image instanceof File && preview) {
//         URL.revokeObjectURL(preview);
//       }
//     };
//   }, [image, preview]);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] || null;
//     if (file) {
//       // Generate a local preview for the newly selected file
//       const newPreviewUrl = URL.createObjectURL(file);
//       setPreview(newPreviewUrl);
//       // Let the parent know
//       onImageUpload(file);
//     }
//   };

//   return (
//     <div className={`relative ${className}`}>
//       {/* Display the preview or placeholders */}
//       <Image
//       width={1000}
//       height={1000}
//         src={preview}
//         alt={label}
//         className={`w-full h-full object-cover ${imageClassName}`}
//       />

//       <Button
//         type="button"
//         onClick={() => document.getElementById(label)?.click()}
//         className="absolute top-1/2 left-1/2 
//                    transform -translate-x-1/2 -translate-y-1/2 
//                    bg-primary/80 hover:bg-primary"
//       >
//         <Upload className="mr-2 h-4 w-4" />
//         { 
//           // If the image is a placeholder, say "Upload"; otherwise "Re-upload"
//           preview.includes("placehold.co") || preview === "/assets/placeholder.png"
//             ? `Upload ${label}`
//             : `Re-upload`
//         }
//       </Button>

//       {/* Hidden file input */}
//       <input
//         id={label}
//         type="file"
//         accept="image/*"
//         onChange={handleFileChange}
//         className="hidden"
//       />
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import Image from "next/image";

interface ImageUploadAreaProps {
  image: File | string | null;
  onImageUpload: (file: File | null) => void;
  label: string;
  className?: string;
  imageClassName?: string;
}

export function ImageUploadArea({
  image = "/assets/placeholder.png",
  onImageUpload,
  label,
  className = "",
  imageClassName = "",
}: ImageUploadAreaProps) {
  const [preview, setPreview] = useState<string>("");

  // Update preview based on the `image` prop
  useEffect(() => {
    if (typeof image === "string") {
      // If it's a string (URL or placeholder)
      if (image.startsWith("http") || image === "/assets/placeholder.png") {
        setPreview(image);
      } else {
        setPreview(`${process.env.NEXT_PUBLIC_NORMPLOV_API}${image}`);
      }
    } else if (image instanceof File) {
      // If it's a file, create a new blob URL
      const objectURL = URL.createObjectURL(image);
      setPreview(objectURL);

      // Clean up the blob URL
      return () => URL.revokeObjectURL(objectURL);
    } else {
      // If null, use a placeholder
      setPreview(
        label === "Cover Image"
          ? "https://placehold.co/1200x400"
          : "https://placehold.co/400x400"
      );
    }
  }, [image, label]);

  // Handle file changes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      // Generate a new preview URL and notify the parent
      const newPreviewUrl = URL.createObjectURL(file);
      setPreview(newPreviewUrl);
      onImageUpload(file);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Image preview */}
      <Image
        src={preview}
        alt={label}
        className={`w-full h-full object-cover ${imageClassName}`}
        width={1000}
        height={1000}
      />

      {/* Upload button */}
      <Button
        type="button"
        onClick={() => document.getElementById(label)?.click()}
        className="absolute top-1/2 left-1/2 
                   transform -translate-x-1/2 -translate-y-1/2 
                   bg-primary/80 hover:bg-primary"
      >
        <Upload className="mr-2 h-4 w-4" />
        {preview.includes("placehold.co") || preview === "/assets/placeholder.png"
          ? `Upload ${label}`
          : `Re-upload`}
      </Button>

      {/* Hidden file input */}
      <input
        id={label}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
