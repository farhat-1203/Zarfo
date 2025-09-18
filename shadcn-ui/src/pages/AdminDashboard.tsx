import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  TrendingUp, 
  Users, 
  MapPin, 
  Clock,
  AlertTriangle,
  CheckCircle,
  Building2,
  Bike,
  Heart,
  BarChart3,
  Download,
  Settings
} from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const stats = [
    { label: 'Food Saved Today', value: '2,456 kg', change: '+12%', color: 'text-green-600' },
    { label: 'Active Hotels', value: '156', change: '+5%', color: 'text-blue-600' },
    { label: 'Night Robins Online', value: '89', change: '+8%', color: 'text-purple-600' },
    { label: 'Meals Delivered', value: '1,234', change: '+15%', color: 'text-orange-600' }
  ];

  const recentActivity = [
    { time: '2 min ago', action: 'Hotel Taj listed 5kg Biryani', status: 'pending', type: 'hotel' },
    { time: '5 min ago', action: 'Robin #45 completed delivery route', status: 'completed', type: 'robin' },
    { time: '8 min ago', action: '15 workers requested food in CP area', status: 'assigned', type: 'worker' },
    { time: '12 min ago', action: 'AI suggested price reduction for Pasta', status: 'active', type: 'ai' }
  ];

  const bottlenecks = [
    { area: 'Connaught Place', issue: 'High demand, low robin availability', severity: 'high' },
    { area: 'Karol Bagh', issue: 'Surplus food, no immediate requests', severity: 'medium' },
    { area: 'Lajpat Nagar', issue: 'Delivery delays due to traffic', severity: 'low' }
  ];

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
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Central oversight and system management</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`text-sm font-medium ${stat.color}`}>
                    <TrendingUp className="w-4 h-4 inline mr-1" />
                    {stat.change}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Real-time Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Real-time Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'hotel' ? 'bg-blue-500' :
                          activity.type === 'robin' ? 'bg-purple-500' :
                          activity.type === 'worker' ? 'bg-orange-500' : 'bg-green-500'
                        }`} />
                        <div>
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                      <Badge variant={
                        activity.status === 'completed' ? 'default' :
                        activity.status === 'pending' ? 'secondary' : 'outline'
                      }>
                        {activity.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Analytics Tabs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Analytics Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="food" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="food">Food Flow</TabsTrigger>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                    <TabsTrigger value="impact">Impact</TabsTrigger>
                  </TabsList>
                  <TabsContent value="food" className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Food Listed Today</span>
                        <span className="font-medium">2,456 kg</span>
                      </div>
                      <Progress value={85} className="h-2" />
                      <div className="flex justify-between text-sm">
                        <span>Successfully Redistributed</span>
                        <span className="font-medium">2,089 kg (85%)</span>
                      </div>
                      <Progress value={12} className="h-2" />
                      <div className="flex justify-between text-sm">
                        <span>Sold to Customers</span>
                        <span className="font-medium">295 kg (12%)</span>
                      </div>
                      <Progress value={3} className="h-2" />
                      <div className="flex justify-between text-sm">
                        <span>Wasted</span>
                        <span className="font-medium">72 kg (3%)</span>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="performance" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">4.8</div>
                        <div className="text-sm text-gray-600">Avg Robin Rating</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">23 min</div>
                        <div className="text-sm text-gray-600">Avg Delivery Time</div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="impact" className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">12,450</div>
                        <div className="text-sm text-gray-600">People Fed This Month</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">₹2.4L</div>
                        <div className="text-sm text-gray-600">Food Value Saved</div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Bottlenecks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  System Bottlenecks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {bottlenecks.map((bottleneck, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{bottleneck.area}</h4>
                        <Badge variant={
                          bottleneck.severity === 'high' ? 'destructive' :
                          bottleneck.severity === 'medium' ? 'secondary' : 'outline'
                        }>
                          {bottleneck.severity}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600">{bottleneck.issue}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Assign Backup Robin
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Building2 className="w-4 h-4 mr-2" />
                  Approve New Hotel
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MapPin className="w-4 h-4 mr-2" />
                  View Live Map
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Heart className="w-4 h-4 mr-2" />
                  Generate CSR Report
                </Button>
              </CardContent>
            </Card>

            {/* Active Robins */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bike className="w-5 h-5 mr-2" />
                  Active Night Robins
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { id: '#45', name: 'Raj Kumar', area: 'CP', deliveries: 3, status: 'delivering' },
                    { id: '#23', name: 'Priya Singh', area: 'KB', deliveries: 2, status: 'available' },
                    { id: '#67', name: 'Amit Shah', area: 'LN', deliveries: 1, status: 'picking' }
                  ].map((robin, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div>
                        <div className="font-medium text-sm">{robin.name} {robin.id}</div>
                        <div className="text-xs text-gray-500">{robin.area} • {robin.deliveries} deliveries</div>
                      </div>
                      <Badge variant={robin.status === 'available' ? 'default' : 'secondary'}>
                        {robin.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}