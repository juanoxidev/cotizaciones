import "./CotizacionesCard.css";
const CotizacionesCard = ({ nombre, cotizacion, monto, operacion }) => {
  const { compra, venta } = cotizacion;
  const formatoGuarani = new Intl.NumberFormat("es-PY", {
    style: "currency",
    currency: "PYG",
  });
  const render = () => {
    if (operacion === "vender" && monto != 0) {
      return (
        <div className="container">
          <div className="container-header">
            <p>{nombre}</p>
            <p>{`${formatoGuarani.format(monto * compra)}`}</p>
          </div>
          <p>Compra cada dolar a {formatoGuarani.format(compra)}.-</p>
        </div>
      );
    } else if (operacion === "comprar" && monto != 0) {
      return (
        <>
          <div className="container">
            <div className="container-header">
              <p>{nombre}</p>
              <p>{`${formatoGuarani.format(monto * compra)}`}</p>
            </div>
            <p>Vende cada dolar a {formatoGuarani.format(venta)}.-</p>.-
          </div>
        </>
      );
    }
  };
  return <>{venta != 0 && compra != 0 && render()}</>;
};

export default CotizacionesCard;
