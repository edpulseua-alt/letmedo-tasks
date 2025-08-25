import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  Stack,
  Chip,
  Rating,
  Divider,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Chat,
  Person,
  Star,
  CheckCircle,
} from '@mui/icons-material';
import TaskerProfileModal from './TaskerProfileModal';
import TaskerChatModal from './TaskerChatModal';
import TaskAssignmentModal from './TaskAssignmentModal';

interface Tasker {
  id: string;
  name: string;
  avatar: string;
  message: string;
  rating: number;
  reviewCount: number;
  status: 'interested' | 'selected' | 'contacted';
  responseTime: string;
}

interface TaskBiddersProps {
  taskId: string;
  taskers: Tasker[];
  taskTitle: string;
  taskBudget: number;
  taskLocation: string;
  taskUrgent?: boolean;
}

// Mock data for taskers/bidders
const mockTaskers: Tasker[] = [
  {
    id: '1',
    name: 'John Smith',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    message: 'I have 5+ years experience in plumbing. Available this weekend.',
    rating: 4.8,
    reviewCount: 127,
    status: 'interested',
    responseTime: '2 hours ago'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    message: 'Professional plumber with same-day service. Free estimates!',
    rating: 4.9,
    reviewCount: 89,
    status: 'selected',
    responseTime: '1 hour ago'
  },
  {
    id: '3',
    name: 'Mike Wilson',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    message: 'Quick and reliable service. Can fix it today!',
    rating: 4.6,
    reviewCount: 203,
    status: 'contacted',
    responseTime: '4 hours ago'
  }
];

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'selected':
      return { label: 'Selected', color: 'success' as const, icon: <CheckCircle sx={{ fontSize: 16 }} /> };
    case 'contacted':
      return { label: 'Contacted', color: 'info' as const, icon: <Chat sx={{ fontSize: 16 }} /> };
    default:
      return { label: 'Interested', color: 'default' as const, icon: <Person sx={{ fontSize: 16 }} /> };
  }
};

const TaskBidders = ({ 
  taskId, 
  taskers = mockTaskers, 
  taskTitle = "Sample Task",
  taskBudget = 150,
  taskLocation = "Seattle, WA",
  taskUrgent = false
}: TaskBiddersProps) => {
  const [profileModalOpen, setProfileModalOpen] = React.useState(false);
  const [chatModalOpen, setChatModalOpen] = React.useState(false);
  const [assignmentModalOpen, setAssignmentModalOpen] = React.useState(false);
  const [selectedTasker, setSelectedTasker] = React.useState<Tasker | null>(null);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<'success' | 'error' | 'info'>('success');

  const showSnackbar = (message: string, severity: 'success' | 'error' | 'info' = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleViewProfile = (taskerId: string) => {
    const tasker = taskers.find(t => t.id === taskerId);
    if (tasker) {
      setSelectedTasker(tasker);
      setProfileModalOpen(true);
    }
  };

  const handleContact = (taskerId: string) => {
    const tasker = taskers.find(t => t.id === taskerId);
    if (tasker) {
      setSelectedTasker(tasker);
      setChatModalOpen(true);
    }
  };

  const handleAssign = (taskerId: string) => {
    const tasker = taskers.find(t => t.id === taskerId);
    if (tasker) {
      setSelectedTasker(tasker);
      setAssignmentModalOpen(true);
    }
  };

  const handleSendMessage = (message: string) => {
    console.log('Sending message:', message);
    showSnackbar('Message sent successfully!');
  };

  const handleConfirmAssignment = (assignmentData: any) => {
    console.log('Assignment confirmed:', assignmentData);
    showSnackbar(`Task successfully assigned to ${selectedTasker?.name}!`);
    setAssignmentModalOpen(false);
    
    // Here you would typically update the task status and notify the backend
    // For demo purposes, we'll just show a success message
  };

  const handleCloseModals = () => {
    setProfileModalOpen(false);
    setChatModalOpen(false);
    setAssignmentModalOpen(false);
    setSelectedTasker(null);
  };

  return (
    <Stack spacing={2}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Person color="primary" />
          Interested Taskers ({taskers.length})
        </Typography>
      </Box>

      <Stack spacing={2}>
        {taskers.map((tasker, index) => {
          const statusConfig = getStatusConfig(tasker.status);
          
          return (
            <Card key={tasker.id} variant="outlined" sx={{ transition: 'all 0.2s', '&:hover': { boxShadow: 2 } }}>
              <CardContent sx={{ p: 2 }}>
                <Stack spacing={2}>
                  {/* Tasker Header */}
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Avatar 
                      src={tasker.avatar} 
                      alt={tasker.name}
                      sx={{ width: 48, height: 48 }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {tasker.name}
                        </Typography>
                        <Chip
                          label={statusConfig.label}
                          color={statusConfig.color}
                          size="small"
                          icon={statusConfig.icon}
                          variant="outlined"
                        />
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Rating value={tasker.rating} precision={0.1} size="small" readOnly />
                        <Typography variant="body2" color="text.secondary">
                          {tasker.rating} ({tasker.reviewCount} reviews)
                        </Typography>
                      </Box>
                      
                      <Typography variant="caption" color="text.secondary">
                        Responded {tasker.responseTime}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Message */}
                  <Box 
                    sx={{ 
                      bgcolor: 'grey.50', 
                      borderRadius: 2, 
                      p: 2,
                      border: '1px solid',
                      borderColor: 'grey.200'
                    }}
                  >
                    <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                      "{tasker.message}"
                    </Typography>
                  </Box>

                  {/* Actions */}
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Person />}
                      onClick={() => handleViewProfile(tasker.id)}
                    >
                      View Profile
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Chat />}
                      onClick={() => handleContact(tasker.id)}
                    >
                      Contact
                    </Button>
                    {tasker.status === 'interested' && (
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<CheckCircle />}
                        onClick={() => handleAssign(tasker.id)}
                      >
                        Assign Task
                      </Button>
                    )}
                  </Box>
                </Stack>
              </CardContent>
              {index < taskers.length - 1 && <Divider />}
            </Card>
          );
        })}
      </Stack>

      {taskers.length === 0 && (
        <Card variant="outlined">
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <Person sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="body1" color="text.secondary">
              No taskers have shown interest in this task yet.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Share your task to get more responses!
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* Modals */}
      <TaskerProfileModal
        open={profileModalOpen}
        onClose={handleCloseModals}
        tasker={selectedTasker}
        onContact={handleContact}
        onAssign={handleAssign}
      />

      <TaskerChatModal
        open={chatModalOpen}
        onClose={handleCloseModals}
        tasker={selectedTasker}
        taskTitle={taskTitle}
        onSendMessage={handleSendMessage}
      />

      <TaskAssignmentModal
        open={assignmentModalOpen}
        onClose={handleCloseModals}
        tasker={selectedTasker}
        task={{
          id: taskId,
          title: taskTitle,
          budget: taskBudget,
          location: taskLocation,
          urgent: taskUrgent
        }}
        onConfirmAssignment={handleConfirmAssignment}
      />

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity={snackbarSeverity}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default TaskBidders;