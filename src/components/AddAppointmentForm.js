import { Box, Button, Container, FormControl, InputLabel, MenuItem, Modal, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { useDispatch, useSelector } from 'react-redux';
import { getPatientByID, getPractitioners } from '../redux/features/patient/patientSlice';
import { addAppointment, getAppointment, getDepartments } from '../redux/features/patient/appointmentSlice';
import { useTranslation } from 'react-i18next';


const AddAppointmentForm = ({ id_val }) => {
    const dispatch = useDispatch();
    const { practitioner, patient } = useSelector(state => state.patient)
    const { departments } = useSelector(state => state.appointment)

    const [practitioner_val, setPractitioner_val] = useState();
    const [department_val, setdepartment_val] = useState();

    const { t, i18n } = useTranslation()

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // const handleClose = (event, reason) => {
    //     if (reason && reason === "backdropClick")
    //         return;
    //     setOpen(false);
    //     console.log("GFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFJFJFJFJFJF");
    // }

    useEffect(() => {
        handleOpen()
        dispatch(getPatientByID(id_val))
        dispatch(getPractitioners())
        dispatch(getDepartments())
    }, [])

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    let currentDate = `${year}-${month}-${day}`;

    const [startValue, setstartValue] = React.useState(dayjs('2023-08-25T15:30'));

    let given_val = patient?.[0].name?.[0]?.given?.[0] || patient?.[0].name?.[0]?.text || 'null'
    let family_val = patient?.[0].name?.[0]?.family || 'null'

    const handleSave = async () => {
        var addData = {
            resourceType: 'Appointment',
            status: "booked",
            specialty: [{
                text: department_val
            }],
            start: startValue,
            created: currentDate,
            participant: [{
                actor: {
                    display: given_val + ' ' + family_val
                },
                status: 'accepted'
            }, {
                type: [{
                    coding: [{
                        system: 'http://terminology.hl7.org/CodeSystem/v3-ParticipationType',
                        code: 'ATND'
                    }]
                }],
                actor: {
                    display: practitioner_val
                },
                status: 'accepted'
            }]
        }
        await dispatch(addAppointment(addData));
        await dispatch(getAppointment());
        await handleClose();
    }

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Container maxWidth="md" sx={{ mt: 7, p: 3, bgcolor: 'white', borderRadius: 4, maxHeight: 850 }}>
                    <Typography variant="h6" gutterBottom color={'primary'} mb={3}>
                        {t('createAppointment')}
                    </Typography>
                    <Box component="form" noValidate sx={{ display: 'flex', flexDirection: 'column' }}>
                        <TextField
                            label="ID"
                            variant="outlined"
                            value={id_val}
                            InputProps={{
                                readOnly: true,
                            }}
                            sx={{ mb: 2 }}
                        //size={'small'}
                        />

                        <TextField
                            label={t('czNo')}
                            variant="outlined"
                            value={patient?.[0].identifier?.[0]?.type?.coding?.[0]?.code === "CZ" ? (patient?.[0].identifier?.[0]?.value) : ('null')}
                            InputProps={{
                                readOnly: true,
                            }}
                            sx={{ mb: 2 }}
                        //size={'small'}
                        />

                        <TextField
                            label={t('givenName')}
                            value={given_val}
                            InputProps={{
                                readOnly: true,
                            }}
                            sx={{ mb: 2 }}
                        //size={'small'}
                        />

                        <TextField
                            label={t('familyName')}
                            value={family_val}
                            InputProps={{
                                readOnly: true,
                            }}
                            sx={{ mb: 2 }}
                        //size={'small'}
                        />

                        <Stack direction="row" spacing={2} sx={{ mb: 2 }} justifyContent={'space-between'}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">{t('practitioner')}</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={practitioner_val}
                                    label={t('practitioner')}
                                    onChange={(e) => setPractitioner_val(e.target.value)}
                                >
                                    {practitioner?.map((practitioner) => (
                                        <MenuItem value={'Dr.' + ' ' + practitioner.name?.[0]?.given?.[0] + ' ' + practitioner.name?.[0]?.family}>
                                            {'Dr.' + ' ' + practitioner.name?.[0]?.given?.[0] + ' ' + practitioner.name?.[0]?.family}</MenuItem>
                                    ))}

                                </Select>
                            </FormControl>

                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">{t('department')}</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={department_val}
                                    label={t('department')}
                                    onChange={(e) => setdepartment_val(e.target.value)}
                                >
                                    {departments.compose?.include?.[0].concept?.map((departments) => (
                                        <MenuItem value={departments.display}>
                                            {departments.display}</MenuItem>
                                    ))}

                                </Select>
                            </FormControl>
                        </Stack>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateTimePicker', 'DateTimePicker']} sx={{ mb: 2 }}>
                                <DateTimePicker
                                    label={t('appointmentDateTime')}
                                    value={startValue}
                                    onChange={(newValue) => setstartValue(newValue)}
                                    format='YYYY-MM-DD HH:mm'
                                />
                            </DemoContainer>
                        </LocalizationProvider>

                        <Stack direction="row" spacing={2} justifyContent="center">
                            <Button variant="contained" color="primary" onClick={handleSave} >
                                {t('create')}
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleClose}>
                                {t('cancel')}
                            </Button>
                        </Stack>

                    </Box>
                </Container>
            </Modal>
        </>
    )
}

export default AddAppointmentForm