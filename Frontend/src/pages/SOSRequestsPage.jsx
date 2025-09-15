import React, { useMemo, useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  AlertTriangle,
  Search,
  Filter as FilterIcon,
  MapPin,
  Info,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Mountain,
  Wind,
  Zap,
  Flame,
  CloudRain,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Cell } from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { getEveryoneSos } from "../Redux/SOS/Action";
import { toast } from "sonner";

// Colored marker icons
const redIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconRetinaUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
const yellowIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png",
  iconRetinaUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
const greenIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  iconRetinaUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const statusToIcon = (status) => {
  if (status === "PENDING") return redIcon;
  if (status === "IN_PROGRESS") return yellowIcon;
  return greenIcon; // RESOLVED
};

const statusBadge = (status) => {
  const map = {
    PENDING: "bg-red-900/30 text-red-300 ring-red-700/40",
    IN_PROGRESS: "bg-yellow-900/30 text-yellow-300 ring-yellow-700/40",
    RESOLVED: "bg-green-900/30 text-green-300 ring-green-700/40",
  };
  return `inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${map[status]}`;
};

const riskBadge = (level) => {
  const map = {
    HIGH: "bg-red-900/30 text-red-300 ring-red-700/40",
    MEDIUM: "bg-yellow-900/30 text-yellow-300 ring-yellow-700/40",
    LOW: "bg-green-900/30 text-green-300 ring-green-700/40",
  };
  return `inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${
    map[level] || "bg-slate-800 text-slate-300 ring-slate-700"
  }`;
};

const disasterIcon = (type) => {
  switch (type) {
    case "FLOOD":
      return <Droplets className="h-4 w-4 text-blue-400" />;
    case "EARTHQUAKE":
      return <Mountain className="h-4 w-4 text-orange-400" />;
    case "CYCLONE":
      return <Wind className="h-4 w-4 text-cyan-400" />;
    case "HEAT_WAVE":
      return <Zap className="h-4 w-4 text-yellow-400" />;
    case "FIRE":
      return <Flame className="h-4 w-4 text-red-400" />;
    case "LANDSLIDE":
      return <Mountain className="h-4 w-4 text-green-400" />;
    case "STORM":
      return <CloudRain className="h-4 w-4 text-purple-400" />;
    case "DROUGHT":
      return <Droplets className="h-4 w-4 text-amber-600" />;
    default:
      return <Info className="h-4 w-4 text-slate-300" />;
  }
};

