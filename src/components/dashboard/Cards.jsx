import react from "react";

const Cards = ({ data }) => {
  return (
    <div className="flex w-full md:w-[285px] justify-around items-center bg-white p-5  py-7 rounded-lg shadow-xl">

      <div className="">
        {data?.icon}
      </div>
      <div className="flex flex-col justify-start items-start gap-2 text-gray-500">
        <h1 className="font-bold text-3xl ">{data?.value}</h1>
        <h5 className="text-sm font-medium">{data?.name}</h5>
      </div>
    </div>
  );
};

export default Cards;
