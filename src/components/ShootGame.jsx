import React, { useState, useEffect, useRef } from 'react';

const ShootGame = ({ data, username, onFinish }) => {
  const [target, setTarget] = useState(null);
  const [stats, setStats] = useState({ correct: 0, wrong: 0 });
  const [lives, setLives] = useState(3);
  const isSaving = useRef(false);

  const saveAndExit = (finalCorrect) => {
    if (isSaving.current) return;
    isSaving.current = true;

    fetch('http://localhost:5000/api/save-score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        username, 
        score: finalCorrect * 10, 
        mode: 'SHOOTER', 
        details: `Vurulan AI: ${finalCorrect}` 
      })
    })
    .then(() => onFinish())
    .catch(err => console.error("Skor kaydedilemedi:", err));
  };

  useEffect(() => {
    if (lives <= 0) {
      saveAndExit(stats.correct);
      return;
    }

    const timer = setInterval(() => {
      const random = data[Math.floor(Math.random() * data.length)];
      setTarget({ 
        ...random, 
        top: Math.random() * 70 + "%", 
        left: Math.random() * 80 + "%" 
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [lives]);

  const shoot = (isAi) => {
    if (lives <= 0) return;
    if (isAi) {
      setStats(p => ({ ...p, correct: p.correct + 1 }));
    } else {
      setStats(p => ({ ...p, wrong: p.wrong + 1 }));
      setLives(l => l - 1);
    }
    setTarget(null);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ padding: '10px', fontSize: '1.5rem' }}>
        Can: <span style={{ color: 'red' }}>{"❤️".repeat(lives)}</span> | 
        Skor: <span style={{ color: 'green' }}>{stats.correct * 10}</span>
      </div>
      <div style={{ 
        height: '500px', position: 'relative', border: '3px solid #333', 
        background: '#e0e0e0', overflow: 'hidden', borderRadius: '20px'
      }}>
        {lives > 0 && target && (
          <img 
            src={target.url} 
            onMouseDown={() => shoot(target.isAi)} 
            style={{ 
              position: 'absolute', top: target.top, left: target.left, 
              width: '100px', height: '100px', borderRadius: '50%', border: '3px solid white' 
            }} 
            alt="Hedef" 
          />
        )}
      </div>
    </div>
  );
};

export default ShootGame;