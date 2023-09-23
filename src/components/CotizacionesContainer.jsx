import { useEffect, useState } from "react";
import CotizacionesCard from "./CotizacionesCard";
import "./CotizacionesContainer.css";

const CotizacionesContainer = () => {
  const [guarani, setGuarani] = useState([]);
  const [fecha, setFecha] = useState("");
  const [monto, setMonto] = useState("");
  const [operacion, setOperacion] = useState("");
  useEffect(() => {
    fetch("https://dolar.melizeche.com/api/1.0/")
      .then((response) => response.json()) //
      .then((data) => {
        const casasDeCambio = [
          {
            nombre: "BCP",
            cotizacion: {
              compra: data.dolarpy.bcp.compra,
              venta: data.dolarpy.bcp.venta,
            },
          },
          {
            nombre: "CAMBIOS BONANZA",
            cotizacion: data.dolarpy.bonanza,
          },
          {
            nombre: "CAMBIOS ALBERDI",
            cotizacion: data.dolarpy.cambiosalberdi,
          },
          {
            nombre: "CAMBIOS CHACO",
            cotizacion: data.dolarpy.cambioschaco,
          },
          {
            nombre: "EURO CAMBIOS",
            cotizacion: data.dolarpy.eurocambios,
          },
          {
            nombre: "GNB FUSION",
            cotizacion: data.dolarpy.gnbfusion,
          },
          {
            nombre: "LA MONEDA CAMBIOS",
            cotizacion: data.dolarpy.lamoneda,
          },
          {
            nombre: "MAXICAMBIOS",
            cotizacion: data.dolarpy.maxicambios,
          },
          {
            nombre: "MUNDIAL CAMBIOS",
            cotizacion: data.dolarpy.mundialcambios,
          },
          {
            nombre: "MYD CAMBIOS",
            cotizacion: data.dolarpy.mydcambios,
          },
          {
            nombre: "SET",
            cotizacion: data.dolarpy.set,
          },
          {
            nombre: "VISION",
            cotizacion: data.dolarpy.vision,
          },
        ];
        const { updated } = data;
        setGuarani(casasDeCambio);
        setFecha(updated);
      })
      .catch((error) => console.error("Error al obtener los datos", error));
  });
  const compra = (e) => {
    e.preventDefault();
    setOperacion("comprar");
  };

  const venta = (e) => {
    e.preventDefault();
    setOperacion("vender");
  };

  return (
    <>
      <div className="encabezado">
        <h1>Cotizaciones USD - GS </h1>
        <h3>Ultima Actualizacion: {fecha}</h3>
        <form>
          <input
            className="monto"
            type="number"
            placeholder="Ingrese la cantidad de dolares"
            onChange={(e) => setMonto(e.target.value)}
          />
          <button onClick={compra}>Comprar</button>
          <button onClick={venta}>Vender</button>
        </form>
      </div>
      <div className="container-cards">
        {guarani.map((c, index) => {
          const { nombre, cotizacion } = c;
          return (
            <div key={index}>
              <CotizacionesCard
                nombre={nombre}
                cotizacion={cotizacion}
                monto={monto}
                operacion={operacion}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CotizacionesContainer;
