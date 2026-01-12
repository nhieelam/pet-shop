import type { StockProduct } from "./types";

export const STORAGE_KEY = "admin_stock_products";

export const DEFAULT_PRODUCTS: StockProduct[] = [
  { id: "prod_001", name: "Thức ăn cao cấp cho chó", stock: 45 },
  { id: "prod_002", name: "Giường mèo êm ái", stock: 12 },
  { id: "prod_003", name: "Dây xích chó cao cấp", stock: 0 },
  { id: "prod_004", name: "Bộ đồ chơi thú cưng", stock: 28 },
  { id: "prod_005", name: "Bộ vệ sinh thú cưng", stock: 18 },
];
