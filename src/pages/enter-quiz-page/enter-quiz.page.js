import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import GridLoader from "react-spinners/GridLoader";
import shuffleArray from '../../utils/shuffle-array';

const EnterQuiz = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

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
                <Button onClick={handleEnterQuiz} variant="contained">
                    ENTER QUIZ
                </Button>
            }
        </Box>
    )
}

export default EnterQuiz