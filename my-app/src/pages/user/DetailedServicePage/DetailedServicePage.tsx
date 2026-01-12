"use client";

import { useState } from "react";

interface Service {
  id: string;
  name: string;
  price: number;
  image: string;
  subImages?: string[];
  description: string;
  duration: string;
  rating: number;
  features: string[];
  includes: string[];
  process: string[];
}

interface Review {
  id: number;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  petName?: string;
}

// Mock detailed services data
const MOCK_SERVICES: Record<string, Service> = {
  "1": {
    id: "1",
    name: "Dịch vụ tắm & chăm sóc",
    price: 250000,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop",
    subImages: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1537151608828-8661b67d5f88?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1583511655857-d19db992cb74?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1600788844-e135033a7d6b?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1560807707-8cc77767d783?w=400&h=300&fit=crop",
    ],
    description: "Dịch vụ tắm chuyên nghiệp với các sản phẩm chăm sóc lông cao cấp, làm sạch và chăm sóc lông tốt nhất cho thú cưng của bạn. Chúng tôi sử dụng các sản phẩm an toàn, không gây kích ứng da.",
    duration: "1-2 giờ",
    rating: 4.8,
    features: [
      "Tắm với sữa tắm cao cấp chuyên dụng",
      "Massage và làm sạch sâu",
      "Sấy khô và chải lông",
      "Vệ sinh tai, mắt, móng",
      "Xịt nước hoa thú cưng",
    ],
    includes: [
      "Sản phẩm chăm sóc cao cấp",
      "Khăn tắm và dụng cụ vệ sinh",
      "Tư vấn chăm sóc tại nhà",
      "Kiểm tra sức khỏe cơ bản",
    ],
    process: [
      "Kiểm tra tình trạng da và lông",
      "Tắm với sữa tắm phù hợp",
      "Massage thư giãn",
      "Sấy khô và chải lông",
      "Hoàn thiện và trang trí",
    ],
  },
  "2": {
    id: "2",
    name: "Khám sức khỏe",
    price: 150000,
    image: "https://images.unsplash.com/photo-1576854168519-21b6b8cb1e45?w=800&h=600&fit=crop",
    subImages: [
      "https://images.unsplash.com/photo-1576854168519-21b6b8cb1e45?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1584714268335-bea47f396f70?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1631368508225-e45b97d33fe0?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop",
    ],
    description: "Khám sức khỏe định kỳ, kiểm tra các chỉ số sức khỏe quan trọng, tiêm chủng và tư vấn y tế chuyên nghiệp từ các bác sĩ thú y giàu kinh nghiệm.",
    duration: "30-45 phút",
    rating: 4.9,
    features: [
      "Khám tổng quát toàn thân",
      "Đo nhiệt độ, nhịp tim, huyết áp",
      "Kiểm tra tai, mắt, răng miệng",
      "Tư vấn dinh dưỡng",
      "Lập kế hoạch chăm sóc",
    ],
    includes: [
      "Hồ sơ sức khỏe điện tử",
      "Báo cáo khám bệnh chi tiết",
      "Tư vấn miễn phí qua điện thoại",
      "Giảm giá 10% lần khám sau",
    ],
    process: [
      "Đăng ký và khai báo bệnh sử",
      "Khám lâm sàng tổng quát",
      "Đo các chỉ số sinh hiệu",
      "Tư vấn và đưa ra phác đồ",
      "Lập hồ sơ và hẹn tái khám",
    ],
  },
  "3": {
    id: "3",
    name: "Huấn luyện thú cưng",
    price: 300000,
    image: "https://images.unsplash.com/photo-1552053831-71594a27c62d?w=800&h=600&fit=crop",
    subImages: [
      "https://images.unsplash.com/photo-1552053831-71594a27c62d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1601003136042-cc1670b01821?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1518395267497-6e0fdde0a7c8?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1537151608828-8661b67d5f88?w=400&h=300&fit=crop",
    ],
    description: "Chương trình huấn luyện chuyên nghiệp giúp dạy dỗ hành vi tốt, phát triển kỹ năng và xây dựng tình cảm gắn bó với thú cưng.",
    duration: "4 buổi",
    rating: 4.7,
    features: [
      "Huấn luyện các lệnh cơ bản",
      "Khắc phục hành vi xấu",
      "Xã hội hóa thú cưng",
      "Huấn luyện vệ sinh",
      "Kỹ năng giao tiếp",
    ],
    includes: [
      "Tài liệu huấn luyện",
      "Video hướng dẫn tại nhà",
      "Hỗ trợ trực tuyến 24/7",
      "Chứng nhận hoàn thành khóa học",
    ],
    process: [
      "Đánh giá hành vi ban đầu",
      "Lập kế hoạch huấn luyện cá nhân",
      "Thực hành và rèn luyện",
      "Theo dõi và điều chỉnh",
      "Kiểm tra và chứng nhận",
    ],
  },
};

