import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { AnimatePresence } from "framer-motion";

//components
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";

//pages
import Home from "./pages/Home";
import Games from "./pages/Games";
import GameDetails from "./pages/GameDetails";

function App() {
  return (
    <Router>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/games" element={<Games />}></Route>
        <Route path="/game-details/:gameId" element={<GameDetails />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
