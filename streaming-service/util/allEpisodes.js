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

function ViewEpisodes() {
  const [columns] = useState([
    { name: 'episode_ID', title: 'ID' },
    { name: 'Show', title: 'Show' },
    { name: 'episode_number', title: 'Episode' },
    { name: 'title', title: 'Title' }
  ]);
  const [rows, setRows] = useState([]);
  const [defaultHiddenColumnNames] = useState([]);

  useEffect(() => {
    async function fetchEpisodes() {
      try {
        const response = await fetch('/api/getEpisodes');
        const data = await response.json();
        setRows(data.results || []);
      } catch (error) {
        console.error("Failed to fetch episodes:", error);
      }
    };

    fetchEpisodes();
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
            defaultSorting={[{ columnName: 'show', direction: 'asc' }]}
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

export default ViewEpisodes;