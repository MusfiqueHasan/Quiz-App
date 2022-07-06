import React from 'react';
import { createMemoryHistory } from "history"
import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import Home from '../components/pages/Home';
import { Router } from 'react-router-dom';

describe('Testing Home component', () => {

    test('title testing', () => {
        const history = createMemoryHistory()
        render(
            <Router location={history.location} navigator={history}>
                <Home />
            </Router>
        );

        const title = screen.getByText(/get your weather information/i);
        expect(title).toBeInTheDocument();
    });

    test('input placeholder testing', () => {
        const history = createMemoryHistory()
        render(
            <Router location={history.location} navigator={history}>
                <Home />
            </Router>
        );

        const placeholder: any = screen.queryByPlaceholderText("Enter country");
        expect(placeholder).toBeInTheDocument();
    });

    test('button disable testing', () => {
        const history = createMemoryHistory()
        render(
            <Router location={history.location} navigator={history}>
                <Home />
            </Router>
        )

        const button = screen.queryByTestId("button");
        expect(button).toBeDisabled();

    });

    test('button enable testing', async () => {
        const user = UserEvent.setup()
        const history = createMemoryHistory()
        render(
            <Router location={history.location} navigator={history}>
                <Home />
            </Router>
        )

        const inputField: any = screen.getByRole('textbox');
        await user.type(inputField, 'Bangladesh')
        const button = screen.queryByTestId("button");
        expect(button).toBeEnabled();

    });

    test('update on change testing', async () => {
        const user = UserEvent.setup()
        const history = createMemoryHistory()
        render(
            <Router location={history.location} navigator={history}>
                <Home />
            </Router>
        )

        const inputField: any = screen.getByRole('textbox');
        await user.type(inputField, 'Bangladesh')
        expect(inputField.value).toBe("Bangladesh")
    });


    test('country details routing testing', async () => {
        const user = UserEvent.setup()
        const history = createMemoryHistory({ initialEntries: ['/'] });

        render(
            <Router location={history.location} navigator={history}>
                <Home />
            </Router>
        );

        const inputField: any = screen.getByRole('textbox');
        await user.type(inputField, 'Bangladesh')
        expect(history.location.pathname).toBe('/');

        const button: any = screen.getByRole('button', { name: /submit/i });
        await user.click(button);
        expect(history.location.pathname).toBe('/country/Bangladesh');

    });
})