import React, { useState } from 'react';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import 'dayjs/locale/es';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AddIcon from '@mui/icons-material/Add';

import RefrigerantePart from './RefrigerantePart'
import EnergíaPart from './EnergiaPart';
import CombustiblePart from './CombustiblePart';
import AguaPart from './AguaPart';
import PapelPart from './PapelPart';

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
  const [refrigerantes, setRefrigerantes] = useState([1]);
  const [combustibles, setCombustibles] = useState([1]);
  const [energias, setEnergias] = useState([1]);
  const [aguas, setAguas] = useState([1]);
  const [papeles, setPapeles] = useState([1]);


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

  const handleAdd = (list, setList) => {
    const newNumber = Math.max(...list) + 1;
    setList([...list, list.length!==0?newNumber:1]);
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
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
              <DemoItem label="Mes">
                <DatePicker views={['year', 'month']} format='MMMM YYYY'/>
              </DemoItem>
            </LocalizationProvider>
          </div>
        </div>
        <h2 className="text-xl font-bold mb-4">Alcance 1: Emisiones fugitivas y combustibles</h2>
        <div className="flex place-content-between">
          <h2 className="text-xl font-semibold mb-2">Refrigerante</h2>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => handleAdd(refrigerantes,setRefrigerantes)}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <AddIcon fontSize='small'/>
            </button>
          </div>
        </div>
        {refrigerantes.map((num, index) => (
          <RefrigerantePart 
            list = {refrigerantes}
            setList = {setRefrigerantes}
            key={index}
            id = {num}/>
        ))}
        
        <div className="flex place-content-between">
          <h2 className="text-xl font-semibold mb-2">Combustible</h2>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => handleAdd(combustibles,setCombustibles)}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <AddIcon fontSize='small'/>
            </button>
          </div>
        </div>
        {combustibles.map((num, index) => (
          <CombustiblePart 
            list = {combustibles}
            setList = {setCombustibles}
            key={index}
            id = {num}/>
        ))}

        <h2 className="text-xl font-bold mb-4">Alcance 2: Consumo de electricidad</h2>

        <div className="flex place-content-between">
          <h2 className="text-xl font-semibold mb-2">Energía</h2>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => handleAdd(energias,setEnergias)}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <AddIcon fontSize='small'/>
            </button>
          </div>
        </div>
        {energias.map((num, index) => (
          <EnergíaPart
            list = {energias}
            setList = {setEnergias}
            key={index}
            id = {num}/>
        ))}
        
        
        <h2 className="text-xl font-bold mb-4">Alcance 3: Consumo de agua y otras emisiones</h2>
        <div className="flex place-content-between">
          <h2 className="text-xl font-semibold mb-2">Agua</h2>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => handleAdd(aguas,setAguas)}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <AddIcon fontSize='small'/>
            </button>
          </div>
        </div>
        {aguas.map((num, index) => (
          <AguaPart
            list = {aguas}
            setList = {setAguas}
            key={index}
            id = {num}/>
        ))}

        <div className="flex place-content-between">
          <h2 className="text-xl font-semibold mb-2">Papel</h2>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => handleAdd(papeles,setPapeles)}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <AddIcon fontSize='small'/>
            </button>
          </div>
        </div>
        {papeles.map((num, index) => (
          <PapelPart
            list = {papeles}
            setList = {setPapeles}
            key={index}
            id = {num}/>
        ))}
        

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
