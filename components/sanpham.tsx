"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Product = {
  id: string | number;
  hinh_anh_url?: string;
  ten_san_pham?: string;
  gia_ban?: number;
  chung_chi_xanh?: {
    co_chung_chi?: boolean;
  };
};

const Sanpham = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- Mock data ---
  const mockProducts: Product[] = [
    {
      id: 1,
      hinh_anh_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOW0Tp3mMmwoYNw5FGR8UFJimxuClJKqFtSg&s",
      ten_san_pham: "Nến thơm thiên nhiên EcoCandle",
      gia_ban: 199000,
      chung_chi_xanh: { co_chung_chi: true },
    },
    {
      id: 2,
      hinh_anh_url:
        "https://image.made-in-china.com/202f0j00kbuqLcUrvtoP/Recycled-Cotton-Tote-Bag-Natural-Color-Blank-Friendly-Bags.webp",
      ten_san_pham: "Túi vải tái chế ReBag",
      gia_ban: 159000,
      chung_chi_xanh: { co_chung_chi: true },
    },
    {
      id: 3,
      hinh_anh_url:
        "https://cdn.tgdd.vn/Products/Images/5205/93177/phich-giu-nhiet-elmich-inox-304-500ml-n5-1-1-org.jpg",
      ten_san_pham: "Bình giữ nhiệt Inox EcoThermo",
      gia_ban: 299000,
      chung_chi_xanh: { co_chung_chi: true },
    },
    {
      id: 4,
      hinh_anh_url:
        "https://quatang3a.com/wp-content/uploads/2020/06/coc-lua-mach-than-thien-moi-truong-2.jpg",
      ten_san_pham: "Cốc sứ thân thiện môi trường",
      gia_ban: 129000,
      chung_chi_xanh: { co_chung_chi: false },
    },
    {
      id: 5,
      hinh_anh_url:
        "https://growgreen.com.vn/wp-content/uploads/2021/04/Ong-hut-tre-co-tot-khong.jpg",
      ten_san_pham: "Ống hút tre BambooStraw",
      gia_ban: 49000,
      chung_chi_xanh: { co_chung_chi: true },
    },
    {
      id: 6,
      hinh_anh_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1_hC6Tnrq8Slf8b06CoArBmiIe6ZRu5dWwA&s",
      ten_san_pham: "Bàn chải tre EcoBrush",
      gia_ban: 59000,
      chung_chi_xanh: { co_chung_chi: true },
    },
  ];

  // --- Giả lập fetch dữ liệu ---
  const fetchProductData = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 800)); // delay nhẹ cho hiệu ứng loading
      setProducts(mockProducts);
    } catch (err) {
      setError("Không thể tải dữ liệu sản phẩm.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  if (loading)
    return (
      <div className="text-center mt-10 text-gray-500">Đang tải sản phẩm...</div>
    );

  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <>
      {products.length === 0 ? (
        <div className="text-gray-600">Không có sản phẩm nào.</div>
      ) : (
        products.slice(0, 6).map((p, index) => (
          <Link
            href={`/products/${p.id}`}
            key={p.id || index}
            className="w-[220px] h-[420px] bg-[#F9FAFB] rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
          >
            <img
              src={p.hinh_anh_url || "https://placehold.co/800x600"}
              alt={p.ten_san_pham}
              className="w-full h-[200px] object-cover"
            />
            <div className="p-4 flex flex-col gap-3">
              <div className="text-[13px] text-green-700 font-bold">
                {p.chung_chi_xanh?.co_chung_chi ? "CÓ CHỨNG CHỈ XANH" : ""}
              </div>
              <div className="text-[16px] font-semibold text-gray-800 line-clamp-2">
                {p.ten_san_pham?.toUpperCase() || "SẢN PHẨM"}
              </div>
              <div className="text-[15px]">
                {new Intl.NumberFormat("vi-VN").format(p.gia_ban || 0)} VND
              </div>
            </div>
          </Link>
        ))
      )}
    </>
  );
};

export default Sanpham;
