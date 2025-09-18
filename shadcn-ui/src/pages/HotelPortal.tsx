import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Upload, 
  Clock, 
  DollarSign,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Camera,
  Bot,
  BarChart3,
  Calendar
} from 'lucide-react';

export default function HotelPortal() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [aiSuggestion, setAiSuggestion] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Simulate AI analysis
      setTimeout(() => setAiSuggestion(true), 1500);
    }
  };

  const listings = [
    {
      id: 1,
      name: 'Veg Biryani',
      category: 'Main Course',
      quantity: '3 kg',
      prepTime: '8:30 PM',
      expiry: '2:00 AM',
      status: 'active',
      price: '₹60',
      aiAction: 'Sell till 10 PM'
    },
    {
      id: 2,
      name: 'Paneer Butter Masala',
      category: 'Main Course',
      quantity: '2 kg',
      prepTime: '7:45 PM',
      expiry: '1:30 AM',
      status: 'assigned',
      price: '₹45',
      aiAction: 'Robin assigned'
    },
    {
      id: 3,
      name: 'Mixed Vegetables',
      category: 'Side Dish',
      quantity: '1.5 kg',
      prepTime: '9:15 PM',
      expiry: '3:00 AM',
      status: 'completed',
      price: '₹30',
      aiAction: 'Delivered'
    }
  ];

  const monthlyStats = {
    foodSaved: '145 kg',
    mealsServed: '580',
    csrValue: '₹12,450',
    wasteReduction: '85%'
  };

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
                <h1 className="text-2xl font-bold text-gray-900">Hotel Portal</h1>
                <p className="text-sm text-gray-600">Manage food listings and track CSR impact</p>
              </div>
            </div>
            <Badge variant="outline" className="text-green-600">
              <CheckCircle className="w-3 h-3 mr-1" />
              Verified Hotel
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="list">List Food</TabsTrigger>
            <TabsTrigger value="manage">Manage Listings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* List Food Tab */}
          <TabsContent value="list" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="w-5 h-5 mr-2" />
                  List New Food Item
                </CardTitle>
                <CardDescription>
                  Upload food details and let our AI suggest optimal pricing and distribution
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Photo Upload */}
                <div className="space-y-2">
                  <Label htmlFor="photo">Food Photo</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      id="photo"
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <label htmlFor="photo" className="cursor-pointer">
                      <Camera className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-sm text-gray-600">
                        {selectedFile ? selectedFile.name : 'Click to upload food photo'}
                      </p>
                    </label>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Food Name</Label>
                      <Input id="name" placeholder="e.g., Veg Pulao" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="main">Main Course</SelectItem>
                          <SelectItem value="side">Side Dish</SelectItem>
                          <SelectItem value="dessert">Dessert</SelectItem>
                          <SelectItem value="snacks">Snacks</SelectItem>
                          <SelectItem value="beverages">Beverages</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input id="quantity" placeholder="e.g., 3 kg" />
                    </div>
                  </div>

                  {/* Timing & Pricing */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="prep-time">Preparation Time</Label>
                      <Input id="prep-time" type="time" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="expiry">Good Till</Label>
                      <Input id="expiry" type="time" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="price">Original Price (Optional)</Label>
                      <Input id="price" placeholder="₹100" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Additional Notes</Label>
                  <Textarea 
                    id="description" 
                    placeholder="e.g., Spicy level, allergen information, special ingredients"
                    rows={3}
                  />
                </div>

                {/* AI Suggestions */}
                {aiSuggestion && (
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="pt-6">
                      <div className="flex items-start space-x-3">
                        <Bot className="w-6 h-6 text-blue-600 mt-1" />
                        <div className="space-y-2">
                          <h4 className="font-medium text-blue-900">AI Recommendations</h4>
                          <div className="space-y-1 text-sm text-blue-800">
                            <p>• Sell at ₹60 till 10:00 PM (high demand area)</p>
                            <p>• Assign Night Robin by 10:15 PM if unsold</p>
                            <p>• Expected pickup time: 10:30-11:00 PM</p>
                            <p>• 15 workers nearby need food tonight</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Button className="w-full">
                  <Upload className="w-4 h-4 mr-2" />
                  List Food Item
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Manage Listings Tab */}
          <TabsContent value="manage" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Listings</CardTitle>
                <CardDescription>Track and manage your active food listings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {listings.map((listing) => (
                    <div key={listing.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                          <Camera className="w-6 h-6 text-gray-400" />
                        </div>
                        <div>
                          <h4 className="font-medium">{listing.name}</h4>
                          <p className="text-sm text-gray-600">{listing.category} • {listing.quantity}</p>
                          <p className="text-xs text-gray-500">
                            Prep: {listing.prepTime} | Expires: {listing.expiry}
                          </p>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <div className="flex items-center space-x-2">
                          <Badge variant={
                            listing.status === 'active' ? 'default' :
                            listing.status === 'assigned' ? 'secondary' : 'outline'
                          }>
                            {listing.status}
                          </Badge>
                          <span className="font-medium">{listing.price}</span>
                        </div>
                        <p className="text-xs text-gray-500">{listing.aiAction}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Food Saved</p>
                      <p className="text-2xl font-bold text-green-600">{monthlyStats.foodSaved}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Meals Served</p>
                      <p className="text-2xl font-bold text-blue-600">{monthlyStats.mealsServed}</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">CSR Value</p>
                      <p className="text-2xl font-bold text-purple-600">{monthlyStats.csrValue}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Waste Reduction</p>
                      <p className="text-2xl font-bold text-orange-600">{monthlyStats.wasteReduction}</p>
                    </div>
                    <Calendar className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Monthly CSR Impact Report</CardTitle>
                <CardDescription>Your contribution to reducing food waste and feeding the community</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <span className="font-medium">Environmental Impact</span>
                    <span className="text-green-600">145 kg CO₂ saved</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                    <span className="font-medium">Social Impact</span>
                    <span className="text-blue-600">580 people fed</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                    <span className="font-medium">Economic Impact</span>
                    <span className="text-purple-600">₹12,450 value recovered</span>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  Download Detailed CSR Report
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}