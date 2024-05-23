import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Footer from '../../Components/footer';
import Navbar from '../../Components/navbar';
import axios from 'axios';

function EditInventory() {
    const [searchProductName, setSearchProductName] = React.useState('');
    const [searchBatchNo, setSearchBatchNo] = React.useState('');
    const [editableData, setEditableData] = React.useState(null);
    const [message, setMessage] = React.useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState('');
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleSearchChange = (event) => {
        setSearchProductName(event.target.value);
        setMessage('');
    };

    const handleSearchBatchNoChange = (event) => {
        setSearchBatchNo(event.target.value);
        setMessage('');
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
      };

    const handleSearchInventory = () => {
        const trimmedProductName = searchProductName.trim();
        const trimmedBatchNo = searchBatchNo.trim();
        console.log('Searching inventory with:', { trimmedProductName, trimmedBatchNo }); // Debugging log
        axios.get(`http://localhost:8090/inventory?productName=${trimmedProductName}&batchNo=${trimmedBatchNo}`)
            .then(response => {
                const foundInventory = response.data;
                console.log('Search results:', foundInventory); // Debugging log
                if (foundInventory) {
                    setEditableData(foundInventory);
                    setMessage('');
                } else {
                    setMessage('Inventory not found');
                    setEditableData(null);
                }
            })
            .catch(error => {
                console.error('Error searching inventory:', error);
                setMessage('Error searching inventory');
            });
    };

    const handleInputChange = (event, key) => {
        setEditableData({ ...editableData, [key]: event.target.value });
    };

    const handleEditInventory = () => {
        axios.put(`http://localhost:8090/inventory?productName=${editableData.productName}&batchNo=${editableData.batchNumber}`, editableData)
            .then(response => {
                setSnackbarSeverity('success');
                setSnackbarMessage('Inventory Edited Successfully');
                 setSnackbarOpen(true);
                setEditableData(null);
            })
            .catch(error => {
                setSnackbarSeverity('error');
                setSnackbarMessage('Error editing Inventory');
                setSnackbarOpen(true);
            });
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <Paper sx={{ width: '80%', padding: '20px', margin: '20px auto' }}>
                <h2>Edit Inventory</h2>
                <TextField
                    label="Search Product Name"
                    variant="outlined"
                    fullWidth
                    value={searchProductName}
                    onChange={handleSearchChange}
                    margin="normal"
                />
                <TextField
                    label="Search Batch Number"
                    variant="outlined"
                    fullWidth
                    value={searchBatchNo}
                    onChange={handleSearchBatchNoChange}
                    margin="normal"
                />
                <Button variant="contained" color="primary" onClick={handleSearchInventory} style={{ marginLeft: '10px' }}>
                    Search
                </Button>
                {message && <p style={{ color: message === 'Inventory not found' ? 'red' : 'green' }}>{message}</p>}
                {editableData && (
                    <div>
                        <Typography variant="h6">Edit Inventory</Typography>
                        <TextField
                            label="Product Name"
                            variant="outlined"
                            fullWidth
                            value={editableData.productName || ''}
                            onChange={(event) => handleInputChange(event, 'productName')}
                            margin="normal"
                        />
                        <TextField
                            label="Supplier Name"
                            variant="outlined"
                            fullWidth
                            value={editableData.supplierName || ''}
                            onChange={(event) => handleInputChange(event, 'supplierName')}
                            margin="normal"
                        />
                        <TextField
                            label="Batch Number"
                            variant="outlined"
                            fullWidth
                            value={editableData.batchNumber || ''}
                            onChange={(event) => handleInputChange(event, 'batchNumber')}
                            margin="normal"
                        />
                        <TextField
                            label="Purchase Date"
                            variant="outlined"
                            fullWidth
                            value={editableData.purchaseDate || ''}
                            onChange={(event) => handleInputChange(event, 'purchaseDate')}
                            margin="normal"
                        />
                        <TextField
                            label="Manufactured Date"
                            variant="outlined"
                            fullWidth
                            value={editableData.manufacturedDate || ''}
                            onChange={(event) => handleInputChange(event, 'manufacturedDate')}
                            margin="normal"
                        />
                        <TextField
                            label="Purchase Price"
                            variant="outlined"
                            fullWidth
                            value={editableData.purchasePrice || ''}
                            onChange={(event) => handleInputChange(event, 'purchasePrice')}
                            margin="normal"
                        />
                        <TextField
                            label="Quantity"
                            variant="outlined"
                            fullWidth
                            value={editableData.quantity || ''}
                            onChange={(event) => handleInputChange(event, 'quantity')}
                            margin="normal"
                        />
                        <TextField
                            label="Expiration Date"
                            variant="outlined"
                            fullWidth
                            value={editableData.expirationDate || ''}
                            onChange={(event) => handleInputChange(event, 'expirationDate')}
                            margin="normal"
                        />
                        <Button variant="contained" color="primary" onClick={handleEditInventory} style={{ marginTop: '20px' }}>
                            Edit Inventory
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

export default EditInventory;
