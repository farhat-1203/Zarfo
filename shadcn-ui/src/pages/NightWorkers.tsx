import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  CheckCircle,
  Camera,
  Star,
  Utensils,
  Navigation,
  Phone,
  MessageCircle,
  Heart,
  Users,
  Timer,
  Bike
} from 'lucide-react';

export default function NightWorkers() {
  const navigate = useNavigate();
  const [needsFood, setNeedsFood] = useState(false);
  const [hasActiveRequest, setHasActiveRequest] = useState(true);

  const activeRequest = {
    id: 'REQ-2024-001',
    status: 'assigned',
    assignedRobin: 'Raj Kumar (#45)',
    robinPhone: '+91 98765 43210',
    estimatedArrival: '10:45 PM',
    timeLeft: '25 mins',
    foodItems: [
      { name: 'Veg Biryani', quantity: '1 portion', from: 'Taj Restaurant' },
      { name: 'Dal Tadka', quantity: '1 portion', from: 'Spice Garden' }
    ],
    location: 'Metro Station Gate 3, Connaught Place'
  };

  const recentDeliveries = [
    {
      date: '2024-01-15',
      items: ['Chicken Curry', 'Rice'],
      robin: 'Priya Singh',
      rating: 5,
      feedback: 'Food was fresh and warm'
    },
    {
      date: '2024-01-12',
      items: ['Mixed Vegetables', 'Roti'],
      robin: 'Amit Kumar',
      rating: 4,
      feedback: 'Good quality food'
    },
    {
      date: '2024-01-10',
      items: ['Dal Makhani', 'Rice'],
      robin: 'Raj Patel',
      rating: 5,
      feedback: 'Excellent service'
    }
  ];

  const nearbyWorkers = [
    { name: 'Security Team A', distance: '50m', needsFood: true },
    { name: 'Cleaning Staff B', distance: '120m', needsFood: false },
    { name: 'Metro Guards C', distance: '200m', needsFood: true }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Night Workers</h1>
                <p className="text-sm text-gray-600">Request and receive food deliveries</p>
              </div>
            </div>
            <Badge variant="outline" className="text-blue-600">
              <MapPin className="w-3 h-3 mr-1" />
              CP Metro Station
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Food Request Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Utensils className="w-5 h-5 mr-2" />
              Food Request
            </CardTitle>
            <CardDescription>
              Let us know if you need food tonight
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 border rounded-lg">
                <Checkbox 
                  id="need-food"
                  checked={needsFood}
                  onCheckedChange={setNeedsFood}
                />
                <label htmlFor="need-food" className="text-lg font-medium cursor-pointer">
                  I need food tonight
                </label>
              </div>
              
              {needsFood && (
                <div className="space-y-3 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    ✓ Your location has been detected: <strong>CP Metro Station Gate 3</strong>
                  </p>
                  <p className="text-sm text-blue-800">
                    ✓ We'll notify you when food is available for delivery
                  </p>
                  <Button className="w-full">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Submit Food Request
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Active Request Tracking */}
        {hasActiveRequest && (
          <Card className="mb-6 border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center text-green-800">
                <Timer className="w-5 h-5 mr-2" />
                Food is on the way!
              </CardTitle>
              <CardDescription className="text-green-700">
                Request ID: {activeRequest.id}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-green-800 mb-2">Delivery Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Bike className="w-4 h-4 mr-2 text-green-600" />
                      <span>Robin: {activeRequest.assignedRobin}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-green-600" />
                      <span>ETA: {activeRequest.estimatedArrival} ({activeRequest.timeLeft})</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-green-600" />
                      <span>{activeRequest.location}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-green-800 mb-2">Food Items</h4>
                  <div className="space-y-1">
                    {activeRequest.foodItems.map((item, index) => (
                      <div key={index} className="text-sm text-green-700">
                        <span className="font-medium">{item.name}</span> ({item.quantity})
                        <div className="text-xs text-green-600">from {item.from}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 pt-4 border-t border-green-200">
                <Button variant="outline" size="sm" className="flex-1">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Robin
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Navigation className="w-4 h-4 mr-2" />
                  Track Live
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent Deliveries */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Recent Deliveries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDeliveries.map((delivery, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-medium text-sm">
                          {delivery.items.join(', ')}
                        </div>
                        <div className="text-xs text-gray-500">
                          Delivered by {delivery.robin}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        {delivery.date}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3 h-3 ${
                              i < delivery.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                      <div className="text-xs text-gray-600">
                        "{delivery.feedback}"
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Nearby Workers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Nearby Workers
              </CardTitle>
              <CardDescription>
                Other workers in your area
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {nearbyWorkers.map((worker, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-sm">{worker.name}</div>
                      <div className="text-xs text-gray-500">{worker.distance} away</div>
                    </div>
                    <Badge variant={worker.needsFood ? 'destructive' : 'outline'} className="text-xs">
                      {worker.needsFood ? 'Needs Food' : 'Fed'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button variant="outline" size="sm" className="h-16 flex-col">
                <Camera className="w-5 h-5 mb-1" />
                <span className="text-xs">Rate Last Delivery</span>
              </Button>
              <Button variant="outline" size="sm" className="h-16 flex-col">
                <Heart className="w-5 h-5 mb-1" />
                <span className="text-xs">Thank Robin</span>
              </Button>
              <Button variant="outline" size="sm" className="h-16 flex-col">
                <MessageCircle className="w-5 h-5 mb-1" />
                <span className="text-xs">Report Issue</span>
              </Button>
              <Button variant="outline" size="sm" className="h-16 flex-col">
                <MapPin className="w-5 h-5 mb-1" />
                <span className="text-xs">Update Location</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-green-600">47</div>
            <div className="text-sm text-gray-600">Meals Received</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-blue-600">4.8</div>
            <div className="text-sm text-gray-600">Avg Rating Given</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-purple-600">23</div>
            <div className="text-sm text-gray-600">Different Robins</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-orange-600">₹3,200</div>
            <div className="text-sm text-gray-600">Food Value Received</div>
          </Card>
        </div>
      </div>
    </div>
  );
}