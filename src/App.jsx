import React from 'react';
import './App.css';
import { TVChartContainer } from './components/TVChartContainer/index';

export default function App () {
	const searchParams = new URLSearchParams(document.location.search);
	const s = searchParams.get('symbol');
	console.log(searchParams.get('symbol'));

	return (
		<div className={ 'App' }>
				<div style={{width: '60em', height: '30em'}}>
					<TVChartContainer symbol={s} />
				</div>
		</div>
	);
};