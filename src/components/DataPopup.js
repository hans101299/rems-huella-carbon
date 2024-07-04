import React from 'react';

const DataPopup = ({ data,edificio, onClose, handleSendData }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[95dvh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Datos de Validación</h2>
        <div>
          <h3 className="text-xl font-semibold">Edificio</h3>
          <p>{edificio}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Mes</h3>
          <p>{data.mes.slice(4)+"/"+data.mes.slice(0,4)}</p>
        </div>
        <div className='divide-y-4 divide-black'>
        {['refrigerante', 'combustible', 'energia', 'agua', 'papel'].map((key) => (
          <div key={key}>
            <div>
                <h3 className="text-xl font-semibold mt-4">{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
                <div className='divide-y divide-black pl-4'>
                    {data[key].map((item, index) => (
                    <div key={item.id} className="mb-2 ">
                        <h4 className="text-l font-semibold">Entrada #{index+1}</h4>
                        <div className='pl-4'>
                            {Object.entries(item.data).map(([field, value]) => (
                            <p key={field}><span className="font-bold">{field.replace(/_/g, ' ')}:</span> {value}</p>
                            ))}
                        </div>
                    </div>
                    ))}
                </div>
            </div>
          </div>
        ))}
        </div>
        <div className='flex justify-between'>
            <button
            onClick={handleSendData}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
            Enviar
            </button>
            <button
            onClick={onClose}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
            Cerrar
            </button>
        </div>
      </div>
    </div>
  );
};

export default DataPopup;
