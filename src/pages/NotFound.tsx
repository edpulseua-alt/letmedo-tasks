import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-8">
          <span className="text-4xl font-bold text-primary-foreground">404</span>
        </div>
        <h1 className="text-3xl font-bold mb-4 text-foreground">Page Not Found</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        
        <div className="space-y-4">
          <Link to="/">
            <Button className="w-full bg-gradient-primary hover:opacity-90">
              Return to Homepage
            </Button>
          </Link>
          <Link to="/my-tasks">
            <Button variant="outline" className="w-full">
              View My Tasks
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
