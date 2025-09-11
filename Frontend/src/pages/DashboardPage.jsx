import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import SOSTableRow from "../components/SOSTableRow";
import ZoneActivityChart from "../components/ZoneActivityChart";
import MapOverview from "../components/MapOverview";
import { ShieldAlert, Activity, Map as MapIcon } from "lucide-react";

function DashboardPage() {
  const statCards = [
    { title: "Total Zones", value: "12", subtitle: "Monitored areas", color: "blue", icon: "map" },
    { title: "Active Disasters", value: "3", subtitle: "Ongoing emergencies", color: "yellow", icon: "alert-triangle" },
    { title: "Critical Zones", value: "2", subtitle: "High-risk areas", color: "red", icon: "flame" },
    { title: "SOS Requests", value: "8", subtitle: "Pending responses", color: "green", icon: "life-buoy" },
  ];

  const sosRows = [
    { location: "Sector 12", message: "Building collapse - assistance needed", status: "Critical", time: "09:45 AM" },
    { location: "Sector 7", message: "Water supply disrupted", status: "Pending", time: "10:10 AM" },
    { location: "Sector 3", message: "Medical attention required", status: "Critical", time: "10:32 AM" },
    { location: "Sector 18", message: "Food distribution ongoing", status: "Resolved", time: "11:05 AM" },
    { location: "Sector 12", message: "Building collapse - assistance needed", status: "Critical", time: "09:45 AM" },
    { location: "Sector 5", message: "Communication lines down", status: "Pending", time: "11:50 AM" },
    { location: "Sector 5", message: "Communication lines down", status: "Pending", time: "11:50 AM" },
    { location: "Sector 3", message: "Medical attention required", status: "Critical", time: "10:32 AM" },
    { location: "Sector 18", message: "Food distribution ongoing", status: "Resolved", time: "11:05 AM" },
    { location: "Sector 5", message: "Communication lines down", status: "Pending", time: "11:50 AM" },
    { location: "Sector 7", message: "Water supply disrupted", status: "Pending", time: "10:10 AM" },

  ];

  const zoneActivityData = [
    { date: "2025-09-01", activeDisasters: 2, sosRequests: 12 },
    { date: "2025-09-02", activeDisasters: 3, sosRequests: 18 },
    { date: "2025-09-03", activeDisasters: 1, sosRequests: 7 },
    { date: "2025-09-04", activeDisasters: 4, sosRequests: 25 },
    { date: "2025-09-05", activeDisasters: 2, sosRequests: 10 },
    { date: "2025-09-06", activeDisasters: 3, sosRequests: 15 },
    { date: "2025-09-07", activeDisasters: 2, sosRequests: 9 },
  ];

  const sampleZones = [
    { id: 1, name: "Mumbai Flood Zone Updated", disasterType: "FLOOD", dangerLevel: "HIGH", centerLatitude: 19.08, centerLongitude: 72.88, radius: 20 },
    { id: 2, name: "Delhi Heatwave Zone", disasterType: "HEATWAVE", dangerLevel: "LOW", centerLatitude: 28.7041, centerLongitude: 77.1025, radius: 10 },
    { id: 3, name: "Chennai Cyclone Risk", disasterType: "CYCLONE", dangerLevel: "MEDIUM", centerLatitude: 13.0827, centerLongitude: 80.2707, radius: 15 },
    { id: 4, name: "Kolkata Flood Watch", disasterType: "FLOOD", dangerLevel: "LOW", centerLatitude: 22.5726, centerLongitude: 88.3639, radius: 8 },
    { id: 5, name: "Ahmedabad Heat Advisory", disasterType: "HEATWAVE", dangerLevel: "MEDIUM", centerLatitude: 23.0225, centerLongitude: 72.5714, radius: 12 },
    { id: 6, name: "Bengaluru Urban Flood", disasterType: "FLOOD", dangerLevel: "MEDIUM", centerLatitude: 12.9716, centerLongitude: 77.5946, radius: 10 },
    { id: 7, name: "Hyderabad Heatwave", disasterType: "HEATWAVE", dangerLevel: "LOW", centerLatitude: 17.385, centerLongitude: 78.4867, radius: 9 },
    { id: 8, name: "Pune Landslide Risk", disasterType: "LANDSLIDE", dangerLevel: "LOW", centerLatitude: 18.5204, centerLongitude: 73.8567, radius: 7 },
    { id: 9, name: "Jaipur Dust Storm", disasterType: "DUST_STORM", dangerLevel: "MEDIUM", centerLatitude: 26.9124, centerLongitude: 75.7873, radius: 14 },
    { id: 10, name: "Lucknow Heat Stress", disasterType: "HEATWAVE", dangerLevel: "LOW", centerLatitude: 26.8467, centerLongitude: 80.9462, radius: 6 },
    { id: 11, name: "Surat Flood Alert", disasterType: "FLOOD", dangerLevel: "HIGH", centerLatitude: 21.1702, centerLongitude: 72.8311, radius: 18 },
    { id: 12, name: "Nagpur Heat Risk", disasterType: "HEATWAVE", dangerLevel: "MEDIUM", centerLatitude: 21.1458, centerLongitude: 79.0882, radius: 11 },
    { id: 13, name: "Indore Storm Watch", disasterType: "STORM", dangerLevel: "LOW", centerLatitude: 22.7196, centerLongitude: 75.8577, radius: 9 },
    { id: 14, name: "Bhopal Floodplain", disasterType: "FLOOD", dangerLevel: "LOW", centerLatitude: 23.2599, centerLongitude: 77.4126, radius: 10 },
    { id: 15, name: "Patna River Flood", disasterType: "FLOOD", dangerLevel: "HIGH", centerLatitude: 25.5941, centerLongitude: 85.1376, radius: 16 },
  ];

  return (
    <div className="min-h-screen bg-slate-950">

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Header Section */}
        <section>
          <div className="flex items-start gap-3">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-100">Disaster Management</h1>
              <p className="mt-1 text-sm text-slate-400">Overview of active zones and SOS requests</p>
            </div>
          </div>
        </section>

        {/* Stats Overview */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map((s) => (
              <StatsCard key={s.title} title={s.title} value={s.value} subtitle={s.subtitle} color={s.color} icon={s.icon} />
            ))}
          </div>
        </section>

        {/* Two-Column Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Recent SOS Requests */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 shadow-lg overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-800 bg-slate-800/60 flex items-center gap-2">
                <Activity className="h-4 w-4 text-indigo-400" />
                <h2 className="text-sm font-semibold text-slate-100">Recent SOS Requests</h2>
              </div>
              <div className="px-4 py-2 text-xs text-slate-400">Latest emergency requests from affected areas</div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-800">
                  <thead className="bg-slate-900">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Location</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Message</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Time</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {sosRows.map((r, idx) => (
                      <SOSTableRow key={idx} {...r} onResolve={() => {}} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right: Zone Activity and Quick Actions */}
          <div>
            <ZoneActivityChart data={zoneActivityData} />
            {/* Quick Actions (separate card) */}
            <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 shadow-lg p-4">
              <div className="mb-1">
                <h2 className="text-sm font-semibold text-slate-100">Quick Actions</h2>
                <p className="text-xs text-slate-400">Common emergency response actions</p>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-2">
                <Link
                  to="/zones"
                  className="group flex items-center gap-3 rounded-xl border border-blue-900/50 bg-blue-950/40 px-3 py-2 hover:bg-blue-950/60 focus:outline-none focus:ring-2 focus:ring-blue-700/50"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-blue-300 ring-1 ring-blue-900/60">
                    <MapIcon className="h-5 w-5" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-medium text-slate-100">View All Zones</span>
                    <span className="block text-xs text-slate-400">Disaster areas</span>
                  </span>
                </Link>

                <Link
                  to="/report"
                  className="group flex items-center gap-3 rounded-xl border border-emerald-900/50 bg-emerald-950/40 px-3 py-2 hover:bg-emerald-950/60 focus:outline-none focus:ring-2 focus:ring-emerald-700/50"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-emerald-300 ring-1 ring-emerald-900/60">
                    {/* Using MapIcon as placeholder in this snippet */}
                    <MapIcon className="h-5 w-5" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-medium text-slate-100">Report SOS</span>
                    <span className="block text-xs text-slate-400">Emergency help</span>
                  </span>
                </Link>

                <Link
                  to="/contacts"
                  className="group flex items-center gap-3 rounded-xl border border-amber-900/50 bg-amber-950/40 px-3 py-2 hover:bg-amber-950/60 focus:outline-none focus:ring-2 focus:ring-amber-700/50"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-amber-300 ring-1 ring-amber-900/60">
                    <MapIcon className="h-5 w-5" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-medium text-slate-100">Emergency Contacts</span>
                    <span className="block text-xs text-slate-400">Key personnel</span>
                  </span>
                </Link>

                <Link
                  to="/sos"
                  className="group flex items-center gap-3 rounded-xl border border-indigo-900/50 bg-indigo-950/40 px-3 py-2 hover:bg-indigo-950/60 focus:outline-none focus:ring-2 focus:ring-indigo-700/50"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-indigo-300 ring-1 ring-indigo-900/60">
                    <MapIcon className="h-5 w-5" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-medium text-slate-100">All SOS Requests</span>
                    <span className="block text-xs text-slate-400">View complete</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Full-Width Map Overview */}
        <section>
          <MapOverview zones={sampleZones} />
        </section>

        {/* Footer */}
        <footer className="text-center text-sm text-slate-500 py-6">
          DisasterPWA © 2025 | Built with React + Tailwind
        </footer>
      </main>
    </div>
  );
}

export default DashboardPage;


