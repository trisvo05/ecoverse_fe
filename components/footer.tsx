'use client'
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react"
import { usePathname } from "next/navigation";
// import { useRouter } from "next/navigation";
// import { useRouter } from "next/router"

const Footer = () =>{
    const hideFooter = usePathname() 
    // const hideFooter = usePathname() === "/shopping/checkout"

    if (hideFooter === "/shopping/checkout") return null;
    else if (hideFooter === "/login") return null;
    return (
        <div className="mt-[100px] mx-[-32px] mb-[-32px] ">
            <img src="/logo.png" alt="" className="h-[400px] w-[400px] object-cover m-auto mb-[50px]"/>
            <footer className="bg-[#1b1b1b] text-white   h-[400px]">
                {/* <!-- Main Footer Content --> */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        
                        {/* <!-- Company Info --> */}
                        <div>
                            <div className="flex items-center mb-4">
                                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-2">
                                    <i className="fas fa-code text-white text-sm"><img src="logo.png" alt="" /></i>
                                </div>
                                <h3 className="text-xl font-bold">EcoVerse</h3>
                            </div>
                            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                                Dự án Sàn thương mại điện tử xanh được xây dựng với sứ mệnh trở thành nền tảng trung gian đầu tiên tại Việt Nam chuyên biệt cho các sản phẩm thân thiện với môi trường, đồng thời thúc đẩy tiêu dùng bền vững trong cộng đồng. Sàn hoạt động theo mô hình B2C, kết nối trực tiếp các nhà sản xuất, nhà cung cấp sản phẩm xanh với người tiêu dùng, tạo ra một hệ sinh thái thương mại minh bạch, an toàn và bền vững
                            </p>
                            <div className="flex space-x-3">
                                <a href="https://www.facebook.com/tri.vo.863244/" className="w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors duration-300">
                                    <i className="fab fa-facebook-f text-sm"><Facebook strokeWidth={1}/></i>
                                </a>
                                <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors duration-300">
                                    <i className="fab fa-instagram text-sm"><Instagram strokeWidth={1} /></i>
                                </a>
                                <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-300">
                                    <i className="fab fa-twitter text-sm"><Youtube strokeWidth={1} /></i>
                                </a>
                                <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors duration-300">
                                    <i className="fab fa-linkedin-in text-sm"><Linkedin strokeWidth={1} /></i>
                                </a>
                            </div>
                        </div>

                        {/* <!-- Quick Links --> */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-600">Liên kết nhanh</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center text-sm"><i className="fas fa-chevron-right text-xs mr-2 text-blue-400"></i>Trang chủ</a></li>
                                <li><a href="/ecoverse/about_me" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center text-sm"><i className="fas fa-chevron-right text-xs mr-2 text-blue-400"></i>Về chúng tôi</a></li>
                                <li><a href="#services" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center text-sm"><i className="fas fa-chevron-right text-xs mr-2 text-blue-400"></i>Dịch vụ</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center text-sm"><i className="fas fa-chevron-right text-xs mr-2 text-blue-400"></i>Dự án</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center text-sm"><i className="fas fa-chevron-right text-xs mr-2 text-blue-400"></i>Blog</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center text-sm"><i className="fas fa-chevron-right text-xs mr-2 text-blue-400"></i>Liên hệ</a></li>
                            </ul>
                        </div>

                        {/* <!-- Services --> */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-600">Dịch vụ</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center text-sm"><i className="fas fa-chevron-right text-xs mr-2 text-blue-400"></i>Thương mại điện tử xanh</a></li>
                                <li><a href="/old_products" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center text-sm"><i className="fas fa-chevron-right text-xs mr-2 text-blue-400"></i>Tái thương mại Xanh</a></li>
                                <li><a href="https://ecofundx.vercel.app/" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center text-sm"><i className="fas fa-chevron-right text-xs mr-2 text-blue-400"></i>Gọi vốn cộng đồng cho sản phẩm bền vững</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center text-sm"><i className="fas fa-chevron-right text-xs mr-2 text-blue-400"></i>Thúc đẩy xanh</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center text-sm"><i className="fas fa-chevron-right text-xs mr-2 text-blue-400"></i>ESG</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center text-sm"><i className="fas fa-chevron-right text-xs mr-2 text-blue-400"></i>Phát triển bền vững</a></li>
                            </ul>
                        </div>

                        {/* <!-- Contact Info --> */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-600">Liên hệ</h3>
                            <div className="space-y-3">
                                <div className="flex items-start">
                                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                                        <i className="fas fa-map-marker-alt text-xs text-white"></i>
                                    </div>
                                    <p className="text-gray-300 text-sm">PTIT , Km10 Nguyễn Trãi , Hà Đông , Hà Nội</p>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                                        <i className="fas fa-phone text-xs text-white"></i>
                                    </div>
                                    <a href="tel:+84839328490" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">+84 839 328 490</a>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                                        <i className="fas fa-envelope text-xs text-white"></i>
                                    </div>
                                    <a href="mailto:minhtrivo2005gg@gmail.com" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">minhtrivo2005gg@gmail.com</a>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                                        <i className="fas fa-clock text-xs text-white"></i>
                                    </div>
                                    <p className="text-gray-300 text-sm">T2-T6: 8:00 - 18:00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Newsletter Section --> */}
                {/* <div className="border-t border-gray-700 bg-gray-800">
                    </div> */}
                </footer>

              {/* bootom footer */}
                <div className="border-t border-gray-700 bg-black ">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <p className="text-gray-400 text-sm text-center md:text-left mb-2 md:mb-0">
                                © 2025 EcoVerse Team. All rights reserved
                            </p>
                            <div className="flex space-x-6">
                                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Chính sách bảo mật</a>
                                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Điều khoản sử dụng</a>
                                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Cookie</a>
                            </div>
                        </div>
                    </div>
                </div>        
        </div>
    )
}
export default Footer