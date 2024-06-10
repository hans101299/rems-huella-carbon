import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

const CombustiblePart = ({list, setList, id}) => {
    const [tipoCombustible, setTipoCombustible] = useState('Diesel');

    const handleRemove = (numberToRemove) => {
        console.log(list);
        console.log(numberToRemove);
        setList(list.filter(num => num !== numberToRemove));
    };

    const handleTipoCombustible = (e) => {
        const value = e.target.value;
        setTipoCombustible(value);
      };
    
    return (
        <div className="border-t pt-4">
          <div>
            <div className='flex place-content-between'>
                <label className="block text-sm font-medium text-gray-700">Combustión de fuentes:</label>
                <button
                type="button"
                onClick={() => handleRemove(id)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                    <DeleteIcon fontSize='small'/>
                </button>
            </div>
            <select
              name="refrigerante.tipo"
            //   value={tipoCombustible}
              onChange={handleTipoCombustible}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="Diesel">Diesel</option>
              <option value="GLP">GLP</option>
            </select>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Suministro de petróleo (Galones)</label>
              <input
                type="number"
                step="0.01"
                name="combustible.suministro"
                // value={formData.combustible.suministro}
                // onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Equipo Beneficiario</label>
              {tipoCombustible==='Diesel' ?
              <select
                name="refrigerante.tipo"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="Grupo electrógeno">Grupo electrógeno</option>
                <option value="Motobomba">Motobomba</option>
                <option value="Otros">Otros</option>
              </select>
              :
              <select
                name="refrigerante.tipo"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="Restaurantes">Restaurantes</option>
                <option value="Áreas comunes">Áreas comunes</option>
                <option value="Áreas privadas">Áreas privadas</option>
                <option value="Otros">Otros</option>
              </select>
              }
            </div>
          </div>
        </div>
    )
}

export default CombustiblePart;