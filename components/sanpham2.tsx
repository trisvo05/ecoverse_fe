"use client";
import Quantity from "./quantity_edit";

const mockProducts = [
  {
    id: 1,
    image: "https://quatang3a.com/wp-content/uploads/2024/08/230-1200x1200.jpg", // bình giữ nhiệt
    category: "Đồ dùng xanh",
    name: "Bình giữ nhiệt tái chế EcoCup",
    price: 250000,
  },
  {
    id: 2,
    image: "https://bizweb.dktcdn.net/thumb/1024x1024/100/424/988/products/ban-chai-tre.jpg?v=1662954099870", // bàn chải tre
    category: "Chăm sóc cá nhân",
    name: "Bàn chải tre thân thiện môi trường",
    price: 45000,
  },
  {
    id: 3,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8WmM-pgzI5Gb4foty_R3ZNr7RrIQUzUdLPw&s", // túi tote
    category: "Thời trang bền vững",
    name: "Túi tote vải tái chế EcoBag",
    price: 120000,
  },

];

const Sanpham2 = () => {
  return (
    <div className="flex flex-col gap-y-4 p-4">
      {mockProducts.map((product) => (
        <div key={product.id} className="border rounded-lg p-3 shadow-sm hover:shadow-md transition">
          <div className="flex justify-around gap-x-2">
            <div className="h-[100px] overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover h-[100px] w-[100px] rounded-sm"
              />
            </div>

            <div className="w-[250px]">
              <div className="text-[13px] text-gray-700">{product.category}</div>
              <div className="font-bold">
                {product.name}
              </div>
            </div>

            <div className="text-gray-700 font-medium">
              {product.price.toLocaleString("vi-VN")} VND
            </div>
          </div>

          {/* Tăng giảm số lượng */}
          <div className="mt-2 w-full ml-[120px]">
            <Quantity />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sanpham2;
