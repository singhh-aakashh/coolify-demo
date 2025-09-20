import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Gauge, 
  Fuel, 
  Thermometer, 
  Battery, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  Zap
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [fuelLevel, setFuelLevel] = useState(75);
  const [temperature, setTemperature] = useState(85);
  const [batteryLevel, setBatteryLevel] = useState(92);

  const carImages = [
    { id: 1, name: 'Tesla Model S', url: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=400&fit=crop' },
    { id: 2, name: 'BMW i8', url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=400&fit=crop' },
    { id: 3, name: 'Audi e-tron', url: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=400&fit=crop' },
    { id: 4, name: 'Mercedes EQS', url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=400&fit=crop' }
  ];

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/');
      return;
    }

    // Simulate real-time dashboard data
    const interval = setInterval(() => {
      setSpeed(prev => Math.max(0, Math.min(180, prev + (Math.random() - 0.5) * 10)));
      setFuelLevel(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 2)));
      setTemperature(prev => Math.max(60, Math.min(120, prev + (Math.random() - 0.5) * 5)));
      setBatteryLevel(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 1)));
    }, 2000);

    // Auto-slide images
    const imageInterval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % carImages.length);
    }, 4000);

    return () => {
      clearInterval(interval);
      clearInterval(imageInterval);
    };
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  const nextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % carImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(prev => (prev - 1 + carImages.length) % carImages.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Car Dashboard
            </h1>
            <p className="text-muted-foreground">Real-time vehicle monitoring</p>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="border-border hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-all duration-200"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Image Carousel */}
        <Card className="overflow-hidden backdrop-blur-sm bg-card/90 border-border shadow-dashboard">
          <div className="relative h-64 md:h-80">
            <img 
              src={carImages[currentImageIndex].url}
              alt={carImages[currentImageIndex].name}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            
            {/* Image Controls */}
            <Button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white border-0 backdrop-blur-sm"
              size="icon"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            <Button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white border-0 backdrop-blur-sm"
              size="icon"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>

            {/* Image Info */}
            <div className="absolute bottom-4 left-4">
              <Badge variant="secondary" className="bg-black/50 text-white border-0 backdrop-blur-sm">
                {carImages[currentImageIndex].name}
              </Badge>
            </div>

            {/* Image Dots */}
            <div className="absolute bottom-4 right-4 flex space-x-2">
              {carImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentImageIndex 
                      ? 'bg-primary shadow-glow' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </Card>

        {/* Dashboard Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Speed */}
          <Card className="backdrop-blur-sm bg-card/90 border-border shadow-dashboard">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Gauge className="w-5 h-5 text-primary" />
                  <span className="font-medium">Speed</span>
                </div>
                <Badge variant="outline" className="border-primary text-primary">
                  {Math.round(speed)} mph
                </Badge>
              </div>
              <Progress 
                value={(speed / 180) * 100} 
                className="h-3 bg-muted [&>div]:bg-gradient-to-r [&>div]:from-success [&>div]:to-warning [&>div]:shadow-glow" 
              />
            </CardContent>
          </Card>

          {/* Fuel Level */}
          <Card className="backdrop-blur-sm bg-card/90 border-border shadow-dashboard">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Fuel className="w-5 h-5 text-accent" />
                  <span className="font-medium">Fuel</span>
                </div>
                <Badge variant="outline" className="border-accent text-accent">
                  {Math.round(fuelLevel)}%
                </Badge>
              </div>
              <Progress 
                value={fuelLevel} 
                className="h-3 bg-muted [&>div]:bg-gradient-to-r [&>div]:from-accent [&>div]:to-primary [&>div]:shadow-glow" 
              />
            </CardContent>
          </Card>

          {/* Temperature */}
          <Card className="backdrop-blur-sm bg-card/90 border-border shadow-dashboard">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Thermometer className="w-5 h-5 text-warning" />
                  <span className="font-medium">Engine Temp</span>
                </div>
                <Badge variant="outline" className="border-warning text-warning">
                  {Math.round(temperature)}°F
                </Badge>
              </div>
              <Progress 
                value={(temperature / 120) * 100} 
                className="h-3 bg-muted [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-warning [&>div]:shadow-glow" 
              />
            </CardContent>
          </Card>

          {/* Battery Level */}
          <Card className="backdrop-blur-sm bg-card/90 border-border shadow-dashboard">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Battery className="w-5 h-5 text-success" />
                  <span className="font-medium">Battery</span>
                </div>
                <Badge variant="outline" className="border-success text-success">
                  {Math.round(batteryLevel)}%
                </Badge>
              </div>
              <Progress 
                value={batteryLevel} 
                className="h-3 bg-muted [&>div]:bg-gradient-to-r [&>div]:from-success [&>div]:to-primary [&>div]:shadow-glow" 
              />
            </CardContent>
          </Card>
        </div>

        {/* Status Panel */}
        <Card className="backdrop-blur-sm bg-card/90 border-border shadow-dashboard">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-success to-primary rounded-full flex items-center justify-center shadow-glow">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Vehicle Status: Optimal</h3>
                  <p className="text-muted-foreground">All systems operating normally</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Last Update</p>
                <p className="font-mono text-primary">{new Date().toLocaleTimeString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;