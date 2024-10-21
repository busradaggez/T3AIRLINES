import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import { TextField, Button, MenuItem, FormControlLabel, Checkbox, Alert } from '@mui/material';
import DatePicker from 'react-datepicker';
import './App.css';
import t3Logo from './t3airlines-logo.png';

const airports = [
    { label: "Istanbul (IST)", value: "IST" },
    { label: "Istanbul (SAW)", value: "SAW" },
    { label: "Ankara (ESB)", value: "ESB" },
    { label: "Izmir (ADB)", value: "ADB" },
    { label: "Antalya (AYT)", value: "AYT" },
    { label: "Erzurum (ERZ)", value: "ERZ" },
    { label: "Gaziantep (GZT)", value: "GZT" },
    { label: "Ordu-Giresun (OGU)", value: "OGU" },
    { label: "Muğla (DLM)", value: "DLM" }
];

function UcusArama() {
    const [departure, setDeparture] = useState('');
    const [arrival, setArrival] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [oneWay, setOneWay] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!departure || !arrival) {
            setError('Lütfen kalkış ve varış havalimanlarını seçiniz.');
            return;
        }

        if (
            (departure === 'IST' && arrival === 'SAW') ||
            (departure === 'SAW' && arrival === 'IST')
        ) {
            setError('Aynı şehire uçamazsınız.');
            return;
        }

        if (departure === arrival) {
            setError('Kalkış ve varış havalimanları aynı olamaz. Lütfen farklı bir varış havalimanı seçiniz.');
            return;
        }

        if (!oneWay && !endDate) {
            setError('Dönüş tarihi seçilmemiş. Lütfen dönüş tarihi giriniz.');
            return;
        }

        setError('');

        navigate('/ucus-secimi', {
            state: {
                departure,
                arrival,
                startDate: startDate.toLocaleDateString('en-GB'),
                endDate: endDate ? endDate.toLocaleDateString('en-GB') : null,
                oneWay,
            },
        });
    };

    return (
        <div className="container">
            <header className="header">
                <img src={t3Logo} alt="T3 Airlines Logo" className="logo" />
            </header>

            {error && <Alert severity="error" style={{ marginBottom: '10px' }}>{error}</Alert>}
            <form onSubmit={handleSubmit} className="form">

                <div className="form-row">
                    <TextField
                        select
                        label="Kalkış"
                        value={departure}
                        onChange={(e) => setDeparture(e.target.value)}
                        style={{ width: '48%' }}
                    >
                        {airports.map((airport) => (
                            <MenuItem key={airport.value} value={airport.value}>
                                {airport.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    <div style={{ width: '48%' }}>
                        <label>Gidiş Tarihi</label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="dd.MM.yyyy"
                            className="date-picker"
                            style={{ width: '100%' }}
                            minDate={new Date()}
                        />
                    </div>
                </div>

                <div className="form-row">
                    <TextField
                        select
                        label="Varış"
                        value={arrival}
                        onChange={(e) => setArrival(e.target.value)}
                        style={{ width: '48%' }}
                    >
                        {airports.map((airport) => (
                            <MenuItem key={airport.value} value={airport.value}>
                                {airport.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    <div style={{ width: '48%' }}>
                        <label>Dönüş Tarihi</label>
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            dateFormat="dd.MM.yyyy"
                            className="date-picker"
                            style={{ width: '100%' }}
                            isClearable
                            disabled={oneWay}
                            minDate={startDate}
                        />
                    </div>
                </div>

                <div className="one-way">
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={oneWay}
                                onChange={(e) => setOneWay(e.target.checked)}
                            />
                        }
                        label="Tek Yön"
                    />
                </div>

                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Uçuş Ara
                </Button>
            </form>
        </div>
    );
}

export default UcusArama;
