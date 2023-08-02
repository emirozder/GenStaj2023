import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, Modal, Radio, RadioGroup, TextField, Typography } from '@mui/material';
//import { LocalizationProvider } from '@mui/x-date-pickers';
//import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
//import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addPatient, getPatient } from '../redux/features/patient/patientSlice';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const initValues = {
    given: '',
    family: '',
    gender: 'male',
    telecom: '',
    address: '',
    birthDate: ''
}

const AddPatient = () => {
    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const [values, setValues] = useState(initValues);
    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }


    const handleSave = async () => {
        var addData = {
            resourceType: 'Patient',
            name: [
                {
                    family: values.family,
                    given: [values.given],
                },
            ],
            gender: values.gender,
            birthDate: values.birthDate,
            telecom: [{ system: 'phone', value: values.telecom }],
            address: [{ text: [values.address] }],
        }
        //console.log("gidecek values", addData)
        if (!values.given) {
            window.alert("Given Name can't be empty!")
        } else if (!values.family) {
            window.alert("Family Name can't be empty!")
        } else if (!values.birthDate) {
            window.alert("Birth Date can't be empty!")
        } else if (!values.telecom) {
            window.alert("Telecom can't be empty!")
        } else if (!values.address) {
            window.alert("Address can't be empty!")
        } else {
            await dispatch(addPatient(addData));
            await dispatch(getPatient(''))
            handleClose();
        }
    }


    return (
        <>
            <Button
                variant='outlined'
                color='secondary'
                onClick={handleOpen}
            >Add Patient
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant='h4' textAlign={'center'} color={'secondary'} pb={'20px'}>Add Patient Form</Typography>
                    <form>
                        <Grid container>
                            <Grid item xs={8}>
                                <TextField
                                    variant='outlined'
                                    label="Given Name"
                                    name='given'
                                    value={values.given}
                                    onChange={handleInputChange}
                                    error={!values.given}
                                    helperText={!values.given ? '*Required' : ''}
                                    sx={{ margin: '10px' }}
                                />
                                <TextField
                                    variant='outlined'
                                    label="Family Name"
                                    name='family'
                                    value={values.family}
                                    onChange={handleInputChange}
                                    error={!values.family}
                                    helperText={!values.family ? '*Required' : ''}
                                    sx={{ margin: '10px' }}
                                />
                                <TextField
                                    variant='outlined'
                                    label="Telecom"
                                    name='telecom'
                                    value={values.telecom}
                                    onChange={handleInputChange}
                                    error={!values.telecom}
                                    helperText={!values.telecom ? '*Required' : ''}
                                    sx={{ margin: '10px' }}
                                />
                                <TextField
                                    variant='outlined'
                                    label="Address"
                                    name='address'
                                    value={values.address}
                                    onChange={handleInputChange}
                                    error={!values.address}
                                    helperText={!values.address ? '*Required' : ''}
                                    sx={{ margin: '10px' }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                {/* <DatePicker
                                        name='birthDate'
                                        format='YYYY-MM-DD'
                                        label="Birth Date"
                                        value={values.birthDate}
                                        onChange={date => handleInputChange(convertToDefEventPara('birthDate', date))}
                                        sx={{ margin: '10px' }}
                                    /> */}
                                <TextField
                                    variant='outlined'
                                    label="Birth Date (YYYY-MM-DD)"
                                    name='birthDate'
                                    value={values.birthDate}
                                    onChange={handleInputChange}
                                    error={!values.birthDate}
                                    helperText={!values.birthDate ? '*Required' : ''}
                                    sx={{ margin: '10px' }}
                                />
                                <FormControl sx={{ margin: '10px' }}>
                                    <FormLabel>Gender</FormLabel>
                                    <RadioGroup row
                                        name='gender'
                                        value={values.gender}
                                        onChange={handleInputChange}>
                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Button
                                variant='contained'
                                color='secondary'
                                size="large"
                                sx={{ margin: '10px', marginLeft: '50%' }}
                                onClick={handleSave}>
                                Save
                            </Button>
                        </Grid>
                    </form>
                </Box>
            </Modal>
        </>
    )
}

export default AddPatient