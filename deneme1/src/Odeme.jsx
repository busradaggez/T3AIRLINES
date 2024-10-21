import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Odeme.css';

function Odeme() {
    const location = useLocation();
    const navigate = useNavigate();
    const { price, departure, arrival, startDate, endDate, flight, selectedSeat, departureTime } = location.state || {};

    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryMonth, setExpiryMonth] = useState('');
    const [expiryYear, setExpiryYear] = useState('');
    const [cvv, setCvv] = useState('');

    const [errors, setErrors] = useState({
        cardNumber: '',
        cvv: '',
        general: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const cardNumberClean = cardNumber.replace(/\s+/g, '');

        if (!cardName || !cardNumber || !expiryMonth || !expiryYear || !cvv) {
            setErrors({ ...errors, general: 'Lütfen tüm alanları doldurunuz.' });
            return;
        }

        if (cardNumberClean.length !== 16) {
            setErrors({ ...errors, cardNumber: 'Kart numarasını eksik girdiniz.' });
            return;
        }

        if (cvv.length !== 3) {
            setErrors({ ...errors, cvv: 'CVV numarasını eksik girdiniz.' });
            return;
        }

        setErrors({ cardNumber: '', cvv: '', general: '' });

        navigate('/rezervasyon', {
            state: {
                price,
                departure,
                arrival,
                startDate,
                endDate,
                flight,
                selectedSeat,
                departureTime,
                reservationNumber: 'PR865N4'
            }
        });
    };

    const handleCardNumberChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        const formattedValue = value.replace(/(.{4})/g, '$1 ').trim();
        if (value.length <= 16) {
            setCardNumber(formattedValue);
        }
    };

    const handleCvvChange = (e) => {
        const value = e.target.value;
        if (value.length <= 3) {
            setCvv(value);
        }
    };

    return (
        <div className="payment-container">
            <h2>Ödeme Sayfası</h2>
            <form onSubmit={handleSubmit} className="payment-form">
                <div className="form-group">
                    <label>Kart Sahibinin Adı Soyadı</label>
                    <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Kart Numarası</label>
                    <input
                        type="text"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        required
                    />
                    {errors.cardNumber && <p style={{ color: 'red' }}>{errors.cardNumber}</p>}
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Son Kullanma Tarihi</label>
                        <div className="expiry-fields">
                            <select
                                value={expiryMonth}
                                onChange={(e) => setExpiryMonth(e.target.value)}
                                required
                            >
                                <option value="" disabled>Ay</option>
                                {[...Array(12).keys()].map(i => (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                ))}
                            </select>

                            <select
                                value={expiryYear}
                                onChange={(e) => setExpiryYear(e.target.value)}
                                required
                            >
                                <option value="" disabled>Yıl</option>
                                {[...Array(10).keys()].map(i => (
                                    <option key={i} value={2024 + i}>{2024 + i}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>CVV2</label>
                        <input
                            type="text"
                            value={cvv}
                            onChange={handleCvvChange}
                            required
                            maxLength="3"
                        />
                        {errors.cvv && <p style={{ color: 'red' }}>{errors.cvv}</p>}
                    </div>
                </div>

                <div className="form-group">
                    <p><b>İşlem Tutarı:</b> {price ? `${price} TL` : 'Fiyat bilgisi bulunamadı'}</p>
                </div>

                {errors.general && <p style={{ color: 'red' }}>{errors.general}</p>}

                <button type="submit" className="submit-button">
                    Ödeme Yap
                </button>
            </form>
        </div>
    );
}

export default Odeme;
