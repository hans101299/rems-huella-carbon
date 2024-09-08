import React, { useState } from 'react';

const RegistroEdificio = () => {
  const [formData, setFormData] = useState({
    inmueble: '',
    direccion: '',
    distrito: '',
    fec_ini_operaciones: '',
    zona: '',
    m2_construidos: '',
    m2_ocupados: '',
    m2_comunes: '',
    clasificacion: '',
    leed: '',
    pais: '',
    latitud: '',
    longitud: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://164.68.101.193:5003/registro-edificio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error("Error en el envío:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Inmueble</label>
          <input
            type="text"
            name="inmueble"
            value={formData.inmueble}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Dirección</label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Distrito</label>
          <input
            type="text"
            name="distrito"
            value={formData.distrito}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha de inicio de operaciones</label>
          <input
            type="date"
            name="fec_ini_operaciones"
            value={formData.fec_ini_operaciones}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Zona (opcional)</label>
          <input
            type="text"
            name="zona"
            value={formData.zona}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">M2 Construidos</label>
          <input
            type="number"
            name="m2_construidos"
            value={formData.m2_construidos}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">M2 Ocupados</label>
          <input
            type="number"
            name="m2_ocupados"
            value={formData.m2_ocupados}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">M2 Comunes</label>
          <input
            type="number"
            name="m2_comunes"
            value={formData.m2_comunes}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Clasificación</label>
          <select
            name="clasificacion"
            value={formData.clasificacion}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="">Seleccione una clasificación</option>
            <option value="A+">A+</option>
            <option value="A">A</option>
            <option value="B+">B+</option>
            <option value="B">B</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">LEED</label>
          <select
            name="leed"
            value={formData.leed}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="">Seleccione un tipo de certificación</option>
            <option value="Leed Platinum">Leed Platinum</option>
            <option value="Leed Gold">Leed Gold</option>
            <option value="Leed Silver">Leed Silver</option>
            <option value="Leed Certificate">Leed Certificate</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">País</label>
          <select
            name="pais"
            value={formData.pais}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="">Seleccione un país</option>
            <option value="Perú">Perú</option>
            <option value="Ecuador">Ecuador</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Latitud</label>
          <input
            type="number"
            step="0.000001"
            name="latitud"
            value={formData.latitud}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Longitud</label>
          <input
            type="number"
            step="0.000001"
            name="longitud"
            value={formData.longitud}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
      >
        Registrar Edificio
      </button>
    </form>
  );
};

export default RegistroEdificio;
