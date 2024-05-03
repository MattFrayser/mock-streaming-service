import React from 'react';
import PriceCard from './PriceCard';
import styles from "@/styles/pricing.module.css";

const PricingPage = () => {
  const plans = [
    { 
    type: 'Super Fan', 
    price: '$5.99 / month', 
    features: ['Add Free!', 'Watch In Any Language', 'All Previous Tiers'] },
    { type: 'Fan', 
    price: 'Free', 
    features: ['Access to Total Catelog', 'Unlimited Watchtime', 'No CC Required'] },
    { type: 'Mega Fan', 
    price: '$9.99 / month', 
    features: ['Watch Shows a Day Early', 'Download Shows', 'All Previous Tiers']  }
  ];

  return (
    <div className={styles['pricing-container']}>
      {plans.map(plan => (
        <PriceCard key={plan.type} {...plan} />
      ))}
    </div>
  );
};

export default PricingPage;