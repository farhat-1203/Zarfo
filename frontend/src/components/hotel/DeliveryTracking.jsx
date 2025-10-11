import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Star, DollarSign } from "lucide-react";

export default function DeliveryTracking() {
  // Mock data
  const [activeDeliveries] = useState([
    {
      id: "101",
      type: "sale",
      status: "in_transit",
      robinName: "Robin Sharma",
      foodItems: [
        { title: "Paneer Butter Masala", quantity: 2 },
        { title: "Garlic Naan", quantity: 4 },
      ],
      deliveryAddress: "123 Main Street, Mumbai",
      scheduledTime: new Date(),
      totalAmount: 25,
    },
    {
      id: "102",
      type: "donation",
      status: "delivered",
      robinName: "Amit Kumar",
      foodItems: [
        { title: "Veg Biryani", quantity: 1 },
        { title: "Raita", quantity: 2 },
      ],
      deliveryAddress: "456 Park Avenue, Mumbai",
      scheduledTime: new Date(),
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-[var(--text-color)]">Delivery Tracking</h3>
        <Badge variant="secondary">{activeDeliveries.length} Active</Badge>
      </div>

      {/* Delivery Cards */}
      <div className="grid gap-6">
        {activeDeliveries.map((delivery) => (
          <Card
            key={delivery.id}
            className="bg-[var(--card-bg)] border border-border rounded-2xl shadow-sm hover:shadow-md transition-all duration-200"
          >
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">{`Delivery #${delivery.id}`}</CardTitle>
                  <CardDescription className="text-sm text-[var(--muted-text)]">
                    {delivery.type === "sale" ? "Sale" : "Donation"} • {delivery.robinName}
                  </CardDescription>
                </div>
                <Badge
                  variant={delivery.status === "in_transit" ? "default" : "secondary"}
                  className="capitalize"
                >
                  {delivery.status.replace("_", " ")}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Food Items */}
                <div>
                  <h5 className="font-medium mb-2 text-[var(--text-color)]">Food Items</h5>
                  <div className="space-y-1 text-sm text-[var(--muted-text)]">
                    {delivery.foodItems.map((item, idx) => (
                      <div key={idx}>
                        {item.title} (x{item.quantity})
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Details */}
                <div>
                  <h5 className="font-medium mb-2 text-[var(--text-color)]">Delivery Details</h5>
                  <div className="space-y-1 text-sm text-[var(--muted-text)]">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> {delivery.deliveryAddress}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {new Date(delivery.scheduledTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                    {delivery.type === "sale" && (
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" /> ${delivery.totalAmount}
                      </div>
                    )}
                  </div>
                </div>

                {/* Robin Info */}
                <div>
                  <h5 className="font-medium mb-2 text-[var(--text-color)]">Robin Info</h5>
                  <div className="space-y-1 text-sm text-[var(--muted-text)]">
                    <div>{delivery.robinName}</div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" /> 4.8 rating
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-3">
                    <Button variant="outline" size="sm">
                      Track Live
                    </Button>
                    <Button variant="outline" size="sm">
                      Contact
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
