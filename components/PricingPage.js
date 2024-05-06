import React, { useEffect, useState } from 'react';
import PriceCard from './PriceCard';
import styles from "@/styles/pricing.module.css";

const PricingPage = () => {
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        async function fetchPlans() {
            try {
                const response = await fetch('/api/getSubscriptionPlans');
                const data = await response.json();

                const formattedPlans = data[0].map(plan => ({
                    type: plan.title,
                    price: `$${plan.price} / ${plan.length} days`,
                    features: plan.description.split(', ')
                }));
              
                setPlans(formattedPlans);
        
            } catch (error) {
                console.error("Failed to fetch subscription plans:", error);
            }
        }

        fetchPlans();
    }, []);

    return (
      <div className={styles.background} style={{ backgroundImage: 'url(/register.png)' }}>
        <div className={styles['pricing-container']}>
            {plans.map(plan => (
                <PriceCard key={plan.type} {...plan} />
            ))}
        </div>
        </div>
    );
};

export default PricingPage;
