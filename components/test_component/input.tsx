/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

type FormValues = {
  name: string
  phone: string
  province: string
  district: string
  ward: string
  address: string
  payment: "cod" | "bank"
  shipping: string
  discount: string
}

export default function OrderForm() {
  const { register, handleSubmit, setValue, watch } = useForm<FormValues>()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [provinces, setProvinces] = useState<any[]>([])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [districts, setDistricts] = useState<any[]>([])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [wards, setWards] = useState<any[]>([])

  // giả sử bạn có cart giá trị
  const productTotal = 500000 // ví dụ: 500k
  const shippingFee = watch("shipping") === "express" ? 30000 : 15000
  const discountCode = watch("discount") === "SALE10" ? 100000 : 0

  const total = productTotal + shippingFee - discountCode

  // load tỉnh
  useEffect(() => {
    axios.get("https://provinces.open-api.vn/api/p/") // API tỉnh VN
      .then(res => setProvinces(res.data))
  }, [])

  // load huyện khi chọn tỉnh
  const handleProvinceChange = (value: string) => {
    setValue("province", value)
    axios.get(`https://provinces.open-api.vn/api/p/${value}?depth=2`)
      .then(res => setDistricts(res.data.districts))
  }

  // load xã khi chọn huyện
  const handleDistrictChange = (value: string) => {
    setValue("district", value)
    axios.get(`https://provinces.open-api.vn/api/d/${value}?depth=2`)
      .then(res => setWards(res.data.wards))
  }

  const onSubmit = (data: FormValues) => {
    console.log("Order data:", data, "Total:", total)
    alert("Đặt hàng thành công!")
  }

  return (
    <Card className="max-w-2xl mx-auto mt-10 p-4">
      <CardHeader>
        <CardTitle>Form nhập đơn hàng</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Tên */}
          <div>
            <Label>Tên</Label>
            <Input {...register("name")} placeholder="Nhập tên" />
          </div>

          {/* Số điện thoại */}
          <div>
            <Label>Số điện thoại</Label>
            <Input {...register("phone")} placeholder="Nhập số điện thoại" />
          </div>

          {/* Địa chỉ: tỉnh/huyện/xã */}
          <div>
            <Label>Tỉnh/Thành phố</Label>
            <Select onValueChange={handleProvinceChange}>
              <SelectTrigger><SelectValue placeholder="Chọn tỉnh" /></SelectTrigger>
              <SelectContent>
                {provinces.map((p: any) => (
                  <SelectItem key={p.code} value={p.code.toString()}>{p.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Quận/Huyện</Label>
            <Select onValueChange={handleDistrictChange}>
              <SelectTrigger><SelectValue placeholder="Chọn huyện" /></SelectTrigger>
              <SelectContent>
                {districts.map((d: any) => (
                  <SelectItem key={d.code} value={d.code.toString()}>{d.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Xã/Phường</Label>
            <Select onValueChange={(v) => setValue("ward", v)}>
              <SelectTrigger><SelectValue placeholder="Chọn xã" /></SelectTrigger>
              <SelectContent>
                {wards.map((w: any) => (
                  <SelectItem key={w.code} value={w.code.toString()}>{w.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Địa chỉ chi tiết */}
          <div>
            <Label>Địa chỉ chi tiết</Label>
            <Input {...register("address")} placeholder="Ví dụ: số 10, đường A, phường B" />
          </div>

          {/* Phương thức thanh toán */}
          <div>
            <Label>Phương thức thanh toán</Label>
            <RadioGroup onValueChange={(v) => setValue("payment", v as "cod" | "bank")}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cod" id="cod" />
                <Label htmlFor="cod">Thanh toán khi nhận hàng (COD)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bank" id="bank" />
                <Label htmlFor="bank">Chuyển khoản ngân hàng</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Phương thức vận chuyển */}
          <div>
            <Label>Phương thức vận chuyển</Label>
            <Select onValueChange={(v) => setValue("shipping", v)}>
              <SelectTrigger><SelectValue placeholder="Chọn phương thức" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Tiêu chuẩn (15k)</SelectItem>
                <SelectItem value="express">Nhanh (30k)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Mã giảm giá */}
          <div>
            <Label>Mã giảm giá</Label>
            <Select onValueChange={(v) => setValue("discount", v)}>
              <SelectTrigger><SelectValue placeholder="Chọn mã" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="NONE">Không dùng</SelectItem>
                <SelectItem value="SALE10">SALE10 - Giảm 100k</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tổng giá trị đơn hàng */}
          <div className="p-3 bg-gray-100 rounded-md">
            <p>Tổng sản phẩm: {productTotal.toLocaleString()} đ</p>
            <p>Phí vận chuyển: {shippingFee.toLocaleString()} đ</p>
            <p>Giảm giá: -{discountCode.toLocaleString()} đ</p>
            <p className="font-bold text-lg">Tổng thanh toán: {total.toLocaleString()} đ</p>
          </div>

          <Button type="submit" className="w-full">Đặt hàng</Button>
        </form>
      </CardContent>
    </Card>
  )
}
