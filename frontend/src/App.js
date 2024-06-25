// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProblemSubmissionPage from './pages/ProblemSubmissionPage';
import SolutionProvidersHomePage from './pages/SolutionProvidersHomePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/submit-problem" element={<ProblemSubmissionPage />} />
        <Route path="/solution-providers" element={<SolutionProvidersHomePage />} />
        <Route path="/solution-providers/sign-in" element={<div>Sign In Page</div>} />
        <Route path="/solution-providers/sign-up" element={<div>Sign Up Page</div>} />
        <Route path="/solution-providers/problem" element={<div>Problem Page</div>} />
      </Routes>
    </Router>
  );
};

export default App;
