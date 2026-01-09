import { useState, useMemo } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  isSelected: boolean;
}

const mockCartItems: CartItem[] = [
  {
    id: "prod_001",
    name: "Dog Food Premium - Thức ăn chó cao cấp",
    price: 450000,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=200&h=200&fit=crop",
    isSelected: true,
  },
  {
    id: "prod_002",
    name: "Cat Bed - Giường mèo êm ái",
    price: 280000,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=200&h=200&fit=crop",
    isSelected: true,
  },
  {
    id: "prod_003",
    name: "Dog Leash - Dây xích chó chất lượng cao",
    price: 95000,
    quantity: 3,
    image: "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=200&h=200&fit=crop",
    isSelected: false,
  },
  {
    id: "prod_004",
    name: "Pet Toys Set - Bộ đồ chơi thú cưng",
    price: 180000,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=200&h=200&fit=crop",
    isSelected: true,
  },
  {
    id: "prod_005",
    name: "Pet Grooming Kit - Bộ vệ sinh thú cưng",
    price: 320000,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1552053831-71594a27c62d?w=200&h=200&fit=crop",
    isSelected: false,
  },
];

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(mockCartItems);

  const toggleSelect = (id: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isSelected: !item.isSelected } : item
      )
    );
  };

  const selectAll = (selectAll: boolean) => {
    setItems((prevItems) =>
      prevItems.map((item) => ({ ...item, isSelected: selectAll }))
    );
  };

  const incrementQuantity = (id: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity - 1) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const checkout = () => {
    const selectedItems = items.filter((item) => item.isSelected);

    if (selectedItems.length === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán!");
      return;
    }

    sessionStorage.setItem("checkoutItems", JSON.stringify(selectedItems));
    window.location.href = "/payment?source=cart";
  };

  const allSelected = useMemo(
    () => items.length > 0 && items.every((item) => item.isSelected),
    [items]
  );

  return {
    items,
    allSelected,
    toggleSelect,
    selectAll,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    checkout,
  };
}
