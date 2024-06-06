import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
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
import axios from 'axios'; // Import axios for making HTTP requests

function EditSupplier() {
    const [searchText, setSearchText] = React.useState('');
    const [selectedSupplier, setSelectedSupplier] = React.useState(null);
    const [showEditFields, setShowEditFields] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState('');
    const [snackbarMessage, setSnackbarMessage] = useState('');
  

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
        setMessage('');
    };

    const handleSearchSupplier = () => {
        const trimmedSearchText = searchText.trim(); // Trim extra spaces
        // Replace the below block with actual API call to search for a supplier
        axios.get(`http://52.66.201.221:8090/suppliers/getsupplierbyname?name=${trimmedSearchText}`)
            .then(response => {
                setSelectedSupplier(response.data);
                setShowEditFields(false);
                setMessage('');
            })
            .catch(error => {
                console.error('Error searching supplier:', error);
                setMessage('Supplier not found');
            });
    };

    const handleToggleEditFields = () => {
        setShowEditFields(!showEditFields);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
      };

    const handleEditSupplier = () => {
        axios.put(`http://52.66.201.221:8090/suppliers/updatesupplier?name=${selectedSupplier.supplierName}`, selectedSupplier)
            .then(response => {
                console.log('Editing supplier:', response.data);
                setMessage('Supplier Edited Successfully');
                setSnackbarSeverity('success');
                setSnackbarMessage('Supplier Details Edited Successfully');
                setSnackbarOpen(true);
                // Reset selectedSupplier after editing
                setSelectedSupplier(null);
                // Hide the edit fields after saving changes
                setShowEditFields(false);
            })
            .catch(error => {
                console.error('Error editing supplier:', error);
                setMessage('Error editing supplier');
                setSnackbarSeverity('error');
                setSnackbarMessage('Error editing supplier');
                setSnackbarOpen(true);
            });
    };
    

    return (
        <div>
            <Navbar />
            <Paper sx={{ width: '50%', padding: '20px', margin: '20px auto' }}>
                <h2>Edit Supplier</h2>
                <TextField
                    label="Search Supplier"
                    variant="outlined"
                    fullWidth
                    value={searchText}
                    onChange={handleSearchChange}
                    margin="normal"
                />
                <Button variant="contained" color="primary" onClick={handleSearchSupplier} style={{ marginLeft: '10px' }}>
                    Search
                </Button>
                {message === 'Supplier Edited Successfully' && <Typography color="success">{message}</Typography>}
                {selectedSupplier && (
                    <div>
                        <FormControlLabel
                            control={<Checkbox checked={showEditFields} onChange={handleToggleEditFields} />}
                            label="Edit Supplier"
                        />
                        <TableContainer>
                            <Table>
                                <TableBody>
                                    {Object.entries(selectedSupplier).map(([key, value]) => (
                                        <TableRow key={key}>
                                            <TableCell>{key}</TableCell>
                                            <TableCell>
                                                {showEditFields ? (
                                                    <TextField
                                                        value={value}
                                                        onChange={(event) => setSelectedSupplier({ ...selectedSupplier, [key]: event.target.value })}
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
                                <Button variant="contained" color="primary" onClick={handleEditSupplier} style={{ marginTop: '20px' }}>
                                    Edit Supplier
                                </Button>
                            </div>
                        )}
                    </div>
                )}
                {message === 'Supplier not found' && <Typography color="error">{message}</Typography>}
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

export default EditSupplier;
