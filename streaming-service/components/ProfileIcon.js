import { useState } from "react";
import styles from '@/styles/components.module.css'

export default function ProfileIcon() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div onClick={() => setIsOpen(!isOpen)} className={styles.icon}>
        <img
          src="https://source.unsplash.com/random/100x100?person"
          alt="Profile"
          className={styles.img}
        />
      </div>
      {isOpen && (
        <p className={styles.iconContainer}>
            Profile
        </p>
      )}
    </div>
  );
}
