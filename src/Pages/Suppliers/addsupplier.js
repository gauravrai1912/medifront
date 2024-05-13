import * as React from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Footer from '../../Components/footer';
import Navbar from '../../Components/navbar';

function AddSupplier() {
  const [supplierName, setSupplierName] = React.useState('');
  const [contactNumber, setContactNumber] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [address, setAddress] = React.useState('');

  const handleSupplierNameChange = (event) => {
    setSupplierName(event.target.value);
  };

  const handleContactNumberChange = (event) => {
    setContactNumber(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleAddSupplier = () => {
    // Logic to add supplier (e.g., send API request to backend)
    console.log('Adding supplier:', { supplierName, contactNumber, email, address });
    // Reset form fields after adding supplier
    setSupplierName('');
    setContactNumber('');
    setEmail('');
    setAddress('');
  };

  return (
    <div>
      <Navbar />
      <Paper sx={{ width: '50%', padding: '20px', margin: '20px auto' }}>
        <h2>Add New Supplier</h2>
        <TextField
          label="Supplier Name"
          variant="outlined"
          fullWidth
          value={supplierName}
          onChange={handleSupplierNameChange}
          margin="normal"
        />
        <TextField
          label="Contact Number"
          variant="outlined"
          fullWidth
          value={contactNumber}
          onChange={handleContactNumberChange}
          margin="normal"
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={handleEmailChange}
          margin="normal"
        />
        <TextField
          label="Address"
          variant="outlined"
          fullWidth
          value={address}
          onChange={handleAddressChange}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleAddSupplier} style={{ marginTop: '20px' }}>
          Add Supplier
        </Button>
      </Paper>
      <Footer />
    </div>
  );
}

export default AddSupplier;
