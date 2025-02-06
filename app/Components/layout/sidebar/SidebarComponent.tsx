"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { items } from "./menu";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function SidebarComponent() {
  const router = useRouter()
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const {toast} = useToast()

      const handleLogout = async () => {
        try {
          const res = await fetch(`/api/logout`, {
            method: "POST",
            credentials: "include",
          });
          router.push("/");
          const data = await res.json();
    
          if (res.ok) {
            window.location.reload();
            toast({
              description: "Logged out successfully!",
              variant: "default"
            });
            
           
          } else {
            toast({
              description: "Failed to log out.",
              variant: "destructive"
            });
          }
        } catch (error) {
          toast({
            description: "An error occurred during logout.",
            variant: "destructive"
          });
          console.error(error);
        }
      };

  return (
    <SidebarProvider className="text-textprimary ">
      <Sidebar collapsible="icon" className="list-none">
        <SidebarGroup>
          <Image
            width={1000}
            height={1000}
            src={`/assets/Logo Only.png`}
            alt=""
            className="w-12 h-12 my-4 rounded-full object-cover"
          />
          <SidebarContent>
            {items.map((item, index) => {
              if (item.title === "Sign out") {
                return (
                  <div key={index} onClick={() => setShowLogoutConfirm(true)}>
                    <SidebarMenuItem className="py-1.5 hover:bg-red-100 rounded-md text-red-500 cursor-pointer list-none">
                      <SidebarMenuButton tooltip={item.title}>
                        {item.icons && (
                          <item.icons className="w-16 h-16 text-red-500" />
                        )}
                        <span className="text-[16px] text-red-500">
                          {item.title}
                        </span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </div>
                );
              } else {
                return (
                  <Link key={index} href={item.path} className="list-none">
                    <SidebarMenuItem className="py-1.5 hover:bg-[#def1ec] rounded-md">
                      <SidebarMenuButton tooltip={item.title}>
                        {item.icons && <item.icons className="w-16 h-16" />}
                        <span className="text-[16px]">{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </Link>
                );
              }
            })}
          </SidebarContent>

          <SidebarRail />
        </SidebarGroup>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-8 shrink-0 items-center transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-8">
          <div className="flex items-center rounded-md">
            <SidebarTrigger className="" />
          </div>
        </header>
      </SidebarInset>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-7 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-2">Confirm Logout</h2>
            <p className="mb-4">Are you sure you want to log out?</p>
            <div className="flex justify-end gap-4">
              <Button
                className="px-5 py-2 bg-gray-200 rounded hover:bg-gray-400"
                onClick={() => setShowLogoutConfirm(false)}
              >
                No
              </Button>
              <Button
                className="px-7 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleLogout}
              >
                Yes
              </Button>
            </div>
          </div>
        </div>
      )}
    </SidebarProvider>
  );
}
