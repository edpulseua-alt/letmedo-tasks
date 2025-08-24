import React from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
  Card,
  CardContent,
} from '@mui/material';
import {
  LocationOn,
  Navigation,
  Map as MapIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

interface Task {
  id: string;
  title: string;
  location: string;
  coordinates: [number, number];
}

interface TaskMapProps {
  task: Task;
}

const MapContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '250px',
  background: 'linear-gradient(135deg, #e0f7fa, rgba(14, 165, 233, 0.1))',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  border: `1px solid ${theme.palette.grey[300]}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
}));

const MapPlaceholder = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  position: 'relative',
  zIndex: 1,
}));

const MapIconCircle = styled(Box)(({ theme }) => ({
  width: 64,
  height: 64,
  backgroundColor: theme.palette.primary.main,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  marginBottom: theme.spacing(2),
  boxShadow: '0 4px 12px rgba(14, 165, 233, 0.3)',
}));

const TaskMap = ({ task }: TaskMapProps) => {
  const [lat, lng] = task.coordinates;

  const handleOpenInMaps = () => {
    const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(mapsUrl, '_blank');
  };

  const handleGetDirections = () => {
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(directionsUrl, '_blank');
  };

  return (
    <Stack spacing={2} sx={{ height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <LocationOn color="primary" />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Task Location
        </Typography>
      </Box>

      {/* Map Placeholder */}
      <MapContainer>
        <MapPlaceholder>
          <MapIconCircle>
            <LocationOn sx={{ fontSize: 32, color: 'white' }} />
          </MapIconCircle>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
            {task.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            {task.location}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {lat.toFixed(4)}, {lng.toFixed(4)}
          </Typography>
        </MapPlaceholder>

        {/* Map Controls Placeholder */}
        <Box sx={{ 
          position: 'absolute', 
          top: 8, 
          right: 8, 
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5
        }}>
          <Box sx={{ 
            width: 32, 
            height: 32, 
            bgcolor: 'white', 
            borderRadius: 1, 
            boxShadow: 1,
            border: '1px solid',
            borderColor: 'grey.300'
          }} />
          <Box sx={{ 
            width: 32, 
            height: 32, 
            bgcolor: 'white', 
            borderRadius: 1, 
            boxShadow: 1,
            border: '1px solid',
            borderColor: 'grey.300'
          }} />
        </Box>
      </MapContainer>

      {/* Action Buttons */}
      <Stack spacing={1}>
        <Button
          variant="outlined"
          startIcon={<MapIcon />}
          onClick={handleOpenInMaps}
          fullWidth
          sx={{ justifyContent: 'flex-start' }}
        >
          Open in Maps
        </Button>
        <Button
          variant="outlined"
          startIcon={<Navigation />}
          onClick={handleGetDirections}
          fullWidth
          sx={{ justifyContent: 'flex-start' }}
        >
          Get Directions
        </Button>
      </Stack>

      {/* Location Details */}
      <Card variant="outlined" sx={{ mt: 'auto' }}>
        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
            Address
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {task.location}
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default TaskMap;