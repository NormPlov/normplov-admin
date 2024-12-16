import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"; // Assuming you're using a Dialog component from your UI library.
import { User } from "@/types/types";
import Image from "next/image";
import { placeholderProfile } from "@/types/constant";

interface ProfileModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ user, isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-textprimary font-normal text-2xl">{user.username}&apos;s Profile</DialogTitle>
        </DialogHeader>
        <div className="flex gap-4">
            <Image width={1000} height={1000} 
            src={`${process.env.NEXT_PUBLIC_NORMPLOV_API}${user.avatar}`|| placeholderProfile} alt="Profile User"
            className="w-32 h-32 rounded-full "/>
        <div className="text-textprimary text-lg">
        <p className="text-primary text-2xl">{user.username}</p>
          <p className="text-gray-400 text-md">{user.email}</p>
          <p className="text-md"> {user.gender}</p>
          <p className="text-md">{user.date_of_birth}</p>
          <p>{user.bio}</p>
        </div>
          
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
