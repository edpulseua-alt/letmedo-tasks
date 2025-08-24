import React from 'react';
import { MapPin, Calendar, DollarSign, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

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

const statusConfig = {
  open: { label: 'Open', variant: 'default' as const, color: 'status-open' },
  assigned: { label: 'Assigned', variant: 'secondary' as const, color: 'status-assigned' },
  completed: { label: 'Completed', variant: 'outline' as const, color: 'status-completed' },
  pending: { label: 'Pending', variant: 'destructive' as const, color: 'status-pending' }
};

const TaskCard = ({ task, isSelected, onClick }: TaskCardProps) => {
  const statusInfo = statusConfig[task.status];

  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-card",
        isSelected && "ring-2 ring-primary shadow-elevated bg-gradient-card"
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-foreground leading-tight flex-1 mr-2">
            {task.title}
            {task.urgent && (
              <AlertCircle className="inline-block w-4 h-4 text-destructive ml-2" />
            )}
          </h3>
          <Badge 
            variant={statusInfo.variant}
            className={cn(
              "text-xs font-medium",
              task.status === 'open' && "bg-status-open/10 text-status-open border-status-open/20",
              task.status === 'assigned' && "bg-status-assigned/10 text-status-assigned border-status-assigned/20",
              task.status === 'completed' && "bg-status-completed/10 text-status-completed border-status-completed/20",
              task.status === 'pending' && "bg-status-pending/10 text-status-pending border-status-pending/20"
            )}
          >
            {statusInfo.label}
          </Badge>
        </div>

        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-primary" />
            <span className="truncate">{task.location}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-primary" />
              <span>{new Date(task.date).toLocaleDateString()}</span>
            </div>
            
            <div className="flex items-center font-semibold text-foreground">
              <DollarSign className="w-4 h-4 mr-1 text-primary" />
              <span>${task.budget}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;