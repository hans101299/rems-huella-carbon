import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

const EnergíaPart = ({list, setList, id}) => {

    const handleRemove = (numberToRemove) => {
        console.log(list);
        console.log(numberToRemove);
        setList(list.filter(num => num !== numberToRemove));
    };

    return (
        <div className="border-t pt-4">
          <div className='flex gap-3'>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-[93%]">
            <div>
              <label className="block text-sm font-medium text-gray-700">kW/h</label>
              <input
                type="number"
                step="0.01"
                name="energia.kw"
                // value={formData.energia.kw}
                // onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Monto en S/</label>
              <input
                type="number"
                step="0.01"
                name="energia.montoEnergia"
                // value={formData.energia.montoEnergia}
                // onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Área Beneficiaria</label>
              <select
                name="energia.areaBeneficiaria"
                // value={formData.energia.areaBeneficiaria}
                // onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Seleccione un área</option>
                <option value="BCI">BCI</option>
                <option value="Aire acondicionado">Aire acondicionado</option>
                <option value="Estacionamientos">Estacionamientos</option>
                <option value="Ascensores negativos">Ascensores negativos</option>
                <option value="Ascensores positivos">Ascensores positivos</option>
                <option value="Restaurantes">Restaurantes</option>
                <option value="Áreas comunes">Áreas comunes</option>
                <option value="Áreas privadas">Áreas privadas</option>
                <option value="Áreas mixtas">Áreas mixtas</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">N° Suministro</label>
              <input
                type="text"
                name="energia.kw"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => handleRemove(id)}
            className="px-4 max-h-12 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
                <DeleteIcon fontSize='small'/>
            </button>
          </div>
        </div>
    )
}

export default EnergíaPart;