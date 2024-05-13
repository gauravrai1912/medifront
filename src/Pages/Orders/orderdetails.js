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
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8">
        <Paper sx={{ width: '100%', padding: '20px' }}>
          <h2 className="text-3xl font-bold mb-8 text-center">View Order Details</h2>
          <div className="flex items-center justify-center mb-8">
            <TextField
              label="Enter Order ID"
              variant="outlined"
              fullWidth
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearchOrder}
              className="ml-4"
            >
              Search
            </Button>
          </div>
          {errorMessage && <p className="text-red-500 text-center mb-6">{errorMessage}</p>}
          {orderDetails && (
            <div>
              <h3 className="text-2xl font-bold mt-6 mb-4">Order Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold">Order ID:</p>
                  <p>{orderDetails.orderId}</p>
                  <p className="font-semibold">Order Date:</p>
                  <p>{orderDetails.orderDate}</p>
                </div>
                <div>
                  <p className="font-semibold">Pharmacist ID:</p>
                  <p>{orderDetails.pharmacistId}</p>
                  <p className="font-semibold">Supplier ID:</p>
                  <p>{orderDetails.supplierId}</p>
                </div>
              </div>
              <h4 className="text-2xl font-bold mt-8 mb-4">Products</h4>
              <ul>
                {orderDetails.products.map((product, index) => (
                  <li key={index} className="mb-4">
                    <p className="font-semibold">Product Name:</p>
                    <p>{product.productName}</p>
                    <p className="font-semibold">Quantity Ordered:</p>
                    <p>{product.quantityOrdered}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Paper>
      </div>
      <Footer />
    </div>
  );
}

export default ViewOrderDetails;
