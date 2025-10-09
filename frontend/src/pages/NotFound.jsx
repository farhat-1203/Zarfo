// src/pages/NotFound.jsx
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Home as HomeIcon } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-center px-4">
      <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-muted-foreground mb-6">
        The page you’re looking for doesn’t exist or may have been moved.
      </p>
      <Button onClick={() => navigate("/")} className="flex items-center gap-2">
        <HomeIcon className="w-4 h-4" /> Go Home
      </Button>
    </div>
  );
}
