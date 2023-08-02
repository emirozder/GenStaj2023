import React from 'react'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, TablePagination, Typography } from "@mui/material"
import DeletePatient from '../components/DeletePatient';
import UpdatePatient from '../components/UpdatePatient';
import LoadingModal from '../components/LoadingModal';

const PatientTable = ({ patient, nextUrl, prevUrl, loading, error, currentPage, rowsPerPage, handlePageChange, total }) => {
  return (
    <>
      <TableContainer component={Paper}>
        {error && patient.error}
        {loading ? (<LoadingModal />) : (
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
                    <UpdatePatient
                      id_val={[patient.id]}
                      given_val={[patient.name?.[0]?.given?.[0] || patient.name?.[0]?.text || 'null']}
                      family_val={[patient.name?.[0]?.family || 'null']}
                      birthDate_val={[patient.birthDate || 'null']}
                      gender_val={[patient.gender || 'null']}
                      contact_val={[patient.telecom?.[0]?.value || patient.telecom?.[1]?.value || 'null']}
                      address_val={[patient.address?.[0]?.text || 'null']}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>)}
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
      </TableContainer>
    </>
  )
}

export default PatientTable