// Provided sample data (normalized internally)
const sampleSosRequests = [
  {
    id: 1,
    user_id: 1,
    message: "Water has entered the building, need urgent rescue",
    latitude: 19.08,
    longitude: 72.88,
    createdAt: "2025-09-08T13:50:11.55601",
    updatedAt: "2025-09-08T14:02:01.266499",
    sosStatus: "PENDING",
    disasterZoneDto: {
      id: 1,
      name: "Mumbai Flood Zone",
      disasterType: "FLOOD",
      dangerLevel: "HIGH",
      centerLatitude: 19.08,
      centerLongitude: 72.88,
      radius: 15.5,
    },
  },
  {
    id: 2,
    user_id: 2,
    message: "Building partially submerged, need assistance",
    latitude: 28.61,
    longitude: 77.21,
    createdAt: "2025-09-09T10:00:00.000Z",
    updatedAt: "2025-09-09T10:30:00.000Z",
    sosStatus: "IN_PROGRESS",
    disasterZoneDto: {
      id: 2,
      name: "Delhi Earthquake Zone",
      disasterType: "EARTHQUAKE",
      dangerLevel: "MEDIUM",
      centerLatitude: 28.61,
      centerLongitude: 77.21,
      radius: 15,
    },
  },
  {
    id: 3,
    user_id: 3,
    message: "Trees fallen, need urgent clearing",
    latitude: 13.08,
    longitude: 80.27,
    createdAt: "2025-09-10T09:00:00.000Z",
    updatedAt: "2025-09-10T09:45:00.000Z",
    sosStatus: "PENDING",
    disasterZoneDto: {
      id: 3,
      name: "Chennai Cyclone Zone",
      disasterType: "CYCLONE",
      dangerLevel: "HIGH",
      centerLatitude: 13.08,
      centerLongitude: 80.27,
      radius: 20,
    },
  },
  {
    id: 4,
    user_id: 4,
    message: "Fire in nearby warehouse, need firefighting support",
    latitude: 18.52,
    longitude: 73.86,
    createdAt: "2025-09-10T11:00:00.000Z",
    updatedAt: "2025-09-10T11:30:00.000Z",
    sosStatus: "RESOLVED",
    disasterZoneDto: {
      id: 6,
      name: "Pune Fire Zone",
      disasterType: "FIRE",
      dangerLevel: "HIGH",
      centerLatitude: 18.52,
      centerLongitude: 73.86,
      radius: 8,
    },
  },
  {
    id: 5,
    user_id: 5,
    message: "Roads blocked due to landslide",
    latitude: 12.97,
    longitude: 77.59,
    createdAt: "2025-09-11T08:00:00.000Z",
    updatedAt: "2025-09-11T08:20:00.000Z",
    sosStatus: "PENDING",
    disasterZoneDto: {
      id: 5,
      name: "Bangalore Landslide Zone",
      disasterType: "LANDSLIDE",
      dangerLevel: "LOW",
      centerLatitude: 12.97,
      centerLongitude: 77.59,
      radius: 12,
    },
  },
];

