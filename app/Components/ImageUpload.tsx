import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { FaUpload } from "react-icons/fa";
import Image from "next/image";

interface ImageUploadProps {
  onImageUpload: (file: File, dataUrl: string) => void;
  label: string;
}

export function ImageUpload({ onImageUpload, label }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setPreview(dataUrl);
        onImageUpload(file, dataUrl);
      };
      reader.readAsDataURL(file);
    }
    console.log("File", file);
  };


  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center space-x-4">
        <Button type="button" onClick={() => fileInputRef.current?.click()}>
          <FaUpload />
          Upload
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>
      {preview && (
        <div className="mt-2">
          <Image
            width={1000}
            height={1000}
            src={`${preview}`}
            alt="Preview"
            className="max-w-full h-auto max-h-48 rounded"
          />
        </div>
      )}
    </div>
  );
}
