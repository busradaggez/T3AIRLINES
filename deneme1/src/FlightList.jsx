import React from 'react';
import { useLocation } from 'react-router-dom';

const flights = [
    { id: 1, departure: "IST", arrival: "ESB", date: "16/10/2024", price: 500 },
    { id: 2, departure: "IST", arrival: "ADB", date: "17/10/2024", price: 400 },
    { id: 3, departure: "ESB", arrival: "AYT", date: "16/10/2024", price: 350 },
    { id: 4, departure: "ADB", arrival: "IST", date: "18/10/2024", price: 450 },
];

function FlightList() {
    const location = useLocation();
    const { departure, arrival, startDate } = location.state;

    const formattedDate = startDate.toLocaleDateString('tr-TR');

    const filteredFlights = flights.filter(
        (flight) =>
            flight.departure === departure &&
            flight.arrival === arrival &&
            flight.date === formattedDate
    );

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <h1>Uygun Uçuşlar</h1>
            {filteredFlights.length > 0 ? (
                <ul>
                    {filteredFlights.map((flight) => (
                        <li key={flight.id}>
                            {flight.departure} - {flight.arrival} | Fiyat: {flight.price} TL | Tarih: {flight.date}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Seçimlerinize uygun uçuş bulunamadı.</p>
            )}
        </div>
    );
}

export default FlightList;
