import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import NoData from '../no-data';
import CardComponent from '../card-component';

export default function StickyHeadTable({rows}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (
    typeof rows === 'object' &&
    rows !== null &&
    !Array.isArray(rows)
  ) {
    return <CardComponent entity={rows} />;
  }

  if (!rows || !rows.length ) {
    return <NoData />
  }

  return (
    <Paper style={{width: '90%', margin: '0 auto 100px', border: 'solid 1px black', borderRadius: '5px'}} sx={{ width: '90%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 1100 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
                {Object.keys(rows[0]).map((header, index) => {
                    if (index === 0) {
                        return <TableCell key={index} 
                                    style={{fontWeight: 'bold',
                                    textTransform: 'capitalize'}}>{header.replace(/([a-z0-9])([A-Z])/g, '$1 $2')}</TableCell>
                    }
                    return <TableCell align='right' 
                                key={index}
                                style={{fontWeight: 'bold', textTransform: 'capitalize'}}>{header.replace(/([a-z0-9])([A-Z])/g, '$1 $2')}</TableCell>
                })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                {Object.values(row).map((cell, index) => {
                    if (index === 0) {
                        return <TableCell key={index}>{Array.isArray(cell) ? cell.join(', ') : (cell ?? '-')}</TableCell>
                    }
                    return <TableCell align='right' key={index}>{Array.isArray(cell) ? cell.join(', ') : (cell ?? '-')}</TableCell>
                })} 
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {rows.length > 10 ? (
        <TablePagination
        style={{width: '90%', margin: '0 auto'}}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />) : null}
      
    </Paper>
  );
}
