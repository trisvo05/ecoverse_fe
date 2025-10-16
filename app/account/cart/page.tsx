"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, Trash2, ShoppingCart, Leaf, Wind } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';

// Types
interface Voucher {
  id: number;
  ten_voucher: string;
  loai_giam_gia: string;
  gia_tri_giam: number;
  so_voucher_con_lai: number;
}

interface CartItem {
  id: number;
  san_pham_id: number;
  ten_san_pham: string;
  gia_ban: number;
  so_luong: number;
  so_luong_ton_kho: number;
  loai_san_pham: string;
  thanh_tien_goc: number;
  gia_tri_giam_gia: number;
  thanh_tien: number;
  phi_van_chuyen_phan_bo: number;
  hinh_anh_url: string;
  voucher: Voucher | null;
  diem_xanh: number;
  co_chung_chi: boolean;
  co_thong_tin_co2: boolean;
}

interface CartData {
  id: number;
  trang_thai: string;
  ngay_tao: string;
  dia_chi_giao_hang: string;
  phuong_thuc_thanh_toan: string;
  phi_van_chuyen: number;
  so_luong_san_pham: number;
  tong_gia_goc: number;
  tong_giam_gia: number;
  tong_phi_van_chuyen: number;
  tong_tien: number;
  tong_diem_xanh: number;
  tong_co2_tiet_kiem: number;
  phuong_thuc_van_chuyen: string | null;
  san_pham: CartItem[];
}

interface ApiResponse<T> {
  jsonrpc: string;
  id: null;
  result: {
    success: boolean;
    data: T;
    message?: string;
  };
}

const API_BASE_URL = 'https://ecoverse.namtech.me/api/tmdt';

// trả ra value của cookies session id 
const getSessionId = (): string => {
  const cookies = document.cookie.split(';');
  // eslint-disable-next-line prefer-const
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'session_id') {
      return value;
    }
  }
  return '';
};

// API calls
// Mock data thay vì call API
// --- MOCK CART DATA ---
let mockCart: CartData = {
  id: 1,
  trang_thai: "pending",
  ngay_tao: "2025-10-16",
  dia_chi_giao_hang: "123 Đường Xanh, Quận 1, TP.HCM",
  phuong_thuc_thanh_toan: "COD",
  phi_van_chuyen: 15000,
  so_luong_san_pham: 2,
  tong_gia_goc: 580000,
  tong_giam_gia: 80000,
  tong_phi_van_chuyen: 15000,
  tong_tien: 515000,
  tong_diem_xanh: 42,
  tong_co2_tiet_kiem: 3.7,
  phuong_thuc_van_chuyen: "Giao nhanh Eco",
  san_pham: [
    {
      id: 1,
      san_pham_id: 1,
      ten_san_pham: "Bình giữ nhiệt tái chế EcoCup",
      gia_ban: 250000,
      so_luong: 1,
      so_luong_ton_kho: 10,
      loai_san_pham: "Đồ dùng xanh",
      thanh_tien_goc: 250000,
      gia_tri_giam_gia: 30000,
      thanh_tien: 220000,
      phi_van_chuyen_phan_bo: 7500,
      hinh_anh_url: "https://images.unsplash.com/photo-1617196034705-8c7e6a3e9055?w=500",
      voucher: {
        id: 101,
        ten_voucher: "Giảm 30k Đồ Xanh",
        loai_giam_gia: "Giảm tiền",
        gia_tri_giam: 30000,
        so_voucher_con_lai: 100,
      },
      diem_xanh: 20,
      co_chung_chi: true,
      co_thong_tin_co2: true,
    },
    {
      id: 2,
      san_pham_id: 2,
      ten_san_pham: "Bàn chải tre thân thiện môi trường",
      gia_ban: 180000,
      so_luong: 2,
      so_luong_ton_kho: 15,
      loai_san_pham: "Đồ cá nhân",
      thanh_tien_goc: 360000,
      gia_tri_giam_gia: 50000,
      thanh_tien: 310000,
      phi_van_chuyen_phan_bo: 7500,
      hinh_anh_url: "https://images.unsplash.com/photo-1588776814546-1ffcf47267c5?w=500",
      voucher: null,
      diem_xanh: 22,
      co_chung_chi: false,
      co_thong_tin_co2: true,
    },
  ],
};

