import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Search, 
  MapPin, 
  Clock, 
  Star,
  ShoppingCart,
  Filter,
  Heart,
  Timer,
  Utensils,
  CreditCard
} from 'lucide-react';

export default function UserApp() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const flashDeals = [
    {
      id: 1,
      name: 'Veg Biryani',
      hotel: 'Taj Restaurant',
      originalPrice: 120,
      salePrice: 60,
      distance: '0.8 km',
      rating: 4.5,
      category: 'Main Course',
      quantity: '3 kg available',
      expiresAt: '10:30 PM',
      timeLeft: '45 mins',
      image: '/api/placeholder/200/150',
      tags: ['Spicy', 'Fresh', 'Veg']
    },
    {
      id: 2,
      name: 'Paneer Butter Masala',
      hotel: 'Spice Garden',
      originalPrice: 180,
      salePrice: 80,
      distance: '1.2 km',
      rating: 4.7,
      category: 'Main Course',
      quantity: '2 kg available',
      expiresAt: '11:00 PM',
      timeLeft: '1 hr 15 mins',
      image: '/api/placeholder/200/150',
      tags: ['Creamy', 'Popular', 'Veg']
    },
    {
      id: 3,
      name: 'Chicken Tikka',
      hotel: 'Royal Kitchen',
      originalPrice: 250,
      salePrice: 120,
      distance: '0.5 km',
      rating: 4.3,
      category: 'Starter',
      quantity: '1.5 kg available',
      expiresAt: '10:00 PM',
      timeLeft: '15 mins',
      image: '/api/placeholder/200/150',
      tags: ['Grilled', 'Non-Veg', 'Protein Rich']
    },
    {
      id: 4,
      name: 'Mixed Dal',
      hotel: 'Home Kitchen',
      originalPrice: 80,
      salePrice: 35,
      distance: '2.1 km',
      rating: 4.1,
      category: 'Dal',
      quantity: '4 kg available',
      expiresAt: '12:00 AM',
      timeLeft: '2 hrs 45 mins',
      image: '/api/placeholder/200/150',
      tags: ['Healthy', 'Protein', 'Veg']
    }
  ];

  const categories = ['All', 'Main Course', 'Starter', 'Dal', 'Rice', 'Dessert', 'Beverages'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredDeals = flashDeals.filter(deal => 
    selectedCategory === 'All' || deal.category === selectedCategory
  );

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
                <h1 className="text-2xl font-bold text-gray-900">Customer App</h1>
                <p className="text-sm text-gray-600">Discover discounted surplus meals nearby</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-green-600">
                <MapPin className="w-3 h-3 mr-1" />
                Connaught Place
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search for food items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Categories */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Flash Deals Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Flash Deals</h2>
            <p className="text-sm text-gray-600">Limited time offers on surplus food</p>
          </div>
          <Badge variant="destructive" className="animate-pulse">
            <Timer className="w-3 h-3 mr-1" />
            Live Deals
          </Badge>
        </div>

        {/* Food Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDeals.map((deal) => (
            <Card key={deal.id} className="hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative">
                <div className="w-full h-48 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                  <Utensils className="w-16 h-16 text-orange-400" />
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="destructive" className="text-xs">
                    {deal.timeLeft} left
                  </Badge>
                </div>
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary" className="text-xs">
                    {Math.round(((deal.originalPrice - deal.salePrice) / deal.originalPrice) * 100)}% OFF
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{deal.name}</CardTitle>
                    <CardDescription className="text-sm">{deal.hotel}</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    {deal.rating}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {deal.distance}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-1">
                  {deal.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Quantity:</span>
                    <span className="text-sm font-medium">{deal.quantity}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Pickup by:</span>
                    <div className="flex items-center text-sm font-medium text-red-600">
                      <Clock className="w-3 h-3 mr-1" />
                      {deal.expiresAt}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-green-600">₹{deal.salePrice}</span>
                      <span className="text-sm text-gray-500 line-through">₹{deal.originalPrice}</span>
                    </div>
                  </div>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Order Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-green-600">₹2,340</div>
            <div className="text-sm text-gray-600">Saved This Month</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-blue-600">23</div>
            <div className="text-sm text-gray-600">Orders Placed</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-purple-600">4.8</div>
            <div className="text-sm text-gray-600">Avg Rating Given</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-orange-600">12 kg</div>
            <div className="text-sm text-gray-600">Food Rescued</div>
          </Card>
        </div>

        {/* Payment Methods */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="w-5 h-5 mr-2" />
              Quick Payment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Button variant="outline" size="sm">UPI</Button>
              <Button variant="outline" size="sm">Card</Button>
              <Button variant="outline" size="sm">Wallet</Button>
              <Button variant="outline" size="sm">Cash on Pickup</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}