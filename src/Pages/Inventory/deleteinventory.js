import * as React from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Footer from '../../Components/footer';
import Navbar from '../../Components/navbar';

const dummyInventory = [
    { id: 1, productName: 'Product A', supplierName: 'Supplier A', batchNumber: 'B001', purchaseDate: '2023-05-10', manufacturedDate: '2023-05-01', purchasePrice: 10.99, quantity: 20, expirationDate: '2024-05-01' },
    { id: 2, productName: 'Product A', supplierName: 'Supplier B', batchNumber: 'B002', purchaseDate: '2023-05-15', manufacturedDate: '2023-05-05', purchasePrice: 15.99, quantity: 15, expirationDate: '2024-05-15' },
    { id: 3, productName: 'Product C', supplierName: 'Supplier C', batchNumber: 'B003', purchaseDate: '2023-05-20', manufacturedDate: '2023-05-10', purchasePrice: 20.99, quantity: 25, expirationDate: '2024-05-20' }
];

function DeleteInventory() {
    const [searchText, setSearchText] = React.useState('');
    const [selectedInventory, setSelectedInventory] = React.useState([]);
    const [searchResults, setSearchResults] = React.useState([]);
    const [message, setMessage] = React.useState('');

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
        setMessage('');
    };

    const handleSearchInventory = () => {
        const trimmedSearchText = searchText.trim(); // Trim extra spaces
        const foundInventory = dummyInventory.filter(inventory => inventory.productName.toLowerCase() === trimmedSearchText.toLowerCase());
        if (foundInventory.length > 0) {
            setSearchResults(foundInventory);
            setMessage('');
        } else {
            setMessage('Product not found');
            setSearchResults([]);
        }
    };

    const handleCheckboxChange = (event, productId) => {
        if (event.target.checked) {
            setSelectedInventory([...selectedInventory, productId]);
        } else {
            setSelectedInventory(selectedInventory.filter(id => id !== productId));
        }
    };

    const handleDeleteInventory = () => {
        // Logic to delete inventory (e.g., send API request to backend)
        console.log('Deleting inventory with IDs:', selectedInventory);
        setMessage('Selected product(s) have been deleted.');
        // Clear selectedInventory after deleting
        setSelectedInventory([]);
        // Refresh search results
        setSearchResults([]);
        setSearchText('');
    };

    return (
        <div>
            <Navbar />
            <Paper sx={{ width: '80%', padding: '20px', margin: '20px auto' }}>
                <h2>Delete Inventory</h2>
                <TextField
                    label="Search Product Name"
                    variant="outlined"
                    fullWidth
                    value={searchText}
                    onChange={handleSearchChange}
                    margin="normal"
                />
                <Button variant="contained" color="primary" onClick={handleSearchInventory} style={{ marginLeft: '10px' }}>
                    Search
                </Button>
                {message === 'Selected product(s) have been deleted.' && <Typography style={{ marginTop: '10px' }}>{message}</Typography>}
                {message === 'Product not found' && <Typography style={{ color: 'red' }}>{message}</Typography>}
                {searchResults.length > 0 && (
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Product Name</TableCell>
                                    <TableCell>Supplier Name</TableCell>
                                    <TableCell>Batch Number</TableCell>
                                    <TableCell>Purchase Date</TableCell>
                                    <TableCell>Manufactured Date</TableCell>
                                    <TableCell>Purchase Price</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Expiration Date</TableCell>
                                    <TableCell>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {searchResults.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell>{product.productName}</TableCell>
                                        <TableCell>{product.supplierName}</TableCell>
                                        <TableCell>{product.batchNumber}</TableCell>
                                        <TableCell>{product.purchaseDate}</TableCell>
                                        <TableCell>{product.manufacturedDate}</TableCell>
                                        <TableCell>{product.purchasePrice}</TableCell>
                                        <TableCell>{product.quantity}</TableCell>
                                        <TableCell>{product.expirationDate}</TableCell>
                                        <TableCell>
                                            <Checkbox
                                                checked={selectedInventory.includes(product.id)}
                                                onChange={(event) => handleCheckboxChange(event, product.id)}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
                {selectedInventory.length > 0 && (
                    <Button variant="contained" color="secondary" onClick={handleDeleteInventory} style={{ marginTop: '20px' }}>
                        Delete Selected Inventory
                    </Button>
                )}
            </Paper>
            <Footer />
        </div>
    );
}

export default DeleteInventory;
