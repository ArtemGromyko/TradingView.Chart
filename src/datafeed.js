const configurationData = {
    supported_resolutions: ['1D', '1W', '1M'],
    exchanges: [],
    supports_marks: true,
    supports_timescale_marks: true,
    enabled_features: [
        'create_volume_indicator_by_default'
        ],
    symbols_types: [
        {
            name: 'stocks',

            // `symbolType` argument for the `searchSymbols` method, if a user selects this symbol type
            value: 'stocks',
        },
    ]
};

async function getAllSymbols() {

    var data = await makeApiRequest('symbols');

    let allSymbols = [];

    for (const symbolObject of data) {
        allSymbols = allSymbols.concat({
            symbol: symbolObject.symbol,
            full_name: symbolObject.symbol,
            description: symbolObject.name,
            exchange: symbolObject.exchange,
            type: 'stocks'
        });
    }

    return allSymbols;

    //makeApiRequest('ref-data/symbols?token=pk_85ec59ee38fe474e84c13e81689fc475')
    //    .then((data) => {
    //        let allSymbols = [];


    //        for (const symbolObject of data.Data) {
    //            allSymbols = allSymbols.concat({
    //                symbol: symbolObject.symbol,
    //                full_name: symbolObject.name,
    //                description: symbolObject.name,
    //                exchange: symbolObject.exchange,
    //                type: 'crypto'
    //            });
    //        }

    //        return allSymbols;
    //    });
}

async function makeApiRequest(path) {
    var data;
    await timeout(50);
    data = await fetch(`https://localhost:7287/api/${path}`);
    return data.json();
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function dateToTicks(date) {
    const epochOffset = 621355968000000000;
    const ticksPerMillisecond = 10000;

    const ticks = new Date(date).getTime() * ticksPerMillisecond + epochOffset;

    return ticks;
}


function parseFullSymbol(fullSymbol) {
    const match = fullSymbol.match(/^(\w+):(\w+)\/(\w+)$/);
    if (!match) {
        return null;
    }

    return { exchange: match[1], fromSymbol: match[2], toSymbol: match[3] };
}

export const Datafeed = {
    onReady: (callback) => {
        console.log('[onReady]: Method call');

        makeApiRequest(`exchanges`)
            .then(exchanges => {
                configurationData.exchanges = exchanges.map((exchange) => ({
                    value: exchange.exchange,
                    name: exchange.exchange,
                    desc: exchange.description
                }));
            }).then(() => setTimeout(() => callback(configurationData)));
    },

    searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
        console.log('[searchSymbols]: Method call');
        console.log(userInput);
        getAllSymbols().then((symbols) => {
            console.log(symbols)
            const newSymbols = symbols.filter(symbol => {
                const isExchangeValid = exchange === '' || symbol.exchange === exchange;
                const isFullSymbolContainsInput = symbol.symbol
                    .toLowerCase()
                    .indexOf(userInput.toLowerCase()) !== -1;
                return isExchangeValid && isFullSymbolContainsInput;
            });
            onResultReadyCallback(newSymbols);
        });
    },

    resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
        console.log('[resolveSymbol]: Method call', symbolName);
        getAllSymbols()
            .then((symbols) => {
                const symbolItem = symbols.find(({ full_name }) => full_name === symbolName);

                if (!symbolItem) {
                    console.log('[resolveSymbol]: Cannot resolve symbol', symbolName);
                    onResolveErrorCallback('cannot resolve symbol');
                    return;
                }
                const symbolInfo = {
                    ticker: symbolItem.full_name,
                    name: symbolItem.symbol,
                    description: symbolItem.description,
                    type: symbolItem.type,
                    session: '24x7',
                    timezone: 'Etc/UTC',
                    exchange: symbolItem.exchange,
                    minmov: 1,
                    pricescale: 100,
                    has_intraday: false,
                    has_no_volume: false,
                    has_weekly_and_monthly: false,
                    supported_resolutions: configurationData.supported_resolutions,
                    volume_precision: 2,
                    data_status: 'streaming',
                };

                console.log('[resolveSymbol]: Symbol resolved', symbolName);
                onSymbolResolvedCallback(symbolInfo);
            });

    },

    getBars: (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) => {
        console.log('[getBars]: Method call', symbolInfo);
        const { from, to, firstDataRequest } = periodParams;

        console.log('[getBars]: Method call', symbolInfo, resolution, from, to, firstDataRequest);
        var currectTime = new Date().getTime();
        var needToLoadCurrentPrice = currectTime >= from * 1000 && currectTime < to * 1000;

        try {

            makeApiRequest(`${symbolInfo.name}/historical-prices`)
                .then((data) => {
                    if (data.Response && data.Response === 'Error' || data.length === 0) {
                        // "noData" should be set if there is no data in the requested period.
                        onHistoryCallback([], { noData: true });
                        return;
                    }
                    let bars = [];
                    data.forEach(bar => {
                        if (new Date(bar.date).getTime() >= from * 1000 && new Date(bar.date).getTime() < to * 1000) {
                            bars = [...bars, {
                                time: new Date(bar.date).getTime(),
                                low: bar.low,
                                high: bar.high,
                                open: bar.open,
                                close: bar.close,
                                volume: bar.volume
                            }];
                        }
                    });

                    console.log(`[getBars]: returned ${bars.length} bar(s)`);
                    console.log(bars);
                    onHistoryCallback(bars, { noData: false });
                });
        } catch (error) {
            console.log('[getBars]: Get error', error);
            onErrorCallback(error);
        }
    },
    subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback) => {
        console.log('[subscribeBars]: Method call with subscribeUID:', subscribeUID);
    },
    unsubscribeBars: (subscriberUID) => {
        console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID);
    }
};

