import React, { useState, useEffect } from 'react';
import './default.css'; 
import { classicData, hangmanData, shooterData } from './data';

// Bileşenlerin import edilmesi
import ClassicGame from './components/ClassicGame';
import HangmanGame from './components/HangmanGame';
import ShootGame from './components/ShootGame';

function App() {
  // State Tanımlamaları
  const [activeMode, setActiveMode] = useState('MENU');
  const [username, setUsername] = useState('');
  const [highScores, setHighScores] = useState([]);

  // Backend'den en yüksek skorları çekme (Liderlik Tablosu)
  useEffect(() => {
    if (activeMode === 'MENU') {
      fetch('http://localhost:5000/api/scores')
        .then((res) => res.json())
        .then((data) => setHighScores(data))
        .catch((err) => console.log("Backend bağlantısı kurulamadı. Sunucunun açık olduğundan emin olun."));
    }
  }, [activeMode]);

  // Oyunu başlatmadan önce isim kontrolü
  const handleStartGame = (mode) => {
    if (!username.trim()) {
      alert("Lütfen oyuna başlamak için isminizi giriniz!");
      return;
    }
    setActiveMode(mode);
  };

  return (
    <div className="container">
      <div className="card">
        {activeMode === 'MENU' ? (
          /* --- ANA MENÜ EKRANI --- */
          <div className="menu-container">
            <h1>🤖 AI Dedektif Oyun Dünyası</h1>
            <p>Gerçeği yapaydan ayırabilecek misin?</p>

            <div style={{ margin: '20px 0' }}>
              <input
                type="text"
                placeholder="İsminizi Yazın..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  padding: '12px',
                  fontSize: '1rem',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  width: '250px',
                  textAlign: 'center'
                }}
              />
            </div>

            <div className="menu-buttons">
              <button className="btn-main classic-btn" onClick={() => handleStartGame('CLASSIC')}>
                Klasik Mod (2 Görsel)
              </button>
              <button className="btn-main shooter-btn" onClick={() => handleStartGame('SHOOTER')}>
                AI Hedef Vurma
              </button>
              <button className="btn-main hangman-btn" onClick={() => handleStartGame('HANGMAN')}>
                AI Adam Asmaca
              </button>
            </div>

            {/* Liderlik Tablosu */}
            <div className="score-board" style={{ marginTop: '30px', textAlign: 'center' }}>
              <h3>🏆 Liderlik Tablosu (En İyi 10)</h3>
              <div style={{ 
                backgroundColor: '#f4f4f4', 
                padding: '15px', 
                borderRadius: '10px',
                maxHeight: '300px',
                overflowY: 'auto'
              }}>
                {highScores.length > 0 ? (
                  highScores.map((s, i) => (
                    <div key={i} style={{ 
                      borderBottom: '1px solid #ddd', 
                      padding: '10px 0',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{ textAlign: 'left' }}>
                        <strong>{i + 1}. {s.username}</strong>
                      </span>
                      <span style={{ fontWeight: 'bold', color: '#2c5282' }}>
                        {s.score} Puan
                      </span>
                      <span style={{ fontSize: '0.75rem', color: '#666', minWidth: '120px', textAlign: 'right' }}>
                        {s.mode} <br/> 
                        <span style={{ fontSize: '0.7rem' }}>{s.details}</span>
                      </span>
                    </div>
                  ))
                ) : (
                  <p>Henüz skor kaydedilmedi. İlk sen ol!</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* --- OYUN MODLARI EKRANI --- */
          <div className="game-wrapper">
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '20px',
              padding: '10px',
              borderBottom: '1px solid #eee' 
            }}>
              <span 
                className="back-link" 
                onClick={() => setActiveMode('MENU')} 
                style={{ cursor: 'pointer', color: '#3182ce', fontWeight: 'bold' }}
              >
                ← Ana Menüye Dön
              </span>
              <span>Dedektif: <strong>{username}</strong></span>
            </div>

            <div className="game-content">
              {activeMode === 'CLASSIC' && (
                <ClassicGame 
                  data={classicData} 
                  username={username} 
                  onFinish={() => setActiveMode('MENU')} 
                />
              )}
              
              {activeMode === 'SHOOTER' && (
                <ShootGame 
                  data={shooterData} 
                  username={username} 
                  onFinish={() => setActiveMode('MENU')} 
                />
              )}

              {activeMode === 'HANGMAN' && (
                <HangmanGame 
                  data={hangmanData} 
                  username={username} 
                  onFinish={() => setActiveMode('MENU')} 
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;