// --- MOCK FUNCTION: FETCH CART ---
const fetchCart = async (): Promise<CartData> => {
  await new Promise((r) => setTimeout(r, 300)); // mô phỏng trễ
  return structuredClone(mockCart); // tránh mutate trực tiếp
};

// --- MOCK FUNCTION: UPDATE QUANTITY ---
const updateCartItem = async (san_pham_id: number, so_luong: number): Promise<void> => {
  await new Promise((r) => setTimeout(r, 200));

  mockCart.san_pham = mockCart.san_pham.map((sp) =>
    sp.san_pham_id === san_pham_id
      ? {
          ...sp,
          so_luong,
          thanh_tien: so_luong * sp.gia_ban - sp.gia_tri_giam_gia,
          thanh_tien_goc: so_luong * sp.gia_ban,
        }
      : sp
  );

  // cập nhật tổng lại
  const tong_gia_goc = mockCart.san_pham.reduce((t, sp) => t + sp.thanh_tien_goc, 0);
  const tong_giam_gia = mockCart.san_pham.reduce((t, sp) => t + sp.gia_tri_giam_gia, 0);
  const tong_tien = tong_gia_goc - tong_giam_gia + mockCart.phi_van_chuyen;
  const tong_diem_xanh = mockCart.san_pham.reduce((t, sp) => t + sp.diem_xanh, 0);
  const tong_co2_tiet_kiem = mockCart.san_pham.reduce((t, sp) => t + (sp.co_thong_tin_co2 ? 1.2 : 0.5), 0);

  mockCart = {
    ...mockCart,
    tong_gia_goc,
    tong_giam_gia,
    tong_tien,
    tong_diem_xanh,
    tong_co2_tiet_kiem,
  };
};

// --- MOCK FUNCTION: CLEAR CART ---
const clearCart = async (): Promise<void> => {
  await new Promise((r) => setTimeout(r, 200));
  mockCart.san_pham = [];
  mockCart.tong_gia_goc = 0;
  mockCart.tong_giam_gia = 0;
  mockCart.tong_tien = 0;
  mockCart.tong_diem_xanh = 0;
  mockCart.tong_co2_tiet_kiem = 0;
};


