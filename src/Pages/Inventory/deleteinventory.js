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

function DeleteInventory() {
    const [searchProductName, setSearchProductName] = React.useState('');
    const [searchBatchNo, setSearchBatchNo] = React.useState('');
    const [inventoryData, setInventoryData] = React.useState(null);
    const [message, setMessage] = React.useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState('');
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const apiUrl = config.apiUrl;

    const handleSearchProductNameChange = (event) => {
        setSearchProductName(event.target.value);
        setInventoryData(null);
        setMessage('');
    };

    const handleSearchBatchNoChange = (event) => {
        setSearchBatchNo(event.target.value);
        setInventoryData(null);
        setMessage('');
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleSearchInventory = () => {
        const trimmedProductName = searchProductName.trim();
        const trimmedBatchNo = searchBatchNo.trim();

        axios.get(`${apiUrl}/inventory?productName=${trimmedProductName}&batchNo=${trimmedBatchNo}`)
            .then(response => {
                console.log('Search results:', response.data);
                setInventoryData(response.data);
                setMessage('');
            })
            .catch(error => {
                console.error('Error searching inventory:', error);
                setMessage('Error searching inventory');
                setInventoryData(null);
            });
    };

    const handleDeleteInventory = () => {
        if (inventoryData) {
            axios.delete(`${apiUrl}/inventory`, {
                params: {
                    productName: inventoryData.productName,
                    batchNo: inventoryData.batchNumber
                }
            })
                .then(response => {
                    console.log('Inventory deleted successfully:', response.data);
                    setSnackbarSeverity('success');
                    setSnackbarMessage('Inventory Deleted Successfully');
                    setSnackbarOpen(true);
                    setInventoryData(null);
                    setSearchProductName('');
                    setSearchBatchNo('');
                })
                .catch(error => {
                    console.error('Error deleting inventory:', error);
                    setSnackbarSeverity('error');
                    setSnackbarMessage('Error deleting inventory');
                    setSnackbarOpen(true);
                });
        } else {
            setMessage('No inventory selected');
        }
    };

    return (
        <div>
            <Navbar />
            <Paper sx={{ width: '50%', padding: '20px', margin: '20px auto' }}>
                <h2>Delete Inventory</h2>
                <TextField
                    label="Search Product Name"
                    variant="outlined"
                    fullWidth
                    value={searchProductName}
                    onChange={handleSearchProductNameChange}
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
                {message && <Typography color={message === 'Product not found' || message === 'Error deleting inventory' ? 'error' : 'success'}>{message}</Typography>}
                {inventoryData && (
                    <div>
                        <TableContainer>
                            <Table>
                                <TableBody>
                                    {Object.entries(inventoryData).map(([key, value]) => (
                                        <TableRow key={key}>
                                            <TableCell>{key}</TableCell>
                                            <TableCell>{value}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Button variant="contained" color="secondary" onClick={handleDeleteInventory} style={{ marginTop: '20px' }}>
                            Delete Inventory
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

export default DeleteInventory;
