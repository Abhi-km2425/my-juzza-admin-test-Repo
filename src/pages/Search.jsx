import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import { useLocation } from "react-router-dom";
import { patientDeleteRoute, patientGetAllRoute } from "../utils/Endpoint";
import PatientTable from "../components/tables/PatientTable";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import PatientEditModal from "./patients/PatientEditModal";
import DeleteModal from "../components/modals/DeleteModal";

const Search = () => {
    const axiosInstance = useAxiosPrivate()
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [patientData, setPatientData] = useState({});

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query')

    const [data, setData] = useState();

    const [page, setPage] = useState(1);
    const [entries, setEntries] = useState(10);

    const GetPatients = async () => {
        try {
            await axiosInstance.get(
                `${patientGetAllRoute}?page=${page}&entries=${entries}&search=${query}`
            )
                .then((response) => {
                    setData(response?.data);
                })
        } catch (error) {
            console.log(error);
        }
    };


    const clickEdit = (rowData) => {
        setPatientData(rowData)
        setEditModal(true)
    }

    const clickDelete = (rowData) => {
        setPatientData(rowData)
        setDeleteModal(true)
    }


    useEffect(() => {
        window.scroll(0, 0);
        GetPatients();
    }, [page, query]);

    return (
        <div className="w-full h-full text-black pt-4 pb-28 flex flex-col gap-[5vh]">
            <div className="flex flex-col md:flex-row justify-between">
                <h1 className="text-primary text-2xl font-bold text-left">Patients</h1>
            </div>

            <PatientTable data={data} clickEdit={clickEdit} clickDelete={clickDelete} />

            {/* Pagination */}
            
                <div className="w-full flex justify-end">
                    <Pagination
                        Data={data}
                        page={page}
                        setPage={setPage}
                        getMethod={GetPatients}
                    />
                </div> 
           

            {editModal && <PatientEditModal patientData={patientData} setPatientData={setPatientData} setEditModal={setEditModal} getTableData={GetPatients} />}

            {deleteModal && <DeleteModal setDeleteModal={setDeleteModal} data={patientData} setData={setPatientData} getTableData={GetPatients} route={patientDeleteRoute} />}
        </div>
    );
}

export default Search