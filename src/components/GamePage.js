import React from "react";
import GameField from "./gamePanels/GameField";
import InfoPanel from "./gamePanels/InfoPanel";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #3c414d;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
`;

function GamePage() {
  return (
    <Container>
      <InfoPanel />
      <GameField />
    </Container>
  );
}

export default GamePage;
