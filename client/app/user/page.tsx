"use client";

import ListProducts from "./components/listProducts";
import ListServices from "./components/listServices";
export default function Home() {
  return (
    <div className="w-full">
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

      <ListProducts />

      <ListServices />
    </div>
  );
}
