import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Avatar,
  Button,
  Chip,
  Rating,
  Divider,
  Stack,
  Card,
  CardContent,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import {
  Close,
  Star,
  Work,
  LocationOn,
  Phone,
  Email,
  CheckCircle,
  Schedule,
  AttachMoney,
} from '@mui/icons-material';

interface TaskerProfile {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  completedTasks: number;
  joinedDate: string;
  location: string;
  phone?: string;
  email?: string;
  bio: string;
  skills: string[];
  hourlyRate: number;
  availability: string;
  responseTime: string;
  completionRate: number;
  reviews: Array<{
    id: string;
    rating: number;
    comment: string;
    author: string;
    date: string;
    taskType: string;
  }>;
}

interface TaskerProfileModalProps {
  open: boolean;
  onClose: () => void;
  tasker: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    reviewCount: number;
  } | null;
  onContact: (taskerId: string) => void;
  onAssign: (taskerId: string) => void;
}

// Mock detailed profile data
const getTaskerProfile = (taskerId: string): TaskerProfile => ({
  id: taskerId,
  name: 'John Smith',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  rating: 4.8,
  reviewCount: 127,
  completedTasks: 89,
  joinedDate: '2022-03-15',
  location: 'Seattle, WA',
  phone: '+1 (555) 123-4567',
  email: 'john.smith@email.com',
  bio: 'Professional plumber with over 10 years of experience. Specializing in residential and commercial plumbing repairs, installations, and maintenance. Licensed and insured.',
  skills: ['Plumbing', 'Pipe Repair', 'Water Heater Installation', 'Drain Cleaning', 'Emergency Repairs'],
  hourlyRate: 85,
  availability: 'Available weekdays 8AM-6PM',
  responseTime: 'Usually responds within 2 hours',
  completionRate: 96,
  reviews: [
    {
      id: '1',
      rating: 5,
      comment: 'Excellent work! Fixed our kitchen faucet quickly and professionally. Highly recommended!',
      author: 'Sarah M.',
      date: '2024-01-10',
      taskType: 'Plumbing Repair'
    },
    {
      id: '2',
      rating: 4,
      comment: 'Good service, arrived on time and completed the job efficiently.',
      author: 'Mike R.',
      date: '2024-01-05',
      taskType: 'Pipe Installation'
    },
    {
      id: '3',
      rating: 5,
      comment: 'Very knowledgeable and fair pricing. Will definitely hire again.',
      author: 'Lisa K.',
      date: '2023-12-28',
      taskType: 'Water Heater Repair'
    }
  ]
});

const TaskerProfileModal = ({ open, onClose, tasker: basicTasker, onContact, onAssign }: TaskerProfileModalProps) => {
  const tasker = basicTasker ? getTaskerProfile(basicTasker.id) : null;

  if (!tasker) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2, maxHeight: '90vh' }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Tasker Profile
          </Typography>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 0 }}>
        <Box sx={{ p: 3 }}>
          {/* Header Section */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3, mb: 3 }}>
            <Avatar 
              src={tasker.avatar} 
              alt={tasker.name}
              sx={{ width: 80, height: 80 }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                {tasker.name}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Rating value={tasker.rating} precision={0.1} size="small" readOnly />
                  <Typography variant="body2" color="text.secondary">
                    {tasker.rating} ({tasker.reviewCount} reviews)
                  </Typography>
                </Box>
                <Chip 
                  icon={<CheckCircle />} 
                  label={`${tasker.completedTasks} tasks completed`} 
                  size="small" 
                  color="success" 
                  variant="outlined" 
                />
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <LocationOn color="action" sx={{ fontSize: 18 }} />
                <Typography variant="body2" color="text.secondary">
                  {tasker.location}
                </Typography>
              </Box>

              <Typography variant="body2" color="text.secondary">
                Member since {new Date(tasker.joinedDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long' 
                })}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Stats Section */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, mb: 3 }}>
            <Card variant="outlined">
              <CardContent sx={{ textAlign: 'center', py: 2 }}>
                <AttachMoney color="primary" sx={{ fontSize: 32, mb: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  ${tasker.hourlyRate}/hr
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Hourly Rate
                </Typography>
              </CardContent>
            </Card>
            
            <Card variant="outlined">
              <CardContent sx={{ textAlign: 'center', py: 2 }}>
                <CheckCircle color="success" sx={{ fontSize: 32, mb: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {tasker.completionRate}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Completion Rate
                </Typography>
              </CardContent>
            </Card>
            
            <Card variant="outlined">
              <CardContent sx={{ textAlign: 'center', py: 2 }}>
                <Schedule color="info" sx={{ fontSize: 32, mb: 1 }} />
                <Typography variant="body2" sx={{ fontWeight: 600, textAlign: 'center' }}>
                  {tasker.responseTime}
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Bio Section */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              About
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.6, color: 'text.secondary' }}>
              {tasker.bio}
            </Typography>
          </Box>

          {/* Skills Section */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Skills & Services
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {tasker.skills.map((skill) => (
                <Chip key={skill} label={skill} variant="outlined" />
              ))}
            </Box>
          </Box>

          {/* Availability Section */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Availability
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {tasker.availability}
            </Typography>
          </Box>

          {/* Contact Info Section */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Contact Information
            </Typography>
            <Stack spacing={1}>
              {tasker.phone && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Phone color="action" sx={{ fontSize: 18 }} />
                  <Typography variant="body2">{tasker.phone}</Typography>
                </Box>
              )}
              {tasker.email && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Email color="action" sx={{ fontSize: 18 }} />
                  <Typography variant="body2">{tasker.email}</Typography>
                </Box>
              )}
            </Stack>
          </Box>

          {/* Reviews Section */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Recent Reviews
            </Typography>
            <Stack spacing={2}>
              {tasker.reviews.slice(0, 3).map((review) => (
                <Card key={review.id} variant="outlined">
                  <CardContent sx={{ py: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Rating value={review.rating} size="small" readOnly />
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {review.author}
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(review.date).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ mb: 1, lineHeight: 1.5 }}>
                      "{review.comment}"
                    </Typography>
                    <Chip label={review.taskType} size="small" variant="outlined" />
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, gap: 1 }}>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
        <Button 
          onClick={() => onContact(tasker.id)} 
          variant="outlined"
          startIcon={<Email />}
        >
          Contact
        </Button>
        <Button 
          onClick={() => onAssign(tasker.id)} 
          variant="contained"
          startIcon={<CheckCircle />}
        >
          Assign Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskerProfileModal;