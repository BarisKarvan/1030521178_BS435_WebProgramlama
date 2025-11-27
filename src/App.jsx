import React, { useState } from 'react';

const IMG_DAG = '/img/backgrounds/mountain-range-9842371_1920.jpg';
const IMG_COMPUTER = '/img/backgrounds/Aesthetic Computer 4k Wallpaper.jpg';

function App() {
  const [oyunBasladiMi, setOyunBasladiMi] = useState(false);
  const [secimDurumu, setSecimDurumu] = useState(null);

  const oyunuBaslat = () => {
    setOyunBasladiMi(true);
  };

  const secimYap = (dogruMu) => {
    if (dogruMu) {
      alert("Tebrikler! Doğru görseli seçtiniz.");
      setSecimDurumu('dogru');
    } else {
      alert("Maalesef yanlış görsel. Tekrar deneyin.");
      setSecimDurumu('yanlis');
    }
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '20px',
    textAlign: 'center'
  };

  const gameAreaStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: '40px',
    marginTop: '30px',
    flexWrap: 'wrap'
  };

  const imageBoxStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '15px',
    borderRadius: '10px',
    backgroundColor: '#f0f0f0',
    transition: 'all 0.3s ease',
    border: '5px solid transparent',
  };

  const imageStyle = {
    width: '300px',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '5px',
    marginBottom: '15px'
  };

  return (
    <div style={containerStyle}>
      
      {!oyunBasladiMi && (
        <div>
            <h1>Görsel Seçme Oyunu</h1>
            <p>Başlamak için butona tıklayın.</p>
            <button 
                onClick={oyunuBaslat}
                style={{ padding: '15px 30px', fontSize: '18px', cursor: 'pointer', marginTop: '20px' }}
            >
            Oyunu Başlat
            </button>
        </div>
      )}

      {oyunBasladiMi && (
        <div>
            <h2>Hangi görsel "Dağ Manzarası"dır?</h2>
            
            <div style={gameAreaStyle}>
                
                <div style={{
                    ...imageBoxStyle, 
                    borderColor: secimDurumu === 'dogru' ? 'green' : (secimDurumu === null ? 'transparent' : '#f0f0f0') 
                }}>
                    <img src={IMG_DAG} alt="Seçenek 1" style={imageStyle} />
                    <button onClick={() => secimYap(true)}>
                        Bu Doğru
                    </button>
                </div>

                <div style={{
                    ...imageBoxStyle,
                    borderColor: secimDurumu === 'yanlis' ? 'red' : (secimDurumu === null ? 'transparent' : '#f0f0f0')
                }}>
                    <img src={IMG_COMPUTER} alt="Seçenek 2" style={imageStyle} />
                    <button onClick={() => secimYap(false)}>
                        Bu Doğru
                    </button>
                </div>

            </div>
        </div>
      )}

    </div>
  );
}

export default App;