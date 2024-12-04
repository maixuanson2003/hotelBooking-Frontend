import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
interface CaroselProps {
  ElementArray: any[];
}
const CustomCarosel: React.FC<CaroselProps> = ({ ElementArray }) => {
  return (
    <Carousel opts={{ align: "start" }} className="mt-5 w-full">
      <CarouselContent>
        {ElementArray?.map((event, index) => (
          <CarouselItem
            key={index}
            className="flex basis-1/3 items-center justify-center"
          >
            {event}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious variant={"link"} />
      <CarouselNext variant={"link"} />
    </Carousel>
  );
};
export default CustomCarosel;
