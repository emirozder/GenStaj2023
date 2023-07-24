import { configureStore } from "@reduxjs/toolkit";
import patientSlice from "../features/patient/patientSlice";



export const store = configureStore({
    reducer: {
        patient: patientSlice,
    }
});