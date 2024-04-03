import React, { useState, useEffect, PureComponent } from 'react';
import startClock from './clock';
import axios from 'axios';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const Staafdiagram = () => {
  const [cashInBank, setCashInBank] = useState([]);
  const [bitcoinPrice, setBitcoinPrice] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);

  useEffect(() => {
    axios.get('https://api.coincap.io/v2/assets/bitcoin')
      .then(response => {
        const btc = response.data.data;
        setBitcoinPrice(btc);
      })
      .catch(error => {
        console.error('Error fetching Bitcoin price:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('https://api.coincap.io/v2/assets/bitcoin/history?interval=d1')
      .then(response => {
        const data = response.data.data.slice(6).reverse();
        setHistoricalData(data);
      })
      .catch(error => {
        console.error('Error fetching historical data:', error);
        const btc = response.data.data.find(coin => coin.id === "bitcoin")
        setBitcoinPrice(btc)
      });
  }, []);

  const formattedData = historicalData.map((item, index) => ({
    name: `${index + 1} Month`,
    uv: parseFloat(item.priceUsd).toFixed(2),
    pv: 2400,
    amt: 2400
  }));

  useEffect(() => {
    const cashInBankData = {
      cashInBank: "616.5"
    };

    setCashInBank(cashInBankData.cashInBank);
  }, []);

  return (
    <main>
      <div class="react-card"></div>
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
              <h1 className='cash-in-bank-current'>currect</h1>
            </div>
            <AreaChart width={700} height={270} data={formattedData.reverse()}
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