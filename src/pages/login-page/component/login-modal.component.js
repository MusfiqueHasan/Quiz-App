import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useNavigate } from "react-router-dom";
import Slide from '@mui/material/Slide';
import { Typography } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const LoginModal = ({ open, setOpen, userName }) => {

    const navigate = useNavigate();

    const handleClose = () => {
        setOpen(false);
    };
    const handleAgree = () => {
        localStorage
            .setItem('user', JSON.stringify({ userName }))
        setOpen(false);
        navigate('/new-quiz')
    };

    return (
        <div>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <Typography variant='h5' sx={{ fontWeight: 'bold' }}> Welcome {userName}</Typography>
                        <Typography variant='body' > Do you want to continue?</Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleAgree}>Agree</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default LoginModal