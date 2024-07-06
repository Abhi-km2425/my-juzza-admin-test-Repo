import { useEffect, useState } from "react";
// import { getTodaysPatients, getVisitsReport } from "../../utils/Endpoint";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { FaFileDownload } from "react-icons/fa";
import VisitsReport from "../pdfs/VisitsReport";
import { PDFDownloadLink } from "@react-pdf/renderer";


const RightSide = ({ locality, visitDate }) => {
  const axiosInstance = useAxiosPrivate();

  const [patients, setPatients] = useState([])

  const getTodayPatients = async () => {
    await axiosInstance.get(`${getTodaysPatients}?visitDate=${visitDate}&locality=${locality}`)
      .then((res) => {
        setPatients(res.data.patients)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  console.log(patients)

  const [report, setReport] = useState({});

  const getReport = async () => {
    await axiosInstance.get(`${getVisitsReport}?visitDate=${visitDate}&locality=${locality}`)
      .then((res) => {
        console.log(res.data)
        setReport(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // Function to format data as CSV
  const convertToCSV = (objArray) => {
    const array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = 'Date,Total,Completed,Patients,Doctors,Nurses,Volunteers,Drivers\r\n';

    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (let index in array[i]) {
        if (line !== '') line += ',';

        line += array[i][index];
      }

      str += line + '\r\n';
    }

    return str;
  };

  // Function to download data as CSV
  const downloadData = (data) => {
    const csvData = convertToCSV(data);

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = url;

    a.download = 'Scheduled_visits.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  useEffect(() => {
    getTodayPatients()
    getReport()
  }, [visitDate, locality])

  return (
    <div className="bg-white w-full h-full flex flex-col items-center gap-1">
      <h1 className="flex items-center gap-4 font-semibold text-primary text-lg">
        Visiting Patients List


        <PDFDownloadLink document={<VisitsReport data={report} />} fileName={`Visits-Report.pdf`}>
          <span
            className="cursor-pointer"><FaFileDownload /></span>
        </PDFDownloadLink>
      </h1>

      <div className="md:h-[415px] overflow-y-scroll w-full border rounded-lg p-3 mt-2">
        {
          patients?.map((patient, i) => (
            <ul key={patient?._id} className="flex mt-3 overflow-y-auto w-full ">
              <li className="text-sm font-semibold flex flex-col items-start justify-between">
                <h1 className="flex">
                  {i + 1} . {patient?.name}
                </h1>

              </li>
            </ul>

          ))
        }

        {
          patients?.length < 1
          &&
          <h1>No Visits</h1>
        }

      </div>
    </div>
  );
};

export default RightSide;
