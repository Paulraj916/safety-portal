// src/pages/ProblemSubmissionPage.js

import React, { useState } from 'react';
import {
  Container,
  Grid,
  TextField,
  Button,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Delete, Add } from '@mui/icons-material';
import { nanoid } from 'nanoid';

const ProblemSubmissionPage = () => {
  const [chatCode, setChatCode] = useState('');
  const [problems, setProblems] = useState([]);
  const [solutions, setSolutions] = useState({});
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newProblem, setNewProblem] = useState('');

  const generateChatCode = () => {
    setChatCode(nanoid(16));
  };

  const addProblem = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleProblemSubmit = () => {
    if (!containsPersonalData(newProblem)) {
      const problemId = nanoid(16);
      setProblems([...problems, { id: problemId, text: newProblem, solutions: [] }]);
      setNewProblem('');
      setDialogOpen(false);
    } else {
      alert('Problem description contains personal data!');
    }
  };

  const deleteProblem = (id) => {
    setProblems(problems.filter((problem) => problem.id !== id));
  };

  const containsPersonalData = (text) => {
    const personalDataPattern = /(name|phone|place)/i;
    return personalDataPattern.test(text);
  };

  return (
    <Container>
      <Grid container spacing={2}>
        {/* Column 1 */}
        <Grid item xs={12} md={3}>
          <Box mb={2}>
            <TextField
              label="Chat Code"
              value={chatCode}
              onChange={(e) => setChatCode(e.target.value)}
              fullWidth
            />
            <Button onClick={generateChatCode} variant="contained" fullWidth sx={{ mt: 1 }}>
              Generate Code
            </Button>
          </Box>
          <Box mb={2}>
            <Button onClick={addProblem} variant="contained" startIcon={<Add />} fullWidth>
              Add+
            </Button>
          </Box>
          <List>
            {problems.map((problem, index) => (
              <ListItem
                key={problem.id}
                button
                onClick={() => setSelectedProblem(problem.id)}
                selected={selectedProblem === problem.id}
              >
                <ListItemText primary={`Problem ${index + 1}`} />
                <Badge badgeContent={problem.solutions.length} color="primary">
                  <IconButton onClick={() => deleteProblem(problem.id)} edge="end">
                    <Delete />
                  </IconButton>
                </Badge>
              </ListItem>
            ))}
          </List>
        </Grid>

        {/* Column 2 */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6">Solutions</Typography>
          <List>
            {selectedProblem &&
              problems
                .find((problem) => problem.id === selectedProblem)
                .solutions.map((solution, index) => (
                  <ListItem key={index} button>
                    <ListItemText primary={solution} />
                  </ListItem>
                ))}
          </List>
        </Grid>

        {/* Column 3 */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Detailed Solution</Typography>
          {selectedProblem && (
            <Box>
              <Typography variant="body1">
                {problems.find((problem) => problem.id === selectedProblem).text}
              </Typography>
              <TextField
                label="Type your message"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                sx={{ mt: 2 }}
              />
              <Button variant="contained" sx={{ mt: 1 }}>
                Send
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>

      {/* Problem Submission Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>Add a New Problem</DialogTitle>
        <DialogContent dividers>
          <TextField
            label="Problem Description"
            value={newProblem}
            onChange={(e) => setNewProblem(e.target.value)}
            fullWidth
            multiline
            rows={10}
            sx={{ overflow: 'auto' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleProblemSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProblemSubmissionPage;
