"use client";

import Link from "next/link";

export default function Home() {
  const products = [
    {
      id: 1,
      name: "Thức ăn cao cấp cho chó",
      price: "₫350.000",
      icon: "🐕",
      description: "Dinh dưỡng hoàn chỉnh, ngon lành",
    },
    {
      id: 2,
      name: "Bộ đồ chơi cho mèo",
      price: "₫250.000",
      icon: "🐱",
      description: "Vui nhộn, an toàn cho thú cưng",
    },
    {
      id: 3,
      name: "Giường ngủ cao cấp",
      price: "₫500.000",
      icon: "🛏️",
      description: "Thoải mái, ấm áp cho thú cưng",
    },
    {
      id: 4,
      name: "Bộ spa & chăm sóc",
      price: "₫450.000",
      icon: "✨",
      description: "Làm đẹp chuyên nghiệp cho thú cưng",
    },
  ];

  const services = [
    {
      title: "Dịch vụ tắm & chăm sóc",
      description: "Làm sạch và chăm sóc lông được chuyên nghiệp cho mọi loài thú cưng",
      icon: "🧴",
    },
    {
      title: "Khám sức khỏe",
      description: "Kiểm tra sức khỏe định kỳ, tiêm chủng và tư vấn y tế chuyên nghiệp",
      icon: "⚕️",
    },
    {
      title: "Huấn luyện thú cưng",
      description: "Chương trình huấn luyện chuyên nghiệp, dạy dỗ hành vi tốt",
      icon: "🎖️",
    },
    {
      title: "Dịch vụ lưu trú",
      description: "Cơ sở lưu trú an toàn, thoải mái với chăm sóc tận tâm",
      icon: "🏡",
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            Happy Pet Shop - Tổ ấm cho thú cưng 🐾
          </h1>
          <p className="text-xl sm:text-2xl mb-8 opacity-90">
            Cửa hàng thú cưng hàng đầu cung cấp thức ăn, đồ chơi, phụ kiện chất lượng cao và dịch vụ chăm sóc toàn diện với đội ngũ chuyên viên tận tâm, giàu kinh nghiệm.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/shop" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
              Shop Now
            </Link>
            <Link href="/about-us" className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Sản phẩm nổi bật
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition p-6 text-center"
              >
                <div className="text-5xl mb-4">{product.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <p className="text-2xl font-bold text-blue-600 mb-4">
                  {product.price}
                </p>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 shadow-md hover:shadow-lg transition"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">
                  {service.title}
                </h3>
                <p className="text-gray-700">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Wide Selection",
                desc: "Thousands of products for all pet types",
                icon: "📦",
              },
              {
                title: "Expert Staff",
                desc: "Knowledgeable team ready to help",
                icon: "👥",
              },
              {
                title: "Fast Delivery",
                desc: "Quick and reliable shipping options",
                icon: "🚚",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-6xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Care for Your Pet?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of happy pet owners who trust us
          </p>
          <Link href="/register" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
            Get Started Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-xl font-bold mb-4">About Us</h4>
              <p className="text-gray-400">
                Your trusted pet shop for quality products and services.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Quick Links</h4>
              <ul className="text-gray-400 space-y-2">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about-us" className="hover:text-white">
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Contact</h4>
              <p className="text-gray-400">📧 info@happypetshop.com</p>
              <p className="text-gray-400">📱 (555) 123-4567</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Happy Pet Shop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
