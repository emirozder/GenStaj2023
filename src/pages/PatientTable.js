import React from 'react'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, TablePagination, Typography } from "@mui/material"
import DeletePatient from '../components/DeletePatient';
import UpdatePatient from '../components/UpdatePatient';
import LoadingModal from '../components/LoadingModal';
import { useTranslation } from 'react-i18next';
import AddAppointment from '../components/AddAppointment';

const PatientTable = ({ patient, nextUrl, prevUrl, loading, error, currentPage, rowsPerPage, handlePageChange, total, genders }) => {
  const { t, i18n } = useTranslation()
  const getGenderValueBasedOnLanguage = (gender) => {
    const genderConceptObject = genders?.concept?.filter((element) => element.code === gender)[0] || undefined;
    return (
      genderConceptObject?.designation?.filter((element1) => element1.language === i18n.language)[0]?.value ||
      genderConceptObject?.display ||
      undefined
    );
  };
  return (
    <>
      <TableContainer component={Paper}>
        {error && patient.error}
        {loading ? (<LoadingModal />) : (
          <Table aria-label="simple table">
            <TableHead sx={{ backgroundColor: '#009be5', color: 'white' }}>
              <TableRow>
                <TableCell sx={{ color: 'white' }}>ID</TableCell>
                <TableCell sx={{ color: 'white' }}>{t('czNo')}</TableCell>
                <TableCell sx={{ color: 'white' }}>{t('name')}</TableCell>
                <TableCell sx={{ color: 'white' }}>{t('birthDate')}</TableCell>
                <TableCell sx={{ color: 'white' }}>{t('gender')}</TableCell>
                <TableCell sx={{ color: 'white' }}>{t('resourceType')}</TableCell>
                <TableCell sx={{ color: 'white' }}>{t('contact')}</TableCell>
                <TableCell sx={{ color: 'white' }}>{t('address')}</TableCell>
                <TableCell sx={{ color: 'white' }}>{t('actions')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ backgroundColor: '#e9dbff' }}>
              {patient?.map((patient) => (
                <TableRow
                  key={patient.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{patient.id || 'null'}</TableCell>
                  <TableCell>{patient.identifier?.[0]?.type?.coding?.[0]?.code === "CZ" ? (patient.identifier?.[0]?.value) : ('null')} </TableCell>
                  <TableCell>{patient.name?.[0]?.given?.[0] || patient.name?.[0]?.text || 'null'} {patient.name?.[0]?.family || 'null'}</TableCell>
                  <TableCell>{patient.birthDate || 'null'}</TableCell>
                  <TableCell>{getGenderValueBasedOnLanguage(patient.gender) || 'null'}</TableCell>
                  <TableCell>{patient.resourceType || 'null'}</TableCell>
                  <TableCell>{patient.telecom?.[0]?.value || patient.telecom?.[1]?.value || 'null'}</TableCell>
                  <TableCell>{patient.address?.[0]?.text}, {patient.address?.[0]?.state}, {patient.address?.[0]?.city}, {patient.address?.[0]?.country}</TableCell>
                  <TableCell>
                    <DeletePatient delID={[patient.id]} />
                    /
                    <UpdatePatient
                      id_val={[patient.id]}
                      czNo_val={[patient.identifier?.[0]?.value]}
                      given_val={[patient.name?.[0]?.given?.[0] || patient.name?.[0]?.text || 'null']}
                      family_val={[patient.name?.[0]?.family || 'null']}
                      birthDate_val={[patient.birthDate || 'null']}
                      gender_val={[patient.gender || 'null']}
                      contact_val={[patient.telecom?.[0]?.value || patient.telecom?.[1]?.value || 'null']}
                      address_val={[patient.address?.[0]?.text || 'null']}
                      country_val={patient.address?.[0]?.country}
                      state_val={patient.address?.[0]?.state}
                      city_val={patient.address?.[0]?.city}
                    />
                    /
                    <AddAppointment
            
                      id_val={[patient.id]}
                      czNo_val={[patient.identifier?.[0]?.value]}
                      given_val={[patient.name?.[0]?.given?.[0] || patient.name?.[0]?.text || 'null']}
                      family_val={[patient.name?.[0]?.family || 'null']}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>)}
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={currentPage}
          onPageChange={handlePageChange}
          sx={{ backgroundColor: '#009be5', color: 'white' }}
          nextIconButtonProps={{
            disabled: !nextUrl
          }}
          backIconButtonProps={{
            disabled: !prevUrl
          }}
        />
        <Typography variant='subtitle1' align='right' paddingRight={1} sx={{ backgroundColor: '#009be5', color: 'white' }}>{t('totalPatientCount')} {total}</Typography>
      </TableContainer>
    </>
  )
}

export default PatientTable
