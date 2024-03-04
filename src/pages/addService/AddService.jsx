import React from 'react';

export const AddService = () => {
  const serviceContract = {
    serviceName: 'Servicio de Desarrollo Web',
    provider: 'Nombre del Proveedor',
    consumer: 'Nombre del Cliente',
    terms: [
      'El proveedor se compromete a entregar el servicio según lo acordado en el contrato.',
      'El cliente se compromete a proporcionar los recursos necesarios para la realización del servicio.',
      'Cualquier modificación al contrato debe ser acordada por ambas partes por escrito.'
    ],
    startDate: 'Fecha de Inicio',
    endDate: 'Fecha de Finalización',
    cost: 'Costo Total'
  };

  return (
    <div>
      <h1>Contrato de Servicio</h1>
      <p>Servicio: {serviceContract.serviceName}</p>
      <p>Proveedor: {serviceContract.provider}</p>
      <p>Cliente: {serviceContract.consumer}</p>
      <p>Fecha de Inicio: {serviceContract.startDate}</p>
      <p>Fecha de Finalización: {serviceContract.endDate}</p>
      <p>Costo Total: {serviceContract.cost}</p>
      <h2>Términos y Condiciones</h2>
      <ul>
        {serviceContract.terms.map((term, index) => (
          <li key={index}>{term}</li>
        ))}
      </ul>
    </div>
  );
};


