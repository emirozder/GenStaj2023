import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { deletePatient, getSearchedPatient } from '../redux/features/patient/patientSlice';
import { useTranslation } from 'react-i18next';

const DeletePatient = (delID) => {

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async() => {
        //console.log("BASILDI GELEN ID: ", delID.delID?.[0])
        await dispatch(deletePatient(delID.delID?.[0]))
        await dispatch(getSearchedPatient(''))
        handleClose();
    }

    const {t} = useTranslation()

    return (
        <>
            <IconButton aria-label="delete" size="small" color="error" onClick={handleClickOpen}>
                <DeleteIcon fontSize="inherit" />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" color={'primary'}>
                {t('deletePatientTitle')}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    {t('deletePatientText')} "ID:{delID.delID?.[0]}"
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color='primary' onClick={handleClose}>{t('cancel')}</Button>
                    <Button color='primary' onClick={handleDelete} autoFocus>{t('delete')}</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default DeletePatient