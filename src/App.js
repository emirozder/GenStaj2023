import React from "react";
import { Container, Grid } from "@mui/material"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPatient, setRowsPerPage, setCurrentPage } from "./redux/features/patient/patientSlice";
import PatientTable from "./pages/PatientTable";

function App() {

  //#region DECLARATIONS AND FIRST DATA FETCHING starts 

  const dispatch = useDispatch();
  const { patient, response, nextUrl, prevUrl, loading, error, currentPage, rowsPerPage } = useSelector(state => state.patient)
  
  //console.log("veri:", patient);
  //console.log("gelen response bundle'ı:", response);

  useEffect(() => {
    dispatch(getPatient(''))
  }, [dispatch])

  //#endregion



  //#region PAGINATION and NEW DATA FETCHING starts

  const handlePageChange = (event, newPage) => {
    if (newPage === currentPage + 1 && newPage === patient.length / rowsPerPage) {
      const params = {
        type: 'next',
        bundle: response
      }
      dispatch(getPatient(params));
      dispatch(setCurrentPage(0));
    } else if (newPage === -1) {
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
          loading={loading}
          error={error}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          handlePageChange={handlePageChange}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          nextUrl={nextUrl}
          prevUrl={prevUrl}
        />
      </Grid>
    </Container>
  );
}

export default App;