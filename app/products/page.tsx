import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Filter, Search, ShoppingCart, Star, ChevronLeft, ChevronRight } from 'lucide-react';

// Dữ liệu mẫu sản phẩm
const products = [
  { id: 1, name: 'iPhone 15 Pro', price: 28990000, category: 'Điện thoại', brand: 'Apple', rating: 4.8, image: '📱' },
  { id: 2, name: 'Samsung Galaxy S24', price: 22990000, category: 'Điện thoại', brand: 'Samsung', rating: 4.7, image: '📱' },
  { id: 3, name: 'MacBook Pro M3', price: 52990000, category: 'Laptop', brand: 'Apple', rating: 4.9, image: '💻' },
  { id: 4, name: 'Dell XPS 15', price: 42990000, category: 'Laptop', brand: 'Dell', rating: 4.6, image: '💻' },
  { id: 5, name: 'iPad Air', price: 16990000, category: 'Máy tính bảng', brand: 'Apple', rating: 4.7, image: '📱' },
  { id: 6, name: 'AirPods Pro', price: 6990000, category: 'Phụ kiện', brand: 'Apple', rating: 4.8, image: '🎧' },
  { id: 7, name: 'Sony WH-1000XM5', price: 8990000, category: 'Phụ kiện', brand: 'Sony', rating: 4.9, image: '🎧' },
  { id: 8, name: 'Xiaomi 14', price: 18990000, category: 'Điện thoại', brand: 'Xiaomi', rating: 4.5, image: '📱' },
  { id: 9, name: 'Asus ROG Zephyrus', price: 38990000, category: 'Laptop', brand: 'Asus', rating: 4.7, image: '💻' },
  { id: 10, name: 'Samsung Tab S9', price: 21990000, category: 'Máy tính bảng', brand: 'Samsung', rating: 4.6, image: '📱' },
];

const categories = ['Điện thoại', 'Laptop', 'Máy tính bảng', 'Phụ kiện'];
const brands = ['Apple', 'Samsung', 'Dell', 'Sony', 'Xiaomi', 'Asus'];

export default function ProductPage() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 60000000]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Xử lý lọc danh mục
  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Xử lý lọc thương hiệu
  const handleBrandChange = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  // Lọc và sắp xếp sản phẩm
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const matchPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchRating = product.rating >= minRating;
      const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchCategory && matchBrand && matchPrice && matchRating && matchSearch;
    });

    // Sắp xếp
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [selectedCategories, selectedBrands, priceRange, minRating, sortBy, searchTerm]);

  // Reset filters
  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, 60000000]);
    setMinRating(0);
    setSearchTerm('');
    setCurrentPage(1);
  };

  // Tính toán pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset về trang 1 khi filter thay đổi
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, selectedBrands, priceRange, minRating, searchTerm, sortBy]);

  // Component bộ lọc
  const FilterSection = () => (
    <div className="space-y-6">
      {/* Danh mục */}
      <div>
        <h3 className="font-semibold mb-3">Danh mục</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`cat-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategoryChange(category)}
              />
              <Label htmlFor={`cat-${category}`} className="text-sm cursor-pointer">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Thương hiệu */}
      <div>
        <h3 className="font-semibold mb-3">Thương hiệu</h3>
        <div className="space-y-2">
          {brands.map(brand => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => handleBrandChange(brand)}
              />
              <Label htmlFor={`brand-${brand}`} className="text-sm cursor-pointer">
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Khoảng giá */}
      <div>
        <h3 className="font-semibold mb-3">Khoảng giá</h3>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={60000000}
          step={1000000}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>{(priceRange[0] / 1000000).toFixed(0)}M</span>
          <span>{(priceRange[1] / 1000000).toFixed(0)}M</span>
        </div>
      </div>

      {/* Đánh giá */}
      <div>
        <h3 className="font-semibold mb-3">Đánh giá tối thiểu</h3>
        <Select value={minRating.toString()} onValueChange={(v) => setMinRating(Number(v))}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Tất cả</SelectItem>
            <SelectItem value="4">4★ trở lên</SelectItem>
            <SelectItem value="4.5">4.5★ trở lên</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button onClick={resetFilters} variant="outline" className="w-full">
        Xóa bộ lọc
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-4">Cửa hàng điện tử</h1>
          
          {/* Thanh tìm kiếm và sắp xếp */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sắp xếp" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Tên A-Z</SelectItem>
                  <SelectItem value="price-asc">Giá thấp - cao</SelectItem>
                  <SelectItem value="price-desc">Giá cao - thấp</SelectItem>
                  <SelectItem value="rating">Đánh giá cao nhất</SelectItem>
                </SelectContent>
              </Select>

              {/* Mobile filter button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="md:hidden">
                    <Filter className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Bộ lọc</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterSection />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Active filters */}
          {(selectedCategories.length > 0 || selectedBrands.length > 0) && (
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map(cat => (
                <Badge key={cat} variant="secondary" className="px-3 py-1">
                  {cat}
                  <button
                    onClick={() => handleCategoryChange(cat)}
                    className="ml-2 hover:text-red-500"
                  >
                    ×
                  </button>
                </Badge>
              ))}
              {selectedBrands.map(brand => (
                <Badge key={brand} variant="secondary" className="px-3 py-1">
                  {brand}
                  <button
                    onClick={() => handleBrandChange(brand)}
                    className="ml-2 hover:text-red-500"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Main content */}
        <div className="flex gap-6">
          {/* Sidebar filters - Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Bộ lọc
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FilterSection />
              </CardContent>
            </Card>
          </div>

          {/* Product grid */}
          <div className="flex-1">
            <div className="mb-4 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Hiển thị {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} trong {filteredProducts.length} sản phẩm
              </div>
              <Select value={itemsPerPage.toString()} onValueChange={(v) => setItemsPerPage(Number(v))}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">6 / trang</SelectItem>
                  <SelectItem value="9">9 / trang</SelectItem>
                  <SelectItem value="12">12 / trang</SelectItem>
                  <SelectItem value="24">24 / trang</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProducts.map(product => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="text-6xl text-center mb-4">{product.image}</div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                      <p className="text-sm text-gray-600">{product.brand}</p>
                      <p className="text-sm text-gray-500">{product.category}</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {product.price.toLocaleString('vi-VN')}₫
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Thêm vào giỏ
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Không tìm thấy sản phẩm nào</p>
                <Button onClick={resetFilters} variant="outline" className="mt-4">
                  Xóa bộ lọc
                </Button>
              </div>
            )}

            {/* Pagination */}
            {filteredProducts.length > 0 && totalPages > 1 && (
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-600">
                  Trang {currentPage} / {totalPages}
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Trước
                  </Button>
                  
                  <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                      // Hiển thị trang đầu, cuối, và các trang xung quanh trang hiện tại
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                            className="w-10"
                          >
                            {page}
                          </Button>
                        );
                      } else if (page === currentPage - 2 || page === currentPage + 2) {
                        return <span key={page} className="px-2">...</span>;
                      }
                      return null;
                    })}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Sau
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}