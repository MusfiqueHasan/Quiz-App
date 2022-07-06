import React from 'react'
import { Box, Button, Chip, Typography } from '@mui/material';
import { uniqueNamesGenerator, names } from 'unique-names-generator';
import LoginModal from './component/login-modal.component';
import login from '../assets/login.svg'


const LoginPage = () => {
    const [open, setOpen] = React.useState(false);
    const [userName, setUser] = React.useState('');

    const handleLogin = () => {
        setUser(uniqueNamesGenerator({
            dictionaries: [names],
            length: 1
        }))
        setOpen(true)

    }
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <Box sx={{ width: '30%' }}>
                <img src={login} alt="" width='100%' />
            </Box>
            <Typography
                variant='h4'
                sx={{ color: '#0288d1', fontWeight: 'bold', mt: 5 }}>
                Hi! EXAMER
            </Typography>
            <Typography
                sx={{ color: '#512da8', fontWeight: 'bold' }}>
                "Let's have fun with our brain."
            </Typography>
            <Chip
                sx={{ bgcolor: '#e0f2f1 ', paddingInline: 1, marginRight: 1, cursor: 'pointer', mt: 5 }}
                label={<Button
                    sx={{ color: '#00bfa5', fontWeight: 'bold' }}
                    onClick={handleLogin}>
                    LOGIN QUIZ APP
                </Button>
                }
            />

            {open && <LoginModal open setOpen={setOpen} userName={userName} />}
        </Box>
    )
}

export default LoginPage