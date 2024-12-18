"use client";

import React, { useState, useRef, useEffect } from "react";
import { FiMoreHorizontal } from "react-icons/fi";

interface DropdownPopupProps {
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const DropdownPopup= ({ onView, onEdit, onDelete }:DropdownPopupProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Button to toggle dropdown */}
      <button
        onClick={toggleDropdown}
        className="text-textprimary hover:text-blue-600 focus:outline-none"
      >
        <FiMoreHorizontal/>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <ul className="text-sm text-gray-800">
            <li
              onClick={() => {
                setIsOpen(false);
                onView();
              }}
              className="px-4 py-2 text-textprimary hover:bg-gray-100 cursor-pointer"
            >
              View Details
            </li>
            <li
              onClick={() => {
                setIsOpen(false);
                onEdit();
              }}
              className="px-4 py-2 text-textprimary hover:bg-gray-100 cursor-pointer"
            >
              Edit
            </li>
            <li
              onClick={() => {
                setIsOpen(false);
                onDelete();
              }}
              className="px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer"
            >
              Delete
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownPopup;
