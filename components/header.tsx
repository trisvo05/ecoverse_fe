import { ChevronDown, Search, ShoppingCart, User } from "lucide-react";
import Image from "next/image";
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



const Header = () =>{
    return (
        <div className="flex flex-col items-center gap-6  mb-[60px] mt-[-32px] mx-[-32px]">
            {/* Header chinh */}
            <div className="h-[120px] w-[100%] flex items-center justify-between p-10  bg-white  ">
                {/* All products */}
                <div className="hover:text-green-500 *:cursor-pointer">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex text-xl font-medium">DANH MUC SAN PHAM <ChevronDown /></DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel></DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Đồ gia dụng Xanh</DropdownMenuItem>
                            <DropdownMenuItem>Đồ dùng cá nhân & Mỹ phẩm Xanh</DropdownMenuItem>
                            <DropdownMenuItem>Thời trang bền vững</DropdownMenuItem>
                            <DropdownMenuItem>Đồ dùng văn phòng & học tập xanh</DropdownMenuItem>
                            <DropdownMenuItem>Sản phẩm sức khỏe & lối sông xanh</DropdownMenuItem>
                            <DropdownMenuItem>Xem tất cả</DropdownMenuItem>

                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                {/* Logo */}
                <Link href={"/"}>
                    <div className="h-[180px] w-[180px] ">
                        <img src="/logo.png" alt="" className="object-cover" />
                    </div>
                </Link>
           
                
                {/* tim kiem , profile , gio hang */}
                <div className="flex items-center justify-between gap-10">
                    <Search className="cursor-pointer"/>
                    <User className="cursor-pointer" />
                    {/* <Link href={""}></Link>s */}
                    <Sheet >
                        <SheetTrigger><ShoppingCart className="cursor-pointer" /></SheetTrigger>
                        <SheetContent className="max-w-[800px] sm:max-w-[500px] h-full  ">
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
                                        <Link href={"/shopping/cart"} className="py-2 w-1/2 rounded-sm border-solid border-2 border-gray-2 text-center bg-green-400">Thanh toan</Link>
                                    </div>
                                </div>
                            </div>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                    
                </div>

            </div>     
            {/* Header phu */}    
            <div className="w-[70%] flex items-center justify-between text-[14px]">
                <div><Link href={"/ecoverse/about_me"}>Về chúng tôi</Link></div>
                <div>Liên hệ</div>
                <div>Thông tin thanh toán</div>
                <div>Chính sách bảo mật</div>
                <div className="border-r-2 border-solid border-amber-400"></div>
                <div>+84 839 328 490</div>
                <div>minhtrivo2005gg@gmail.com</div>
            </div>            
        </div>
    )
}
export default Header;