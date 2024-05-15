'use client'
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartContextProvider } from "@/context/cartContext";
import Navbar from "./components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient()
  return (
    <CartContextProvider >
      <QueryClientProvider client={queryClient}>
        <html lang="en">
          <body>
            <Navbar />
            {children}</body>
        </html>

      </QueryClientProvider>

    </CartContextProvider>
  );
}