export default function SOSRequestsPage() {
  const dispatch = useDispatch();
  const sosStore = useSelector((store) => store.sosStore);

  useEffect(() => {
    dispatch(getEveryoneSos());
  }, [dispatch]);

  // Normalize data
  const [sos, setSos] = useState([]);

  useEffect(() => {
    if (sosStore?.allSos) {
      const normalized = sosStore.allSos.map((r) => ({
        id: r.id,
        userId: r.user_id || r.userId || "Unknown",
        message: r.message,
        latitude: r.latitude,
        longitude: r.longitude,
        createdAt: r.createdAt,
        updatedAt: r.updatedAt,
        status: r.sosStatus,
        zoneId: r.disasterZoneDto?.id || null,
        zoneName: r.disasterZoneDto?.name || "No Zone",
        disasterType: r.disasterZoneDto?.disasterType || "UNKNOWN",
        dangerLevel: r.disasterZoneDto?.dangerLevel || "N/A",
      }));
      setSos(normalized);
    }
  }, [sosStore?.allSos]);

  // Filters
  const statuses = ["PENDING", "IN_PROGRESS", "RESOLVED"];
  const typeOptions = ["FLOOD", "EARTHQUAKE", "CYCLONE", "HEAT_WAVE", "LANDSLIDE", "FIRE", "STORM", "DROUGHT"];
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [zoneNameFilter, setZoneNameFilter] = useState("");
  const [zoneIdFilter, setZoneIdFilter] = useState("");

  const hasZoneFilter = zoneNameFilter.trim() !== "" || zoneIdFilter.trim() !== "";

  const filtered = useMemo(
    () =>
      (sos || []).filter((r) => {
        const matchesZoneName = !zoneNameFilter || (r.zoneName || "").toLowerCase().includes(zoneNameFilter.toLowerCase());

        const matchesZoneId = !zoneIdFilter || String(r.zoneId || "") === zoneIdFilter.trim();

        if (zoneNameFilter && !matchesZoneName) return false;
        if (zoneIdFilter && !matchesZoneId) return false;

        const matchesType = hasZoneFilter ? true : !typeFilter || r.disasterType === typeFilter;

        const matchesStatus = !statusFilter || r.status === statusFilter;

        return matchesType && matchesStatus;
      }),
    [sos, typeFilter, statusFilter, zoneNameFilter, zoneIdFilter, hasZoneFilter]
  );

  // Pagination
  const [page, setPage] = useState(1);
  const perPage = 5;
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  useEffect(() => {
    setPage(1);
  }, [typeFilter, statusFilter, zoneNameFilter, zoneIdFilter]);
  const paginated = useMemo(() => filtered.slice((page - 1) * perPage, page * perPage), [filtered, page]);

  // Analytics
  const totalCount = filtered.length;
  const byStatus = useMemo(() => statuses.map((s) => ({ name: s, value: filtered.filter((r) => r.status === s).length })), [filtered]);
  const byType = useMemo(() => typeOptions.map((t) => ({ name: t, value: filtered.filter((r) => r.disasterType === t).length })), [filtered]);
  const topZones = useMemo(() => {
    const counts = filtered.reduce((acc, r) => {
      acc[r.zoneName] = (acc[r.zoneName] || 0) + 1;
      return acc;
    }, {});
    const risks = filtered.reduce((acc, r) => {
      const rank = r.dangerLevel === "HIGH" ? 3 : r.dangerLevel === "MEDIUM" ? 2 : 1;
      acc[r.zoneName] = Math.max(acc[r.zoneName] || 0, rank);
      return acc;
    }, {});
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([zone, count]) => ({ zone, count, risk: risks[zone] === 3 ? "HIGH" : risks[zone] === 2 ? "MEDIUM" : "LOW" }));
  }, [filtered]);

  const updateStatus = (id, next) => {
    setSos((prev) => prev.map((item) => (item.id === id ? { ...item, status: next, updatedAt: new Date().toISOString() } : item)));
  };

  // Interactive filter handlers from analytics
  const setFilterStatus = (s) => setStatusFilter((prev) => (prev === s ? "" : s));
  const setFilterType = (t) => setTypeFilter((prev) => (prev === t ? "" : t));
  const clearFilters = () => {
    setTypeFilter("");
    setStatusFilter("");
    setZoneNameFilter("");
    setZoneIdFilter("");
  };

  // Horizontal bar data with percentages
  const statusTotal = byStatus.reduce((sum, s) => sum + s.value, 0) || 1;
  const statusBarData = byStatus.map((s) => ({ name: s.name, count: s.value, pct: Math.round((s.value / statusTotal) * 100) }));
  const typeTotal = byType.reduce((sum, t) => sum + t.value, 0) || 1;
  const typeBarData = byType.map((t) => ({ name: t.name, count: t.value, pct: Math.round((t.value / typeTotal) * 100) }));

  const barColorForStatus = (name) => (name === "PENDING" ? "#ef4444" : name === "IN_PROGRESS" ? "#f59e0b" : "#10b981");
  const barColorForType = (name) =>
    ({
      FLOOD: "#3b82f6",
      EARTHQUAKE: "#f59e0b",
      CYCLONE: "#06b6d4",
      HEAT_WAVE: "#fbbf24",
      FIRE: "#ef4444",
      LANDSLIDE: "#22c55e",
      STORM: "#8b5cf6",
      DROUGHT: "#b45309",
    }[name] || "#94a3b8");

  // Hover highlights
  const [hoverStatus, setHoverStatus] = useState(null);
  const [hoverType, setHoverType] = useState(null);

  const shade = (hex, factor = 0.85) => {
    const h = hex.replace("#", "");
    const r = Math.floor(parseInt(h.substring(0, 2), 16) * factor);
    const g = Math.floor(parseInt(h.substring(2, 4), 16) * factor);
    const b = Math.floor(parseInt(h.substring(4, 6), 16) * factor);
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <section className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-100">SOS Requests</h1>
            <p className="mt-1 text-sm text-slate-400">View all SOS requests across India</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                dispatch(getEveryoneSos()).then(() => {
                  if (sosStore?.allSos !== null) {
                    toast.info("All sos requests are up to date");
                  }
                });
              }}
              className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700 active:bg-indigo-900"
            >
              Refresh
            </button>
            <button
              onClick={() => {
                /* placeholder */
              }}
              className="inline-flex items-center gap-2 rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 shadow hover:bg-slate-700"
            >
              Add Request
            </button>
          </div>
        </section>

        {/* Filters */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900 shadow-lg p-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Filter by Zone Name</label>
              <input
                value={zoneNameFilter}
                onChange={(e) => setZoneNameFilter(e.target.value)}
                placeholder="e.g. Mumbai"
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Filter by Zone ID</label>
              <input
                value={zoneIdFilter}
                onChange={(e) => setZoneIdFilter(e.target.value)}
                placeholder="e.g. 1"
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Filter by Disaster Type</label>
              <select
                value={hasZoneFilter ? "" : typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                disabled={hasZoneFilter}
                className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                  hasZoneFilter
                    ? "border-slate-800 bg-slate-900 text-slate-500 cursor-not-allowed"
                    : "border-slate-800 bg-slate-950 text-slate-200 focus:ring-indigo-600"
                }`}
              >
                <option value="" className="bg-slate-900">
                  All Types
                </option>
                {typeOptions.map((t) => (
                  <option key={t} value={t} className="bg-slate-900">
                    {t}
                  </option>
                ))}
              </select>
              {hasZoneFilter && <div className="mt-1 text-[11px] text-slate-500">Type filter disabled when filtering by Zone</div>}
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Filter by Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              >
                <option value="" className="bg-slate-900">
                  All Statuses
                </option>
                {statuses.map((s) => (
                  <option key={s} value={s} className="bg-slate-900">
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200 hover:bg-slate-800"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </section>

        {/* Map section */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900 shadow-lg p-4">
          <h2 className="text-slate-100 text-xl font-bold mb-3 flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-blue-400" /> India Map Overview
          </h2>
          <div className="h-[520px] rounded-lg overflow-hidden">
            <MapContainer center={[22.5, 80]} zoom={5} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
              {filtered.map((r) => (
                <Marker key={r.id} position={[r.latitude, r.longitude]} icon={statusToIcon(r.status)}>
                  <Popup>
                    <div className="text-xs space-y-1">
                      <div className="font-semibold text-slate-900">{r.message}</div>
                      <div className="text-slate-700">User ID: {r.userId}</div>
                      <div className="text-slate-700">Zone: {r.zoneName || "Not Assigned"}</div>
                      <div className="text-slate-700">
                        Type: {r.disasterType !== "UNKNOWN" ? r.disasterType : "N/A"} • Risk: {r.dangerLevel}
                      </div>
                      <div className="text-slate-700">Status: {r.status}</div>
                      <div className="text-slate-700">{new Date(r.updatedAt).toLocaleString()}</div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
          {/* Legend */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-xs text-slate-300 bg-slate-950/60 border border-slate-800 rounded-lg p-3">
              <div className="font-semibold text-slate-200 mb-2">Status Legend</div>
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block h-3 w-3 rounded-full bg-red-500" /> Pending
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block h-3 w-3 rounded-full bg-yellow-400" /> In Progress
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block h-3 w-3 rounded-full bg-green-500" /> Resolved
                </span>
              </div>
            </div>
            <div className="text-xs text-slate-300 bg-slate-950/60 border border-slate-800 rounded-lg p-3">
              <div className="font-semibold text-slate-200 mb-2">Disaster Type Icons</div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1">{disasterIcon("FLOOD")} Flood</span>
                <span className="inline-flex items-center gap-1">{disasterIcon("EARTHQUAKE")} Earthquake</span>
                <span className="inline-flex items-center gap-1">{disasterIcon("CYCLONE")} Cyclone</span>
                <span className="inline-flex items-center gap-1">{disasterIcon("HEAT_WAVE")} Heat Wave</span>
                <span className="inline-flex items-center gap-1">{disasterIcon("FIRE")} Fire</span>
                <span className="inline-flex items-center gap-1">{disasterIcon("LANDSLIDE")} Landslide</span>
                <span className="inline-flex items-center gap-1">{disasterIcon("STORM")} Storm</span>
                <span className="inline-flex items-center gap-1">{disasterIcon("DROUGHT")} Drought</span>
              </div>
            </div>
          </div>
        </section>

        {/* Analytics with bars and rich zone cards */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left column: bars */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-slate-900 rounded-xl shadow-lg border border-slate-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-100 text-lg font-semibold">By Status</h3>
                <span className="text-xs text-slate-400">Click bar to filter</span>
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={statusBarData} layout="vertical" margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis type="number" tickFormatter={(v) => `${v}`} stroke="#94a3b8" />
                    <YAxis dataKey="name" type="category" width={100} tick={{ fill: "#cbd5e1", fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{ background: "#0f172a", border: "1px solid #334155", color: "#e2e8f0", fontSize: 12 }}
                      formatter={(v, n, p) => [`${v} (${p.payload.pct}%)`, p.payload.name]}
                    />
                    <Bar
                      dataKey="count"
                      radius={[4, 4, 4, 4]}
                      background={{ fill: "#0f172a" }}
                      cursor="pointer"
                      onClick={(d) => setFilterStatus(d.name)}
                    >
                      {statusBarData.map((entry, index) => {
                        const base = barColorForStatus(entry.name);
                        const isActive = statusFilter === entry.name;
                        return (
                          <Cell
                            key={`cell-s-${index}`}
                            fill={isActive ? base : shade(base, hoverStatus === entry.name ? 1.0 : 0.75)}
                            onMouseEnter={() => setHoverStatus(entry.name)}
                            onMouseLeave={() => setHoverStatus(null)}
                          />
                        );
                      })}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 flex items-center justify-end gap-4 text-xs text-slate-400">
                {statusBarData.map((s) => (
                  <span key={s.name} className="inline-flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: barColorForStatus(s.name) }}></span>
                    {s.name}: <span className="text-slate-300 font-medium">{s.count}</span> ({s.pct}%)
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 rounded-xl shadow-lg border border-slate-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-100 text-lg font-semibold">By Disaster Type</h3>
                <span className="text-xs text-slate-400">Click bar to filter</span>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={typeBarData} margin={{ top: 10, right: 10, left: 10, bottom: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="name" tick={{ fill: "#cbd5e1", fontSize: 11 }} angle={-20} textAnchor="end" height={50} />
                    <YAxis tick={{ fill: "#cbd5e1", fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{ background: "#0f172a", border: "1px solid #334155", color: "#e2e8f0", fontSize: 12 }}
                      formatter={(v, n, p) => [`${v} (${p.payload.pct}%)`, p.payload.name]}
                    />
                    <Bar
                      dataKey="count"
                      radius={[4, 4, 0, 0]}
                      background={{ fill: "#0f172a" }}
                      cursor="pointer"
                      onClick={(d) => setFilterType(d.name)}
                    >
                      {typeBarData.map((entry, index) => {
                        const base = barColorForType(entry.name);
                        const isActive = typeFilter === entry.name;
                        return (
                          <Cell
                            key={`cell-t-${index}`}
                            fill={isActive ? base : shade(base, hoverType === entry.name ? 1.0 : 0.75)}
                            onMouseEnter={() => setHoverType(entry.name)}
                            onMouseLeave={() => setHoverType(null)}
                          />
                        );
                      })}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-400">
                {typeBarData.map((t) => (
                  <span key={t.name} className="inline-flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded" style={{ backgroundColor: barColorForType(t.name) }}></span>
                    {t.name}: <span className="text-slate-300 font-medium">{t.count}</span> ({t.pct}%)
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right column: Top zones rich cards */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-slate-100 text-lg font-semibold">Top 5 Zones</h3>
            {topZones.map((z, idx) => (
              <div
                key={z.zone}
                className="rounded-xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-4 shadow hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-slate-100 font-semibold">
                      {idx + 1}. {z.zone}
                    </div>
                    <div className="text-slate-400 text-sm">
                      Requests: <span className="text-slate-200 font-medium">{z.count}</span>
                    </div>
                  </div>
                  <span className={`${riskBadge(z.risk)} ml-3`}>{z.risk} RISK</span>
                </div>
                {/* Mini sparkline (placeholder bars) */}
                <div className="mt-3 flex items-end gap-1 h-10">
                  {[...Array(10)].map((_, i) => {
                    const h = Math.floor((Math.sin((i + idx) * 1.3) + 1) * 20) + 5; // placeholder variability
                    return <span key={i} className="w-2 rounded bg-indigo-600/40" style={{ height: `${h}px` }}></span>;
                  })}
                </div>
              </div>
            ))}
            {topZones.length === 0 && <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 text-slate-400 text-sm">No data</div>}
          </div>
        </section>

        {/* List of SOS Requests */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900 shadow-lg p-4">
          <h2 className="text-slate-100 text-xl font-bold mb-3 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-red-400" /> Requests
          </h2>
          <div className="space-y-3">
            {paginated.map((r) => (
              <div key={r.id} className="rounded-xl border border-slate-800 bg-slate-900 p-4 shadow">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-slate-100 text-sm font-semibold">
                      {disasterIcon(r.disasterType)} <span>{r.message}</span>
                    </div>
                    <div className="text-[11px] text-slate-400">User ID: {r.userId}</div>
                    <div className="text-[11px] text-slate-400">
                      {r.zoneName !== "No Zone" ? `${r.zoneName} • ${r.disasterType}` : "Outside any zone"}
                    </div>
                    <div className="text-[11px] text-slate-500">{new Date(r.updatedAt).toLocaleString()}</div>
                    <div className="text-[11px] text-slate-400">
                      {r.zoneName !== "No Zone" ? `${r.zoneName} • ${r.disasterType}` : "Outside any zone"}
                    </div>
                    <span className={`${riskBadge(r.dangerLevel)} mt-1`}>{r.dangerLevel !== "N/A" ? `${r.dangerLevel} RISK` : "No Zone"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={statusBadge(r.status)}>{r.status}</span>
                    <select
                      value={r.status}
                      onChange={(e) => updateStatus(r.id, e.target.value)}
                      className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-200 hover:bg-slate-800"
                    >
                      {["PENDING", "IN_PROGRESS", "RESOLVED"].map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
            {paginated.length === 0 && <div className="text-slate-400 text-sm">No requests found.</div>}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-center space-x-1">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium border border-slate-700 bg-slate-900 hover:bg-slate-800 hover:text-slate-100 h-9 w-9 text-slate-300 disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {(() => {
                const pages = [];
                const max = 5;
                if (totalPages <= max) {
                  for (let i = 1; i <= totalPages; i++) pages.push(i);
                } else if (page <= 3) {
                  pages.push(1, 2, 3, 4, "...", totalPages);
                } else if (page >= totalPages - 2) {
                  pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
                } else {
                  pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
                }
                return pages;
              })().map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => typeof p === "number" && setPage(p)}
                  disabled={p === "..."}
                  className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-9 w-9 ${
                    p === page
                      ? "bg-indigo-600 text-white hover:bg-indigo-700 border border-indigo-600"
                      : "border border-slate-700 bg-slate-900 hover:bg-slate-800 hover:text-slate-100 text-slate-300"
                  } ${p === "..." ? "cursor-default" : "cursor-pointer"}`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium border border-slate-700 bg-slate-900 hover:bg-slate-800 hover:text-slate-100 h-9 w-9 text-slate-300 disabled:opacity-50"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
