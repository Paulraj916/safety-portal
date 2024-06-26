// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProblemSubmissionPage from './pages/ProblemSubmissionPage';
import SolutionProvidersHomePage from './pages/SolutionProvidersHomePage';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import ProblemSelectionPage from './pages/ProblemSelectionPage';
import ChatPage from './pages/ChatPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/submit-problem" element={<ProblemSubmissionPage />} />
        <Route path="/solution-providers" element={<SolutionProvidersHomePage />} />
        <Route path="/solution-providers/sign-in" element={<SignIn />} />
        <Route path="/solution-providers/sign-up" element={<SignUp />} />
        <Route path="/solution-providers/problem" element={<ProblemSelectionPage />} />
        <Route path="/solution-providers/chat" element={<ChatPage />} />
      </Routes>
    </Router>
  );
};

export default App;
