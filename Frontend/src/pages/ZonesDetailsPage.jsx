import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Circle, Popup } from 'react-leaflet';
import { AlertTriangle, MapPin, Shield, Info, Droplets, Flame, Wind, Zap, CloudRain, Mountain, ArrowLeft } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const ZonesDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const zoneId = parseInt(id);

  // Sample zone data with extensive examples
  const sampleZones = [
    { id: 1, name: "Mumbai Flood Zone Updated", disasterType: "FLOOD", dangerLevel: "HIGH", centerLatitude: 19.08, centerLongitude: 72.88, radius: 20 },
    { id: 2, name: "Delhi Earthquake Zone", disasterType: "EARTHQUAKE", dangerLevel: "MEDIUM", centerLatitude: 28.61, centerLongitude: 77.21, radius: 15 },
    { id: 3, name: "Chennai Cyclone Zone", disasterType: "CYCLONE", dangerLevel: "HIGH", centerLatitude: 13.08, centerLongitude: 80.27, radius: 25 },
    { id: 4, name: "Kolkata Heat Wave Zone", disasterType: "HEAT_WAVE", dangerLevel: "MEDIUM", centerLatitude: 22.57, centerLongitude: 88.36, radius: 18 },
    { id: 5, name: "Bangalore Landslide Zone", disasterType: "LANDSLIDE", dangerLevel: "LOW", centerLatitude: 12.97, centerLongitude: 77.59, radius: 12 },
    { id: 6, name: "Pune Fire Zone", disasterType: "FIRE", dangerLevel: "HIGH", centerLatitude: 18.52, centerLongitude: 73.86, radius: 8 },
    { id: 7, name: "Hyderabad Storm Zone", disasterType: "STORM", dangerLevel: "MEDIUM", centerLatitude: 17.38, centerLongitude: 78.47, radius: 22 },
    { id: 8, name: "Ahmedabad Drought Zone", disasterType: "DROUGHT", dangerLevel: "LOW", centerLatitude: 23.02, centerLongitude: 72.57, radius: 30 },
  ];

  // Sample safety tips with extensive data
  const sampleTips = [
    { id: 1, title: "Mumbai Flood Awareness", description: "Avoid low-lying areas during monsoon. Keep emergency supplies ready.", disasterType: "FLOOD", disasterZoneId: 1 },
    { id: 2, title: "Mumbai Local Transport", description: "Do not use local trains during flooding. Use elevated roads.", disasterType: "FLOOD", disasterZoneId: 1 },
    { id: 3, title: "Mumbai Building Safety", description: "Check building drainage systems regularly. Avoid basement parking.", disasterType: "FLOOD", disasterZoneId: 1 },
      { id: 15, title: "Mumbai Flood Emergency Kit", description: "Prepare a 72-hour emergency kit with water, food, flashlight, and first aid.", disasterType: "FLOOD", disasterZoneId: 1 },
      { id: 16, title: "Mumbai Safe Evacuation Routes", description: "Know multiple evacuation routes from your home and workplace.", disasterType: "FLOOD", disasterZoneId: 1 },
      { id: 17, title: "Mumbai Electrical Safety", description: "Turn off electricity in flooded areas. Avoid using electrical appliances during floods.", disasterType: "FLOOD", disasterZoneId: 1 },
      { id: 18, title: "Mumbai Pet Safety", description: "Include pets in your emergency plan. Keep pet supplies ready.", disasterType: "FLOOD", disasterZoneId: 1 },
      { id: 19, title: "Mumbai Stay Informed", description: "Keep a battery-powered radio to receive local alerts and flood updates.", disasterType: "FLOOD", disasterZoneId: 1 },
      { id: 20, title: "Mumbai Vehicle Safety", description: "Avoid driving in flooded areas. Park vehicles on higher ground.", disasterType: "FLOOD", disasterZoneId: 1 },
     
    
    { id: 4, title: "Delhi Earthquake Preparedness", description: "Secure heavy furniture. Keep emergency kit ready with first aid supplies.", disasterType: "EARTHQUAKE", disasterZoneId: 2 },
    { id: 5, title: "Delhi Building Safety", description: "Identify safe spots in your home. Practice drop, cover, and hold drills.", disasterType: "EARTHQUAKE", disasterZoneId: 2 },
    { id: 6, title: "Chennai Cyclone Evacuation", description: "Follow evacuation orders immediately. Move to designated shelters.", disasterType: "CYCLONE", disasterZoneId: 3 },
    { id: 7, title: "Chennai Coastal Safety", description: "Avoid coastal areas during cyclone warnings. Secure boats and fishing equipment.", disasterType: "CYCLONE", disasterZoneId: 3 },
    { id: 8, title: "Kolkata Heat Protection", description: "Stay indoors during peak hours (11 AM - 4 PM). Use fans and coolers.", disasterType: "HEAT_WAVE", disasterZoneId: 4 },
    { id: 9, title: "Kolkata Hydration Tips", description: "Drink plenty of water. Avoid alcohol and caffeine during heat waves.", disasterType: "HEAT_WAVE", disasterZoneId: 4 },
    { id: 10, title: "Bangalore Landslide Prevention", description: "Avoid construction on steep slopes. Monitor soil erosion signs.", disasterType: "LANDSLIDE", disasterZoneId: 5 },
    { id: 11, title: "Pune Fire Safety", description: "Install smoke detectors. Keep fire extinguishers accessible.", disasterType: "FIRE", disasterZoneId: 6 },
    { id: 12, title: "Pune Emergency Contacts", description: "Keep fire department number (101) handy. Know nearest fire station location.", disasterType: "FIRE", disasterZoneId: 6 },
    { id: 13, title: "Hyderabad Storm Safety", description: "Stay away from windows during storms. Avoid using electrical appliances.", disasterType: "STORM", disasterZoneId: 7 },
    { id: 14, title: "Ahmedabad Water Conservation", description: "Implement rainwater harvesting. Use water-efficient appliances.", disasterType: "DROUGHT", disasterZoneId: 8 },

    { id: 101, title: "Flood Readiness Kit", description: "Pack waterproof bags, battery power bank, and dry snacks.", disasterType: "FLOOD", disasterZoneId: null },
    { id: 102, title: "Avoid Water Currents", description: "Do not walk or drive through floodwaters; 15cm can knock you down.", disasterType: "FLOOD", disasterZoneId: null },
    { id: 201, title: "Drop, Cover, Hold", description: "Practice earthquake drills monthly with your family.", disasterType: "EARTHQUAKE", disasterZoneId: null },
    { id: 202, title: "Secure Heavy Items", description: "Anchor shelves and appliances to wall studs.", disasterType: "EARTHQUAKE", disasterZoneId: null },
    { id: 301, title: "Cyclone Updates", description: "Track IMD advisories and prepare to evacuate early.", disasterType: "CYCLONE", disasterZoneId: null },
    { id: 302, title: "Trim Loose Branches", description: "Reduce debris risks by pruning weak trees.", disasterType: "CYCLONE", disasterZoneId: null },
    { id: 401, title: "Heat Wave Hydration", description: "Drink water every 20 minutes; avoid outdoor work at noon.", disasterType: "HEAT_WAVE", disasterZoneId: null },
    { id: 402, title: "Cool Rooms", description: "Use curtains and cross-ventilation to keep rooms cool.", disasterType: "HEAT_WAVE", disasterZoneId: null },
    { id: 501, title: "Landslide Awareness", description: "Identify cracks, leaning trees, and listen for unusual rumbling.", disasterType: "LANDSLIDE", disasterZoneId: null },
    { id: 502, title: "Slope Drainage", description: "Keep hillside drainage channels clear of debris.", disasterType: "LANDSLIDE", disasterZoneId: null },
    { id: 601, title: "Home Fire Plan", description: "Create two exit routes from every room and practice at night.", disasterType: "FIRE", disasterZoneId: null },
    { id: 602, title: "Electrical Safety", description: "Avoid overloading sockets; use surge protectors.", disasterType: "FIRE", disasterZoneId: null },
    { id: 701, title: "Storm Shelter Items", description: "Keep torches, radio, and spare batteries ready.", disasterType: "STORM", disasterZoneId: null },
    { id: 702, title: "Secure Loose Objects", description: "Bring in outdoor furniture before storms.", disasterType: "STORM", disasterZoneId: null },
    { id: 801, title: "Drought Conservation", description: "Fix leaks and use low-flow taps and showerheads.", disasterType: "DROUGHT", disasterZoneId: null },
    { id: 802, title: "Irrigation Timing", description: "Water plants early morning or evening to reduce evaporation.", disasterType: "DROUGHT", disasterZoneId: null },
  ];

  // Sample SOS requests (placeholder data)
  const sampleSosRequests = [
    { id: 1, message: 'Water entering ground floor, need assistance', latitude: 19.0815, longitude: 72.879, sosStatus: 'PENDING', updatedAt: '2025-09-08T14:02:01.266Z', disasterZoneDto: { id: 1 } },
    { id: 2, message: 'Elderly stuck, require boat rescue', latitude: 19.077, longitude: 72.8825, sosStatus: 'ACKNOWLEDGED', updatedAt: '2025-09-08T14:20:00.000Z', disasterZoneDto: { id: 1 } },
    { id: 3, message: 'Electrical short risk in basement parking', latitude: 19.085, longitude: 72.874, sosStatus: 'PENDING', updatedAt: '2025-09-08T14:35:00.000Z', disasterZoneDto: { id: 1 } },
    { id: 4, message: 'Road block due to fallen tree', latitude: 13.085, longitude: 80.271, sosStatus: 'RESOLVED', updatedAt: '2025-09-09T09:10:00.000Z', disasterZoneDto: { id: 3 } },
  ];

  // Local state for SOS to allow status updates
  const [allSos, setAllSos] = useState(sampleSosRequests);

  // Find the current zone or use default
  const currentZone = sampleZones.find(zone => zone.id === zoneId) || sampleZones[0];

  // Tips filters
  const localTips = sampleTips.filter(t => t.disasterZoneId === zoneId && t.disasterType === currentZone.disasterType);
  const generalTips = sampleTips.filter(t => t.disasterZoneId === null && t.disasterType === currentZone.disasterType);

  // SOS for current zone
  const sosRequests = useMemo(() => allSos.filter(s => s.disasterZoneDto?.id === currentZone.id), [allSos, currentZone.id]);

  // Pagination for tips (5 per page)
  const pageSize = 3;
  const [localPage, setLocalPage] = useState(1);
  const [generalPage, setGeneralPage] = useState(1);
  const localTotalPages = Math.max(1, Math.ceil(localTips.length / pageSize));
  const generalTotalPages = Math.max(1, Math.ceil(generalTips.length / pageSize));
  const paginatedLocalTips = useMemo(() => localTips.slice((localPage - 1) * pageSize, localPage * pageSize), [localTips, localPage]);
  const paginatedGeneralTips = useMemo(() => generalTips.slice((generalPage - 1) * pageSize, generalPage * pageSize), [generalTips, generalPage]);

  // Icons
  const getDisasterIcon = (type) => {
    switch (type) {
      case 'FLOOD': return <Droplets className="w-5 h-5 text-blue-400" />;
      case 'EARTHQUAKE': return <Mountain className="w-5 h-5 text-orange-400" />;
      case 'CYCLONE': return <Wind className="w-5 h-5 text-purple-400" />;
      case 'HEAT_WAVE': return <Zap className="w-5 h-5 text-yellow-400" />;
      case 'LANDSLIDE': return <Mountain className="w-5 h-5 text-amber-400" />;
      case 'FIRE': return <Flame className="w-5 h-5 text-red-400" />;
      case 'STORM': return <CloudRain className="w-5 h-5 text-indigo-400" />;
      case 'DROUGHT': return <Droplets className="w-5 h-5 text-cyan-400" />;
      default: return <AlertTriangle className="w-5 h-5 text-slate-300" />;
    }
  };

  const getDangerBadgeStyle = (level) => {
    switch (level) {
      case 'HIGH': return 'bg-red-900/30 text-red-300 ring-red-700/40';
      case 'MEDIUM': return 'bg-yellow-900/30 text-yellow-300 ring-yellow-700/40';
      case 'LOW': return 'bg-green-900/30 text-green-300 ring-green-700/40';
      default: return 'bg-slate-800 text-slate-300 ring-slate-700';
    }
  };

  const getDisasterBorderColor = (type) => {
    switch (type) {
      case 'FLOOD': return 'border-blue-400';
      case 'FIRE': return 'border-red-400';
      case 'EARTHQUAKE': return 'border-orange-400';
      case 'CYCLONE': return 'border-purple-400';
      case 'STORM': return 'border-indigo-400';
      case 'HEAT_WAVE': return 'border-yellow-400';
      case 'LANDSLIDE': return 'border-amber-400';
      case 'DROUGHT': return 'border-cyan-400';
      default: return 'border-slate-400';
    }
  };

  // Bright status badge for SOS
  const sosBadgeClass = (status) => {
    const map = {
      PENDING: 'bg-red-600/20 text-red-300 ring-red-500/40',
      HANDLING: 'bg-yellow-600/20 text-yellow-300 ring-yellow-500/40',
      COMPLETED: 'bg-green-600/20 text-green-300 ring-green-500/40',
      CANCELLED: 'bg-slate-600/20 text-slate-300 ring-slate-500/40',
      ACKNOWLEDGED: 'bg-yellow-600/20 text-yellow-300 ring-yellow-500/40',
      RESOLVED: 'bg-green-600/20 text-green-300 ring-green-500/40',
    };
    const base = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold ring-1 ring-inset';
    return `${base} ${map[status] || 'bg-slate-800 text-slate-300 ring-slate-700'}`;
  };

  // Pagination helpers (shadcn-like numeric)
  const getPageNumbers = (total, current) => {
    const pages = [];
    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
      return pages;
    }
    pages.push(1);
    if (current > 3) pages.push('...');
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (current < total - 2) pages.push('...');
    pages.push(total);
    return pages;
  };

  const Pagination = ({ current, total, onChange }) => (
    <div className="mt-4 flex items-center justify-center space-x-1">
      <button
        onClick={() => onChange(Math.max(1, current - 1))}
        disabled={current === 1}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium border border-slate-700 bg-slate-900 hover:bg-slate-800 hover:text-slate-100 h-9 w-9 text-slate-300 disabled:opacity-50"
      >
        ‹
      </button>
      {getPageNumbers(total, current).map((p, idx) => (
        <button
          key={idx}
          onClick={() => typeof p === 'number' && onChange(p)}
          disabled={p === '...'}
          className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-9 w-9 ${
            p === current
              ? 'bg-indigo-600 text-white hover:bg-indigo-700 border border-indigo-600'
              : 'border border-slate-700 bg-slate-900 hover:bg-slate-800 hover:text-slate-100 text-slate-300'
          } ${p === '...' ? 'cursor-default' : 'cursor-pointer'}`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onChange(Math.min(total, current + 1))}
        disabled={current === total}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium border border-slate-700 bg-slate-900 hover:bg-slate-800 hover:text-slate-100 h-9 w-9 text-slate-300 disabled:opacity-50"
      >
        ›
      </button>
    </div>
  );

  // Change SOS status handler (exclude Cancelled)
  const changeSosStatus = (id, next) => {
    setAllSos(prev => prev.map(s => s.id === id ? { ...s, sosStatus: next, updatedAt: new Date().toISOString() } : s));
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="w-full rounded-2xl shadow-lg border border-slate-800 bg-slate-900 p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={() => navigate('/zones')} className="flex items-center space-x-2 text-slate-400 hover:text-slate-100 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Back to Zones</span>
              </button>
              <div className="flex items-center space-x-2">
                {getDisasterIcon(currentZone.disasterType)}
                <h1 className="text-slate-100 text-2xl font-bold">{currentZone.name}</h1>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-slate-300 text-lg font-semibold capitalize">{currentZone.disasterType.replace('_', ' ')}</span>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${getDangerBadgeStyle(currentZone.dangerLevel)}`}>
                  {currentZone.dangerLevel} RISK
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-slate-400">
              <MapPin className="w-5 h-5" />
              <span className="text-sm">{currentZone.centerLatitude.toFixed(4)}, {currentZone.centerLongitude.toFixed(4)}</span>
            </div>
          </div>
        </div>

        {/* Full-width Map */}
        <div className="bg-slate-800 rounded-xl shadow p-6 mb-8">
          <h2 className="text-slate-100 text-2xl font-bold flex items-center mb-4">
            <MapPin className="w-6 h-6 mr-3 text-blue-400" />
            Zone Map
          </h2>
          <div className="h-96 bg-slate-800 rounded-xl overflow-hidden">
            <MapContainer center={[currentZone.centerLatitude, currentZone.centerLongitude]} zoom={11} style={{ height: '100%', width: '100%' }} className="rounded-xl">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap contributors' />
              <Marker position={[currentZone.centerLatitude, currentZone.centerLongitude]}>
                <Popup>
                  <div className="text-center">
                    <h3 className="font-semibold text-slate-900">{currentZone.name}</h3>
                    <p className="text-sm text-slate-600">{currentZone.disasterType.replace('_', ' ')}</p>
                    <p className="text-sm text-slate-600">Radius: {currentZone.radius} km</p>
                  </div>
                </Popup>
              </Marker>
              <Circle center={[currentZone.centerLatitude, currentZone.centerLongitude]} radius={currentZone.radius * 1000} pathOptions={{
                color: currentZone.dangerLevel === 'HIGH' ? '#ef4444' : currentZone.dangerLevel === 'MEDIUM' ? '#f59e0b' : '#10b981',
                fillColor: currentZone.dangerLevel === 'HIGH' ? '#fecaca' : currentZone.dangerLevel === 'MEDIUM' ? '#fef3c7' : '#d1fae5',
                fillOpacity: 0.2
              }} />
              {/* SOS markers */}
              {sosRequests.map((s) => (
                <Marker key={s.id} position={[s.latitude, s.longitude]} icon={L.icon({
                  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
                  iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
                  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
                })}>
                  <Popup>
                    <div className="space-y-1">
                      <div className="text-xs text-slate-700">{s.message}</div>
                      <div className="text-[11px] text-slate-500">{s.latitude.toFixed(4)}, {s.longitude.toFixed(4)}</div>
                      <div className="text-[11px] text-slate-500">{s.sosStatus} • {new Date(s.updatedAt).toLocaleString()}</div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* Tips two columns below */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Local Tips */}
          <div className="bg-slate-800 rounded-xl shadow p-6 flex flex-col min-h-80">
            <h2 className="text-slate-100 text-2xl font-bold flex items-center mb-6">
              <Shield className="w-6 h-6 mr-3 text-yellow-400" />
              Local Safety Tips
            </h2>
            <div className="space-y-4">
              {paginatedLocalTips.map((tip) => (
                <div key={tip.id} className={`bg-slate-800 hover:bg-slate-700 transition rounded-xl shadow p-4 border-l-4 ${getDisasterBorderColor(tip.disasterType)}`}>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">{getDisasterIcon(tip.disasterType)}</div>
                    <div className="flex-1">
                      <h3 className="text-slate-300 text-lg font-semibold mb-2">{tip.title}</h3>
                      <p className="text-slate-400 text-sm">{tip.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-auto">
              <Pagination current={localPage} total={localTotalPages} onChange={setLocalPage} />
            </div>
          </div>

          {/* Right: General Tips */}
          <div className="bg-slate-800 rounded-xl shadow p-6 flex flex-col min-h-80">
            <h2 className="text-slate-100 text-2xl font-bold flex items-center mb-6">
              <Info className="w-6 h-6 mr-3 text-green-400" />
              General Safety Tips
            </h2>
            <div className="space-y-4">
              {paginatedGeneralTips.map((tip) => (
                <div key={tip.id} className={`bg-slate-800 hover:bg-slate-700 transition rounded-xl shadow p-4 border-l-4 ${getDisasterBorderColor(tip.disasterType)}`}>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0"><Info className="w-5 h-5 text-green-400" /></div>
                    <div className="flex-1">
                      <h3 className="text-slate-300 text-lg font-semibold mb-2">{tip.title}</h3>
                      <p className="text-slate-400 text-sm">{tip.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-auto">
              <Pagination current={generalPage} total={generalTotalPages} onChange={setGeneralPage} />
            </div>
          </div>
        </div>

        {/* SOS Requests List under tips */}
        <div className="mt-8 bg-slate-800 rounded-xl shadow p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-slate-100 text-2xl font-bold flex items-center">
              <AlertTriangle className="w-6 h-6 mr-3 text-red-400" />
              SOS Requests
            </h2>
            <button className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700">View All SOS Requests</button>
          </div>
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {sosRequests.length === 0 && (
              <div className="text-slate-400 text-sm">No SOS requests in this zone.</div>
            )}
            {sosRequests.map((s) => (
              <div key={s.id} className="rounded-lg border-l-4 border-red-500 bg-slate-900/60 p-4 shadow hover:bg-slate-900">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs text-slate-300">{s.message}</div>
                    <div className="text-[11px] text-slate-400 mt-1">{s.latitude.toFixed(4)}, {s.longitude.toFixed(4)}</div>
                    <div className="text-[11px] text-slate-400 mt-1">{s.sosStatus} • {new Date(s.updatedAt).toLocaleString()}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={sosBadgeClass(s.sosStatus)}>{s.sosStatus}</span>
                    <select
                      className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-200 hover:bg-slate-800"
                      value={s.sosStatus}
                      onChange={(e) => changeSosStatus(s.id, e.target.value)}
                    >
                      {['PENDING','HANDLING','COMPLETED'].map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Zone Information Stats */}
        <div className="mt-8">
          <h2 className="text-slate-100 text-2xl font-bold flex items-center mb-6">
            <AlertTriangle className="w-6 h-6 mr-3 text-slate-400" />
            Zone Statistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-700/30 rounded-xl p-6 hover:from-blue-900/30 hover:to-blue-800/20 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-slate-100">{currentZone.radius} km</div>
                  <div className="text-slate-400 text-sm mt-1">Affected Radius</div>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <MapPin className="w-8 h-8 text-blue-400" />
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-900/20 to-yellow-800/10 border border-yellow-700/30 rounded-xl p-6 hover:from-yellow-900/30 hover:to-yellow-800/20 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-slate-100">{localTips.length}</div>
                  <div className="text-slate-400 text-sm mt-1">Local Safety Tips</div>
                </div>
                <div className="p-3 bg-yellow-500/20 rounded-lg">
                  <Shield className="w-8 h-8 text-yellow-400" />
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-900/20 to-green-800/10 border border-green-700/30 rounded-xl p-6 hover:from-green-900/30 hover:to-green-800/20 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-slate-100">{generalTips.length}</div>
                  <div className="text-slate-400 text-sm mt-1">General Safety Tips</div>
                </div>
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <Info className="w-8 h-8 text-green-400" />
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-rose-900/20 to-rose-800/10 border border-rose-700/30 rounded-xl p-6 hover:from-rose-900/30 hover:to-rose-800/20 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-slate-100">{sosRequests.length}</div>
                  <div className="text-slate-400 text-sm mt-1">SOS Requests</div>
                </div>
                <div className="p-3 bg-rose-500/20 rounded-lg">
                  <AlertTriangle className="w-8 h-8 text-rose-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZonesDetailsPage;
