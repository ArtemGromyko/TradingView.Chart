const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
}

const baseUrl = 'https://localhost:7232/api';

async function getQuote(symbol) {
    const response = await fetch(`${baseUrl}/${symbol}/quote`, options);

    return response.json();
}

async function getIntradayPrices(symbol) {
    const response = await fetch(`${baseUrl}/${symbol}/intraday-prices`, options);

    return response.json();
}

async function getOHLC(symbol) {
    const response = await fetch(`${baseUrl}/${symbol}/ohlc`, options);

    return response.json();
}

async function getPreviousDayPrice(symbol) {
    const response = await fetch(`${baseUrl}/${symbol}/previous-day-price`, options);

    return response.json();
}

async function getPrice(symbol) {
    const response = await fetch(`${baseUrl}/${symbol}/price`, options);

    return response.json();
}

async function getDelayedQuote(symbol) {
    const response = await fetch(`${baseUrl}/${symbol}/delayed-quote`, options);

    return response.json();
}

async function getBook(symbol) {
    const response = await fetch(`${baseUrl}/${symbol}/book`, options);

    return response.json();
}

async function getSymbols() {
    const response = await fetch(`${baseUrl}/symbols/strings`, options);

    return response.json();
}

// stock profile

async function getPeers(symbol) {
    const response = await fetch(`${baseUrl}/${symbol}/peers`, options);

    return response.json();
}

async function getLogo(symbol) {
    const response = await fetch(`${baseUrl}/${symbol}/logo`, options);

    return response.json();
}

async function getCEOCompensation(symbol) {
    const response = await fetch(`${baseUrl}/${symbol}/ceo-compensation`, options);

    return response.json();
}

async function getCompany(symbol) {
    const response = await fetch(`${baseUrl}/${symbol}/company`, options);

    return response.json();
}

async function getInsiderRoster(symbol) {
    const response = await fetch(`${baseUrl}/${symbol}/insider-roster`, options);

    return response.json();
}

async function getLargestTrades(symbol) {
    const response = await fetch(`${baseUrl}/${symbol}/largest-trades`, options);

    return response.json();
}

async function getInsiderSummary(symbol) {
    const response = await fetch(`${baseUrl}/${symbol}/insider-summary`, options);

    return response.json();
}

async function getInsiderTransactions(symbol) {
    const response = await fetch(`${baseUrl}/${symbol}/insider-transactions`, options);

    return response.json();
}

//stock fundamentals

async function getBalanceSheet(symbol) {
    const response = await fetch(`${baseUrl}/${symbol}/balance-sheet`, options);

    return response.json();
}

async function getCashFlow(symbol) {
    const response = await fetch(`${baseUrl}/${symbol}/cash-flow`, options);

    return response.json();
}

async function getDividends(symbol) {
    const response = await fetch(`${baseUrl}/${symbol}/dividends`, options);

    return response.json();
}

async function getEarnings(symbol) {
    const response = await fetch(`${baseUrl}/${symbol}/earnings`, options);

    return response.json();
}

async function getFinancials(symbol) {
    const response = await fetch(`${baseUrl}/${symbol}/financials`, options);

    return response.json();
}

async function getFinancialsAsReported(symbol) {
    const response = await fetch(`${baseUrl}/time-series/reported_financials/${symbol}`, options);

    return response.json();
}

async function getIncomeStatement(symbol) {
    const response = await fetch(`${baseUrl}/${symbol}/income`, options);

    return response.json();
}

async function getOptions(symbol) {
    const response = await fetch(`${baseUrl}/${symbol}/options/expiration`, options);

    return response.json();
}

async function getSplits(symbol) {
    const response = await fetch(`${baseUrl}/${symbol}/splits`, options);

    return response.json();
}

export {
    getInsiderRoster, getLargestTrades, getInsiderSummary, getInsiderTransactions, getBalanceSheet, getCashFlow, getDividends,
    getEarnings, getFinancialsAsReported, getFinancials, getIncomeStatement, getOptions, getSplits, getCEOCompensation,
    getCompany, getLogo, getPeers, getSymbols, getQuote, getIntradayPrices, getOHLC, getPreviousDayPrice, getPrice,
    getDelayedQuote, getBook
}