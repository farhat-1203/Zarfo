import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/hotel/ThemeToggle";
import api from "@/lib/api";

const roles = [
  { label: "Hotel Partner", value: "hotel" },
  { label: "Customer", value: "user" },
  { label: "Night Robin (Volunteer)", value: "robin" },
  { label: "Night Worker (Recipient)", value: "worker" },
];

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-color-light)] text-[var(--text-color)] px-4 transition-colors duration-300">
      <div className="absolute top-4 right-4"><ThemeToggle /></div>

      <div className="bg-[var(--card-bg)] p-8 rounded-2xl shadow-xl w-full max-w-md transition-colors duration-300">
        <h2 className="text-2xl font-bold mb-4 text-center text-[var(--green-primary)]">Create your Zarfo Account</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
          <Input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <Input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border rounded-md p-2 text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--green-primary)]"
          >
            {roles.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>

          <Button className="w-full bg-[var(--green-primary)] hover:bg-[var(--green-dark)] text-white" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>

        <p className="text-sm text-center mt-4 text-[var(--muted-text)]">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="text-[var(--green-primary)] hover:underline cursor-pointer">
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
