import { useState, useCallback } from "react";
import { Review } from "../types";

const INITIAL_REVIEWS: Review[] = [
  {
    id: 1,
    customerName: "Nguyễn Văn An",
    rating: 5,
    comment: "Dịch vụ rất tốt! Nhân viên tận tâm, chú chó của tôi rất thích. Sẽ quay lại lần sau!",
    date: "2025-12-20",
    petName: "Max",
  },
  {
    id: 2,
    customerName: "Trần Thị Bình",
    rating: 4,
    comment: "Chất lượng dịch vụ ổn, giá cả hợp lý. Mèo nhà tôi rất sạch sẽ sau khi sử dụng dịch vụ.",
    date: "2025-12-15",
    petName: "Miu Miu",
  },
  {
    id: 3,
    customerName: "Lê Hoàng Minh",
    rating: 5,
    comment: "Tuyệt vời! Đội ngũ chuyên nghiệp, cơ sở vật chất hiện đại. Chắc chắn sẽ giới thiệu cho bạn bè.",
    date: "2025-12-10",
    petName: "Lucky",
  },
  {
    id: 4,
    customerName: "Phạm Thị Mai",
    rating: 4,
    comment: "Dịch vụ tốt, nhân viên nhiệt tình. Thú cưng của tôi được chăm sóc rất kỹ lưỡng.",
    date: "2025-12-05",
    petName: "Cún",
  },
];

interface NewReviewForm {
  customerName: string;
  petName: string;
  rating: number;
  comment: string;
}

const initialNewReviewForm: NewReviewForm = {
  customerName: "",
  petName: "",
  rating: 5,
  comment: "",
};

interface UseReviewsReturn {
  reviews: Review[];
  newReview: NewReviewForm;
  hoveredStar: number;
  setHoveredStar: (star: number) => void;
  handleRatingChange: (rating: number) => void;
  handleNewReviewChange: (field: keyof NewReviewForm, value: string | number) => void;
  handleAddReview: (e: React.FormEvent) => void;
}

export function useReviews(): UseReviewsReturn {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [newReview, setNewReview] = useState<NewReviewForm>(initialNewReviewForm);
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleRatingChange = useCallback((rating: number) => {
    setNewReview((prev) => ({ ...prev, rating }));
  }, []);

  const handleNewReviewChange = useCallback((field: keyof NewReviewForm, value: string | number) => {
    setNewReview((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleAddReview = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!newReview.customerName.trim() || !newReview.comment.trim()) {
        alert("Vui lòng nhập đầy đủ tên và nhận xét!");
        return;
      }

      const review: Review = {
        id: reviews.length + 1,
        customerName: newReview.customerName,
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString().split("T")[0],
        petName: newReview.petName || undefined,
      };

      setReviews((prev) => [review, ...prev]);
      setNewReview(initialNewReviewForm);
      setHoveredStar(0);

      alert("Cảm ơn bạn đã đánh giá!");
    },
    [newReview, reviews.length]
  );

  return {
    reviews,
    newReview,
    hoveredStar,
    setHoveredStar,
    handleRatingChange,
    handleNewReviewChange,
    handleAddReview,
  };
}
