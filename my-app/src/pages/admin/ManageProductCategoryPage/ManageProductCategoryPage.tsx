"use client";

import { useEffect, useState } from "react";

const DEFAULT_CATEGORIES = [
	"Thức ăn cho chó",
	"Thức ăn cho mèo",
	"Đồ chơi",
	"Phụ kiện",
	"Vệ sinh",
	"Y tế",
	"Quần áo",
	"Khác",
];

const STORAGE_KEY = "admin_categories";

export default function ManageProductCategoryPage() {
	const [categories, setCategories] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	// Inline edit state
	const [editingIndex, setEditingIndex] = useState<number | null>(null);
	const [editingValue, setEditingValue] = useState("");

	// Create modal state
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [newCategoryName, setNewCategoryName] = useState("");

	// Load categories from localStorage (fallback to defaults)
	useEffect(() => {
		try {
			const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
			if (raw) {
				const parsed = JSON.parse(raw);
				if (Array.isArray(parsed) && parsed.every((x) => typeof x === "string")) {
					setCategories(parsed);
				} else {
					setCategories(DEFAULT_CATEGORIES);
				}
			} else {
				setCategories(DEFAULT_CATEGORIES);
			}
		} catch {
			setCategories(DEFAULT_CATEGORIES);
		} finally {
			setIsLoading(false);
		}
	}, []);

	const persist = (next: string[]) => {
		setCategories(next);
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
		} catch {
			// ignore persistence errors
		}
	};

	const openCreateModal = () => {
		setNewCategoryName("");
		setIsCreateModalOpen(true);
	};

	const closeCreateModal = () => {
		setIsCreateModalOpen(false);
		setNewCategoryName("");
	};

	const confirmCreateCategory = () => {
		const name = newCategoryName.trim();
		if (!name) {
			alert("Tên danh mục không được để trống.");
			return;
		}
		if (categories.some((c) => c.toLowerCase() === name.toLowerCase())) {
			alert("Danh mục đã tồn tại.");
			return;
		}
		persist([name, ...categories]);
		closeCreateModal();
	};

	const startInlineEdit = (index: number) => {
		setEditingIndex(index);
		setEditingValue(categories[index] ?? "");
	};

	const cancelInlineEdit = () => {
		setEditingIndex(null);
		setEditingValue("");
	};

	const saveInlineEdit = () => {
		if (editingIndex === null) return;
		const name = editingValue.trim();

		if (!name) {
			alert("Tên danh mục không được để trống.");
			return;
		}
		if (categories.some((c, i) => i !== editingIndex && c.toLowerCase() === name.toLowerCase())) {
			alert("Danh mục đã tồn tại.");
			return;
		}

		const next = [...categories];
		next[editingIndex] = name;
		persist(next);
		cancelInlineEdit();
	};

	const deleteCategory = (index: number) => {
		const name = categories[index];
		const ok = confirm(`Bạn có chắc muốn xóa danh mục "${name}"?`);
		if (!ok) return;
		const next = categories.filter((_, i) => i !== index);
		if (editingIndex === index) {
			cancelInlineEdit();
		}
		persist(next);
	};

	return (
		<main className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-8">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="mb-8 flex items-center justify-between">
					<div>
						<h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">📦 Quản Lý Danh Mục</h1>
						<p className="text-gray-600">
							Tổng số: <span className="font-bold">{categories.length}</span> danh mục
						</p>
					</div>
					<button
						onClick={openCreateModal}
						className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition flex items-center gap-2"
					>
						<span>➕</span>
						Thêm danh mục
					</button>
				</div>

				{/* Content */}
				<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
					{isLoading ? (
						<div className="text-center text-gray-600 py-12">Đang tải...</div>
					) : categories.length === 0 ? (
						<div className="text-center text-gray-600 py-12">Chưa có danh mục nào</div>
					) : (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
							{categories.map((cat, idx) => (
								<div
									key={`${cat}-${idx}`}
									className="border border-gray-200 rounded-xl p-4 bg-gray-50 hover:bg-gray-100 transition flex items-start justify-between"
								>
									<div className="flex-1">
										{editingIndex === idx ? (
											<div>
												<label className="block text-sm font-semibold text-gray-700 mb-2">
													Tên danh mục
												</label>
												<input
													value={editingValue}
													onChange={(e) => setEditingValue(e.target.value)}
													onKeyDown={(e) => {
														if (e.key === "Enter") saveInlineEdit();
														if (e.key === "Escape") cancelInlineEdit();
													}}
													autoFocus
													className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
												/>
												<div className="mt-2 flex items-center gap-2">
													<button
														type="button"
														onClick={saveInlineEdit}
														className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm"
													>
														Lưu
													</button>
													<button
														type="button"
														onClick={cancelInlineEdit}
														className="px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-200 text-gray-800 font-semibold text-sm"
													>
														Hủy
													</button>
												</div>
											</div>
										) : (
											<div className="text-lg font-semibold text-gray-800">{cat}</div>
										)}
									</div>
									<div className="flex items-center gap-2">
										<button
											onClick={() => startInlineEdit(idx)}
											disabled={editingIndex !== null && editingIndex !== idx}
											className="px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-200 text-gray-800 font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
											title="Sửa tên"
										>
											✏️ Sửa
										</button>
										<button
											onClick={() => deleteCategory(idx)}
											disabled={editingIndex === idx}
											className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
											title="Xóa"
										>
											🗑️ Xóa
										</button>
									</div>
								</div>
							))}
						</div>
					)}
				</div>

				{/* Create Category Modal */}
				{isCreateModalOpen && (
					<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
						<div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
							  <div className="bg-linear-to-r from-blue-600 to-blue-700 px-6 py-4">
								<h2 className="text-xl font-bold text-white">➕ Thêm danh mục</h2>
							</div>
							<div className="p-6">
								<label className="block text-sm font-bold text-gray-700 mb-2">Tên danh mục</label>
								<input
									value={newCategoryName}
									onChange={(e) => setNewCategoryName(e.target.value)}
									onKeyDown={(e) => {
										if (e.key === "Enter") confirmCreateCategory();
										if (e.key === "Escape") closeCreateModal();
									}}
									autoFocus
									placeholder="VD: Sản phẩm mới..."
									className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
								/>
							</div>
							<div className="bg-gray-50 px-6 py-4 flex gap-3 justify-end">
								<button
									type="button"
									onClick={closeCreateModal}
									className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-lg transition"
								>
									Hủy
								</button>
								<button
									type="button"
									onClick={confirmCreateCategory}
									className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
								>
									Thêm
								</button>
							</div>
						</div>
					</div>
				)}

				{/* Helper note */}
				<p className="text-xs text-gray-500 mt-4">
					Lưu ý: Danh mục được lưu cục bộ trong trình duyệt (localStorage). Để đồng bộ với trang khác,
					cần đọc từ cùng khóa: <span className="font-mono">{STORAGE_KEY}</span>.
				</p>
			</div>
		</main>
	);
}

