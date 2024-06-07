import * as React from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Footer from '../../Components/footer';
import Navbar from '../../Components/navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';


function CreateOrders() {
  const [orderId, setOrderId] = React.useState('');
  const [orderDate, setOrderDate] = React.useState('');
  const [pharmacistId, setPharmacistId] = React.useState('');
  const [supplierName, setSupplierId] = React.useState('');
  const apiUrl = config.apiUrl;
  const navigate = useNavigate();

  const handleProceed = async () => {
    // Check if all fields are entered properly
    if (orderId && orderDate && pharmacistId && supplierName) {
      try {
        // Make API call to save the order
        const order = { orderId, orderDate, pharmacistId, supplierName };
        await axios.post(`${apiUrl}/orders`, order);
        
        // Navigate to Order Details page if the order is successfully saved
        navigate('/orders/order-details', { state: { orderId } });
      } catch (error) {
        console.error("There was an error saving the order!", error);
        alert("Failed to save order. Please try again.");
      }
    } else {
      // Display an error message or handle incomplete fields as per your requirement
      alert("Please fill in all fields before proceeding.");
    }
  };


  return (
    <div>
      <Navbar />
      <Paper sx={{ width: '50%', padding: '20px', margin: '20px auto' }}>
        <h2>Create Order</h2>
        <TextField
          label="Order ID"
          variant="outlined"
          fullWidth
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Order Date"
          variant="outlined"
          fullWidth
          type="date"
          InputLabelProps={{ shrink: true }}
          value={orderDate}
          onChange={(e) => setOrderDate(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Pharmacist ID"
          variant="outlined"
          fullWidth
          value={pharmacistId}
          onChange={(e) => setPharmacistId(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Supplier ID"
          variant="outlined"
          fullWidth
          value={supplierName}
          onChange={(e) => setSupplierId(e.target.value)}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleProceed}
          style={{ marginTop: '20px' }}
        >
          Proceed
        </Button>
      </Paper>
      <Footer />
    </div>
  );
}

export default CreateOrders;
