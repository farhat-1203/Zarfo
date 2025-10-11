import { Menu, UserCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export function Topbar({ toggleSidebar }) {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white/70 backdrop-blur-md shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">Zarfo Hotel</h1>
      </div>

      {/* Avatar */}
      <div className="relative">
        <button
          onClick={() => setProfileOpen(!profileOpen)}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <UserCircle className="w-8 h-8 text-[var(--accent-green)]" />
        </button>

        {profileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-2"
          >
            <p className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
              Profile
            </p>
            <p className="px-4 py-2 text-sm text-red-500 hover:bg-red-50 cursor-pointer">
              Logout
            </p>
          </motion.div>
        )}
      </div>
    </header>
  );
}
