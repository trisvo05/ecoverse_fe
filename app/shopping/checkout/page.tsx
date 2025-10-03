import Sanpham2 from "@/components/sanpham2"

const Page = ()  =>{
    return (
        <div className="flex gap-x-10  mt-[-60px] mx-[-32px] bg-[rgb(234,234,234)] border-t-1 border-solid border-gray-300">
            {/* form nhap thong tin don hang ( thong tin ca nhan  , van chuyen ) */}
            <div className="w-1/2 h-[1200px] bg-white">

            asdajsdj
            
            
            </div>





            {/* thong tin don hang  */}
            <div className="sticky top-0 right-0 w-1/2 h-full  bg-[rgb(234,234,234)]  w-[500px] ">
                {/* cac don hang */}
                <div className="text-2xl  mb-5 mt-5">TỔNG ĐƠN HÀNG</div>
                <div className="w-[500px] h-[400px] overflow-scroll overflow-x-hidden border-y-1 border-solid border-gray-300">
                    <Sanpham2/>
                    <Sanpham2/>
                    <Sanpham2/>
                    <Sanpham2/>
                </div>
                {/* tinh toan so tien  */}
                <div className="mt-10">
                    <div className="flex justify-between">
                        <div>Sản phẩm</div> 
                        <div>512000 đ</div> 
                    </div>
                    <div className="flex justify-between">
                        <div>Phí Vận chuyển</div> 
                        <div>512000 đ</div> 
                    </div>
                    <div className="flex justify-between">
                        <div>Giảm giá</div> 
                        <div>- 12000 đ</div> 
                    </div>
                    <div className="flex justify-between font-bold text-2xl">
                        <div >Tổng </div> 
                        <div>512000 đ</div> 
                    </div>
                </div>
            </div>   

        </div>
    )
}
export default Page 