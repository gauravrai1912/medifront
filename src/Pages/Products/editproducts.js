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

const dummyProducts = [
    { supplierName: 'Supplier A', productName: 'Product A', description: 'Description of Product A', category: 'Category A', unitPrice: 10.99, reorderLevel: 20 },
    { supplierName: 'Supplier B', productName: 'Product B', description: 'Description of Product B', category: 'Category B', unitPrice: 15.99, reorderLevel: 25 },
    { supplierName: 'Supplier C', productName: 'Product C', description: 'Description of Product C', category: 'Category C', unitPrice: 20.99, reorderLevel: 30 }
];

function EditProduct() {
    const [searchText, setSearchText] = React.useState('');
    const [selectedProduct, setSelectedProduct] = React.useState(null);
    const [showEditFields, setShowEditFields] = React.useState(false);
    const [message, setMessage] = React.useState('');

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
        setMessage('');
    };

    const handleSearchProduct = () => {
        const trimmedSearchText = searchText.trim(); // Trim extra spaces
        const foundProduct = dummyProducts.find(product => product.productName.toLowerCase() === trimmedSearchText.toLowerCase());
        if (foundProduct) {
          setSelectedProduct(foundProduct);
          setShowEditFields(false);
          setMessage('');
        } else {
          setMessage('Product not found');
        }
      };
      

    const handleToggleEditFields = () => {
        setShowEditFields(!showEditFields);
    };

    const handleEditProduct = () => {
        // Logic to edit product (e.g., send API request to backend)
        console.log('Editing product:', selectedProduct);
        setMessage('Product Edited Successfully');
        // Reset selectedProduct after editing
        setSelectedProduct(null);
        // Hide the edit fields after saving changes
        setShowEditFields(false);
    };

    return (
        <div>
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
        </div>
    );
}

export default EditProduct;
