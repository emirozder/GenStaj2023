import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fhirClient } from "../../../url/clientDegiskeni";


const initialState = {
    patient: [],
    response: {},
    nextUrl: '',
    prevUrl: '',
    currentPage: 0,
    rowsPerPage: 5,
    loading: false,
    error: null
}

export const getPatient = createAsyncThunk('getPatient', async ({type, bundle}) => {
    let response;

    if (type === 'next') {
        response = await fhirClient.nextPage(bundle);
    }
    else if (type === 'prev') {
        response = await fhirClient.prevPage(bundle);
    }
    else {
        response = await fhirClient.search({
            resourceType: 'Patient',
            searchParams: {}
        });
    }
    return response
});


export const patientSlice = createSlice({
    name: "patient",
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setRowsPerPage: (state, action) => {
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
            state.response = action.payload;
            state.patient = action.payload?.entry.map(entry => entry.resource)
            state.nextUrl = action.payload?.link.find(link => link.relation === 'next')
            state.prevUrl = action.payload?.link.find(link => link.relation === 'prev')
        });
        builder.addCase(getPatient.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
})

export const { setCurrentPage, setRowsPerPage } = patientSlice.actions;
export default patientSlice.reducer;
