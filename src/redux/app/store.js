import { configureStore } from "@reduxjs/toolkit";
import patientSlice from "../features/patient/patientSlice";
import appointmentSlice from "../features/patient/appointmentSlice";



export const store = configureStore({
    reducer: {
        patient: patientSlice,
        appointment: appointmentSlice
    }
});