import React, { useState } from 'react';

const Formulario = () => {
  const [formData, setFormData] = useState({
    edificio: '',
    mes: '',
    energia: {
      kw: '',
      montoEnergia: '',
      areaBeneficiaria: '',
    },
    agua: {
      metrosCubicos: '',
      montoAgua: '',
    },
    refrigerante: {
      recarga: '',
      tipo: '',
    },
    combustible: {
      suministro: '',
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [section, key] = name.split('.');
    if (key) {
      setFormData({
        ...formData,
        [section]: {
          ...formData[section],
          [key]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes hacer la llamada a la API con formData
    console.log('Datos del formulario:', formData);
    fetch('https://api.tuservidor.com/endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => console.log('Respuesta del servidor:', data))
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Formulario de Ingreso de Información</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Edificio</label>
          <select
            name="edificio"
            value={formData.edificio}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Seleccione un edificio</option>
            <option value="Edificio 1">Edificio 1</option>
            <option value="Edificio 2">Edificio 2</option>
          </select>
        </div>
        <div className="flex space-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Mes</label>
            <input
              type="month"
              name="mes"
              value={formData.mes}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="border-t pt-4">
          <h2 className="text-xl font-semibold mb-2">Energía</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">kW/W</label>
              <input
                type="number"
                step="0.01"
                name="energia.kw"
                value={formData.energia.kw}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Monto en S/</label>
              <input
                type="number"
                step="0.01"
                name="energia.montoEnergia"
                value={formData.energia.montoEnergia}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Área Beneficiaria</label>
              <select
                name="energia.areaBeneficiaria"
                value={formData.energia.areaBeneficiaria}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Seleccione un área</option>
                <option value="ÁREAS COMUNES">ÁREAS COMUNES</option>
                <option value="ÁREAS PRIVADAS">ÁREAS PRIVADAS</option>
              </select>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <h2 className="text-xl font-semibold mb-2">Agua</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Metros cúbicos</label>
              <input
                type="number"
                step="0.01"
                name="agua.metrosCubicos"
                value={formData.agua.metrosCubicos}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Monto en S/</label>
              <input
                type="number"
                step="0.01"
                name="agua.montoAgua"
                value={formData.agua.montoAgua}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <h2 className="text-xl font-semibold mb-2">Refrigerante</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Recarga de refrigerante (Kg)</label>
              <input
                type="number"
                step="0.01"
                name="refrigerante.recarga"
                value={formData.refrigerante.recarga}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tipo de refrigerante</label>
              <select
                name="refrigerante.tipo"
                value={formData.refrigerante.tipo}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Seleccione un tipo</option>
                <option value="Tipo 1">Tipo 1</option>
                <option value="Tipo 2">Tipo 2</option>
              </select>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <h2 className="text-xl font-semibold mb-2">Combustible</h2>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Suministro de petróleo (Galones)</label>
              <input
                type="number"
                step="0.01"
                name="combustible.suministro"
                value={formData.combustible.suministro}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Formulario;
