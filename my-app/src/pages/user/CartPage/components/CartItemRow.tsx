"use client";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  isSelected: boolean;
}

interface CartItemRowProps {
  item: CartItem;
  onToggleSelect: (id: string) => void;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
}

export default function CartItemRow({
  item,
  onToggleSelect,
  onIncrement,
  onDecrement,
  onRemove,
}: CartItemRowProps) {
  const lineTotal = item.price * item.quantity;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
      {/* Checkbox */}
      <div className="flex-shrink-0">
        <input
          type="checkbox"
          checked={item.isSelected}
          onChange={() => onToggleSelect(item.id)}
          className="w-5 h-5 text-blue-600 rounded cursor-pointer focus:ring-2 focus:ring-blue-500"
          aria-label={`Select ${item.name}`}
        />
      </div>

      {/* Product Image */}
      <div className="flex-shrink-0">
        <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
          {item.name}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Giá: <span className="font-semibold text-gray-800">{formatCurrency(item.price)}</span>
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex-shrink-0 flex items-center gap-2 bg-gray-100 rounded-lg p-2">
        <button
          onClick={() => onDecrement(item.id)}
          disabled={item.quantity === 0}
          className="w-8 h-8 flex items-center justify-center rounded bg-white hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition text-gray-700 font-bold"
          aria-label="Giảm số lượng"
          title="Giảm số lượng"
        >
          −
        </button>
        <span className="w-8 text-center text-sm font-semibold text-gray-800">
          {item.quantity}
        </span>
        <button
          onClick={() => onIncrement(item.id)}
          className="w-8 h-8 flex items-center justify-center rounded bg-white hover:bg-gray-200 transition text-gray-700 font-bold"
          aria-label="Tăng số lượng"
          title="Tăng số lượng"
        >
          +
        </button>
      </div>

      {/* Line Total */}
      <div className="flex-shrink-0 text-right min-w-20">
        <p className="text-sm font-bold text-gray-800">
          {formatCurrency(lineTotal)}
        </p>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(item.id)}
        className="flex-shrink-0 text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition"
        aria-label={`Xóa ${item.name} khỏi giỏ hàng`}
        title="Xóa khỏi giỏ hàng"
      >
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}
