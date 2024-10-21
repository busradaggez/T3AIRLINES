import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './App.css';

function BiletOnay() {
    const { state } = useLocation();
    const { departure, arrival, startDate, flight, selectedSeat } = state || {};
    const [isConfirmed, setIsConfirmed] = useState(false);
    const navigate = useNavigate();

    const handlePayment = () => {
        if (isConfirmed) {
            navigate('/odeme', {
                state: {
                    price: flight.price,
                    departure,
                    arrival,
                    startDate,
                    flight,
                    selectedSeat,
                    departureTime: flight.departureTime
                }
            });
        } else {
            alert('Lütfen bilgilerinizi onaylayın.');
        }
    };

    return (
        <div className="bilet-container" style={{ padding: '20px', maxWidth: '600px', margin: 'auto', border: '1px solid #ccc', borderRadius: '10px' }}>
            <h2>Bilet Onay</h2>
            <p><strong>Kalkış:</strong> {departure}</p>
            <p><strong>Varış:</strong> {arrival}</p>
            <p><strong>Uçuş Tarihi:</strong> {startDate}</p>
            <p><strong>Uçuş Saati:</strong> {flight.departureTime}</p>
            <p><strong>Uçuş Süresi:</strong> 1 saat 25 dakika</p>
            <p><strong>Sınıf:</strong> {flight.type}</p>
            <p><strong>Fiyat:</strong> TRY {flight.price}</p>
            <p><strong>Koltuk Numarası:</strong> {selectedSeat}</p>

            <div style={{ marginTop: '20px' }}>
                <label>
                    <input
                        type="checkbox"
                        checked={isConfirmed}
                        onChange={(e) => setIsConfirmed(e.target.checked)}
                    />
                    Bilgilerimin doğru olduğunu onaylıyorum.
                </label>
            </div>

            <button
                onClick={handlePayment}
                style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
                Ödeme
            </button>
        </div>
    );
}

export default BiletOnay;
