import React, {useState} from 'react';
import './App.css';
import { TVChartContainer } from './components/TVChartContainer/index';
import StockProfile from './components/stock-profile';
import { Grid, Typography, Card, Button, Link } from '@mui/material';
import RealTime from './components/real-time';
import StockFundamentals from './components/stock-fundamentals';

const tabs = [
	'realTime',
	'stockProfile',
	'stockFundamentals'
]

export default function App () {
	const [tab, setTab] = useState(tabs[0]);

	const class1 = tab === tabs[0] ? 'App-button-header-selected' : 'App-button-header';
	const class2 = tab === tabs[1] ? 'App-button-header-selected' : 'App-button-header';
	const class3 = tab === tabs[2] ? 'App-button-header-selected' : 'App-button-header';

	return (
		<div className={ 'App' }>
			<Card variant='outlined'>
            <Typography>
                <Grid style={{width: '80%', margin: '0 auto'}} direction='row' container alignItems='center' justifyContent='space-between'>
					<Link underline="none"
						style={{cursor: 'pointer', width: '200px'}}
						onClick={() => setTab(tabs[0])} className='App-button'>
						<h4 className={class1}>Real time</h4>
					</Link>
					<Link underline="none"
						style={{cursor: 'pointer', width: '200px'}}
						onClick={() => setTab(tabs[1])} className='App-button'>
						<h4 className={class2}>Stock profile</h4>
					</Link>
					<Link underline="none"
					style={{cursor: 'pointer', width: '200px'}}
					onClick={() => setTab(tabs[2])} className='App-button'>
						<h4 className={class3}>Stock fundamentals</h4>
					</Link>
                </Grid>
            </Typography>
        </Card>
		{tab === tabs[0] ? (
			<div>
				<div style={{width: '100%', height: '500px'}}>
					<TVChartContainer style={{height: '100%!'}} />
				</div>
				<RealTime/>
			</div>
		): null}
		{tab === tabs[1] ? (
			<div>
				<StockProfile />
			</div>
		): null}
		{tab === tabs[2] ? (
			<div>
				<StockFundamentals />
			</div>
		): null}
		</div>
	);
}
