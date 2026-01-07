"use client";

import { useState } from "react";

interface Service {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  duration?: string;
  rating?: number;
}

interface ListServicesProps {
  services?: Service[];
}

export default function ListServices({ services }: ListServicesProps) {
  // Default services if none provided
  const defaultServices: Service[] = [
    {
      id: 1,
      name: "Dịch vụ tắm & chăm sóc",
      price: 250000,
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=400&fit=crop",
      description: "Dịch vụ tắm chuyên nghiệp với các sản phẩm chăm sóc lông cao cấp, làm sạch và chăm sóc lông tốt nhất cho thú cưng.",
      duration: "1-2 giờ",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Khám sức khỏe",
      price: 150000,
      image: "https://images.unsplash.com/photo-1576854168519-21b6b8cb1e45?w=400&h=400&fit=crop",
      description: "Khám sức khỏe định kỳ, kiểm tra các chỉ số sức khỏe quan trọng, tiêm chủng và tư vấn y tế chuyên nghiệp từ các bác sĩ thú y.",
      duration: "30-45 phút",
      rating: 4.9,
    },
    {
      id: 3,
      name: "Huấn luyện thú cưng",
      price: 300000,
      image: "https://images.unsplash.com/photo-1552053831-71594a27c62d?w=400&h=400&fit=crop",
      description: "Chương trình huấn luyện chuyên nghiệp giúp dạy dỗ hành vi tốt, phát triển kỹ năng và xây dựng tình cảm gắn bó với thú cưng.",
      duration: "4 buổi",
      rating: 4.7,
    },
    {
      id: 4,
      name: "Dịch vụ lưu trú",
      price: 200000,
      image: "https://images.unsplash.com/photo-1587300411207-d3f29d1e2fa2?w=400&h=400&fit=crop",
      description: "Cơ sở lưu trú an toàn, thoải mái với chăm sóc tận tâm 24/24, đảm bảo thú cưng được chăm sóc tốt nhất khi bạn vắng nhà.",
      duration: "Theo ngày",
      rating: 4.6,
    },
    {
      id: 5,
      name: "Cắt móng & Chỉnh sửa lông",
      price: 180000,
      image: "https://images.unsplash.com/photo-1600788844-e135033a7d6b?w=400&h=400&fit=crop",
      description: "Dịch vụ cắt móng và chỉnh sửa lông theo yêu cầu, giúp thú cưng của bạn luôn gọn gàng, sạch sẽ và ngoại hình đẹp.",
      duration: "45 phút",
      rating: 4.8,
    },
    {
      id: 6,
      name: "Điều trị da & lông",
      price: 280000,
      image: "https://images.unsplash.com/photo-1631368508225-e45b97d33fe0?w=400&h=400&fit=crop",
      description: "Điều trị các vấn đề về da và lông như ngứa, rụng lông, viêm da bằng các phương pháp chuyên nghiệp và sản phẩm chất lượng cao.",
      duration: "1 giờ",
      rating: 4.7,
    },
    {
      id: 7,
      name: "Dạy dỗ hành vi",
      price: 250000,
      image: "https://images.unsplash.com/photo-1601003136042-cc1670b01821?w=400&h=400&fit=crop",
      description: "Dạy dỗ hành vi chuyên sâu, khắc phục các vấn đề cơn thịnh nộ, sợ hãi, tư tưởng không tốt của thú cưng một cách hiệu quả.",
      duration: "2 buổi/tuần",
      rating: 4.9,
    },
    {
      id: 8,
      name: "Dịch vụ vận chuyển thú cưng",
      price: 120000,
      image: "https://images.unsplash.com/photo-1518395267497-6e0fdde0a7c8?w=400&h=400&fit=crop",
      description: "Dịch vụ vận chuyển an toàn, thoải mái cho thú cưng tới các điểm đến với các biện pháp an toàn và chăm sóc chuyên nghiệp.",
      duration: "Tùy theo khoảng cách",
      rating: 4.6,
    },
  ];

  const serviceList = services || defaultServices;
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const handleBookService = (service: Service) => {
    alert(`Bạn muốn đặt lịch dịch vụ: ${service.name}\nGiá: ₫${service.price.toLocaleString("vi-VN")}\nVui lòng gọi: 0123 456 789`);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString("vi-VN");
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}>
        ⭐
      </span>
    ));
  };

  return (
    <div className="w-full bg-gradient-to-b from-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Dịch vụ của chúng tôi
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Khám phá các dịch vụ chăm sóc thú cưng chuyên nghiệp, uy tín từ Happy Pet Shop
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {serviceList.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Image Container */}
              <div
                className="relative h-64 overflow-hidden bg-gray-200 cursor-pointer"
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Image */}
                <img
                  src={service.image}
                  alt={service.name}
                  className={`w-full h-full object-cover transition-all duration-300 ${
                    hoveredId === service.id ? "blur-md scale-105" : "blur-0 scale-100"
                  }`}
                />

                {/* Rating Badge */}
                <div className="absolute top-3 left-3 bg-white shadow-lg rounded-lg px-3 py-1 flex items-center gap-1">
                  <span className="text-sm font-bold text-gray-800">
                    {service.rating?.toFixed(1)}
                  </span>
                  <span className="text-yellow-400">⭐</span>
                </div>

                {/* Overlay with Book Button - Show on Hover */}
                {hoveredId === service.id && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center gap-4 transition-all duration-300">
                    <button
                      onClick={() => handleBookService(service)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition flex items-center gap-2 transform hover:scale-105"
                    >
                      <span>📞</span> Đặt lịch
                    </button>
                    <p className="text-white text-center text-sm px-4">
                      Liên hệ với chúng tôi để đặt lịch dịch vụ
                    </p>
                  </div>
                )}
              </div>

              {/* Service Info */}
              <div className="p-5">
                {/* Name */}
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                  {service.name}
                </h3>

                {/* Rating */}
                {service.rating && (
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex gap-0.5">{renderStars(service.rating)}</div>
                    <span className="text-sm text-gray-600">({service.rating})</span>
                  </div>
                )}

                {/* Duration */}
                {service.duration && (
                  <p className="text-sm text-gray-600 mb-3 flex items-center gap-2">
                    <span>⏱️</span> {service.duration}
                  </p>
                )}

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-3 h-16">
                  {service.description}
                </p>

                {/* Price and Button */}
                <div className="border-t pt-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Giá từ</p>
                    <span className="text-2xl font-bold text-blue-600">
                      ₫{formatPrice(service.price)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {serviceList.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Không có dịch vụ nào</p>
          </div>
        )}
      </div>
    </div>
  );
}
