"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const slides = [
    {
    id: 1,
    title: "Sản phẩm xanh & bền vững",
    subtitle: "Lựa chọn thân thiện cho cuộc sống hiện đại",
    description: "Từ đồ gia dụng tái chế, thời trang bền vững đến năng lượng sạch – tất cả đều hướng đến lối sống xanh, giảm tác động môi trường.",
    image: "https://media02.scp.gov.vn/Images/Upload/User/hanguyen/2020/3/b2.jpg",
    cta: "Khám phá sản phẩm xanh",
    color: "from-emerald-600 to-green-700"
    },

  {
    id: 2,
    title: "Tái thương mại sản phẩm xanh",
    subtitle: "Trao lại giá trị – Giảm thiểu lãng phí",
    description: "Nơi người dùng có thể mua bán, trao đổi các sản phẩm xanh đã qua sử dụng nhưng vẫn còn giá trị, góp phần giảm rác thải.",
    image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1200&h=600&fit=crop&q=80",
    cta: "Khám phá ngay",
    color: "from-lime-500 to-emerald-600"
  },
  {
    id: 3,
    title: "Voucher xanh – Mua sắm bền vững",
    subtitle: "Ưu đãi dành riêng cho người tiêu dùng xanh",
    description: "Tích điểm khi mua sản phẩm thân thiện với môi trường và đổi lấy voucher giảm giá cho các mặt hàng xanh khác.",
    image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=1200&h=600&fit=crop&q=80",
    cta: "Săn voucher",
    color: "from-green-400 to-teal-600"
  },
  {
    id: 4,
    title: "Hệ thống điểm xanh",
    subtitle: "Mỗi hành động nhỏ – Một bước vì môi trường",
    description: "Người dùng được thưởng điểm xanh khi tái chế, chia sẻ sản phẩm xanh hoặc mua hàng thân thiện môi trường , giảm thiểu phát thải CO2",
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200&h=600&fit=crop&q=80",
    cta: "Tham gia ngay",
    color: "from-teal-500 to-emerald-700"
  },
  {
    id: 5,
    title: "Kiểm duyệt sản phẩm xanh",
    subtitle: "Đảm bảo uy tín – Minh bạch nguồn gốc",
    description: "Tất cả sản phẩm đều được đội ngũ kiểm duyệt xác thực tiêu chuẩn xanh, giúp người tiêu dùng yên tâm tuyệt đối.",
    image: "https://images.unsplash.com/photo-1613145993481-2f8d79f7a9c3?w=1200&h=600&fit=crop&q=80",
    cta: "Tìm hiểu thêm",
    color: "from-green-700 to-emerald-800"
  }
];

export default function EcommerceSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: React.SetStateAction<number>) => {
    setCurrentSlide(index);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 5000);
  };

  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlay, nextSlide]);

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-2xl shadow-2xl group mt-[80px]" id='services'>
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            index === currentSlide
              ? 'opacity-100 translate-x-0'
              : index < currentSlide
              ? 'opacity-0 -translate-x-full'
              : 'opacity-0 translate-x-full'
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} opacity-85`} />
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center justify-center px-8 md:px-16">
            <div className="text-center text-white max-w-3xl">
              <div className="mb-4 animate-fade-in">
                <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                  {slide.subtitle}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-slide-up">
                {slide.title}
              </h1>
              
              <p className="text-lg md:text-xl mb-8 text-white/90 animate-slide-up-delay">
                {slide.description}
              </p>
              
              <Button 
                size="lg"
                className="bg-white text-green-700 hover:bg-green-50 font-semibold px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all animate-bounce-in"
              >
                {slide.cta}
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group/dot relative"
            aria-label={`Go to slide ${index + 1}`}
          >
            <Circle
              className={`w-3 h-3 transition-all ${
                index === currentSlide
                  ? 'fill-white text-white scale-125'
                  : 'fill-white/40 text-white/40 hover:fill-white/60'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <div
          className="h-full bg-white transition-all duration-300"
          style={{
            width: `${((currentSlide + 1) / slides.length) * 100}%`,
          }}
        />
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out 0.2s both;
        }

        .animate-slide-up-delay {
          animation: slide-up 0.8s ease-out 0.4s both;
        }

        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out 0.6s both;
        }
      `}</style>
    </div>
  );
}