import classes from './Checkout.module.css';
import useInput from '../hooks/useInput';

const Checkout = (props) => {

  const nameRule = (value) => value.trim() !== '' && value.length >= 3;
  const emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  // const emailRule = (value) => new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(value);
  const emailRule = (value) => emailPattern.test(value);
  const requiredRule = (value) =>  value.trim() !== '';
  const postalCodeRule = (value) => value.trim() !== '' && value.length===5 && new RegExp(/^\d+$/).test(value);

  const { value: nameValue, isValid: nameIsValid, hasError: nameHasError, valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler, reset: resetName } = useInput(nameRule);

  const { value: emailValue, isValid: emailIsValid, hasError: emailHasError, valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler, reset: resetEmail } = useInput(emailRule);

  const { value: streetValue, isValid: streetIsValid, hasError: streetHasError, valueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler, reset: resetStreet } = useInput(requiredRule);

  const { value: cityValue, isValid: cityIsValid, hasError: cityHasError, valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler, reset: resetCity } = useInput(requiredRule);

  const { value: zipValue, isValid: zipIsValid, hasError: zipHasError, valueChangeHandler: zipChangeHandler,
    inputBlurHandler: zipBlurHandler, reset: resetZip } = useInput(postalCodeRule);
  
  let formIsValid = false;
  if (nameIsValid && emailIsValid && zipIsValid && streetIsValid && cityIsValid) formIsValid = true;

  const nameControlClasses = `${classes.control} ${!nameHasError ? '' : classes.invalid}`;
  const emailControlClasses = `${classes.control} ${!emailHasError ? '' : classes.invalid}`;
  const cityControlClasses = `${classes.control} ${!cityHasError ? '' : classes.invalid}`;
  const zipControlClasses = `${classes.control} ${!zipHasError ? '' : classes.invalid}`;
  const streetControlClasses = `${classes.control} ${!streetHasError ? '' : classes.invalid}`;
  
  const confirmHandler = (event) => {
    event.preventDefault();

    if(!formIsValid) return;

    props.onConfirm({name: nameValue, email: emailValue, street: streetValue, city: cityValue, zip: zipValue});

    resetName();
    resetEmail();
    resetStreet();
    resetCity();
    resetZip();
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' value={nameValue} onChange={nameChangeHandler} onBlur={nameBlurHandler} />
        {nameHasError && <p>Please enter a name.</p>}
      </div>
      <div className={emailControlClasses}>
        <label htmlFor='email'>Email</label>
        <input type='text' id='email' value={emailValue} onChange={emailChangeHandler} onBlur={emailBlurHandler} />
        {emailHasError && <p>Please enter a valid email address.</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' value={streetValue} onChange={streetChangeHandler} onBlur={streetBlurHandler} />
        {streetHasError && <p>Please enter your street address.</p>}
      </div>
      <div className={zipControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' value={zipValue} onChange={zipChangeHandler} onBlur={zipBlurHandler} />
        {zipHasError && <p>Please enter a valid postal code.</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' value={cityValue} onChange={cityChangeHandler} onBlur={cityBlurHandler} />
        {cityHasError && <p>Please enter your city.</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel} > Cancel </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;