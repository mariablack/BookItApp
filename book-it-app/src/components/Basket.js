import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import { useHistory } from 'react-router-dom';
import useStore from '../store';

const styles = {
  drawer: {
    width: '20vw',
    padding: '2rem',
  },
  buttons: {
    position: 'absolute',
    bottom: '5%',
  },
  button: {
    marginRight: '10px',
  },
  title: {
    fontSize: '19px',
    fontWeight: '600',
    color: '#e66b6b',
  },
  product: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0px 20px',
    color: '#0d835f',
    fontSize: '18px',
    fontWeight: 600,
  },

  dates: {
    color: '#0d835f',
    fontSize: '18px',
    fontWeight: 600,
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0px 20px',
    alignItems: 'center',
  },
  span: {
    width: '260px',
  },
  total: {
    color: '#0d835f',
    fontSize: '18px',
    fontWeight: 600,
  },
};

const Basket = (props) => {
  const { showBasket, setShowBasket } = props;
  const history = useHistory();

  const basketItems = useStore((state) => state.basketItems);
  const totalAmount = useStore((state) => state.totalAmount);
  const removeItemFromBasket = useStore((state) => state.removeItemFromBasket);

  const toggleClose = (event) => {
    const show = !showBasket;

    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setShowBasket(show);
  };

  const viewCheckOut = () => {
    history.push('/checkOut');
  };

  console.log(`BasketItems ${JSON.stringify(basketItems)}`);
  const basketProducts = basketItems.map(function (item) {
    return (
      <div key={item.id}>
        <div style={styles.product}>
          <div>{item.Title}</div>
          <div>Price: €{item.Price}</div>
        </div>
        <div style={styles.dates}>
          Dates:
          <span style={styles.span}>
            {item.From} To {item.To}{' '}
          </span>
          <IconButton
            className="clearBtn"
            key={item.id}
            onClick={() => removeItemFromBasket(item)}
          >
            <ClearIcon color="#000" fontSize="large" />
          </IconButton>
        </div>
        <hr />
      </div>
    );
  });

  return (
    <Fragment key="right">
      <Drawer
        anchor="right"
        open={showBasket}
        onClose={(event) => toggleClose(event)}
      >
        <div className="drawer" style={styles.drawer}>
          <div className="title" style={styles.title}>
            Your Reservations
          </div>
          <hr />
          {basketProducts}
          <div className="bottom-buttons" style={styles.buttons}>
            <div style={styles.total}>Total Amount: €{totalAmount} </div>
            <hr />
            <Button
              variant="contained"
              color="secondary"
              onClick={viewCheckOut}
            >
              Check Out
            </Button>
          </div>
        </div>
      </Drawer>
    </Fragment>
  );
};

Basket.propTypes = {
  showBasket: PropTypes.bool.isRequired,
  setShowBasket: PropTypes.func.isRequired,
};

export default Basket;
