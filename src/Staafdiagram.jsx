import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        axios.get('https://api.coincap.io/v2/assets')
            .then(function (response) {
                console.log(response.data.data);
                setCoins(response.data.data);
            })
            .catch(function (error) {
                console.error('Error', error);
            });
    }, []);

    return (
        <div className='coin-list-container'>
            <ul>
                {coins.map((coin) => <li key={coin.id}>{coin.name}</li>)}
            </ul>
        </div>
    );
}

export default App;

/*
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios, { isCancel, AxiosError } from 'axios';

useEffect(() => {
axios.get('https://api.coincap.io/v2/assets')
.then(function(response) {
console.log(response.data.data);
setCoins(response.data.data);
})});
return (
  <>
  <ul>
    {coins && coins.map((coin) => <li key={coin.id}>{coin.naam}</li>)}
  </ul>
  </>
) 
export default App */