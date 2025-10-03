import Quantity from "./quantity_edit"

const Sanpham2 =() =>{
    return (
        <div>
                                        <div className="flex justify-around gap-x-2">
                                            <div className="h-[100px] overflow-hidden">
                                                <img src="/banner.png" alt=""  className="object-cover h-[100px] w-[100px] rounded-sm"/>
                                            </div>
                                            
                                            <div className="w-[250px]">
                                                <div className="text-[13px] text-gray-700">CATEGORY</div>
                                                <div className="font-bold">28-67-4 - Front Hanger – For 3 Slipper Springs – 6-1/4 Tall – 1 Bolt Hole | DXT</div>
                                            </div>
                                            <div>
                                                $ 120000 VND
                                            </div>
                                        </div>   
                                        {/* Tang giam so luong hang */}
                                        <div className="mt-1 w-full ml-[120px]"><Quantity/></div>
                                    </div>
    )
}
export default Sanpham2 ;