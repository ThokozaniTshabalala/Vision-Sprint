import React from 'react';

function Banner() {
    return (
        <section className="bg-gradient-to-r from-black via-gray-900 to-black flex items-center justify-center" style={{ height: '40px' }}> {/* Gradient background */}
            <div className="h-container text-center text-white relative">
                <h1 
                    className="relative z-10 text-sm font-bold bg-clip-text text-transparent"
                    style={{
                        backgroundImage: 'linear-gradient(72.83deg, #ff7f32 11.63%, #ffb347 40.43%, #ff5e00 68.07%)', // Lighter dark orange
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text'
                    }}
                >
                    Design and builds delivered faster.
                </h1>
            </div>
        </section>
    );
}

export default Banner;
