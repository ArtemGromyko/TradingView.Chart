import React, { useEffect, useState } from 'react';

import StickyHeadTable from '../table-paging';
import { getBalanceSheet, getCashFlow, getDividends,
    getEarnings, getFinancials, getFinancialsAsReported, getIncomeStatement, getOptions, getSplits, getSymbols } from '../../services/request-sender';
import Spinner from '../spinner';
import { List } from "react-virtualized";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const ListboxComponent = React.forwardRef(function ListboxComponent(
    props,
    ref
  ) {
    const { children, role, ...other } = props;
    const itemCount = Array.isArray(children) ? children.length : 0;
    const itemSize = 36;
  
    return (
      <div ref={ref}>
        <div {...other}>
          <List
            height={250}
            width={300}
            rowHeight={itemSize}
            overscanCount={5}
            rowCount={itemCount}
            rowRenderer={props => {
              return React.cloneElement(children[props.index], {
                style: props.style
              });
            }}
            role={role}
          />
        </div>
      </div>
    );
  });

  

export default function StockFundamentals() {
    const [balanceSheet, setBalanceSheet] = useState(null);
    const [balanceSheetLoading, setBalanceSheetLoading] = useState(true);

    const [cashFlow, setCashFlow] = useState(null);
    const [cashFlowLoading, setCashFlowLoading] = useState(true);

    const [dividends, setDividends] = useState(null);
    const [dividendsLoading, setDividendsLoading] = useState(true);

    const [earnings, setEarnings] = useState(null);
    const [earningsLoading, setEarningsLoading] = useState(null);

    const [financials, setFinancials] = useState(null);
    const [financialsLoading, setFinancialsLoading] = useState(true);

    const [financialsAsReported, setFinancialsAsReported] = useState(null);
    const [financialsAsReportedLoading, setFinancialsAsReportedLoading] = useState(true);

    const [income, setIncome] = useState(null);
    const [incomeLoading, setIncomeLoading] = useState(true);

    const [splits, setSplits] = useState(null);
    const [splitsLoading, setSplitsLoading] = useState(true);

    const [options, setOptions] = useState(null);
    const [optionsLoading, setOptionsLoading] = useState(true);

    const [open, setOpen] = useState(false);
    const [symbols, setSymbols] = useState([]);
    const [symbol, setSymbol] = useState('AAPL');
    const [inputSymbol, setInputSymbol] = useState('AAPL');

    useEffect(() => {
        getSymbols()
            .then((res) => {
                setSymbols(res);
            });
        setBalanceSheetLoading(true);
        setCashFlowLoading(true);
        setDividendsLoading(true);
        setFinancialsLoading(true);
        setFinancialsAsReportedLoading(true);
        setIncomeLoading(true);
        setSplitsLoading(true);
        setOptionsLoading(true);

        const wait =(ms = 300) =>new Promise(resolve => setTimeout(resolve, ms));
        async function fetchData() {

            getBalanceSheet(symbol)
                .then((res) => {
                    setBalanceSheet(res.balanceSheet);
                    setBalanceSheetLoading(false);
                });

            await wait();

            getCashFlow(symbol)
                .then((res) => {
                    setCashFlow(res.cashFlow);
                    setCashFlowLoading(false);
                });

            await wait();

            getDividends(symbol)
                .then((res) => {
                    setDividends(res);
                    setDividendsLoading(false);
                });

            await wait();

            getFinancials(symbol)
                .then((res) => {
                    setFinancials(res.financials);
                    setFinancialsLoading(false);
                });

            await wait();

            getFinancialsAsReported(symbol)
                .then((res) => {
                    setFinancialsAsReported(res);
                    setFinancialsAsReportedLoading(false);
                });

            await wait();

            getIncomeStatement(symbol)
                .then((res) => {
                    setIncome(res.income);
                    setIncomeLoading(false);
                });

            await wait();

            getSplits(symbol)
                .then((res) => {
                    setSplits(res);
                    setSplitsLoading(false);
                });

            await wait();

            getOptions(symbol)
                .then((res) => {
                    setOptions(res.options);
                    setOptionsLoading(false);
                }); 
        }

        if (symbol !== '') {
            fetchData();
        }
    }, [symbol]);

    return (
        <div>
            <div style={{marginTop: '20px', marginLeft: '20px'}}>
            <Autocomplete
                id="asynchronous-demo"
                sx={{ width: 300 }}
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                //defaultValue={{symbol: 'AAPL'}}
                value={symbol}
                inputValue={inputSymbol}
                onInputChange={(event, newValue) => setInputSymbol(newValue || 'AAPL')}
                onChange={(event, newValue) => {setSymbol(newValue || 'AAPL');}}
                isOptionEqualToValue={(option, value) => { console.log(option, value); return option === value}}
                getOptionLabel={(option) => option}
                options={symbols}
                loading={symbols?.length > 0 ? false : true}
                ListboxComponent={ListboxComponent}
                renderInput={(params) => (
                    symbols?.length > 0 ? <TextField required {...params}/> : <Spinner />
                    
                    )}
                />
            </div>
            <div>
                <h2>Balance sheet</h2>
                {!balanceSheetLoading ? (<StickyHeadTable rows={balanceSheet} />) : <Spinner />}
            </div>
            <div>
                <h2>Cash flow</h2>
                {!cashFlowLoading ? (<StickyHeadTable rows={cashFlow} />): <Spinner />}              
            </div>
            <div>
                <h2>Dividends</h2>
                {!dividendsLoading ? (<StickyHeadTable rows={dividends} />): <Spinner />}  
            </div>
            <div>
                <h2>Financials</h2>
                {!financialsLoading ? (<StickyHeadTable rows={financials} />): <Spinner />} 
            </div>
            <div>
                <h2>Financials as reported</h2>
                {!financialsAsReportedLoading ? (<StickyHeadTable rows={financialsAsReported} />): <Spinner />}
            </div>
            <div>
                <h2>Income statement</h2>
                {!incomeLoading ? (<StickyHeadTable rows={income} />): <Spinner />}
            </div>
            <div style={{marginBottom: '100px'}}>
                <h2>Options</h2>
                {!optionsLoading ? (<StickyHeadTable rows={options} />): <Spinner />}
            </div>
            <div>
                <h2>Splits</h2>
                {!splitsLoading ? (<StickyHeadTable rows={splits} />): <Spinner />}
            </div>
            
        </div>
    )
}