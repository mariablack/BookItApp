import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import OrderTable from '../components/OrderTable';
import { postOrder } from '../consts';
import PlaceOrderPage from './PlaceOrderPage';
import useStore from '../store';

const schema = yup.object().shape({
  Phone: yup
    .string()
    .matches(/^(30|31)+/gi, 'Phone number should start with 30 or 31 code')
    .required(),
  Email: yup.string().email().required(),
  FirstName: yup
    .string()
    .matches(/^[a-z|A-Z]+$/, 'Must be only letters')
    .required(),
  LastName: yup
    .string()
    .matches(/^[a-z|A-Z]+$/, 'Must be only letters')
    .required(),
  City: yup.string().required(),
  PostalCode: yup
    .number()
    .typeError('Postal code must be a number')
    .positive('Postal code must be greater than zero')
    .required('Postal code is required'),
  Address: yup.string().required(),
});

const styles = {
  container: {
    maxWidth: '1400px',
    margin: '50px auto',
  },
  order: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  table: {
    maxWidth: '600px',
  },
  title: {
    fontSize: '25px',
    fontWeight: '600',
    color: '#102a42',
    margin: '30px',
  },
  rightTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#49a6e9',
    padding: '10px 0px',
  },
  form: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  boxes: {
    padding: '10px 0px',
    display: 'flex',
  },
  button: {
    marginRight: '20px',
  },
  buttons: {
    marginTop: '30px',
  },
  textField: {
    width: '300px',
  },
  mail: {
    width: '600px',
  },
  errorMessage: {
    display: 'inline-block',
    color: '#c51244',
    margin: '0px',
    height: '14px',
    maxWidth: '300px',
    padding: '0px 10px',
  },
};

const CheckOut = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [orderResponse, setOrderResponse] = useState(null);
  const history = useHistory();
  const basketItems = useStore((state) => state.basketItems);

  const goBack = () => {
    history.push('/');
  };

  const goToOrder = () => {
    const headers = new Headers();
    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/json');

    const body = {
      Name: `${firstName} ${lastName} `,
      Address1: address,
      Zip: postalCode,
      City: city,
      MobilePhone: phone,
      Email: email,
      Apartments: basketItems,
    };

    fetch(postOrder, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        Order: body,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(JSON.stringify(data));
        setOrderResponse(data);
      });
  };

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    if (data != null) {
      goToOrder();
    }
  };

  return (
    <>
      <div style={styles.container}>
        <div style={styles.title}>Check Out!</div>
        <div style={styles.order}>
          <OrderTable />
          <div style={styles.table}>
            <div style={styles.rightTitle}>
              Please fill out your personal info
            </div>
            <form style={styles.form}>
              <div style={styles.boxes}>
                <div>
                  <TextField
                    id="outlined-basic"
                    label="First Name"
                    variant="outlined"
                    inputRef={register}
                    name="FirstName"
                    onChange={(event) => setFirstName(event.target.value)}
                    style={styles.textField}
                  />
                  {errors.FirstName && (
                    <h4 style={styles.errorMessage}>
                      {errors.FirstName.message}
                    </h4>
                  )}
                </div>
                <div>
                  <TextField
                    id="outlined-basic"
                    label="Last Name"
                    variant="outlined"
                    name="LastName"
                    inputRef={register}
                    onChange={(event) => setLastName(event.target.value)}
                    style={styles.textField}
                  />
                  {errors.LastName && (
                    <h4 style={styles.errorMessage}>
                      {errors.LastName.message}
                    </h4>
                  )}
                </div>
              </div>
              <div>
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  name="Email"
                  inputRef={register}
                  onChange={(event) => setEmail(event.target.value)}
                  style={styles.mail}
                />
                {errors.Email && (
                  <h4 style={styles.errorMessage}>{errors.Email.message}</h4>
                )}
              </div>
              <div style={styles.boxes}>
                <div>
                  <TextField
                    id="outlined-basic"
                    label="City"
                    variant="outlined"
                    name="City"
                    inputRef={register}
                    onChange={(event) => setCity(event.target.value)}
                    style={styles.textField}
                  />
                  {errors.City && (
                    <h4 style={styles.errorMessage}>{errors.City.message}</h4>
                  )}
                </div>
                <div>
                  <TextField
                    id="outlined-basic"
                    label="Postal Code"
                    variant="outlined"
                    name="PostalCode"
                    inputRef={register}
                    onChange={(event) => setPostalCode(event.target.value)}
                    style={styles.textField}
                  />
                  {errors.PostalCode && (
                    <h4 style={styles.errorMessage}>
                      {errors.PostalCode.message}
                    </h4>
                  )}
                </div>
              </div>
              <div style={styles.boxes}>
                <div>
                  <TextField
                    id="outlined-basic"
                    label="Address"
                    variant="outlined"
                    name="Address"
                    inputRef={register}
                    onChange={(event) => setAddress(event.target.value)}
                    style={styles.textField}
                  />
                  {errors.Address && (
                    <h4 style={styles.errorMessage}>
                      {errors.Address.message}
                    </h4>
                  )}
                </div>
                <div>
                  <TextField
                    id="outlined-basic"
                    label="Phone"
                    variant="outlined"
                    name="Phone"
                    inputRef={register}
                    onChange={(event) => setPhone(event.target.value)}
                    style={styles.textField}
                  />
                  {errors.Phone && (
                    <h4 style={styles.errorMessage}>{errors.Phone.message}</h4>
                  )}
                </div>
              </div>
              <div style={styles.buttons}>
                <Button
                  style={styles.button}
                  variant="contained"
                  color="secondary"
                  onClick={goBack}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  onClick={handleSubmit(onSubmit)}
                >
                  Book Now!
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {orderResponse && <PlaceOrderPage orderResponse={orderResponse} />}
    </>
  );
};

export default CheckOut;
