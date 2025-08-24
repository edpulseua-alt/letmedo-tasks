import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Stack,
} from '@mui/material';
import {
  LocationOn,
  CalendarToday,
  AttachMoney,
  PriorityHigh,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

interface Task {
  id: string;
  title: string;
  location: string;
  date: string;
  status: 'open' | 'assigned' | 'completed' | 'pending';
  budget: number;
  urgent?: boolean;
}

interface TaskCardProps {
  task: Task;
  isSelected: boolean;
  onClick: () => void;
}

const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'isSelected',
})<{ isSelected: boolean }>(({ theme, isSelected }) => ({
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  border: isSelected ? `2px solid ${theme.palette.primary.main}` : '1px solid transparent',
  backgroundColor: isSelected ? 'rgba(14, 165, 233, 0.02)' : 'white',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 32px rgba(14, 165, 233, 0.15)',
  },
}));

const statusConfig = {
  open: { label: 'Open', color: 'success' as const },
  assigned: { label: 'Assigned', color: 'warning' as const },
  completed: { label: 'Completed', color: 'info' as const },
  pending: { label: 'Pending', color: 'error' as const }
};

const TaskCard = ({ task, isSelected, onClick }: TaskCardProps) => {
  const statusInfo = statusConfig[task.status];

  return (
    <StyledCard isSelected={isSelected} onClick={onClick}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Stack spacing={2}>
          {/* Title and Status */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1 }}>
            <Typography 
              variant="h6" 
              component="h3" 
              sx={{ 
                fontWeight: 600, 
                fontSize: '1rem',
                lineHeight: 1.3,
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5
              }}
            >
              {task.title}
              {task.urgent && (
                <PriorityHigh color="error" sx={{ fontSize: '1rem' }} />
              )}
            </Typography>
            <Chip 
              label={statusInfo.label}
              color={statusInfo.color}
              size="small"
              variant="outlined"
              sx={{ fontWeight: 500, minWidth: 'auto' }}
            />
          </Box>

          {/* Details */}
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocationOn color="primary" sx={{ fontSize: '1rem' }} />
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ 
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {task.location}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CalendarToday color="primary" sx={{ fontSize: '1rem' }} />
                <Typography variant="body2" color="text.secondary">
                  {new Date(task.date).toLocaleDateString()}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <AttachMoney color="primary" sx={{ fontSize: '1rem' }} />
                <Typography 
                  variant="body2" 
                  sx={{ fontWeight: 600, color: 'text.primary' }}
                >
                  ${task.budget}
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </StyledCard>
  );
};

export default TaskCard;