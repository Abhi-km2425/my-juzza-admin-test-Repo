import React, { useState } from 'react';
import { IoIosAddCircle } from "react-icons/io";
import AddLocalityModal from './AddLocalityModal';
import AddLocationModal from './AddLocationModal';

const Settings = () => {
    const [localityModal , setLocalityModal] = useState(false)
    const [locationModal , setLocationModal] = useState(false)

    return (
        <div className="h-full w-full flex flex-col items-start mb-10">
            <div className="w-full flex justify-between items-center mb-4">
                <h1 className="text-primary font-bold md:text-2xl mb-6 mt-3">
                    Settings
                </h1>
            </div>

            <div className=" flex w-full flex-wrap items-center gap-5">
                <div className="flex w-full md:w-[290px] justify-around items-center bg-white text-primary p-5  py-7 rounded-lg shadow-xl">
                    <h1 onClick={()=> setLocalityModal(true)}
                    className="font-bold flex items-center justify-center gap-2 cursor-pointer">
                        Add new Panch/Munici
                        <IoIosAddCircle />
                    </h1>
                </div>

                <div className="flex w-full md:w-[290px] justify-around items-center bg-white text-primary p-5  py-7 rounded-lg shadow-xl">
                    <h1 onClick={()=> setLocationModal(true)}
                    className="font-bold flex items-center justify-center gap-2 cursor-pointer">
                        Add new Location
                        <IoIosAddCircle />
                    </h1>
                </div>


            </div>

            {
               localityModal
                &&
                <AddLocalityModal
                    setModal={setLocalityModal}
                />
            }

            {
               locationModal
                &&
                <AddLocationModal
                    setModal={setLocationModal}
                />
            }

        </div>
    )
}

export default Settings