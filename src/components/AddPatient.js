import { Button } from '@mui/material';
//import { LocalizationProvider } from '@mui/x-date-pickers';
//import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
//import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addPatient, getPatient } from '../redux/features/patient/patientSlice';
import FormModal from '../pages/FormModal';

const AddPatient = () => {
    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    //const handleClose = () => setOpen(false);
    const handleClose = (event, reason) => {
        if (reason && reason === "backdropClick") 
            return;
            setOpen(false);
    }

    const [givenName, setGivenName] = useState('');
    const [familyName, setFamilyName] = useState('');
    const [birthDate, setbirthDate] = useState('');
    const [gender, setGender] = useState('male');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [czNo, setczNo] = useState('');

    const handleSave = async (values) => {
        var addData = {
            resourceType: 'Patient',
            identifier: [
                {
                    use: "usual",
                    type: {
                        coding: [
                            {
                                system: "http://terminology.hl7.org/CodeSystem/v2-0203",
                                code: "CZ"
                            }
                        ]
                    },
                    value: values.czNo
                }
            ],
            name: [
                {
                    family: values.familyName,
                    given: [values.givenName],
                },
            ],
            gender: values.gender,
            birthDate: values.birthDate,
            telecom: [{ system: 'phone', value: values.contact }],
            address: [{ text: [values.address] }],
        }
        
        if (!values) {
            window.alert("Fields can't be empty!")
        } else {
            dispatch(addPatient(addData));
            dispatch(getPatient(''))
            handleClose();
        }
    }

    return (
        <>
            <Button
                variant='outlined'
                color='primary'
                onClick={handleOpen}
            >Add Patient
            </Button>
            <FormModal
                title={"Add Patient"}
                btnTxt={"Add"}
                open={open}
                handleClose={handleClose}
                givenName={givenName}
                familyName={familyName}
                birthDate={birthDate}
                contact={contact}
                address={address}
                gender={gender}
                czNo={czNo}
                // setGivenName={setGivenName}
                // setFamilyName={setFamilyName}
                // setbirthDate={setbirthDate}
                // setContact={setContact}
                // setAddress={setAddress}
                // setGender={setGender}
                // setczNo={setczNo}
                handleSave={handleSave}
            />
        </>
    )
}

export default AddPatient