import { useState } from "react";
import { useDispatch } from 'react-redux';

import classes from "./Coin.module.css";
import CoinForm from "./CoinForm";
import CoinDetail from "./CoinDetail";
import Modal from "../UI/Modal";
import { ADD_ITEM } from '../store/actionTypes';

const Coin = ({ id, name, price, data }) => {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  const addToCartHandler = qty => {
    dispatch({type: ADD_ITEM, 'payload': {id, name, price, quantity: parseFloat(qty)}})
  }

  return (
    <li className={classes.coin}>
      {showModal && (
        <Modal title={name} onConfirm={() => setShowModal(false)}>
          <CoinDetail data={data} />
        </Modal>
      )}
      <div onClick={() => setShowModal(true)} style={{cursor: 'pointer'}}>
        <h5>{name}</h5>
        <div className={classes.price}>USD {price}</div>
      </div>
      <div>
        <CoinForm id={id} onAddItems={addToCartHandler} />
      </div>
    </li>
  );
};

export default Coin;
