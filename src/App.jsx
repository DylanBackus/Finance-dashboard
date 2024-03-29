import React, { useState, useEffect, PureComponent } from 'react';
import startClock from './clock';
import axios from 'axios';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const Staafdiagram = () => {
  const [cashInBank, setCashInBank] = useState([]);
  const [bitcoinPrice, setBitcoinPrice] = useState([]);

  const data = [
    {
      "name": "Page A",
      "uv": 4000,
      "pv": 2400,
      "amt": 2400
    },
    {
      "name": "Page B",
      "uv": 3000,
      "pv": 1398,
      "amt": 2210
    },
    {
      "name": "Page C",
      "uv": 2000,
      "pv": 9800,
      "amt": 2290
    },
    {
      "name": "Page D",
      "uv": 2780,
      "pv": 3908,
      "amt": 2000
    },
    {
      "name": "Page E",
      "uv": 1890,
      "pv": 4800,
      "amt": 2181
    },
    {
      "name": "Page F",
      "uv": 2390,
      "pv": 3800,
      "amt": 2500
    },
    {
      "name": "Page G",
      "uv": 3490,
      "pv": 4300,
      "amt": 2100
    },
    
  ]

  useEffect(() => {
    const intervalId = startClock();

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const [coins, setCoins] = useState([]);

  useEffect(() => {
    axios.get('https://api.coincap.io/v2/assets').then(response => {
      setCoins(response.data.data)
      const btc = response.data.data.find(coin => coin.id === "bitcoin")
      setBitcoinPrice(btc)
    });
  }, []);

  useEffect(() => {
    const cashInBankData = {
      cashInBank: "616.5"
    };

    setCashInBank(cashInBankData.cashInBank);
  }, []);

  return (
    <main>
      <div className="container">
        <div className="row1">
          <div className="blok1-top">
            <h1 className="blokken-main-text">Cash in bank</h1>
            <div className='cash-in-bank-container'>
              <div className="cash-in-bank-dollar">$</div>
              <h1 className='cash-in-bank-text'> {cashInBank}</h1>
              <h1 className='cash-in-bank-k'>K</h1>
              <h1 className='cash-in-bank-current'>Current</h1>
            </div>
          </div>
          <div className="blok2-top">
            <h1 className="blokken-main-text">BTC Price</h1>
            <div className='cash-in-bank-container'>
              <div className="cash-in-bank-dollar">$</div>
              <h1 className='cash-in-bank-text'> {parseFloat(bitcoinPrice.priceUsd).toFixed(2)}</h1>
              <h1 className='cash-in-bank-current'>6 month avg</h1>
            </div>
            <AreaChart width={700} height={270} data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>  
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area type="monotone" dataKey="uv" stroke="#F7931A" fillOpacity={1} fill="url(#colorUv)" />
            </AreaChart>
          </div>
        </div>
        <div className="row2">
          <div className="blok1-row2">
            <h1 className="blokken-main-text">Solvency</h1>
          </div>
          <div className="blok2-row2">
            <h1 className="blokken-main-text">Deptors</h1>
          </div>
          <div className="blok3-row2">
            <h1 className="blokken-main-text">Deptors (Past 6 months)</h1>
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
              <h1 id="date-time" className="klok-bottom"></h1>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Staafdiagram;