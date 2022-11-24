import React from 'react';
import { Card } from '@mui/material';

export default function NoData() {

    return (
        <Card variant='outlined' style={{width:'30%', margin: '0 auto', marginBottom: '100px', border: 'solid 1px black', borderRadius: '5px'}}>
            <h4>No data</h4>
        </Card>
    );
}