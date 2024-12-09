"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { items } from "./menu"
import Image from "next/image"
import Link from "next/link"


export function SidebarComponent() {
  return (
    <SidebarProvider className="text-textprimary ">
     
      <Sidebar collapsible="icon" className="list-none">
      
        <SidebarGroup>
          <Image width={1000} height={1000} src={``} alt=""
            className="w-8 h-8 my-4  rounded-full object-cover bg-primary" />
          <SidebarContent>
            {items.map((item, index) => (
             <Link key={index} href={item.path}>
              <SidebarMenuItem 
               
                className={`py-1.5 hover:bg-[#def1ec] rounded-md ${item.title === "Sign out" ? "text-red-500 hover:bg-red-100" : ""
                  }`}
              >
                <SidebarMenuButton tooltip={item.title}>
                  {item.icons && (
                    <item.icons
                      className={`w-12 h-12 ${item.title === "Sign out" ? "text-red-500" : ""
                        }`}
                    />
                  )}
                  <span
                    className={`text-[16px] ${item.title === "Sign out" ? "text-red-500" : ""
                      }`}
                  >
                    {item.title}
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
             </Link>
            ))}
          </SidebarContent>

          <SidebarRail />
        </SidebarGroup> 
        </Sidebar>
        <SidebarInset>
        <header className="flex h-8 shrink-0 items-center transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-8">
          <div className="flex items-center  rounded-md">
            <SidebarTrigger className="" />
          </div>
        </header>
      </SidebarInset>
     
      
    </SidebarProvider>
  )
}