// Fallback service for demo purposes
const createFallbackService = (id: string): Service => ({
  id,
  name: "Dịch vụ chăm sóc thú cưng",
  price: 200000,
  image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=600&fit=crop",
  description: "Dịch vụ chăm sóc thú cưng chuyên nghiệp với đội ngũ giàu kinh nghiệm.",
  duration: "1 giờ",
  rating: 4.5,
  features: ["Chăm sóc chuyên nghiệp", "Sản phẩm cao cấp", "Đội ngũ có kinh nghiệm"],
  includes: ["Tư vấn miễn phí", "Bảo hành dịch vụ"],
  process: ["Tư vấn", "Thực hiện", "Hoàn thiện"],
});

export default function DetailedServicePage() {
  // Extract service ID from URL path (e.g., /service/123 -> 123)
  const getServiceIdFromUrl = () => {
    const path = window.location.pathname;
    const segments = path.split("/").filter(Boolean);
    const serviceIndex = segments.findIndex((seg) => 
      seg === "service" || seg === "services"
    );
    return serviceIndex !== -1 && segments[serviceIndex + 1]
      ? segments[serviceIndex + 1]
      : segments[segments.length - 1] || "unknown";
  };

  const serviceId = getServiceIdFromUrl();
  const service = MOCK_SERVICES[serviceId] || createFallbackService(serviceId);

  // Image gallery state
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [petName, setPetName] = useState("");
  const [notes, setNotes] = useState("");

  // Review states
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      customerName: "Nguyễn Văn An",
      rating: 5,
      comment: "Dịch vụ rất tốt! Nhân viên tận tâm, chú chó của tôi rất thích. Sẽ quay lại lần sau!",
      date: "2025-12-20",
      petName: "Max",
    },
    {
      id: 2,
      customerName: "Trần Thị Bình",
      rating: 4,
      comment: "Chất lượng dịch vụ ổn, giá cả hợp lý. Mèo nhà tôi rất sạch sẽ sau khi sử dụng dịch vụ.",
      date: "2025-12-15",
      petName: "Miu Miu",
    },
    {
      id: 3,
      customerName: "Lê Hoàng Minh",
      rating: 5,
      comment: "Tuyệt vời! Đội ngũ chuyên nghiệp, cơ sở vật chất hiện đại. Chắc chắn sẽ giới thiệu cho bạn bè.",
      date: "2025-12-10",
      petName: "Lucky",
    },
    {
      id: 4,
      customerName: "Phạm Thị Mai",
      rating: 4,
      comment: "Dịch vụ tốt, nhân viên nhiệt tình. Thú cưng của tôi được chăm sóc rất kỹ lưỡng.",
      date: "2025-12-05",
      petName: "Cún",
    },
  ]);

  const [newReviewName, setNewReviewName] = useState("");
  const [newReviewPetName, setNewReviewPetName] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState("");
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Đặt lịch thành công!\n
Dịch vụ: ${service.name}
Tên khách hàng: ${customerName}
Số điện thoại: ${customerPhone}
Tên thú cưng: ${petName}
Ngày: ${bookingDate}
Giờ: ${bookingTime}
Ghi chú: ${notes || "Không có"}

