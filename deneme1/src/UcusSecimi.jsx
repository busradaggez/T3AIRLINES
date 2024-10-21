import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function generateRandomTime() {
    const hour = Math.floor(Math.random() * 24);
    const minute = Math.floor(Math.random() * 60);
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
}

function generateRandomPrice(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
}


function parseTimeToDate(timeString) {
    const [hour, minute] = timeString.split(':');
    const now = new Date();
    now.setHours(hour);
    now.setMinutes(minute);
    now.setSeconds(0);
    return now;
}

function UcusSecimi() {
    const [selectedFlight, setSelectedFlight] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { departure, arrival, startDate, endDate, oneWay } = location.state || {};
    const today = new Date();
    const isToday = new Date(startDate).toDateString() === today.toDateString();
    const generatedFlights = [
        {
            departureTime: generateRandomTime(),
            priceEconomy: generateRandomPrice(500, 2500),
            priceBusiness: generateRandomPrice(3000, 5000),
        },
        {
            departureTime: generateRandomTime(),
            priceEconomy: generateRandomPrice(500, 2500),
            priceBusiness: generateRandomPrice(3000, 5000),
        },
        {
            departureTime: generateRandomTime(),
            priceEconomy: generateRandomPrice(500, 2500),
            priceBusiness: generateRandomPrice(3000, 5000),
        },
    ];

    useEffect(() => {
        let filteredFlights = [...generatedFlights];
        if (isToday) {
            const currentTime = new Date();
            filteredFlights = filteredFlights.filter((flight) => {
                const flightTime = parseTimeToDate(flight.departureTime);
                return flightTime >= currentTime;
            });
        }

        filteredFlights.sort((a, b) => {
            const timeA = parseTimeToDate(a.departureTime);
            const timeB = parseTimeToDate(b.departureTime);
            return timeA - timeB;
        });

        setFlights(filteredFlights);
    }, [isToday]);

    const [flights, setFlights] = useState(generatedFlights);

    // Uçuş seçme işlemi
    function handleFlightSelect(flight, type) {
        const price = type === 'Economy' ? flight.priceEconomy : flight.priceBusiness;
        setSelectedFlight({ ...flight, type, price });
    }

    function goToSeatSelection() {
        if (selectedFlight) {
            navigate('/koltuk-secimi', {
                state: {
                    departure,
                    arrival,
                    startDate,
                    endDate,
                    oneWay,
                    flight: selectedFlight
                }
            });
        }
    }

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
            <h2>Uçuş Seçimi: {departure} - {arrival}</h2>
            <p><b>Gidiş Tarihi:</b> {startDate}</p>
            {!oneWay && <p><b>Dönüş Tarihi:</b> {endDate}</p>}

            {flights.length === 0 ? (
                <p>Bu saatten sonra uçuş bulunmamaktadır.</p>
            ) : (
                flights.map((flight, index) => (
                    <div key={index} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
                        <p><b>Biniş Saati:</b> {flight.departureTime}</p>
                        <p><b>Uçuş süresi:</b> 1 saat 25 dakika</p>
                        <div style={{ display: 'flex', gap: '10px' }}>

                            <button
                                onClick={() => handleFlightSelect(flight, 'Economy')}
                                style={{ padding: '10px', background: '#007bff', color: '#fff', cursor: 'pointer' }}
                            >
                                Economy: TRY {flight.priceEconomy}
                            </button>

                            <button
                                onClick={() => handleFlightSelect(flight, 'Business')}
                                style={{ padding: '10px', background: '#28a745', color: '#fff', cursor: 'pointer' }}
                            >
                                Business: TRY {flight.priceBusiness}
                            </button>
                        </div>
                    </div>
                ))
            )}

            {selectedFlight && (
                <div style={{ marginTop: '20px', padding: '10px', border: '1px solid green' }}>
                    <h3>Seçilen Uçuş</h3>
                    <p><b>Biniş Saati:</b>{selectedFlight.departureTime}</p>
                    <p><b>Seçilen Sınıf:</b>{selectedFlight.type}</p>
                    <p><b>Fiyat:</b> TRY {selectedFlight.price}</p>

                    <button
                        onClick={goToSeatSelection}
                        style={{ padding: '10px', background: '#28a745', color: '#fff', cursor: 'pointer', marginTop: '10px' }}
                    >
                        Koltuk Seçimi
                    </button>
                </div>
            )}
        </div>
    );
}

export default UcusSecimi;
