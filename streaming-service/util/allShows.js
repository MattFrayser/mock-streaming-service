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

function ViewShows() {
  const [columns] = useState([
    { name: 'title', title: 'Title' },
    { name: 'description', title: 'Description' },
    { name: 'season', title: 'Seasons' },
    { name: 'episode', title: 'Episodes' },
    { name: 'genre', title: 'Genre' },
    { name: 'image', title: 'Image Path' }
  ]);
  const [rows, setRows] = useState([]);
  const [defaultHiddenColumnNames] = useState(['image']);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch('/api/getShows');
        const data = await response.json();
        setRows(data.results || []);
      } catch (error) {
        console.error("Failed to fetch shows:", error);
      }
    };

    fetchShows();
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
          defaultSorting={[{ columnName: 'title', direction: 'asc' }]}
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

export default ViewShows;