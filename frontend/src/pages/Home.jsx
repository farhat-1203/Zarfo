import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-color-light)] text-[var(--text-color)] transition-colors duration-300">
      <header className="p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[var(--green-primary)]">Zarfo</h1>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button variant="ghost" onClick={() => navigate("/login")}>Login</Button>
          <Button className="bg-[var(--green-primary)] hover:bg-[var(--green-dark)] text-white" onClick={() => navigate("/register")}>
            Register
          </Button>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center text-center px-6">
        <h2 className="text-5xl font-bold mb-4 text-[var(--green-dark)]">Rescue. Redistribute. Rejoice.</h2>
        <p className="text-[var(--muted-text)] max-w-lg mb-6">
          Zarfo connects hotels, volunteers, and the needy through AI-powered food redistribution — saving food, feeding lives.
        </p>
        <Button size="lg" className="bg-[var(--green-primary)] hover:bg-[var(--green-dark)] text-white" onClick={() => navigate("/register")}>
          Get Started
        </Button>
      </main>

      <footer className="py-4 text-center text-[var(--muted-text)] text-sm border-t border-[var(--muted-text)]/20">
        © {new Date().getFullYear()} Zarfo • All rights reserved
      </footer>
    </div>
  );
}
