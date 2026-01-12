const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    Paid: "bg-green-100 text-green-800",
    Pending: "bg-orange-100 text-orange-800",
    Cancelled: "bg-red-100 text-red-800",
  }[status] || "bg-gray-100 text-gray-800";

  const labels: Record<string, string> = {
    Paid: "✓ Đã thanh toán",
    Pending: "⏳ Chờ thanh toán",
    Cancelled: "✕ Bị hủy",
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${styles}`}>
      {labels[status] || status}
    </span>
  );
};

export default StatusBadge;