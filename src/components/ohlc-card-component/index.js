import React from 'react';
import { Card, CardContent, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';

export default function OhlcCardComponent({entity}) {
    console.log(entity);
    if (entity === {}) {
        return <NoData />;
    }
    
    return (
        <Card variant='outlined' sx={{ width: '40%', overflow: 'hidden' }} style={{margin: '0 auto 100px', border: 'solid 1px black', borderRadius: '5px'}}>
            <CardContent style={{margin: '0 auto'}}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow style={{width: '50%'}}>
                        <TableCell style={{fontWeight: 'bold', textTransform: 'capitalize'}}>
                            Open Price: 
                        </TableCell>
                        <TableCell align='right'>{entity?.open?.price ? entity?.open?.price : '-'}</TableCell>
                    </TableRow>
                    <TableRow style={{width: '50%'}}>
                        <TableCell style={{fontWeight: 'bold', textTransform: 'capitalize'}}>
                            Open Time: 
                        </TableCell>
                        <TableCell align='right'>{entity?.open?.time ? entity?.open?.time : '-'}</TableCell>
                    </TableRow>
                    <TableRow style={{width: '50%'}}>
                        <TableCell style={{fontWeight: 'bold', textTransform: 'capitalize'}}>
                            Close Time: 
                        </TableCell>
                        <TableCell align='right'>{entity?.close?.time ? entity?.close?.time : '-'}</TableCell>
                    </TableRow>
                    <TableRow style={{width: '50%'}}>
                        <TableCell style={{fontWeight: 'bold', textTransform: 'capitalize'}}>
                            Close Price: 
                        </TableCell>
                        <TableCell align='right'>{entity?.close?.price ? entity?.close?.price : '-'}</TableCell>
                    </TableRow>
                    <TableRow style={{width: '50%'}}>
                        <TableCell style={{fontWeight: 'bold', textTransform: 'capitalize'}}>
                            High: 
                        </TableCell>
                        <TableCell align='right'>{entity?.high ? entity?.high : '-'}</TableCell>
                    </TableRow>
                    <TableRow style={{width: '50%'}}>
                        <TableCell style={{fontWeight: 'bold', textTransform: 'capitalize'}}>
                            Low: 
                        </TableCell>
                        <TableCell align='right'>{entity?.low ? entity?.low : '-'}</TableCell>
                    </TableRow>
                    <TableRow style={{width: '50%'}}>
                        <TableCell style={{fontWeight: 'bold', textTransform: 'capitalize'}}>
                            Volume: 
                        </TableCell>
                        <TableCell align='right'>{entity?.volume ? entity?.volume : '-'}</TableCell>
                    </TableRow>
                    <TableRow style={{width: '50%'}}>
                        <TableCell style={{fontWeight: 'bold', textTransform: 'capitalize'}}>
                            Symbol: 
                        </TableCell>
                        <TableCell align='right'>{entity?.symbol ? entity?.symbol : '-'}</TableCell>
                    </TableRow>
                </TableHead>
             </Table>
            </CardContent>
        </Card>
    );
}