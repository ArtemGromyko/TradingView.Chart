import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';

export default function Spinner() {
    return (
        <Grid container className='loader' style={{width: '100%'}} justifyContent='center' alignItems='center'>
            <CircularProgress style={{color: '#5c13d9'}} size={50} />
        </Grid>
    );
}