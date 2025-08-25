import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Alert,
  Divider,
  Stack,
  Card,
  CardContent,
  Chip,
  Rating,
} from '@mui/material';
import {
  Close,
  CheckCircle,
  Warning,
  Schedule,
  AttachMoney,
  Star,
} from '@mui/icons-material';

interface TaskAssignmentModalProps {
  open: boolean;
  onClose: () => void;
  tasker: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    reviewCount: number;
    responseTime: string;
  } | null;
  task: {
    id: string;
    title: string;
    budget: number;
    location: string;
    urgent?: boolean;
  } | null;
  onConfirmAssignment: (assignmentData: {
    taskerId: string;
    message?: string;
    agreedBudget: number;
    deadline?: string;
    terms: boolean;
  }) => void;
}

const TaskAssignmentModal = ({ 
  open, 
  onClose, 
  tasker, 
  task, 
  onConfirmAssignment 
}: TaskAssignmentModalProps) => {
  const [message, setMessage] = useState('');
  const [agreedBudget, setAgreedBudget] = useState(task?.budget || 0);
  const [deadline, setDeadline] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirmAssignment = async () => {
    if (!tasker || !task || !acceptTerms) return;

    setIsSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      onConfirmAssignment({
        taskerId: tasker.id,
        message: message.trim() || undefined,
        agreedBudget,
        deadline: deadline || undefined,
        terms: acceptTerms
      });

      // Reset form
      setMessage('');
      setAgreedBudget(task.budget);
      setDeadline('');
      setAcceptTerms(false);
      
      onClose();
    } catch (error) {
      console.error('Assignment failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  if (!tasker || !task) return null;

  const budgetDifference = agreedBudget - task.budget;
  const budgetStatus = budgetDifference > 0 ? 'higher' : budgetDifference < 0 ? 'lower' : 'same';

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle sx={{ pb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <CheckCircle color="primary" sx={{ fontSize: 28 }} />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Assign Task
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Confirm task assignment details
            </Typography>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={3}>
          {/* Tasker Summary */}
          <Card variant="outlined">
            <CardContent sx={{ py: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar 
                  src={tasker.avatar} 
                  alt={tasker.name}
                  sx={{ width: 48, height: 48 }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {tasker.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Rating value={tasker.rating} precision={0.1} size="small" readOnly />
                    <Typography variant="body2" color="text.secondary">
                      {tasker.rating} ({tasker.reviewCount} reviews)
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {tasker.responseTime}
                  </Typography>
                </Box>
                <Chip 
                  label="Selected" 
                  color="success" 
                  icon={<CheckCircle />}
                  variant="outlined"
                />
              </Box>
            </CardContent>
          </Card>

          {/* Task Summary */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Task Details
            </Typography>
            <Box sx={{ pl: 2, borderLeft: '3px solid', borderColor: 'primary.main' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                {task.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                📍 {task.location}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  💰 Original Budget: ${task.budget}
                </Typography>
                {task.urgent && (
                  <Chip 
                    label="Urgent" 
                    color="error" 
                    size="small" 
                    icon={<Warning />}
                  />
                )}
              </Box>
            </Box>
          </Box>

          <Divider />

          {/* Assignment Details */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Assignment Details
            </Typography>
            
            {/* Budget */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Agreed Budget
              </Typography>
              <TextField
                type="number"
                value={agreedBudget}
                onChange={(e) => setAgreedBudget(Number(e.target.value))}
                InputProps={{
                  startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>
                }}
                helperText={
                  budgetStatus !== 'same' && (
                    <Box component="span" sx={{ 
                      color: budgetStatus === 'higher' ? 'warning.main' : 'success.main',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5
                    }}>
                      {budgetStatus === 'higher' ? '⬆️' : '⬇️'}
                      ${Math.abs(budgetDifference)} {budgetStatus} than original budget
                    </Box>
                  )
                }
                fullWidth
              />
            </Box>

            {/* Deadline */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Expected Completion Date (Optional)
              </Typography>
              <TextField
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
                inputProps={{
                  min: new Date().toISOString().split('T')[0]
                }}
              />
            </Box>

            {/* Message */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Message to Tasker (Optional)
              </Typography>
              <TextField
                multiline
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Add any specific instructions or requirements..."
                fullWidth
              />
            </Box>
          </Box>

          {/* Important Notice */}
          <Alert severity="info" icon={<Schedule />}>
            <Typography variant="body2">
              <strong>Assignment Process:</strong>
              <br />
              1. The tasker will be notified immediately
              <br />
              2. You can communicate through the chat system
              <br />
              3. Payment will be held securely until task completion
            </Typography>
          </Alert>

          {/* Terms */}
          <FormControlLabel
            control={
              <Checkbox 
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                color="primary"
              />
            }
            label={
              <Typography variant="body2">
                I agree to the{' '}
                <Button 
                  variant="text" 
                  size="small" 
                  sx={{ p: 0, textDecoration: 'underline', minWidth: 'auto' }}
                >
                  terms and conditions
                </Button>
                {' '}and confirm this task assignment
              </Typography>
            }
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 3, gap: 1 }}>
        <Button 
          onClick={handleClose} 
          variant="outlined"
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleConfirmAssignment}
          variant="contained"
          disabled={!acceptTerms || isSubmitting}
          startIcon={isSubmitting ? <Schedule /> : <CheckCircle />}
          sx={{ minWidth: 120 }}
        >
          {isSubmitting ? 'Assigning...' : 'Confirm Assignment'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskAssignmentModal;