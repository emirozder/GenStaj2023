import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAppointment, setCurrentPage } from '../redux/features/patient/appointmentSlice';
import AppointmentTable from '../pages/AppointmentTable';

const Appointment = () => {

    const dispatch = useDispatch();
    const { appointment, response, nextUrl, prevUrl, loading, error, currentPage } = useSelector(state => state.appointment)

    useEffect(() => {
        dispatch(getAppointment(''))
    }, [dispatch])


    //#region PAGINATION and NEW DATA FETCHING starts

    const handlePageChange = (event, newPage) => {
        if (newPage > currentPage) {
            const params = {
                type: 'next',
                bundle: response
            }
            dispatch(getAppointment(params));
            dispatch(setCurrentPage(0));
        } else if (newPage < currentPage) {
            const params = {
                type: 'prev',
                bundle: response
            }
            dispatch(getAppointment(params));
            dispatch(setCurrentPage(0));
        } else {
            dispatch(setCurrentPage(newPage));
        }
    };

    //#endregion



    return (
        <AppointmentTable
            appointment={appointment}
            loading={loading}
            error={error}
            currentPage={currentPage}
            rowsPerPage={appointment.length}
            handlePageChange={handlePageChange}
            nextUrl={nextUrl}
            prevUrl={prevUrl}
            total={response.total}
        />
    )
}

export default Appointment