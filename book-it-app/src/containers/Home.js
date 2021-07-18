/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Badge from '@material-ui/core/Badge';
import { getApartments } from '../consts.js';
import Basket from '../components/Basket';
import Apartment from '../components/Apartment';
import useStore from '../store';

const styles = {
  section: {
    width: '90vw',
    maxWidth: '1000px',
    margin: '5rem auto',
    '&::before': {
      content: `''`,
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
    },
  },
  title: {
    marginBottom: '4rem',
    textAlign: 'center',
    fontSize: '1.7rem',
    color: '#102a42',
  },
  underline: {
    width: '6rem',
    height: '.25rem',
    background: '#49a6e9',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#49a6e9',
  },
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
  basket: {
    height: '40px',
    width: '100px',
    margin: '10px 0px',
    position: 'absolute',
    right: '0',
    top: '0%',
  },
};

const Home = () => {
  const [apartments, setApartments] = React.useState([]);
  const [showBasket, setShowBasket] = React.useState(false);

  const items = useStore((state) => state.items);

  React.useEffect(() => {
    fetch(getApartments)
      .then((response) => response.json())
      .then((data) => {
        setApartments(data);
      });
  }, []);

  const toggleDrawer = () => {
    const show = !showBasket;
    setShowBasket(show);
  };

  return (
    <>
      <div style={styles.basket}>
        <IconButton onClick={toggleDrawer}>
          <Badge badgeContent={items} color="secondary" invisible={false}>
            <ShoppingBasketIcon fontSize="large" />
          </Badge>
        </IconButton>
      </div>
      <section style={styles.section}>
        <div style={styles.title} className="title">
          <h2>Welcome to BookIt!</h2>
          <div style={styles.underline} className="underline" />
        </div>
        {apartments.map((i, index) => (
          <Apartment apartment={i} index={index} />
        ))}
      </section>
      <Basket showBasket={showBasket} setShowBasket={setShowBasket} />
    </>
  );
};

export default Home;
