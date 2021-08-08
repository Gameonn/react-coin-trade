import React, { useEffect, useState } from "react";
import axios from "../axios";
import Spinner from "../UI/OrbitSpinner";

import classes from "./Coins.module.css";
import Coin from "./Coin";
import Card from "../UI/Card";

const Coins = (props) => {
  const [coins, setCoins] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("json").then((result) => {
      console.log(result);
      if (result.data.Markets) {
        const cData = result.data.Markets.slice(0, 20);
        setCoins(cData);
        setLoading(false);
      } else {
        setError(true);
        setLoading(false);
      }
    }).catch(error => {
      setError(true);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <section className={classes.summary}>
        <h4>New cryptocurrency coins you may want to buy</h4>
        <p>Choose your coins and check their prices in reference to other cryptocurrency coins </p>
      </section>
      <section className={classes.coins}>

        {loading && (<Spinner />) }

        {coins && (
          <Card>
            <ul>
              {coins.map((coin, i) => (
                <Coin key={i} name={coin.Name} price={coin.Price_usd} data={coin}  />
              ))}
            </ul>
          </Card>
        )}
        {error && (
          <div className="alert alert-warning" role="alert">
            <h4 className="alert-heading">Error loading data!</h4>
            <p className="mb-0">Please get back to us later, sorry for inconvenience</p>
          </div>
        )}
      </section>
    </>
  );
};

export default Coins;
