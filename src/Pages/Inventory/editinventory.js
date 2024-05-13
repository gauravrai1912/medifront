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
    { id: 2, productName: 'Product C', supplierName: 'Supplier C', batchNumber: 'B003', purchaseDate: '2023-05-20', manufacturedDate: '2023-05-10', purchasePrice: 20.99, quantity: 25, expirationDate: '2024-05-20' }
];

function EditInventory() {
    const [searchText, setSearchText] = React.useState('');
    const [selectedInventory, setSelectedInventory] = React.useState([]);
    const [editableData, setEditableData] = React.useState({});
    const [message, setMessage] = React.useState('');
    const [editable, setEditable] = React.useState(false);
    const [searchResults, setSearchResults] = React.useState([]);

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
            setEditable(true);
            const foundProduct = searchResults.find(product => product.id === productId);
            if (foundProduct) {
                setEditableData(foundProduct);
            }
        } else {
            setSelectedInventory(selectedInventory.filter(id => id !== productId));
            setEditable(false);
            setEditableData({});
        }
    };

    const handleInputChange = (event, key) => {
        setEditableData({ ...editableData, [key]: event.target.value });
    };

    const handleEditInventory = () => {
        // Logic to edit inventory (e.g., send API request to backend)
        console.log('Editing inventory:', editableData);
        setMessage('Inventory Edited Successfully');
        // Reset selectedInventory after editing
        setSelectedInventory([]);
        // Clear editableData after editing
        setEditableData({});
        setEditable(false);
    };

    return (
        <div>
            <Navbar />
            <Paper sx={{ width: '80%', padding: '20px', margin: '20px auto' }}>
                <h2>Edit Inventory</h2>
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
                {message === 'Product not found' && <p style={{ color: 'red' }}>{message}</p>}
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
                                    <TableCell>Actions</TableCell>
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
                {editable && (
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
        </div>
    );
}

export default EditInventory;
