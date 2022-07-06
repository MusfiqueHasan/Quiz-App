import { Chip, FormControl, FormControlLabel, Paper, Radio, RadioGroup, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

const QuestionPage = () => {
    const { id } = useParams()
    const navigate = useNavigate();
    const [questionData, setQuestionData] = useState({});
    const [totalQuestions, setTotalQuestions] = useState(0);

    const [currentValue, setCurrentValue] = useState('');

    const answers = JSON.parse(localStorage.getItem('answers'));

    useEffect(() => {
        setCurrentValue(answers?.length && answers.filter(answer => answer.id === id)[0]?.value ? answers.filter(answer => answer.id === id)[0]?.value : '')
    }, [answers, id])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('questions'))
        if (!data) navigate('/new-quiz');

        if (id > data.length) navigate(`/question/${data.length}`);
        else if (id < 1) navigate(`/question/1`);

        const currentQuestionData = data[id - 1];
        setQuestionData(currentQuestionData);
        setTotalQuestions(data.length);
    }, [id, navigate])

    const handleNext = () => {
        const qId = parseInt(id)

        if (qId === totalQuestions) {
            const questions = JSON.parse(localStorage.getItem('questions'));
            const answers = JSON.parse(localStorage.getItem('answers'));
            console.log(questions);
            console.log(answers);
            let correct = 0, incorrect = 0, skipped = 0, totalQuestion = 0;
            const result = questions.map((question, index) => {
                const answer = answers.find(answer => parseInt(answer.id) === index + 1);
                if (answer && answer.value === question.correct_answer) {
                    correct++;
                    return { id: index, status: 'correct' };
                }
                else if (answer && answer.value !== question.correct_answer) {
                    incorrect++;
                    return { id: index, status: 'incorrect' };
                }
                else {
                    skipped++;
                    return { id: index, status: 'skipped' }
                }
            });
            totalQuestion = result.length;
            const allQuizResult = JSON.parse(localStorage.getItem('allQuizResult')) || [];
            allQuizResult.push({correct, incorrect, skipped, totalQuestion});
            localStorage.setItem('result', JSON.stringify(result))
            localStorage.setItem('allQuizResult', JSON.stringify(allQuizResult))
            localStorage.removeItem('answers')
            localStorage.removeItem('questions')
            navigate('/result')
        }
        if (qId < totalQuestions) navigate(`/question/${qId + 1}`);
    }

    const handleSkip = () => {
        const newAnswers = answers.filter(answer => answer.id !== id);
        localStorage.setItem('answers', JSON.stringify(newAnswers));

        navigate(`/question/${parseInt(id) + 1}`);
    }

    const handleSelectAnswer = e => {
        const currentVal = e.target.value;
        setCurrentValue(currentVal);
        if (answers?.length) {
            let isFound = false;
            const newAnswers = answers.map(answer => {
                if (answer.id === id) {
                    answer.value = currentVal;
                    isFound = true;
                }
                return answer;
            });
            if (!isFound) newAnswers.push({ id, value: currentVal });
            if (newAnswers) localStorage.setItem('answers', JSON.stringify(newAnswers));
        } else {
            localStorage.setItem('answers', JSON.stringify([{ id, value: currentVal }]));
        }
    }

    return questionData &&
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <Paper elevation={3} sx={{ p: 4, width: '50%' }}>
                <Typography sx={{ mb: 2 }}>{id}. {questionData?.question}</Typography>
                <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="radio-buttons-group"
                        onChange={handleSelectAnswer}
                        value={currentValue}
                    >
                        {questionData?.options?.map((option, index) =>
                            <FormControlLabel
                                key={`${index}-${option}`}
                                value={option}
                                control={<Radio />}
                                label={option}
                            />
                        )}

                    </RadioGroup>
                </FormControl>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 4 }}>
                    <Chip
                        disabled={1 === parseInt(id)}
                        sx={{ bgcolor: '#e3f2fd', color: '#1e88e5', fontWeight: 'bold', paddingInline: 1, marginRight: 1, cursor: 'pointer' }}
                        onClick={() => navigate(`/question/${parseInt(id) - 1}`)}
                        label={<span>Previous</span>}
                    />
                    <Box>
                        <Chip
                            onClick={handleSkip}
                            disabled={totalQuestions === parseInt(id)}
                            sx={{ bgcolor: '#f3e5f5', color: '#8e24aa', fontWeight: 'bold', paddingInline: 1, marginRight: 1, cursor: 'pointer' }}
                            label={<span>Skip</span>}

                        />
                        <Chip
                            sx={{ bgcolor: '#e0f2f1', color: '#00bfa5', fontWeight: 'bold', paddingInline: 1, marginRight: 1, cursor: 'pointer' }}
                            onClick={handleNext}
                            disabled={currentValue?.length < 1}
                            label={
                                <span>{totalQuestions === parseInt(id) ? 'Submit' : 'Next'}
                                </span>
                            }

                        />
                    </Box>
                </Box>
            </Paper>
        </Box>

}

export default QuestionPage