import React from 'react'
import { Box, Button } from '@mui/material';
import { uniqueNamesGenerator, names } from 'unique-names-generator';
import LoginModal from './component/login-modal.component';



const LoginPage = () => {
    const [open, setOpen] = React.useState(false);
    const [userName, setUser] = React.useState('');

    const handleLogin = () => {
        setUser( uniqueNamesGenerator({
            dictionaries: [names],
            length: 1
        }))
        setOpen(true)
        
    }
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <Button
                onClick={handleLogin}
                variant="contained">
                LOGIN
            </Button>
            {open && <LoginModal open setOpen={setOpen} userName={userName} />}
        </Box>
    )
}

export default LoginPage