import React from "react";
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Container, Grid, TablePagination } from "@mui/material"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPatient, setRowsPerPage, setCurrentPage } from "./redux/features/patient/patientSlice";

function App() {

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
        <TableContainer component={Paper}>
          <Table aria-aria-label="simple table">
            <TableHead sx={{ backgroundColor: '#ad81f7' }}>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Birth Date</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Resource Type</TableCell>
                <TableCell>Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ backgroundColor: '#e9dbff' }}>
              {patient?.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage).map((patient) => (
                <TableRow
                  key={patient.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{patient.id || 'null'}</TableCell>
                  <TableCell>{patient.name?.[0]?.given?.[0] || patient.name?.[0]?.text || 'null'} {patient.name?.[0]?.family || 'null'}</TableCell>
                  <TableCell>{patient.birthDate || 'null'}</TableCell>
                  <TableCell>{patient.gender || 'null'}</TableCell>
                  <TableCell>{patient.resourceType || 'null'}</TableCell>
                  <TableCell>{patient.address?.[0]?.text || 'null'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={patient.length}
            rowsPerPage={rowsPerPage}
            page={currentPage}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ backgroundColor: '#ad81f7' }}
            nextIconButtonProps={{
              disabled: !nextUrl
            }}
            backIconButtonProps={{
              disabled: !prevUrl
            }}
          />
          {loading && "Loading..."}
          {error && patient.error}
        </TableContainer>
      </Grid>

    </Container>
  );
}

export default App;