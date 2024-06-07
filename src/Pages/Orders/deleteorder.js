import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Footer from '../../Components/footer';
import Navbar from '../../Components/navbar';
import axios from 'axios';
import config from '../../config';

function DeleteOrder() {
  const [orderId, setOrderId] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);
  const [message, setMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const apiUrl = config.apiUrl;

  const handleSearchOrder = async () => {
    try {
      const response = await axios.get(`${apiUrl}/orders/${orderId}`);
      const foundOrder = response.data;
      console.log('Order details:', foundOrder);
      setOrderDetails(foundOrder);
      setMessage('');
    } catch (error) {
      console.error('Error fetching order details:', error);
      setMessage('Error fetching order details');
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleDeleteOrderDetails = async () => {
    try {
      // Make a request to delete order details using the provided API
      await axios.delete(`${apiUrl}/orders/${orderId}`);
      setSnackbarSeverity('success');
      setSnackbarMessage('Order Details Deleted Successfully');
      setSnackbarOpen(true);
      // Clear input field and order details after deleting
      setOrderId('');
      setOrderDetails(null);
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Error deleting order details');
      setSnackbarOpen(true);
    }
  };
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Paper sx={{ width: '80%', padding: '20px', margin: '20px auto' }}>
        <h2>Delete Order</h2>
        <TextField
          label="Order ID"
          variant="outlined"
          fullWidth
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSearchOrder} style={{ marginLeft: '10px', marginTop: '10px' }}>
          Search
        </Button>
        {message && <Typography color="error">{message}</Typography>}
        {orderDetails && (
          <div style={{ marginTop: '20px' }}>
            <Typography variant="h6">Order Details</Typography>
            <Typography>Order ID: {orderDetails.orderId}</Typography>
            <Typography>Ordered Date: {orderDetails.orderDate}</Typography>
            <Typography>setPharmacist Id: {orderDetails.pharmacistId}</Typography>
            <Typography>Supplier Name: {orderDetails.supplierName}</Typography>
            
            <Button variant="contained" color="secondary" onClick={handleDeleteOrderDetails} style={{ marginTop: '20px' }}>
              Delete Order Details
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

export default DeleteOrder;
