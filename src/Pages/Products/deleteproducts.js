import * as React from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
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

function DeleteProduct() {
  const [searchText, setSearchText] = React.useState('');
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [message, setMessage] = React.useState('');

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    setSelectedProduct(null);
    setMessage('');
  };

  const handleSearchProduct = () => {
    const foundProduct = dummyProducts.find(product => product.productName.toLowerCase() === searchText.toLowerCase());
    if (foundProduct) {
      setSelectedProduct(foundProduct);
      setMessage('');
    } else {
      setMessage('Product not found');
    }
  };

  const handleDeleteProduct = () => {
    if (selectedProduct) {
      setMessage('Product deleted');
      // Logic to delete product (e.g., send API request to backend)
      const updatedProducts = dummyProducts.filter(product => product !== selectedProduct);
      dummyProducts.splice(0, dummyProducts.length, ...updatedProducts);
      setSelectedProduct(null);
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
    </div>
  );
}

export default DeleteProduct;
