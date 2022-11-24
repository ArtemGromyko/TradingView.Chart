import React, {useState, useEffect} from "react";

import StickyHeadTable from "../table-paging";
import CardComponent from "../card-component";
import { getLargestTrades, getQuote, getIntradayPrices, getOHLC, getPreviousDayPrice, getPrice,
    getDelayedQuote, getBook, getSymbols } from '../../services/request-sender';
import Spinner from "../spinner";
import OhlcCardComponent from "../ohlc-card-component";
import BookTable from "../book-table";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { List } from "react-virtualized";
import NoData from "../no-data";

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

export default function RealTime() {
    const [largestTrades, setlargestTrades] = useState(null);
    const [largestTradesLoading, setLargestTradesLoading] = useState(true);

    const [quote, setQuote] = useState(null);
    const [quoteLoading, setQuoteLoading] = useState(true);

    const [intradayPrices, setIntradayPrices] = useState(null);
    const [intradayPricesLoading, setIntradayPricesLoading] = useState(true);

    const [ohlc, setOhlc] = useState(null);
    const [ohlcLoading, setOhlcLoading] = useState(true);

    const [previousDayPrice, setPreviousDayPrice] = useState(null);
    const [previousDayPriceLoading, setPreviousDayPriceLoading] = useState(true);

    const [price, setPrice] = useState(null);
    const [priceLoading, setPriceLoading] = useState(true);

    const [delayedQuote, setDelayedQuote] = useState(null);
    const [delayedQuoteLoading, setDelayedQuoteLoading] = useState(true);

    const [book, setBook] = useState(null);
    const [bookLoading, setBookLoading] = useState(true);

    const [open, setOpen] = useState(false);
    const [symbols, setSymbols] = useState([]);
    const [symbol, setSymbol] = useState('AAPL');
    const [inputSymbol, setInputSymbol] = useState('AAPL');

    useEffect(() => {
        getSymbols()
            .then((res) => {
                setSymbols(res);
            });
        setLargestTradesLoading(true);
        setQuoteLoading(true);
        setIntradayPricesLoading(true);
        setOhlcLoading(true);
        setPreviousDayPriceLoading(true);
        setPriceLoading(true);
        setDelayedQuoteLoading(true);
        setBookLoading(true);
        

        const wait =(ms = 300) =>new Promise(resolve => setTimeout(resolve, ms));
        async function fetchData() {
            getLargestTrades(symbol)
                .then((res) => {
                    setlargestTrades(res);
                    setLargestTradesLoading(false);
                });

            getQuote(symbol)
                .then((res) => {
                    setQuote(res);
                    setQuoteLoading(false);
                });

            getIntradayPrices(symbol)
                .then((res) => {
                    setIntradayPrices(res);
                    setIntradayPricesLoading(false);
                });

            getOHLC(symbol)
                .then((res) => {
                    setOhlc(res);
                    setOhlcLoading(false);
                });
            
            getPreviousDayPrice(symbol)
                .then((res) => {
                    setPreviousDayPrice(res);
                    setPreviousDayPriceLoading(false);
                });

            getPrice(symbol)
                .then((res) => {
                    setPrice(res);
                    setPriceLoading(false);
                });
            
            getDelayedQuote(symbol)
                .then((res) => {
                    setDelayedQuote(res);
                    setDelayedQuoteLoading(false);
                });

            getBook(symbol)
                .then((res) => {
                    setBook(res);
                    setBookLoading(false)
                });
        
        }

        if (symbol !== '') {
            fetchData();
        }

    }, [symbol]);

    useEffect(() => {
        console.log(book)
    })

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
                value={symbol}
                inputValue={inputSymbol}
                onInputChange={(event, newValue) => setInputSymbol(newValue)}
                onChange={(event, newValue) => {setSymbol(newValue || 'AAPL');}}
                isOptionEqualToValue={(option, value) => { return option === value}}
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
                <h2>Quote</h2>
                {!quoteLoading ? <CardComponent entity={quote}/> : <Spinner />}
            </div>
            <div>
                <h2>Intraday prices</h2>
                {!intradayPricesLoading ? <StickyHeadTable rows={intradayPrices} /> : <Spinner />}
            </div>
            <div>
                <h2>Largest trades</h2>
                {!largestTradesLoading ? <StickyHeadTable rows={largestTrades} /> : <Spinner />}
            </div>
            <div>
                <h2>OHLC</h2>
                {!ohlcLoading ? <OhlcCardComponent entity={ohlc}/> : <Spinner />}
            </div>
            <div>
                <h2>Previous day price</h2>
                {!previousDayPriceLoading ? <CardComponent entity={previousDayPrice}/> : <Spinner />}
            </div>
            <div style={{marginBottom: '100px'}}>
                <h2>Price only</h2>
                {!priceLoading ? <h4>{price}</h4>: <Spinner />}
            </div>
            <div>
                <h2>Book</h2>
                {!bookLoading ? <BookTable entity={book}/> : <Spinner />}
            </div>
            <div>
                <h2>Delayed quote</h2>
                {!delayedQuoteLoading ? <CardComponent entity={delayedQuote}/> : <Spinner />}
            </div>
        </div>
    );
}