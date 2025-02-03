import type { Metadata } from "next";
import StoreProvider from "@/app/StoreProvider";
import "@/app/globals.css";

import { inter, suwannaphum } from "@/app/font";
import { Toaster } from "@/components/ui/toaster";

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

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${suwannaphum.variable} ${inter.variable}`}>
        <StoreProvider>
          {children}
          <Toaster/>
        </StoreProvider>
      </body>
    </html>
  );
}
