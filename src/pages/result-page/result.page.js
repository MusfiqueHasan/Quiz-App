import React, { useEffect, useState } from 'react';
import { Button, Chip, Divider, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import congoImg from '../assets/congratulations.svg'

const ResultPage = () => {

    const navigate = useNavigate();

    const [quizResult, setQuizResult] = useState({})

    useEffect(() => {
        const result = JSON.parse(localStorage.getItem('allQuizResult'))
        setQuizResult(result[result.length - 1])

    }, [])
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <Paper elevation={3} sx={{ py: 4, width: '50%', minHeight: '300px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={congoImg} alt="" width='40%' />
                    <Typography variant='h5' sx={{ mt: 2, color: '#00bfa5', fontWeight: 'bold', textTransform: 'uppercase' }}>Thank you for your participation</Typography>
                    <Typography variant='h6' sx={{ mt: 2, fontWeight: 'bold' }}>
                        <Chip
                            sx={{ bgcolor: '#f3e5f5', color: '#8e24aa', fontWeight: 'bold', paddingInline: 1, marginRight: 1, cursor: 'pointer', width: '100px', height: '60px' }}
                            label={
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <span style={{ fontSize: 10 }}>Your Score</span>
                                    <span style={{ textAlign: 'center', fontSize: 20 }}>{quizResult.correct}/{quizResult.totalQuestion}</span>
                                </div>
                            }
                        />
                    </Typography>
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Chip
                            sx={{ bgcolor: '#e0f2f1', color: '#00bfa5', fontWeight: 'bold', paddingInline: 1, marginRight: 1, cursor: 'pointer', mt: 5 }}
                            label={<span>{quizResult.correct} correct answers </span>}

                        />
                        <Chip
                            sx={{ bgcolor: '#ffebee', color: '#b71c1c', fontWeight: 'bold', paddingInline: 1, marginRight: 1, cursor: 'pointer', mt: 5 }}
                            label={<span>{quizResult.incorrect} wrong answers </span>}

                        />
                        <Chip
                            sx={{ bgcolor: '#e3f2fd', color: '#1565c0', fontWeight: 'bold', paddingInline: 1, marginRight: 1, cursor: 'pointer', mt: 5 }}
                            label={<span>{quizResult.skipped} unanswered questions </span>}

                        />
                    </Box>
                    <Chip
                        sx={{ bgcolor: '#e0f2f1', color: '#00bfa5', fontWeight: 'bold', paddingInline: 1, marginRight: 1, cursor: 'pointer', mt: 5 }}
                        label={<Button
                            sx={{ fontSize: 10 }}
                            onClick={() => {
                                localStorage.removeItem('result')
                                navigate('/new-quiz')
                            }}>
                            Go to new quiz page
                        </Button>}

                    />

                </Box>
            </Paper >
        </Box >
    )
}

export default ResultPage