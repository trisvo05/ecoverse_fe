"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Cookies from "js-cookie"; 

export default function Protected({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const toastShown = useRef(false);

  useEffect(() => {
    // 🔍 Lấy session_id từ cookies
    const sessionId = Cookies.get("session_id");
    console.log("session id ",sessionId)

    if (!sessionId) {
      if (!toastShown.current) {
        toastShown.current = true;
        toast.error("Phải đăng nhập mới xem được nội dung này");
      }
      // Delay redirect 1.5s để toast hiển thị
      const timer = setTimeout(() => {
        router.replace("/"); 
      }, 1500);

      return () => clearTimeout(timer);
    } else {
      setIsChecked(true);
    }
  }, [router]);

  if (!isChecked) return ("Đăng nhập mới xem được nội dung này");

  return <>{children}</>;
}
