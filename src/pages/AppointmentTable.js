import React from 'react'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, TablePagination, Typography, AppBar, Toolbar, Grid, IconButton, TextField } from "@mui/material"
import LoadingModal from '../components/LoadingModal'
import SearchIcon from '@mui/icons-material/Search';
import AppointmentPatientList from '../components/AppointmentPatientList';
import { useTranslation } from 'react-i18next';

const AppointmentTable = ({ appointment, nextUrl, prevUrl, loading, error, currentPage, rowsPerPage, handlePageChange, total }) => {
  const { t, i18n } = useTranslation()

  return (
    <>
      <Paper sx={{ margin: 'auto', overflow: 'hidden' }}>
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
        >
          <Toolbar>
            <Grid container spacing={2} alignItems="center" py={1}>
              <Grid item >
                <TextField
                  id="outlined-search"
                  label={t('search')}
                  type="search"
                  color="primary"
                //value={searchKey}
                //onChange={e => setSearchKey(e.target.value)}
                />
              </Grid>
              <Grid item xs>
                <IconButton aria-label="delete" size="small" color="info" >
                  <SearchIcon color="primary" sx={{ display: 'block' }} />
                </IconButton>
              </Grid>
              <Grid item>
                <AppointmentPatientList />
                  {/* <AddPatient/> */}
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Paper>


      <TableContainer component={Paper}>
        {error && appointment.error}
        {loading ? (<LoadingModal />) : (
          <Table aria-label="simple table">
            <TableHead sx={{ backgroundColor: '#009be5', color: 'white' }}>
              <TableRow>
                <TableCell sx={{ color: 'white' }}>ID</TableCell>
                <TableCell sx={{ color: 'white' }}>{t('createDate')}</TableCell>
                <TableCell sx={{ color: 'white' }}>{t('appointmentDateTime')}</TableCell>
                <TableCell sx={{ color: 'white' }}>{t('patientName')}</TableCell>
                <TableCell sx={{ color: 'white' }}>{t('practitionerName')}</TableCell>
                <TableCell sx={{ color: 'white' }}>{t('department')}</TableCell>
                <TableCell sx={{ color: 'white' }}>{t('status')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ backgroundColor: '#e9dbff' }}>
              {appointment?.map((appointment) => (
                <TableRow
                  key={appointment.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{appointment.id || 'null'}</TableCell>
                  <TableCell>{appointment.created || 'null'}</TableCell>
                  <TableCell>{appointment.start || 'null'}</TableCell>
                  <TableCell>{appointment.participant?.[0]?.actor?.display || 'null'}</TableCell>
                  <TableCell>{appointment.participant?.[1]?.actor?.display || 'null'}</TableCell>
                  <TableCell>{appointment.specialty?.[0]?.text || 'null'}</TableCell>
                  <TableCell>{appointment.status || 'null'}</TableCell>
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
        <Typography variant='subtitle1' align='right' paddingRight={1} sx={{ backgroundColor: '#009be5', color: 'white' }}>{t('totalAppointmentCount')} {total}</Typography>
      </TableContainer>
    </>
  )
}

export default AppointmentTable