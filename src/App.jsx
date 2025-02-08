import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";

export default function App() {
  const [showNav, setShowNav] = useState(true);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.startsWith("/admin")) {
      setShowNav(false);
    }
  }, [location]);
  return (
    <>
      {showNav && <Navbar />}
      <main className="max-w-5xl   mx-auto px-4 py-4 min-h-screen font-primary">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
