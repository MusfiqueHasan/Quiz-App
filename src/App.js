import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/private-route.component';
import UnAuthenticatedRoute from './components/unauthenticated-route.component';
import EnterQuiz from './pages/enter-quiz-page/enter-quiz.page';
import LoginPage from './pages/login-page/login.page';
import QuestionPage from './pages/question-page/question.page';
import ResultPage from './pages/result-page/result.page';

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<UnAuthenticatedRoute>
          <LoginPage />
        </UnAuthenticatedRoute>} />
      <Route
        path="/new-quiz"
        element={<PrivateRoute>
          <EnterQuiz />
        </PrivateRoute>} />

      <Route
        path="/question/:id"
        element={<PrivateRoute>
          <QuestionPage />
        </PrivateRoute>} />

      <Route
        path="/result"
        element={<PrivateRoute>
          <ResultPage />
        </PrivateRoute>} />
    </Routes>
  );
}

export default App;
