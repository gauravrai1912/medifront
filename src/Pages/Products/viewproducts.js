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
  { id: 'supplierName', label: 'Supplier Name', minWidth: 170 },
  { id: 'productName', label: 'Product Name', minWidth: 170 },
  { id: 'description', label: 'Description', minWidth: 200 },
  { id: 'category', label: 'Category', minWidth: 120 },
  { id: 'unitPrice', label: 'Unit Price', minWidth: 120 },
  { id: 'reorderLevel', label: 'Reorder Level', minWidth: 120 },
];

function createData(supplierName, productName, description, category, unitPrice, reorderLevel) {
  return { supplierName, productName, description, category, unitPrice, reorderLevel };
}

const rows = [
  createData('Supplier A', 'Product A', 'Description of Product A', 'Category A', 10.99, 20),
  createData('Supplier B', 'Product B', 'Description of Product B', 'Category B', 15.99, 15),
  createData('Supplier C', 'Product C', 'Description of Product C', 'Category C', 20.99, 25),
  createData('Supplier d', 'Product D', 'Description of Product A', 'Category A', 10.99, 20),
  createData('Supplier e', 'Product E', 'Description of Product A', 'Category A', 10.99, 20),
  createData('Supplier B', 'Product F', 'Description of Product B', 'Category B', 15.99, 15),
  createData('Supplier C', 'Product G', 'Description of Product C', 'Category C', 20.99, 25),
  createData('Supplier A', 'Product H', 'Description of Product A', 'Category A', 10.99, 20),
  createData('Supplier A', 'Product I', 'Description of Product A', 'Category A', 10.99, 20),
  createData('Supplier B', 'Product J', 'Description of Product B', 'Category B', 15.99, 15),
  createData('Supplier C', 'Product K', 'Description of Product C', 'Category C', 20.99, 25),
  createData('Supplier A', 'Product L', 'Description of Product A', 'Category A', 10.99, 20)
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

  const filteredRows = searchTerm ? rows.filter(row => row.productName.toLowerCase().includes(searchTerm.toLowerCase())) : rows;

  return (
    <div>
      <Navbar />
      <div ClassName="">
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
      <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '16px'}}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
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
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.productName}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
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
