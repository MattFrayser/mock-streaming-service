import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ViewShows from '../util/allShows';
import ViewEpisodes from '../util/allEpisodes';
import ViewUsers from '../util/allUsers';
import './Admin.css';

const sidebarItems = [
    { category: 'View', items: [
        { name: 'All Shows', content: <ViewShows />},
        { name: 'All Episodes', content: <ViewEpisodes /> },
        { name: 'All Users', content: <ViewUsers />},
        ]
    },
    { category: 'Edit', items: [
        { name: 'Shows', content: <div>Content</div> },
        { name: 'Episodes', content: <div>Content</div> },
        { name: 'Users', content: <div>Content</div> },
        { name: 'Genre', content: <div>Content</div> },
        ]
    },
];


function MainView({ activeItem }) {
    return (
      <div className="main-view">
        {activeItem.content}
      </div>
    );
  }

function Admin() {
  const [activeItem, setActiveItem] = useState(sidebarItems[0]);

  return (
    <div>
      <Sidebar items={sidebarItems} activeItem={activeItem} setActiveItem={setActiveItem} />
      <MainView activeItem={activeItem} />
    </div>
  );
}

export default Admin;