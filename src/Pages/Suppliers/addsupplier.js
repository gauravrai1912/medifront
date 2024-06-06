import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Footer from '../../Components/footer';
import Navbar from '../../Components/navbar';
import axios from 'axios'; 

function AddSupplier() {
  const [supplierName, setSupplierName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSupplierNameChange = (event) => {
    setSupplierName(event.target.value);
  };

  const handleContactNumberChange = (event) => {
    setContactNumber(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleAddSupplier = () => {
    // Check if all fields are filled
    if (!supplierName || !contactNumber || !email || !address) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Please fill in all fields');
      setSnackbarOpen(true);
      return;
    }

    axios.post('http://52.66.201.221:8090/suppliers', {
      supplierName,
      contactNumber,
      email,
      address
    })
    .then(response => {
      console.log('Supplier added successfully:', response.data);
      setSupplierName('');
      setContactNumber('');
      setEmail('');
      setAddress('');
      setSnackbarSeverity('success');
      setSnackbarMessage('Supplier Added Successfully');
      setSnackbarOpen(true);
    })
    .catch(error => {
      console.error('Error adding supplier:', error);
      setSnackbarSeverity('error');
      setSnackbarMessage('Error adding product');
      setSnackbarOpen(true);
    });
  };

  return (
    <div>
      <Navbar />
      <Paper sx={{ width: '50%', padding: '20px', margin: '20px auto' }}>
        <h2>Add New Supplier</h2>
        <TextField
          label="Supplier Name"
          variant="outlined"
          fullWidth
          value={supplierName}
          onChange={handleSupplierNameChange}
          margin="normal"
        />
        <TextField
          label="Contact Number"
          variant="outlined"
          fullWidth
          value={contactNumber}
          onChange={handleContactNumberChange}
          margin="normal"
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={handleEmailChange}
          margin="normal"
        />
        <TextField
          label="Address"
          variant="outlined"
          fullWidth
          value={address}
          onChange={handleAddressChange}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleAddSupplier} style={{ marginTop: '20px' }}>
          Add Supplier
        </Button>
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

export default AddSupplier;
