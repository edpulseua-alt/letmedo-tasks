import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Task {
  id: string;
  title: string;
  location: string;
  coordinates: [number, number];
}

interface TaskMapProps {
  task: Task;
}

const TaskMap = ({ task }: TaskMapProps) => {
  const [lat, lng] = task.coordinates;

  // For now, using a placeholder map. In a real implementation, 
  // you would integrate with Google Maps, Mapbox, or another mapping service
  const handleOpenInMaps = () => {
    const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(mapsUrl, '_blank');
  };

  const handleGetDirections = () => {
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(directionsUrl, '_blank');
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg">
          <MapPin className="w-5 h-5 mr-2 text-primary" />
          Task Location
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {/* Placeholder Map Container */}
        <div className="relative h-64 bg-gradient-accent rounded-lg mx-4 mb-4 overflow-hidden border border-border">
          {/* Map Placeholder */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/50 to-primary/20 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-8 h-8 text-primary-foreground" />
              </div>
              <p className="text-sm font-medium text-foreground">{task.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{task.location}</p>
              <p className="text-xs text-muted-foreground">
                {lat.toFixed(4)}, {lng.toFixed(4)}
              </p>
            </div>
          </div>

          {/* Interactive Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
          
          {/* Map Controls Placeholder */}
          <div className="absolute top-2 right-2 space-y-1">
            <div className="w-8 h-8 bg-card rounded shadow-sm border border-border"></div>
            <div className="w-8 h-8 bg-card rounded shadow-sm border border-border"></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-4 pb-4 space-y-2">
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={handleOpenInMaps}
          >
            <MapPin className="w-4 h-4 mr-2" />
            Open in Maps
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={handleGetDirections}
          >
            <Navigation className="w-4 h-4 mr-2" />
            Get Directions
          </Button>
        </div>

        {/* Location Details */}
        <div className="px-4 pb-4">
          <div className="bg-muted/30 rounded-lg p-3">
            <h4 className="font-medium text-sm mb-1">Address</h4>
            <p className="text-sm text-muted-foreground">{task.location}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskMap;