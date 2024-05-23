import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Footer from '../../Components/footer';
import Navbar from '../../Components/navbar';
import axios from 'axios';

function AddInventory() {
  const [productName, setProductName] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [batchNumber, setBatchNumber] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [manufacturedDate, setManufacturedDate] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleAddInventory = () => {
    const inventoryData = {
      productName,
      supplierName,
      batchNumber,
      purchaseDate,
      manufacturedDate,
      purchasePrice: parseFloat(purchasePrice),
      quantity: parseInt(quantity),
      expirationDate,
    };

    axios.post('http://localhost:8090/inventory', inventoryData)
      .then(response => {
        console.log('Inventory added successfully:', response.data);
        // Reset form fields after adding inventory
        setProductName('');
        setSupplierName('');
        setBatchNumber('');
        setPurchaseDate('');
        setManufacturedDate('');
        setPurchasePrice('');
        setQuantity('');
        setExpirationDate('');
        // Show success snackbar
        setSnackbarSeverity('success');
        setSnackbarMessage('Inventory Added Successfully');
        setSnackbarOpen(true);
      })
      .catch(error => {
        console.error('Error adding inventory:', error);
        // Show error snackbar
        setSnackbarSeverity('error');
        setSnackbarMessage('Error adding inventory');
        setSnackbarOpen(true);
      });
  };

  return (
    <div>
      <Navbar />
      <Paper sx={{ width: '50%', padding: '20px', margin: '20px auto' }}>
        <h2>Add New Inventory</h2>
        <TextField
          label="Product Name"
          variant="outlined"
          fullWidth
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Supplier Name"
          variant="outlined"
          fullWidth
          value={supplierName}
          onChange={(e) => setSupplierName(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Batch Number"
          variant="outlined"
          fullWidth
          value={batchNumber}
          onChange={(e) => setBatchNumber(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Purchase Date"
          variant="outlined"
          fullWidth
          type="date"
          value={purchaseDate}
          onChange={(e) => setPurchaseDate(e.target.value)}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Manufactured Date"
          variant="outlined"
          fullWidth
          type="date"
          value={manufacturedDate}
          onChange={(e) => setManufacturedDate(e.target.value)}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}    
        />
        <TextField
          label="Purchase Price"
          variant="outlined"
          fullWidth
          type="number"
          value={purchasePrice}
          onChange={(e) => setPurchasePrice(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Quantity"
          variant="outlined"
          fullWidth
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Expiration Date"
          variant="outlined"
          fullWidth
          type="date"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button variant="contained" color="primary" onClick={handleAddInventory} style={{ marginTop: '20px' }}>
          Add Inventory
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

export default AddInventory;
