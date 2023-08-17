import React, { useEffect } from 'react'
import { Button, Modal, Box, TextField, Typography, Container, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Stack, Autocomplete } from '@mui/material';
import { useFormik } from 'formik';
import { patientSchema } from '../schemas/patientSchema';
import { useDispatch, useSelector } from 'react-redux';
import { getGenders } from '../redux/features/patient/patientSlice';
import { useTranslation } from 'react-i18next';

const FormModal = ({ title, btnTxt, open, handleClose, givenName, familyName, birthDate, contact, address, countryData, stateData, cityData, country, changeCountry, city, changeCity, state, changeState, gender, czNo, handleSave }) => {
    const dispatch = useDispatch();
    const { genders } = useSelector(state => state.patient)

    useEffect(() => {
        if (genders.length <= 0) {
            dispatch(getGenders());
        }
    }, [dispatch])

console.log("forma gelen ctr", country);
console.log("forma gelen stt", state);
console.log("forma gelen cty", city);
    const onSubmit = async (values, actions) => {
        handleSave(values, country.name, city.name, state.name);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        actions.resetForm()
    }

    const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            givenName: givenName.toString(),
            familyName: familyName.toString(),
            birthDate: birthDate.toString(),
            contact: contact.toString(),
            address: address.toString(),
            gender: gender.toString(),
            czNo: czNo.toString()
        },
        validationSchema: patientSchema,
        onSubmit,
    });

    const [inputValue, setInputValue] = React.useState(country);
    const [inputValue2, setInputValue2] = React.useState(state);
    const [inputValue3, setInputValue3] = React.useState(city);

    const { t } = useTranslation()

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Container maxWidth="md" sx={{ mt: 7, p: 3, bgcolor: 'white', borderRadius: 4, maxHeight: 850 }}>
                <Typography variant="h6" gutterBottom color={'primary'} mb={3}>
                    {title}
                </Typography>
                <Box component="form" noValidate sx={{ display: 'flex', flexDirection: 'column' }}>
                    <TextField
                        label={t('czNo')}
                        variant="outlined"
                        name='czNo'
                        value={values.czNo}
                        error={errors.czNo && touched.czNo}
                        helperText={errors.czNo && touched.czNo ? errors.czNo : ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        sx={{ mb: 3 }}
                    />
                    <TextField
                        label={t('givenName')}
                        variant="outlined"
                        name='givenName'
                        value={values.givenName}
                        error={errors.givenName && touched.givenName}
                        helperText={errors.givenName && touched.givenName ? errors.givenName : ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        sx={{ mb: 3 }}
                    />
                    <TextField
                        label={t('familyName')}
                        variant="outlined"
                        name='familyName'
                        value={values.familyName}
                        error={errors.familyName && touched.familyName}
                        helperText={errors.familyName && touched.familyName ? errors.familyName : ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label={t('birthDateLabel')}
                        variant="outlined"
                        name='birthDate'
                        value={values.birthDate}
                        error={errors.birthDate && touched.birthDate}
                        helperText={errors.birthDate && touched.birthDate ? errors.birthDate : ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label={t('contact')}
                        variant="outlined"
                        name='contact'
                        value={values.contact}
                        error={errors.contact && touched.contact}
                        helperText={errors.contact && touched.contact ? errors.contact : ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label={t('address')}
                        variant="outlined"
                        name='address'
                        value={values.address}
                        error={errors.address && touched.address}
                        helperText={errors.address && touched.address ? errors.address : ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        sx={{ mb: 2 }}
                    />
                    <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                        <Autocomplete
                            value={country?.name}
                            // inputValue={inputValue}
                            // onInputChange={(event, newInputValue) => {
                            //     setInputValue(newInputValue);
                            // }}
                            onChange={(event, newValue) => {
                                newValue && changeCountry(newValue);
                            }}
                            id="controllable-states-demo"
                            options={countryData?.map(data => data.name)}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label={t('country')} />}
                        />
                        {state && <Autocomplete
                            value={state?.name}
                            // inputValue={inputValue2}
                            // onInputChange={(event, newInputValue) => {
                            //     setInputValue2(newInputValue);
                            // }}
                            onChange={(event, newValue) => {
                                newValue && changeState(newValue);
                            }}
                            id="controllable-states-demo"
                            options={stateData?.map(data => data.name)}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label={t('state')} />}
                        />}
                        {city && <Autocomplete
                            value={city?.name}
                            // inputValue={inputValue3}
                            // onInputChange={(event, newInputValue) => {
                            //     setInputValue3(newInputValue);
                            // }}
                            onChange={(event, newValue) => {
                                newValue && changeCity(newValue);
                            }}
                            id="controllable-states-demo"
                            options={cityData?.map(data => data.name)}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label={t('city')} />}
                        />}
                    </Stack>
                    <FormControl>
                        <FormLabel>{t('gender')}</FormLabel>
                        <RadioGroup row
                            name='gender'
                            value={values.gender}
                            sx={{ mb: 2 }}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onError={errors.gender && touched.gender}>
                            {genders?.map((genders) => (
                                <FormControlLabel value={genders.code} control={<Radio />} label={genders.display} />
                            ))}
                        </RadioGroup>
                    </FormControl>
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={isSubmitting}>
                            {btnTxt}
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleClose} disabled={isSubmitting}>
                            {t('cancel')}
                        </Button>
                    </Stack>
                </Box>
            </Container>
        </Modal>
    )
}

export default FormModal