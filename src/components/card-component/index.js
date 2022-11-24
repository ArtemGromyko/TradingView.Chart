import React from 'react';
import { Card, CardContent, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import NoData from '../no-data';

export default function CardComponent({entity}) {
    console.log(entity);

    if (entity === {}) {
        return <NoData />
    }

    return (
        <Card variant='outlined' sx={{ width: '40%', overflow: 'hidden' }} style={{margin: '0 auto 100px', border: 'solid 1px black', borderRadius: '5px'}}>
            <CardContent style={{margin: '0 auto'}}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    {Object.entries(entity).map(([key, value] = entity, index) => {
                        console.log(entity.key);
                        return (
                                <TableRow key={index} style={{width: '50%'}}>
                                    <TableCell style={{fontWeight: 'bold', textTransform: 'capitalize'}}>
                                        {key.replace(/([a-z0-9])([A-Z])/g, '$1 $2')}:
                                    </TableCell>
                                    <TableCell align='right'>{Array.isArray(value) ? value.join(', ') : (value ?? '-')}</TableCell>
                                </TableRow>
                        );
                    })}
                </TableHead>
             </Table>
            </CardContent>
        </Card>
    );
}