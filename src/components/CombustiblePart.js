import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

const CombustiblePart = ({data, handleChangeData, handleRemove, id}) => {
    
    return (
        <div className="border-t pt-4">
          <div>
            <div className='flex place-content-between'>
                <label className="block text-sm font-medium text-gray-700">Combustión de fuentes:</label>
                <button
                type="button"
                onClick={() => handleRemove('combustible',id)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                    <DeleteIcon fontSize='small'/>
                </button>
            </div>
            <select
              name="combustible.fuente"
              value={data.fuente}
              onChange={(e)=>handleChangeData(e,id)}
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
                name="combustible.suministro_petroleo"
                value={data.suministro_petroleo}
                onChange={(e)=>handleChangeData(e,id)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Equipo Beneficiario</label>
              {data.fuente==='Diesel' ?
              <select
                name="combustible.equipo_beneficiario"
                value={data.equipo_beneficiario}
                onChange={(e)=>handleChangeData(e,id)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="Grupo electrógeno">Grupo electrógeno</option>
                <option value="Motobomba">Motobomba</option>
                <option value="Otros">Otros</option>
              </select>
              :
              <select
                name="combustible.equipo_beneficiario"
                value={data.equipo_beneficiario}
                onChange={(e)=>handleChangeData(e,id)}
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