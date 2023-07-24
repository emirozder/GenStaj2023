import React from 'react'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Grid } from "@mui/material"
import { getPatient, setRowsPerPage, setCurrentPage } from "./redux/features/patient/patientSlice";
import PatientTable from "./pages/PatientTable";

const Patient = () => {
    //#region DECLARATIONS AND FIRST DATA FETCHING starts 

    const dispatch = useDispatch();
    const { patient, nextUrl, prevUrl, loading, error, currentPage, rowsPerPage } = useSelector(state => state.patient)
    console.log("veri:", patient);

    useEffect(() => {
        dispatch(getPatient())
    }, [dispatch])

    //#endregion



    //#region PAGINATION and NEW DATA FETCHING starts

    const handlePageChange = (event, newPage) => {
        if (newPage === currentPage + 1 && newPage === patient.length / rowsPerPage && nextUrl) {
            dispatch(getPatient('next'));
            dispatch(setCurrentPage(0));
        } else if (newPage === -1 && nextUrl) {
            dispatch(getPatient('prev'));
            dispatch(setCurrentPage(0));
        } else {
            dispatch(setCurrentPage(newPage));
        }
    };

    const handleChangeRowsPerPage = event => {
        dispatch(setRowsPerPage(+event.target.value));
        dispatch(setCurrentPage(0));
    };

    //#endregion


    return (
        <Container className="App" fixed >
            <Grid sx={{ marginTop: '50px', paddingBottom: '50px', paddingTop: '50px' }}>
                <PatientTable
                    patient={patient}
                    nextUrl={nextUrl}
                    prevUrl={prevUrl}
                    loading={loading}
                    error={error}
                    currentPage={currentPage}
                    rowsPerPage={rowsPerPage}
                    handlePageChange={handlePageChange}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Grid>
        </Container>
    );
}

export default Patient