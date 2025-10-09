// src/pages/Home.jsx
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 to-white">
      <header className="p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-emerald-700">Zarfo</h1>
        <div className="space-x-4">
          <Button variant="ghost" onClick={() => navigate("/login")}>Login</Button>
          <Button onClick={() => navigate("/register")}>Register</Button>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center text-center px-6">
        <h2 className="text-5xl font-bold mb-4">Rescue. Redistribute. Rejoice.</h2>
        <p className="text-gray-600 max-w-lg mb-6">
          Zarfo connects hotels, volunteers, and the needy through AI-powered food redistribution — saving food, feeding lives.
        </p>
        <Button size="lg" onClick={() => navigate("/register")}>Get Started</Button>
      </main>

      <footer className="py-4 text-center text-gray-500 text-sm border-t">
        © {new Date().getFullYear()} Zarfo • All rights reserved
      </footer>
    </div>
  );
}
