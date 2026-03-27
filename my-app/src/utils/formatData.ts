export const formatPrice = (price: number) => {
    return price.toLocaleString("vi-VN");
};

export const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("vi-VN");
};