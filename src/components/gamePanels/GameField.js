import React, { useEffect } from "react";
import styled from "styled-components";
import { gameSelector } from "../../redux/gameState/selector";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  leftClick,
  rightClick,
  createGameState,
} from "../../redux/gameState/actions";

const Container = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;
const GameTable = styled.table`
  border: px black;
  border-color: white;

  margin-left: auto;
  margin-right: auto;
`;
const HiddenTD = styled.td`
  border: 1px solid black;
  border-color: white;
  text-align: center;
  color: white;
  width: 2vw;
  height: 2vw;
  :hover {
    cursor: pointer;
    background-color: #282c34;
  }
`;
const RightClickedTD = styled.td`
  border: 1px solid black;
  border-color: white;
  text-align: center;
  background-color: #b82818;
  color: white;
  width: 2vw;
  height: 2vw;
  :hover {
    cursor: pointer;
  }
`;
const LeftClickedTD = styled.td`
  border: 1px solid black;
  border-color: white;
  background-color: #282c34;
  text-align: center;
  color: white;
  width: 2vw;
  height: 2vw;
`;
function GameField() {
  window.addEventListener("contextmenu", (e) => e.preventDefault());
  const gameState = useSelector(gameSelector);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleClick = (e, rowIndex, columnIndex) => {
    e.button === 0
      ? dispatch(leftClick(rowIndex, columnIndex))
      : dispatch(rightClick(rowIndex, columnIndex));
  };
  useEffect(() => {
    if (gameState.inGame === false && gameState.win === true) {
      if (
        window.confirm(
          `Congrat!!! You won!!\n Click 'OK' if you want to play 1 more game.`
        )
      ) {
        dispatch(
          createGameState(
            gameState.name,
            gameState.x,
            gameState.y,
            gameState.mineC
          )
        );
      } else {
        history.push("/");
      }
    } else if (gameState.inGame === false && gameState.win === false) {
      if (
        window.confirm(
          `Sorry! You made a mistake..\n Click 'OK' if you want to try it again. `
        )
      ) {
        dispatch(
          createGameState(
            gameState.name,
            gameState.x,
            gameState.y,
            gameState.mineC
          )
        );
      } else {
        history.push("/");
      }
    }
    // eslint-disable-next-line
  }, [gameState.inGame]);
  return (
    <Container>
      <GameTable id="gameTable">
        <thead></thead>
        <tbody>
          {gameState.gameField.map((row, rowIndex) => (
            <tr key={`${rowIndex}`}>
              {row.map((field, columnIndex) =>
                field.state === "leftClicked" ? (
                  <LeftClickedTD key={`${rowIndex},${columnIndex}`}>
                    {field.value}
                  </LeftClickedTD>
                ) : field.state === "rightClicked" ? (
                  <RightClickedTD
                    key={`${rowIndex},${columnIndex}`}
                    onMouseDown={(e) => handleClick(e, rowIndex, columnIndex)}
                  ></RightClickedTD>
                ) : (
                  <HiddenTD
                    key={`${rowIndex},${columnIndex}`}
                    onMouseDown={(e) => handleClick(e, rowIndex, columnIndex)}
                  ></HiddenTD>
                )
              )}
            </tr>
          ))}
        </tbody>
        <tfoot></tfoot>
      </GameTable>
    </Container>
  );
}

export default GameField;
