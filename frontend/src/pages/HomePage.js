// src/pages/HomePage.js

import React from 'react';
import { Button, Container, Grid, Typography, Box, AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const problems = [
    'Physical Harassment',
    'Mental Harassment',
    'Workplace Discrimination',
    'Domestic Violence',
    'Cyber Bullying',
    'Emotional Abuse',
    'Sexual Harassment',
    'Financial Abuse',
    'Reproductive Coercion',
    'Stalking',
    'Dating Violence',
    'Human Trafficking',
    'Forced Marriage',
    'Child Marriage',
    'Female Genital Mutilation',
    'Dowry-Related Violence',
    'Honor-Based Violence',
    'Eve-Teasing',
    'Intimate Partner Violence',
    'Rape and Sexual Assault',
  ];

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Women's Problem-Solving Portal
          </Typography>
          <Button color="inherit" component={Link} to="/solution-providers">
            Solution Providers
          </Button>
        </Toolbar>
      </AppBar>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Common Problems Faced by Women
        </Typography>
        <Grid container spacing={2}>
          {problems.map((problem, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ textTransform: 'none' }}
                component={Link}
                to="/submit-problem"
              >
                {problem}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default HomePage;
