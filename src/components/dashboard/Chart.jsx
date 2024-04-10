import { useEffect, useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend} from "recharts";
// import axiosInstance from "../../utils/AxiosInstance";
// import { getVisitsChartRoute } from "../../utils/Endpoint";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";


const Chart = ({locality}) => {
  const axiosInstance = useAxiosPrivate();

  const [data, setData] = useState([])
  const [interval, setInterval] = useState("week")

  const getVisitChart = async () => {
    await axiosInstance.get(`${"getVisitsChartRoute"}?interval=${interval}&locality=${locality}`)
      .then((res) => {
        console.log(res?.data)
        setData(res?.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getVisitChart()
  }, [interval, locality])


  return (
    <div className="flex flex-col gap-[4vh] p-[5]">
      <div className="flex justify-between items-center" >
        <h1 className="font-semibold text-primary capitalize">{interval}-wise Completed Visits</h1>

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
      <ResponsiveContainer width="100%" height={400} >
        <BarChart data={data} width={300} height={400}>
          <XAxis dataKey="name" />
          <YAxis dataKey="visit" />
          <Tooltip />
          <Legend />
          <Bar dataKey="visit" fill="#007a3f" />
        </BarChart>

        {/* <LineChart width={400} height={400} data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <XAxis dataKey="name" />
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          <Line type="monotone" dataKey="visit" stroke="#ff7300" yAxisId={0} />
          <Line type="monotone" dataKey="visit" stroke="#387908" yAxisId={1} />
        </LineChart> */}

      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
