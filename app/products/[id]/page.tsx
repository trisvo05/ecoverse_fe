"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingCart, CreditCard, Star, Leaf, Award, Package, TrendingDown, Calendar, User, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useParams } from 'next/navigation';

const ProductDetailPage = () => {
  type ProductData = {
    ten_san_pham: string;
    danh_muc?: { ten_danh_muc: string }[];
    loai_san_pham?: string;
    hinh_anh_chinh?: { url?: string };
    chung_chi_xanh?: {
      co_chung_chi?: boolean;
      loai_chung_chi_display?: string;
      diem_xanh?: number;
      to_chuc_cap?: { ten_to_chuc?: string; uy_tin?: number };
    };
    gia_ban: number;
    so_luong_ton_kho: number;
    voucher_kha_dung?: { ten_voucher: string; so_voucher_con_lai: number }[];
    thong_tin_co2?: {
      co_thong_tin?: boolean;
      phan_tich?: { icon?: string; thong_diep?: string };
      phan_tram_giam_co2?: number;
      co2_san_pham?: number;
      co2_san_pham_thong_thuong?: number;
    };
  };
  
  const [productData, setProductData] = useState<ProductData | null>(null);
  
  type Review = {
    id: string | number;
    user?: { ten_user?: string };
    diem_danh_gia: number;
    nhan_xet: string;
    ngay_mua: string | Date;
    so_luong_mua: number;
  };

  type ReviewsData = {
    rating_stats?: {
      total_reviews?: number;
      average_rating?: number;
      rating_distribution?: { [key: number]: number };
    };
    reviews?: Review[];
  };

  const [reviewsData, setReviewsData] = useState<ReviewsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const params = useParams();
  const { id } = params; // id từ URL
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          `https://ecoverse.namtech.me/api/tmdt/products/${id}`,
          {
            params: {}
          },
          {
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            }
          }
        );
        // If you want to replace the URL string, do it directly (not with map)
        const updatedProductData = {
          ...productData,
          hinh_anh_chinh: {
            ...productData?.hinh_anh_chinh,
            url: productData?.hinh_anh_chinh?.url
              ? productData.hinh_anh_chinh.url.replace("http://localhost:3000", "https://ecoverse.com")
              : undefined
          }
        };
        
        console.log("Product response:", response);

        if (response.data?.result?.success) {
          setProductData(response.data.result.data);
        } else {
          console.error("Không lấy được dữ liệu sản phẩm:", response.data);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API sản phẩm:", error);
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
            }
          },
          {
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            }
          }
        );
        
        console.log("Reviews response:", res);
        
        if (res.data?.result?.success) {
          setReviewsData(res.data.result.data);
        }
      } catch (err) {
        console.error("Lỗi khi lấy đánh giá:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    fetchReviews();
  }, [id]);

  const formatPrice = (price:number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const formatDate = (dateInput: string | Date) => {
    const dateObj = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    return dateObj.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating:number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const handleAddToCart = () => {
    alert(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`);
  };

  const handleCheckout = () => {
    alert(`Tiến hành thanh toán ${quantity} sản phẩm!`);
  };

  const handleSubmitReview = () => {
    if (reviewRating === 0) {
      alert('Vui lòng chọn số sao đánh giá!');
      return;
    }
    if (reviewText.trim() === '') {
      alert('Vui lòng nhập nội dung đánh giá!');
      return;
    }
    
    alert(`Đã gửi đánh giá ${reviewRating} sao:\n${reviewText}`);
    setReviewRating(0);
    setReviewText('');
  };

  if (loading || !productData || !reviewsData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Đang tải dữ liệu sản phẩm...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-6">
          Trang chủ / {productData.danh_muc?.[0]?.ten_danh_muc || 'Sản phẩm'} / {productData.ten_san_pham}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Chi tiết sản phẩm */}
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                    {productData.ten_san_pham}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {productData.danh_muc?.[0]?.ten_danh_muc}
                  </CardDescription>
                </div>
                {productData.loai_san_pham === 'new' && (
                  <Badge className="bg-green-500">Mới</Badge>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Hình ảnh */}
              <div className="relative rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={productData.hinh_anh_chinh?.url || 'https://placehold.co/800x600'}
                  alt={productData.ten_san_pham}
                  className="w-full h-80 object-cover"
                />
                {productData.chung_chi_xanh?.co_chung_chi && (
                  <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full flex items-center gap-1">
                    <Leaf className="w-4 h-4" />
                    <span className="text-sm font-medium">Xanh</span>
                  </div>
                )}
              </div>

              {/* Giá và tồn kho */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-3xl font-bold text-green-600">
                    {formatPrice(productData.gia_ban)}
                  </span>
                  <Badge variant="outline" className="text-sm">
                    <Package className="w-4 h-4 mr-1" />
                    Còn {productData.so_luong_ton_kho} sản phẩm
                  </Badge>
                </div>
                
                {/* Voucher */}
                {productData.voucher_kha_dung && productData.voucher_kha_dung.length > 0 && (
                  <div className="mt-3 p-3 bg-white rounded border-2 border-dashed border-orange-300">
                    <div className="flex items-center gap-2 text-orange-600">
                      <Award className="w-5 h-5" />
                      <span className="font-semibold">
                        {productData.voucher_kha_dung[0].ten_voucher}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Còn {productData.voucher_kha_dung[0].so_voucher_con_lai} voucher
                    </p>
                  </div>
                )}
              </div>

              {/* Thông tin CO2 */}
              {productData.thong_tin_co2?.co_thong_tin && (
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{productData.thong_tin_co2.phan_tich?.icon || '🌱'}</span>
                    <div className="flex-1">
                      <h4 className="font-semibold text-green-800 mb-2">
                        Giảm {productData.thong_tin_co2.phan_tram_giam_co2}% CO2
                      </h4>
                      <p className="text-sm text-gray-700">
                        {productData.thong_tin_co2.phan_tich?.thong_diep}
                      </p>
                      <div className="mt-3 flex items-center gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Sản phẩm này:</span>
                          <span className="font-semibold ml-1">{productData.thong_tin_co2.co2_san_pham} kg</span>
                        </div>
                        <TrendingDown className="w-4 h-4 text-green-600" />
                        <div>
                          <span className="text-gray-600">Thông thường:</span>
                          <span className="font-semibold ml-1">{productData.thong_tin_co2.co2_san_pham_thong_thuong} kg</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Chứng chỉ xanh */}
              {productData.chung_chi_xanh?.co_chung_chi && (
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="w-5 h-5 text-green-600" />
                    <h4 className="font-semibold text-gray-900">Chứng chỉ xanh</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Loại chứng chỉ:</span>
                      <span className="font-medium">{productData.chung_chi_xanh.loai_chung_chi_display}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Điểm xanh:</span>
                      <Badge className="bg-green-600">{productData.chung_chi_xanh.diem_xanh} điểm</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tổ chức cấp:</span>
                      <span className="font-medium">{productData.chung_chi_xanh.to_chuc_cap?.ten_to_chuc}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Độ uy tín:</span>
                      <div className="flex gap-1">
                        {renderStars(productData.chung_chi_xanh.to_chuc_cap?.uy_tin || 0)}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <Separator />

              {/* Số lượng và nút hành động */}
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
                      onClick={() => setQuantity(Math.min(productData.so_luong_ton_kho, quantity + 1))}
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

          {/* Đánh giá sản phẩm */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Đánh giá sản phẩm</CardTitle>
              <CardDescription>
                {reviewsData.rating_stats?.total_reviews || 0} đánh giá từ khách hàng
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Tổng quan đánh giá */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-lg">
                <div className="text-center mb-4">
                  <div className="text-5xl font-bold text-gray-900 mb-2">
                    {reviewsData.rating_stats?.average_rating || 0}
                  </div>
                  <div className="flex justify-center mb-2">
                    {renderStars(Math.round(reviewsData.rating_stats?.average_rating || 0))}
                  </div>
                  <p className="text-sm text-gray-600">
                    Trung bình từ {reviewsData.rating_stats?.total_reviews || 0} đánh giá
                  </p>
                </div>

                <Separator className="my-4" />

                {/* Phân bố đánh giá */}
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = reviewsData.rating_stats?.rating_distribution?.[star] || 0;
                    const total = reviewsData.rating_stats?.total_reviews || 0;
                    const percentage = total > 0 ? (count / total) * 100 : 0;
                    
                    return (
                      <div key={star} className="flex items-center gap-3">
                        <div className="flex items-center gap-1 w-16">
                          <span className="text-sm font-medium">{star}</span>
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        </div>
                        <Progress value={percentage} className="flex-1 h-2" />
                        <span className="text-sm text-gray-600 w-8">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Danh sách đánh giá */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Chi tiết đánh giá</h4>
                
                {/* Form gửi đánh giá */}
                <div className="bg-gradient-to-br from-blue-50 to-green-50 border-2 border-dashed border-blue-200 rounded-lg p-5">
                  <h5 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" />
                    Gửi đánh giá của bạn
                  </h5>
                  
                  <div className="space-y-4">
                    {/* Chọn số sao */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Đánh giá của bạn *
                      </label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="transition-transform hover:scale-110"
                          >
                            <Star
                              className={`w-8 h-8 cursor-pointer transition-colors ${
                                star <= (hoverRating || reviewRating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300 hover:text-yellow-200'
                              }`}
                            />
                          </button>
                        ))}
                        {reviewRating > 0 && (
                          <span className="ml-2 text-sm font-medium text-gray-700 self-center">
                            {reviewRating}/5 sao
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Nhập nội dung đánh giá */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nhận xét của bạn *
                      </label>
                      <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        rows={4}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Tối thiểu 10 ký tự
                      </p>
                    </div>

                    {/* Nút gửi đánh giá */}
                    <Button
                      onClick={handleSubmitReview}
                      className="w-full bg-blue-600 hover:bg-blue-700 font-semibold"
                    >
                      <Star className="w-4 h-4 mr-2" />
                      Gửi đánh giá
                    </Button>
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Danh sách đánh giá từ khách hàng */}
                {reviewsData.reviews?.map((review) => (
                  <div key={review.id} className="border rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex items-start gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-green-100 text-green-700">
                          {review.user?.ten_user?.[0]?.toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-semibold text-gray-900">{review.user?.ten_user || 'Người dùng'}</p>
                            <div className="flex items-center gap-2 mt-1">
                              {renderStars(review.diem_danh_gia)}
                              <span className="text-sm text-gray-500">
                                {review.diem_danh_gia}/5
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-3">{review.nhan_xet}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>Mua ngày {formatDate(review.ngay_mua)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Package className="w-4 h-4" />
                            <span>Số lượng: {review.so_luong_mua}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;