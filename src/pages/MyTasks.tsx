import React, { useState, useMemo } from 'react';
import { Search, MapPin, Calendar, DollarSign, Edit3 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TaskCard from '@/components/tasks/TaskCard';
import TaskDetails from '@/components/tasks/TaskDetails';
import TaskMap from '@/components/tasks/TaskMap';

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
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedTask, setSelectedTask] = useState(mockTasks[0]);

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
    if (activeFilter !== 'all') {
      tasks = tasks.filter(task => {
        switch (activeFilter) {
          case 'posted':
            return task.status === 'open';
          case 'requests':
            return true; // Placeholder for requests logic
          case 'assigned':
            return task.status === 'assigned';
          case 'pending':
            return task.status === 'pending';
          case 'completed':
            return task.status === 'completed';
          default:
            return true;
        }
      });
    }

    return tasks;
  }, [searchTerm, activeFilter]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-primary-foreground p-6 shadow-elevated">
        <h1 className="text-3xl font-bold">My Tasks</h1>
        <p className="text-primary-foreground/80 mt-2">Manage and track your tasks efficiently</p>
      </header>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-140px)]">
        {/* Left Pane - Task List */}
        <div className="w-full lg:w-1/2 p-6 border-r border-border overflow-y-auto">
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search tasks by title, location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Tabs */}
          <Tabs value={activeFilter} onValueChange={setActiveFilter} className="mb-6">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 gap-1">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="posted">Posted</TabsTrigger>
              <TabsTrigger value="requests">Requests</TabsTrigger>
              <TabsTrigger value="assigned">Assigned</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Task Cards */}
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                isSelected={selectedTask?.id === task.id}
                onClick={() => setSelectedTask(task)}
              />
            ))}
            {filteredTasks.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No tasks found matching your criteria.
              </div>
            )}
          </div>
        </div>

        {/* Right Pane - Task Details & Map */}
        <div className="w-full lg:w-1/2 flex flex-col">
          {selectedTask ? (
            <>
              {/* Task Details */}
              <div className="p-6 border-b border-border">
                <TaskDetails task={selectedTask} />
              </div>

              {/* Map */}
              <div className="flex-1 p-6">
                <TaskMap task={selectedTask} />
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Select a task to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyTasks;