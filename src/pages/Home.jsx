import React from "react";
import { Link } from "react-router-dom";
import viteLogo from "/vite.svg";
import reactLogo from "../assets/react.svg";

function Home() {
    return (
        <>
            <h1>Vita Dynamic Controller APP</h1>
            <h2>Configura tu dispositivo VITA MELIUS</h2>
            <div className="card">
                {/* ENVUELVE EL BOTÓN CON EL LINK */}
                <Link to="/informacion">
                    <button>Estadisticas de medicacion</button>
                </Link>
            </div>
            <div className="card">
                <Link to="/clock">
                    <button>Configuracion de reloj</button>
                </Link>
            </div>
            <h4>Powered by</h4>
            <h1>Vite + React</h1>
            <div className="card">
                <a href="https://vite.dev" target="_blank" rel="noreferrer">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank" rel="noreferrer">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
        </>
    );
}

export default Home;