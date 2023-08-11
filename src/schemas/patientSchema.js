import * as yup from "yup";

const tr_phone_regex = /^(05)([0-9]{2})\s?([0-9]{3})\s?([0-9]{2})\s?([0-9]{2})$/;
const date_regex= /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
const czNo_regex= /^[1-9]{1}[0-9]{9}[02468]{1}$/;

export const patientSchema = yup.object().shape({
    givenName: yup.string().required("*Required"),
    familyName: yup.string().required("*Required"),
    birthDate: yup.string().matches(date_regex, {message: "Date must be 'YYYY-MM-DD' type."}).required("*Required"),
    contact: yup.string().matches(tr_phone_regex, {message: "*Please give a valid contact number"}).required("*Required"),
    address: yup.string().required("*Required"),
    gender: yup.string().required("*Required"),
    czNo: yup.string().matches(czNo_regex, {message: "*Please give a valid citizenship number"}).required("*Required")
})