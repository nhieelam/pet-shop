"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface Product {
  id: string;
  name: string;
  price: number;
  availableAmount: number;
  image: string;
  images?: string[];
  description?: string;
}

interface Comment {
  id: string;
  userName: string;
  content: string;
  createdAt: string;
  rating?: number;
}

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");

  // Mock product data - Replace with API call later
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockProduct: Product = {
        id: productId,
        name: "Thức ăn cao cấp cho chó",
        price: 350000,
        availableAmount: 45,
        image: "https://images.unsplash.com/photo-1568152950566-c1bf43f0a86d?w=800&h=800&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1568152950566-c1bf43f0a86d?w=800&h=800&fit=crop",
          "https://images.unsplash.com/photo-1548365200-ca3ea6f50189?w=800&h=800&fit=crop",
          "https://images.unsplash.com/photo-1549685678-11ec72bef633?w=800&h=800&fit=crop",
          "https://images.unsplash.com/photo-1552053831-71594a27c62d?w=800&h=800&fit=crop",
          "https://images.unsplash.com/photo-1548366332-bb91e28e1e68?w=800&h=800&fit=crop",
        ],
        description: "Thức ăn cao cấp cho chó với công thức dinh dưỡng hoàn chỉnh, được chế biến từ các nguyên liệu tự nhiên chất lượng cao. Sản phẩm cung cấp đầy đủ các dưỡng chất cần thiết cho sự phát triển khỏe mạnh của thú cưng, bao gồm protein, vitamin, khoáng chất và các axit béo omega-3. Phù hợp cho mọi lứa tuổi và giống chó.",
      };

      const mockComments: Comment[] = [
        {
          id: "1",
          userName: "Nguyễn Văn A",
          content: "Sản phẩm rất tốt, chó nhà mình rất thích ăn. Chất lượng đúng như mô tả!",
          createdAt: "2024-01-15T10:30:00",
          rating: 5,
        },
        {
          id: "2",
          userName: "Trần Thị B",
          content: "Giá cả hợp lý, giao hàng nhanh. Sẽ mua lại lần sau.",
          createdAt: "2024-01-14T14:20:00",
          rating: 4,
        },
        {
          id: "3",
          userName: "Lê Văn C",
          content: "Thức ăn chất lượng tốt, chó nhà mình ăn ngon miệng và khỏe mạnh hơn.",
          createdAt: "2024-01-13T09:15:00",
          rating: 5,
        },
      ];

      setProduct(mockProduct);
      setMainImage(mockProduct.image);
      setComments(mockComments);
      setLoading(false);
    }, 500);

    // TODO: Replace with actual API call
    // fetch(`/api/product/${productId}`)
    //   .then(res => res.json())
    //   .then(data => {
    //     setProduct(data);
    //     setLoading(false);
    //   });
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;
    
    if (quantity > product.availableAmount) {
      alert(`Số lượng vượt quá số lượng có sẵn (${product.availableAmount})`);
      return;
    }

    // TODO: Implement actual cart functionality
    alert(`${quantity} x ${product.name} đã được thêm vào giỏ hàng!`);
    
    // You can integrate with localStorage or a cart context here
    const cartItem = {
      ...product,
      quantity,
    };
    console.log("Added to cart:", cartItem);
  };

  const handlePayment = () => {
    if (!product) return;
    
    if (quantity > product.availableAmount) {
      alert(`Số lượng vượt quá số lượng có sẵn (${product.availableAmount})`);
      return;
    }

    const totalPrice = product.price * quantity;
    alert(`Thanh toán cho ${quantity} x ${product.name}\nTổng tiền: ₫${totalPrice.toLocaleString("vi-VN")}`);
    
    // TODO: Redirect to payment page
  };

  const handleAddComment = () => {
    if (!newComment.trim()) {
      alert("Vui lòng nhập nội dung bình luận!");
      return;
    }

    const comment: Comment = {
      id: Date.now().toString(),
      userName: "Người dùng", // TODO: Get from auth context
      content: newComment,
      createdAt: new Date().toISOString(),
      rating: 5,
    };

    setComments([comment, ...comments]);
    setNewComment("");
    alert("Bình luận đã được thêm!");
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString("vi-VN");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderStars = (rating: number) => {
    return "⭐".repeat(rating);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Đang tải...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Không tìm thấy sản phẩm</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Product Detail Section */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
            {/* Product Image */}
            <div className="flex flex-col gap-4">
              {/* Main Image */}
              <div className="flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden h-96">
                <img
                  src={mainImage}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 cursor-zoom-in"
                />
              </div>

              {/* Sub Images / Thumbnails */}
              {product.images && product.images.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-3">Hình ảnh khác</p>
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setMainImage(image)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                          mainImage === image
                            ? "border-blue-600 ring-2 ring-blue-300"
                            : "border-gray-300 hover:border-blue-400"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.name} - ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-200"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-between">
              <div>
                {/* Product Name */}
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                  {product.name}
                </h1>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl font-bold text-blue-600">
                    ₫{formatPrice(product.price)}
                  </span>
                </div>

                {/* Available Amount */}
                <div className="mb-6">
                  <p className="text-lg text-gray-700">
                    Số lượng có sẵn:{" "}
                    <span
                      className={`font-bold text-xl ${
                        product.availableAmount > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {product.availableAmount} sản phẩm
                    </span>
                  </p>
                  {product.availableAmount === 0 && (
                    <p className="text-red-600 font-semibold mt-2">
                      Sản phẩm đã hết hàng
                    </p>
                  )}
                </div>

                {/* Quantity Selector */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Số lượng:
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700 font-bold py-2 px-4 rounded-lg transition"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      max={product.availableAmount}
                      value={quantity}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 1;
                        setQuantity(Math.min(Math.max(1, value), product.availableAmount));
                      }}
                      className="w-20 text-center text-lg font-semibold border-2 border-gray-300 rounded-lg py-2"
                    />
                    <button
                      onClick={() =>
                        setQuantity(Math.min(quantity + 1, product.availableAmount))
                      }
                      disabled={quantity >= product.availableAmount}
                      className="bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700 font-bold py-2 px-4 rounded-lg transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <button
                    onClick={handleAddToCart}
                    disabled={product.availableAmount === 0}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg transition flex items-center justify-center gap-2 text-lg"
                  >
                    <span>🛒</span>
                    Thêm vào giỏ hàng
                  </button>
                  <button
                    onClick={handlePayment}
                    disabled={product.availableAmount === 0}
                    className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg transition flex items-center justify-center gap-2 text-lg"
                  >
                    <span>💳</span>
                    Thanh toán ngay
                  </button>
                </div>

                {/* Total Price */}
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-700">
                      Tổng tiền:
                    </span>
                    <span className="text-2xl font-bold text-blue-600">
                      ₫{formatPrice(product.price * quantity)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 lg:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Mô tả sản phẩm
          </h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed text-lg">
              {product.description || "Chưa có mô tả cho sản phẩm này."}
            </p>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 lg:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Bình luận ({comments.length})
          </h2>

          {/* Add Comment Form */}
          <div className="mb-8 border-b pb-6">
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Viết bình luận của bạn:
              </label>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Nhập bình luận của bạn..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
                rows={4}
              />
            </div>
            <button
              onClick={handleAddComment}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition"
            >
              Gửi bình luận
            </button>
          </div>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.length === 0 ? (
              <p className="text-gray-600 text-center py-8">
                Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
              </p>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className="border-b border-gray-200 pb-6 last:border-b-0"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        {comment.userName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">
                          {comment.userName}
                        </h3>
                        {comment.rating && (
                          <div className="text-yellow-500 text-sm">
                            {renderStars(comment.rating)}
                          </div>
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-gray-700 ml-13 mt-2">{comment.content}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

