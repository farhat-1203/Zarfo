import { useState } from "react";
import { MapPin, Clock, Target } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function SelectRoutePage({ onStartRoute }) {
  const [selectedRoute, setSelectedRoute] = useState(null);

  const availableRoutes = [
    {
      id: "route001",
      hotels: ["The Taj Palace", "ITC Maurya"],
      recipients: ["Night Shelter A", "Community Kitchen B"],
      estimatedEarnings: 380,
      estimatedTime: "1 hr 25 mins",
      difficulty: "Moderate",
      priority: "High",
    },
    {
      id: "route002",
      hotels: ["The Leela", "JW Marriott"],
      recipients: ["Worker Camp Sector 45"],
      estimatedEarnings: 250,
      estimatedTime: "45 mins",
      difficulty: "Easy",
      priority: "Normal",
    },
  ];

  return (
    <div >
      <div className="flex justify-between items-center mb-6">
        <Badge variant="secondary" className="bg-[var(--green-primary)]/10 text-[var(--green-primary)]">
          {availableRoutes.length} routes available
        </Badge>
      </div>

      <div className="grid gap-6">
        {availableRoutes.map((route) => (
          <Card
            key={route.id}
            className={`transition border rounded-2xl ${
              selectedRoute === route.id ? "ring-2 ring-[var(--green-primary)]" : ""
            }`}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">Route #{route.id.slice(-3).toUpperCase()}</CardTitle>
                  <CardDescription className="text-sm text-[var(--muted-text)]">
                    {route.hotels.length} pickup{route.hotels.length > 1 ? "s" : ""} •{" "}
                    {route.recipients.length} delivery{route.recipients.length > 1 ? "ies" : "y"}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[var(--green-primary)]">₹{route.estimatedEarnings}</div>
                  <div className="text-sm text-[var(--muted-text)]">Est. earnings</div>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <h5 className="font-medium mb-2 flex items-center">
                    <MapPin className="w-4 h-4 text-[var(--green-primary)] mr-2" /> Pickup Locations
                  </h5>
                  {route.hotels.map((hotel, i) => (
                    <div key={i} className="text-sm text-[var(--muted-text)] flex items-center">
                      <MapPin className="w-3 h-3 mr-1 text-[var(--green-primary)]" /> {hotel}
                    </div>
                  ))}
                </div>

                <div>
                  <h5 className="font-medium mb-2 flex items-center">
                    <MapPin className="w-4 h-4 text-[#FFB020] mr-2" /> Delivery Locations
                  </h5>
                  {route.recipients.map((r, i) => (
                    <div key={i} className="text-sm text-[var(--muted-text)] flex items-center">
                      <MapPin className="w-3 h-3 mr-1 text-[#FFB020]" /> {r}
                    </div>
                  ))}
                </div>

                <div>
                  <h5 className="font-medium mb-2 flex items-center">
                    <Target className="w-4 h-4 text-[#F87171] mr-2" /> Route Details
                  </h5>
                  <div className="space-y-1 text-sm text-[var(--muted-text)]">
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1 text-[#FFB020]" /> {route.estimatedTime}
                    </div>
                    <div className="flex items-center">
                      <Target className="w-3 h-3 mr-1 text-[#F87171]" /> {route.difficulty}
                    </div>
                    <Badge
                      variant={route.priority === "High" ? "destructive" : "secondary"}
                      className="text-xs"
                    >
                      {route.priority} Priority
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant={selectedRoute === route.id ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setSelectedRoute(route.id)}
                >
                  {selectedRoute === route.id ? "Selected" : "Select Route"}
                </Button>
                <Button variant="outline">View Map</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedRoute && (
        <div className="mt-6">
          <Button size="lg" onClick={() => onStartRoute(selectedRoute)} className="bg-[var(--green-primary)]">
            Start Route
          </Button>
        </div>
      )}
    </div>
  );
}
