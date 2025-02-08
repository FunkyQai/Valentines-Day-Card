import React, { useState, useEffect } from "react";
import "./App.css";
import PixelHeart from "./components/PixelHeart";
import Sheep from "./components/Sheep";
import confetti from "canvas-confetti";

function App() {
  const [sheep1Position, setSheep1Position] = useState(10); // Starting position for Sheep 1
  const [sheep2Position, setSheep2Position] = useState(10); // Starting position for Sheep 2
  const [showConfetti, setShowConfetti] = useState(false);
  const [showMessage, setShowMessage] = useState("Be My Valentine?")
  const [alertShown, setAlertShown] = useState(false); // State to track if alert has been shown
  const [isYesButtonDisabled, setIsYesButtonDisabled] = useState(false); // State to track if the Yes button is disabled
  const [isNoButtonDisabled, setIsNoButtonDisabled] = useState(false); // State to track if the No button is disabled

  useEffect(() => {
    // Check if the sheep have met in the center
    if (sheep1Position >= 35 && sheep2Position >= 35 && !alertShown) {
      setShowConfetti(true);
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
        setAlertShown(true); // Set alertShown to true after showing the alert
        setShowMessage("")
        setIsYesButtonDisabled(true); // Disable the Yes button
        setIsNoButtonDisabled(true); // Disable the Yes button
      }, 400); // Delay of 500ms before showing confetti and alert
    } else {
      setShowConfetti(false);
    }
  }, [sheep1Position, sheep2Position, alertShown]);

  const handleYesClick = () => {
    // Move Sheep 1 to the right if it doesn't cross Sheep 2
    setSheep1Position((prev) => (prev + 5 <= 50 ? prev + 5 : prev));
    // Move Sheep 2 to the left if it doesn't cross Sheep 1
    setSheep2Position((prev) => (prev + 5 <= 50 ? prev + 5 : prev));
  };

  const handleNoClick = () => {
    // Move Sheep 1 to the left if it doesn't go beyond the starting point
    setSheep1Position((prev) => Math.max(10, prev - 5));
    // Move Sheep 2 to the right if it doesn't go beyond the starting point
    setSheep2Position((prev) => Math.max(10, prev - 5));
  };

  return (
    <div className="App">
      <h1 className="valentine-message">{showMessage}</h1>
      {alertShown && <PixelHeart />}
      <div className="container">
        <Sheep position={sheep1Position} direction="left" />
        <Sheep position={sheep2Position} direction="right" />
      </div>
      <div className="buttons">
        <button id="yesButton" onClick={handleYesClick} disabled={isYesButtonDisabled}>
          YES
        </button>
        <button id="noButton" onClick={handleNoClick} disabled={isNoButtonDisabled}>
          NO
        </button>
      </div>
    </div>
  );
}

export default App;