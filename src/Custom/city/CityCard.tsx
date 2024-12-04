import { useRouter } from "next/navigation";
interface prop {
  city: any;
}
export default function CityCard({ city }: prop) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/USER/cities/${city.id}`)}
      className="group hover:cursor-pointer relative overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
    >
      <img
        src={city.image}
        alt={city.nameCity}
        className="w-full h-96 object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4">
        <div>
          <h2 className="text-white text-lg font-bold">{city.nameCity}</h2>
          <p className="text-gray-300 text-sm">{city.descrription}</p>
        </div>
      </div>
    </div>
  );
}
