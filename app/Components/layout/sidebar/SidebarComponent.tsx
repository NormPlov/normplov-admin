"use client";

import * as React from "react";
import { PiSignOutBold } from "react-icons/pi";
import { items } from "./menu"; 
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";

export function SidebarComponent() {
  const [collapsed, setCollapsed] = React.useState(false);

  const toggleSidebar = () => setCollapsed((prev) => !prev);

  return (
    <SidebarProvider> 
     <div
        className={`flex min-h-screen transition-all duration-300 ${collapsed ? "bg-[#fdfdfd]" : "bg-white"}`}
      >
        {/* Sidebar */}
        <Sidebar
          className={`transition-all duration-300 bg-white ${collapsed ? "w-[85px]" : "w-[240px]"} `}
        >
          {/* Sidebar Header */}
          <SidebarHeader className=" flex justify-between items-center py-4 px-4 ">
            <div
              className={`flex items-center transition-all duration-300 ${collapsed ? "justify-center w-full gap-2" : "justify-between w-full gap-4"}`}
            >
              {/* Logo */}
              <Image
                width={1000}
                height={1000}
                src="/"
                alt="Logo"
                className="h-12 w-12 rounded-full bg-primary"
              />
              {/* Collapse Button */}
              {!collapsed && (
                <span className="font-semibold text-textprimary transition-all duration-300">
                 {/* for space */}
                </span>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={toggleSidebar}
              >
                <HiMiniBars3CenterLeft className="h-8 w-8 text-textprimary" />
              </Button>
            </div>

          </SidebarHeader>

          {/* Sidebar Content */}
          <SidebarContent className="flex-1 p-2 overflow-auto">
            <SidebarMenu>
              {items.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    className={`flex items-center gap-x-4 gap-y-6 ${collapsed ? "justify-center px-2 py-3.5" : "px-4 py-3.5"
                      } hover:bg-[#DEF1EC] rounded-md`}
                  >
                    <Link
                      href={item.path}
                      className={`flex items-center ${collapsed ? "justify-center" : "gap-4 py-3.5"
                        }`}
                    >
                      <item.icons
                        className="h-6 w-6 text-textprimary"
                        aria-hidden="true"
                      />
                      {!collapsed && (
                        <span className="text-textprimary text-md">
                          {item.title}
                        </span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>

          {/* Sidebar Footer */}
          <SidebarFooter className="py-2">
            <Button
              variant="ghost"
              className={`flex justify-start items-center gap-2 w-full text-md mb-12 ${collapsed ? "justify-center px-2" : "px-4"
                } text-red-500 hover:bg-red-50 hover:text-red-500`}
            >
              <PiSignOutBold className="h-6 w-6 " aria-hidden="true" />
              {!collapsed && <span>Sign out</span>}
            </Button>
          </SidebarFooter>
        </Sidebar>
      </div>
    </SidebarProvider>
  );
}
