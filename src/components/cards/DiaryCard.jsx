import { useRef, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from "react-to-print"
import Printable from '../pdfs/Printable';



const DiaryCard = ({ data, index }) => {
  const [isOpen, setIsopen] = useState(false);
  const [moreEqps, setMoreEqps] = useState(false);
  const [moreMedics, setMoreMedics] = useState(false);

  console.log("data", data)

  const navigate = useNavigate();

  const contentToPrint = useRef(null);

  const handlePrint = useReactToPrint({
    documentTitle: "Daily Report",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });

  return (
    <>
      <div>
        {isOpen ? (
          <div className="max-w-[1190px] h-auto bg-white rounded-xl flex flex-col relative shadow-md overflow-hidden">
            <div className="w-full h-[8vh] text-white flex items-center
            bg-secondary rounded-xl px-[2vw] sm:px-[5vw] absolute top-0 left-0 text-sm">
              <span className="flex-initial">{index}</span>
              <span className="flex-1 max-w-[36%] font-medium whitespace-nowrap overflow-hidden text-ellipsis">{data?.patientName}</span>
              <span className="flex-1">
              {data?.startTime && data?.endTime ? `${data?.startTime} to ${data?.endTime}`: 'NIL'}
              </span>

              <button
              onClick={() => {
                handlePrint(null, () => contentToPrint.current);
              }}
              className="flex-initial bg-primary text-sm text-white font-semibold px-[2vw] py-[1vh] mr-[2vw] rounded-md"
            >
              Print
            </button>

              <span className="flex-initial">
                <BsChevronUp
                  onClick={() => setIsopen(false)}
                  style={{ cursor: "pointer", color: "#878787" }}
                  size="32px"
                />
              </span>

              {/* Hidden Component to Print */}
            <div className="hidden">
              <Printable data={data} ref={contentToPrint} />
            </div>

            </div>

            <div className="w-full h-full mt-[6vh] py-[3vh] px-[10px] flex flex-col gap-[4vh] sm:gap-[2vh]">
              <div className="w-full h-auto flex flex-col sm:flex-row justify-between gap-[2vh] sm:gap-[0]
                px-[10px]">
                <span className="text-primary font-semibold text-left text-sm">
                  Equipments Used
                </span>

                <div className="w-full sm:w-[50%] h-auto flex justify-around items-center">
                  <div className="h-auto flex items-center gap-[1vw]">

                <span className="w-full whitespace-nowrap overflow-hidden text-ellipsis text-sm">
                  {data?.equipments.length > 0 && 
                  (data?.equipments[0]?.name +
                    `(${data?.equipments[0]?.quantity})`)}
                </span>

                
                    {data?.equipments.length > 1 && (
                      <div className="relative inline-block text-left">
                        {
                          <button
                            onClick={() => setMoreEqps(!moreEqps)}
                            className="cursor-pointer text-sm text-blue-600"
                          >
                            +more
                          </button>
                        }

                        {moreEqps && (
                          <div className="absolute right-0 z-10 w-[300%] mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
                            <ul className="py-1">
                              {data?.equipments.slice(1).map((equipment, i) => (
                                <li
                                  key={equipment._id}
                                  className="block px-4 py-2 text-sm text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis"
                                >
                                  {equipment?.name + `(${equipment?.quantity})`}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <span className="text-sm">
                    {data?.equipments?.length > 1
                      ? data?.equipments.length + " items"
                      : data?.equipments?.length === 0
                        ? "Nil"
                        : "1 item"}
                  </span>
                </div>
              </div>

              <div className="w-full h-auto flex flex-col sm:flex-row justify-between gap-[2vh] sm:gap-[0]
                px-[10px]">
                <span className="text-primary font-semibold text-left text-sm">
                  Medicines
                </span>

                <div className="w-full sm:w-[50%] h-auto flex justify-around items-center">
                  <div className="h-auto flex items-center gap-[1vw]">

                <span className="w-full whitespace-nowrap overflow-hidden text-ellipsis text-sm">
                  {data?.medicines.length > 0 && 
                  (data?.medicines[0]?.name +
                    `(${data?.medicines[0]?.quantity})`)}
                </span>

                
                    {data?.medicines.length > 1 && (
                      <div className="relative inline-block text-left">
                        {
                          <button
                            onClick={() => setMoreMedics(!moreMedics)}
                            className="cursor-pointer text-sm text-blue-600"
                          >
                            +more
                          </button>
                        }

                        {moreMedics && (
                          <div className="absolute right-0 z-10 w-[300%] mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
                            <ul className="py-1">
                              {data?.medicines.slice(1).map((medicine, i) => (
                                <li
                                  key={medicine._id}
                                  className="block px-4 py-2 text-sm text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis"
                                >
                                  {medicine?.name + `(${medicine?.quantity})`}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <span className="text-sm">
                    {data?.medicines?.length > 1
                      ? data?.medicines.length + " items"
                      : data?.medicines?.length === 0
                        ? "Nil"
                        : "1 item"}
                  </span>
                </div>
              </div>

              <div className="w-full h-auto flex flex-col justify-between gap-[1vh]
                px-[10px]">
                <span className=" text-primary font-semibold text-left text-sm ">
                  Treatment Details
                </span>

                <div className="w-full border p-5 rounded h-[200px] overflow-y-scroll">
                  <span className="text-wrap text-start flex text-ellipsis text-sm capitalize leading-6">
                    {data?.treatmentDetails ? data?.treatmentDetails : "No Data Available"}
                  </span>
                </div>
              </div>

              <div className='w-full h-auto flex flex-col sm:flex-row justify-between gap-[2vh] sm:gap-[0]
                px-[10px] '>
                <button onClick={() => navigate(`/patient-management/patient-info/${patientData?._id}`)} className='p-[8px] bg-primary text-white text-sm rounded-md'>View More</button>
              </div>

            </div>

          </div>
        ) : (
          <div
            className="w-full min-h-[10vh] text-[#000000] flex items-center
          bg-white rounded-xl px-[2vw] sm:px-[5vw] shadow-md text-sm"
          >
            <span className="flex-initial" >{index}</span>
            <span className="flex-1 max-w-[36%] font-medium whitespace-nowrap overflow-hidden text-ellipsis">
              {data?.patientName}
            </span>
            <span className="flex-1">
              {data?.startTime && data?.endTime ? `${data?.startTime} to ${data?.endTime}` : 'NIL'}
            </span>

            <button
              onClick={() => {
                handlePrint(null, () => contentToPrint.current);
              }}
              className="flex-initial bg-primary text-sm text-white font-semibold px-[2vw] py-[1vh] mr-[2vw] rounded-md"
            >
              Print
            </button>

            <span className="flex-initial">
              <BsChevronDown
                onClick={() => setIsopen(true)}
                style={{ cursor: "pointer", color: "#878787" }}
                size="32px"
              />
            </span>

            {/* Hidden Component to Print */}
            <div className="hidden">
              <Printable data={data} ref={contentToPrint} />
            </div>

          </div>
        )}

      </div>

    </>
  );
};

export default DiaryCard;
