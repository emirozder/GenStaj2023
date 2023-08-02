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
        console.log("BASILDI GELEN ID: ", delID.delID?.[0])
        await dispatch(deletePatient(delID.delID?.[0]))
        await dispatch(getSearchedPatient(''))
        handleClose();
    }

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
                <DialogTitle id="alert-dialog-title" color={'secondary'}>
                    {"Delete Patient"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure to delete patient "ID:{delID.delID?.[0]}" record?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color='secondary' onClick={handleClose}>Cancel</Button>
                    <Button color='secondary' onClick={handleDelete} autoFocus>Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default DeletePatient