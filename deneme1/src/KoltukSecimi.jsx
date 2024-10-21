import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './KoltukSecimi.css';

const generateSeatLayout = () => {
    const rows = 27;
    const cols = ['A', 'B', 'C', 'D', 'E', 'F'];
    let seatLayout = [];

    for (let i = 1; i <= rows; i++) {
        let row = cols.map((col) => ({
            seat: `${i}${col}`,
            isOccupied: Math.random() < 0.5,
        }));
        seatLayout.push(row);
    }

    return seatLayout;
};

function KoltukSecimi() {
    const [seatLayout, setSeatLayout] = useState([]);
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [hoveredSeat, setHoveredSeat] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const { departure, arrival, startDate, endDate, oneWay, flight } = location.state || {};

    useEffect(() => {
        setSeatLayout(generateSeatLayout());
    }, []);

    const handleSeatClick = (seat, isOccupied) => {
        if (!isOccupied) {
            setSelectedSeat(seat);
        }
    };

    const handleSeatHover = (seat) => {
        setHoveredSeat(seat);
    };

    const handleSeatLeave = () => {
        setHoveredSeat(null);
    };

    const goToConfirmationPage = () => {
        if (selectedSeat) {
            navigate('/bilet-onay', {
                state: {
                    departure,
                    arrival,
                    startDate,
                    endDate,
                    oneWay,
                    flight,
                    selectedSeat,
                },
            });
        }
    };

    return (
        <div className="seat-selection-container">
            <h1>Koltuk Seçimi</h1>
            <p><b>Kalkış:</b> {departure}<b> Varış: </b>{arrival}</p>
            <p><b>Gidiş Tarihi:</b> {startDate}</p>
            {!oneWay && <p><b>Dönüş Tarihi:</b> {endDate}</p>}

            <div className="seat-info-row">
                <div className="seat-info-item">
                    <div style={{ width: '20px', height: '20px', backgroundColor: '#ccc', display: 'inline-block' }}></div>
                    <span>Seçilebilir Koltuk</span>
                </div>
                <div className="seat-info-item">
                    <div style={{ width: '20px', height: '20px', backgroundColor: 'blue', display: 'inline-block' }}></div>
                    <span>Seçilen Koltuk</span>
                </div>
                <div className="seat-info-item">
                    <div style={{ width: '20px', height: '20px', backgroundColor: 'red', display: 'inline-block' }}></div>
                    <span>Dolu Koltuk</span>
                </div>
            </div>

            <div className="seat-letters">
                {[' ', 'A', 'B', 'C', 'D', 'E', 'F'].map((letter) => (
                    <div key={letter} className="seat-letter">{letter}</div>
                ))}
            </div>

            <div className="seat-grid">
                {seatLayout.map((row, rowIndex) => (
                    <React.Fragment key={rowIndex}>
                        {rowIndex === 9 && (
                            <div style={{ textAlign: 'center', width: '100%', backgroundColor: '#f8d7da', padding: '5px', margin: '7px 0', fontWeight: 'bold', color: '#721c24' }}>
                                ACİL ÇIKIŞ
                            </div>
                        )}
                        {rowIndex === 10 && (
                            <div style={{ textAlign: 'center', width: '100%', backgroundColor: '#f8d7da', padding: '5px', margin: '7px 0', fontWeight: 'bold', color: '#721c24' }}>
                                ACİL ÇIKIŞ
                            </div>
                        )}
                        {rowIndex === 0 && (
                            <div style={{ textAlign: 'center', width: '100%', backgroundColor: '#f8d7da', padding: '5px', margin: '7px 0', fontWeight: 'bold', color: '#721c24' }}>
                                ACİL ÇIKIŞ
                            </div>
                        )}

                        <div className="seat-row">
                            <span className="row-number">{rowIndex + 1}</span>
                            {row.map(({ seat, isOccupied }, colIndex) => (
                                <div
                                    key={colIndex}
                                    className={`seat ${isOccupied ? 'seat-occupied' : seat === selectedSeat ? 'seat-selected' : 'seat-empty'}`}
                                    onClick={() => handleSeatClick(seat, isOccupied)}
                                    onMouseEnter={() => handleSeatHover(seat)}
                                    onMouseLeave={handleSeatLeave}
                                    data-seat-info={`${seat}`}
                                >
                                    {!isOccupied && hoveredSeat === seat && (
                                        <div className="seat-tooltip">
                                            {seat} - Standart Koltuk - TRY 75,00
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </React.Fragment>
                ))}
            </div>

            {selectedSeat && (
                <div className="selected-seat-info">
                    <p><b>Seçilen Koltuk:</b> {selectedSeat}</p>
                    <button className="confirmation-button" onClick={goToConfirmationPage}>
                        Bilet Onayla
                    </button>
                </div>
            )}
        </div>
    );
}

export default KoltukSecimi;
