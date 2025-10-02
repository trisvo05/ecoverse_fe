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
                    <Search />
                    <User />
                    {/* <Link href={""}></Link>s */}
                    <ShoppingCart />
                </div>

            </div>     
            {/* Header phu */}    
            <div className="w-[70%] flex items-center justify-between text-[14px]">
                <div>Về chúng tôi</div>
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