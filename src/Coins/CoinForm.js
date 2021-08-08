import { useState } from "react";
import Input from "../UI/Input";
import classes from "./CoinForm.module.css";

const CoinForm = ({ id: itemId, onAddItems }) => {
  const [amount, setAmount] = useState(1);

  const addItemHandler = (e) => {
    e.preventDefault();
    onAddItems(parseInt(amount));
  };

  return (
    <form className={classes.form} onSubmit={addItemHandler}>
      <Input
        label="Amount"
        changed={(e) => setAmount(e.target.value)}
        value={amount}
        input={{
          id: "amount_" + itemId,
          type: "number",
          min: "0.1",
          max: "10.0",
          step: "0.1",
          defaultValue: "1",
        }}
      />
      <button type="submit"><i className="fas fa-plus"></i> Add </button>
    </form>
  );
};

export default CoinForm;
