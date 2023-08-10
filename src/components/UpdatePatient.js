import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux';
import { getSearchedPatient, updatePatient } from '../redux/features/patient/patientSlice';
import FormModal from '../pages/FormModal';

const UpdatePatient = ({ id_val, czNo_val, given_val, family_val, birthDate_val, gender_val, contact_val, address_val }) => {
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    //const handleClose = () => setOpen(false);
    const handleClose = (event, reason) => {
        if (reason && reason === "backdropClick") 
            return;
            setOpen(false);
    }

    const [givenName, setGivenName] = useState(given_val);
    const [familyName, setFamilyName] = useState(family_val);
    const [birthDate, setbirthDate] = useState(birthDate_val);
    const [gender, setGender] = useState(gender_val);
    const [contact, setContact] = useState(contact_val);
    const [address, setAddress] = useState(address_val);
    const [czNo, setczNo] = useState(czNo_val);
    
    
    
    const handleSave = async(values) => {
        var updData = {
            resourceType: 'Patient',
            id: id_val,
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
        }else {
            dispatch(updatePatient(updData));
            dispatch(getSearchedPatient(''))
            handleClose();
        }
    };

    return (
        <>
            <IconButton aria-label="delete" size="small" color="info" onClick={handleOpen}>
                <EditIcon fontSize="inherit" />
            </IconButton>
            <FormModal
                title={"Update Patient"}
                btnTxt={"Update"}
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
                handleSave={handleSave}
            />
        </>
    );
};

export default UpdatePatient;
