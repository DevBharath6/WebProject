import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Avatar, Grid, CircularProgress, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  margin: theme.spacing(2),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[3],
}));

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await api.get('/auth/me');
        setUserData(response.data);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load profile data');
        if (err.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box maxWidth="800px" mx="auto" py={4}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box maxWidth="800px" mx="auto" py={4}>
      <StyledPaper>
        <Box display="flex" alignItems="center" mb={4}>
          <Avatar
            sx={{
              width: 100,
              height: 100,
              bgcolor: 'primary.main',
              fontSize: '2rem',
            }}
          >
            {userData?.username?.charAt(0).toUpperCase()}
          </Avatar>
          <Box ml={3}>
            <Typography variant="h4" component="h1">
              {userData?.username}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {userData?.email}
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Account Information
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" color="textSecondary">
              Username
            </Typography>
            <Typography variant="body1">
              {userData?.username}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" color="textSecondary">
              Email
            </Typography>
            <Typography variant="body1">
              {userData?.email}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" color="textSecondary">
              Member Since
            </Typography>
            <Typography variant="body1">
              {new Date(userData?.registeredAt).toLocaleDateString()}
            </Typography>
          </Grid>
        </Grid>
      </StyledPaper>
    </Box>
  );
};

export default Profile;