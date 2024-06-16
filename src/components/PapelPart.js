import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

const PapelPart = ({data, handleChangeData, handleRemove, id}) => {


    return (
        <div className="border-t pt-4">
          <div className='flex gap-3'>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-[93%]">
            <div>
              <label className="block text-sm font-medium text-gray-700">Cantidad:</label>
              <input
                type="number"
                step="0.01"
                name="papel.cantidad"
                value={data.cantidad}
                onChange={(e)=>handleChangeData(e,id)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Densidad:</label>
              <input
                type="number"
                step="0.01"
                name="papel.densidad"
                value={data.densidad}
                onChange={(e)=>handleChangeData(e,id)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Área</label>
              <input
                type="number"
                step="0.01"
                name="papel.area"
                value={data.area}
                onChange={(e)=>handleChangeData(e,id)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => handleRemove('papel',id)}
            className="px-4 max-h-12 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
                <DeleteIcon fontSize='small'/>
            </button>
          </div>
        </div>
    )
}

export default PapelPart;