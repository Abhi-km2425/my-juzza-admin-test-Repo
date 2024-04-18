import ReqLoader from "../components/loader/ReqLoader";
import Cards from "../components/dashboard/Cards";
import Chart from "../components/dashboard/Chart";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

import { useEffect, useState } from "react";
import { FaCartArrowDown, FaRegMoneyBillAlt } from "react-icons/fa";
import { GetDashboard } from "../utils/Endpoint";
import { MdOutlineIncompleteCircle } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { BsFillCartXFill } from "react-icons/bs";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const axios = useAxiosPrivate();
  const [cards, setCards] = useState();

  const cardData = [
    {
      id: 1,
      name: "Total Sale",
      value: cards?.totalSales,
      icon: <MdOutlineIncompleteCircle size={68} />,
    },
    {
      id: 4,
      name: "Total Income",
      value: cards?.totalAmount,
      icon: <FaRegMoneyBillAlt size={68} />,
    },
    {
      id: 2,
      name: "Total User",
      value: cards?.totalUser,
      icon: <FaUsers size={68} />,
    },
    {
      id: 5,
      name: "Total Order",
      value: cards?.totalOrder,
      icon: <FaCartArrowDown size={68} />,
    },
    {
      id: 3,
      name: "Cancel Order",
      value: cards?.canceled,
      icon: <BsFillCartXFill size={68} />,
    },
  ];

  const getCardData = async () => {
    window.scroll(0, 0);
    setLoading(true);
    await axios
      .get(GetDashboard)
      .then((res) => {
        setCards(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getCardData();
  }, []);

  return (
    <div className="h-full w-full flex flex-col items-start mb-10">
      <div className="w-full flex justify-between items-center mb-4">
        <h1 className="text-primary font-bold text-2xl mb-6 mt-3">Dashboard</h1>
      </div>

      <div className=" flex w-full flex-wrap items-center gap-3">
        {cardData.map((items, i) => (
          <Cards key={i} data={items} />
        ))}
      </div>
      <div className=" flex w-full flex-wrap items-center mt-10">
        <Chart data={cards} />
      </div>
      {loading && <ReqLoader />}
    </div>
  );
};

export default Dashboard;
