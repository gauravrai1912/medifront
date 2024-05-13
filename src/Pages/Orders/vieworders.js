import * as React from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Footer from '../../Components/footer';
import Navbar from '../../Components/navbar';

function ViewOrderDetails() {
  const [orderId, setOrderId] = React.useState('');
  const [orderDetails, setOrderDetails] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleSearchOrder = () => {
    // Logic to fetch order details based on orderId
    // For demonstration, I'm using dummy data
    const dummyOrderDetails = {
      orderId: 123,
      orderDate: '2024-04-25',
      pharmacistId: 456,
      supplierId: 789,
      products: [
        { productName: 'Product A', quantityOrdered: 5 },
        { productName: 'Product B', quantityOrdered: 3 },
        // Add more products as needed
      ],
    };

    // Check if orderId is not empty
    if (orderId) {
      // Simulating API call to fetch order details
      // Replace this with your actual API call
      setOrderDetails(dummyOrderDetails);
      setErrorMessage('');
    } else {
      // If orderId is empty, display an error message
      setOrderDetails(null);
      setErrorMessage('Please enter an Order ID');
    }
  };

  return (
    <div>
      <Navbar />
      <Paper sx={{ width: '50%', padding: '20px', margin: '20px auto' }}>
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
          <div>
            <h3>Order Details</h3>
            <p>Order ID: {orderDetails.orderId}</p>
            <p>Order Date: {orderDetails.orderDate}</p>
            <p>Pharmacist ID: {orderDetails.pharmacistId}</p>
            <p>Supplier ID: {orderDetails.supplierId}</p>
            <h4>Products</h4>
            <ul>
              {orderDetails.products.map((product, index) => (
                <li key={index}>
                  Product Name: {product.productName}, Quantity Ordered: {product.quantityOrdered}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Paper>
      <Footer />
    </div>
  );
}

export default ViewOrderDetails;
