import React from 'react'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, TablePagination, Typography, IconButton } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DeletePatient from '../components/DeletePatient';

const PatientTable = ({ patient, nextUrl, prevUrl, loading, error, currentPage, rowsPerPage, handlePageChange, total }) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead sx={{ backgroundColor: '#9c27b0', color: 'white' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>ID</TableCell>
              <TableCell sx={{ color: 'white' }}>Name</TableCell>
              <TableCell sx={{ color: 'white' }}>Birth Date</TableCell>
              <TableCell sx={{ color: 'white' }}>Gender</TableCell>
              <TableCell sx={{ color: 'white' }}>Resource Type</TableCell>
              <TableCell sx={{ color: 'white' }}>Contact</TableCell>
              <TableCell sx={{ color: 'white' }}>Address</TableCell>
              <TableCell sx={{ color: 'white' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ backgroundColor: '#e9dbff' }}>
            {patient?.map((patient) => (
              <TableRow
                key={patient.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{patient.id || 'null'}</TableCell>
                <TableCell>{patient.name?.[0]?.given?.[0] || patient.name?.[0]?.text || 'null'} {patient.name?.[0]?.family || 'null'}</TableCell>
                <TableCell>{patient.birthDate || 'null'}</TableCell>
                <TableCell>{patient.gender || 'null'}</TableCell>
                <TableCell>{patient.resourceType || 'null'}</TableCell>
                <TableCell>{patient.telecom?.[0]?.value || patient.telecom?.[1]?.value || 'null'}</TableCell>
                <TableCell>{patient.address?.[0]?.text || 'null'}</TableCell>
                <TableCell>
                  <DeletePatient delID={[patient.id]} />
                  /
                  {/* <IconButton aria-label="edit" size="small" color="secondary">
                    <EditIcon fontSize="inherit" />
                  </IconButton> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={patient.length}
          rowsPerPage={rowsPerPage}
          page={currentPage}
          onPageChange={handlePageChange}
          sx={{ backgroundColor: '#9c27b0', color: 'white' }}
          nextIconButtonProps={{
            disabled: !nextUrl
          }}
          backIconButtonProps={{
            disabled: !prevUrl
          }}
        />
        <Typography variant='subtitle1' align='right' paddingRight={1} sx={{ backgroundColor: '#9c27b0', color: 'white' }}>Total Patient Count: {total}</Typography>
        {loading && "Loading..."}
        {error && patient.error}
      </TableContainer>
    </>
  )
}

export default PatientTable
