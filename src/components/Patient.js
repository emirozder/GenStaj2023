import React from 'react'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPatient, setCurrentPage } from "../redux/features/patient/patientSlice";
import PatientTable from '../pages/PatientTable';

const Patient = ({ searchedPatient, handlePageChangeSearch, totalSearch }) => {

    //#region DECLARATIONS AND FIRST DATA FETCHING starts 

    const dispatch = useDispatch();
    const { patient, response, nextUrl, prevUrl, loading, error, currentPage } = useSelector(state => state.patient)

    console.log("veri:", patient);
    console.log("search edilmiş veriii:", searchedPatient);
    //console.log("gelen response bundle'ı:", response);

    useEffect(() => {
        dispatch(getPatient(''))
    }, [dispatch])

    //#endregion


    //#region PAGINATION and NEW DATA FETCHING starts

    const handlePageChange = (event, newPage) => {
        if (newPage > currentPage) {
            const params = {
                type: 'next',
                bundle: response
            }
            dispatch(getPatient(params));
            dispatch(setCurrentPage(0));
        } else if (newPage < currentPage) {
            const params = {
                type: 'prev',
                bundle: response
            }
            dispatch(getPatient(params));
            dispatch(setCurrentPage(0));
        } else {
            dispatch(setCurrentPage(newPage));
        }
    };

    //#endregion


    return (
        <>
            {
                searchedPatient.length > 0 ? (<PatientTable
                    patient={searchedPatient}
                    loading={loading}
                    error={error}
                    currentPage={currentPage}
                    rowsPerPage={searchedPatient.length}
                    handlePageChange={handlePageChangeSearch}
                    nextUrl={nextUrl}
                    prevUrl={prevUrl}
                    total={totalSearch}
                />) : <PatientTable
                    patient={patient}
                    loading={loading}
                    error={error}
                    currentPage={currentPage}
                    rowsPerPage={patient.length}
                    handlePageChange={handlePageChange}
                    nextUrl={nextUrl}
                    prevUrl={prevUrl}
                    total={response.total}
                />
            }

        </>
    );
}

export default Patient