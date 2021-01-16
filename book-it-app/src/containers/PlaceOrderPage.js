import React, { useState, useEffect } from 'react';
import DoneIcon from '@material-ui/icons/Done';
import RotateLeftRoundedIcon from '@material-ui/icons/RotateLeftRounded';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = {
  wrapper: {
    maxWidth: '1400px',
    margin: '75px auto',
    textAlign: 'center',
  },
  error: {
    color: '#3b1721',
    fontSize: '18px',
    fontWeight: 600,
    margin: '20px auto',
  },
  icon: {
    fontSize: '3rem',
  },
  paragraph: {
    color: '#49a6e9',
    fontSize: '20px',
    fontWeight: 600,
    margin: '50px 0px 20px 0px',
  },
  message: {
    fontSize: '20px',
    fontWeight: '700',
  },
};

const useStyles = makeStyles(() => ({
  icon: {
    fontSize: '3em',
    color: '#e66b6b',
  },
}));

const PlaceOrderPage = (props) => {
  const { orderResponse } = props;
  const [isCompleted, setIsCompleted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    if (orderResponse) {
      if (orderResponse.status === 'success') {
        setIsCompleted(true);
      } else {
        setHasError(true);
      }
      setLoading(false);
    }
  }, [orderResponse]);

  return (
    <div style={styles.wrapper}>
      {loading ? (
        <>
          <div style={styles.message}>Your reservation is almost ready!</div>
          <div>
            <RotateLeftRoundedIcon className={classes.icon} />
            <div style={styles.message}>
              Waiting for the order to be accepted..
            </div>
          </div>
        </>
      ) : null}
      {isCompleted ? (
        <div>
          <DoneIcon className={classes.icon} />
          <div style={styles.message}>
            Thank you for your reservation! Soon you'll receive a mail with your
            order details !
          </div>
        </div>
      ) : null}
      {hasError && (
        <p style={styles.error}>
          Oops!Something went wrong with the payment. Our support team will
          contact you soon
        </p>
      )}
      <p style={styles.paragraph}>
        Go back to site <a href="/">here</a>
      </p>
    </div>
  );
};

PlaceOrderPage.propTypes = {
  orderResponse: PropTypes.object,
};
export default PlaceOrderPage;
