import * as React from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Footer from '../../Components/footer';
import Navbar from '../../Components/navbar';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import config from '../../config';

function ViewOrderDetails() {
  const [orderId, setOrderId] = React.useState('');
  const [orderDetails, setOrderDetails] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState('');
  const apiUrl = config.apiUrl;

  const handleSearchOrder = async () => {
    if (orderId) {
      try {
        const response = await axios.get(`${apiUrl}/order-details/${orderId}`);
        setOrderDetails(response.data);
        console.log('Order details:', response.data);
        setErrorMessage('');
      } catch (error) {
        console.error('There was an error fetching the order details!', error);
        setOrderDetails(null);
        setErrorMessage('Order not found. Please check the Order ID and try again.');
      }
    } else {
      setOrderDetails(null);
      setErrorMessage('Please enter an Order ID');
    }
  };

  return (
    <div>
      <Navbar />
      <Paper sx={{ width: '80%', padding: '20px', margin: '20px auto' }}>
        <h2>View Order Details</h2>
        <TextField
          label="Order ID"
          variant="outlined"
          fullWidth
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearchOrder}
          style={{ marginTop: '20px' }}
        >
          Search
        </Button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {orderDetails && (
          <TableContainer component={Paper} style={{ marginTop: '20px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Quantity Ordered</TableCell>
                  <TableCell>Total Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {orderDetails.map((orderDetail, index) => (
                  <TableRow key={index}>
                    <TableCell>{orderDetail.orderId}</TableCell>
                    <TableCell>{orderDetail.productName}</TableCell>
                    <TableCell>{orderDetail.quantityOrdered}</TableCell>
                    <TableCell>{orderDetail.totalPrice}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
      <Footer />
    </div>
  );
}

export default ViewOrderDetails;
