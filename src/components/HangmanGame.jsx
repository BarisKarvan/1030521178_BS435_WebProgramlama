import React, { useState } from 'react';

const HangmanGame = ({ data }) => {
  const [currentWordObj] = useState(data[Math.floor(Math.random() * data.length)]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);

  const word = currentWordObj.word.toUpperCase();
  const maxErrors = 6;

  const handleGuess = (letter) => {
    if (word.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
    } else {
      if (!wrongLetters.includes(letter)) setWrongLetters([...wrongLetters, letter]);
    }
  };

  const isWon = word.split('').every(letter => guessedLetters.includes(letter));
  const isLost = wrongLetters.length >= maxErrors;

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>AI Terimini Tahmin Et</h2>
      <p><strong>İpucu:</strong> {currentWordObj.hint}</p>
      
      <div style={{ fontSize: '2rem', letterSpacing: '10px', margin: '20px', fontWeight: 'bold' }}>
        {word.split('').map((l, i) => (guessedLetters.includes(l) ? l : "_"))}
      </div>
      
      <p style={{color: 'red'}}>Hatalar: {wrongLetters.join(", ")} ({wrongLetters.length}/{maxErrors})</p>
      
      {!isWon && !isLost && (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            {"ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ".split('').map(l => (
            <button 
                key={l} 
                onClick={() => handleGuess(l)} 
                disabled={guessedLetters.includes(l) || wrongLetters.includes(l)}
                style={{ margin: '3px', padding: '8px 12px', cursor: 'pointer' }}
            >
                {l}
            </button>
            ))}
        </div>
      )}
      {isWon && <h3 style={{ color: 'green' }}>✅ Tebrikler Bildin!</h3>}
      {isLost && <h3 style={{ color: 'red' }}>❌ Kaybettin! Kelime: {word}</h3>}
    </div>
  );
};


export default HangmanGame;