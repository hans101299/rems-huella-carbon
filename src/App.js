import React from 'react';
import Formulario from './components/Formulario';
import './index.css';

function App() {
  return (
    <div className="App">
      <header className="bg-blue-600 p-4 text-white text-center">
        <h1 className="text-3xl font-bold">Huella de carbono</h1>
      </header>
      <main className="p-4">
        <Formulario />
      </main>
    </div>
  );
}

export default App;