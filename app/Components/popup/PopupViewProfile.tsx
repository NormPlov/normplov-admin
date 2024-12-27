import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"; // Assuming you're using a Dialog component from your UI library.
import { User } from "@/types/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal = ({ user, isOpen, onClose }:ProfileModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-textprimary font-normal text-2xl">{user.username}&apos;s Profile</DialogTitle>
        </DialogHeader>
        <div className="flex gap-4">
          <Avatar className="w-24 h-24">
            <AvatarImage
              src={`${process.env.NEXT_PUBLIC_NORMPLOV_API}${user?.avatar}`}
              alt={user?.username || "User"}
              className="w-24 h-24 "
            />
            <AvatarFallback className="text-gray-700 text-2xl">
              {user?.username?.[0]?.toUpperCase() || "?"}
            </AvatarFallback>
          </Avatar>
          
          <div className="text-textprimary text-lg">
            <p className="text-primary text-2xl">{user.username}</p>
            <p className="text-gray-400 text-md">{user.email}</p>
            <p className="text-md text-gray-400 py-1">{user.date_of_birth}</p>
            <div className=" flex gap-4">
            <p className="text-md "> Bio</p>
            <p className="text-md text-gray-500">{user.bio}</p>
            </div>
            
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
