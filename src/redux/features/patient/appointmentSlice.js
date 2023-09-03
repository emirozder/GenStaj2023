import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fhirClient } from "../../../url/clientDegiskeni";

const initialState = {
    appointment: [],
    response: {},
    departments: [],
    nextUrl: '',
    prevUrl: '',
    currentPage: 0,
    loading: false,
    error: null,
}

export const getAppointment = createAsyncThunk('getAppointment', async ({ type, bundle }) => {
    let response;

    if (type === 'next') {
        response = await fhirClient.nextPage(bundle);
    }
    else if (type === 'prev') {
        response = await fhirClient.prevPage(bundle);
    }
    else {
        response = await fhirClient.search({
            resourceType: 'Appointment',
            searchParams: { _count: '10', _sort: '-_id', _total: 'accurate' }
        });
    }
    console.log("appointment response", response);
    return response
});

export const addAppointment = createAsyncThunk('addAppointment', async (data) => {
    await fhirClient.create({
        resourceType: 'Appointment', body: data
    });
});

export const getDepartments = createAsyncThunk('getDepartments', async () => {
    let response;

        response = await fhirClient.search({
            resourceType: 'ValueSet/c80-practice-codes',
            //searchParams: { id: 'c80-practice-codes' }
        });
    
    return response
});



export const appointmentSlice = createSlice({
    name: "appointment",
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },

    },
    extraReducers: (builder) => {
        //#region Appointment AddCase
        builder.addCase(getAppointment.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getAppointment.fulfilled, (state, action) => {
            state.loading = false;
            state.response = action.payload;
            state.appointment = action.payload?.entry.map(entry => entry.resource)
            state.nextUrl = action.payload?.link.find(link => link.relation === 'next')
            state.prevUrl = action.payload?.link.find(link => link.relation === 'prev')
        });
        builder.addCase(getAppointment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        //#endregion
        
        //#region addPatient AddCase
        builder.addCase(addAppointment.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(addAppointment.fulfilled, (state, action) => {
            state.loading = false;
            //state.response.push(action.payload);
        });
        builder.addCase(addAppointment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        //#endregion

        //#region Departments AddCase
        builder.addCase(getDepartments.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getDepartments.fulfilled, (state, action) => {
            state.loading = false;
            state.departments = action.payload;
        });
        builder.addCase(getDepartments.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        //#endregion
    }
})

export const { setCurrentPage } = appointmentSlice.actions;
export default appointmentSlice.reducer;
