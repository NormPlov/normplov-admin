import type { Metadata } from "next";
import StoreProvider from "@/app/StoreProvider";
import { NavbarComponent } from "../Components/layout/navbar/NavbarComponent";
import { SidebarComponent } from "../Components/layout/sidebar/SidebarComponent";
import "@/app/globals.css";
import { suwannaphum, inter } from "../font";

export const metadata: Metadata = {
  title: {
    template: "%s - NormPlov Admin Dashboard", // Using the template to append the title dynamically
    default: "NormPlov", 
  },
  description: "NormPlov: Find your perfect major and confidence career.",
  icons: {
    icon: "/assets/icon.png", // Logo for favicon (replace with your actual logo path)
    apple: "/assets/icon.png", // Apple touch icon (iOS)
    shortcut: "/assets/icon.png", // Shortcut icon for browsers
  },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${suwannaphum.variable} ${inter.variable}`}
        suppressHydrationWarning
      >
        <StoreProvider>
          <div className="flex">
            <aside>
              <SidebarComponent />
            </aside>
            <div className="w-full bg-[#fdfdfd]">
              <NavbarComponent />
              {children}
            </div>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}