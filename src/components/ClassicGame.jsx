import React, { useState } from 'react';

const ClassicGame = ({ data, username, onFinish }) => {
  const [idx, setIdx] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [stats, setStats] = useState({ correct: 0, wrong: 0 });
  const [status, setStatus] = useState({ type: '', msg: 'AI olanı bul!' });

  const finish = (finalStats) => {
    const totalScore = (finalStats.correct * 10) - (finalStats.wrong * 5);
    fetch('http://localhost:5000/api/save-score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        username, 
        score: totalScore, 
        mode: 'CLASSIC', 
        details: `Doğru: ${finalStats.correct} Yanlış: ${finalStats.wrong}` 
      })
    }).then(() => onFinish());
  };

  const handleSelect = (img) => {
    if (img.isAi) {
      const newStats = { ...stats, correct: stats.correct + 1 };
      setStats(newStats);
      setStatus({ type: 'success', msg: '✅ Doğru!' });
      setTimeout(() => {
        if (idx + 1 < data.length) {
          setIdx(idx + 1);
          setAttempts(0);
          setStatus({ type: '', msg: 'Sıradaki...' });
        } else {
          finish(newStats);
        }
      }, 1000);
    } else {
      const newStats = { ...stats, wrong: stats.wrong + 1 };
      setStats(newStats);
      if (attempts === 0) {
        setAttempts(1);
        setStatus({ type: 'error', msg: `❌ Yanlış! İpucu: ${data[idx].hint}` });
      } else {
        setStatus({ type: 'error', msg: '❌ Yine yanlış!' });
        setTimeout(() => {
          if (idx + 1 < data.length) {
            setIdx(idx + 1);
            setAttempts(0);
            setStatus({ type: '', msg: 'AI görselini bul!' });
          } else {
            finish(newStats);
          }
        }, 1000);
      }
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3>Bölüm {idx + 1}/5 | D:{stats.correct} Y:{stats.wrong}</h3>
      <div style={{ background: '#eee', padding: '15px', margin: '15px', borderRadius: '10px' }}>{status.msg}</div>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
        {data[idx].images.map((img, i) => (
          <img key={i} src={img.url} onClick={() => handleSelect(img)} 
               style={{ width: '600px', height: '400px', objectFit: 'cover', cursor: 'pointer', borderRadius: '15px', border: '4px solid white', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }} 
               alt="Seçenek" />
        ))}
      </div>
    </div>
  );
};
export default ClassicGame;