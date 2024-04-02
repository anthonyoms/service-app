import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { formatter } from "../../utils/constants/formatNumber";

export const Contract = () => {
  const location = useLocation();
  const [objeto, setObjeto] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const data = params.get("data");

    if (data) {
      const objetoDeserializado = JSON.parse(decodeURIComponent(data));
      setObjeto(objetoDeserializado);
    }
  }, [location.search]);

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        border: "2px solid #333",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        lineHeight: "1.4",
        textAlign: "justify",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: "100",
          pointerEvents: "none",
          opacity: "0.2",
          fontSize: "100px",
          fontWeight: "bold",
          color: "#ccc",
          fontFamily: "Arial, sans-serif",
        }}
      >
        Orbit Cable S.A.
      </div>
      <h1
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "20px",
          textAlign: "center",
          borderBottom: "2px solid #333",
          paddingBottom: "10px",
        }}
      >
        Contrato de Servicio de Internet
      </h1>
      <p style={{ fontSize: "16px", lineHeight: "1.2", marginBottom: "10px" }}>
        Este contrato establece los términos y condiciones para el uso del
        servicio de internet proporcionado por Orbit Cable S.A., RNC
        122-01285-2.
      </p>
      <h2 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "20px" }}>
        1. Definiciones
      </h2>
      <p style={{ fontSize: "16px", lineHeight: "1.2", marginBottom: "10px" }}>
        - <strong>Proveedor:</strong> Orbit Cable S.A., empresa que ofrece el
        servicio de internet.
        <br />- <strong>Cliente:</strong> {objeto?.name}, portador de documento
        de identidad {objeto?.cedula}
      </p>
      <h2 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "20px" }}>
        2. Servicio
      </h2>
      <p style={{ fontSize: "16px", lineHeight: "1.2", marginBottom: "10px" }}>
        Orbit Cable S.A. proporcionará acceso a internet de alta velocidad según
        los siguientes términos:
        <br />- Tipo de servicio y caracteristicas:{" "}
        {objeto?.service?.nombre.toLowerCase()}
        <br />- Periodo donde no puede ser cancelado el servicio: 18 Meses.
      </p>
      <h2 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "20px" }}>
        3. Pago y Facturación
      </h2>
      <p style={{ fontSize: "16px", lineHeight: "1.2", marginBottom: "10px" }}>
        El cliente pagará la tarifa según el periodo de facturación acordado,
        por un monto de {formatter.format(objeto?.service?.precio_venta)}. Las
        facturas se enviarán por correo electrónico.
      </p>

      {/* Agregar más contenido aquí para que el contrato tenga al menos una página */}
      {/* Puedes incluir más secciones, detalles de políticas, etc. */}
      <h2 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "20px" }}>
        4. Uso Aceptable
      </h2>
      <p style={{ fontSize: "16px", lineHeight: "1.2", marginBottom: "10px" }}>
        El cliente acepta utilizar el servicio de internet de manera responsable
        y legal. Se prohíbe el uso del servicio para actividades ilegales,
        fraudulentas, o que puedan causar daño a terceros.
      </p>

      <h2 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "20px" }}>
        5. Privacidad y Seguridad
      </h2>
      <p style={{ fontSize: "16px", lineHeight: "1.2", marginBottom: "10px" }}>
        Orbit Cable S.A. se compromete a proteger la privacidad y seguridad de
        los datos del cliente. Sin embargo, no puede garantizar la seguridad
        completa de la información transmitida a través de internet.
      </p>

      <h2 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "20px" }}>
        6. Responsabilidad
      </h2>
      <p style={{ fontSize: "16px", lineHeight: "1.2", marginBottom: "10px" }}>
        Orbit Cable S.A. no se hace responsable por interrupciones en el
        servicio causadas por factores fuera de su control, como cortes de
        energía, desastres naturales o acciones de terceros.
      </p>

      <h2 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "20px" }}>
        7. Modificaciones al Servicio
      </h2>
      <p style={{ fontSize: "16px", lineHeight: "1.2", marginBottom: "10px" }}>
        Orbit Cable S.A. se reserva el derecho de realizar modificaciones al
        servicio, incluyendo cambios en las velocidades de conexión o en los
        términos del contrato. Se notificará al cliente con anticipación de
        cualquier cambio significativo.
      </p>

      <h2 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "20px" }}>
        8. Terminación del Servicio
      </h2>
      <p style={{ fontSize: "16px", lineHeight: "1.2", marginBottom: "10px" }}>
        Orbit Cable S.A. se reserva el derecho de terminar el servicio en caso
        de incumplimiento de los términos del contrato por parte del cliente. Se
        notificará al cliente con anticipación y se proporcionará la oportunidad
        de corregir cualquier infracción.
      </p>

      <div
        style={{
          marginTop: "20px",
          borderTop: "1px solid #333",
          paddingTop: "20px",
        }}
      >
        <p style={{ fontSize: "16px", marginBottom: "10px" }}>
          Firma del Cliente: _____________________________________
        </p>
      </div>
    </div>
  );
};
