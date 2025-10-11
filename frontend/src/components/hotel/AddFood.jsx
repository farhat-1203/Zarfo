import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import api from "@/lib/api";
import { toast } from "react-toastify";

const FallbackTextarea = (props) => (
  <textarea
    {...props}
    className="flex min-h-[80px] w-full rounded-md border border-input bg-[var(--card-bg)] px-3 py-2 text-sm shadow-sm outline-none ring-0 placeholder:text-[var(--muted-text)] focus-visible:ring-2 focus-visible:ring-[var(--green-primary)]"
  />
);

export default function AddFoodModal({ open, onOpenChange, onAdded }) {
  const [foodName, setFoodName] = useState("");
  const [category, setCategory] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [expiryTime, setExpiryTime] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const TextAreaComp = Textarea ? Textarea : FallbackTextarea;

  const categories = ["veg", "non-veg", "sweet", "spicy", "other"];

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", foodName);
      formData.append("category", category);
      if (prepTime) formData.append("prepTime", new Date(prepTime).toISOString());
      if (expiryTime) formData.append("expiryTime", new Date(expiryTime).toISOString());
      formData.append("quantity", quantity);
      formData.append("sellingPrice", price);
      if (imageFile) formData.append("photo", imageFile);

      const { data } = await api.post("/hotel/food/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Food listing added successfully!", { position: "top-right", autoClose: 3000 });

      onAdded?.(data);

      setFoodName("");
      setCategory("");
      setPrepTime("");
      setExpiryTime("");
      setQuantity("");
      setPrice("");
      setImageFile(null);
      onOpenChange(false);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to add food listing", { position: "top-right", autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-[var(--card-bg)] text-[var(--text-color)] transition-colors duration-300">
        <DialogHeader>
          <DialogTitle>Add Food</DialogTitle>
          <DialogDescription>Provide the details for your listing.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="food-name">Food Name</Label>
            <Input
              id="food-name"
              placeholder="e.g., Veg Biryani"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-md border border-input bg-[var(--card-bg)] px-3 py-2 text-sm shadow-sm outline-none ring-0 focus-visible:ring-2 focus-visible:ring-[var(--green-primary)]"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="prep-date">Prep Date & Time</Label>
              <Input
                id="prep-date"
                type="datetime-local"
                value={prepTime}
                onChange={(e) => setPrepTime(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="expiry-date">Expiry Date & Time</Label>
              <Input
                id="expiry-date"
                type="datetime-local"
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
                type="number"
                placeholder="e.g., 25"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Price (₹)</Label>
              <Input
                id="price"
                type="number"
                placeholder="e.g., 60"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
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
            disabled={loading}
            className="mt-2 border-0 bg-[var(--green-primary)] hover:bg-[var(--green-dark)] text-white"
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
