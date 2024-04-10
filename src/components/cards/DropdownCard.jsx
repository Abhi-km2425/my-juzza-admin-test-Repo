import React, { useEffect, useState } from 'react';
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../../utils/AxiosInstance';
import { getUsedEquipmentsRoute, getMedicationsRoute, getPrescriptionsRoute } from '../../utils/Endpoint';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const DropdownCard = ({ patientData, index }) => {
  const axiosInstance = useAxiosPrivate();

  const [isOpen, setIsopen] = useState(false);
  const [moreEqps, setMoreEqps] = useState(false);
  const [moreMedics, setMoreMedics] = useState(false);
  const [morePres, setMorePres] = useState(false);

  const [equipments, setEquipments] = useState([])
  const [medications, setMedications] = useState([])
  const [prescriptions, setPrescriptions] = useState([])

  const navigate = useNavigate();


  const getEquipments = async () => {
    await axiosInstance.get(`${getUsedEquipmentsRoute}/${patientData?._id}`)
      .then((res) => {
        console.log("equipments", res.data)
        setEquipments(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const getMedications = async () => {
    await axiosInstance.get(`${getMedicationsRoute}/${patientData?._id}`)
      .then((res) => {
        setMedications(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const getPrescriptions = async () => {
    await axiosInstance.get(`${getPrescriptionsRoute}/${patientData?._id}`)
      .then((res) => {
        setPrescriptions(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getEquipments()
    getMedications()
    getPrescriptions()
  }, [])


  return (
    <>
      {
        isOpen
          ?
          (<div className='w-full h-auto bg-white rounded-xl flex flex-col relative shadow-md'>
            <div className='w-full h-[8vh] text-white flex justify-between items-center
            bg-secondary rounded-xl px-[5vw] absolute top-0 left-0 text-sm'>
              <span className='flex-initial'>{index}</span>
              <span className='flex-1 max-w-[36%] font-medium whitespace-nowrap overflow-hidden text-ellipsis' >{patientData?.name}</span>
              <span className='flex-initial capitalize'>{patientData?.gender?.slice(0, 1)}</span>
              <span className='flex-1'>{patientData?.phone}</span>
              <span className='flex-initial'><BsChevronUp onClick={() => setIsopen(false)} style={{ cursor: "pointer", color: "#878787" }} size="32px" /></span>
            </div>

            <div className='w-full h-full mt-[6vh] py-[4vh] px-[10px] flex flex-col gap-[4vh] sm:gap-[2vh] '>
              <div className='w-full h-auto flex flex-col sm:flex-row justify-between gap-[2vh] sm:gap-[0]
                px-[10px]'>
                <span className='text-primary font-semibold text-left text-sm'>Equipments Used</span>

                <div className='w-full sm:w-[50%] h-auto flex justify-around items-center'>
                  <div className=' h-auto flex items-center gap-[1vw] '>

                    <span className='w-full whitespace-nowrap overflow-hidden text-ellipsis text-sm'>
                      {equipments.length > 0 &&
                        (equipments[0]?.name +
                          ` (${equipments[0]?.quantity})`)}
                    </span>
                    {
                      equipments.length > 1
                      &&
                      <div className="relative inline-block text-left">

                        {
                          <button
                            onClick={() => setMoreEqps(!moreEqps)}
                            className='cursor-pointer text-sm text-blue-600'
                          >
                            +more
                          </button>

                        }

                        {
                          moreEqps &&
                          <div className="absolute right-0 z-10 w-[300%] mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
                            <ul className="py-1">
                              {
                                equipments.slice(1).map((equipment, i) => (
                                  <li key={equipment._id} className="block px-4 py-2 text-sm text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis">
                                    {equipment?.name + ` (${equipment?.quantity})`}
                                  </li>

                                ))
                              }

                            </ul>
                          </div>
                        }

                      </div>

                    }


                  </div>
                  <span className='text-sm'>{equipments?.length > 1 ? equipments.length + " items" : equipments?.length === 0 ? "Nil" : "1 item"}</span>
                </div>
              </div>

              <div className='w-full h-auto flex flex-col sm:flex-row justify-between gap-[2vh] sm:gap-[0]
                px-[10px] '>
                <span className='text-primary font-semibold text-left text-sm'>Medications</span>

                <div className='w-full sm:w-[50%] h-auto flex justify-around items-center'>
                  <div className=' h-auto flex items-center gap-[1vw] '>

                    <span className='w-full whitespace-nowrap overflow-hidden text-ellipsis text-sm'>
                      {/* {medications[0]?.name} */}
                      {medications.length > 0 && (medications[0]?.name + ` (${medications[0]?.strength})`)}

                    </span>
                    {
                      medications.length > 1
                      &&
                      <div className="relative inline-block text-left">

                        {
                          <button
                            onClick={() => setMoreMedics(!moreMedics)}
                            className='cursor-pointer text-sm text-blue-600'
                          >
                            +more
                          </button>

                        }

                        {
                          moreMedics &&
                          <div className="absolute right-0 z-10 w-[300%] mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
                            <ul className="py-1">
                              {
                                medications.slice(1).map((medication, i) => (
                                  <li key={medication._id} className="block px-4 py-2 text-sm text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis">
                                    {medication?.name + ` (${medication?.strength})`}
                                  </li>

                                ))
                              }

                            </ul>
                          </div>
                        }

                      </div>

                    }


                  </div>
                  <span className='text-sm'>{medications?.length > 1 ? medications.length + " items" : medications?.length === 0 ? "Nil" : "1 item"}</span>
                </div>
              </div>

              <div className='w-full h-auto flex flex-col sm:flex-row justify-between gap-[2vh] sm:gap-[0]
                px-[10px] '>
                <span className='text-primary font-semibold text-left text-sm'>Prescriptions</span>

                <div className='w-full sm:w-[50%] h-auto flex justify-around items-center'>
                  <div className=' h-auto flex items-center gap-[1vw] '>

                    <span className='w-full whitespace-nowrap overflow-hidden text-ellipsis text-sm'>
                      {prescriptions?.length > 0 &&
                        (prescriptions[0]?.prescription)}
                    </span>
                    {
                      prescriptions.length > 1
                      &&
                      <div className="relative inline-block text-left">

                        {
                          <button
                            onClick={() => setMorePres(!morePres)}
                            className='cursor-pointer text-sm text-blue-600'
                          >
                            +more
                          </button>

                        }

                        {
                          morePres &&
                          <div className="absolute right-0 z-10 w-[300%] mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
                            <ul className="py-1">
                              {
                                prescriptions.slice(1).map((prescription, i) => (
                                  <li key={prescription._id} className="block px-4 py-2 text-sm text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis">
                                    {prescription?.prescription}
                                  </li>

                                ))
                              }

                            </ul>
                          </div>
                        }

                      </div>
                    }


                  </div>
                  <span className='text-sm'>{prescriptions?.length > 1 ? prescriptions.length + " items" : prescriptions?.length === 0 ? "Nil" : "1 item"}</span>
                </div>
              </div>

              <div className='w-full h-auto flex flex-col sm:flex-row justify-between gap-[2vh] sm:gap-[0]
                px-[10px] '>
                <button onClick={() => navigate(`/patient-management/patient-info/${patientData?._id}`)} className='p-[8px] bg-primary text-white text-sm rounded-md'>View More</button>
              </div>

            </div>
          </div>)
          :
          (<div className='w-full min-h-[10vh] text-[#000000] flex justify-between items-center
        bg-white rounded-xl px-[5vw] shadow-md text-sm'>
            <span className='flex-initial'>{index}</span>
            <span className='flex-1 max-w-[36%] font-medium whitespace-nowrap overflow-hidden text-ellipsis' >{patientData?.name}</span>
            <span className='flex-initial capitalize'>{patientData?.gender?.slice(0, 1)}</span>
            <span className='flex-1'>{patientData?.phone}</span>
            <span className='flex-initial'><BsChevronDown onClick={() => setIsopen(true)} style={{ cursor: "pointer", color: "#878787" }} size="32px" /></span>
          </div>)

      }

    </>
  )
}

export default DropdownCard