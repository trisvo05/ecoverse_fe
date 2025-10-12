"use client"

import { ChevronDown, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Sanpham2 from "./sanpham2";
import Protected from "./protected/Protected";
import Profile from "./change_dropdown_profile/page";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  // Ẩn header phụ ở trang checkout
  const hideHeaderPhu = pathname === "/shopping/checkout";

  // Ẩn toàn bộ header ở trang login
  if (pathname === "/login") return null;

  // Hàm xử lý class active cho tab
    const getLinkClass = (href: string) => {
    const isActive =
        href === "/"
        ? pathname === "/" // chỉ chính xác là "/" mới active
        : pathname.startsWith(href); // các tab khác được phép match theo prefix

    return `text-xl font-semibold cursor-pointer transition-all duration-300 ${
        isActive
        ? "text-green-600 border-b-2 border-green-500 pb-1"
        : "hover:text-green-500"
    }`;
    };
  return (
    <div className="flex flex-col items-center gap-6 mb-[60px] mt-[-32px] mx-[-32px]">
      {/* Header chính */}
      <div className="h-[120px] w-full flex items-center justify-between p-10 bg-white shadow-sm sticky top-0 z-50">
        {/* 1. Logo */}
        <Link href={"/"}>
          <div className="h-[180px] w-[180px] cursor-pointer">
            <img src="/logo.png" alt="EcoVerse Logo" className="object-cover" />
          </div>
        </Link>

        {/* 2. Nav */}
        <div className="flex gap-10">
          <Link href={"/"}>
            <div className={getLinkClass("/")}>TRANG CHỦ</div>
          </Link>

          <div>
            <DropdownMenu>
              <DropdownMenuTrigger
                className={`flex items-center gap-1 ${getLinkClass("/products")}`}
              >
                SẢN PHẨM <ChevronDown size={20} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                
                <Link href={"/products"}><DropdownMenuItem className="text-[15px] bg-gray-200">Xem tất cả</DropdownMenuItem></Link>
                  
                
                <DropdownMenuItem className="text-[15px]">
                  Đồ gia dụng Xanh
                </DropdownMenuItem>
                <DropdownMenuItem className="text-[15px]">
                  Đồ dùng cá nhân & Mỹ phẩm Xanh
                </DropdownMenuItem>
                <DropdownMenuItem className="text-[15px]">
                  Thời trang bền vững
                </DropdownMenuItem>
                <DropdownMenuItem className="text-[15px]">
                  Đồ dùng văn phòng & học tập xanh
                </DropdownMenuItem>
                <DropdownMenuItem className="text-[15px]">
                  Sản phẩm sức khỏe & lối sống xanh
                </DropdownMenuItem>
                
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Link href={"/ranking"}>
            <div className={getLinkClass("/ranking")}>BẢNG XẾP HẠNG XANH</div>
          </Link>

          <Link href={"/old_products"}>
            <div className={getLinkClass("/old_products")}>
              SỐNG XANH - MUA CŨ
            </div>
          </Link>
          <a
            href="https://ecofundx.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className={getLinkClass("https://ecofundx.vercel.app/")}
            >
            GREEN CROWDFUNDING
            </a>
        </div>

        {/* 3. Search, Profile, Cart */}
        <div className="flex items-center justify-between gap-8">
          <Search className="cursor-pointer" />
          <Profile />

          <Sheet>
            <SheetTrigger>
              <ShoppingCart className="cursor-pointer" />
            </SheetTrigger>

            <SheetContent className="max-w-[800px] sm:max-w-[500px] h-full">
              <Protected>
                <SheetHeader>
                  <SheetTitle>GIỎ HÀNG CỦA TÔI</SheetTitle>

                  <div className="flex flex-col gap-5 mt-4">
                    <h1 className="text-2xl font-semibold">GIỎ HÀNG [7]</h1>

                    {/* Danh sách sản phẩm */}
                    <div className="w-full h-[500px] overflow-y-scroll flex flex-col gap-10 pr-2">
                      <Sanpham2 />
                      <Sanpham2 />
                      <Sanpham2 />
                      <Sanpham2 />
                      <Sanpham2 />
                    </div>

                    {/* Thanh toán */}
                    <div className="mt-5">
                      <div className="flex justify-between text-2xl">
                        <div>TỔNG</div>
                        <div>$1,903.95 USD</div>
                      </div>

                      <div className="flex justify-between mt-3">
                        <Link
                          href={"/shopping/cart"}
                          className="py-2 w-1/2 text-center border-2 border-gray-300 rounded-sm hover:bg-gray-100 transition"
                        >
                          Xem giỏ hàng
                        </Link>
                        <Link
                          href={"/shopping/checkout"}
                          className="py-2 w-1/2 text-center bg-green-500 text-white rounded-sm hover:bg-green-600 transition"
                        >
                          Thanh toán
                        </Link>
                      </div>
                    </div>
                  </div>
                </SheetHeader>
              </Protected>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Header phụ */}
      {!hideHeaderPhu && (
        <div className="w-[70%] flex items-center justify-between text-[14px] text-gray-700">
          <Link href={"/ecoverse/about_me"}>Về chúng tôi</Link>
          <Link href={"/ecoverse/lien_he"}>Liên hệ</Link>
          <Link href={"/"}>Thông tin thanh toán</Link>
          <Link href={"/"}>Chính sách bảo mật</Link>
          <Link href={""} className="border h-[18px] border-gray-400 mx-2"></Link>
          <a href="tel:+848339328490">+84 839 328 490</a>
          <a href="mailto:minhtrivo2005gg@gmail.com">minhtrivo2005gg@gmail.com</a>
        </div>
      )}
    </div>
  );
};

export default Header;
