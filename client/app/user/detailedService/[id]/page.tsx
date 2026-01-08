"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useBookingForm } from "./hooks/useBookingForm";
import { useReviews } from "./hooks/useReviews";
import { useImageGallery } from "./hooks/useImageGallery";
import { MOCK_SERVICES, createFallbackService, BOOKING_TIME_SLOTS } from "./constants";
import { renderStars, calculateAverageRating, formatDate } from "./utils";

export default function DetailedServicePage() {
  const params = useParams();
  const serviceId = params.id as string;
  const service = MOCK_SERVICES[serviceId] || createFallbackService(serviceId);

  const { selectedImage, setSelectedImage } = useImageGallery();
  const { formData, handleChange, handleSubmit } = useBookingForm();
  const {
    reviews,
    newReview,
    hoveredStar,
    setHoveredStar,
    handleRatingChange,
    handleNewReviewChange,
    handleAddReview,
  } = useReviews();

  const averageRating = calculateAverageRating(reviews, service.rating);

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
          <span className={isActive ? "text-yellow-400" : "text-gray-300"}>⭐</span>
        </button>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link
            href="/services"
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 transition"
          >
            <span>←</span> Quay lại danh sách dịch vụ
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
              {selectedImage ? (
                <div className="relative h-96 bg-gray-100 flex items-center justify-center">
                  <img
                    src={selectedImage}
                    alt="Selected service image"
                    className="w-full h-full object-cover"
                  />
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

            {service.subImages && service.subImages.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Hình ảnh khác</h3>
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

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{service.name}</h1>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex">{renderStars(averageRating)}</div>
                <span className="text-lg font-semibold text-gray-700">
                  {averageRating.toFixed(1)} / 5
                </span>
                <span className="text-sm text-gray-500">({reviews.length} đánh giá)</span>
              </div>

              <div className="flex items-center gap-2 mb-4 text-gray-700">
                <span className="text-xl">⏱️</span>
                <span className="text-lg">
                  Thời gian: <strong>{service.duration}</strong>
                </span>
              </div>

              <div className="border-t border-b py-4 mb-4">
                <p className="text-gray-600 mb-1">Giá dịch vụ</p>
                <p className="text-4xl font-bold text-blue-600">
                  ₫{service.price.toLocaleString("vi-VN")}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Mô tả dịch vụ</h3>
                <p className="text-gray-700 leading-relaxed">{service.description}</p>
              </div>

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

          <div>
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Đặt lịch dịch vụ</h2>

              <form onSubmit={(e) => handleSubmit(e, service)} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tên khách hàng <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.customerName}
                    onChange={(e) => handleChange("customerName", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập tên của bạn"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.customerPhone}
                    onChange={(e) => handleChange("customerPhone", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập số điện thoại"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tên thú cưng <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.petName}
                    onChange={(e) => handleChange("petName", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập tên thú cưng"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ngày đặt lịch <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.bookingDate}
                    onChange={(e) => handleChange("bookingDate", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Giờ đặt lịch <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.bookingTime}
                    onChange={(e) => handleChange("bookingTime", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    required
                  >
                    <option value="">Chọn giờ</option>
                    {BOOKING_TIME_SLOTS.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Ghi chú</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => handleChange("notes", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Ghi chú đặc biệt (tùy chọn)"
                    rows={3}
                  />
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-semibold">Tổng tiền:</span>
                    <span className="text-3xl font-bold text-blue-600">
                      ₫{service.price.toLocaleString("vi-VN")}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Xác nhận đặt lịch
                </button>

                <div className="text-center mt-4 pt-4 border-t">
                  <p className="text-sm text-gray-600 mb-2">
                    Cần hỗ trợ? Liên hệ với chúng tôi
                  </p>
                  <p className="text-blue-600 font-semibold">📞 Hotline: 1900 1234</p>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Đánh giá từ khách hàng</h2>

            <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-center gap-8 flex-wrap">
                <div className="text-center">
                  <div className="text-5xl font-bold text-blue-600 mb-2">
                    {averageRating.toFixed(1)}
                  </div>
                  <div className="flex justify-center mb-2">{renderStars(averageRating)}</div>
                  <p className="text-gray-600 font-medium">{reviews.length} đánh giá</p>
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
                        <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Viết đánh giá của bạn</h3>

              <form onSubmit={handleAddReview} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tên của bạn <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newReview.customerName}
                      onChange={(e) => handleNewReviewChange("customerName", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nhập tên của bạn"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tên thú cưng (tùy chọn)
                    </label>
                    <input
                      type="text"
                      value={newReview.petName}
                      onChange={(e) => handleNewReviewChange("petName", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tên thú cưng của bạn"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Đánh giá của bạn <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {renderInteractiveStars(newReview.rating, handleRatingChange)}
                    <span className="ml-2 text-lg font-semibold text-gray-700">
                      {newReview.rating} / 5
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nhận xét <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) => handleNewReviewChange("comment", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Chia sẻ trải nghiệm của bạn về dịch vụ..."
                    rows={4}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Gửi đánh giá
                </button>
              </form>
            </div>

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
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                          {review.customerName.charAt(0).toUpperCase()}
                        </div>

                        <div>
                          <h4 className="font-bold text-gray-800 text-lg">{review.customerName}</h4>
                          {review.petName && (
                            <p className="text-sm text-gray-600">
                              Thú cưng: <span className="font-medium">{review.petName}</span>
                            </p>
                          )}
                          <p className="text-sm text-gray-500">{formatDate(review.date)}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        {renderStars(review.rating)}
                      </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed ml-15">{review.comment}</p>
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
