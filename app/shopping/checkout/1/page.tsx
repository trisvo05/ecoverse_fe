"use client";

import { useState } from "react";

export default function OrderForm() {
  const products = [
    { id: 1, name: "Sản phẩm A", price: 200000 },
    { id: 2, name: "Sản phẩm B", price: 150000 },
  ];

  const shippingMethods = [
    { id: "fast", name: "Giao hàng nhanh", fee: 30000 },
    { id: "standard", name: "Giao hàng tiêu chuẩn", fee: 20000 },
  ];

  const discounts = [
    { code: "SALE10", percent: 10 },
    { code: "SALE20", percent: 20 },
  ];

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    province: "",
    district: "",
    ward: "",
    address: "",
    payment: "cod",
    shipping: shippingMethods[0].id,
    discount: "",
  });

  const subtotal = products.reduce((sum, p) => sum + p.price, 0);
  const shippingFee =
    shippingMethods.find((s) => s.id === formData.shipping)?.fee || 0;
  const discountPercent =
    discounts.find((d) => d.code === formData.discount)?.percent || 0;
  const discountValue = (subtotal * discountPercent) / 100;
  const total = subtotal + shippingFee - discountValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dữ liệu đơn hàng:", formData, { subtotal, shippingFee, discountValue, total });
    alert("Đặt hàng thành công!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg space-y-4"
    >
      <h2 className="text-xl font-bold">Thông tin đơn hàng</h2>

      <div>
        <label className="block font-medium">Tên</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border rounded-lg p-2"
        />
      </div>

      <div>
        <label className="block font-medium">Số điện thoại</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full border rounded-lg p-2"
        />
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="block font-medium">Tỉnh/TP</label>
          <input
            type="text"
            name="province"
            value={formData.province}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block font-medium">Huyện</label>
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block font-medium">Xã</label>
          <input
            type="text"
            name="ward"
            value={formData.ward}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2"
          />
        </div>
      </div>

      <div>
        <label className="block font-medium">Địa chỉ chi tiết</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full border rounded-lg p-2"
        />
      </div>

      <div>
        <label className="block font-medium">Phương thức thanh toán</label>
        <select
          name="payment"
          value={formData.payment}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
        >
          <option value="cod">Thanh toán khi nhận hàng (COD)</option>
          <option value="bank">Chuyển khoản ngân hàng</option>
        </select>
      </div>

      <div>
        <label className="block font-medium">Phương thức vận chuyển</label>
        <select
          name="shipping"
          value={formData.shipping}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
        >
          {shippingMethods.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} (+{s.fee.toLocaleString()}đ)
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-medium">Mã giảm giá</label>
        <select
          name="discount"
          value={formData.discount}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
        >
          <option value="">-- Chọn mã --</option>
          {discounts.map((d) => (
            <option key={d.code} value={d.code}>
              {d.code} (-{d.percent}%)
            </option>
          ))}
        </select>
      </div>

      <div className="p-4 bg-gray-100 rounded-lg">
        <p>Tạm tính: {subtotal.toLocaleString()}đ</p>
        <p>Phí vận chuyển: {shippingFee.toLocaleString()}đ</p>
        <p>Giảm giá: -{discountValue.toLocaleString()}đ</p>
        <p className="font-bold text-lg">
          Tổng cộng: {total.toLocaleString()}đ
        </p>
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg"
      >
        Đặt hàng
      </button>
    </form>
  );
}
