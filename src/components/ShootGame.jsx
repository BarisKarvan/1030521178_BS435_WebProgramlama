import React, { useState, useEffect } from 'react';

const ShootGame = ({ data }) => {
  const [target, setTarget] = useState(null);
  const [score, setScore] = useState(0);

  // Veri gelmezse hata vermesini önle
  if (!data || data.length === 0) return <div>Veri yükleniyor...</div>;

  useEffect(() => {
    // 1.2 saniyede bir yeni hedef belirle
    const interval = setInterval(() => {
      const randomImg = data[Math.floor(Math.random() * data.length)];
      
      // Rastgele konum belirle (Ekranın dışına taşmaması için sınırlar koyduk)
      setTarget({
        ...randomImg,
        top: Math.floor(Math.random() * 60 + 10) + "%", 
        left: Math.floor(Math.random() * 70 + 10) + "%"
      });
    }, 1200);
    
    // Bileşen ekrandan gidince sayacı temizle (Memory leak önlemek için)
    return () => clearInterval(interval);
  }, [data]);

  const handleClick = (isAi) => {
    if (isAi) {
      setScore(prev => prev + 10);
    } else {
      setScore(prev => prev - 5);
    }
    setTarget(null); // Vurulunca ekrandan kaybolsun
  };

  return (
    <div style={{ 
      height: '450px', 
      position: 'relative', 
      overflow: 'hidden', 
      border: '2px dashed #ccc', 
      borderRadius: '15px', 
      backgroundColor: '#f9f9f9',
      marginTop: '20px'
    }}>
      <div style={{
        padding: '10px', 
        backgroundColor: 'rgba(0,0,0,0.1)', 
        display: 'inline-block', 
        borderRadius: '0 0 10px 0',
        fontWeight: 'bold'
      }}>
        Skor: {score} (Sadece AI olanları vur!)
      </div>
      
      {target && (
        <img 
          src={target.url} 
          alt="target"
          onMouseDown={() => handleClick(target.isAi)} // Tıklamayı yakala
          style={{
            position: 'absolute',
            top: target.top,
            left: target.left,
            width: '100px',
            height: '100px',
            objectFit: 'cover',
            cursor: 'crosshair',
            borderRadius: '50%',
            border: target.isAi ? '3px solid transparent' : '3px solid transparent', 
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
            userSelect: 'none',
            transition: 'transform 0.1s active'
          }}
          draggable="false"
        />
      )}
    </div>
  );
};


export default ShootGame;