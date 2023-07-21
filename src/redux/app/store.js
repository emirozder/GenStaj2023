import { configureStore } from "@reduxjs/toolkit";
import patientSlice from "../features/patient/patientSlice";



export const strore = configureStore({
    reducer: {
        patient: patientSlice,
    }
});