const CartPage: React.FC = () => {
  const [cart, setCart] = useState<CartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log("run loadcart")
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      setLoading(true);
      const data = await fetchCart();
      setCart(data);
  
      console.log(data)
    } catch (error) {
      setMessage('Lỗi khi call api lấy giỏ hàng ');
    } finally {
      setLoading(false);
    }
  };

 const handleUpdateQuantity = (san_pham_id: number, newQuantity: number) => {
  if (!cart) return;
  if (newQuantity < 1) return;

  setCart((prev) => {
    if (!prev) return prev;

    const updatedProducts = prev.san_pham.map((item) => {
      if (item.san_pham_id === san_pham_id) {
        const thanh_tien_goc = item.gia_ban * newQuantity;
        const thanh_tien = thanh_tien_goc - item.gia_tri_giam_gia;
        return { ...item, so_luong: newQuantity, thanh_tien_goc, thanh_tien };
      }
      return item;
    });

    const tong_gia_goc = updatedProducts.reduce((sum, sp) => sum + sp.thanh_tien_goc, 0);
    const tong_giam_gia = updatedProducts.reduce((sum, sp) => sum + sp.gia_tri_giam_gia, 0);
    const tong_tien = tong_gia_goc - tong_giam_gia + prev.phi_van_chuyen;
    const tong_diem_xanh = updatedProducts.reduce((sum, sp) => sum + sp.diem_xanh, 0);
    const tong_co2_tiet_kiem = updatedProducts.reduce(
      (sum, sp) => sum + (sp.co_thong_tin_co2 ? 1.2 : 0.5),
      0
    );

    return {
      ...prev,
      san_pham: updatedProducts,
      tong_gia_goc,
      tong_giam_gia,
      tong_tien,
      tong_diem_xanh,
      tong_co2_tiet_kiem,
    };
  });

  setMessage('Đã cập nhật số lượng');
  setTimeout(() => setMessage(''), 2000);
};

  const handleClearCart = async () => {
    if (!confirm('Bạn có chắc muốn xóa tất cả sản phẩm?')) return;
    
    try {
      setUpdating(true);
      await clearCart();
      await loadCart();
      setMessage('Đã xóa tất cả sản phẩm');
    } catch (error) {
      setMessage('Không thể xóa giỏ hàng');
    } finally {
      setUpdating(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4">
        <div className="max-w-6xl mx-auto pt-8">
          <div className="text-center">Đang tải...</div>
        </div>
      </div>
    );
  }

  const isEmpty = !cart || cart.san_pham.length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4 ">
      <div className="max-w-6xl mx-auto pt-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-800 flex items-center gap-2">
            <ShoppingCart className="w-8 h-8" />
            Giỏ Hàng Của Bạn
          </h1>
          <p className="text-gray-600 mt-2">Mua sắm xanh - Bảo vệ hành tinh</p>
        </div>

        {/* Message Alert */}
        {message && (
          <Alert className="mb-4 bg-green-100 border-green-300">
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        {isEmpty ? (
          <Card className="text-center py-16">
            <CardContent>
              <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Giỏ hàng trống</h3>
              <p className="text-gray-600">Hãy thêm sản phẩm để bắt đầu mua sắm!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.san_pham.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <img
                        src={item.hinh_anh_url}
                        alt={item.ten_san_pham}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg">{item.ten_san_pham}</h3>
                            <div className="flex gap-2 mt-2">
                              {item.co_chung_chi && (
                                <Badge variant="outline" className="text-green-700 border-green-300">
                                  <Leaf className="w-3 h-3 mr-1" />
                                  Chứng chỉ xanh
                                </Badge>
                              )}
                              {item.co_thong_tin_co2 && (
                                <Badge variant="outline" className="text-blue-700 border-blue-300">
                                  <Wind className="w-3 h-3 mr-1" />
                                  CO₂ thấp
                                </Badge>
                              )}
                            </div>
                            {item.voucher && (
                              <div className="mt-2 text-sm text-green-600">
                                🎫 {item.voucher.ten_voucher}
                              </div>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg text-green-700">
                              {item.thanh_tien.toLocaleString('vi-VN')}đ
                            </div>
                            {item.gia_tri_giam_gia > 0 && (
                              <div className="text-sm line-through text-gray-500">
                                {item.thanh_tien_goc.toLocaleString('vi-VN')}đ
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUpdateQuantity(item.san_pham_id, item.so_luong - 1)}
                              disabled={updating || item.so_luong <= 1}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="w-12 text-center font-semibold">{item.so_luong}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUpdateQuantity(item.san_pham_id, item.so_luong + 1)}
                              disabled={updating || item.so_luong >= item.so_luong_ton_kho}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="text-sm text-gray-600">
                            💚 {item.diem_xanh} điểm xanh
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Button
                variant="outline"
                onClick={handleClearCart}
                disabled={updating}
                className="w-full text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Xóa tất cả sản phẩm
              </Button>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Tổng Đơn Hàng</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tổng giá gốc:</span>
                    <span>{cart.tong_gia_goc.toLocaleString('vi-VN')}đ</span>
                  </div>
                  {cart.tong_giam_gia > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Giảm giá:</span>
                      <span>-{cart.tong_giam_gia.toLocaleString('vi-VN')}đ</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phí vận chuyển:</span>
                    <span>{cart.phi_van_chuyen === 0 ? 'Miễn phí' : `${cart.phi_van_chuyen.toLocaleString('vi-VN')}đ`}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-bold text-lg">
                    <span>Tổng cộng:</span>
                    <span className="text-green-700">{cart.tong_tien.toLocaleString('vi-VN')}đ</span>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg space-y-2 mt-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Leaf className="w-4 h-4 text-green-600" />
                      <span className="font-semibold">{cart.tong_diem_xanh} điểm xanh</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Wind className="w-4 h-4 text-blue-600" />
                      <span>Giảm {cart.tong_co2_tiet_kiem.toFixed(2)}kg CO₂</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={"/shopping/checkout"}><Button className="w-full bg-green-600 hover:bg-green-700">
                    Tiến Hành Thanh Toán
                  </Button></Link>
                  
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;