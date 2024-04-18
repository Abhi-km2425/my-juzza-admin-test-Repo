import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { GetDashboard } from "../../utils/Endpoint";
import ReqLoader from "../loader/ReqLoader";

const ChartData = () => {
  const [loading, setLoading] = useState(false);
  const axios = useAxiosPrivate();

  const getCardData = async () => {
    window.scroll(0, 0);
    setLoading(true);
    try {
      const res = await axios.get(GetDashboard);
      const key = res?.data?.orderStatus.map((obj) => Object.keys(obj)[0]);
      const value = res?.data?.orderStatus.map((obj) => Object.values(obj)[0]);
      setState({
        options: {
          colors: ["#017E40"],
          chart: {
            id: "basic-bar",
          },
          xaxis: {
            categories: key,
          },
        },
        series: [
          {
            name: "Order Status",
            data: value,
          },
        ],
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCardData();
  }, []);

  const [state, setState] = useState({
    options: {
      colors: ["#017E40"],
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [],
      },
    },
    series: [
      {
        name: "Order Status",
        data: [],
      },
    ],
  });

  return (
    <div className="w-full flex flex-col gap-[4vh] p-[5]">
      <div className="w-full ">
        <Chart options={state.options} series={state.series} type="bar" />
      </div>
      {loading && <ReqLoader />}
    </div>
  );
};

export default ChartData;
