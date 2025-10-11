const Page = () =>{
    return (
        <div className=" rounded-3xl overflow-hidden flex flex-col gap-y-10">
            <h1 className="text-center text-4xl font-bold text-green-500">Chúng tôi là ai ?</h1>
            <p className=" w-[70%] m-auto">Dự án <span className="bg-gradient-to-r from-green-300 via-yellow-200 to-green-400 text-green-900 font-semibold px-2 py-1 rounded-xl shadow-sm">
            Sàn thương mại điện tử xanh</span> được xây dựng với sứ mệnh trở thành nền tảng trung gian đầu tiên tại Việt Nam chuyên biệt cho các sản phẩm thân thiện với môi trường, đồng thời thúc đẩy tiêu dùng bền vững trong cộng đồng. Sàn hoạt động theo mô hình B2C, kết nối trực tiếp các nhà sản xuất, nhà cung cấp sản phẩm xanh với người tiêu dùng, tạo ra một hệ sinh thái thương mại minh bạch, an toàn và bền vững.
            <br/><br/> Điểm nổi bật của dự án là tích hợp nhiều tính năng mới như chấm điểm tiêu dùng xanh để khuyến khích hành vi tiêu dùng có trách nhiệm, tái thương mại cho phép người dùng bán lại sản phẩm còn sử dụng được và quỹ trồng rừng gắn liền với mỗi giao dịch để tạo tác động tích cực cụ thể đến môi trường. Đặc biệt, EcoVerse có một quy trình kiểm định chất lượng chặt chẽ, bảo đảm mọi sản phẩm xanh được đưa lên nền tảng đều đạt chuẩn về độ an toàn, nguồn gốc và tính bền vững, từ đó xây dựng niềm tin tuyệt đối cho người tiêu dùng. 
            <br/><br></br>Với đội ngũ sáng lập gồm các sinh viên trẻ thuộc chuyên ngành tài chính và công nghệ thông tin, dự án mang trong mình khát vọng khởi nghiệp, tinh thần sáng tạo, cùng cam kết đóng góp vào mục tiêu phát triển bền vững của đất nước. Sàn thương mại điện tử xanh không chỉ là một kênh mua sắm, mà còn là cầu nối giúp xây dựng cộng đồng tiêu dùng xanh tại Việt Nam, góp phần đưa kinh tế xanh trở thành xu thế chủ đạo trong tương lai.</p>
            <div className="flex justify-center"><img src="/about_me.jpeg" alt="" className="rounded-3xl h-[550px] w-[1000px] " /></div>
            
        </div>
    )
}
export default Page ;