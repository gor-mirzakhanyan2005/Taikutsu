import { useContext } from "react";
import styles from "../stylesheets/Checkout.module.scss"
import { useNavigate } from "react-router-dom"
import { DarkModeContext } from "../App";

function Checkout() {
    const navigate = useNavigate();
    const { darkmode } = useContext(DarkModeContext);

  return (
      <div data-theme={darkmode ? "dark" : "light"} className={styles.checkoutCont}>
          <h2>Thank you for your purchase!</h2>
          <button onClick={() => navigate('/')}>Go back</button>
      </div>
  );
}

export default Checkout;