import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { createGameState } from "../redux/gameState/actions";

const Button = styled.button`
  display: inline-block;
  color: #3c414d;
  font-size: 2.2em;
  font-family: Cursive;
  margin-left: auto;
  margin-right: auto;
  padding: 1em 1em;
  border: 2px solid #3c414d;
  border-radius: 3px;
  margin-top: 8vh;
  display: block;

  &:hover {
    cursor: pointer;
  }
`;
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #3c414d;
`;
const Title = styled.h1`
  margin: 0;
  color: white;
  font-size: 8vw;
  font-family: Cursive;

  text-align: center;
`;
const Label = styled.label`
  color: white;
  font-size: 5vw;

  font-family: "Brush Script MT", Cursive;
`;
const Input = styled.input`
  text-align: center;
  background: transparent;
  border-radius: 1.5rem;
  border-color: white;
  color: white;
  font-size: x-large;
  font-family: Cursive;
  height: 30%;
`;

const Field = styled.div`
  text-align: center;
  height: 11vh;
`;
const Select = styled.select`
  background: transparent;
  color: white;
  height: 5vh;
  border-color: white;
  font-size: large;
  option {
    color: white;
    background: #282c34;
    border: 0px;
    outline: 0px;
  }
`;

function MainPage() {
  const [name, setName] = useState("");
  const [custom, setCustom] = useState(false);
  const [mapSizeX, setMapSizeX] = useState(8);
  const [mapSizeY, setMapSizeY] = useState(8);
  const [numberOfMines, setNumberOfMines] = useState(10);
  const history = useHistory();
  const dispatch = useDispatch();
  const setSize = () => {
    const tmp = document.querySelector("#mapSelect");
    if (tmp.value !== "custom") {
      const values = tmp.value.split(",");
      setMapSizeX(values[0]);
      setMapSizeY(values[1]);
      setNumberOfMines(values[2]);
    } else {
      setCustom(true);
    }
  };

  const createGame = () => {
    dispatch(createGameState(name, mapSizeX, mapSizeY, numberOfMines));
    history.push("/inGame");
  };

  return (
    <Container>
      <Title>MineSweeper!</Title>
      <Field>
        <Label>Name:</Label>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></Input>
      </Field>
      <Field>
        <Label>Map size:</Label>
        <Select id="mapSelect" onChange={() => setSize()}>
          <option value="8,8,10">Beginner: 8x8 Mine: 10</option>
          <option value="16,16,40">Advanced: 16x16 Mine: 40</option>
          <option value="16,30,99">Master: 16x30 Mine: 99</option>
          <option value="custom">Custom</option>
        </Select>
      </Field>
      {custom && (
        <div>
          <Field>
            <Label>Number of rows:</Label>
            <Input
              type="number"
              value={mapSizeX}
              onChange={(e) => setMapSizeX(e.target.value)}
            ></Input>
            <br />
          </Field>

          <Field>
            <Label>Number of columns:</Label>
            <Input
              type="number"
              value={mapSizeY}
              onChange={(e) => setMapSizeY(e.target.value)}
            ></Input>

            <br />
          </Field>

          <Field>
            <Label>Number of mines:</Label>
            <Input
              type="number"
              value={numberOfMines}
              onChange={(e) => setNumberOfMines(e.target.value)}
            ></Input>
          </Field>
        </div>
      )}
      <Button onClick={() => createGame()}>Game Start</Button>
    </Container>
  );
}

export default MainPage;
