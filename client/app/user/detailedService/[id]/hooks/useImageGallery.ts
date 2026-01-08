import { useState, useCallback } from "react";

interface UseImageGalleryReturn {
  selectedImage: string | null;
  setSelectedImage: (image: string | null) => void;
}

export function useImageGallery(): UseImageGalleryReturn {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return {
    selectedImage,
    setSelectedImage,
  };
}
