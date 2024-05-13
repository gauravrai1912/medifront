import * as React from 'react';
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

function createData(productName, supplierName, batchNumber, purchaseDate, manufacturedDate, purchasePrice, quantity, expirationDate) {
  return { productName, supplierName, batchNumber, purchaseDate, manufacturedDate, purchasePrice, quantity, expirationDate };
}

const dummyRows = [
  createData('Product A', 'Supplier A', 'B001', '2023-05-10', '2023-05-01', 10.99, 20, '2024-05-01'),
  createData('Product B', 'Supplier B',  'B002','2023-05-15', '2023-05-05', 15.99, 15, '2024-05-15'),
  createData('Product C', 'Supplier C', 'B003', '2023-05-20', '2023-05-10', 20.99, 25, '2024-05-20'),
  // Add more dummy data as needed
];

function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchTerm, setSearchTerm] = React.useState('');

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

  const filteredRows = searchTerm ? dummyRows.filter(row => row.productId.toString().includes(searchTerm.toLowerCase())) : dummyRows;

  return (
    <div>
      <Navbar />
      <div ClassName="">
        <Paper sx={{ width: '30em', marginBottom: '16px', paddingRight: '16px', alignItems: 'center', margin: 'auto' }}>
          <TextField
            id="search"
            label="Search by Product ID"
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
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.productId}>
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
                  );
                })}
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
