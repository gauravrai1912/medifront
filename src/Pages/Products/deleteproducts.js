import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Footer from '../../Components/footer';
import Navbar from '../../Components/navbar';
import axios from 'axios'; 
import config from '../../config';

function DeleteProduct() {
  const [searchText, setSearchText] = React.useState('');
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [message, setMessage] = React.useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const apiUrl = config.apiUrl;

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    setSelectedProduct(null);
    setMessage('');
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSearchProduct = () => {
    axios.get(`${apiUrl}/products/getproductbyname?name=${searchText}`)
      .then(response => {
        setSelectedProduct(response.data);
        setMessage('');
      })
      .catch(error => {
        console.error('Error searching product:', error);
        setMessage('Product not found');
      });
  };

  const handleDeleteProduct = () => {
    if (selectedProduct) {
      // Send a DELETE request to delete the selected product
      axios.delete(`${apiUrl}/products/deleteproduct?name=${selectedProduct.productName}`)
        .then(response => {
          console.log('Product deleted:', response.data);
          setSnackbarSeverity('success');
          setSnackbarMessage('Product Deleted Successfully');
          setSnackbarOpen(true);
          setSelectedProduct(null);
        })
        .catch(error => {
          console.error('Error deleting product:', error);
          setSnackbarSeverity('error');
          setSnackbarMessage('Error deleting product');
          setSnackbarOpen(true);
        });
    } else {
      setMessage('No product selected');
    }
  };

  return (
    <div>
      <Navbar />
      <Paper sx={{ width: '50%', padding: '20px', margin: '20px auto' }}>
        <h2>Delete Product</h2>
        <TextField
          label="Search Product"
          variant="outlined"
          fullWidth
          value={searchText}
          onChange={handleSearchChange}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSearchProduct} style={{ marginLeft: '10px' }}>
          Search
        </Button>
        {message && <Typography color={message === 'Product deleted' ? 'success' : 'error'}>{message}</Typography>}
        {selectedProduct && (
          <div>
            <TableContainer>
              <Table>
                <TableBody>
                  {Object.entries(selectedProduct).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell>{key}</TableCell>
                      <TableCell>{value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button variant="contained" color="primary" onClick={handleDeleteProduct} style={{ marginTop: '20px' }}>
              Delete Product
            </Button>
          </div>
        )}
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

export default DeleteProduct;
