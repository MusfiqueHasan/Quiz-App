import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useNavigate } from "react-router-dom";
import Slide from '@mui/material/Slide';
import { Chip, Typography } from '@mui/material';

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
                fullWidth
                maxWidth='sm'
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
            >
                <DialogContent>
                    <DialogContentText
                        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                        id="alert-dialog-slide-description">

                        <Typography variant='h5' sx={{ fontWeight: 'bold', color: '#0091ea' }}> Welcome {userName}</Typography>
                        <Typography variant='body' > Do you want to continue?</Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}
                >
                    <Chip
                        sx={{ bgcolor: '#fbe9e7', cursor: 'pointer' }}
                        label={<Button
                            sx={{ color: '#e64a19', fontWeight: 'bold' }}
                            onClick={handleClose}>NO</Button>
                        }
                    />
                    <Chip
                        sx={{ bgcolor: '#e8f5e9', cursor: 'pointer' }}
                        label={<Button
                            sx={{ color: '#43a047', fontWeight: 'bold' }}
                            onClick={handleAgree}>YES</Button>
                        }
                    />


                </DialogActions>
            </Dialog>
        </div>
    )
}

export default LoginModal