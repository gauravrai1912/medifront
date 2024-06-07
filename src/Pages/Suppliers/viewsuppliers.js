import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Footer from '../../Components/footer';
import Navbar from '../../Components/navbar';
import axios from 'axios';
import config from '../../config';

const columns = [
  { id: 'supplierName', label: 'Supplier Name', minWidth: 170 },
  { id: 'contactNumber', label: 'Contact Number', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 200 },
  { id: 'address', label: 'Address', minWidth: 120 },
];
const apiUrl = config.apiUrl;

const ViewSupplierPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    axios.get(`${apiUrl}/suppliers/getallsuppliers`)
      .then(response => {
        setSuppliers(response.data); 
      })
      .catch(error => {
        console.error('Error fetching suppliers:', error);
        
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredSuppliers = searchTerm ? suppliers.filter(supplier => 
    supplier.supplierName.toLowerCase().includes(searchTerm.toLowerCase())
  ) : suppliers;

  return (
    <div>
      <Navbar />
      <div>
        <Paper sx={{ width: '30em', marginBottom: '16px', paddingRight: '16px', alignItems: 'center', margin: 'auto' }}>
          <TextField
            id="search"
            label="Search by Supplier Name"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ margin: '8px' }}
          />
        </Paper>
      </div>
      <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '16px'}}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="center"
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSuppliers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.supplierName} hover role="checkbox" tabIndex={-1}>
                    <TableCell align="center">{row.supplierName}</TableCell>
                    <TableCell align="center">{row.contactNumber}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.address}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredSuppliers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Footer />
    </div>
  );
};

export default ViewSupplierPage;
