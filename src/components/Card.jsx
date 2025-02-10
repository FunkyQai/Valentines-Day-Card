import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";
import PixelHeart from "./PixelHeart";
import Sheep from "./Sheep";
import confetti from "canvas-confetti";
import startSound from "../assets/sounds/start.mp3";
import walkingSound from "../assets/sounds/walking.mp3";
import kissSound from "../assets/sounds/kiss.mp3";

function Card() {
  const [hasStarted, setHasStarted] = useState(false);
  const [showMessage, setShowMessage] = useState("Be My Valentine?");
  const [sheep1Position, setSheep1Position] = useState(10);
  const [sheep2Position, setSheep2Position] = useState(10);
  const [showConfetti, setShowConfetti] = useState(false);
  const [alertShown, setAlertShown] = useState(false);
  const [isYesButtonDisabled, setIsYesButtonDisabled] = useState(false);
  const [isNoButtonDisabled, setIsNoButtonDisabled] = useState(false);
  const startSoundRef = useRef(null);
  const walkingSoundRef = useRef(null);
  const kissSoundRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (sheep1Position >= 35 && sheep2Position >= 35 && !alertShown) {
      setShowConfetti(true);
      setTimeout(() => {
        confetti({ particleCount: 1000, spread: 150, origin: { y: 0.6 } });
        if (kissSoundRef.current) kissSoundRef.current.play();
        setAlertShown(true);
        setShowMessage("");
        setIsYesButtonDisabled(true);
        setIsNoButtonDisabled(true);
      }, 400);
    } else {
      setShowConfetti(false);
    }
  }, [sheep1Position, sheep2Position, alertShown]);

  const handleStart = () => {
    setHasStarted(true); // Hide overlay
    if (startSoundRef.current) startSoundRef.current.play();
  };

  const handleYesClick = () => {
    if (walkingSoundRef.current) walkingSoundRef.current.play();
    setSheep1Position((prev) => (prev + 2 <= 50 ? prev + 2 : prev));
    setSheep2Position((prev) => (prev + 2 <= 50 ? prev + 2 : prev));
  };

  const handleNoClick = () => {
    if (walkingSoundRef.current) walkingSoundRef.current.play();
    setSheep1Position((prev) => Math.max(10, prev - 2));
    setSheep2Position((prev) => Math.max(10, prev - 2));
  };

  const handleProceedClick = () => {
    navigate("/restaurant");
  };

  return (
    <div className="card">
      {!hasStarted && (
        <div className="start-overlay" onClick={handleStart}>
          <h1>Click to Start</h1>
        </div>
      )}

      <audio ref={startSoundRef} src={startSound} />
      <audio ref={walkingSoundRef} src={walkingSound} />
      <audio ref={kissSoundRef} src={kissSound} />

      {hasStarted && (
        <>
          <h1 className="valentine-message">{showMessage}</h1>
          {alertShown && <PixelHeart />}
          {alertShown && (
            <button className="proceed-button" onClick={handleProceedClick}>
              Click here to proceed
            </button>
          )}

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
        </>
      )}
    </div>
  );
}

export default Card;