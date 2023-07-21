import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Client from "fhir-kit-client";


const initialState = {
    patient: [],
    nextUrl: '',
    prevUrl: '',
    currentPage: 0,
    rowsPerPage: 5,
    loading: false,
    error: null
}


export const getPatient = createAsyncThunk('getPatient', async (type, { getState }) => {
    //const url = 'https://hapi.fhir.org/baseR5/'
    let url;
    if (type === 'next') {
        url = getState().patient.nextUrl;
    }
    else if (type === 'prev') {
        url = getState().patient.prevUrl;
    }
    else {
        url = 'https://hapi.fhir.org/baseR5/'
    }

    const fhirClient = new Client({
        baseUrl: url
    });

    const response = await fhirClient
        .search({
            resourceType: 'Patient',
            searchParams: {}
        });


    //const patData = getState().patient.patient.concat(response.entry.map(entry => entry.resource));
    const patData = response.entry.map(entry => entry.resource);
    const nextUrl = response.link.find(link => link.relation === 'next')?.url;
    const prevUrl = response.link.find(link => link.relation === 'prev')?.url;

    return { patData, nextUrl, prevUrl }
});


export const patientSlice = createSlice({
    name: "patient",
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setRowsPerPage: (state,action) => {
            state.rowsPerPage = action.payload;
            state.currentPage = 0;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getPatient.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getPatient.fulfilled, (state, action) => {
            state.loading = false;
            state.patient = action.payload.patData;
            state.nextUrl = action.payload.nextUrl;
            state.prevUrl = action.payload.prevUrl;
        });
        builder.addCase(getPatient.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
})

export const { setCurrentPage, setRowsPerPage } = patientSlice.actions;
export default patientSlice.reducer;
