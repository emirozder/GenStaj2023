import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { Backdrop } from '@mui/material';

const LoadingModal = () => {
    const [open, setOpen] = React.useState(true);
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
        >
            <CircularProgress color="primary" />
        </Backdrop>
    )
}

export default LoadingModal