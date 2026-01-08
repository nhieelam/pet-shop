"use client";

import { useEffect, useMemo, useState } from "react";

type StockProduct = {
	id: string;
	name: string;
	stock: number;
};

const STORAGE_KEY = "admin_stock_products";

const DEFAULT_PRODUCTS: StockProduct[] = [
	{ id: "prod_001", name: "Thức ăn cao cấp cho chó", stock: 45 },
	{ id: "prod_002", name: "Giường mèo êm ái", stock: 12 },
	{ id: "prod_003", name: "Dây xích chó cao cấp", stock: 0 },
	{ id: "prod_004", name: "Bộ đồ chơi thú cưng", stock: 28 },
	{ id: "prod_005", name: "Bộ vệ sinh thú cưng", stock: 18 },
];

export default function AdminStockInPage() {
	const [products, setProducts] = useState<StockProduct[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const [selectedProductId, setSelectedProductId] = useState("");
	const [addQuantity, setAddQuantity] = useState<string>("");

	useEffect(() => {
		try {
			const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
			if (raw) {
				const parsed = JSON.parse(raw);
				if (
					Array.isArray(parsed) &&
					parsed.every(
						(p) =>
							p &&
							typeof p.id === "string" &&
							typeof p.name === "string" &&
							typeof p.stock === "number"
					)
				) {
					setProducts(parsed);
				} else {
					setProducts(DEFAULT_PRODUCTS);
				}
			} else {
				setProducts(DEFAULT_PRODUCTS);
			}
		} catch {
			setProducts(DEFAULT_PRODUCTS);
		} finally {
			setIsLoading(false);
		}
	}, []);

	const persist = (next: StockProduct[]) => {
		setProducts(next);
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
		} catch {
			// ignore
		}
	};

	const selectedProduct = useMemo(
		() => products.find((p) => p.id === selectedProductId) || null,
		[products, selectedProductId]
	);

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!selectedProductId) {
			alert("Vui lòng chọn sản phẩm.");
			return;
		}

		const qty = Number(addQuantity);
		if (!Number.isFinite(qty) || qty <= 0 || !Number.isInteger(qty)) {
			alert("Số lượng nhập kho phải là số nguyên > 0.");
			return;
		}

		const next = products.map((p) =>
			p.id === selectedProductId ? { ...p, stock: p.stock + qty } : p
		);
		persist(next);
		setAddQuantity("");
		alert("Nhập kho thành công!");
	};

	return (
		<main className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-8">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

				<div className="mb-8">
					<h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">📥 Trang Nhập Kho</h1>
					<p className="text-gray-600">Tăng số lượng tồn kho cho sản phẩm</p>
				</div>

				<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
					{isLoading ? (
						<div className="text-center text-gray-600 py-12">Đang tải...</div>
					) : (
						<form onSubmit={onSubmit} className="space-y-5">
							<div>
								<label className="block text-sm font-bold text-gray-700 mb-2">
									Chọn sản phẩm <span className="text-red-500">*</span>
								</label>
								<select
									value={selectedProductId}
									onChange={(e) => setSelectedProductId(e.target.value)}
									className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
								>
									<option value="">-- Chọn sản phẩm --</option>
									{products.map((p) => (
										<option key={p.id} value={p.id}>
											{p.name}
										</option>
									))}
								</select>
								{selectedProduct && (
									<p className="text-sm text-gray-600 mt-2">
										Tồn kho hiện tại: <span className="font-bold">{selectedProduct.stock}</span>
									</p>
								)}
							</div>

							<div>
								<label className="block text-sm font-bold text-gray-700 mb-2">
									Số lượng nhập kho <span className="text-red-500">*</span>
								</label>
								<input
									type="number"
									min={1}
									step={1}
									value={addQuantity}
									onChange={(e) => setAddQuantity(e.target.value)}
									placeholder="VD: 10"
									className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
								/>
							</div>

							<div className="flex justify-end gap-3">
								<button
									type="submit"
									className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition"
								>
									Cập nhật tồn kho
								</button>
							</div>
						</form>
					)}
				</div>

			</div>
		</main>
	);
}

