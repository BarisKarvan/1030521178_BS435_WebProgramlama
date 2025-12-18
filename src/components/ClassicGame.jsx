import React, { useState } from 'react';

const ClassicGame = ({ data }) => {
  const [idx, setIdx] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [status, setStatus] = useState({ type: '', msg: 'Hangi görsel AI üretimidir?' });

  // Eğer veri boş gelirse uygulamanın çökmesini engelle
  if (!data || data.length === 0) return <div>Veri yükleniyor...</div>;

  const current = data[idx];

  const handleSelect = (isAi) => {
    if (isAi) {
      setStatus({ type: 'success', msg: '✅ Doğru! Harika bir gözün var.' });
      setTimeout(() => {
        if (idx + 1 < data.length) {
          setIdx(idx + 1);
          setAttempts(0);
          setStatus({ type: '', msg: 'Sıradaki: AI görselini bul!' });
        } else {
          setStatus({ type: 'finish', msg: '🎉 Tebrikler, tüm bölümleri bitirdiniz!' });
        }
      }, 2000);
    } else {
      if (attempts === 0) {
        setAttempts(1);
        setStatus({ type: 'error', msg: `❌ Yanlış! İpucu: ${current.hint}` });
      } else {
        setStatus({ type: 'error', msg: '❌ Maalesef yine yanlış. Sıradaki soruya geçiliyor...' });
        setTimeout(() => {
          setIdx((idx + 1) % data.length);
          setAttempts(0);
          setStatus({ type: '', msg: 'AI görselini bul!' });
        }, 2000);
      }
    }
  };

  const statusBg = status.type === 'success' ? '#d1fae5' : status.type === 'error' ? '#fee2e2' : '#f3f4f6';

  return (
    <div>
      <div className="status-box" style={{ backgroundColor: statusBg }}>
        {status.msg}
      </div>
      <div className="img-grid">
        {current.images.map((img, i) => (
          <img key={i} src={img.url} className="game-img" onClick={() => handleSelect(img.isAi)} alt="seçenek" />
        ))}
      </div>
    </div>
  );
};


export default ClassicGame;