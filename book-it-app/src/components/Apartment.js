import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import useStore from '../store';

const styles = {
  image: {
    width: '100%',
    height: '27rem',
    objectFit: 'cover',
    borderRadius: '2px',
  },
  article: {
    backgroundColor: '#fff',
    borderRadius: '2px',
    margin: '2rem 0',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    transition: 'all 0.3s linear',
  },
  footer: {
    padding: '1.5rem 2rem',
  },
  info: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    color: '#49a6e9',
  },
  people: {
    color: '#e66b6b',
  },
  available: {
    color: '#e66b6b',
    display: 'flex',
    flexDirection: 'column',
  },
  description: {
    color: '#617d98',
    fontSize: '1rem',
  },
};

const Apartment = (props) => {
  const { apartment, index } = props;

  const addToBasket = useStore((state) => state.addToBasket);

  return (
    <div key={index}>
      <article style={styles.article} className="single-tour">
        <img style={styles.image} src={apartment.Image} alt="" />
        <footer style={styles.footer}>
          <div>
            <div style={styles.info}>
              <h3>{apartment.Title}</h3>
              <h3 style={styles.price}>Price: €{apartment.Price}</h3>
            </div>
            <div style={styles.info}>
              <h4 style={styles.people}>People: {apartment.People}</h4>
              <h4 style={styles.available}>
                <p>
                  Available From: {apartment.From} To: {apartment.To}
                </p>
              </h4>
            </div>
            <p style={styles.description}>{apartment.Description}</p>
          </div>
          <Button
            variant="contained"
            color="secondary"
            key={apartment.id}
            onClick={() => addToBasket(apartment)}
          >
            Book
          </Button>
        </footer>
      </article>
    </div>
  );
};

Apartment.propTypes = {
  apartment: PropTypes.object,
  index: PropTypes.number,
};

export default Apartment;
