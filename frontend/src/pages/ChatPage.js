// src/pages/ChatPage.js

import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Button,
  Divider,
} from '@mui/material';

const ChatPage = () => {
  const [solutions, setSolutions] = useState([]);
  const [selectedSolution, setSelectedSolution] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Fetch the list of solutions sent to women after filtration
    const fetchSolutions = async () => {
      const solutions = [
        { id: 1, title: 'Solution 1', content: 'Content of Solution 1' },
        { id: 2, title: 'Solution 2', content: 'Content of Solution 2' },
      ];
      setSolutions(solutions);
    };

    fetchSolutions();
  }, []);

  const handleSolutionSelect = async (solution) => {
    setSelectedSolution(solution);
    // Fetch chat messages for the selected solution
    const messages = [
      { id: 1, sender: 'provider', content: 'Guidance message 1' },
      { id: 2, sender: 'woman', content: 'Question from woman' },
    ];
    setMessages(messages);
  };

  const handleSendMessage = () => {
    const newMessageObj = {
      id: messages.length + 1,
      sender: 'provider',
      content: newMessage,
    };
    setMessages([...messages, newMessageObj]);
    setNewMessage('');
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Solution Provider Chat
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Paper>
              <List>
                {solutions.map((solution) => (
                  <ListItem
                    button
                    key={solution.id}
                    onClick={() => handleSolutionSelect(solution)}
                  >
                    <ListItemText primary={solution.title} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={9}>
            {selectedSolution && (
              <Paper>
                <Box p={2} style={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: 'white' }}>
                  <Typography variant="h6">{selectedSolution.title}</Typography>
                  <Typography>{selectedSolution.content}</Typography>
                </Box>
                <Divider />
                <Box p={2} style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                  <List>
                    {messages.map((message) => (
                      <ListItem key={message.id} alignItems="flex-start">
                        <ListItemText
                          primary={message.content}
                          secondary={message.sender === 'provider' ? 'You' : 'Woman'}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
                <Divider />
                <Box p={2}>
                  <TextField
                    label="Type your message"
                    multiline
                    rows={2}
                    fullWidth
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    margin="normal"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSendMessage}
                  >
                    Send
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

export default ChatPage;
