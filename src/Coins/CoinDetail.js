
const MealDetail = ({data}) => {
  return (
    <div>
      <div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{data.Name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{new Date(data.Timestamp*1000).toDateString()}</h6>
            <hr />
            <p className="card-text"><strong> BTC Price: </strong>  {data.Price_btc} </p>
            <p className="card-text"><strong> USD Price: </strong>  {data.Price_usd} </p>
            <p className="card-text"><strong> CNY Price: </strong>  {data.Price_cny} </p>
            <p className="card-text"><strong> EUR Price: </strong>  {data.Price_eur} </p>
            <p className="card-text"><strong> GBP Price: </strong>  {data.Price_gbp} </p>
            <p className="card-text"><strong> RUR Price: </strong>  {data.Price_rur} </p>
          </div>
        </div> 
      </div>
    </div>
  );
};

export default MealDetail;
