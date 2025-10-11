import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();
  const sessionId = Cookies.get("session_id");

  const handleLogout = () => {
    // Xóa session_id khỏi cookie
    Cookies.remove("session_id");

    // (Tuỳ chọn) Xóa thêm các cookies khác nếu cần
    // Cookies.remove("user_id");
    // Cookies.remove("access_token");

    // Chuyển hướng đến trang đăng nhập hoặc reload
    router.push("/login");
  };

  if (!sessionId)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <User className="cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Đăng nhập ngay !!!</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="/login">
            <DropdownMenuItem>Đăng nhập</DropdownMenuItem>
          </Link>
          <Link href="https://ecoverse.namtech.me/web/signup">
            <DropdownMenuItem>Đăng ký</DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <User className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="https://ecoverse.namtech.me/odoo">
          <DropdownMenuItem>Dashboard</DropdownMenuItem>
        </Link>
        <Link href="https://ecoverse.namtech.me/odoo/tmdt.users">
          <DropdownMenuItem>Thông tin cá nhân</DropdownMenuItem>
        </Link>
        <Link href="https://ecoverse.namtech.me/odoo/action-159">
          <DropdownMenuItem>Đơn hàng của tôi</DropdownMenuItem>
        </Link>
        <Link href="https://ecoverse.namtech.me/odoo/action-193">
          <DropdownMenuItem>Điểm xanh và Tiết kiệm CO2</DropdownMenuItem>
        </Link>

        {/* Nút đăng xuất */}
        <DropdownMenuItem onClick={handleLogout}>
          ... Đăng xuất ...
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
