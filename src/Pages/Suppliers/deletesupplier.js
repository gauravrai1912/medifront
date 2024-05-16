import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Footer from '../../Components/footer';
import Navbar from '../../Components/navbar';
import axios from 'axios'; 

function DeleteSupplier() {
  const [searchText, setSearchText] = React.useState('');
  const [selectedSupplier, setSelectedSupplier] = React.useState(null);
  const [message, setMessage] = React.useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    setSelectedSupplier(null);
    setMessage('');
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSearchSupplier = () => {
    axios.get(`http://localhost:8090/suppliers/getsupplierbyname?name=${searchText}`)
      .then(response => {
        setSelectedSupplier(response.data);
        setMessage('');
      })
      .catch(error => {
        console.error('Error searching supplier:', error);
        setMessage('Supplier not found');
      });
  };

  const handleDeleteSupplier = () => {
    if (selectedSupplier) {
      axios.delete(`http://localhost:8090/suppliers/deletesupplier?name=${selectedSupplier.supplierName}`)
        .then(response => {
          console.log('Supplier deleted:', response.data);
          setSnackbarSeverity('success');
          setSnackbarMessage('Supplier Deleted Successfully');
          setSnackbarOpen(true);
          setSelectedSupplier(null);
        })
        .catch(error => {
          console.error('Error deleting supplier:', error);
          setSnackbarSeverity('error');
          setSnackbarMessage('Error deleting supplier');
          setSnackbarOpen(true);
        });
    } else {
      setMessage('No supplier selected');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Paper sx={{ width: '50%', padding: '20px', margin: '20px auto' }}>
        <h2>Delete Supplier</h2>
        <TextField
          label="Search Supplier"
          variant="outlined"
          fullWidth
          value={searchText}
          onChange={handleSearchChange}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSearchSupplier} style={{ marginLeft: '10px' }}>
          Search
        </Button>
        {message && <Typography color={message === 'Supplier deleted' ? 'success' : 'error'}>{message}</Typography>}
        {selectedSupplier && (
          <div>
            <TableContainer>
              <Table>
                <TableBody>
                  {Object.entries(selectedSupplier).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell>{key}</TableCell>
                      <TableCell>{value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button variant="contained" color="primary" onClick={handleDeleteSupplier} style={{ marginTop: '20px' }}>
              Delete Supplier
            </Button>
          </div>
        )}
      </Paper>
      <Footer />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default DeleteSupplier;
