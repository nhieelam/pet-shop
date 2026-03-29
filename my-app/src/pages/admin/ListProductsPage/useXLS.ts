"use client";

import { useState, useCallback, type Dispatch, type SetStateAction, type RefObject } from "react";
import type { ProductData, ProductCreationRequest } from "../../../types/productTypes";
import * as productService from "../../../services/productService";
import { uploadImageToCloudinary } from "../../../services/cloudinaryService";
import { exportTableToXls } from "@/utils/exportFile";
import { readXlsFirstSheetRows, cellToString } from "@/utils/importFile";

export type ProductFormState = {
  name: string;
  description: string;
  categoryId: string;
  brand: string;
  price: string;
  quantity: string;
  imageUrl: string;
  available: boolean;
};

interface UseXLSParams {
  filteredProducts: ProductData[];
  fetchProducts: () => Promise<void>;
  showToast: (message: string, type?: "success" | "error" | "info") => void;
  setFormData: Dispatch<SetStateAction<ProductFormState>>;
  fileInputRef: RefObject<HTMLInputElement | null>;
}

function headerColumnIndex(headerRow: unknown[], key: string): number {
  const k = key.toLowerCase().trim();
  return headerRow.findIndex((h) => cellToString(h).toLowerCase().trim() === k);
}

export function useXLS({
  filteredProducts,
  fetchProducts,
  showToast,
  setFormData,
  fileInputRef,
}: UseXLSParams) {
  const [imageUploading, setImageUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);
  const [importSubmitting, setImportSubmitting] = useState(false);

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    setImageUploadError(null);
    setImageUploading(true);
    try {
      const url = await uploadImageToCloudinary(file);
      setFormData((d) => ({ ...d, imageUrl: url }));
    } catch (err) {
      setImageUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setImageUploading(false);
      e.target.value = "";
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleExportProduct = useCallback(() => {
    exportTableToXls({
      filename: `product-export-${new Date().toISOString().slice(0, 10)}`,
      sheetName: "Product",
      headers: [
        "Product ID",
        "Product Name",
        "Product Description",
        "Product Category",
        "Product Brand",
        "Product Price",
        "Product Quantity",
      ],
      data: filteredProducts.map((p) => {
        return [
          p.id,
          p.name ?? "",
          p.description ?? "",
          p.categoryName ?? "",
          p.brand ?? "",
          p.price ?? 0,
          p.quantity ?? 0,
        ];
      }),
    });
  }, [filteredProducts]);

  const handleImportProductFile = useCallback(
    async (file: File) => {
      setImportSubmitting(true);
      try {
        const rows = await readXlsFirstSheetRows(file);
        if (!rows.length) {
          throw new Error("File is empty");
        }
        const headerRow = rows[0] as unknown[];
        const get = (key: string, row: unknown[]) => {
          const idx = headerColumnIndex(headerRow, key);
          if (idx < 0) return "";
          return cellToString(row[idx]);
        };

        const list: ProductCreationRequest[] = [];
        for (let r = 1; r < rows.length; r++) {
          const row = rows[r] as unknown[];
          try {
            const name = get("name", row);
            const description = get("description", row);
            const categoryId = get("categoryId", row);
            const brand = get("brand", row);
            const price = get("price", row);
            const quantity = get("quantity", row);
            const imageUrl = get("imageUrl", row);
            list.push({
              name,
              description,
              categoryId,
              brand,
              price: parseFloat(price) || 0,
              quantity: parseInt(quantity, 10) || 0,
              imageUrl: imageUrl || undefined,
            });
          } catch (e) {
            console.error(`Error processing row ${r + 1}:`, e);
          }
        }

        await productService.createListProduct({ products: list });
        showToast(`Đã nhập ${list.length} sản phẩm từ file`, "success");
        await fetchProducts();
      } catch (e) {
        showToast(e instanceof Error ? e.message : "Nhập file thất bại", "error");
      } finally {
        setImportSubmitting(false);
      }
    },
    [fetchProducts, showToast]
  );

  return {
    handleImageFileChange,
    handleExportProduct,
    handleImportProductFile,
    imageUploading,
    imageUploadError,
    setImageUploadError,
    importSubmitting,
  };
}
