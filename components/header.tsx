"use client"
import { ChevronDown, Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
// import dropdwon 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


// import sheet de bieu thi cart modal 
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Quantity from "./quantity_edit";
import Sanpham2 from "./sanpham2";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import Protected from "./protected/Protected";
import { Toaster } from "react-hot-toast";
import Profile from "./change_dropdown_profile/page";



const Header = () =>{
    // const router = useRouter();
    const hideHeaderPhu = usePathname() === "/shopping/checkout"
    return (
        
        <div className="flex flex-col items-center gap-6  mb-[60px] mt-[-32px] mx-[-32px]">
            {/* Header chinh */}
            <div className="h-[120px] w-[100%] flex items-center justify-between p-10  bg-white  ">

                {/* 1. logo */}
                <Link href={"/"}>
                    
                    <div className="h-[180px] w-[180px] ">
                        <img src="/logo.png" alt="" className="object-cover" />
                    </div>
                </Link>


                {/* 2. Nav  */}
                <div className="flex gap-10 ml-[-700px]">
                    <div className="hover:text-green-500 *:cursor-pointer">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex text-xl font-semibold">SẢN PHẨM<ChevronDown /></DropdownMenuTrigger>
                            <DropdownMenuContent className="">
                                {/* <DropdownMenuLabel></DropdownMenuLabel> */}
                                {/* <DropdownMenuSeparator /> */}
                                <DropdownMenuItem className="text-[15px]">Đồ gia dụng Xanh</DropdownMenuItem>
                                <DropdownMenuItem className="text-[15px]">Đồ dùng cá nhân & Mỹ phẩm Xanh</DropdownMenuItem>
                                <DropdownMenuItem className="text-[15px]">Thời trang bền vững</DropdownMenuItem>
                                <DropdownMenuItem className="text-[15px]">Đồ dùng văn phòng & học tập xanh</DropdownMenuItem>
                                <DropdownMenuItem className="text-[15px]">Sản phẩm sức khỏe & lối sông xanh</DropdownMenuItem>
                                <DropdownMenuItem className="text-[15px]">Xem tất cả</DropdownMenuItem>

                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <Link href={"/ranking"}>
                        <div className="hover:text-green-500 *:cursor-pointer text-xl font-semibold">BẢNG XẾP HẠNG XANH</div>
                    </Link>
                </div>
                
                
           
                
                {/* tim kiem , profile , gio hang */}
                <div className="flex items-center justify-between gap-10">
                    <Search className="cursor-pointer"/>
                    <Profile/>
                    {/* <Link href={""}></Link>s */}
                    <Sheet >
                        <SheetTrigger><ShoppingCart className="cursor-pointer" /></SheetTrigger>
                        
                        <SheetContent className="max-w-[800px] sm:max-w-[500px] h-full  ">
                            <Protected>
                            <SheetHeader>
                            <SheetTitle>GIO HANG CUA TOI</SheetTitle>
                            {/*  */}
                            <div className="flex flex-col gap-5">
                                <h1 className="text-2xl">GIO HANG [7]</h1>
                                {/* cac san pham trong CART */}
                                <div className="w-full h-[500px] overflow-scroll overflow-x-hidden flex flex-col gap-10">
                                    {/* san pham 1 */}
                                    <Sanpham2/>
                                    <Sanpham2/>
                                    <Sanpham2/>
                                    <Sanpham2/>
                                    <Sanpham2/>
                                </div>
                                {/* Thanh toan */}
                                <div className="mt-5">
                                    <div className="flex justify-between text-2xl">
                                        <div>TONG</div>
                                        <div>$1,903.95 USD</div>
                                    </div>
                                    <div className="flex justify-between s">
                                        <Link href={"/shopping/cart"} className="py-2 w-1/2 rounded-sm border-solid border-2 border-gray-2 text-center">Xem gio hang</Link>
                                        <Link href={"/shopping/checkout"} className="py-2 w-1/2 rounded-sm border-solid border-2 border-gray-2 text-center bg-green-400">Thanh toan</Link>
                                    </div>
                                </div>
                            </div>
                            </SheetHeader>
                            </Protected>
                        </SheetContent>
                    </Sheet>
                    
                </div>

            </div>  
               {/*Header phu  */}
            {!hideHeaderPhu &&
           
            <div className="w-[70%] flex items-center justify-between text-[14px]">
                    <div><Link href={"/ecoverse/about_me"}>Về chúng tôi</Link></div>
                    <div>Liên hệ</div>
                    <div>Thông tin thanh toán</div>
                    <div>Chính sách bảo mật</div>
                    <div className="border-r-2 border-solid border-amber-400"></div>
                    <div>+84 839 328 490</div>
                    <div>minhtrivo2005gg@gmail.com</div>
            </div> }  
        </div>
    )
}
export default Header;