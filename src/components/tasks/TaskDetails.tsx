import React from 'react';
import { MapPin, Calendar, DollarSign, Edit3, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

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
  open: { label: 'Open', variant: 'default' as const },
  assigned: { label: 'Assigned', variant: 'secondary' as const },
  completed: { label: 'Completed', variant: 'outline' as const },
  pending: { label: 'Pending', variant: 'destructive' as const }
};

const TaskDetails = ({ task }: TaskDetailsProps) => {
  const statusInfo = statusConfig[task.status];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {task.title}
          </h2>
          <Badge 
            variant={statusInfo.variant}
            className={cn(
              "text-sm font-medium",
              task.status === 'open' && "bg-status-open/10 text-status-open border-status-open/20",
              task.status === 'assigned' && "bg-status-assigned/10 text-status-assigned border-status-assigned/20",
              task.status === 'completed' && "bg-status-completed/10 text-status-completed border-status-completed/20",
              task.status === 'pending' && "bg-status-pending/10 text-status-pending border-status-pending/20"
            )}
          >
            {statusInfo.label}
          </Badge>
        </div>
        <Button variant="default" className="bg-gradient-primary hover:opacity-90">
          <Edit3 className="w-4 h-4 mr-2" />
          Edit
        </Button>
      </div>

      {/* Task Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="flex items-center text-sm">
            <Calendar className="w-5 h-5 mr-3 text-primary" />
            <div>
              <span className="text-muted-foreground">Date: </span>
              <span className="font-medium">{new Date(task.date).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="flex items-center text-sm">
            <MapPin className="w-5 h-5 mr-3 text-primary" />
            <div>
              <span className="text-muted-foreground">Location: </span>
              <span className="font-medium">{task.location}</span>
            </div>
          </div>

          <div className="flex items-center text-sm">
            <DollarSign className="w-5 h-5 mr-3 text-primary" />
            <div>
              <span className="text-muted-foreground">Budget: </span>
              <span className="font-bold text-lg text-foreground">${task.budget}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="urgent" 
              checked={task.urgent} 
              disabled
              className="data-[state=checked]:bg-destructive data-[state=checked]:border-destructive"
            />
            <label htmlFor="urgent" className="text-sm font-medium">
              This is urgent
            </label>
            {task.urgent && (
              <AlertCircle className="w-4 h-4 text-destructive" />
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Details</h3>
        <div className="bg-muted/50 rounded-lg p-4">
          <p className="text-foreground leading-relaxed">{task.description}</p>
        </div>
      </div>

      {/* Images Section */}
      {task.images && task.images.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Attachments</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {task.images.map((image, index) => (
              <div key={index} className="aspect-square bg-muted rounded-lg border border-border">
                <img 
                  src={image} 
                  alt={`Task attachment ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;