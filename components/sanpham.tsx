"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const Sanpham = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // trạng thái loading
  const [error, setError] = useState(null); // trạng thái lỗi

  const fetchProductData = async () => {
    try {
      const response = await axios.post(
        "https://ecoverse.namtech.me/api/tmdt/products/search",
        {
          jsonrpc: "2.0",
          method: "call",
          params: { co_chung_chi: true, limit: 10 },
        }
      );

      const fetchedProducts = response?.data?.result?.data?.products || [];
      setProducts(fetchedProducts);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Không thể tải dữ liệu sản phẩm. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-gray-500">Đang tải sản phẩm...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {products.length === 0 ? (
        <div className="text-gray-600">Không có sản phẩm nào.</div>
      ) : (
        products.map((p, index) => (
          <Link  href={`/products/${p.id}`} 
            key={p.id || index}
            className="w-[220px] h-[420px] bg-[#F9FAFB] rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
          >
            <img
              src={p.hinh_anh || "/banner.png"}
              alt={p.ten_san_pham}
              className="w-full h-[200px] object-cover"
            />
            <div className="p-4 flex flex-col gap-3">
              <div className="text-[13px]  text-green-700  font-bold">
                {p.chung_chi_xanh?.co_chung_chi ? "CÓ CHỨNG CHỈ XANH" : ""}
              </div>
              <div className="text-[16px] font-semibold text-gray-800 line-clamp-2">
                {p.ten_san_pham?.toUpperCase() || "SẢN PHẨM"}
              </div>
              <div className="text-[15px]  ">
                $ {new Intl.NumberFormat("vi-VN").format(p.gia_ban || 0)} VND
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default Sanpham;
