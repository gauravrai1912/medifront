import * as React from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Footer from '../../Components/footer';
import Navbar from '../../Components/navbar';

function AddInventory() {
  const [productId, setProductId] = React.useState('');
  const [supplierId, setSupplierId] = React.useState('');
  const [batchNumber, setBatchNumber] = React.useState('');
  const [purchaseDate, setPurchaseDate] = React.useState('');
  const [manufacturedDate, setManufacturedDate] = React.useState('');
  const [purchasePrice, setPurchasePrice] = React.useState('');
  const [quantity, setQuantity] = React.useState('');
  const [expirationDate, setExpirationDate] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');

  const handleProductIdChange = (event) => {
    setProductId(event.target.value);
  };

  const handleSupplierIdChange = (event) => {
    setSupplierId(event.target.value);
  };

  const handleBatchNumberChange = (event) => {
    setBatchNumber(event.target.value);
  };

  const handlePurchaseDateChange = (event) => {
    setPurchaseDate(event.target.value);
  };

  const handleManufacturedDateChange = (event) => {
    setManufacturedDate(event.target.value);
  };

  const handlePurchasePriceChange = (event) => {
    setPurchasePrice(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleExpirationDateChange = (event) => {
    setExpirationDate(event.target.value);
  };

  const handleAddInventory = () => {
    if (
      !productId ||
      !supplierId ||
      !batchNumber ||
      !purchaseDate ||
      !manufacturedDate ||
      !purchasePrice ||
      !quantity ||
      !expirationDate
    ) {
      setErrorMessage('Please fill in all fields');
      setSuccessMessage('');
    } else {
      setErrorMessage('');
      // Logic to add inventory (e.g., send API request to backend)
      console.log('Adding inventory:', { productId, supplierId, batchNumber, purchaseDate, manufacturedDate, purchasePrice, quantity, expirationDate });
      setSuccessMessage('Product added to inventory successfully');
      // Reset form fields after adding inventory
      setProductId('');
      setSupplierId('');
      setBatchNumber('');
      setPurchaseDate('');
      setManufacturedDate('');
      setPurchasePrice('');
      setQuantity('');
      setExpirationDate('');
    }
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
          value={productId}
          onChange={handleProductIdChange}
          margin="normal"
        />
        <TextField
          label="Supplier Name"
          variant="outlined"
          fullWidth
          value={supplierId}
          onChange={handleSupplierIdChange}
          margin="normal"
        />
        <TextField
          label="Batch Number"
          variant="outlined"
          fullWidth
          value={batchNumber}
          onChange={handleBatchNumberChange}
          margin="normal"
        />
        <TextField
          label="Purchase Date"
          variant="outlined"
          fullWidth
          type="date"
          value={purchaseDate}
          onChange={handlePurchaseDateChange}
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
          onChange={handleManufacturedDateChange}
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
          onChange={handlePurchasePriceChange}
          margin="normal"
        />
        <TextField
          label="Quantity"
          variant="outlined"
          fullWidth
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          margin="normal"
        />
        <TextField
          label="Expiration Date"
          variant="outlined"
          fullWidth
          type="date"
          value={expirationDate}
          onChange={handleExpirationDateChange}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        <Button variant="contained" color="primary" onClick={handleAddInventory} style={{ marginTop: '20px' }}>
          Add Inventory
        </Button>
      </Paper>
      <Footer />
    </div>
  );
}

export default AddInventory;
