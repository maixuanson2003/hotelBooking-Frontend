interface BookingTableProps {
  bookings: Booking[];
  onChange: (id: number) => void;
  onCancel: (id: number) => void;
}
interface Booking {
  id: number;
  totalRoom: number;
  username: string;
  totalPrice: number;
  status: string;
  numberPeople: number;
  createAt: string;
}
export default function Booking({
  bookings,
  onChange,
  onCancel,
}: BookingTableProps) {
  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <table className="min-w-full table-auto text-left">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="px-4 py-3">Booking ID</th>
            <th className="px-4 py-3">Rooms</th>
            <th className="px-4 py-3">People</th>
            <th className="px-4 py-3">Total Price</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Booking Date</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr
              key={booking.id}
              className="border-b hover:bg-gray-100 transition duration-300"
            >
              <td className="px-4 py-3">{booking.id}</td>
              <td className="px-4 py-3">{booking.totalRoom}</td>
              <td className="px-4 py-3">{booking.numberPeople}</td>
              <td className="px-4 py-3">${booking.totalPrice}</td>
              <td
                className={`px-4 py-3 ${
                  booking.status === "Confirmed"
                    ? "text-green-600 font-bold"
                    : "text-red-600 font-bold"
                }`}
              >
                {booking.status}
              </td>
              <td className="px-4 py-3">{booking.createAt}</td>
              <td className="px-4 py-3 flex gap-3">
                <button
                  className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-400"
                  onClick={() => onChange(booking.id)}
                >
                  Đổi lịch
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-400"
                  onClick={() => onCancel(booking.id)}
                >
                  Hủy Lịch
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-400"
                  onClick={() => onCancel(booking.id)}
                >
                  chi tiết
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
