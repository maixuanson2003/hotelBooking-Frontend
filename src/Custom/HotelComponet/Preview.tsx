"use client";
import { useEffect, useState } from "react";
import { GetPreviewByHotel } from "@/app/APi/ApiReview";
import { PostPreviewByHotel } from "@/app/APi/ApiReview";
import { Button } from "@/components/ui/button";
import { set } from "date-fns";

interface prop {
  id: number;
}
export default function Preview({ id }: prop) {
  const [Preview, setPreview] = useState<any>([]);
  const [rating, setRating] = useState<number>(0);
  const [desCription, setDescription] = useState<string>("");
  const [rerender, setReRender] = useState<number>(0);
  const [hover, setHover] = useState(0);
  useEffect(() => {
    const fetchData = async (hotelId: number) => {
      try {
        const data = await GetPreviewByHotel(hotelId);
        setPreview(data);
      } catch (error) {
        console.error("Error fetching hotel details:", error);
      }
    };
    if (id) {
      fetchData(Number(id));
    }
  }, []);
  useEffect(() => {
    const fetchData = async (hotelId: number) => {
      try {
        const data = await GetPreviewByHotel(hotelId);
        setPreview(data);
      } catch (error) {
        console.error("Error fetching hotel details:", error);
      }
    };
    if (id) {
      fetchData(Number(id));
    }
  }, [rerender]);
  const handlePostReview = async () => {
    let username = localStorage.getItem("username");
    if (username && id) {
      const data = await PostPreviewByHotel(id, desCription, username, rating);
      setDescription("");
      setReRender(rerender + 1);
    }
  };
  return (
    <div className="w-full p-4">
      <div className="flex justify-between h-1/4">
        {" "}
        <h2 className="text-xl font-semibold mb-4">Đánh giá</h2>
        <div className="flex mb-4">
          {Array.from({ length: 5 }, (_, index) => (
            <span
              key={index}
              onClick={() => setRating(index + 1)}
              onMouseEnter={() => setHover(index + 1)}
              onMouseLeave={() => setHover(rating)}
              className={`text-2xl cursor-pointer ${
                index < hover || index < rating
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
        </div>
      </div>
      <div className="h-[350px] w-full overflow-y-scroll">
        {Preview.length > 0 ? (
          Preview.map((review: any, index: number) => (
            <div key={index} className="border-b border-gray-300 pb-4 mb-4">
              <p className="font-bold text-lg">{review.username}</p>
              <p className="mt-2">{review.description}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            Chưa có đánh giá nào cho khách sạn này.
          </p>
        )}
      </div>
      <div className="mb-0">
        <textarea
          value={desCription}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Viết nhận xét của bạn..."
          className="w-full p-2 border rounded mb-2"
          rows={4}
        />
        <Button
          onClick={handlePostReview}
          className="px-4 py-2 bg-orange-600 text-white rounded font-semibold hover:bg-blue-600"
        >
          Gửi nhận xét
        </Button>
      </div>
    </div>
  );
}
