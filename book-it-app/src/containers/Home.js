import React, { useState, useEffect } from 'react';
import { getApartments } from '../consts.js';

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
    marginBottom: '1.5rem',
  },
  secondInfo: {
    display: 'flex',
    maxWidth: '200px',
    justifyContent: 'space-between',
  },
  price: {
    color: '#49a6e9',
  },
  people: {
    color: '#e66b6b',
  },
  description: {
    color: '#617d98',
    fontSize: '1rem',
  },
};

const Home = () => {
  const [apartments, setApartments] = useState([]);

  useEffect(() => {
    fetch(getApartments)
      .then((response) => response.json())
      .then((data) => {
        setApartments(data);
      });
  }, []);

  const items = apartments.map((i, index) => (
    <>
      <div key={index}>
        <article style={styles.article} className="single-tour">
          <img style={styles.image} src={i.Image} alt="" />
          <footer style={styles.footer}>
            <div>
              <div style={styles.info}>
                <h3>{i.Title}</h3>
                <h3 style={styles.price}>Price: €{i.Price}</h3>
              </div>
              <div style={styles.secondInfo}>
                <h4 style={styles.people}>Capacity: {i.People}</h4>
                <h4 style={styles.people}>Available: {i.Available}</h4>
              </div>
              <p style={styles.description}>{i.Description}</p>
            </div>
          </footer>
        </article>
      </div>
    </>
  ));

  return (
    <section style={styles.section}>
      {' '}
      <div style={styles.title} className="title">
        <h2>Welcome to BookIt!</h2>
        <div style={styles.underline} className="underline" />
      </div>
      {items}
    </section>
  );
};

export default Home;
