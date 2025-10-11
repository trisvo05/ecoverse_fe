
import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Chakra_Petch } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Chatbot from "@/components/chatbot";


const chakraPetch = Chakra_Petch({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata = {
  title: "EcoVerse",
  description: "Ứng dụng Next.js của tôi",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      // { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    // apple: "/apple-touch-icon.png",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className="p-[32px] bg-[#F2F2F2] scroll-smooth">
  
      
      <body
        className={`${chakraPetch.className}  antialiased bg-[#F2F2F2]`} 
      >
        <Chatbot/>
        <Toaster position="top-center" />
        <Header  />
        {children}
        <Footer />

      </body>
    </html>
  );
}
