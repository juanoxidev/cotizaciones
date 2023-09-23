import "./CotizacionesCard.css";
const CotizacionesCard = ({ nombre, cotizacion, monto, operacion }) => {
  const { compra, venta } = cotizacion;
  const render = () => {
    if (operacion === "vender" && monto != 0) {
      return (
        <div className="container">
          <div className="container-header">
            <p>{nombre}</p>
            <p>{`${monto * compra} PYG`}</p>
          </div>
          <p>Compra cada dolar a ${compra}.- PYG</p>
        </div>
      );
    } else if (operacion === "comprar" && monto != 0) {
      return (
        <>
          <div className="container">
            <div className="container-header">
              <p>{nombre}</p>
              <p>{`${monto * venta} PYG`}</p>
            </div>
            <p>Vende cada dolar a ${venta}.- PYG</p>
          </div>
        </>
      );
    }
  };
  return <>{venta != 0 && compra != 0 && render()}</>;
};

export default CotizacionesCard;
