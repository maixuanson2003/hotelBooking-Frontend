import React, { useEffect } from "react";
interface props {
  CheckToast: boolean;
  onClose: () => void;
}
export default function Toast({ CheckToast, onClose }: props) {
  useEffect(() => {
    if (CheckToast) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Toast sẽ tự động tắt sau 3 giây.
      return () => clearTimeout(timer);
    }
  }, [CheckToast, onClose]);

  if (!CheckToast) return null;

  return (
    <div className="fixed top-4 right-4 z-40 bg-red-500 text-white p-4 rounded shadow-lg">
      {"Thông tin xác thực không hợp lệ. Vui lòng thử lại."}
    </div>
  );
}
