import { Fragment } from "react";

import HeaderCartButton from "./HeaderCartButton";
import coinsImage from "../assets/coins.jpg";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onShow} />
      </header>
      <div className={classes["main-image"]}>
        <img src={coinsImage} alt="A list of your favourite crypto coins!" />
      </div>
    </Fragment>
  );
};

export default Header;
