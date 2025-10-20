import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, IndianRupee, Leaf, Flame, Package } from "lucide-react";
import { toast } from "react-toastify";
import api from "@/lib/api";

export default function FoodListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchListings() {
    try {
      setLoading(true);
      const { data } = await api.get("/hotel/food/my-listings");
      setListings(Array.isArray(data) ? data : data?.food || []);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to fetch listings");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchListings();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40 text-[var(--muted-text)]">
        <Loader2 className="animate-spin mr-2 h-5 w-5 text-[var(--green-primary)]" />
        Loading your listings...
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="text-center py-12 text-[var(--muted-text)]">
        <Package className="w-10 h-10 mx-auto mb-2 opacity-60" />
        <p>No food listings yet.</p>
        <p className="text-sm">Add one to get started!</p>
      </div>
    );
  }

  const getCategoryBadge = (category) => {
    const base = "px-2 py-0.5 text-[10px] font-semibold rounded-md inline-flex items-center gap-1";
    switch (category?.toLowerCase()) {
      case "veg":
        return <span className={`${base} bg-green-100 text-green-700`}><Leaf className="w-3 h-3" />{category}</span>;
      case "non-veg":
        return <span className={`${base} bg-red-100 text-red-700`}><Flame className="w-3 h-3" />{category}</span>;
      case "sweet":
        return <span className={`${base} bg-pink-100 text-pink-700`}>{category}</span>;
      case "spicy":
        return <span className={`${base} bg-orange-100 text-orange-700`}>{category}</span>;
      default:
        return <span className={`${base} bg-gray-100 text-gray-700`}>{category || "Other"}</span>;
    }
  };

  const getStatusBadge = (status) => {
    const base = "px-2 py-0.5 text-[10px] font-medium rounded-md capitalize";
    switch (status) {
      case "listed_for_sale":
        return <span className={`${base} bg-blue-100 text-blue-700`}>Listed for Sale</span>;
      case "listed_for_donation":
        return <span className={`${base} bg-green-100 text-green-700`}>Listed for Donation</span>;
      case "sold":
        return <span className={`${base} bg-gray-100 text-gray-600`}>Sold</span>;
      case "donated":
        return <span className={`${base} bg-emerald-100 text-emerald-700`}>Donated</span>;
      case "wasted":
        return <span className={`${base} bg-red-100 text-red-700`}>Wasted</span>;
      default:
        return <span className={`${base} bg-gray-100 text-gray-700`}>{status || "N/A"}</span>;
    }
  };

  return (
<div className="flex flex-col gap-3">
  {listings.map((listing) => (
    <Card
      key={listing._id}
      className="flex flex-row items-start bg-[var(--card-bg)] border border-border shadow-sm hover:shadow-md rounded-xl overflow-hidden transition-all duration-200 p-3"
    >
      {/* Image */}
      <div className="relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
        {listing.photo ? (
          <img
            src={`data:image/png;base64,${listing.photo}`}
            alt={listing.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <Package className="w-8 h-8 text-muted-foreground" />
        )}
        <div className="absolute top-1 left-1">{getCategoryBadge(listing.category)}</div>
      </div>

      {/* Content */}
      <div className="flex-1 ml-4 flex flex-col justify-between h-full">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="text-base font-semibold text-[var(--text-color)]">{listing.name}</h3>
            <div className="text-right">
              {listing.sellingPrice ? (
                <div className="flex items-center text-sm font-semibold text-[var(--green-primary)]">
                  <IndianRupee className="w-4 h-4 mr-1" />
                  {listing.sellingPrice}
                </div>
              ) : (
                <span className="text-sm text-[var(--muted-text)] italic">Donation</span>
              )}
            </div>
          </div>
          {listing.description && (
            <p className="text-sm text-[var(--muted-text)] mt-1 line-clamp-2">{listing.description}</p>
          )}

          {/* Info Row */}
          <div className="mt-3 flex flex-wrap gap-3">
            <span className="px-2 py-1 bg-[var(--bg-color)] rounded-md text-[11px] font-medium">{`Qty: ${listing.quantity}`}</span>
            <span className="px-2 py-1 bg-[var(--bg-color)] rounded-md text-[11px] font-medium">{`Decision: ${listing.decision}`}</span>
            <span className="px-2 py-1 bg-[var(--bg-color)] rounded-md text-[11px] font-medium">{`Prep: ${new Date(listing.prepTime).toLocaleDateString("en-IN")}`}</span>
            <span className="px-2 py-1 bg-[var(--bg-color)] rounded-md text-[11px] font-medium">{`Expiry: ${new Date(listing.expiryTime).toLocaleDateString("en-IN")}`}</span>
          </div>
        </div>

        {/* Status + Added On */}
        <div className="mt-3 flex justify-between items-center">
          {getStatusBadge(listing.status)}
          <span className="text-[11px] text-[var(--muted-text)]">
            Added on {new Date(listing.createdAt).toLocaleDateString("en-IN")}
          </span>
        </div>
      </div>
    </Card>
  ))}
</div>
  );
}
