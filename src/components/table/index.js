import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function BasicTable({rows}) {
    console.log(rows);

  if (!rows || !rows.length ) {
    return null;
  }

  console.log("MyCamelCaseStringID".replace(/([a-z0-9])([A-Z])/g, '$1 $2'))

  return (
    <TableContainer component={Paper}>
      <Table style={{width: '90%', margin: 'auto', border: '1px solid black', marginBottom: '50px',
            borderCollapse: 'inherit', borderRadius: '5px'}} sx={{ minWidth: 650 }} aria-label="simple table">
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
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {Object.values(row).map((cell, index) => {
                if (index === 0) {
                    return <TableCell key={index}>{cell ?? '-'}</TableCell>
                }
                return <TableCell align='right' key={index}>{cell ?? '-'}</TableCell>
              })} 
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
