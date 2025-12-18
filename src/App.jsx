import React, { useState } from 'react';
import './default.css'; // Dosyanın src/default.css olduğundan emin ol
import { classicData, hangmanData, shooterData } from './data';

// Import isimleri Component isimleriyle aynı olmalı
import ClassicGame from './components/ClassicGame'; 
import HangmanGame from './components/HangmanGame';
import ShootGame from './components/ShootGame';

function App() {
  const [activeMode, setActiveMode] = useState('MENU');

  return (
    <div className="container"> {/* "App" yerine "container" class'ı kullandık */}
      <div className="card">
        {activeMode === 'MENU' ? (
          <div className="menu-container">
            <h1>🤖 AI Dedektif Oyun Dünyası</h1>
            <p>Gerçeği yapaydan ayırabilecek misin? Bir mod seç:</p>
            
            <div className="menu-buttons">
              <button className="btn-main classic-btn" onClick={() => setActiveMode('CLASSIC')}>
                Klasik (3 Görsel Seç)
              </button>
              <button className="btn-main hangman-btn" onClick={() => setActiveMode('HANGMAN')}>
                AI Adam Asmaca
              </button>
              <button className="btn-main shooter-btn" onClick={() => setActiveMode('SHOOTER')}>
                AI Hedef Vurma
              </button>
            </div>
          </div>
        ) : (
          <div className="game-wrapper">
            <span className="back-link" onClick={() => setActiveMode('MENU')}>
              ← Ana Menüye Dön
            </span>

            {/* Verileri doğru prop ismiyle gönderiyoruz: data={...} */}
            {activeMode === 'CLASSIC' && <ClassicGame data={classicData} />}
            {activeMode === 'HANGMAN' && <HangmanGame data={hangmanData} />}
            {activeMode === 'SHOOTER' && <ShootGame data={shooterData} />}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;