import React, { useState } from 'react';
import { Button, Modal, Box, TextField, Typography, Container, IconButton, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux';
import { getPatient, getSearchedPatient, updatePatient } from '../redux/features/patient/patientSlice';

const UpdatePatient = ({ id_val, given_val, family_val, birthDate_val, gender_val, contact_val, address_val }) => {
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [givenName, setGivenName] = useState(given_val);
    const [familyName, setFamilyName] = useState(family_val);
    const [birthDate, setbirthDate] = useState(birthDate_val);
    const [gender, setGender] = useState(gender_val);
    const [contact, setContact] = useState(contact_val);
    const [address, setAddress] = useState(address_val);

    const handleSave = async() => {
        var updData = {
            resourceType: 'Patient',
            id: id_val,
            name: [
                {
                    family: familyName,
                    given: [givenName],
                },
            ],
            gender: gender,
            birthDate: birthDate,
            telecom: [{ system: 'phone', value: contact }],
            address: [{ text: [address] }],
        }

        if (!givenName) {
            window.alert("Given Name can't be empty!")
        } else if (!familyName) {
            window.alert("Family Name can't be empty!")
        } else if (!birthDate) {
            window.alert("Birth Date can't be empty!")
        } else if (!contact) {
            window.alert("Telecom can't be empty!")
        } else if (!address) {
            window.alert("Address can't be empty!")
        } else {
            dispatch(updatePatient(updData));
            dispatch(getSearchedPatient(''))
            handleClose();
        }
    };

    return (
        <>
            <IconButton aria-label="delete" size="small" color="primary" onClick={handleOpen}>
                <EditIcon fontSize="inherit" />
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Container maxWidth="md" sx={{ mt: 10, p: 3, bgcolor: 'white', borderRadius: 4 }}>
                    <Typography variant="h6" gutterBottom color={'secondary'} mb={3}>
                        Update Patient
                    </Typography>
                    <Box component="form" noValidate sx={{ display: 'flex', flexDirection: 'column' }}>
                        <TextField
                            label="Given Name"
                            variant="outlined"
                            value={givenName}
                            error={!givenName}
                            helperText={!givenName ? '*Required' : ''}
                            onChange={(e) => setGivenName(e.target.value)}
                            sx={{ mb: 3 }}
                        />
                        <TextField
                            label="Family Name"
                            variant="outlined"
                            value={familyName}
                            onChange={(e) => setFamilyName(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Birth Date"
                            variant="outlined"
                            value={birthDate}
                            onChange={(e) => setbirthDate(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        {/* <TextField
                            label="Gender"
                            variant="outlined"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            sx={{ mb: 2 }}
                        /> */}
                        <TextField
                            label="Contact"
                            variant="outlined"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Address"
                            variant="outlined"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <FormControl>
                            <FormLabel>Gender</FormLabel>
                            <RadioGroup row
                                name='gender'
                                value={gender}
                                sx={{ mb: 2 }}
                                onChange={(e) => setGender(e.target.value)}>
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                            </RadioGroup>
                        </FormControl>
                        <Button variant="contained" color="secondary" onClick={handleSave}>
                            Save
                        </Button>
                    </Box>
                </Container>
            </Modal>
        </>
    );
};

export default UpdatePatient;
