
import Sanpham from "@/components/sanpham";
import { Button } from "@/components/ui/button";
import { ShoppingBasket } from "lucide-react";
import Image from "next/image";
// import Image from "next/image";
import Link from "next/link";




export default function Home() {
  return (
    <div className="mt-[50px]">
      {/* banner */}
      <div className="rounded-3xl h-[450px] w-[1450px] overflow-hidden relative ">
        <Image src="/banner2.png" alt="" width={10000} height={1000} className="object-cover object-top w-[100%] h-full"/>
        {/* button MUA SAM NGAY */}
        <Link href={"/products"}   className="absolute top-4/5 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-white  bg-green-600 p-3 rounded-lg ">MUA SẮM NGAY </Link>
      </div>
      {/* service */}
      {/* san pham moi */}
      <div className="p-10 flex flex-col items-center gap-10 bg-white rounded-4xl mt-[100px] mb-[100px]">
        <h1 className="text-5xl"> CÁC SẢN PHẨM MỚI</h1>
        {/* bọc các sản phẩm vầo flex  */}
        <div className="flex flex-row items-center gap-10 w-full">
          <Sanpham/>
 

        </div>
        {/* Xem tat ca */}
        <div className="cursor-pointer"><Link href="/products" className="cursor-pointer"><Button className="bg-green-700 w-[300px] cursor-pointer ">XEM TẤT CẢ</Button></Link></div>
      </div>



      {/* Top cac thuong hieu */}
      <div className="rounded-3xl bg-white p-[30px]">
        <h1 className="text-center text-3xl ">THUONG HIEU HANG DAU</h1>
        <div className="flex items-center justify-around">
          <img src="/logo.png" alt="" className="h-[220px] w0[220px] object-cover" />
          <img src="/logo.png" alt="" className="h-[220px] w0[220px] object-cover" />
          <img src="/logo.png" alt="" className="h-[220px] w0[220px] object-cover" />
          <img src="/logo.png" alt="" className="h-[220px] w0[220px] object-cover" />
          <img src="/logo.png" alt="" className="h-[220px] w0[220px] object-cover" />
        </div>
      </div>




      {/* Pho bien theo danh muc */}
      <div className="rounded-3xl bg-white mt-[80px] p-[50px] py-[60px] flex flex-col gap-y-8">
        <div className="text-center text-4xl">
          {/* title */}
          <h1 className="">SẢN PHẨM PHỔ BIẾN </h1>
          <h1>THEO DANH MỤC</h1>
        </div>

        {/* Cac danh muc */}
        <div className="flex items-center justify-between">
          <div className="text-white bg-black rounded-lg p-2">MOST POPULAR</div>  
          <div>BRAKING SYSTEM</div>  
          <div>AXLES & COMPONENTS</div>  
          <div>LOADING RAMS</div>  
          <div>MOST POPULAR</div>  
          <div>WHELL STRAPS</div>  

        </div>

        {/* cac san pham theo danh muc  */}
        <div className="flex gap-10">
          <Sanpham/>
      
        </div>
        <div className="m-auto">
          <Button className="bg-green-700 w-[300px] h-[50px] m-auto cursor-pointer "><Link href="/products" className="">XEM TẤT CẢ</Link></Button>
        </div>
      </div>





      {/* KPI Platform  */}
      <div className="flex items-center justify-around rounded-3xl bg-white p-[40px] mt-[80px]">
        <div className="flex flex-col items-center gap-5 w-[300px] text-center">
          <ShoppingBasket size={100} color="#1d903a" />
          <div>500+ SAN PHAM XANH </div>
          <div>From essentials to specialty components — all in one place.</div>
        </div>
        <div className="flex flex-col items-center gap-5 w-[300px] text-center">
          <ShoppingBasket size={100} color="#1d903a" />
          <div>500+ SAN PHAM XANH </div>
          <div>From essentials to specialty components — all in one place.</div>
        </div>
        <div className="flex flex-col items-center gap-5 w-[300px] text-center">
          <ShoppingBasket size={100} color="#1d903a" />
          <div>500+ SAN PHAM XANH </div>
          <div>From essentials to specialty components — all in one place.</div>
        </div>
      </div>


      {/* Contact sdt*/}
      <div className="text-center py-40 flex flex-col items-center justify-between gap-10">
        <div>
          <h1 className="text-4xl">Bạn cần hỗ trợ bởi ECOVERSE ?</h1>
          <h1 className="text-2xl">+84 839 328 490</h1>
        </div>
        <button className="bg-green-600 text-black px-3 py-2 rounded-sm">LIÊN HỆ NGAY</button>
      </div>


      {/* Contact email */}
      <div className="rounded-3xl bg-[url('/banner.png')] h-[500px] w-full text-white flex flex-col items-center gap-10 pt-[200px] ">
        <h1 className="text-4xl">ĐĂNG KÝ ĐỂ NHẬN TIN CỦA ECOVERSE</h1>
        <div>Tìm hiểu thông tin của các sản phẩm mới , các chương trình giảm giá và nhiều hơn nữa ...</div>
        <form action="/" className="flex w-[500px] gap-x-2">
          <input type="email" placeholder="Nhập email của bạn ..." className=" px-20 py-2 border-2 border-solid border-gray-200 rounded-sm"/>
          <button className="rounded-sm bg-green-800 px-10">ĐĂNG KÝ</button>
        </form>
      </div>
    </div>
  );
}
