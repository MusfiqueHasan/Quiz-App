import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import { useNavigate } from "react-router-dom";
import Slide from '@mui/material/Slide';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ScoreModal = ({ open, setOpen, userName }) => {

    const [data, setData] = useState([])

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('allQuizResult'))
        setData(data)
    }, [])

    return (
        <div>
            <Dialog
                fullWidth
                maxWidth='lg'
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}

            >
                <TableContainer component={Paper} sx={{ maxHeight: '60vh' }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: '#0288d1', fontWeight: 'bold', }} align='center'>CORRECT ANSWERS</TableCell>
                                <TableCell sx={{ color: '#b71c1c', fontWeight: 'bold' }} align='center' >WRONG ANSWERS</TableCell>
                                <TableCell sx={{ color: '#1565c0', fontWeight: 'bold' }} align='center' >UNANSWERED QUESTION</TableCell>
                                <TableCell sx={{ color: '#00bfa5', fontWeight: 'bold' }} align='center' >TOTAL QUESTION</TableCell>
                                <TableCell sx={{ color: '#ff5722', fontWeight: 'bold' }} align='center' >TIME OF GIVEN QUIZ</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align='center' component="th" scope="row"
                                        sx={{ color: '#0288d1', fontWeight: 'bold' }}>
                                        {row.correct}
                                    </TableCell>
                                    <TableCell align='center' sx={{ color: '#b71c1c', fontWeight: 'bold' }}>{row.incorrect}</TableCell>
                                    <TableCell align='center' sx={{ color: '#1565c0', fontWeight: 'bold' }}>{row.skipped}</TableCell>
                                    <TableCell align='center' sx={{ color: '#00bfa5', fontWeight: 'bold' }}>{row.totalQuestion}</TableCell>
                                    <TableCell align='center' sx={{ color: '#ff5722', fontWeight: 'bold' }}>{row.time}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Dialog>
        </div>
    )
}

export default ScoreModal