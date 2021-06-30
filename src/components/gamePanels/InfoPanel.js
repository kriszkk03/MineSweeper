import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { gameSelector } from "../../redux/gameState/selector";
import { useSelector } from "react-redux";

const Container = styled.div`
  width: 100%;
  background: #3c414d;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;
const Info = styled.div`
  margin-top: auto;
  margin-bottom: auto;
`;
const InfoType = styled.h2`
  font-size: x-large;
  margin-right: 1vw;
  float: left;
`;
const InfoValue = styled.h2`
  font-size: x-large;
  float: left;
`;
function InfoPanel() {
  const gameState = useSelector(gameSelector);
  const [seconds, setSeconds] = useState(0);
  const [minute, setMinute] = useState(0);

  useEffect(() => {
    setSeconds(0);
    setMinute(0);
  }, [gameState.inGame]);

  useEffect(() => {
    let timer = setTimeout(() => {
      if (seconds < 59) {
        setSeconds(seconds + 1);
      } else {
        setSeconds(0);
        setMinute(minute + 1);
      }
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <Container>
      <Info>
        <InfoType>Name:</InfoType>
        <InfoValue>{gameState.name}</InfoValue>
      </Info>
      <Info>
        <InfoType>Time:</InfoType>
        <InfoValue>{`${minute}:${seconds}`}</InfoValue>
      </Info>
      <Info>
        <InfoType>Mines:</InfoType>
        <InfoValue>{gameState.mineCounter}</InfoValue>
      </Info>
    </Container>
  );
}

export default InfoPanel;
