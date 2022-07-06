import React from 'react';
import { createMemoryHistory } from "history"
import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import Home from '../components/pages/Home';
import { Router } from 'react-router-dom';
import LoginPage from './login.page';

describe('Testing Home component', () => {

    test('title testing', () => {
        const history = createMemoryHistory()
        render(
            <Router location={history.location} navigator={history}>
                <LoginPage />
            </Router>
        );

        const title = screen.getByText(/Hi! EXAMER/i);
        expect(title).toBeInTheDocument();
    });


})