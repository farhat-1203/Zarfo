import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-white px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-emerald-700">Create your Zarfo Account</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
          <Input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <Input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border rounded-md p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {roles.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>

          <Button className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="text-emerald-700 hover:underline cursor-pointer">
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
