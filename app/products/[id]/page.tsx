"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ShoppingCart,
  CreditCard,
  Star,
  Leaf,
  Package,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface ProductData {
  ten_san_pham: string;
  danh_muc?: { ten_danh_muc: string }[];
  loai_san_pham?: string;
  hinh_anh_chinh?: { url: string };
  chung_chi_xanh?: { co_chung_chi: boolean };
  mo_ta?: string;
  gia_ban: number;
  so_luong_ton_kho: number;
}

const ProductDetailPage = ({ id = 9 }: { id?: number }) => {

  const [productData, setProductData] = useState<ProductData | null>(null);

  interface ReviewsData {
    rating_stats: {
      average_rating: number;
      total_reviews: number;
    };
    // Add more fields if needed
  }

  const [reviewsData, setReviewsData] = useState<ReviewsData | null>(null);
  const [quantity, setQuantity] = useState(1);
//   const [reviewRating, setReviewRating] = useState(0);
//   const [reviewText, setReviewText] = useState("");
//   const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(true);

  // Format helpers
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

//   const formatDate = (dateString: string) =>
//     new Date(dateString).toLocaleDateString("vi-VN", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });

  const renderStars = (rating: number) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );

  // Fetch API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          `https://ecoverse.namtech.me/api/tmdt/products/${id}`,
          {
            "params":{}
          }
  
        );
        console.log(response)

        if (response.data?.result?.success) {
          setProductData(response.data.result.data);
        } else {
          console.error("Không lấy được dữ liệu sản phẩm:", response.data);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await axios.post(
          `https://ecoverse.namtech.me/api/tmdt/products/${id}/reviews`,
          {
            params: {
                limit: 10,
                offset: 0,
                sort: "newest"
            },
            headers: {
              "Accept": "application/json",
            }
          }
        );
        if (res.data?.result?.success) {
          setReviewsData(res.data.result.data);
        }
        
      } catch (err) {
        console.error("Lỗi khi lấy đánh giá:", err);
      }
    };

    fetchProduct();
    fetchReviews();
  }, [id]);

  // Handle actions
  const handleAddToCart = () => alert(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`);
  const handleCheckout = () => alert(`Tiến hành thanh toán ${quantity} sản phẩm!`);
//   const handleSubmitReview = () => {
//     if (reviewRating === 0) return alert("Vui lòng chọn số sao đánh giá!");
//     if (reviewText.trim() === "") return alert("Vui lòng nhập nội dung đánh giá!");
//     alert(`Đã gửi đánh giá ${reviewRating} sao:\n${reviewText}`);
//     setReviewRating(0);
//     setReviewText("");
//   };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Đang tải dữ liệu sản phẩm...
      </div>
    );

  if (!productData)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-lg">
        Không tìm thấy dữ liệu sản phẩm.
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-gray-600 mb-6">
          Trang chủ / {productData?.danh_muc?.[0]?.ten_danh_muc || "Danh mục"} /{" "}
          {productData.ten_san_pham}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Chi tiết sản phẩm */}
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <CardTitle className="font-bold text-gray-900 mb-2">
                    {productData.ten_san_pham}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {productData?.danh_muc?.[0]?.ten_danh_muc}
                  </CardDescription>
                </div>
                {productData.loai_san_pham === "new" && (
                  <Badge className="bg-green-500">Mới</Badge>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Hình ảnh */}
              <div className="relative rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={productData.hinh_anh_chinh?.url}
                  alt={productData.ten_san_pham}
                  className="w-full h-80 object-cover"
                />
                {productData.chung_chi_xanh?.co_chung_chi && (
                  <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full flex items-center gap-1">
                    <Leaf className="w-4 h-4" />
                    <span className="font-medium">Xanh</span>
                  </div>
                )}
              </div>

              {/* Mô tả */}
              <div className="mt-4 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Mô tả sản phẩm</h3>
                <p className="text-gray-700 leading-relaxed">{productData.mo_ta}</p>
              </div>

              {/* Giá và tồn kho */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-green-600">
                    {formatPrice(productData.gia_ban)}
                  </span>
                  <Badge variant="outline">
                    <Package className="w-4 h-4 mr-1" />
                    Còn {productData.so_luong_ton_kho} sản phẩm
                  </Badge>
                </div>
              </div>

              <Separator />

              {/* Số lượng & nút */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="font-medium text-gray-700">Số lượng:</span>
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 hover:bg-gray-100 transition"
                    >
                      -
                    </button>
                    <span className="px-6 py-2 border-x">{quantity}</span>
                    <button
                      onClick={() =>
                        setQuantity(Math.min(productData.so_luong_ton_kho, quantity + 1))
                      }
                      className="px-4 py-2 hover:bg-gray-100 transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleAddToCart}
                    variant="outline"
                    className="flex-1 h-12 text-base font-semibold"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Thêm vào giỏ
                  </Button>
                  <Button
                    onClick={handleCheckout}
                    className="flex-1 h-12 text-base font-semibold bg-green-600 hover:bg-green-700"
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    Thanh toán
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Đánh giá */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-bold">Đánh giá sản phẩm</CardTitle>
            </CardHeader>
            <CardContent>
              {!reviewsData ? (
                <p className="text-gray-500">Chưa có đánh giá.</p>
              ) : (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {renderStars(Math.round(reviewsData.rating_stats.average_rating))}
                    <span className="text-gray-700 font-medium">
                      {reviewsData.rating_stats.average_rating}/5
                    </span>
                  </div>
                  <p className="text-gray-600">
                    {reviewsData.rating_stats.total_reviews} đánh giá từ khách hàng
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
