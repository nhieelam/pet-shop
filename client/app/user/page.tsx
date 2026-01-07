"use client";

import Link from "next/link";
import ListProducts from "./components/listProducts";
import ListServices from "./components/listServices";
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
            Happy Pet Shop🐾
          </h1>
          <p className="text-xl sm:text-2xl mb-8 opacity-90">
            Cửa hàng thú cưng hàng đầu cung cấp thức ăn, đồ chơi, phụ kiện chất lượng cao và dịch vụ chăm sóc toàn diện với đội ngũ chuyên viên tận tâm, giàu kinh nghiệm.
          </p>
        </div>
      </section>

      {/* Featured Products Section */}
      <ListProducts />

      {/* Services Section */}
      <ListServices />
    </div>
  );
}
