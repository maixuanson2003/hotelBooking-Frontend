import Deals from "@/Custom/Deal/Deal";
export default function Deal() {
  return (
    <div className="w-full  h-full">
      <div className="w-full h-[300px] relative flex  items-center">
        <img
          className="w-full h-full absolute"
          src={"/assets/Deal.png"}
          alt=""
        />
        <div className=" h-[50%] absolute p-12">
          <p className="text-white text-4xl ">Ưu đãi hôm nay</p>
          <p className="text-white text-xl ">
            Các chương trình ưu đãi hằng ngày và khuyến mãi đặc biệt đến từ
            Chúng tôi
          </p>
        </div>
      </div>
      <Deals />
    </div>
  );
}
