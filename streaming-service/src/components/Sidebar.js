import React from 'react';
import './components.css';

function Sidebar({ items, activeItem, setActiveItem }) {
    return (
      <div className="sidebar">
        {items.map((section, index) => (
          <div key={index}>
            <div className="sidebar-category">{section.category}</div>
            {section.items.map(item => (
              <button
                key={item.name}
                className={`sidebar-item ${item === activeItem ? 'active' : ''}`}
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