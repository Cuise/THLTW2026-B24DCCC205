import React, { useState } from "react";

const DoanSo: React.FC = () => {
  const [randomNumber, setRandomNumber] = useState(
    Math.floor(Math.random() * 100) + 1
  );
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState(10);
  const [message, setMessage] = useState("");
  const [gameOver, setGameOver] = useState(false);

  const handleGuess = () => {
    const value = Number(guess);
    if (!value) return;

    if (value === randomNumber) {
      setMessage(`Chúc mừng! Bạn đã đoán đúng số ${randomNumber}`);
      setGameOver(true);
    } else if (value < randomNumber) {
      setMessage(" Bạn đoán quá thấp!");
    } else {
      setMessage(" Bạn đoán quá cao!");
    }

    setAttempts((prev) => prev - 1);

    if (attempts - 1 === 0 && value !== randomNumber) {
      setMessage(` Hết lượt! Số đúng là ${randomNumber}`);
      setGameOver(true);
    }

    setGuess("");
  };

  const resetGame = () => {
    setRandomNumber(Math.floor(Math.random() * 100) + 1);
    setAttempts(10);
    setMessage("");
    setGameOver(false);
  };

  return (
    <div>
      <h2>Trò chơi đoán số</h2>
      <p>Còn {attempts} lượt</p>

      {!gameOver && (
        <>
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
          />
          <button onClick={handleGuess}>Đoán</button>
        </>
      )}

      <p>{message}</p>

      {gameOver && <button onClick={resetGame}>Chơi lại</button>}
    </div>
  );
};

export default DoanSo;