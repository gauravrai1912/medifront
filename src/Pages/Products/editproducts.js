import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TableContainer from '@mui/material/TableContainer';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Footer from '../../Components/footer';
import Navbar from '../../Components/navbar';
import axios from 'axios';

function EditProduct() {
    const [searchText, setSearchText] = React.useState('');
    const [selectedProduct, setSelectedProduct] = React.useState(null);
    const [showEditFields, setShowEditFields] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState('');
    const [snackbarMessage, setSnackbarMessage] = useState('');
  

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
        setMessage('');
    };

    const handleSearchProduct = () => {
        const trimmedSearchText = searchText.trim();
        axios.get(`http://localhost:8090/products/getproductbyname?name=${trimmedSearchText}`)
            .then(response => {
                const foundProduct = response.data;
                if (foundProduct) {
                    setSelectedProduct(foundProduct);
                    setShowEditFields(false);
                    setMessage('');
                } else {
                    setMessage('Product not found');
                }
            })
            .catch(error => {
                console.error('Error searching product:', error);
                setMessage('Error searching product');
            });
    };
    

    const handleToggleEditFields = () => {
        setShowEditFields(!showEditFields);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
      };

    const handleEditProduct = () => {
        // Prepare the data to send to the backend API
        const editedProductData = {
            supplierName: selectedProduct.supplierName,
            productName: selectedProduct.productName,
            description: selectedProduct.description,
            category: selectedProduct.category,
            unitPrice: selectedProduct.unitPrice,
            reorderLevel: selectedProduct.reorderLevel,
        };
    
        // Send the data to the backend API using Axios
        axios.put(`http://localhost:8090/products/updateproduct?name=${selectedProduct.productName}`, editedProductData)
            .then(response => {
                // Handle successful response from the backend
                console.log('Product edited successfully:', response.data);
                setSnackbarSeverity('success');
                setSnackbarMessage('Product Edited Successfully');
                 setSnackbarOpen(true);
                // Reset selectedProduct after editing
                setSelectedProduct(null);
                // Hide the edit fields after saving changes
                setShowEditFields(false);
            })
            .catch(error => {
                // Handle error response from the backend
                console.error('Error editing product:', error);
                setSnackbarSeverity('error');
                setSnackbarMessage('Error editing product');
                setSnackbarOpen(true);
            });
    };
    
    
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <Paper sx={{ width: '50%', padding: '20px', margin: '20px auto' }}>
                <h2>Edit Product</h2>
                <TextField
                    label="Search Product"
                    variant="outlined"
                    fullWidth
                    value={searchText}
                    onChange={handleSearchChange}
                    margin="normal"
                />
                <Button variant="contained" color="primary" onClick={() => { setSelectedProduct(null); handleSearchProduct(); }} style={{ marginLeft: '10px' }}>
                    Search
                </Button>
                {message === 'Product Edited Successfully' && <Typography color="success">{message}</Typography>}
                {selectedProduct && (
                    <div>
                        <FormControlLabel
                            control={<Checkbox checked={showEditFields} onChange={handleToggleEditFields} />}
                            label="Edit Product"
                        />
                        <TableContainer>
                            <Table>
                                <TableBody>
                                    {Object.entries(selectedProduct).map(([key, value]) => (
                                        <TableRow key={key}>
                                            <TableCell>{key}</TableCell>
                                            <TableCell>
                                                {showEditFields ? (
                                                    <TextField
                                                        value={value}
                                                        onChange={(event) => setSelectedProduct({ ...selectedProduct, [key]: event.target.value })}
                                                        fullWidth
                                                    />
                                                ) : (
                                                    value
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {showEditFields && (
                            <div>
                                <Button variant="contained" color="primary" onClick={handleEditProduct} style={{ marginTop: '20px' }}>
                                    Edit Product
                                </Button>
                            </div>
                        )}
                    </div>
                )}
                {message === 'Product not found' && <Typography color="error">{message}</Typography>}
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

export default EditProduct;
