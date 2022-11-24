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

export default function BookTable({entity}) {
  console.log(entity);
    if (entity?.bids?.length === 0 && entity?.asks?.length === 0) {
        return <NoData />;
    }
    
  return (
    <Paper style={{width: '90%', margin: '0 auto 100px', border: 'solid 1px black', borderRadius: '5px'}} sx={{ width: '90%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 1100 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
                    <TableCell style={{fontWeight: 'bold'}}>Bid size</TableCell>
                    <TableCell style={{fontWeight: 'bold'}}>Bid</TableCell>
                    <TableCell style={{fontWeight: 'bold'}}>Ask size</TableCell>
                    <TableCell style={{fontWeight: 'bold'}}>Ask</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
                entity?.bids.map((bid, index) => {
                    return (
                        <TableRow>
                            <TableCell>{bid.size}</TableCell>
                            <TableCell>{bid.price}</TableCell>
                            <TableCell>{entity?.asks[index]?.size}</TableCell>
                            <TableCell>{entity?.asks[index]?.price}</TableCell>
                        </TableRow>
                    );
                })
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
