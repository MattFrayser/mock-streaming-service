import React from 'react';
import styles from "@/styles/components.module.css";

function Sidebar({ items, activeItem, setActiveItem }) {
    return (
      <div className={styles['sidebar']}>
        {items.map((section, index) => (
          <div key={index}>
            <div className={styles['sidebar-category']}>{section.category}</div>
            {section.items.map(item => (
              <button
                key={item.name}
                className={`${styles['sidebar-item']} ${item === activeItem ? styles.active : ''}`}
                onClick={() => setActiveItem(item)}
              >
                {item.name}
              </button>
            ))}
          </div>
        ))}
      </div>
    );
  }

export default Sidebar;