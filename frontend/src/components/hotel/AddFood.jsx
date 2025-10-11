import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea" 
const FallbackTextarea = (props) => (
  <textarea
    {...props}
    className={
      "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none ring-0 placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
    }
  />
)

export default function AddFoodModal({ open, onOpenChange }) {
  const [foodName, setFoodName] = useState("")
  const [category, setCategory] = useState("")
  const [prepTime, setPrepTime] = useState("")
  const [expiryTime, setExpiryTime] = useState("")
  const [quantity, setQuantity] = useState("")
  const [price, setPrice] = useState("")
  const [imageFile, setImageFile] = useState(null)
  const [showAI, setShowAI] = useState(false)

  useEffect(() => {
    setShowAI(Boolean(foodName.trim()))
  }, [foodName])

  function handleSubmit(e) {
    e.preventDefault()
    // Placeholder submit: no backend yet
    setShowAI(true)
  }

  const TextAreaComp = Textarea ? Textarea : FallbackTextarea

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Food</DialogTitle>
          <DialogDescription>Provide the details for your listing.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="food-name">Food name & category</Label>
            <Input
              id="food-name"
              placeholder="e.g., Veg Biryani"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
            />
            <Input
              placeholder="Category (e.g., Main Course)"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="prep-time">Prep time</Label>
              <Input
                id="prep-time"
                placeholder="e.g., 7:45 PM"
                value={prepTime}
                onChange={(e) => setPrepTime(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="expiry-time">Expiry time</Label>
              <Input
                id="expiry-time"
                placeholder="e.g., 10:30 PM"
                value={expiryTime}
                onChange={(e) => setExpiryTime(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="grid gap-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                placeholder="e.g., 25"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Price (₹)</Label>
              <Input id="price" placeholder="e.g., 60" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <TextAreaComp id="notes" placeholder="Any additional info..." />
          </div>

          <Button
            type="submit"
            className="mt-2 border-0"
            style={{
              backgroundImage: "linear-gradient(90deg, var(--color-brand-green), var(--color-brand-pink))",
              color: "var(--color-on-brand)",
            }}
          >
            Submit
          </Button>
        </form>

        {showAI && (
          <div className="mt-4 rounded-md border p-3">
            <div className="text-sm font-medium">AI Suggestions (mock)</div>
            <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
              <li>Sell at ₹60 till 10 PM</li>
              <li>Assign Night Robin by 10:15 PM</li>
            </ul>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
