import React, { useState, useEffect } from 'react';
import { EditingState } from '@devexpress/dx-react-grid';
import Head from 'next/head';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
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

function EditShows() {
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

//   const addShow = async (newRows) => {
//     try {
//         const response = await fetch(`/api/addShow`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(newRows),
//         });
  
//         if (!response.ok) {
//           throw new Error('Failed to add show(s)');
//         }
  
//         const responseData = await response.json();
//         console.log('Add successful:', responseData);
//         setRows([...rows, ...newRows]);
//       } catch (error) {
//         console.error('Error adding show(s):', error);
//         alert(`Error adding show(s): ${error.message}`);
//       }
//   }

  const updateShow = async (show_ID, updatedData) => {
    const index = rows.findIndex(row => row.show_ID === show_ID);
    const updatedRows = [...rows]; 
    const originalRow = updatedRows[index];
    updatedRows[index] = { ...originalRow, ...updatedData }; 
    setRows(updatedRows);
    try {
      const response = await fetch(`/api/editShow`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update show');
      }
  
      const responseData = await response.json();
      console.log('Update successful:', responseData);
    } catch (error) {
      console.error('Error updating show:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const deleteShow = async (show_ID) => {
    try {
        const response = await fetch(`/api/deleteShow`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(show_ID),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to delete show');
        }

        console.log('Delete successful:', await response.json());
        setRows(rows => rows.filter(row => row.show_ID !== show_ID));
    } catch (error) {
        console.error('Error deleting show:', error);
        alert(`Error deleting ${show_ID}: ${error.message}`);
    }
};

  const getRowId = row => row.show_ID;

  const commitChanges = ({added, changed, deleted }) => {
    // if (added) {
    //     const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
    //     const newRows = addedRows.map((row, index) => ({
    //       id: startingAddedId + index,
    //       ...row,
    //     }));
    //     addShow(newRows).catch(err => {
    //         console.error(`Failed to delete row: ${show_ID}`, err);
    //       });
    //   };
    if (changed) {
      Object.keys(changed).forEach(key => {
        const show_ID = parseInt(key);
        const updatedRow = rows.find(row => row.show_ID === show_ID);
        if (updatedRow) {
          updateShow(show_ID, { ...updatedRow, ...changed[key] }).catch(err => {
            console.error(`Failed to update row: ${show_ID}`, err);
          });
        }
      });
    }
    if (deleted) {
      deleted.forEach(show_ID => {
        deleteShow(show_ID).catch(err => {
          console.error(`Failed to delete row: ${show_ID}`, err);
        });
      });
    }
  };

  return (
    <>

      <Head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
      </Head>
      <div className="card">
        <Grid
          rows={rows}
          columns={columns}
          getRowId={getRowId}
        >
          <SortingState defaultSorting={[{ columnName: 'title', direction: 'asc' }]} />
          <SearchState defaultValue="" />
          <IntegratedSorting />
          <IntegratedFiltering />
          <EditingState onCommitChanges={commitChanges} />
          <Table />
          <TableColumnVisibility defaultHiddenColumnNames={defaultHiddenColumnNames} />
          <TableHeaderRow showSortingControls />
          <TableEditRow />
          <TableEditColumn showEditCommand showDeleteCommand />
          <Toolbar />
          <SearchPanel />
          <ColumnChooser />
        </Grid>
      </div>
    </>
  );
}

export default EditShows;
