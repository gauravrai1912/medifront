import * as React from 'react';
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
import Footer from '../../Components/footer';
import Navbar from '../../Components/navbar';

const dummySuppliers = [
    { supplierName: 'Supplier A', contactNumber: '1234567890', email: 'supplierA@example.com', address: 'Address of Supplier A' },
    { supplierName: 'Supplier B', contactNumber: '0987654321', email: 'supplierB@example.com', address: 'Address of Supplier B' },
    { supplierName: 'Supplier C', contactNumber: '9876543210', email: 'supplierC@example.com', address: 'Address of Supplier C' }
];

function EditSupplier() {
    const [searchText, setSearchText] = React.useState('');
    const [selectedSupplier, setSelectedSupplier] = React.useState(null);
    const [showEditFields, setShowEditFields] = React.useState(false);
    const [message, setMessage] = React.useState('');

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
        setMessage('');
    };

    const handleSearchSupplier = () => {
        const trimmedSearchText = searchText.trim(); // Trim extra spaces
        const foundSupplier = dummySuppliers.find(supplier => supplier.supplierName.toLowerCase() === trimmedSearchText.toLowerCase());
        if (foundSupplier) {
          setSelectedSupplier(foundSupplier);
          setShowEditFields(false);
          setMessage('');
        } else {
          setMessage('Supplier not found');
        }
    };

    const handleToggleEditFields = () => {
        setShowEditFields(!showEditFields);
    };

    const handleEditSupplier = () => {
        // Logic to edit supplier (e.g., send API request to backend)
        console.log('Editing supplier:', selectedSupplier);
        setMessage('Supplier Edited Successfully');
        // Reset selectedSupplier after editing
        setSelectedSupplier(null);
        // Hide the edit fields after saving changes
        setShowEditFields(false);
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
                <Button variant="contained" color="primary" onClick={() => { setSelectedSupplier(null); handleSearchSupplier(); }} style={{ marginLeft: '10px' }}>
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
        </div>
    );
}

export default EditSupplier;
