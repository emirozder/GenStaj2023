import React from 'react'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, TablePagination, Typography } from "@mui/material"

const SearchedPatientTable = ({ searchedPatient, nextUrl, prevUrl, loading, error, currentPage, rowsPerPage, handlePageChange, total }) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead sx={{ backgroundColor: '#ad81f7' }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Birth Date</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Resource Type</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ backgroundColor: '#e9dbff' }}>
            {searchedPatient?.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage).map((patient) => (
              <TableRow
                key={patient.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{patient.id || 'null'}</TableCell>
                <TableCell>{patient.name?.[0]?.given?.[0] || patient.name?.[0]?.text || 'null'} {patient.name?.[0]?.family || 'null'}</TableCell>
                <TableCell>{patient.birthDate || 'null'}</TableCell>
                <TableCell>{patient.gender || 'null'}</TableCell>
                <TableCell>{patient.resourceType || 'null'}</TableCell>
                <TableCell>{patient.telecom?.[0].value || patient.telecom?.[1].value || 'null'}</TableCell>
                <TableCell>{patient.address?.[0]?.text || 'null'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={searchedPatient.length}
          rowsPerPage={rowsPerPage}
          page={currentPage}
          onPageChange={handlePageChange}
          //onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ backgroundColor: '#ad81f7' }}
          nextIconButtonProps={{
            disabled: !nextUrl
          }}
          backIconButtonProps={{
            disabled: !prevUrl
          }}
        />
        <Typography variant='subtitle1' align='right' paddingRight={1} sx={{ backgroundColor: '#ad81f7' }}>Total Patient Count: {total}</Typography>
        {loading && "Loading..."}
        {error && searchedPatient.error}
      </TableContainer>
    </>
  )
}

export default SearchedPatientTable
