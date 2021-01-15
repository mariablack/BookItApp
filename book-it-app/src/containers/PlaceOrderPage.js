import React, { useState, useEffect } from 'react';
import DoneIcon from '@material-ui/icons/Done';
import RotateLeftRoundedIcon from '@material-ui/icons/RotateLeftRounded';
import { makeStyles } from '@material-ui/core/styles';
import Spinner from '../components/Spinner';

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
    margin: '20px auto',
  },
};

const useStyles = makeStyles(() => ({
  icon: {
    fontSize: '3em',
    color: '#e66b6b',
  },
}));

const Payment = () => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {}, []);

  return (
    <div style={styles.wrapper}>
      <div className="thank">
        <p className="thank-message">Your reservation is almost ready!</p>
      </div>
      {loading ? (
        <div>
          <RotateLeftRoundedIcon className={classes.icon} />
          <div className="wait">
            <p className="thank-message">
              Waiting for the order to be accepted..
            </p>
          </div>
        </div>
      ) : null}
      {isCompleted ? (
        <div>
          <DoneIcon className={classes.icon} />
          <div className="wait">
            <p className="thank-message">
              Thank you for your reservation! Have a nice accommodation!
            </p>
          </div>
        </div>
      ) : null}
      {loading ? (
        <div className="spinner-wr">
          <Spinner />
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

export default Payment;
