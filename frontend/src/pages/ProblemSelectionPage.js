// src/pages/ProblemSelectionPage.js

import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  Paper,
  IconButton,
  Divider,
  useMediaQuery,
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ReportIcon from '@mui/icons-material/Report';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';

const ProblemSelectionPage = () => {
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [solutions, setSolutions] = useState([]);
  const [newSolution, setNewSolution] = useState('');
  const [userId] = useState(1); // Mock user ID for demonstration

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    // Fetch the list of problems
    const fetchProblems = async () => {
      // Mock fetching problems
      const problems = [
        { id: 1, title: 'Problem 1', description: 'Description of Problem 1' },
        { id: 2, title: 'Problem 2', description: 'Description of Problem 2' },
      ];
      setProblems(problems);
    };

    fetchProblems();
  }, []);

  const handleProblemSelect = async (problem) => {
    setSelectedProblem(problem);
    // Fetch solutions for the selected problem
    const solutions = [
      { id: 1, userId: 2, content: 'Solution 1', likes: 5, dislikes: 2, reports: 0 },
      { id: 2, userId: 3, content: 'Solution 2', likes: 10, dislikes: 1, reports: 1 },
    ];
    setSolutions(solutions);
  };

  const handleSolutionSubmit = async () => {
    const newSolutionObj = {
      id: solutions.length + 1,
      userId: userId,
      content: newSolution,
      likes: 0,
      dislikes: 0,
      reports: 0,
    };
    setSolutions([...solutions, newSolutionObj]);
    setNewSolution('');
  };

  const handleLike = (solutionId) => {
    setSolutions(
      solutions.map((sol) =>
        sol.id === solutionId && sol.userId !== userId
          ? { ...sol, likes: sol.likes + 1 }
          : sol
      )
    );
  };

  const handleDislike = (solutionId) => {
    setSolutions(
      solutions.map((sol) =>
        sol.id === solutionId && sol.userId !== userId
          ? { ...sol, dislikes: sol.dislikes + 1 }
          : sol
      )
    );
  };

  const handleReport = (solutionId) => {
    const updatedSolutions = solutions.map((sol) =>
      sol.id === solutionId ? { ...sol, reports: sol.reports + 1 } : sol
    );

    setSolutions(updatedSolutions);

    // Automatically delete solutions with over 10 reports
    const filteredSolutions = updatedSolutions.filter(
      (sol) => sol.reports <= 10
    );
    setSolutions(filteredSolutions);
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Solution Providers
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <Paper>
              <List>
                {problems.map((problem) => (
                  <ListItem
                    button
                    key={problem.id}
                    onClick={() => handleProblemSelect(problem)}
                  >
                    <ListItemText primary={problem.title} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={9}>
            {selectedProblem && (
              <Paper>
                <Box p={2} style={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: 'white' }}>
                  <Typography variant="h6">{selectedProblem.title}</Typography>
                  <Typography>{selectedProblem.description}</Typography>
                </Box>
                <Divider />
                <Box p={2} style={{ maxHeight: isMobile ? '50vh' : '60vh', overflowY: 'auto' }}>
                  <Typography variant="h6">Discussion</Typography>
                  <List>
                    {solutions.map((solution) => (
                      <ListItem key={solution.id} alignItems="flex-start">
                        <ListItemText primary={solution.content} />
                        <IconButton
                          onClick={() => handleLike(solution.id)}
                          disabled={solution.userId === userId}
                        >
                          <ThumbUpIcon />
                        </IconButton>
                        <Typography>{solution.likes}</Typography>
                        <IconButton
                          onClick={() => handleDislike(solution.id)}
                          disabled={solution.userId === userId}
                        >
                          <ThumbDownIcon />
                        </IconButton>
                        <Typography>{solution.dislikes}</Typography>
                        <IconButton onClick={() => handleReport(solution.id)}>
                          <ReportIcon />
                        </IconButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
                <Divider />
                <Box p={2}>
                  <TextField
                    label="Add your solution"
                    multiline
                    rows={isMobile ? 3 : 4}
                    fullWidth
                    value={newSolution}
                    onChange={(e) => setNewSolution(e.target.value)}
                    margin="normal"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSolutionSubmit}
                  >
                    Submit Solution
                  </Button>
                </Box>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ProblemSelectionPage;
