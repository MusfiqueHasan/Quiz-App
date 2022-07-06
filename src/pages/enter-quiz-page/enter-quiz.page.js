import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, Chip, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import GridLoader from "react-spinners/GridLoader";
import shuffleArray from '../../utils/shuffle-array';
import welcome from '../assets/welcome.svg'
import ScoreModal from './component/score.component';

const EnterQuiz = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({})
    const [open, setOpen] = useState(false);

    const handleLogin = () => {
        setOpen(true)

    }

    const handleEnterQuiz = useCallback(() => {
        const getData = async () => {
            setLoading(true);
            await axios
                .get('https://opentdb.com/api.php?amount=10&type=multiple')
                .then(res => {
                    const results = res.data.results.map(item => {
                        item.options = shuffleArray([item.correct_answer, ...item.incorrect_answers])
                        return item;
                    })
                    localStorage.setItem('questions', JSON.stringify(results))
                    setLoading(false)
                    navigate(`/question/1`)
                })
        }
        getData();

    }, [navigate])

    useEffect(() => {
        const userName = JSON.parse(localStorage.getItem('user'))
        setUser(userName)

    }, [])
    useEffect(() => {
        const keyEnterHandler = event => {
            if (event.key === 'Enter') {
                event.preventDefault();
                handleEnterQuiz();
            }
        };

        document.addEventListener('keypress', keyEnterHandler);
        return () => document.removeEventListener('keypress', keyEnterHandler);

    }, [handleEnterQuiz]);


    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            {loading ?
                <Box sx={{ display: 'flex' }}>
                    <GridLoader color='#00bfa5' size={50} />
                </Box>
                :
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <Box sx={{ width: '50%' }}>
                        <img src={welcome} alt="" width='100%' />
                    </Box>
                    <Typography
                        sx={{ color: '#512da8', fontWeight: 'bold', mt: 5 }}>
                        "Hello {user.userName}"
                    </Typography>
                    <Typography
                        variant='h4'
                        sx={{ color: '#0288d1', fontWeight: 'bold' }}>
                        WELCOME
                    </Typography>
                    <Chip
                        sx={{ bgcolor: '#e0f2f1', fontWeight: 'bold', paddingInline: 1, marginRight: 1, cursor: 'pointer', mt: 5 }}
                        label={<Button
                            sx={{ color: '#00bfa5' }}
                            onClick={handleEnterQuiz} >
                            ENTER QUIZ
                        </Button>}
                    />
                    <Chip
                        sx={{ bgcolor: '#ffe0b2', fontWeight: 'bold', paddingInline: 1, marginRight: 1, cursor: 'pointer', mt: 2 }}
                        label={<Button
                            sx={{ color: '#d84315' }}
                            onClick={handleLogin} >
                            ALL QUIZ RESULT
                        </Button>}
                    />
                    {open && <ScoreModal open setOpen={setOpen} />}
                </Box>

            }
        </Box>
    )
}

export default EnterQuiz