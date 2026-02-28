"use client";
import { useProfileHeader } from "../hooks/useProfileHeader";

export default function ProfileHeader() {
  const { 
    user, 
    isEditOpen, 
    editName, 
    editPhone, 
    editAvatar, 
    handleEditSubmit, 
    setIsEditOpen, 
    setEditAvatar, 
    setEditName, 
    setEditPhone 
  } = useProfileHeader();


  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>

      <div className="px-6 pb-6">
        <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-16 mb-6 relative z-10">
          <div className="flex flex-col items-center md:items-start">
            <img
              src={user.avatar}
              alt={user.username}
              className="w-32 h-32 rounded-lg border-4 border-white shadow-lg object-cover"
            />
            <p className="text-sm text-gray-500 mt-2">
              Thành viên từ {new Date(user.createdAt).toLocaleDateString("vi-VN")}
            </p>
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{user.username}</h2>
            <div className="space-y-2 text-gray-600">
              <p className="flex items-center gap-2">
                <span>📱</span>
                {user.phone}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={() => setIsEditOpen(true)}
              className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              ✏️ Chỉnh sửa hồ sơ
            </button>
            <button
              // onClick={handleLogout}
              className="flex-1 md:flex-none bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              🚪 Đăng xuất
            </button>
          </div>
        </div>
      </div>

      {isEditOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Chỉnh sửa hồ sơ</h3>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  URL Avatar
                </label>
                <input
                  type="url"
                  value={editAvatar}
                  onChange={(e) => setEditAvatar(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tên đầy đủ
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập tên"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập số điện thoại"
                  required
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
                >
                  Lưu thay đổi
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
