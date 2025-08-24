import React, { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Paper,
  AppBar,
  Toolbar,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import TaskCard from '@/components/tasks/TaskCard';
import TaskDetails from '@/components/tasks/TaskDetails';
import TaskMap from '@/components/tasks/TaskMap';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
  marginBottom: theme.spacing(3),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  height: 'calc(100vh - 200px)',
  overflow: 'auto',
  padding: theme.spacing(2),
}));

// Mock data for demonstration
const mockTasks = [
  {
    id: '1',
    title: 'Fix leaking faucet in kitchen',
    location: 'Downtown Seattle, WA',
    date: '2024-01-15',
    status: 'open' as const,
    budget: 150,
    urgent: true,
    description: 'Kitchen faucet has been leaking for several days. Need professional plumber to fix it quickly.',
    coordinates: [47.6062, -122.3321] as [number, number],
    images: []
  },
  {
    id: '2',
    title: 'Home cleaning service',
    location: 'Capitol Hill, Seattle, WA',
    date: '2024-01-16',
    status: 'assigned' as const,
    budget: 200,
    urgent: false,
    description: 'Need thorough cleaning of 2-bedroom apartment. All supplies provided.',
    coordinates: [47.6205, -122.3212] as [number, number],
    images: []
  },
  {
    id: '3',
    title: 'Furniture assembly',
    location: 'Bellevue, WA',
    date: '2024-01-10',
    status: 'completed' as const,
    budget: 100,
    urgent: false,
    description: 'Assemble IKEA bedroom furniture set including bed, dresser, and nightstand.',
    coordinates: [47.6101, -122.2015] as [number, number],
    images: []
  },
  {
    id: '4',
    title: 'Garden maintenance',
    location: 'Queen Anne, Seattle, WA',
    date: '2024-01-18',
    status: 'pending' as const,
    budget: 300,
    urgent: false,
    description: 'Spring garden cleanup, pruning, and mulching for large backyard.',
    coordinates: [47.6370, -122.3563] as [number, number],
    images: []
  }
];

const MyTasks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState(0);
  const [selectedTask, setSelectedTask] = useState(mockTasks[0]);

  const filterOptions = ['All', 'Posted', 'Requests', 'Assigned', 'Pending', 'Completed'];

  const filteredTasks = useMemo(() => {
    let tasks = mockTasks;

    // Filter by search term
    if (searchTerm) {
      tasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (activeFilter !== 0) {
      tasks = tasks.filter(task => {
        switch (activeFilter) {
          case 1: // Posted
            return task.status === 'open';
          case 2: // Requests
            return true; // Placeholder for requests logic
          case 3: // Assigned
            return task.status === 'assigned';
          case 4: // Pending
            return task.status === 'pending';
          case 5: // Completed
            return task.status === 'completed';
          default:
            return true;
        }
      });
    }

    return tasks;
  }, [searchTerm, activeFilter]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveFilter(newValue);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header */}
      <StyledAppBar position="static" elevation={0}>
        <Toolbar>
          <Box>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'white' }}>
              My Tasks
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mt: 0.5 }}>
              Manage and track your tasks efficiently
            </Typography>
          </Box>
        </Toolbar>
      </StyledAppBar>

      <Container maxWidth="xl">
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, 
          gap: 3 
        }}>
          {/* Left Pane - Task List */}
          <Box>
            <StyledPaper elevation={1}>
              {/* Search */}
              <TextField
                fullWidth
                placeholder="Search tasks by title, location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 3 }}
              />

              {/* Filter Tabs */}
              <Tabs
                value={activeFilter}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
              >
                {filterOptions.map((option, index) => (
                  <Tab key={option} label={option} />
                ))}
              </Tabs>

              {/* Task Cards */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {filteredTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    isSelected={selectedTask?.id === task.id}
                    onClick={() => setSelectedTask(task)}
                  />
                ))}
                {filteredTasks.length === 0 && (
                  <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                    <Typography>No tasks found matching your criteria.</Typography>
                  </Box>
                )}
              </Box>
            </StyledPaper>
          </Box>

          {/* Right Pane - Task Details & Map */}
          <Box>
            {selectedTask ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: 'calc(100vh - 200px)' }}>
                {/* Task Details */}
                <Paper elevation={1} sx={{ p: 3, flex: '0 0 auto' }}>
                  <TaskDetails task={selectedTask} />
                </Paper>

                {/* Map */}
                <Paper elevation={1} sx={{ p: 3, flex: 1, minHeight: 300 }}>
                  <TaskMap task={selectedTask} />
                </Paper>
              </Box>
            ) : (
              <StyledPaper elevation={1}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  <Typography color="text.secondary">Select a task to view details</Typography>
                </Box>
              </StyledPaper>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default MyTasks;