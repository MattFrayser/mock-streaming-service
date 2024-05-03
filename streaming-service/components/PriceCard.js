import React from 'react';
import styles from "@/styles/pricing.module.css";
import Link from 'next/link';
import Router from 'next/router';



const PriceCard = ({ type, price, features }) => {
  
  const handleSelectPlan = () => {
    const sanitize = type.toLowerCase().replace(/\s+/g, '-');
    Router.push(`/signup/${sanitize}`);
  };

  return (
    <div className={styles['card']}>
      <h2>{type}</h2>
      <p className={styles['price']}>{price}</p>
      <ul>
        {features.map(feature => <li key={feature}>{feature}</li>)}
      </ul>
      <button onClick={handleSelectPlan}>Select Plan</button>
    </div>
  );
};

export default PriceCard;