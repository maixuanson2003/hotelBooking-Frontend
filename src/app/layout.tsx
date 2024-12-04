import type { Metadata } from "next";
import "./globals.css";

import { LayoutCustom } from "../Custom/Layout/CustomLayout";
import { cookies } from "next/headers";
import ChatboxWithToggle from "@/Custom/chat/chat";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("token");
  return (
    <html lang="en">
      <body className="w-full z-index: 0 ">
        <LayoutCustom token={theme}>
          {children}
          <ChatboxWithToggle />
        </LayoutCustom>
      </body>
    </html>
  );
}
