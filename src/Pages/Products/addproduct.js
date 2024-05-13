import * as React from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Footer from '../../Components/footer';
import Navbar from '../../Components/navbar';

function AddProduct() {
  const [supplierName, setSupplierName] = React.useState('');
  const [productName, setProductName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [unitPrice, setUnitPrice] = React.useState('');
  const [reorderLevel, setReorderLevel] = React.useState('');

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

  const handleAddProduct = () => {
    // Logic to add product (e.g., send API request to backend)
    console.log('Adding product:', { supplierName, productName, description, category, unitPrice, reorderLevel });
    // Reset form fields after adding product
    setSupplierName('');
    setProductName('');
    setDescription('');
    setCategory('');
    setUnitPrice('');
    setReorderLevel('');
  };

  return (
    <div>
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
    </div>
  );
}

export default AddProduct;
