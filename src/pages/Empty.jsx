import { Link } from "react-router-dom";
import "./styles/Empty.css";

export const Empty = () => {
  return (
    <>
   
    <div className="wrapper cartPage">
    <div className="header">
        <Logo />
      </div>
      <div className="wrappper">
        <div className="elme">
      <h1><b>Корзина пуста :С </b></h1></div>
      <div className="elme"><h3>Вероятней всего, вы не заказывали ещё ничего.
Для того, чтобы заказать что-то, перейди на главную страницу.</h3></div>

<div className="elme"><Link to="/">
              <button className="returnMain">Вернуться назад</button>
            </Link></div>
    </div>
    </div>
    </>
  );
};
