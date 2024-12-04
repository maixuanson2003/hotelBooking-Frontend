"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GetDealDetails } from "@/app/APi/ApiSaleCode";
interface SaleCode {
  id: number;
  discountPercentage: number;
  image: string;
  title: string;
  description: string;
  code: string;
  dateStart: string;
  dateEnd: string;
}
export default function DealDetail() {
  const [saleCode, setSaleCode] = useState<SaleCode>();
  const params = useParams();
  const { id } = params;
  useEffect(() => {
    const fetchData = async (saleCodeId: number) => {
      const data = await GetDealDetails(saleCodeId);
      setSaleCode(data);
    };
    if (id) {
      fetchData(Number(id));
    }
  }, []);
  if (!saleCode) {
    return <div className="text-center py-10">Đang tải...</div>;
  }

  const isActive = saleCode.dateEnd
    ? new Date(saleCode.dateEnd).getTime() > new Date().getTime()
    : false;

  return (
    <div className="bg-gray-100 p-5 min-h-screen">
      <div className="container mx-auto max-w-4xl bg-white shadow-md rounded-lg overflow-hidden">
        <img
          src={saleCode.image}
          alt={saleCode.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{saleCode.title}</h1>
          <p className="text-gray-600 mb-4">{saleCode.description}</p>
          <p className="text-lg font-semibold text-gray-800 mb-2">
            Giảm giá: {saleCode.discountPercentage}%
          </p>
          <p className="text-gray-600 mb-2">
            Ngày bắt đầu: {new Date(saleCode.dateStart).toLocaleDateString()}
          </p>
          <p className="text-gray-600 mb-2">
            Ngày kết thúc: {new Date(saleCode.dateEnd).toLocaleDateString()}
          </p>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <p className="text-gray-700 text-sm">Mã giảm giá:</p>
            <h2 className="text-xl font-bold text-gray-900">{saleCode.code}</h2>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-2xl font-bold mb-3">Thông tin bổ sung</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>
                <strong>ID ưu đãi:</strong> {saleCode.id}
              </li>
              <li>
                <strong>Trạng thái:</strong>{" "}
                <span className={isActive ? "text-green-500" : "text-red-500"}>
                  {isActive ? "Đang hoạt động" : "Hết hạn"}
                </span>
              </li>
              <li>
                <strong>Danh mục áp dụng:</strong> Điện tử, Thời trang, Trang
                trí nội thất (ví dụ)
              </li>
              <li>
                <strong>Hạn chế:</strong> Không áp dụng cùng các ưu đãi khác,
                chỉ áp dụng khi mua hàng online.
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 mt-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Cách sử dụng mã:</h3>
            <ol className="list-decimal list-inside text-gray-700">
              <li>
                Sao chép mã: <span className="font-bold">{saleCode.code}</span>
              </li>
              <li>Truy cập cửa hàng và thêm sản phẩm vào giỏ hàng.</li>
              <li>Áp dụng mã khi thanh toán để nhận giảm giá.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
