import React, { useEffect } from 'react';
import startClock from './clock';

const Staafdiagram = () => {
    useEffect(() => {
        const intervalId = startClock();

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <div className="container">
            <div className="row1">
                <div className="blok1-top">
                    <h1 className="blokken-main-text">Cash in bank</h1>
                </div>
                <div className="blok2-top">
                    <h1 className="blokken-main-text">Burn</h1>
                </div>
                <div className="blok3-top">
                    <h1 className="blokken-main-text">Expenses</h1>
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
                    <a href="https://dylanbackus.github.io/" className="dylan-backus-text-promo">Dylan Backus</a>
                </div>
                <div className="klok-bottom-container">
                    <div id="clock">
                        <h1 id="date-time" className="klok-bottom">14:54</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Staafdiagram;
