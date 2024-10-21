import React from 'react';
import { useLocation } from 'react-router-dom';
import './Rezervasyon.css';
import t3Logo from './t3airlines-logo.png';

function Rezervasyon() {
    const { state } = useLocation();
    const { reservationNumber, departure, arrival, startDate, selectedSeat, departureTime, price } = state || {};

    return (
        <div>
            <div className="container">
                <header className="header">
                    <img src={t3Logo} alt="T3 Airlines Logo" className="logo" />
                </header>
            </div>
            <div className='rezervasyon-container' style={{ padding: '20px', maxWidth: '600px', margin: 'auto', border: '1px solid #ccc', borderRadius: '10px' }}>
                <h3>Bilet rezervasyon işleminiz tamamlanmıştır.</h3>
                <h4><strong>Rezervasyon numaranız:</strong> {reservationNumber}</h4>
                <h3>Bilet Bilgileri</h3>
                <p><strong>Kalkış Havalimanı:</strong> {departure}</p>
                <p><strong>Varış Havalimanı:</strong> {arrival}</p>
                <p><strong>Gidiş Tarihi:</strong> {startDate}</p>
                <p><strong>Uçuş Saati:</strong> {departureTime}</p>
                <p><strong>Uçuş Süresi:</strong> 1 saat 25 dakika</p>
                <p><strong>Koltuk Numarası:</strong> {selectedSeat}</p>
                <p><strong>Fiyatı: TRY</strong> {price}</p>
            </div>
        </div>
    );
}

export default Rezervasyon;
