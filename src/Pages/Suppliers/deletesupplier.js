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

const dummySuppliers = [
  { supplierName: 'Supplier A', contactNumber: '1234567890', email: 'supplierA@example.com', address: 'Address of Supplier A' },
  { supplierName: 'Supplier B', contactNumber: '0987654321', email: 'supplierB@example.com', address: 'Address of Supplier B' },
  { supplierName: 'Supplier C', contactNumber: '9876543210', email: 'supplierC@example.com', address: 'Address of Supplier C' }
];

function DeleteSupplier() {
  const [searchText, setSearchText] = React.useState('');
  const [selectedSupplier, setSelectedSupplier] = React.useState(null);
  const [message, setMessage] = React.useState('');

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    setSelectedSupplier(null);
    setMessage('');
  };

  const handleSearchSupplier = () => {
    const foundSupplier = dummySuppliers.find(supplier => supplier.supplierName.toLowerCase() === searchText.toLowerCase());
    if (foundSupplier) {
      setSelectedSupplier(foundSupplier);
      setMessage('');
    } else {
      setMessage('Supplier not found');
    }
  };

  const handleDeleteSupplier = () => {
    if (selectedSupplier) {
      setMessage('Supplier deleted');
      // Logic to delete supplier (e.g., send API request to backend)
      const updatedSuppliers = dummySuppliers.filter(supplier => supplier !== selectedSupplier);
      dummySuppliers.splice(0, dummySuppliers.length, ...updatedSuppliers);
      setSelectedSupplier(null);
    } else {
      setMessage('No supplier selected');
    }
  };

  return (
    <div>
      <Navbar />
      <Paper sx={{ width: '50%', padding: '20px', margin: '20px auto' }}>
        <h2>Delete Supplier</h2>
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
        {message && <Typography color={message === 'Supplier deleted' ? 'success' : 'error'}>{message}</Typography>}
        {selectedSupplier && (
          <div>
            <TableContainer>
              <Table>
                <TableBody>
                  {Object.entries(selectedSupplier).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell>{key}</TableCell>
                      <TableCell>{value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button variant="contained" color="primary" onClick={handleDeleteSupplier} style={{ marginTop: '20px' }}>
              Delete Supplier
            </Button>
          </div>
        )}
      </Paper>
      <Footer />
    </div>
  );
}

export default DeleteSupplier;
