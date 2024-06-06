import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Footer from '../../Components/footer';
import Navbar from '../../Components/navbar';
import axios from 'axios';

function AddProduct() {
  const [supplierName, setSupplierName] = useState('');
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [reorderLevel, setReorderLevel] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSupplierNameChange = (event) => {
    setSupplierName(event.target.value);
  };

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleUnitPriceChange = (event) => {
    setUnitPrice(event.target.value);
  };

  const handleReorderLevelChange = (event) => {
    setReorderLevel(event.target.value);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleAddProduct = () => {
    const productData = {
      supplierName,
      productName,
      description,
      category,
      unitPrice: parseFloat(unitPrice),
      reorderLevel: parseInt(reorderLevel)
    };

    axios.post('http://52.66.201.221:8090/products', productData)
      .then(response => {
        console.log('Product added successfully:', response.data);
        // Reset form fields after adding product
        setSupplierName('');
        setProductName('');
        setDescription('');
        setCategory('');
        setUnitPrice('');
        setReorderLevel('');
        // Show success snackbar
        setSnackbarSeverity('success');
        setSnackbarMessage('Product Added Successfully');
        setSnackbarOpen(true);
      })
      .catch(error => {
        console.error('Error adding product:', error);
        // Show error snackbar
        setSnackbarSeverity('error');
        setSnackbarMessage('Error adding product');
        setSnackbarOpen(true);
      });
  };

  return (
    <div className='z-30'>
      <Navbar />
      <Paper sx={{ width: '50%', padding: '20px', margin: '20px auto' }}>
        <h2>Add New Product</h2>
        <TextField
          label="Supplier Name"
          variant="outlined"
          fullWidth
          value={supplierName}
          onChange={handleSupplierNameChange}
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
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          value={description}
          onChange={handleDescriptionChange}
          margin="normal"
        />
        <TextField
          label="Category"
          variant="outlined"
          fullWidth
          value={category}
          onChange={handleCategoryChange}
          margin="normal"
        />
        <TextField
          label="Unit Price"
          variant="outlined"
          fullWidth
          type="number"
          value={unitPrice}
          onChange={handleUnitPriceChange}
          margin="normal"
        />
        <TextField
          label="Reorder Level"
          variant="outlined"
          fullWidth
          type="number"
          value={reorderLevel}
          onChange={handleReorderLevelChange}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleAddProduct} style={{ marginTop: '20px' }}>
          Add Product
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

export default AddProduct;
