import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  Stack,
} from '@mui/material';
import {
  CheckCircle,
  LocationOn,
  Bolt,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
}));

const HeroSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  textAlign: 'center',
}));

const FeatureSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  background: 'linear-gradient(135deg, rgba(224, 247, 250, 0.3), rgba(14, 165, 233, 0.05))',
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.2s ease-in-out',
  background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 32px rgba(14, 165, 233, 0.15)',
  },
}));

const FeatureIcon = styled(Box)(({ theme }) => ({
  width: 48,
  height: 48,
  backgroundColor: theme.palette.primary.main,
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
}));

const CTASection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  textAlign: 'center',
}));

const CTACard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
  padding: theme.spacing(6),
  boxShadow: '0 8px 32px rgba(14, 165, 233, 0.15)',
}));

const Index = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header */}
      <StyledAppBar position="static" elevation={0}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <Box>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'white' }}>
                LetMeDo
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                Your trusted platform for local task management
              </Typography>
            </Box>
            <Link to="/my-tasks" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: 'grey.100',
                  },
                }}
              >
                View My Tasks
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </StyledAppBar>

      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="md">
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontWeight: 'bold',
              mb: 3,
              background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Get Things Done, Effortlessly
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: '600px', mx: 'auto', lineHeight: 1.6 }}
          >
            Connect with skilled professionals in your area. Post tasks, browse opportunities,
            and manage everything from one beautiful dashboard.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Link to="/my-tasks" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #0284c7, #0891b2)',
                  },
                }}
              >
                Manage Tasks
              </Button>
            </Link>
            <Button variant="outlined" size="large">
              Find Work
            </Button>
          </Stack>
        </Container>
      </HeroSection>

      {/* Features */}
      <FeatureSection>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h3" sx={{ textAlign: 'center', mb: 6, fontWeight: 'bold' }}>
            Why Choose LetMeDo?
          </Typography>
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 4,
          }}>
            <FeatureCard>
              <CardContent sx={{ p: 3 }}>
                <FeatureIcon>
                  <LocationOn sx={{ color: 'white', fontSize: 24 }} />
                </FeatureIcon>
                <Typography variant="h5" component="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Local Connections
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  Find trusted professionals and opportunities right in your neighborhood with our location-based matching.
                </Typography>
              </CardContent>
            </FeatureCard>

            <FeatureCard>
              <CardContent sx={{ p: 3 }}>
                <FeatureIcon>
                  <CheckCircle sx={{ color: 'white', fontSize: 24 }} />
                </FeatureIcon>
                <Typography variant="h5" component="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Smart Task Management
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  Organize, track, and manage all your tasks with powerful filtering, search, and status tracking.
                </Typography>
              </CardContent>
            </FeatureCard>

            <FeatureCard>
              <CardContent sx={{ p: 3 }}>
                <FeatureIcon>
                  <Bolt sx={{ color: 'white', fontSize: 24 }} />
                </FeatureIcon>
                <Typography variant="h5" component="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Quick & Reliable
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  Get matched with qualified professionals quickly and manage everything through our intuitive interface.
                </Typography>
              </CardContent>
            </FeatureCard>
          </Box>
        </Container>
      </FeatureSection>

      {/* CTA Section */}
      <CTASection>
        <Container maxWidth="md">
          <CTACard>
            <Typography variant="h3" component="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
              Ready to Get Started?
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
              Join thousands of users who trust LetMeDo for their task management needs.
            </Typography>
            <Link to="/my-tasks" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #0284c7, #0891b2)',
                  },
                }}
              >
                Start Managing Tasks
              </Button>
            </Link>
          </CTACard>
        </Container>
      </CTASection>

      {/* Footer */}
      <Box sx={{ bgcolor: 'grey.50', py: 4, mt: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
            © 2024 LetMeDo. Built with care for local communities.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Index;