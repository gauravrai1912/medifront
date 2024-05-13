import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Footer from '../../Components/footer';
import Navbar from '../../Components/navbar';

function EditOrderDetails() {
  const [orderId, setOrderId] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);
  const [showEditFields, setShowEditFields] = useState(false);
  const [message, setMessage] = useState('');

  const handleSearchOrder = () => {
    // Simulated logic to fetch order details based on orderId
    // Replace this with your actual API call
    const dummyOrder = {
      orderId: '123',
      orderDate: '2024-04-25',
      pharmacistId: '456',
      supplierId: '789',
      products: [
        { productId: '1', productName: 'Product A', quantityOrdered: 5 },
        { productId: '2', productName: 'Product B', quantityOrdered: 3 },
        // Add more products as needed
      ],
    };

    // Check if orderId is not empty
    if (orderId.trim()) {
      // Set orderDetails if found, otherwise display an error message
      setOrderDetails(dummyOrder);
      setMessage('');
    } else {
      setMessage('Please enter an Order ID');
      setOrderDetails(null);
    }
  };

  const handleToggleEditFields = () => {
    setShowEditFields(!showEditFields);
  };

  const handleEditOrder = () => {
    // Logic to edit order (e.g., send API request to backend)
    console.log('Editing order:', orderDetails);
    setMessage('Order Edited Successfully');
    // Reset orderDetails after editing
    // Replace this with logic to save changes to the backend
    setOrderDetails(null);
    // Hide the edit fields after saving changes
    setShowEditFields(false);
  };

  return (
    <div>
      <Navbar />
      <Paper sx={{ width: '50%', padding: '20px', margin: '20px auto' }}>
        <h2>Edit Order Details</h2>
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
        {message && <Typography color="error">{message}</Typography>}
        {orderDetails && (
          <div>
            <TableContainer>
              <Table>
                <TableBody>
                  {orderDetails.products.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell>{product.productId}</TableCell>
                      <TableCell>{product.productName}</TableCell>
                      <TableCell>
                        {showEditFields ? (
                          <TextField
                            value={product.quantityOrdered}
                            onChange={(e) => {
                              const updatedProducts = [...orderDetails.products];
                              updatedProducts[index].quantityOrdered = e.target.value;
                              setOrderDetails({ ...orderDetails, products: updatedProducts });
                            }}
                            fullWidth
                          />
                        ) : (
                          product.quantityOrdered
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <FormControlLabel
              control={<Checkbox checked={showEditFields} onChange={handleToggleEditFields} />}
              label="Edit Order"
            />
            {showEditFields && (
              <div>
                <Button variant="contained" color="primary" onClick={handleEditOrder} style={{ marginTop: '20px' }}>
                  Edit Order
                </Button>
              </div>
            )}
            {message && <Typography color="success">{message}</Typography>}
          </div>
        )}
      </Paper>
      <Footer />
    </div>
  );
}

export default EditOrderDetails;
