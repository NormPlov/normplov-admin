"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { FiAlertCircle } from "react-icons/fi";

export interface ConfirmationModalProps {
  title?: string; // Optional title for the modal
  message: string; // The confirmation message
  onConfirm: () => void; // Callback for confirm action
  onCancel: () => void; // Callback for cancel action
  confirmText?: string; // Custom text for the confirm button
  cancelText?: string; // Custom text for the cancel button
  icon?: React.ReactNode; // Optional custom icon
}

const ConfirmationModal = ({
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Yes",
  cancelText = "Cancel",
  icon = <FiAlertCircle className="text-red-500 text-5xl" />,
}: ConfirmationModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-[400px] text-center relative">
        {/* Close Button */}
        <button
          onClick={onCancel}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>

        {/* Customizable Icon */}
        <div className="flex justify-center mb-4">{icon}</div>

        {/* Title (Optional) */}
        {title && <h2 className="text-xl font-semibold mb-2">{title}</h2>}

        {/* Confirmation Message */}
        <p className="text-gray-700 text-lg mb-6">{message}</p>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            onClick={onCancel}
            className="border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-red-500 text-white hover:bg-red-600 px-6"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
