import { Button } from '@mui/material';
//import { LocalizationProvider } from '@mui/x-date-pickers';
//import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
//import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { addPatient, getPatient } from '../redux/features/patient/patientSlice';
import FormModal from '../pages/FormModal';
import { City, Country, State } from 'country-state-city';
import { useTranslation } from 'react-i18next';

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

    //#region CountryData
    let countryData = Country.getAllCountries();
    const [stateData, setStateData] = useState();
    const [cityData, setCityData] = useState();

    const [country, setCountry] = useState('');
    const [state, setState] = useState();
    const [city, setCity] = useState();

    const changeCountry = (value) => {
        setCountry(countryData.find(ctr => ctr.name === value));
    }
    const changeState = (value) => {
        setState(stateData.find(ctr => ctr.name === value));
    }
    const changeCity = (value) => {
        setCity(cityData.find(ctr => ctr.name === value));
    }

    useEffect(() => {
        setStateData(State.getStatesOfCountry(country?.isoCode));
    }, [country])

    useEffect(() => {
        setCityData(City.getCitiesOfState(country?.isoCode, state?.isoCode));
    }, [state])

    useEffect(() => {
        stateData && setState(stateData[0]);
    }, [stateData]);

    useEffect(() => {
        cityData && setCity(cityData[0]);
    }, [cityData]);
    //#endregion

    const [givenName, setGivenName] = useState('');
    const [familyName, setFamilyName] = useState('');
    const [birthDate, setbirthDate] = useState('');
    const [gender, setGender] = useState('male');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [czNo, setczNo] = useState('');

    const handleSave = async (values, cou, sta, cit) => {
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
            address: [{ text: [values.address], country: [cou], city: [sta], state: [cit] }],
        }

        if (!values) {
            window.alert("Fields can't be empty!")
        } else {
            await dispatch(addPatient(addData));
            await dispatch(getPatient(''))
            await handleClose();
        }
    }

    const {t} = useTranslation()

    return (
        <>
            <Button
                variant='outlined'
                color='primary'
                onClick={handleOpen}
            >{t('addPatient')}
            </Button>
            <FormModal
                title={t('addPatient')}
                btnTxt={t('add')}
                open={open}
                handleClose={handleClose}
                givenName={givenName}
                familyName={familyName}
                birthDate={birthDate}
                contact={contact}
                address={address}

                stateData={stateData}
                cityData={cityData}
                countryData={countryData}
                country={country}
                changeCountry={changeCountry}
                city={city}
                state={state}
                changeState={changeState}
                changeCity={changeCity}

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