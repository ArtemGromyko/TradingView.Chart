import React, {useState, useEffect} from "react";

import { getInsiderRoster, getInsiderSummary, getInsiderTransactions,
    getCEOCompensation, getCompany, getLogo, getPeers, getSymbols } from '../../services/request-sender';
import StickyHeadTable from "../table-paging";
import Spinner from '../spinner';
import CardComponent from "../card-component";
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

export default function StockProfile() {
    const [insiderRoster, setInsiderRoster] = useState(null);
    const [insiderRosterLoading, setInsiderRosterLoading] = useState(true);

    const [insiderSummary, setInsiderSummary] = useState(null);
    const [insiderSummaryLoading, setInsiderSummaryLoading] = useState(true);

    const [insiderTransactions, setInsiderTransactions] = useState(null);
    const [insiderTransactionsLoading, setInsiderTransactionsLoading] = useState(true);

    const [ceoCompensation, setCeoCompensation] = useState(null);
    const [ceoCompensationLoading, setCeoCompensationLoading] = useState(true);

    const [company, setCompany] = useState(null);
    const [companyLoading, setCompanyLoading] = useState(true);

    const [logo, setLogo] = useState(null);
    const [logoLoading, setLogoLoading] = useState(true);

    const [peers, setPeers] = useState(null);
    const [peersLoading, setPeersLoading] = useState(true);

    const [open, setOpen] = useState(false);
    const [symbols, setSymbols] = useState([]);
    const [symbol, setSymbol] = useState('AAPL');
    const [inputSymbol, setInputSymbol] = useState('AAPL');

    useEffect(() => {
        getSymbols()
            .then((res) => {
                setSymbols(res);
            });
        setInsiderSummaryLoading(true);
        setInsiderRosterLoading(true);
        setInsiderTransactionsLoading(true);
        setCeoCompensationLoading(true);
        setCompanyLoading(true);
        setLogoLoading(true);
        setPeersLoading(true);

        const wait =(ms = 300) =>new Promise(resolve => setTimeout(resolve, ms));
        async function fetchData() {

            getCEOCompensation(symbol)
                .then((res) => {
                    setCeoCompensation(res);
                    setCeoCompensationLoading(false);
                });

            await wait();

            getInsiderRoster(symbol)
                .then((res) => {
                    setInsiderRoster(res.items);
                    setInsiderRosterLoading(false);
                });
            

            await wait();

            getInsiderSummary(symbol)
                .then((res) =>{
                    setInsiderSummary(res);
                    setInsiderSummaryLoading(false);
                });
            
            await wait();

            getInsiderTransactions(symbol)
                .then((res) =>{
                    setInsiderTransactions(res);
                    setInsiderTransactionsLoading(false);
                });
            
            await wait();

            getCompany(symbol)
                .then((res) => {
                    setCompany(res);
                    setCompanyLoading(false);
                });
            
            await wait();

            getLogo(symbol)
                .then((res) => {
                    setLogo(res.url);
                    setLogoLoading(false);
                });

            await wait();

            getPeers(symbol)
                .then((res) => {
                    setPeers(res.items);
                    setPeersLoading(false);
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
                <h2>CEO compensation</h2>
                {!ceoCompensationLoading ? (<CardComponent entity={ceoCompensation} />) : <Spinner />}
            </div>
            <div>
                <h2>Company</h2>
                {!companyLoading ? (<CardComponent entity={company} />) : <Spinner />}
            </div>
            <div>
                <h2>Insider roster</h2>
                {!insiderRosterLoading ? (<StickyHeadTable rows={insiderRoster} />): <Spinner />}
            </div>
            <div>
                <h2>Insider summary</h2>
                {!insiderSummaryLoading ? (<StickyHeadTable rows={insiderSummary} />): <Spinner />}
            </div>
            <div>
                <h2>Insider transactions</h2>
                {!insiderTransactionsLoading ? (<StickyHeadTable rows={insiderTransactions} />): <Spinner />}
            </div>
            <div style={{marginBottom: '100px'}}>
                <h2>Logo</h2>
                {!logoLoading ? (logo === '' ? <NoData /> : <img src={logo} ></img>): <Spinner />}
            </div>
            <div style={{marginBottom: '100px'}}>
                <h2>Peers</h2>
                {!peersLoading ? (peers.length === 0 ? <NoData /> : <div>{peers.join(', ')}</div>) : <Spinner />}
            </div>
        </div>
    );
}