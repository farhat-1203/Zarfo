import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Route,
  CheckCircle,
  Camera,
  Star,
  Trophy,
  Bike,
  Navigation,
  Users,
  Package,
  Timer,
  Award
} from 'lucide-react';

export default function NightRobin() {
  const navigate = useNavigate();
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null);

  const availableRoutes = [
    {
      id: 1,
      name: 'CP Central Route',
      hotels: ['Taj Restaurant', 'Spice Garden'],
      deliveryPoints: ['Metro Guards (CP)', 'Security Team (Janpath)', 'Cleaners (Rajiv Chowk)'],
      distance: '3.2 km',
      estimatedTime: '45 mins',
      foodItems: 3,
      recipients: 8,
      points: 25,
      difficulty: 'Easy',
      status: 'available'
    },
    {
      id: 2,
      name: 'Karol Bagh Loop',
      hotels: ['Royal Kitchen', 'Home Kitchen'],
      deliveryPoints: ['Night Shift Workers (KB)', 'Shelter (Pusa Road)'],
      distance: '4.8 km',
      estimatedTime: '1 hr 10 mins',
      foodItems: 5,
      recipients: 12,
      points: 40,
      difficulty: 'Medium',
      status: 'available'
    },
    {
      id: 3,
      name: 'Lajpat Express',
      hotels: ['Green Valley Restaurant'],
      deliveryPoints: ['Construction Workers (LN)', 'Security Guards (Defense Colony)'],
      distance: '2.1 km',
      estimatedTime: '30 mins',
      foodItems: 2,
      recipients: 6,
      points: 20,
      difficulty: 'Easy',
      status: 'high-priority'
    }
  ];

  const activeDelivery = {
    route: 'CP Central Route',
    currentStep: 2,
    totalSteps: 5,
    nextLocation: 'Metro Guards (CP)',
    eta: '15 mins',
    pickupCompleted: ['Taj Restaurant'],
    pendingPickup: ['Spice Garden'],
    deliveryCompleted: [],
    pendingDelivery: ['Metro Guards (CP)', 'Security Team (Janpath)', 'Cleaners (Rajiv Chowk)']
  };

  const robinStats = {
    totalDeliveries: 127,
    rating: 4.8,
    points: 2340,
    level: 'Gold Robin',
    badges: ['Speed Demon', 'Night Warrior', 'Community Hero']
  };

  const [hasActiveDelivery] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Night Robin</h1>
                <p className="text-sm text-gray-600">Volunteer delivery coordination</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-green-600">
                <CheckCircle className="w-3 h-3 mr-1" />
                Online
              </Badge>
              <Badge variant="secondary">
                <Star className="w-3 h-3 mr-1" />
                {robinStats.level}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Robin Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{robinStats.totalDeliveries}</div>
              <div className="text-sm text-gray-600">Total Deliveries</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{robinStats.rating}</div>
              <div className="text-sm text-gray-600">Rating</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{robinStats.points}</div>
              <div className="text-sm text-gray-600">Points</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{robinStats.badges.length}</div>
              <div className="text-sm text-gray-600">Badges Earned</div>
            </CardContent>
          </Card>
        </div>

        {hasActiveDelivery ? (
          /* Active Delivery Tracking */
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Navigation className="w-5 h-5 mr-2" />
                Active Delivery: {activeDelivery.route}
              </CardTitle>
              <CardDescription>
                Step {activeDelivery.currentStep} of {activeDelivery.totalSteps} • Next: {activeDelivery.nextLocation}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{Math.round((activeDelivery.currentStep / activeDelivery.totalSteps) * 100)}%</span>
                </div>
                <Progress value={(activeDelivery.currentStep / activeDelivery.totalSteps) * 100} />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-green-600 mb-2">✓ Pickups Completed</h4>
                  <div className="space-y-1">
                    {activeDelivery.pickupCompleted.map((location, index) => (
                      <div key={index} className="text-sm text-gray-600 flex items-center">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-600" />
                        {location}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-blue-600 mb-2">📍 Pending Pickups</h4>
                  <div className="space-y-1">
                    {activeDelivery.pendingPickup.map((location, index) => (
                      <div key={index} className="text-sm text-gray-600 flex items-center">
                        <Clock className="w-3 h-3 mr-2 text-blue-600" />
                        {location}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button className="flex-1">
                  <Navigation className="w-4 h-4 mr-2" />
                  Open in Maps
                </Button>
                <Button variant="outline">
                  <Camera className="w-4 h-4 mr-2" />
                  Upload Proof
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Available Routes */
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Route className="w-5 h-5 mr-2" />
                Available Routes
              </CardTitle>
              <CardDescription>
                Choose a route to start your delivery mission
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availableRoutes.map((route) => (
                  <div 
                    key={route.id} 
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedRoute === route.id ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-300'
                    } ${route.status === 'high-priority' ? 'border-red-200 bg-red-50' : ''}`}
                    onClick={() => setSelectedRoute(route.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-lg">{route.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <span className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {route.distance}
                          </span>
                          <span className="flex items-center">
                            <Timer className="w-3 h-3 mr-1" />
                            {route.estimatedTime}
                          </span>
                          <Badge variant={route.difficulty === 'Easy' ? 'default' : 'secondary'} className="text-xs">
                            {route.difficulty}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-purple-600">+{route.points} pts</div>
                        {route.status === 'high-priority' && (
                          <Badge variant="destructive" className="text-xs">High Priority</Badge>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h5 className="font-medium text-blue-600 mb-1">Pickup Locations ({route.hotels.length})</h5>
                        <ul className="space-y-1">
                          {route.hotels.map((hotel, index) => (
                            <li key={index} className="text-gray-600 flex items-center">
                              <Package className="w-3 h-3 mr-2" />
                              {hotel}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-green-600 mb-1">Delivery Points ({route.deliveryPoints.length})</h5>
                        <ul className="space-y-1">
                          {route.deliveryPoints.map((point, index) => (
                            <li key={index} className="text-gray-600 flex items-center">
                              <Users className="w-3 h-3 mr-2" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">{route.foodItems}</span> food items • 
                        <span className="font-medium"> {route.recipients}</span> recipients
                      </div>
                      {selectedRoute === route.id && (
                        <Button size="sm">
                          <Bike className="w-4 h-4 mr-2" />
                          Accept Route
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Gamification Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="w-5 h-5 mr-2" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {robinStats.badges.map((badge, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Award className="w-6 h-6 text-yellow-600" />
                      <span className="font-medium">{badge}</span>
                    </div>
                    <Badge variant="outline">Earned</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Leaderboard</CardTitle>
              <CardDescription>Top Night Robins this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { rank: 1, name: 'Priya Singh', deliveries: 23, points: 920 },
                  { rank: 2, name: 'You', deliveries: 19, points: 760, isCurrentUser: true },
                  { rank: 3, name: 'Amit Kumar', deliveries: 17, points: 680 },
                  { rank: 4, name: 'Raj Patel', deliveries: 15, points: 600 }
                ].map((robin, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                    robin.isCurrentUser ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        robin.rank === 1 ? 'bg-yellow-500 text-white' :
                        robin.rank === 2 ? 'bg-gray-400 text-white' :
                        robin.rank === 3 ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-700'
                      }`}>
                        {robin.rank}
                      </div>
                      <span className={robin.isCurrentUser ? 'font-medium text-blue-600' : ''}>{robin.name}</span>
                    </div>
                    <div className="text-right text-sm">
                      <div className="font-medium">{robin.deliveries} deliveries</div>
                      <div className="text-gray-500">{robin.points} pts</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}