import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Container,
  Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const ErrorIcon = styled(Box)(({ theme }) => ({
  width: 96,
  height: 96,
  background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  marginBottom: theme.spacing(4),
}));

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      bgcolor: 'background.default'
    }}>
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center', px: 3 }}>
          <ErrorIcon>
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'white' }}>
              404
            </Typography>
          </ErrorIcon>
          
          <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
            Page Not Found
          </Typography>
          
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
            Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </Typography>
          
          <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} justifyContent="center">
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #0284c7, #0891b2)',
                  },
                  minWidth: '200px',
                }}
              >
                Return to Homepage
              </Button>
            </Link>
            <Link to="/my-tasks" style={{ textDecoration: 'none' }}>
              <Button
                variant="outlined"
                size="large"
                sx={{ minWidth: '200px' }}
              >
                View My Tasks
              </Button>
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default NotFound;