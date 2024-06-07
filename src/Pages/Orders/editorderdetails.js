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

function EditOrderDetails() {
  const [orderId, setOrderId] = useState('');
  const [productName, setProductName] = useState('');
  const [editableData, setEditableData] = useState(null);
  const [message, setMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const apiUrl = config.apiUrl;

  const handleSearchChange = (event) => {
    setOrderId(event.target.value);
    setMessage('');
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
    setMessage('');
  };

  const handleSearchOrder = async () => {
    try {
      const response = await axios.get(`${apiUrl}/order-details/getDetails?orderId=${orderId}&productName=${productName}`);
      const foundProduct = response.data;
      console.log(foundProduct);
      if (foundProduct) {
        setEditableData(foundProduct);
        setMessage('');
      } else {
        setSnackbarSeverity('error');
        setSnackbarMessage('Error searching order');
        setSnackbarOpen(true);
        setEditableData(null);
      }
    } catch (error) {
      console.error('Error searching order:', error);
      setMessage('Error searching order');
    }
  };

  const handleInputChange = (event, key) => {
    setEditableData({ ...editableData, [key]: event.target.value });
  };

  const handleEditInventory = async () => {
    try {
      await axios.put(`${apiUrl}/order-details`, {
        orderId: editableData.orderId,
        productName: editableData.productName,
        quantityOrdered: editableData.quantityOrdered,
        totalPrice: editableData.totalPrice
      });
      setSnackbarSeverity('success');
          setSnackbarMessage('Order Edited Successfully');
          setSnackbarOpen(true);
      // Clear editableData after editing
      setEditableData(null);
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Error editing Order Details');
      setSnackbarOpen(true);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Paper sx={{ width: '80%', padding: '20px', margin: '20px auto' }}>
        <h2>Edit Order Details</h2>
        <TextField
          label="Order ID"
          variant="outlined"
          fullWidth
          value={orderId}
          onChange={handleSearchChange}
          margin="normal"
        />
        <TextField
          label="Product Name"
          variant="outlined"
          fullWidth
          value={productName}
          onChange={handleProductNameChange}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSearchOrder} style={{ marginLeft: '10px', marginTop: '10px' }}>
          Search
        </Button>
        {message && <Typography color="error">{message}</Typography>}
        {editableData && (
          <div style={{ marginTop: '20px' }}>
            <Typography variant="h6">Edit Order</Typography>
            <TextField
              label="Product Name"
              variant="outlined"
              fullWidth
              value={editableData.productName || ''}
              InputProps={{
                readOnly: true,
              }}
              margin="normal"
            />
            <TextField
              label="Quantity Ordered"
              variant="outlined"
              fullWidth
              value={editableData.quantityOrdered || ''}
              onChange={(event) => handleInputChange(event, 'quantityOrdered')}
              margin="normal"
            />
            <TextField
              label="Total Price"
              variant="outlined"
              fullWidth
              value={editableData.totalPrice || ''}
              onChange={(event) => handleInputChange(event, 'totalPrice')}
              margin="normal"
            />
            {/* Add other fields here */}
            <Button variant="contained" color="primary" onClick={handleEditInventory} style={{ marginTop: '20px' }}>
              Edit Inventory
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

export default EditOrderDetails;
