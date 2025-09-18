import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Brain, 
  Zap, 
  TrendingUp,
  Clock,
  MapPin,
  Target,
  Activity,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Lightbulb,
  Settings,
  RefreshCw
} from 'lucide-react';

export default function AIAgent() {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const aiDecisions = [
    {
      id: 1,
      timestamp: '2 mins ago',
      foodItem: 'Veg Biryani (3kg) - Taj Restaurant',
      decision: 'Try Sell → Assign Robin',
      reasoning: 'High demand area (CP), 15 workers nearby, 89% success rate',
      status: 'executing',
      confidence: 94,
      expectedOutcome: 'Robin #45 assigned, ETA 25 mins'
    },
    {
      id: 2,
      timestamp: '5 mins ago',
      foodItem: 'Paneer Curry (2kg) - Spice Garden',
      decision: 'Sell at ₹60 (50% discount)',
      reasoning: 'Historical data shows 78% purchase rate at this price point',
      status: 'completed',
      confidence: 87,
      expectedOutcome: 'Sold to customer in 12 mins'
    },
    {
      id: 3,
      timestamp: '8 mins ago',
      foodItem: 'Mixed Dal (4kg) - Home Kitchen',
      decision: 'Direct to Night Workers',
      reasoning: 'Low commercial demand, high nutritional value for workers',
      status: 'completed',
      confidence: 91,
      expectedOutcome: 'Delivered to 8 workers successfully'
    }
  ];

  const optimizationMetrics = {
    foodSaved: 89,
    routeEfficiency: 94,
    demandPrediction: 87,
    priceOptimization: 92
  };

  const learningInsights = [
    {
      category: 'Time Patterns',
      insight: 'Peak demand for biryani between 9-11 PM',
      confidence: 95,
      impact: 'High'
    },
    {
      category: 'Location Analysis',
      insight: 'CP area has 3x higher purchase rate than KB',
      confidence: 89,
      impact: 'Medium'
    },
    {
      category: 'Food Preferences',
      insight: 'Night workers prefer dal/rice over snacks',
      confidence: 92,
      impact: 'High'
    },
    {
      category: 'Robin Performance',
      insight: 'Robin #45 has fastest delivery in CP area',
      confidence: 96,
      impact: 'Medium'
    }
  ];

  const currentProcessing = [
    {
      hotel: 'Royal Kitchen',
      item: 'Chicken Tikka (1.5kg)',
      stage: 'Analyzing demand patterns...',
      progress: 65
    },
    {
      hotel: 'Green Valley',
      item: 'Veg Pulao (2kg)',
      stage: 'Calculating optimal price...',
      progress: 40
    },
    {
      hotel: 'Taj Restaurant',
      item: 'Gulab Jamun (1kg)',
      stage: 'Matching with nearby workers...',
      progress: 85
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsProcessing(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
                <h1 className="text-2xl font-bold text-gray-900">AI Agent Brain</h1>
                <p className="text-sm text-gray-600">Smart decision making and optimization engine</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className={isProcessing ? "text-green-600 animate-pulse" : "text-blue-600"}>
                <Brain className="w-3 h-3 mr-1" />
                {isProcessing ? 'Processing' : 'Active'}
              </Badge>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Configure
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* AI Performance Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Food Saved</p>
                  <p className="text-2xl font-bold text-green-600">{optimizationMetrics.foodSaved}%</p>
                </div>
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <Progress value={optimizationMetrics.foodSaved} className="h-2 mt-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Route Efficiency</p>
                  <p className="text-2xl font-bold text-blue-600">{optimizationMetrics.routeEfficiency}%</p>
                </div>
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <Progress value={optimizationMetrics.routeEfficiency} className="h-2 mt-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Demand Prediction</p>
                  <p className="text-2xl font-bold text-purple-600">{optimizationMetrics.demandPrediction}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <Progress value={optimizationMetrics.demandPrediction} className="h-2 mt-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Price Optimization</p>
                  <p className="text-2xl font-bold text-orange-600">{optimizationMetrics.priceOptimization}%</p>
                </div>
                <Zap className="w-8 h-8 text-orange-600" />
              </div>
              <Progress value={optimizationMetrics.priceOptimization} className="h-2 mt-2" />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="decisions" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="decisions">AI Decisions</TabsTrigger>
            <TabsTrigger value="processing">Live Processing</TabsTrigger>
            <TabsTrigger value="learning">Learning Insights</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* AI Decisions Tab */}
          <TabsContent value="decisions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="w-5 h-5 mr-2" />
                  Recent AI Decisions
                </CardTitle>
                <CardDescription>
                  Real-time decision making process and outcomes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiDecisions.map((decision) => (
                    <div key={decision.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{decision.foodItem}</h4>
                          <p className="text-xs text-gray-500 mt-1">{decision.timestamp}</p>
                        </div>
                        <Badge variant={
                          decision.status === 'completed' ? 'default' :
                          decision.status === 'executing' ? 'secondary' : 'outline'
                        }>
                          {decision.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-blue-600">Decision:</span>
                          <span className="text-sm">{decision.decision}</span>
                        </div>
                        
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Reasoning:</span> {decision.reasoning}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Confidence:</span>
                          <div className="flex items-center space-x-2">
                            <Progress value={decision.confidence} className="w-20 h-2" />
                            <span className="text-sm font-medium">{decision.confidence}%</span>
                          </div>
                        </div>
                        
                        <div className="text-sm text-green-600 bg-green-50 p-2 rounded">
                          <span className="font-medium">Expected:</span> {decision.expectedOutcome}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Live Processing Tab */}
          <TabsContent value="processing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Live Processing Queue
                </CardTitle>
                <CardDescription>
                  Food items currently being analyzed by AI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentProcessing.map((item, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-sm">{item.item}</h4>
                          <p className="text-xs text-gray-500">from {item.hotel}</p>
                        </div>
                        <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">{item.stage}</p>
                        <div className="flex items-center space-x-2">
                          <Progress value={item.progress} className="flex-1 h-2" />
                          <span className="text-sm font-medium">{item.progress}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Learning Insights Tab */}
          <TabsContent value="learning" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2" />
                  AI Learning Insights
                </CardTitle>
                <CardDescription>
                  Patterns and insights discovered by the AI system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {learningInsights.map((insight, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <Badge variant="outline" className="text-xs">
                              {insight.category}
                            </Badge>
                            <Badge variant={insight.impact === 'High' ? 'destructive' : 'secondary'} className="text-xs">
                              {insight.impact} Impact
                            </Badge>
                          </div>
                          <p className="text-sm font-medium">{insight.insight}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-green-600">{insight.confidence}%</div>
                          <div className="text-xs text-gray-500">confidence</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  AI Performance Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Decision Accuracy</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Sell Decisions</span>
                        <span className="font-medium">94% success</span>
                      </div>
                      <Progress value={94} className="h-2" />
                      
                      <div className="flex justify-between text-sm">
                        <span>Robin Assignments</span>
                        <span className="font-medium">89% success</span>
                      </div>
                      <Progress value={89} className="h-2" />
                      
                      <div className="flex justify-between text-sm">
                        <span>Direct Distribution</span>
                        <span className="font-medium">97% success</span>
                      </div>
                      <Progress value={97} className="h-2" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Learning Progress</h4>
                    <div className="space-y-3">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">2,456</div>
                        <div className="text-sm text-gray-600">Decisions Made</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">156</div>
                        <div className="text-sm text-gray-600">Patterns Learned</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">98.2%</div>
                        <div className="text-sm text-gray-600">Overall Accuracy</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* AI Decision Flow */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>AI Decision Flow Process</CardTitle>
            <CardDescription>How the AI brain processes each food item</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-2">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-xs font-medium">Analyze Timing</div>
                </div>
                <div className="text-2xl text-gray-400">→</div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-2">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-xs font-medium">Check Demand</div>
                </div>
                <div className="text-2xl text-gray-400">→</div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-2">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-xs font-medium">Try Sell</div>
                </div>
                <div className="text-2xl text-gray-400">→</div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-2">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-xs font-medium">Assign Robin</div>
                </div>
                <div className="text-2xl text-gray-400">→</div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mb-2">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-xs font-medium">Fallback</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}