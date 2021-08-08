import { useState } from "react";
import Input from "../UI/Input";
import classes from "./CoinForm.module.css";

const CoinForm = ({ id: coinId, onAddItems }) => {
  const [quantity, setQuantity] = useState(1);

  const addItemHandler = (e) => {
    e.preventDefault();
    onAddItems(quantity);
  };

  return (
    <form className={classes.form} onSubmit={addItemHandler}>
      <Input
        label="Quantity"
        changed={(e) => setQuantity(e.target.value)}
        value={quantity}
        input={{ id: coinId, type: "number", min: "0.2", max: "10.0", step: "0.2", defaultValue: "1" }}
      />
      <button type="submit"><i className="fas fa-plus"></i> Add </button>
    </form>
  );
};

export default CoinForm;
