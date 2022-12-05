import * as React from 'react';
import './index.css';
import { widget } from '../../charting_library';
import { Datafeed } from '../../datafeed.js';

function getLanguageFromURL() {
	const regex = new RegExp('[\\?&]lang=([^&#]*)');
	const results = regex.exec(window.location.search);
	return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

export class TVChartContainer extends React.PureComponent {
	static defaultProps = {
		symbol: 'AAPL', // default symbol
    	interval: '24M', // default interval
    	period: '24M',
    	fullscreen: false, // displays the chart in the fullscreen mode
		height: 500,
		autosize: true,
   		container: 'TVChartContainer',
    	datafeed: Datafeed,
		libraryPath: '/charting_library/',
	};

	tvWidget = null;

	constructor(props) {
		super(props);

		this.ref = React.createRef();
	}

	componentDidMount() {
		const widgetOptions = {
			symbol: this.props.symbol,
			// BEWARE: no trailing slash is expected in feed URL
			datafeed: Datafeed,
			interval: this.props.interval,
			container: this.ref.current,
			library_path: this.props.libraryPath,

			locale: getLanguageFromURL() || 'en',
			disabled_features: ['use_localstorage_for_settings',"header_symbol_search"],
			enabled_features: ['study_templates'],
			charts_storage_url: this.props.chartsStorageUrl,
			charts_storage_api_version: this.props.chartsStorageApiVersion,
			client_id: this.props.clientId,
			user_id: this.props.userId,
			fullscreen: this.props.fullscreen,
			width: this.props.width,
			height: this.props.height,
			autosize: this.props.autosize,
			studies_overrides: this.props.studiesOverrides,
			hide_top_toolbar: false,
    		left_toolbar: true,
    		hide_side_toolbar: false,
    		allow_symbol_change: false,
    		hideideas: false,
		};

		const tvWidget = new widget(widgetOptions);

		this.tvWidget = tvWidget;
	}

	componentWillUnmount() {
		if (this.tvWidget !== null) {
			this.tvWidget.remove();
			this.tvWidget = null;
		}
	}

	render() {
		return (
			<div
				ref={ this.ref }
				className={ 'TVChartContainer' }
			/>
		);
	}
}
