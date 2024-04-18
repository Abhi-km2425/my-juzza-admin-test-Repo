import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const ChartData = () => {
  const axiosInstance = useAxiosPrivate();

  const [data, setData] = useState([]);
  const [interval, setInterval] = useState("week");

  const getVisitChart = async () => {
    await axiosInstance
      .get(``)
      .then((res) => {
        console.log(res?.data);
        setData(res?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getVisitChart();
  }, []);

  const [state, setState] = useState({
    options: {
      colors: ["#E91E63", "#FF9800"],
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
    series: [
      {
        name: "People Born",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
      {
        name: "People Died",
        data: [3, 60, 35, 80, 49, 70, 20, 81],
      },
    ],
  });

  return (
    <div className="w-full flex flex-col gap-[4vh] p-[5]">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-primary capitalize">
          {interval}-wise Completed Visits
        </h1>

        <select
          className="min-w-fit p-2 px-4
          rounded-md cursor-pointer outline-none shadow-lg"
          value={interval}
          onChange={(e) => setInterval(e.target.value)}
        >
          <option value="week">Week</option>
          <option value="month">Month</option>
        </select>
      </div>
      <div className="w-full ">
        <Chart
          options={state.options}
          series={state.series}
          type="bar"
        />
      </div>
    </div>
  );
};

export default ChartData;
