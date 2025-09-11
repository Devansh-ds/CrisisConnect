import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import StatsCard from "./components/StatsCard";
import ZoneCard from "./components/ZoneCard";
import SOSTableRow, { SOSTableRowCard } from "./components/SOSTableRow";
import FilterBar from "./components/FilterBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import DisasterZonesPage from "./pages/DisasterZonesPage";
import ZonesDetailsPage from "./pages/ZonesDetailsPage";
import Navbar from "./components/Navbar";
import SOSRequestsPage from "./pages/SOSRequestsPage";

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/zones" element={<DisasterZonesPage />} />
          <Route path="/zones/:id" element={<ZonesDetailsPage />} />
          <Route path="/sos" element={<SOSRequestsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
