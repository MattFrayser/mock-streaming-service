import React, { useState } from 'react';
import Sidebar from '../oldcomponents/Sidebar';
import ViewShows from '../util/allShows';
import ViewEpisodes from '../util/allEpisodes';
import ViewUsers from '../util/allUsers';
import EditShows from '../util/editShows';
import EditEpisodes from '@/util/editEpisodes';
import EditUsers from '@/util/editUsers';
import AddShow from '@/util/addShows';
import AddEpisodes from '@/util/addEpisodes';
import styles from "@/styles/admin.module.css";

const sidebarItems = [
  {
    category: 'View', items: [
      { name: 'All Shows', content: <ViewShows /> },
      { name: 'All Episodes', content: <ViewEpisodes /> },
      { name: 'All Users', content: <ViewUsers /> },
    ]
  },
  {
    category: 'Edit', items: [
      { name: 'Shows', content: <EditShows /> },
      { name: 'Episodes', content: <EditEpisodes /> },
      { name: 'Users', content: <EditUsers /> },
    ]
  },
  {
    category: 'Add', items: [
      { name: 'Shows', content: <AddShow /> },
      { name: 'Episodes', content: <AddEpisodes /> },
    ]
  },
];


function MainView({ activeItem }) {
  return (
    <div className={styles['main-view']}>
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