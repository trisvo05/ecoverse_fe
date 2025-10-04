import Link from "next/link"

const Page = () =>{
    return (
        <div className="rounded-3xl bg-white flex gap-2 ">
            {/* Table */}
            <div className="w-[70%] px-[20px] py-[50px]">
                <h1 className="text-3xl text-center mb-[30px] ">Giỏ hàng của Bạn [5]</h1>
                <table className="table-auto border-collapse border border-gray-400 w-full text-sm ">
                    <thead className="bg-[#00c28dfc] text-white">
                        <tr>
                        <th className="border border-gray-400 px-4 py-2">Product</th>
                        <th className="border border-gray-400 px-4 py-2">Quantity</th>
                        <th className="border border-gray-400 px-4 py-2">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white hover:bg-gray-100">
                            <th className="border border-gray-400 px-4 py-2 flex gap-2">
                                <img src="/banner.png" alt=""  className="h-[70px] w-[70px] object-cover"/>
                                <div className="flex flex-col items-start gap-2">
                                    <div className="text-[13px] text-gray-700">CATEGORY</div>
                                    <div className="font-bold">007-186-00 - 10–12K Shoulder Bolt – For Disc Brakes Calipeasr | MT</div>
                                </div>
                            </th>
                            <td className="border border-gray-400 px-4 py-2">25</td>
                            <td className="border border-gray-400 px-4 py-2">$ 1000000vnd</td>
                        </tr>
                        <tr className="bg-white hover:bg-gray-100">
                            <th className="border border-gray-400 px-4 py-2 flex gap-2">
                                <img src="/banner.png" alt=""  className="h-[70px] w-[70px] object-cover"/>
                                <div className="flex flex-col items-start gap-2">
                                    <div className="text-[13px] text-gray-700">CATEGORY</div>
                                    <div className="font-bold">007-186-00 - 10–12K Shoulder Bolt – For Disc Brakes Calipeasr | MT</div>
                                </div>
                            </th>
                            <td className="border border-gray-400 px-4 py-2">25</td>
                            <td className="border border-gray-400 px-4 py-2">$ 1000000vnd</td>
                        </tr>
                        <tr className="bg-white hover:bg-gray-100">
                            <th className="border border-gray-400 px-4 py-2 flex gap-2">
                                <img src="/banner.png" alt=""  className="h-[70px] w-[70px] object-cover"/>
                                <div className="flex flex-col items-start gap-2">
                                    <div className="text-[13px] text-gray-700">CATEGORY</div>
                                    <div className="font-bold">007-186-00 - 10–12K Shoulder Bolt – For Disc Brakes Calipeasr | MT</div>
                                </div>
                            </th>
                            <td className="border border-gray-400 px-4 py-2">25</td>
                            <td className="border border-gray-400 px-4 py-2">$ 1000000vnd</td>
                        </tr>
                    </tbody>
                </table>
            </div>


            {/* Thanh toan */}
            <div className="w-[30%] px-[50px]   py-[100px]  ">
                <div className="flex justify-between mb-[20px] text-2xl">
                    <div>Tổng giá trị</div>
                    <div>50000 vnd</div>
                </div>
                <Link className=" text-black bg-green-800" href={"/shopping/checkout"}>
                    <div className="bg-[#00c28dfc] text-black rounded-sm py-[10px] text-center font-medium">THANH TOÁN</div>
                </Link>
            </div>
            

        </div>
    )
}
export default Page