import React, { useState } from "react";
import { Menu, User, LogOut, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { LOGOUT } from "../Redux/Auth/ActionType";
import { useDispatch, useSelector } from "react-redux";

function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const { email } = useSelector((store) => store.authStore);

  const linkBase = "inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium";
  const active = "bg-white/20 text-white";
  const inactive = "text-white/90 hover:bg-white/15";

  return (
    <nav className="sticky top-0 z-9999 w-full border-b border-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Menu className="h-5 w-5 text-white/90 sm:hidden" />
            <span className="text-lg sm:text-xl font-semibold tracking-tight text-white">DISASTER PWA</span>
            <div className="hidden sm:flex items-center gap-2 ml-4">
              <Link to="/" className={`${linkBase} ${location.pathname === "/" ? active : inactive}`}>
                Dashboard
              </Link>
              <Link to="/zones" className={`${linkBase} ${location.pathname.startsWith("/zones") ? active : inactive}`}>
                Disaster Zones
              </Link>
              <Link to="/sos" className={`${linkBase} ${location.pathname.startsWith("/sos") ? active : inactive}`}>
                SOS Requests
              </Link>
            </div>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm text-white shadow-sm ring-1 ring-white/20 hover:bg-white/15"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-blue-700 text-xs font-semibold">
                {email[0].toUpperCase()}
              </span>
              <span className="hidden sm:inline">{email.split("@")[0].toUpperCase()}</span>
              <ChevronDown className="h-4 w-4 text-white/90" />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-40 origin-top-right rounded-lg border border-gray-200 bg-white py-1.5 shadow-lg">
                <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <User className="h-4 w-4" /> Profile
                </button>
                <button
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  onClick={() => dispatch({ type: LOGOUT })}
                >
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
