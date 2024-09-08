import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Formulario from './components/Formulario';
import RegistroEdificio from './pages/RegistroEdificio';  // Tu nueva página
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="bg-black p-4 text-white text-center">
          <nav className="space-x-4">
            <Link 
              to="/" 
              className="hover:bg-white hover:text-black px-4 py-2 rounded transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
            >
              Inicio
            </Link>
            <Link 
              to="/RegistroEdificio" 
              className="hover:bg-white hover:text-black px-4 py-2 rounded transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
            >
              Registrar Edificio nuevo
            </Link>
          </nav>
          <h1 className="text-3xl font-bold mt-5">Huella de carbono</h1>
        </header>
        <main className="p-4">
          <Routes>
            <Route path="/" element={<Formulario />} />
            <Route path="/RegistroEdificio" element={<RegistroEdificio />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;