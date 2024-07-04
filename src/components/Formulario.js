import React, { useState, useEffect } from 'react';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import 'dayjs/locale/es';
import dayjs from 'dayjs';
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
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [dayJSItem, setDayJSItem] = useState(dayjs(''));
  const [edificios, setEdificios] = useState([]);
  const [formData, setFormData] = useState({
    edificio:'',
    mes:dayjs(''),
    refrigerante:[
      {
        id:1,
        data:{
          emision_fugitiva:'Refrigerantes',
          recarga:'',
          tipo:'',
          area_beneficiaria:''
        }
      }
    ],combustible:[
      {
        id:1,
        data:{
          fuente:'Diesel',
          suministro_petroleo:'',
          equipo_beneficiario:''
        }
      }
    ], energia:[
      {
        id:1,
        data:{
          kw_h:'',
          monto:'',
          area_beneficiaria:'',
          suministro:''
        }
      }
    ], agua:[
      {
        id:1,
        data:{
          m3:'',
          monto:'',
          area_beneficiaria:'',
          suministro:''
        }
      }
    ],papel:[
      {
        id:1,
        data:{
          cantidad:'',
          densidad:'',
          area:''
        }
      }
    ]});

    useEffect(() => {
      const fetchEdificios = async () => {
      const response = await fetch('http://164.68.101.193:5003/edificios');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setEdificios(data);
        
      };
  
      fetchEdificios();
    }, []);

  const handleAdd = (tipo) => {
    const newID = getMaxValue(formData[tipo],'id')+1;
    console.log(newID)
    if (tipo === "refrigerante"){
      setFormData(
        {
          ...formData,
          [tipo]:[
            ...formData[tipo],
            {
              id:newID,
              data:{
                emision_fugitiva:'Refrigerantes',
                recarga:'',
                tipo:'',
                area_beneficiaria:''
              }
            }
          ]
        });
    }
    else if (tipo === "combustible"){
      setFormData(
        {
          ...formData,
          [tipo]:[
            ...formData[tipo],
            {
              id:newID,
              data:{
                fuente:'Diesel',
                suministro_petroleo:'',
                equipo_beneficiario:''
              }
            }
          ]
        });
    }
    else if (tipo === "energia"){
      setFormData(
        {
          ...formData,
          [tipo]:[
            ...formData[tipo],
            {
              id:newID,
              data:{
                kw_h:'',
                monto:'',
                area_beneficiaria:'',
                suministro:''
              }
            }
          ]
        });
    }
    else if (tipo === "agua"){
      setFormData(
        {
          ...formData,
          [tipo]:[
            ...formData[tipo],
            {
              id:newID,
              data:{
                m3:'',
                monto:'',
                area_beneficiaria:'',
                suministro:''
              }
            }
          ]
        });
    }
    else if (tipo === "papel"){
      setFormData(
        {
          ...formData,
          [tipo]:[
            ...formData[tipo],
            {
              id: newID,
              data:{
                cantidad:'',
                densidad:'',
                area:''
              }
            }
          ]
        });
    }
  };


  const filteredOptions = edificios.filter((option) =>
    option.inmueble.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionClick = (value) => {
    setSearchTerm(value.inmueble);
    setIsOpen(false);
    setFormData({
      ...formData,
      edificio: value.id,
    });
  };

  const getMaxValue = (arr, field) => {
    return Math.max(...arr.map(o => o[field]), 0);
  };

  const handleChangeMes = (value) => {
    setDayJSItem(value);
    setFormData({
      ...formData,
      mes: value.format("YYYYMM"),
    });
  };

  const handleChangeData = (e, id) => {
    const { name, value } = e.target;
    const [section, key] = name.split('.');
    const index = formData[section].findIndex(item => item.id === id);

    const updated = {
      ...formData[section][index],
      data: {
        ...formData[section][index].data,
        [key]: value
      }
    };

    const updatedArray = [
      ...formData[section].slice(0, index),
      updated,
      ...formData[section].slice(index + 1)
    ];

    setFormData({
      ...formData,
      [section]: updatedArray
    });
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRemove = (section, id) => {
    const updatedArray = formData[section].filter(item => item.id !== id);
  
    setFormData({
      ...formData,
      [section]: updatedArray
    });
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes hacer la llamada a la API con formData
    console.log('Datos del formulario:', formData);
    fetch('http://164.68.101.193:5003/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => alert("Registro insertado correctamente."))
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Formulario de Ingreso de Información</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-6">
          <label htmlFor="select" className="block text-gray-700 font-bold mb-2">
            Edificio:
          </label>
          <input
            type="text"
            placeholder="Buscar o seleccionar..."
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setTimeout(() => setIsOpen(false), 200)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {isOpen && (
            <div className="absolute z-10 bg-white border rounded w-full mt-1 overflow-y-auto max-h-80 max-w-sm">
              {filteredOptions.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className="cursor-pointer hover:bg-gray-100 py-1 px-3"
                >
                  {option.inmueble}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex space-x-4">
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
              <DemoItem label="Mes">
                <DatePicker views={['year', 'month']} format='MMMM YYYY'
                name='mes'
                value={dayJSItem}
                onChange={(newValue) => handleChangeMes(newValue)}/>
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
              onClick={() => handleAdd('refrigerante')}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <AddIcon fontSize='small'/>
            </button>
          </div>
        </div>
        {formData.refrigerante.map((elemento, index) => (
          <RefrigerantePart 
            data = {elemento.data}
            handleChangeData = {handleChangeData}
            handleRemove = {handleRemove}
            key={index}
            id = {elemento.id}/>
        ))}
        
        <div className="flex place-content-between">
          <h2 className="text-xl font-semibold mb-2">Combustible</h2>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => handleAdd('combustible')}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <AddIcon fontSize='small'/>
            </button>
          </div>
        </div>
        {formData.combustible.map((elemento, index) => (
          <CombustiblePart 
            data = {elemento.data}
            handleChangeData = {handleChangeData}
            handleRemove = {handleRemove}
            key={index}
            id = {elemento.id}/>
        ))}

        <h2 className="text-xl font-bold mb-4">Alcance 2: Consumo de electricidad</h2>

        <div className="flex place-content-between">
          <h2 className="text-xl font-semibold mb-2">Energía</h2>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => handleAdd('energia')}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <AddIcon fontSize='small'/>
            </button>
          </div>
        </div>
        {formData.energia.map((elemento, index) => (
          <EnergíaPart
            data = {elemento.data}
            handleChangeData = {handleChangeData}
            handleRemove = {handleRemove}
            key={index}
            id = {elemento.id}/>
        ))}
        
        
        <h2 className="text-xl font-bold mb-4">Alcance 3: Consumo de agua y otras emisiones</h2>
        <div className="flex place-content-between">
          <h2 className="text-xl font-semibold mb-2">Agua</h2>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => handleAdd('agua')}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <AddIcon fontSize='small'/>
            </button>
          </div>
        </div>
        {formData.agua.map((elemento, index) => (
          <AguaPart
            data = {elemento.data}
            handleChangeData = {handleChangeData}
            handleRemove = {handleRemove}
            key={index}
            id = {elemento.id}/>
        ))}

        <div className="flex place-content-between">
          <h2 className="text-xl font-semibold mb-2">Papel</h2>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => handleAdd('papel')}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <AddIcon fontSize='small'/>
            </button>
          </div>
        </div>
        {formData.papel.map((elemento, index) => (
          <PapelPart
            data = {elemento.data}
            handleChangeData = {handleChangeData}
            handleRemove = {handleRemove}
            key={index}
            id = {elemento.id}/>
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
