"use client";
import { MapPin, Clock, DollarSign, Navigation, Phone, Camera, CheckCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ActiveDeliveryPage() {
  // Mock data
  const activeDelivery = {
    hotel: "Sunshine Hotel",
    address: "123 Main Street, Mumbai",
    earnings: 250,
    items: ["Burger", "Fries", "Coke"],
    customer: "John Doe",
    deliveryAddress: "456 Market Road, Mumbai",
  };

  return (
<div className="space-y-6">
      {/* Pickup Card */}
      <Card>
        <CardHeader>
          <CardTitle>Current Pickup</CardTitle>
          <CardDescription>Collect food from hotel</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-medium mb-3">Pickup Details</h5>
              <div className="space-y-2">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-[var(--green-primary)]" /> {activeDelivery.hotel}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-[var(--muted-text)]" /> {activeDelivery.address}
                </div>
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-2 text-[#22C55E]" /> ₹{activeDelivery.earnings} earnings
                </div>
              </div>

              <h5 className="font-medium mt-4 mb-2">Food Items</h5>
              <div className="space-y-1">
                {activeDelivery.items.map((item, i) => (
                  <div key={i} className="text-sm text-[var(--muted-text)]">
                    • {item}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h5 className="font-medium mb-3">Pickup Actions</h5>
              <div className="space-y-3">
                <Button className="w-full justify-start bg-[var(--green-primary)] hover:bg-[var(--green-primary-dark)]">
                  <Navigation className="w-4 h-4 mr-2" /> Get Directions
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Phone className="w-4 h-4 mr-2" /> Call Hotel
                </Button>

                <div className="border-t pt-3">
                  <h6 className="font-medium mb-2">Pickup Verification</h6>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Enter OTP from hotel"
                      className="w-full px-3 py-2 border border-border rounded-md"
                    />
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Camera className="w-4 h-4 mr-2" /> Upload Pickup Photo
                    </Button>
                    <Button className="w-full justify-start bg-[var(--green-primary)] hover:bg-[var(--green-primary-dark)]">
                      <CheckCircle className="w-4 h-4 mr-2" /> Confirm Pickup
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Delivery Card */}
      <Card>
        <CardHeader>
          <CardTitle>Next Delivery</CardTitle>
          <CardDescription>Deliver to customer</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-medium mb-3">Delivery Details</h5>
              <div className="space-y-2">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-[#FFB020]" /> {activeDelivery.customer}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-[var(--muted-text)]" /> {activeDelivery.deliveryAddress}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-[#FFB020]" /> ETA: 15 minutes
                </div>
              </div>
            </div>

            <div>
              <h5 className="font-medium mb-3">Delivery Actions</h5>
              <div className="space-y-3">
                <Button className="w-full justify-start bg-[var(--green-primary)] hover:bg-[var(--green-primary-dark)]">
                  <Navigation className="w-4 h-4 mr-2" /> Navigate to Customer
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Phone className="w-4 h-4 mr-2" /> Call Customer
                </Button>

                <div className="border-t pt-3">
                  <h6 className="font-medium mb-2">Delivery Verification</h6>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Camera className="w-4 h-4 mr-2" /> Upload Delivery Photo
                  </Button>
                  <Button className="w-full justify-start bg-[var(--green-primary)] hover:bg-[var(--green-primary-dark)]" disabled>
                    <CheckCircle className="w-4 h-4 mr-2" /> Complete Delivery
                  </Button>
                  <p className="text-xs text-[var(--muted-text)]">Complete pickup first</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
