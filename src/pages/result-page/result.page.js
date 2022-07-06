import React from 'react';
import { Button, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import congoImg from '../assets/congratulations.svg'

const ResultPage = () => {

    const navigate = useNavigate();

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <Paper elevation={3} sx={{ p: 4, width: '40%', minHeight: '300px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={congoImg} alt="" width='40%' />
                    <Typography variant='h5' sx={{ mt: 2, color: '#00bfa5', fontWeight: 'bold', textTransform: 'uppercase' }}>Thank you for your participation</Typography>
                    <Typography variant='h6' sx={{ mt: 2, fontWeight: 'bold', textTransform: 'uppercase' }}>You have got 5 out of 10</Typography>
                    <Button onClick={() => navigate('/new-quiz')}>Go to new quiz page</Button>
                </Box>
            </Paper>
        </Box>
    )
}

export default ResultPage