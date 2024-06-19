import React from 'react';
import classNames from 'classnames';
import DeleteIcon from '@mui/icons-material/Delete';

const RefrigerantePart = ({data, handleChangeData, handleRemove, id}) => {

  const tipos_de_refrigerante = [
    "R-134A",
    "R-404A",
    "R-407A",
    "R-407C",
    "R-407F",
    "R-407H",
    "R-410A",
    "R-417A",
    "R-422D",
    "R-424A (RS-44)",
    "R-426A (RS-24)",
    "R-428A (RS-52)",
    "R-434A (RS-45)",
    "R-442A (RS-50)",
    "R-448A",
    "R-449A",
    "R-450",
    "R-452",
    "R-453A (RS-70)",
    "R-470A (RS-53)",
    "R-470B (RS-51)",
    "R-507A",
    "R-513A",
    "RS-90"
  ]
    
    return (
        <div className="border-t pt-4">
        <div>
          <div className='flex place-content-between'>
            <label className="block text-sm font-medium text-gray-700">Emisiones fugitivas:</label>
            <button
              type="button"
              onClick={() => handleRemove('refrigerante',id)}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <DeleteIcon fontSize='small'/>
              </button>
          </div>
          
          <select
            name="refrigerante.emision_fugitiva"
            value={data.emision_fugitiva}
            onChange={(e)=>handleChangeData(e,id)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="Refrigerantes">Refrigerantes</option>
            <option value="Extintores">Extintores</option>
          </select>
        </div>
        <div className={classNames("grid grid-cols-1 gap-4", {
          "md:grid-cols-3": data.emision_fugitiva==='Refrigerantes',
          "md:grid-cols-2": data.emision_fugitiva!=='Refrigerantes'
        })}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Recarga de refrigerante (Kg)</label>
            <input
              type="number"
              step="0.01"
              name="refrigerante.recarga"
               value={data.recarga}
               onChange={(e)=>handleChangeData(e,id)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo de refrigerante</label>
            <select
              name="refrigerante.tipo"
              value={data.tipo}
              onChange={(e)=>handleChangeData(e,id)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Seleccione un tipo</option>
              {tipos_de_refrigerante.map((elemento, index) => (
                <option value={elemento}>{elemento}</option>
              ))}
            </select>
          </div>
          {data.emision_fugitiva==='Refrigerantes' && 
          <div>
            <label className="block text-sm font-medium text-gray-700">Área Beneficiaria</label>
            <select
              name="refrigerante.area_beneficiaria"
              value={data.area_beneficiaria}
              onChange={(e)=>handleChangeData(e,id)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Seleccione un tipo</option>
              <option value="Split">Split</option>
              <option value="Chiller">Chiller</option>
              <option value="Otros">Otros</option>
            </select>
          </div>
          }
        </div>
      </div>
    )
}

export default RefrigerantePart;