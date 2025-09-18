import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Building2, 
  ShoppingCart, 
  Bike, 
  Users, 
  Heart,
  TrendingUp,
  MapPin,
  Clock,
  Brain,
  Zap
} from 'lucide-react';

export default function Index() {
  const navigate = useNavigate();

  const roles = [
    {
      id: 'admin',
      title: 'Admin Dashboard',
      description: 'Central oversight, analytics, and system management',
      icon: Shield,
      color: 'bg-red-500',
      features: ['Real-time Analytics', 'User Management', 'Logistics Oversight'],
      path: '/admin'
    },
    {
      id: 'hotel',
      title: 'Hotel Portal',
      description: 'List surplus food, manage pickups, track CSR impact',
      icon: Building2,
      color: 'bg-blue-500',
      features: ['Food Listing', 'AI Pricing', 'CSR Metrics'],
      path: '/hotel'
    },
    {
      id: 'user',
      title: 'Customer App',
      description: 'Buy discounted surplus meals from nearby hotels',
      icon: ShoppingCart,
      color: 'bg-green-500',
      features: ['Flash Deals', 'Easy Payment', 'Food Rating'],
      path: '/user'
    },
    {
      id: 'night-robin',
      title: 'Night Robin',
      description: 'Volunteer delivery coordination and route optimization',
      icon: Bike,
      color: 'bg-purple-500',
      features: ['Route Selection', 'Delivery Tracking', 'Gamification'],
      path: '/night-robin'
    },
    {
      id: 'night-workers',
      title: 'Night Workers',
      description: 'Request and receive food deliveries',
      icon: Users,
      color: 'bg-orange-500',
      features: ['Food Requests', 'ETA Tracking', 'Simple Interface'],
      path: '/night-workers'
    },
    {
      id: 'ai-agent',
      title: 'AI Agent Brain',
      description: 'Smart decision making and optimization engine',
      icon: Brain,
      color: 'bg-gradient-to-r from-cyan-500 to-blue-500',
      features: ['Smart Decisions', 'Learning Insights', 'Real-time Processing'],
      path: '/ai-agent'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Zarfo</h1>
                <p className="text-sm text-gray-600">Food Redistribution Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-green-600">
                <TrendingUp className="w-3 h-3 mr-1" />
                Live Platform
              </Badge>
              <Badge variant="outline" className="text-cyan-600 animate-pulse">
                <Zap className="w-3 h-3 mr-1" />
                AI Powered
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Connecting Surplus Food with Those in Need
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive platform that reduces food waste while feeding the hungry through 
            smart logistics, AI optimization, and community volunteers.
          </p>
          <div className="flex items-center justify-center space-x-6 mt-8 text-sm text-gray-500">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              Real-time Tracking
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              24/7 Operations
            </div>
            <div className="flex items-center">
              <Heart className="w-4 h-4 mr-1" />
              Community Driven
            </div>
            <div className="flex items-center">
              <Brain className="w-4 h-4 mr-1" />
              AI Optimized
            </div>
          </div>
        </div>

        {/* Role Selection */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role) => {
            const IconComponent = role.icon;
            return (
              <Card key={role.id} className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 ${role.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{role.title}</CardTitle>
                      {role.id === 'ai-agent' && (
                        <Badge variant="secondary" className="text-xs mt-1">
                          <Zap className="w-3 h-3 mr-1" />
                          NEW
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardDescription className="text-sm">
                    {role.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {role.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <Button 
                      onClick={() => navigate(role.path)}
                      className="w-full"
                      variant="outline"
                    >
                      Access {role.title}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">2.4K</div>
            <div className="text-sm text-gray-600">Meals Saved Today</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">156</div>
            <div className="text-sm text-gray-600">Active Hotels</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">89</div>
            <div className="text-sm text-gray-600">Night Robins</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-600">98.2%</div>
            <div className="text-sm text-gray-600">AI Accuracy</div>
          </div>
        </div>
      </div>
    </div>
  );
}
