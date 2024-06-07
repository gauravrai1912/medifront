import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
import config from '../../config';

const columns = [
  { id: 'productName', label: 'Product Name', minWidth: 100 },
  { id: 'supplierName', label: 'Supplier Name', minWidth: 100 },
  { id: 'batchNumber', label: 'Batch Number', minWidth: 150 },
  { id: 'purchaseDate', label: 'Purchase Date', minWidth: 150 },
  { id: 'manufacturedDate', label: 'Manufactured Date', minWidth: 150 },
  { id: 'purchasePrice', label: 'Purchase Price', minWidth: 150 },
  { id: 'quantity', label: 'Quantity', minWidth: 100 },
  { id: 'expirationDate', label: 'Expiration Date', minWidth: 150 },
];
const apiUrl = config.apiUrl;

function StickyHeadTable() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/inventory/getall`); // Replace with your API endpoint
        setRows(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
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

  const filteredRows = searchTerm
    ? rows.filter(row => row.productName.toLowerCase().includes(searchTerm.toLowerCase()))
    : rows;

  return (
    <div>
      <Navbar />
      <div className="">
        <Paper sx={{ width: '30em', marginBottom: '16px', paddingRight: '16px', alignItems: 'center', margin: 'auto' }}>
          <TextField
            id="search"
            label="Search by Product Name"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ margin: '8px' }}
          />
        </Paper>
      </div>
      <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '16px' }}>
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
              {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}> {/* Assuming each row has a unique 'id' */}
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align="center">
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Footer />
    </div>
  );
}

export default StickyHeadTable;
