import Sanpham from "@/components/sanpham";

const Page = () =>{
    return (
        <div>
            <div className="w-full h-full rounded-3xl bg-white p-[50px] flex">
                {/* img  */}
                <div className="w-[50%] h-[500px]">
                    <img src="/banner.png" alt="" className="object-cover"/>   
                </div>
                
                {/* detail */}
                <div className="p-[20px] w-1/2">
                    <div className="text-[15px] text-gray-600 mb-[20px]">CATEGORY</div>
                    <h1 className="text-4xl w-3/4">28-67-4 - Front Hanger – For 3 Slipper Springs – 6-1/4 Tall – 1 Bolt Hole | DXT</h1>
                    <div className="my-[20px]">
                        <div className="text-gray-600">So danh gia : 25</div>
                        <div className="text-2xl">Gia : 1000000 VND</div>
                        <div className="text-green-500">Con hang</div>
                    </div>
                    

                    {/* add to cart */}
                    <div className="flex items-center ">
                        {/* So don hang */}
                        <div className="flex items-center justify-around py-2 px-10 gap-5 border-solid border-2 border-gray-200 w-1/4 rounded-[6px]">
                            <button>-</button>
                            <span>1</span>
                            <button>+</button>
                        </div>
                        <div className="border-solid border-2 border-gray-200 w-3/4 ml-5 bg-green-400 py-2 px-10 rounded-[6px]">
                            <button>THEM VAO GIO HANG</button>
                        </div>
                    </div>
                    {/* Button mua ngay  */}
                    <button className="m-auto w-full h-[50px] py-2 px-10 rounded-[6px] bg-blue-300 mt-[10px]">MUA NGAY</button>



                    {/* Mo ta  */}
                    <div className="mt-[30px]">
                        <h2 className="mb-[10px] text-2xl">Description</h2>
                        <div>This heavy-duty shoulder bolt is designed to secure disc brake calipers on 10,000–12,000 lb trailer axles. Specifically engineered to fit Dexter hydraulic disc brake systems, it ensures precise caliper alignment and long-term durability.
                        
                        </div>
                    </div>

                </div>



            
            </div>


            {/* THanh mua den -> goi add to cart */}
            <div className="h-[80px] w-[100vw] bg-black flex items-center justify-around  ml-[-50px] mr-[-50px] mt-[50px] ">
                <div className="text-white">tensanpham : 007-186-00 - 10–12K Shoulder Bolt – For Disc Brakes Caliper | MT</div>
                <button className="p-3 bg-green-700 text-black rounded-lg">Them vao gio hang</button>
            </div>



            {/* San pham tuong tu  */}
            <div className="rounded-3xl p-[70px] bg-white">
                <h1 className="mb-[20px] text-center text-4xl">CAC SAN PHAM TUONG TU </h1>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-5">
                    <Sanpham/>
                    <Sanpham/>
                    <Sanpham/>
                    <Sanpham/>
                    <Sanpham/>
                    <Sanpham/>

                </div>
            </div>


            {/* SECTION : REVIEWER */}
            <div className="rounded-3xl h-[500px] w-full bg-white mt-[50px]">DANH GIA CUA KHACH HANG</div>
        </div>

        
    )
}
export default Page ;