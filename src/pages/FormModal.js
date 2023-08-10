import React from 'react';
import { Button, Modal, Box, TextField, Typography, Container, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Stack, Autocomplete } from '@mui/material';
import { useFormik } from 'formik';
import { patientSchema } from '../schemas/patientSchema';
import CountrySelector from './CountrySelector';
import Countries from '../components/Countries';

const FormModal = ({ title, btnTxt, open, handleClose, givenName, familyName, birthDate, contact, address, gender, czNo, handleSave }) => {

    const onSubmit = async (values, actions) => {
        handleSave(values);
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



    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Container maxWidth="md" sx={{ mt: 7, p: 3, bgcolor: 'white', borderRadius: 4, maxHeight: 850}}>
                <Typography variant="h6" gutterBottom color={'primary'} mb={3}>
                    {title}
                </Typography>
                <Box component="form" noValidate sx={{ display: 'flex', flexDirection: 'column' }}>
                    <TextField
                        label="Citizenship No"
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
                        label="Given Name"
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
                        label="Family Name"
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
                        label="Birth Date (YYYY-MM-DD)"
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
                        label="Contact"
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
                        label="Address"
                        variant="outlined"
                        name='address'
                        value={values.address}
                        error={errors.address && touched.address}
                        helperText={errors.address && touched.address ? errors.address : ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        sx={{ mb: 2 }}
                    />
                    <Countries/>
                    <FormControl>
                        <FormLabel>Gender</FormLabel>
                        <RadioGroup row
                            name='gender'
                            value={values.gender}
                            sx={{ mb: 2 }}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onError={errors.gender && touched.gender}>
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                        </RadioGroup>
                    </FormControl>
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={isSubmitting}>
                            {btnTxt}
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleClose} disabled={isSubmitting}>
                            Cancel
                        </Button>
                    </Stack>
                </Box>
            </Container>
        </Modal>
    )
}

export default FormModal