"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { FiAlertCircle } from "react-icons/fi";
import { BlockUserModalProps } from "@/types/types";


const BlockUserModal: React.FC<BlockUserModalProps> = ({
  onConfirm,
  onCancel,
  actionType,
}) => {
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

        {/* Alert Icon */}
        <div className="flex justify-center mb-4">
          <FiAlertCircle className="text-red-500 text-5xl" />
        </div>

        {/* Confirmation Message */}
        <p className="text-gray-700 text-lg mb-6">
          Are you sure {actionType === "block" ? "to block" : "to unblock"} this
          user?
        </p>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            onClick={onCancel}
            className="border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-red-500 text-white hover:bg-red-600 px-6"
          >
            Yes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlockUserModal;
