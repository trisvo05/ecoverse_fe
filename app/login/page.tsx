"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://ecoverse.namtech.me/api/tmdt/login",
        {
          jsonrpc: "2.0",
          method: "call",
          params: {
            email: email,
            password: password,
          },
        }
      );
      
      const result = res.data?.result;
      console.log(result)
    // nếu login thành công 
      if (result?.success) {
        const sessionId = result.data.session_id;
        console.log("sesssion id : ", sessionId)

        // ✅ Lưu session_id vào cookie
        Cookies.set("session_id", sessionId, { expires: 7, path: "/" });

        // (Tuỳ chọn) lưu thông tin user vào localStorage
        localStorage.setItem("user", JSON.stringify(result.data));

        toast.success(result.message || "Đăng nhập thành công!", {
          duration: 1000,
          position: "top-center",
          style: {
            background: "#003666",
            color: "#fff",
            fontWeight: "500",
          },
        });

      
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        toast.error("Email hoặc mật khẩu không đúng!", {
          duration: 2000,
          position: "top-center",
        });
      }
    } catch (err) {
      console.error("Axios error:", err);
      toast.error("Lỗi kết nối tới máy chủ!", {
        duration: 2000,
        position: "top-center",
      });
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900 m-[-32px] h-screen">
      <Toaster />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img alt="Logo" src="/logo.png" className="mx-auto h-30 w-auto" />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
          Đăng nhập vào Tài khoản ECOVERSE
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-100">
              Tài khoản
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="text"
                required
                value={email}
                placeholder="Tài khoản demo: user"
                autoComplete="current-password"
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white placeholder:text-gray-500 focus:outline-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-100">
              Mật khẩu
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                placeholder="Mật khẩu demo: user"
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white placeholder:text-gray-500 focus:outline-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400 focus:outline-indigo-500 cursor-pointer"
            >
              Đăng nhập
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-400">
          Chưa có tài khoản?{" "}
          <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
            Tạo tài khoản ngay!
          </a>
        </p>
      </div>
    </div>
  );
}
