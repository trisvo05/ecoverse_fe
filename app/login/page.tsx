"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
// import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  sub: number;
  username: string;
  role: string;
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://ecoverse.namtech.me/api/tmdt/login", {
        "jsonrpc":"2.0","method":"call","params":email,"password":password
      },
    //   {withCredentials: true}
    );
      
    //   const token = res.data.access_token;

      // 👉 decode token để lấy role
    //   const decoded = jwtDecode<JwtPayload>(token);

      // 👉 lưu token + role
    //   localStorage.setItem("token", token);
    //   localStorage.setItem("role", decoded.role);

      toast.success("Đăng nhập thành công!", {
        duration: 1000,
        position: "top-center",
        style: {
          background: "#003666",
          color: "#fff",
          fontWeight: "500",
        },
      });

      // Chuyển hướng sau 1s
      setTimeout(() => {
        router.push("/");
      }, 1000);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Axios error:", err);
    //   console.log("Response:", err.response?.data); 
    //   console.log("Status:", err.response?.status);
      // axios error có thể là response hoặc network
      const errorMessage =
        err.response?.data?.message || "Email hoặc mật khẩu không đúng!";
      toast.error(errorMessage, {
        duration: 2000,
        position: "top-center",
      });
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900 m-[-32px] h-screen">
      {/* Toaster để hiển thị toast */}
      <Toaster />

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="/logo.png"
          className="mx-auto h-30 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
          Đăng nhập vào Tài khoản ECOVERSE
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-100"
            >
              Tài khoản
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="text"
                required
                value={email}
                autoComplete="manger1@vietcycle.com"
                placeholder="tài khoản demo :user"
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-100"
              >
                Mật khẩu
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-400 hover:text-indigo-300"
                >
                  Quên mật khẩu?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="mật khẩu demo:user"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 cursor-pointer"
            >
              Đăng nhập
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-400">
          Chưa có tài khoản ?{" "}
          <a
            href="#"
            className="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Tạo tài khoản ngay !
          </a>
        </p>
      </div>
    </div>
  );
}
