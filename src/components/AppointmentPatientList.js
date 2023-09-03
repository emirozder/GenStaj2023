import { useState } from 'react';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, Checkbox, Container, Divider, IconButton, InputBase, Modal, Paper, Stack, Typography } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import LoadingModal from './LoadingModal';
import { getGenders, getPatient, setCurrentPage } from '../redux/features/patient/patientSlice';
import { useEffect } from 'react';
import AddAppointmentForm from './AddAppointmentForm';

const AppointmentPatientList = () => {

    const dispatch = useDispatch();
    const { patient, response, nextUrl, prevUrl, loading, error, currentPage, genders } = useSelector(state => state.patient)
    useEffect(() => {
        dispatch(getPatient(''))
        if (genders.length <= 0) {
            dispatch(getGenders());
        }
    }, [dispatch])

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


    const [selected, setSelected] = useState([]); // Selected rows (for row selection)


    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = patient.map((patient) => patient.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, patientId) => {
        const selectedIndex = selected.indexOf(patientId);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, patientId);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

    const isSelected = (patientId) => selected.indexOf(patientId) !== -1;


    const [t, i18n] = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [showAppointmentForm, setShowAppointmentForm] = useState(false);

    const handleSelect = () => {
        setShowAppointmentForm(true);
    }


    const handleSearch = () => {
        //dispatch(fetchPatientsData({ type: 'search', searchTerm }));
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    //const handleClose = () => setOpen(false);
    const handleClose = (event, reason) => {
        if (reason && reason === "backdropClick")
            return;
        setOpen(false);
    }

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
            <Button
                variant='outlined'
                color='primary'
                onClick={handleOpen}
            >{t('newAppointment')}
            </Button>
            {showAppointmentForm ? (
                <AddAppointmentForm
                    id_val={[selected]} />
            ) : (
                <Modal
                    open={open}
                    onClose={handleClose}
                >
                    <Container maxWidth="lg" sx={{ mt: 7, p: 3, bgcolor: 'white', borderRadius: 4, maxHeight: 850 }}>
                        <Typography variant="h6" gutterBottom color={'primary'} mb={3}>
                            {t('selectPatient')}
                        </Typography>
                        <Stack direction={"row"} spacing={2} mt={2}>
                            <InputBase
                                style={{ color: 'black', width: '250px', marginLeft: '10px', borderInlineColor: '#B1AFAF' }}
                                placeholder={t('search')}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <IconButton onClick={handleSearch} sx={{ color: 'black' }}>
                                <SearchIcon />
                            </IconButton>
                        </Stack>
                        <TableContainer sx={{ maxHeight: 450, mt: 2 }} component={Paper}>
                            {error && patient.error}
                            {loading ? (<LoadingModal />) : (
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead sx={{ backgroundColor: '#009be5', color: 'white' }}>
                                        <TableRow>
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    indeterminate={
                                                        selected.length > 0 && selected.length < patient.length
                                                    }
                                                    checked={selected.length === patient.length}
                                                    onChange={handleSelectAllClick}
                                                />
                                            </TableCell>
                                            <TableCell >ID</TableCell>
                                            <TableCell >{t('czNo')}</TableCell>
                                            <TableCell >{t('name')}</TableCell>
                                            <TableCell >{t('birthDate')}</TableCell>
                                            <TableCell >{t('gender')}</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {patient?.map((patient) => (
                                            <TableRow
                                                key={patient.id}
                                                style={{ borderRadius: '10px' }}
                                                hover
                                                onClick={(event) => handleClick(event, patient.id)} // Handle row selection
                                                role="checkbox"
                                                aria-checked={isSelected(patient.id)} // Set the aria-checked attribute for accessibility
                                                tabIndex={-1}
                                                selected={isSelected(patient.id)} // Apply selected style if the row is selected
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        color="primary"
                                                        checked={isSelected(patient.id)}
                                                        inputProps={{ 'aria-labelledby': `row-${patient.id}-checkbox` }}
                                                    />
                                                </TableCell>
                                                <TableCell>{patient.id || 'null'}</TableCell>
                                                <TableCell>{patient.identifier?.[0]?.type?.coding?.[0]?.code === "CZ" ? (patient.identifier?.[0]?.value) : ('null')} </TableCell>
                                                <TableCell>{patient.name?.[0]?.given?.[0] || patient.name?.[0]?.text || 'null'} {patient.name?.[0]?.family || 'null'}</TableCell>
                                                <TableCell>{patient.birthDate || 'null'}</TableCell>
                                                <TableCell>{getGenderValueBasedOnLanguage(patient.gender) || 'null'}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>)}
                            <TablePagination
                                rowsPerPageOptions={[]}
                                component="div"
                                count={response.total}
                                rowsPerPage={patient.length}
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
                        </TableContainer>

                        <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
                            <Button onClick={handleClose} color="primary" variant="contained">
                                {t('cancel')}
                            </Button>
                            <Button
                                color="primary" onClick={handleSelect} type='submit' variant="contained" disabled={selected.length === 0 || selected.length > 1}>
                                {t('select')}
                            </Button>
                        </Stack>
                    </Container>
                </Modal>
            )}
        </>
    )
}

export default AppointmentPatientList