import { useState } from "react";

import CoinForm from "./CoinForm";
import CoinDetail from "./CoinDetail";
import Modal from "../UI/Modal";
import classes from "./Coin.module.css";

const Coin = ({ name, price, data }) => {

  const [showModal, setShowModal] = useState(false);

  const addToCartHandler = amount => {
  // cartCtx.addItem({id: idMeal, name: strMeal, amount: amount, price: price  });
  }

  return (
    <li className={classes.coin}>
      {showModal && (
        <Modal title={name} onConfirm={() => setShowModal(false)}>
          <CoinDetail data={data} />
        </Modal>
      )}
      <div onClick={() => setShowModal(true)} style={{cursor: 'pointer'}}>
        {/* <img src={strMealThumb} alt={strMeal} /> */}
        <h5>{name}</h5>
        <div className={classes.price}>USD {price}</div>
      </div>
      <div>
        <CoinForm onAddItems={addToCartHandler} />
      </div>
    </li>
  );
};

export default Coin;
