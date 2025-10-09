import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User } from "lucide-react"
import Cookies from "js-cookie"; 
import Link from "next/link";
const Profile = () =>{
    const sessionId = Cookies.get("session_id");
    console.log("session id ",sessionId)
    if (!sessionId) return (
        <DropdownMenu>
            <DropdownMenuTrigger><User className="cursor-pointer" /></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Đăng nhập ngay !!!</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={"https://ecoverse.namtech.me/web/login"}><DropdownMenuItem>Đăng nhập</DropdownMenuItem></Link>
                <Link href={"https://ecoverse.namtech.me/web/login"}><DropdownMenuItem>Đăng ký</DropdownMenuItem></Link>
            </DropdownMenuContent>
        </DropdownMenu>
    )
    return (
        <DropdownMenu>
            <DropdownMenuTrigger><User className="cursor-pointer" /></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={"https://ecoverse.namtech.me/odoo"}><DropdownMenuItem>Dashboard</DropdownMenuItem></Link>
                <Link href={"https://ecoverse.namtech.me/odoo/tmdt.users"}><DropdownMenuItem> Thông tin cá nhân</DropdownMenuItem></Link>
                <Link href={"https://ecoverse.namtech.me/odoo/action-159"}><DropdownMenuItem>Đơn hàng của tôi</DropdownMenuItem></Link>
                <Link href={"https://ecoverse.namtech.me/odoo/action-193"}><DropdownMenuItem>Điểm xanh và Tiết kiệm CO2</DropdownMenuItem></Link>    
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export default Profile