Chúng tôi sẽ liên hệ lại để xác nhận!`);
    
    // Reset form
    setBookingDate("");
    setBookingTime("");
    setCustomerName("");
    setCustomerPhone("");
    setPetName("");
    setNotes("");
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newReviewName.trim() || !newReviewComment.trim()) {
      alert("Vui lòng nhập đầy đủ tên và nhận xét!");
      return;
    }

    const newReview: Review = {
      id: reviews.length + 1,
      customerName: newReviewName,
      rating: newReviewRating,
      comment: newReviewComment,
      date: new Date().toISOString().split("T")[0],
      petName: newReviewPetName || undefined,
    };

    setReviews([newReview, ...reviews]);
    
    // Reset form
    setNewReviewName("");
    setNewReviewPetName("");
    setNewReviewRating(5);
    setNewReviewComment("");
    
    alert("Cảm ơn bạn đã đánh giá!");
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={i < Math.floor(rating) ? "text-yellow-400 text-xl" : "text-gray-300 text-xl"}>
        ⭐
      </span>
    ));
  };

  const renderInteractiveStars = (currentRating: number, onRate: (rating: number) => void) => {
    return Array.from({ length: 5 }).map((_, i) => {
      const starValue = i + 1;
      const isActive = starValue <= (hoveredStar || currentRating);
      
      return (
        <button
          key={i}
          type="button"
          onClick={() => onRate(starValue)}
          onMouseEnter={() => setHoveredStar(starValue)}
          onMouseLeave={() => setHoveredStar(0)}
          className="text-3xl transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          aria-label={`Đánh giá ${starValue} sao`}
        >
          <span className={isActive ? "text-yellow-400" : "text-gray-300"}>
            ⭐
          </span>
        </button>
      );
    });
  };

  const calculateAverageRating = (): number => {
    if (reviews.length === 0) return service.rating;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return parseFloat((sum / reviews.length).toFixed(1));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6">
          <a
            href="/services"
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 transition"
          >
            <span>←</span> Quay lại danh sách dịch vụ
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Column - Service Image and Info */}
          <div>
            {/* Main Image with Gallery */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
              {selectedImage ? (
                <div className="relative h-96 bg-gray-100 flex items-center justify-center">
                  <img
                    src={selectedImage}
                    alt="Selected service image"
                    className="w-full h-full object-cover"
                  />
                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-4 right-4 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl transition transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Quay lại ảnh chính"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-96 object-cover hover:opacity-80 transition cursor-pointer"
                />
              )}
            </div>

            {/* Sub Images Gallery */}
            {service.subImages && service.subImages.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Hình ảnh khác
                </h3>
                <div className="grid grid-cols-5 gap-2">
                  {service.subImages.map((subImage, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(subImage)}
                      className="relative w-full aspect-square rounded-lg overflow-hidden border-2 border-gray-200 hover:border-blue-500 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      aria-label={`Xem ảnh ${index + 1}`}
                    >
                      <img
                        src={subImage}
                        alt={`Service image ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-110 transition"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Service Basic Info */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {service.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">{renderStars(calculateAverageRating())}</div>
                <span className="text-lg font-semibold text-gray-700">
                  {calculateAverageRating().toFixed(1)} / 5
                </span>
                <span className="text-sm text-gray-500">
                  ({reviews.length} đánh giá)
                </span>
              </div>

              {/* Duration */}
              <div className="flex items-center gap-2 mb-4 text-gray-700">
                <span className="text-xl">⏱️</span>
                <span className="text-lg">Thời gian: <strong>{service.duration}</strong></span>
              </div>

              {/* Price */}
              <div className="border-t border-b py-4 mb-4">
                <p className="text-gray-600 mb-1">Giá dịch vụ</p>
                <p className="text-4xl font-bold text-blue-600">
                  ₫{service.price.toLocaleString("vi-VN")}
                </p>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Mô tả dịch vụ</h3>
                <p className="text-gray-700 leading-relaxed">{service.description}</p>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Đặc điểm nổi bật</h3>
                <ul className="space-y-2">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Includes */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Bao gồm</h3>
                <ul className="space-y-2">
                  {service.includes.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Process */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Quy trình thực hiện</h3>
                <ol className="space-y-3">
                  {service.process.map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </span>
                      <span className="text-gray-700 pt-1">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div>
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Đặt lịch dịch vụ
              </h2>

              <form onSubmit={handleBooking} className="space-y-4">
                {/* Customer Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tên khách hàng <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập tên của bạn"
                    required
                  />
                </div>

                {/* Customer Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập số điện thoại"
                    required
                  />
                </div>

                {/* Pet Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tên thú cưng <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập tên thú cưng"
                    required
                  />
                </div>

                {/* Booking Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ngày đặt lịch <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>

                {/* Booking Time */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Giờ đặt lịch <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    required
                  >
                    <option value="">Chọn giờ</option>
                    <option value="08:00">08:00</option>
                    <option value="09:00">09:00</option>
                    <option value="10:00">10:00</option>
                    <option value="11:00">11:00</option>
                    <option value="13:00">13:00</option>
                    <option value="14:00">14:00</option>
                    <option value="15:00">15:00</option>
                    <option value="16:00">16:00</option>
                    <option value="17:00">17:00</option>
                  </select>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ghi chú
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Ghi chú đặc biệt (tùy chọn)"
                    rows={3}
                  />
                </div>

                {/* Total Price Display */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-semibold">Tổng tiền:</span>
                    <span className="text-3xl font-bold text-blue-600">
                      ₫{service.price.toLocaleString("vi-VN")}
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Xác nhận đặt lịch
                </button>

                {/* Contact Info */}
                <div className="text-center mt-4 pt-4 border-t">
                  <p className="text-sm text-gray-600 mb-2">
                    Cần hỗ trợ? Liên hệ với chúng tôi
                  </p>
                  <p className="text-blue-600 font-semibold">
                    📞 Hotline: 1900 1234
                  </p>
                </div>
              </form>


            </div>

          </div>
          
        </div>
                {/* Reviews Section */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Đánh giá từ khách hàng
            </h2>

            {/* Rating Summary */}
            <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-center gap-8 flex-wrap">
                <div className="text-center">
                  <div className="text-5xl font-bold text-blue-600 mb-2">
                    {calculateAverageRating().toFixed(1)}
                  </div>
                  <div className="flex justify-center mb-2">
                    {renderStars(calculateAverageRating())}
                  </div>
                  <p className="text-gray-600 font-medium">
                    {reviews.length} đánh giá
                  </p>
                </div>

                <div className="flex-1 min-w-[200px] max-w-md">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = reviews.filter((r) => r.rating === star).length;
                    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                    
                    return (
                      <div key={star} className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-gray-700 w-12">
                          {star} ⭐
                        </span>
                        <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-400 transition-all duration-300"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-12 text-right">
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Add Review Form */}
            <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Viết đánh giá của bạn
              </h3>
              
              <form onSubmit={handleAddReview} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Customer Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tên của bạn <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newReviewName}
                      onChange={(e) => setNewReviewName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nhập tên của bạn"
                      required
                    />
                  </div>

                  {/* Pet Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tên thú cưng (tùy chọn)
                    </label>
                    <input
                      type="text"
                      value={newReviewPetName}
                      onChange={(e) => setNewReviewPetName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tên thú cưng của bạn"
                    />
                  </div>
                </div>

                {/* Rating Stars */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Đánh giá của bạn <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {renderInteractiveStars(newReviewRating, setNewReviewRating)}
                    <span className="ml-2 text-lg font-semibold text-gray-700">
                      {newReviewRating} / 5
                    </span>
                  </div>
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nhận xét <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Chia sẻ trải nghiệm của bạn về dịch vụ..."
                    rows={4}
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Gửi đánh giá
                </button>
              </form>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Tất cả đánh giá ({reviews.length})
              </h3>

              {reviews.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-lg">
                    Chưa có đánh giá nào. Hãy là người đầu tiên đánh giá dịch vụ này!
                  </p>
                </div>
              ) : (
                reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition"
                  >
                    {/* Review Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        {/* Avatar */}
                        <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                          {review.customerName.charAt(0).toUpperCase()}
                        </div>

                        {/* Name and Date */}
                        <div>
                          <h4 className="font-bold text-gray-800 text-lg">
                            {review.customerName}
                          </h4>
                          {review.petName && (
                            <p className="text-sm text-gray-600">
                              Thú cưng: <span className="font-medium">{review.petName}</span>
                            </p>
                          )}
                          <p className="text-sm text-gray-500">
                            {new Date(review.date).toLocaleDateString("vi-VN", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-1 shrink-0">
                        {renderStars(review.rating)}
                      </div>
                    </div>

                    {/* Review Comment */}
                    <p className="text-gray-700 leading-relaxed ml-15">
                      {review.comment}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
