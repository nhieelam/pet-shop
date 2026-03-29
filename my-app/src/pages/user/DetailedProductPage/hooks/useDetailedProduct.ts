import { getProductById } from "@/services/productService";
import type { ProductData } from "@/types/productTypes";
import { useState } from "react";
import { useParams } from "react-router-dom";


export const useDetailedProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<ProductData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const data = await getProductById(id as string);
            setProduct(data.data);
        } catch (error) {
            setError("Failed to fetch product");
        } finally {
            setLoading(false);
        }
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

    const handlePayment = () => {
        console.log("Payment");
    };


    return { product, loading, error, fetchProduct, formatPrice, formatDate, quantity, setQuantity, handlePayment };
}