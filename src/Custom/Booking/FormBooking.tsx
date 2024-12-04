import { useState } from "react";
interface props {
  handleSenData: (userDetails: {
    name: string;
    email: string;
    phone: string;
    saleCode: string;
    numberPeople: number;
    hotelId: number;
    checkinDate: string;
    checkOutDate: string;
  }) => void;
  HotelId: number;
}
interface TypeRoom {
  amountRoom: number;
  typeRoom: string;
}
interface userDetails {
  name: string;
  email: string;
  phone: string;
  saleCode: string;
  numberPeople: number;
  hotelId: number;
  checkinDate: string;
  checkOutDate: string;
}
export default function FormBooking({
  handleSenData,

  HotelId,
}: props) {
  const [userDetails, setUserDetails] = useState<userDetails>({
    name: "",
    email: "",
    phone: "",
    saleCode: "",
    numberPeople: 1,
    hotelId: HotelId,
    checkinDate: "",
    checkOutDate: "",
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };
  const handleSubmit = () => {
    handleSenData(userDetails);
  };

  return (
    <form className="flex flex-col gap-y-4 ">
      <div>
        <label htmlFor="name" className="block text-lg font-medium">
          Tên của bạn
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={userDetails.name}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-lg font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={userDetails.email}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-lg font-medium">
          Số điện thoại
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={userDetails.phone}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>
      <div>
        <label htmlFor="saleCode" className="block text-lg font-medium">
          Mã giảm giá (nếu có)
        </label>
        <input
          type="text"
          id="saleCode"
          name="saleCode"
          value={userDetails.saleCode}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div>
        <label htmlFor="numberPeople" className="block text-lg font-medium">
          Số người
        </label>
        <input
          type="number"
          id="numberPeople"
          name="numberPeople"
          value={userDetails.numberPeople}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
          min="1"
        />
      </div>
      <div>
        <label htmlFor="checkinDate" className="block text-lg font-medium">
          Ngày nhận phòng
        </label>
        <input
          type="date"
          id="checkinDate"
          name="checkinDate"
          value={userDetails.checkinDate}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>
      <div>
        <label htmlFor="checkOutDate" className="block text-lg font-medium">
          Ngày trả phòng
        </label>
        <input
          type="date"
          id="checkOutDate"
          name="checkOutDate"
          value={userDetails.checkOutDate}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Xác nhận đặt phòng
      </button>
    </form>
  );
}
