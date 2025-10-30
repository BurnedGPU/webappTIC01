import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Importa las páginas
import Home from "./pages/Home";
import ClockConfig from "./pages/clock";
import Informacion from "./pages/informacion"; // <-- AÑADE ESTA LÍNEA

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Ruta para la página de inicio */}
                    <Route path="/" element={<Home />} />

                    {/* Ruta para la configuración del reloj */}
                    <Route path="/clock" element={<ClockConfig />} />

                    {/* Ruta para la información (dashboard) */}
                    <Route path="/informacion" element={<Informacion />} /> {/* <-- AÑADE ESTA LÍNEA */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;