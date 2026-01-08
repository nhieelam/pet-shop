"use client";

import { useState } from "react";
import { Address, AddressFormData } from "../type";

const mockAddresses: Address[] = [
  {
    id: "addr_001",
    label: "Yên Nhi",
    phone: "(+84) 793 472 637",
    fullAddress: "506/49/60C, Lạc Long Quân, Phường 5, Quận 11, TP. Hồ Chí Minh",
    isDefault: true,
  },
  {
    id: "addr_002",
    label: "Lâm Thái Yên Nhi",
    phone: "(+84) 793 472 637",
    fullAddress: "568/5/21, Phường 5, Quận 11, TP. Hồ Chí Minh",
    isDefault: false,
  },
  {
    id: "addr_003",
    label: "Anh Chánh",
    phone: "(+84) 983 028 691",
    fullAddress: "Tòa Nhà Landmark, tòa nhà, 756a Âu Cơ, Phường 14, Quận Tân Bình, TP. Hồ Chí Minh",
    isDefault: false,
  },
];

export default function AddressList() {
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(
    addresses.find((a) => a.isDefault)?.id || addresses[0]?.id
  );
  const [formData, setFormData] = useState({ label: "", phone: "", fullAddress: "" });
  const [updateFormData, setUpdateFormData] = useState<AddressFormData>({
    id: "",
    name: "",
    phone: "",
    location: "",
    address: "",
    type: "house",
  });

  const defaultAddress = addresses.find((a) => a.isDefault);

  const handleSelectAddress = (id: string) => {
    setSelectedAddressId(id);
    setAddresses(
      addresses.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
  };

  const handleConfirmChange = () => {
    handleSelectAddress(selectedAddressId);
    setIsModalOpen(false);
    alert("Cập nhật địa chỉ mặc định thành công!");
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.label.trim() || !formData.phone.trim() || !formData.fullAddress.trim()) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const newAddress: Address = {
      id: `addr_${Date.now()}`,
      label: formData.label,
      phone: formData.phone,
      fullAddress: formData.fullAddress,
      isDefault: false,
    };

    setAddresses([...addresses, newAddress]);
    setFormData({ label: "", phone: "", fullAddress: "" });
    setIsAddOpen(false);
    alert("Thêm địa chỉ thành công!");
  };

  const handleDeleteAddress = (id: string) => {
    if (confirm("Bạn chắc chắn muốn xóa địa chỉ này?")) {
      const newAddresses = addresses.filter((a) => a.id !== id);
      setAddresses(newAddresses);
      if (selectedAddressId === id) {
        setSelectedAddressId(newAddresses[0]?.id || "");
      }
    }
  };

  const handleOpenUpdateModal = (id: string) => {
    const address = addresses.find((a) => a.id === id);
    if (address) {
      const parts = address.fullAddress.split(",");
      setUpdateFormData({
        id: address.id,
        name: address.label,
        phone: address.phone,
        location: parts.slice(-3).join(",").trim() || "TP. Hồ Chí Minh, Quận 11, Phường 5",
        address: parts[0]?.trim() || address.fullAddress,
        type: "house",
      });
      setIsModalOpen(false);
      setIsUpdateOpen(true);
    }
  };

  const handleUpdateAddress = () => {
    if (
      !updateFormData.name.trim() ||
      !updateFormData.phone.trim() ||
      !updateFormData.location.trim() ||
      !updateFormData.address.trim()
    ) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const fullAddress = `${updateFormData.address}, ${updateFormData.location}`;
    setAddresses(
      addresses.map((a) =>
        a.id === updateFormData.id
          ? {
              ...a,
              label: updateFormData.name,
              phone: updateFormData.phone,
              fullAddress: fullAddress,
            }
          : a
      )
    );

    alert("Cập nhật địa chỉ thành công!");
    setIsUpdateOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Default Address Display */}
      {defaultAddress && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <span className="text-red-600 text-xl">📍</span>
              <h3 className="text-gray-800 font-semibold">Địa Chỉ Nhận Hàng</h3>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-gray-800 font-bold text-lg">{defaultAddress.label}</h4>
                  <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">
                    Mặc định
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{defaultAddress.phone}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{defaultAddress.fullAddress}</p>
              </div>
              <button
                onClick={() => {
                  setSelectedAddressId(defaultAddress.id);
                  setIsModalOpen(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 whitespace-nowrap"
              >
                Thay Đổi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Address Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-end z-50">
          <div className="bg-white w-full md:max-w-md h-full md:h-auto md:rounded-2xl shadow-2xl overflow-y-auto flex flex-col transform transition-all">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-800">Địa Chỉ Của Tôi</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl transition"
                aria-label="Đóng"
              >
                ✕
              </button>
            </div>

            {/* Addresses List */}
            <div className="flex-1 p-6 space-y-3">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  onClick={() => setSelectedAddressId(address.id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                    selectedAddressId === address.id
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Radio Button */}
                    <div className="mt-1 flex-shrink-0">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${
                          selectedAddressId === address.id
                            ? "border-blue-600 bg-blue-600"
                            : "border-gray-300 bg-white"
                        }`}
                      >
                        {selectedAddressId === address.id && (
                          <span className="text-white text-xs">✓</span>
                        )}
                      </div>
                    </div>

                    {/* Address Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-gray-800 font-bold">{address.label}</h4>
                        {address.isDefault && (
                          <span className="inline-flex items-center bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded">
                            Mặc định
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-1">{address.phone}</p>
                      <p className="text-gray-600 text-sm leading-relaxed break-words">
                        {address.fullAddress}
                      </p>
                    </div>

                    {/* Edit Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenUpdateModal(address.id);
                      }}
                      className="text-blue-600 hover:text-blue-700 text-sm font-semibold whitespace-nowrap flex-shrink-0"
                    >
                      Cập nhật
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Address Button */}
            <div className="border-t border-gray-100 p-6">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setFormData({ label: "", phone: "", fullAddress: "" });
                  setIsAddOpen(true);
                }}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition transform hover:scale-105 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                <span>+</span> Thêm Địa Chỉ Mới
              </button>
            </div>

            {/* Confirm Button */}
            <div className="border-t border-gray-100 p-6 flex gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded-lg transition"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmChange}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Address Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all duration-300">
            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-full mb-4">
                <span className="text-xl">📍</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Thêm Địa Chỉ Mới</h3>
              <p className="text-gray-500 text-sm mt-1">Nhập thông tin địa chỉ mới của bạn</p>
            </div>

            <form onSubmit={handleAddAddress} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                  Tên địa chỉ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                  placeholder="VD: Yên Nhi, Lâm Thái..."
                  required
                  autoFocus
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                  placeholder="VD: (+84) 793 472 637"
                  required
                />
              </div>

              {/* Full Address */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                  Địa chỉ đầy đủ <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.fullAddress}
                  onChange={(e) =>
                    setFormData({ ...formData, fullAddress: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none bg-gray-50 hover:bg-white"
                  placeholder="Nhập địa chỉ đầy đủ: Số nhà, Đường phố, Phường, Quận, TP..."
                  rows={3}
                  required
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-lg transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md"
                >
                  ➕ Thêm Địa Chỉ
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAddOpen(false);
                    setFormData({ label: "", phone: "", fullAddress: "" });
                  }}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Address Modal */}
      {isUpdateOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-end z-50">
          <div className="bg-white w-full md:max-w-2xl h-full md:h-auto md:rounded-2xl shadow-2xl overflow-y-auto flex flex-col">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-800">
                Cập nhật địa chỉ (dùng thông tin trước sắp nhập)
              </h3>
              <button
                onClick={() => setIsUpdateOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl transition"
                aria-label="Đóng"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 space-y-6">
              {/* Name and Phone Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Hộ và tên
                  </label>
                  <input
                    type="text"
                    value={updateFormData.name}
                    onChange={(e) =>
                      setUpdateFormData({ ...updateFormData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50"
                    placeholder="VD: Yên Nhi"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    value={updateFormData.phone}
                    onChange={(e) =>
                      setUpdateFormData({ ...updateFormData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50"
                    placeholder="VD: (+84) 793 472 637"
                  />
                </div>
              </div>

              {/* Location Dropdown */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tỉnh/Thành phố, Quận/Huyện, Phường/Xã
                </label>
                <select
                  value={updateFormData.location}
                  onChange={(e) =>
                    setUpdateFormData({ ...updateFormData, location: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 appearance-none cursor-pointer"
                >
                  <option value="">Chọn địa điểm</option>
                  <option value="TP. Hồ Chí Minh, Quận 11, Phường 5">
                    TP. Hồ Chí Minh, Quận 11, Phường 5
                  </option>
                  <option value="TP. Hồ Chí Minh, Quận 1, Phường Bến Nghé">
                    TP. Hồ Chí Minh, Quận 1, Phường Bến Nghé
                  </option>
                  <option value="TP. Hồ Chí Minh, Quận Tân Bình, Phường 14">
                    TP. Hồ Chí Minh, Quận Tân Bình, Phường 14
                  </option>
                </select>
              </div>

              {/* Specific Address */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Địa chỉ cụ thể
                </label>
                <input
                  type="text"
                  value={updateFormData.address}
                  onChange={(e) =>
                    setUpdateFormData({ ...updateFormData, address: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50"
                  placeholder="VD: 506/49/60C, Lạc Long Quân"
                />
              </div>

              {/* Map Placeholder */}
              <div className="rounded-lg overflow-hidden border border-gray-200 h-64 bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">🗺️</div>
                  <p className="text-gray-600 text-sm">Google Maps Placeholder</p>
                  <p className="text-gray-500 text-xs">Bản đồ sẽ hiển thị tại đây</p>
                </div>
              </div>

              {/* Address Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Loại địa chỉ
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setUpdateFormData({ ...updateFormData, type: "house" })
                    }
                    className={`flex-1 px-4 py-3 rounded-lg font-semibold transition border-2 ${
                      updateFormData.type === "house"
                        ? "border-red-600 bg-red-50 text-red-600"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Nhà Riêng
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setUpdateFormData({ ...updateFormData, type: "office" })
                    }
                    className={`flex-1 px-4 py-3 rounded-lg font-semibold transition border-2 ${
                      updateFormData.type === "office"
                        ? "border-red-600 bg-red-50 text-red-600"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Văn Phòng
                  </button>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="border-t border-gray-100 p-6 bg-white flex gap-3">
              <button
                onClick={() => setIsUpdateOpen(false)}
                className="flex-1 bg-white hover:bg-gray-100 text-gray-800 font-bold py-3 rounded-lg transition border border-gray-300"
              >
                Trở Lại
              </button>
              <button
                onClick={handleUpdateAddress}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Hoàn thành
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
