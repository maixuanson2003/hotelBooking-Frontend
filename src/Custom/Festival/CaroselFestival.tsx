import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Event {
  id: number;
  nameEvent: string;
  description: string;
  image: string;
  dateStart: string;
  dateEnd: string;
}

interface Props {
  events: Event[];
}

export default function ContainerEvent({ events }: Props) {
  return (
    <Carousel opts={{ align: "start" }} className="mt-5 w-[70%]">
      <CarouselContent>
        {events?.map((event, index) => (
          <CarouselItem
            key={index}
            className="flex basis-1/3 items-center justify-center"
          >
            <div className="h-[400px] w-[497px] rounded-3xl bg-white shadow-md">
              <div className="flex h-full w-full flex-col items-end gap-y-4 rounded-3xl border border-gray-700 bg-[#fff8f1] text-white">
                <img
                  src={event.image}
                  alt={event.nameEvent}
                  className="w-full h-1/2 object-cover rounded-t-3xl"
                />
                <div className="mt-5 w-full px-4">
                  <h2 className="text-2xl font-bold text-[#ff7757]">
                    {event.nameEvent}
                  </h2>
                  <p className="text-lg text-[#767e86] mb-4">
                    {event.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-[#767e86]">
                      {new Date(event.dateStart).toLocaleDateString()} -{" "}
                      {new Date(event.dateEnd).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious variant={"link"} />
      <CarouselNext variant={"link"} />
    </Carousel>
  );
}
