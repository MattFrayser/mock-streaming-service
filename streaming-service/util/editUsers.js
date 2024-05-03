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

function EditUsers() {
    const [columns] = useState([
        { name: 'name', title: 'Name' },
        { name: 'email', title: 'Email' },
        { name: 'subscription_status', title: 'Subscription Status' }
      ]);
  const [rows, setRows] = useState([]);

  const [defaultHiddenColumnNames] = useState(['image']);

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

  const updateUser = async (email, updatedData) => {
    const index = rows.findIndex(row => row.email === email);
    const updatedRows = [...rows]; 
    const originalRow = updatedRows[index];
    updatedRows[index] = { ...originalRow, ...updatedData }; 
    setRows(updatedRows);
    try {
      const response = await fetch(`/api/editUser`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update show');
      }
  
      console.log('Update successful:', response.json()); // Log successful update
    } catch (error) {
      console.error('Error updating user', error);
      alert(`Error: ${error.message}`);
    }
  };

  const deleteUser = async (email) => {
    try {
        const response = await fetch(`/api/deleteUser`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(email),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to delete show');
        }

        console.log('Delete successful:', await response.json());
        setRows(rows => rows.filter(row => row.email !== email));
    } catch (error) {
        console.error('Error deleting show:', error);
        alert(`Error deleting ${email}: ${error.message}`);
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
        const updatedRow = rows.find(row => row.email === email);
        if (updatedRow) {
          updateUser(email, { ...updatedRow, ...changed[key] }).catch(err => {
            console.error(`Failed to update: ${email}`, err);
          });
        }
      });
    }
    if (deleted) {
      deleted.forEach(email => {
        deleteUser(email).catch(err => {
          console.error(`Failed to delete: ${email}`, err);
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
          <SortingState defaultSorting={[{ columnName: 'email', direction: 'asc' }]} />
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

export default EditUsers;
