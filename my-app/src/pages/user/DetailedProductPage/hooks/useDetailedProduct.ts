import { useMemo, useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  availableAmount: number;
  image?: string;
}

interface UseProductDetailProps {
  product: Product;
}

export function useProductDetail() {
  const [product, setProduct] = useState<Product | null >(null);

  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);



  const handleAddToCart = () => {

  };



  const formatPrice = (price: number) => {
    return price.toLocaleString("vi-VN");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  return {
    quantity,
    setQuantity,
  };
}