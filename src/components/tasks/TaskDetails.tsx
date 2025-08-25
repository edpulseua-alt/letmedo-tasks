import React from 'react';
import {
  Box,
  Typography,
  Button,
  Chip,
  Stack,
  Checkbox,
  FormControlLabel,
  Divider,
} from '@mui/material';
import {
  LocationOn,
  CalendarToday,
  AttachMoney,
  Edit,
  PriorityHigh,
} from '@mui/icons-material';

interface Task {
  id: string;
  title: string;
  location: string;
  date: string;
  status: 'open' | 'assigned' | 'completed' | 'pending';
  budget: number;
  urgent?: boolean;
  description: string;
  images?: string[];
}

interface TaskDetailsProps {
  task: Task;
}

const statusConfig = {
  open: { label: 'Open', color: 'success' as const },
  assigned: { label: 'Assigned', color: 'warning' as const },
  completed: { label: 'Completed', color: 'info' as const },
  pending: { label: 'Pending', color: 'error' as const }
};

const TaskDetails = ({ task }: TaskDetailsProps) => {
  const statusInfo = statusConfig[task.status];

  return (
    <Stack spacing={3}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 1 }}>
            {task.title}
          </Typography>
          <Chip 
            label={statusInfo.label}
            color={statusInfo.color}
            variant="outlined"
            sx={{ fontWeight: 500 }}
          />
        </Box>
        <Button
          variant="contained"
          startIcon={<Edit />}
          sx={{ ml: 2 }}
        >
          Change
        </Button>
      </Box>

      <Divider />

      {/* Task Info Grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <CalendarToday color="primary" />
            <Box>
              <Typography variant="body2" color="text.secondary">
                Date
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {new Date(task.date).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <LocationOn color="primary" />
            <Box>
              <Typography variant="body2" color="text.secondary">
                Location
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {task.location}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <AttachMoney color="primary" />
            <Box>
              <Typography variant="body2" color="text.secondary">
                Budget
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                ${task.budget}
              </Typography>
            </Box>
          </Box>
        </Stack>

        <Box>
          <FormControlLabel
            control={
              <Checkbox 
                checked={task.urgent} 
                disabled
                color="error"
              />
            }
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  This is urgent
                </Typography>
                {task.urgent && (
                  <PriorityHigh color="error" sx={{ fontSize: '1rem' }} />
                )}
              </Box>
            }
          />
        </Box>
      </Box>

      <Divider />

      {/* Description */}
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Details
        </Typography>
        <Box 
          sx={{ 
            bgcolor: 'grey.50', 
            borderRadius: 2, 
            p: 2,
            border: '1px solid',
            borderColor: 'grey.200'
          }}
        >
          <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
            {task.description}
          </Typography>
        </Box>
      </Box>

      {/* Images Section */}
      {task.images && task.images.length > 0 && (
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Attachments
          </Typography>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, 
            gap: 1 
          }}>
            {task.images.map((image, index) => (
              <Box
                key={index}
                sx={{
                  aspectRatio: '1',
                  bgcolor: 'grey.100',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'grey.300',
                  overflow: 'hidden'
                }}
              >
                <img 
                  src={image} 
                  alt={`Task attachment ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Stack>
  );
};

export default TaskDetails;