import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux';
import { getSearchedPatient, updatePatient } from '../redux/features/patient/patientSlice';
import FormModal from '../pages/FormModal';
import { City, Country, State } from 'country-state-city';
import { useTranslation } from 'react-i18next';

const UpdatePatient = ({ id_val, czNo_val, given_val, family_val, birthDate_val, gender_val, contact_val, address_val, country_val, state_val, city_val }) => {
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const handleOpen = () => {

        setOpen(true);
        changeCountry(country_val);
        changeState(state_val);
        changeCity(city_val);
        console.log("ilçe bilgisi", cityInfo.find(ctr => ctr.name === city_val));
        console.log("modal'a gidecek country", country);
        console.log("modal'a gidecek state", state);
        console.log("modal'a gidecek city", city);
    }
    //const handleClose = () => setOpen(false);
    const handleClose = (event, reason) => {
        if (reason && reason === "backdropClick")
            return;
        setOpen(false);
    }

    //#region CountryData
    let countryData = Country.getAllCountries();
    let stateInfo = State.getAllStates();
    let cityInfo = City.getAllCities();
    const [stateData, setStateData] = useState();
    const [cityData, setCityData] = useState();
    const [country, setCountry] = useState(countryData.find(ctr => ctr.name === country_val));
    const [state, setState] = useState((stateInfo.find(ctr => ctr.name === state_val)));
    const [city, setCity] = useState((cityInfo.find(ctr => ctr.name === city_val)));
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

    const [givenName, setGivenName] = useState(given_val);
    const [familyName, setFamilyName] = useState(family_val);
    const [birthDate, setbirthDate] = useState(birthDate_val);
    const [gender, setGender] = useState(gender_val);
    const [contact, setContact] = useState(contact_val);
    const [address, setAddress] = useState(address_val);
    const [czNo, setczNo] = useState(czNo_val);


    const handleSave = async (values, cou, sta, cit) => {
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
            address: [{ text: [values.address], country: [cou], city: [sta], state: [cit] }],
        }

        if (!values) {
            window.alert("Fields can't be empty!")
        } else {
            await dispatch(updatePatient(updData));
            await dispatch(getSearchedPatient(''))
            await handleClose();
        }
    };


    const { t } = useTranslation()

    return (
        <>
            <IconButton aria-label="delete" size="small" color="info" onClick={handleOpen}>
                <EditIcon fontSize="inherit" />
            </IconButton>
            <FormModal
                title={t('updatePatient')}
                btnTxt={t('update')}
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
                handleSave={handleSave}
            />
        </>
    );
};

export default UpdatePatient;
