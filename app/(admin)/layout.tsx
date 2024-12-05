import type { Metadata } from "next";
import StoreProvider from "@/app/StoreProvider";
import "@/app/globals.css";
import { NavbarComponent } from "../Components/layout/navbar/NavbarComponent";
import { SidebarComponent } from "../Components/layout/sidebar/SidebarComponent";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <header>
            <NavbarComponent />
          </header>
          <main className="flex">
            <aside>
              <SidebarComponent />
            </aside>
            <div className="bg-[#fdfdfd] w-full">{children}</div>
          </main>
        </StoreProvider>
      </body>
    </html>
  );
}
