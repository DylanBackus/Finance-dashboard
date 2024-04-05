import React, { useState, useEffect } from 'react';
import axios from 'axios';
import startClock from './clock';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

const Staafdiagram = () => {
  const [cashInBank, setCashInBank] = useState([]);
  const [bitcoinPrice, setBitcoinPrice] = useState([]);
  const [ethereumPrice, setEthereumPrice] = useState([]);
  const [binanceCoinPrice, setBinanceCoinPrice] = useState([]);
  const [solanaPrice, setSolanaPrice] = useState([]);
  const [xrpPrice, setXrpPrice] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);

  const formattedData = historicalData.map((item) => ({
    time: new Date(item.time).toLocaleDateString(),
    price: parseFloat(item.priceUsd).toFixed(2),
  }));

  useEffect(() => {
    const intervalId = startClock();

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    axios.get('https://api.coincap.io/v2/assets/bitcoin/history?interval=d1')
      .then(response => {
        const data = response.data.data.slice(6).reverse();
        setHistoricalData(data);
      })

    axios.get('https://api.coincap.io/v2/assets/bitcoin')
      .then(response => {
        setBitcoinPrice(response.data.data);
      })

    axios.get('https://api.coincap.io/v2/assets/ethereum')
      .then(response => {
        setEthereumPrice(response.data.data);
      })

    axios.get('https://api.coincap.io/v2/assets/binance-coin')
      .then(response => {
        setBinanceCoinPrice(response.data.data);
      })

    axios.get('https://api.coincap.io/v2/assets/solana')
      .then(response => {
        setSolanaPrice(response.data.data);
      })

    axios.get('https://api.coincap.io/v2/assets/ripple')
      .then(response => {
        setXrpPrice(response.data.data);
      })

    const cashInBankData = {
      cashInBank: "616.5"
    };
    setCashInBank(cashInBankData.cashInBank);
  }, []);

  const pieChartData = [
    { name: 'Bitcoin', value: parseFloat(bitcoinPrice.priceUsd) },
    { name: 'Ethereum', value: parseFloat(ethereumPrice.priceUsd) },
    { name: 'Binance Coin', value: parseFloat(binanceCoinPrice.priceUsd) },
    { name: 'Solana', value: parseFloat(solanaPrice.priceUsd) },
    { name: 'XRP', value: parseFloat(xrpPrice.priceUsd) },
  ];

  const COLORS = ['#ff6800', '#9da7da', '#f0b90b', '#21b3a4', '#8884d8'];

  return (
    <main>
      <div className="react-card"></div>
      <div className="container">
        <div className="row1">
          <div className="blok1-top">
            <h1 className='blokken-main-text'>Top Coins</h1>
            <div className="circle-diagram-container">
              <PieChart width={300} height={300} className="circle-chart">
                <Pie
                  data={pieChartData}
                  cx={157.5}
                  cy={110}
                  labelLine={false}
                  outerRadius={100}
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
            <div className='top-5-container'>
              <div className='top-5-links'>
                <h1 className='top-5-valutas-text'> Bitcoin: <b>${parseFloat(bitcoinPrice.priceUsd).toFixed(2)}</b></h1>
                <h1 className='top-5-valutas-text'> Ethereum: <b>${parseFloat(ethereumPrice.priceUsd).toFixed(2)}</b></h1>
                <h1 className='top-5-valutas-text'> Binance: <b>${parseFloat(binanceCoinPrice.priceUsd).toFixed(2)}</b></h1>
              </div>
              <div className='top-5-rechts'>
                <h1 className='top-5-valutas-text'> Solana: <b>${parseFloat(solanaPrice.priceUsd).toFixed(2)}</b></h1>
                <h1 className='top-5-valutas-text'> XRP: <b>${parseFloat(xrpPrice.priceUsd).toFixed(2)}</b></h1>
                <h1 className='top-5-valutas-text'> Ethereum: <b>${parseFloat(ethereumPrice.priceUsd).toFixed(2)}</b></h1>
              </div>
            </div>
          </div>
          <div className="blok2-top">
            <div className='dropdown-en-text-container'>
              <h1 className="blokken-main-text">BTC Price</h1>
              <div class="dropdown">
                <span className='span-dropdown'>Other Coins</span>
                <div class="dropdown-content">
                  <p className="dropdown-items">Bitcoin</p>
                  <p className="dropdown-items">Ethereum</p>
                  <p className="dropdown-items">Binance</p>
                  <p className="dropdown-items">Solana</p>
                  <p className="dropdown-items">XRP</p>
                </div>
              </div>
            </div>
            <div className='cash-in-bank-container'>
              <div className="cash-in-bank-dollar">$</div>
              <h1 className='cash-in-bank-text'> {parseFloat(bitcoinPrice.priceUsd).toFixed(2)}</h1>
              <h1 className='cash-in-bank-current'>current</h1>
            </div>
            <AreaChart width={700} height={270} data={formattedData.reverse()}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <XAxis dataKey="time" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area type="monotone" dataKey="price" stroke="#F7931A" fill="url(#colorPrice)" />
            </AreaChart>
          </div>
        </div>
        <div className="row2">
          <div className="blok1-row2">
            <h1 className="blokken-main-text">Cash in bank</h1>
            <div className='cash-in-bank-container'>
              <div className="cash-in-bank-dollar">$</div>
              <h1 className='cash-in-bank-text'> {cashInBank}</h1>
              <h1 className='cash-in-bank-k'>K</h1>
              <h1 className='cash-in-bank-current'>Current</h1>
            </div>
          </div>
          <div className="blok2-row2">
            <h1 className="blokken-main-text">Debtors</h1>
          </div>
          <div className="blok3-row2">
            <h1 className="blokken-main-text">Debtors (Past 6 months)</h1>
          </div>
          <div className="blok4-row2">
            <h1 className="blokken-main-text">USD X. Rate</h1>
          </div>
        </div>
        <div className="promo-onder">
          <div className="cashflow-text-container">
            <img className="mijn-logo" src="./media/Garfield PFP.jpg" alt="Logo"></img>
            <h1 className="cashflow-text-promo">Cashflow Dashboard</h1>
            <h1 className="powered-by-text-promo">Powered by </h1>
            <a href="https://github.com/DylanBackus" className="dylan-backus-text-promo">Dylan Backus</a>
          </div>
          <div className="klok-bottom-container">
            <div id="clock">
              <h1 id="date-time" className="klok-bottom">14:54</h1>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};


export default Staafdiagram;
