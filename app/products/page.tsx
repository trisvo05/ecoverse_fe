// import Dropdown ShadcnUI 
import Sanpham from "@/components/sanpham";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


// import panigation 
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"


import { ArrowDown01, ArrowLeft, ArrowRight } from "lucide-react";
const Page = ()  =>{
    return <div className="rounded-3xl h-full w-full bg-white ">
        {/* tieu de  */}
        <h1>SAN PHAM</h1>



        {/*product-detail  */}
        <div className="flex items-center justify-between">
            {/* product-detail__left */}
            <div className="w-[20%] p-10">Filter Section</div>
            {/* product-detail__right */}
            <div className=" w-[80%] p-10 ">
                {/* so san pham + filter dropdown  */}
                <div className="flex w-[350px] justify-between items-center ml-auto mb-[50px] ">
                    <p>12 San pham</p>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex w-[200px] justify-between border-solid border-gray-200 border-2 p-2">
                            Loc san pham 
                            <ArrowDown01 />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Billing</DropdownMenuItem>
                            <DropdownMenuItem>Team</DropdownMenuItem>
                            <DropdownMenuItem>Subscription</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>



                {/*  Cac san pham  */}
                <div className="">
                    <Sanpham/>
  
                </div>



                {/* phan trang panigation */}
                <Pagination className="mt-[50px]">
                    <PaginationContent>
                        <PaginationItem className="border-2 border-solide border-gray-200 rounded-lg">
                            <ArrowLeft />
                        </PaginationItem>
                        <PaginationItem  className="border-2 border-solide border-gray-200 rounded-lg">
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem  className="border-2 border-solide border-gray-200 rounded-lg">
                            <PaginationLink href="#">2</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                             <ArrowRight />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
            

        </div>
    </div>
}
export default Page ;
