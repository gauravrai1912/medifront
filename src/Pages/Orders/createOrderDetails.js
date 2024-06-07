import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Footer from '../../Components/footer';
import Navbar from '../../Components/navbar';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';

function CreateOrderDetails() {
  const [orderId, setOrderId] = useState('');
  const [productName, setProductName] = useState('');
  const [quantityOrdered, setQuantityOrdered] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const apiUrl = config.apiUrl;

  const navigate = useNavigate();
  const location = useLocation();

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    if (location.state && location.state.orderId) {
      setOrderId(location.state.orderId);
    }
  }, [location.state]);

  const handleAdd = async () => {
    if (orderId && productName && quantityOrdered && totalPrice) {
      try {
        const orderDetails = { orderId, productName, quantityOrdered, totalPrice };
        await axios.post(`${apiUrl}/order-details`, orderDetails);
        
        setSnackbarSeverity('success');
        setSnackbarMessage('Order Details Added Successfully');
        setSnackbarOpen(true);
        
        // Clear the input fields
        setProductName('');
        setQuantityOrdered('');
        setTotalPrice('');
        
      } catch (error) {
        console.error("There was an error saving the order details!", error);
        setSnackbarSeverity('error');
        setSnackbarMessage('Failed to add order details. Please try again.');
        setSnackbarOpen(true);
      }
    } else {
      setSnackbarSeverity('warning');
      setSnackbarMessage('Please fill in all fields before adding.');
      setSnackbarOpen(true);
    }
  };

  const handleFinish = () => {
    navigate('/home');
  };

  return (
    <div>
      <Navbar />
      <Paper sx={{ width: '50%', padding: '20px', margin: '20px auto' }}>
        <h2>Create Order Details</h2>
        <TextField
          label="Order ID"
          variant="outlined"
          fullWidth
          value={orderId}
          InputProps={{ readOnly: true }}
          margin="normal"
        />
        <TextField
          label="Product Name"
          variant="outlined"
          fullWidth
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Quantity Ordered"
          variant="outlined"
          fullWidth
          value={quantityOrdered}
          onChange={(e) => setQuantityOrdered(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Total Price"
          variant="outlined"
          fullWidth
          type="number"
          value={totalPrice}
          onChange={(e) => setTotalPrice(e.target.value)}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAdd}
          style={{ marginTop: '20px', marginRight: '10px' }}
        >
          Add
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleFinish}
          style={{ marginTop: '20px' }}
        >
          Finish
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

export default CreateOrderDetails;
