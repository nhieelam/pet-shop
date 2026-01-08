import { Review } from "./types";
import React from "react";

export const renderStars = (rating: number): React.ReactElement[] => {
  return Array.from({ length: 5 }).map((_, i) =>
    React.createElement(
      "span",
      {
        key: i,
        className: i < Math.floor(rating) ? "text-yellow-400 text-xl" : "text-gray-300 text-xl",
      },
      "⭐"
    )
  );
};

export const calculateAverageRating = (reviews: Review[], defaultRating: number): number => {
  if (reviews.length === 0) return defaultRating;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return parseFloat((sum / reviews.length).toFixed(1));
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
