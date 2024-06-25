// src/pages/SignUp.js

import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  CircularProgress,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [form, setForm] = useState({
    name: '',
    profileImage: '',
    phoneNumber: '',
    email: '',
    password: '',
    otp: '',
  });
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleOtpSend = async () => {
    try {
      setIsLoading(true);
      // Mock sending OTP
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsOtpSent(true);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Mock sign-up request
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate('/solution-providers');
    } catch (err) {
      setError('Sign-up failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Profile Image URL"
                name="profileImage"
                value={form.profileImage}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone Number"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            {isOtpSent && (
              <Grid item xs={12}>
                <TextField
                  label="OTP"
                  name="otp"
                  value={form.otp}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            {error && (
              <Grid item xs={12}>
                <Typography color="error">{error}</Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              {!isOtpSent ? (
                <Button
                  onClick={handleOtpSend}
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isLoading}
                >
                  {isLoading ? <CircularProgress size={24} /> : 'Send OTP'}
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isLoading}
                >
                  {isLoading ? <CircularProgress size={24} /> : 'Sign Up'}
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default SignUp;