import React, { useState, useEffect } from 'react';
import Head from 'next/head';

import {
  Grid,
  Table,
  TableHeaderRow,
  SearchPanel,
  Toolbar,
  ColumnChooser,
  TableColumnVisibility,
} from '@devexpress/dx-react-grid-bootstrap4';

import {
  SortingState,
  IntegratedSorting,
  SearchState,
  IntegratedFiltering,
} from '@devexpress/dx-react-grid';

import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';

function ViewUsers() {
  const [columns] = useState([
    { name: 'name', title: 'Name' },
    { name: 'email', title: 'Email' },
    { name: 'subscription_status', title: 'Subscription Status' },
    { name: 'device', title: 'Device'}
  ]);
  const [rows, setRows] = useState([]);
  const [defaultHiddenColumnNames] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('/api/getUsers');
        const data = await response.json();
        setRows(data.results || []);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"/>
      </Head>
      <div className="card">
        <Grid
          rows={rows}
          columns={columns}
        >
          <SortingState
            defaultSorting={[{ columnName: 'name', direction: 'asc' }]}
          />
          <SearchState defaultValue="" />

          <IntegratedSorting />
          <IntegratedFiltering />

          <Table />
          <TableColumnVisibility
            defaultHiddenColumnNames={defaultHiddenColumnNames}
          />
          <TableHeaderRow showSortingControls />
          <Toolbar />
          <SearchPanel />
          <ColumnChooser />
        </Grid>
      </div>
    </>
  );
}

export default ViewUsers;