import { useEffect, useState } from "react";
import CotizacionesCard from "./CotizacionesCard";
import "./CotizacionesContainer.css";

const CotizacionesContainer = () => {
  const [cCambio, setCCambio] = useState([]);
  const [fecha, setFecha] = useState();
  const [monto, setMonto] = useState("");
  const [operacion, setOperacion] = useState("");
  const [dolar, setDolar] = useState();

  useEffect(() => {
    fetch("https://dolar.melizeche.com/api/1.0/")
      .then((response) => response.json()) //
      .then((data) => {
        const { updated, dolarpy } = data;
        // SE GUARDAN LAS CASAS EN UN ARRAY QUE ITERA ABAJO
        let casas = [];
        for (let casa in dolarpy) {
          // COMO GUARDAR EL NOMBRE DEL OBJETO COMO PROPIEDAD CASA IN DOLARPY
          let objetoCasa = { casa, cotizacion: { ...dolarpy[casa] } };
          casas.push(objetoCasa);
        }
        setCCambio(casas);
        setFecha(updated);
      })
      .catch((error) => console.error("Error al obtener los datos", error));
  }, []);

  useEffect(() => {
    fetch("https://criptoya.com/api/dolar")
      .then((response) => response.json()) //
      .then((data) => {
        const { blue } = data;
        setDolar(blue);
      })
      .catch((error) => console.error("Error al obtener los datos", error));
  }, []);

  const compra = (e) => {
    e.preventDefault();
    setOperacion("comprar");
  };

  const venta = (e) => {
    e.preventDefault();
    setOperacion("vender");
  };

  const formatoDolar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return (
    <>
      <div className="encabezado">
        <h1>Cotizaciones ARS - GS </h1>
        <h3>Ultima Actualizacion: {fecha}</h3>
        <form>
          <input
            className="monto"
            type="number"
            placeholder="Ingrese la cantidad de pesos"
            onChange={(e) => setMonto(e.target.value)}
          />
          <p>
            {monto > 0 &&
              `Dolares: ${formatoDolar.format(
                Number((monto / dolar).toFixed(2))
              )}`}
          </p>
          {/* <button onClick={compra}>Comprar</button> */}
          <button onClick={venta}>ARS ➡ GS</button>
        </form>
      </div>
      <div className="container-cards">
        {cCambio.map((c, index) => {
          const { casa, cotizacion } = c;
          return (
            <div key={index}>
              <CotizacionesCard
                casa={casa.toUpperCase()}
                cotizacion={cotizacion}
                monto={monto}
                operacion={operacion}
                cotDolar={dolar}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CotizacionesContainer;
