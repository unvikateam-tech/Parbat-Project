"use client";
import React from 'react';
import Header from "../../components/Header";

const PortfolioPage = () => {
    return (
        <div style={{ background: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <main style={{ flex: 1, padding: '8rem 2rem 3rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <h1 style={{
                        fontSize: '3rem',
                        fontWeight: 900,
                        color: '#fff',
                        marginBottom: '1rem'
                    }}>Portfolio</h1>
                    <p style={{ color: 'rgba(255,255,255,0.6)' }}>Coming Soon</p>
                </div>
            </main>
        </div>
    );
};

export default PortfolioPage;
