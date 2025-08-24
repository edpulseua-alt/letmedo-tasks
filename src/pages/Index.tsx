import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, MapPin, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">LetMeDo</h1>
              <p className="text-primary-foreground/80 text-lg">
                Your trusted platform for local task management
              </p>
            </div>
            <Link to="/my-tasks">
              <Button variant="secondary" className="bg-white text-primary hover:bg-gray-100">
                View My Tasks
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold text-foreground mb-6">
            Get Things Done, Effortlessly
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect with skilled professionals in your area. Post tasks, browse opportunities, 
            and manage everything from one beautiful dashboard.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/my-tasks">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90">
                Manage Tasks
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              Find Work
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 bg-gradient-accent/30">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Why Choose LetMeDo?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-card bg-gradient-card">
              <CardHeader>
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle>Local Connections</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Find trusted professionals and opportunities right in your neighborhood with our location-based matching.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-card bg-gradient-card">
              <CardHeader>
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle>Smart Task Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Organize, track, and manage all your tasks with powerful filtering, search, and status tracking.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-card bg-gradient-card">
              <CardHeader>
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle>Quick & Reliable</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Get matched with qualified professionals quickly and manage everything through our intuitive interface.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto text-center">
          <div className="bg-gradient-card rounded-2xl p-12 shadow-elevated">
            <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of users who trust LetMeDo for their task management needs.
            </p>
            <Link to="/my-tasks">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90">
                Start Managing Tasks
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 py-8 px-6 mt-16">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 LetMeDo. Built with care for local communities.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
