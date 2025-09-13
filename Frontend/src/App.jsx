import { useEffect, useState } from "react";
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
import Auth from "./pages/auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { isTokenValid } from "./Redux/Auth/isTokenValid";
import { LOGOUT } from "./Redux/Auth/ActionType";

function App() {
  const { isAuthenticated, accessToken } = useSelector((store) => store.authStore);
  const dispatch = useDispatch();

  useEffect(() => {
    if (accessToken && !isTokenValid(accessToken)) {
      dispatch({ type: LOGOUT });
    }
  }, [accessToken, dispatch]);

  return (
    <>
      {!isAuthenticated ? (
        <Auth />
      ) : (
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/zones" element={<DisasterZonesPage />} />
            <Route path="/zones/:id" element={<ZonesDetailsPage />} />
            <Route path="/sos" element={<SOSRequestsPage />} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
