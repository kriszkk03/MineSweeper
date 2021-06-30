import { CREATE_GAME, HANDLE_LEFT_CLICK, HANDLE_RIGHT_CLICK } from "./actions";

const initialGameState = {
  x: 0,
  y: 0,
  name: "",
  gameField: [],
  inGame: true,
  win: true,
  mineC: 0,
  mineCounter: 0,
  numberOfFields: 0,
  minute: 0,
  seconds: 0,
};

const gameReducer = (state = initialGameState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_GAME: {
      let newState = JSON.parse(JSON.stringify(state));
      newState.gameField = [];
      newState.x = payload.x;
      newState.y = payload.y;
      newState.inGame = true;
      newState.win = true;
      newState.name = payload.name;
      newState.mineC = payload.mine;
      newState.mineCounter = payload.mine;
      newState.numberOfFields = payload.x * payload.y;
      newState.minute = 0;
      newState.seconds = 0;
      for (let i = 0; i < payload.x; i++) {
        newState.gameField[i] = [];
        for (let j = 0; j < payload.y; j++) {
          newState.gameField[i][j] = { state: "hidden", value: "e" };
        }
      }
      let minesCoordinates = [];
      let tmpo = {
        x: Math.floor(Math.random() * payload.x),
        y: Math.floor(Math.random() * payload.y),
      };
      minesCoordinates.unshift(tmpo);
      for (let i = 0; i < payload.mine - 1; i++) {
        while (checkEq(minesCoordinates, tmpo)) {
          tmpo = {
            x: Math.floor(Math.random() * payload.x),
            y: Math.floor(Math.random() * payload.y),
          };
        }
        minesCoordinates.unshift(tmpo);
      }
      minesCoordinates.forEach((coo) => {
        newState.gameField[coo.x][coo.y].value = "X";
      });

      for (let i = 0; i < payload.x; i++) {
        for (let j = 0; j < payload.y; j++) {
          const tmp = counAdjacentFields(i, j, newState.gameField);

          if (newState.gameField[i][j].value !== "X") {
            if (tmp === 0) {
              newState.gameField[i][j].value = "";
            } else {
              newState.gameField[i][j].value = tmp;
            }
          }
        }
      }
      return newState;
    }
    case HANDLE_LEFT_CLICK: {
      let newState = JSON.parse(JSON.stringify(state));

      if (newState.gameField[payload.x][payload.y].state === "hidden") {
        newState.gameField[payload.x][payload.y].state = "leftClicked";
        if (newState.gameField[payload.x][payload.y].value === "") {
          handleEmptyField(payload.x, payload.y, newState.gameField);
        }
      }
      if (newState.gameField[payload.x][payload.y].value === "X") {
        newState.win = false;
        newState.inGame = false;
      } else if (
        countNotHiddenFields(newState.gameField, newState.numberOfFields) ===
        newState.numberOfFields - newState.mineC
      ) {
        newState.inGame = false;
      }
      return newState;
    }
    case HANDLE_RIGHT_CLICK: {
      let newState = JSON.parse(JSON.stringify(state));
      if (newState.gameField[payload.x][payload.y].state === "hidden") {
        newState.gameField[payload.x][payload.y].state = "rightClicked";
        newState.mineCounter = newState.mineCounter - 1;
      } else if (
        newState.gameField[payload.x][payload.y].state === "rightClicked"
      ) {
        newState.mineCounter = newState.mineCounter + 1;
        newState.gameField[payload.x][payload.y].state = "hidden";
      }

      return newState;
    }

    default: {
      return state;
    }
  }
};

const checkEq = (coordinates, ch) => {
  for (const coo of coordinates) {
    if (coo.x === ch.x && coo.y === ch.y) {
      return true;
    }
  }
  return false;
};
const counAdjacentFields = (x, y, gameField) => {
  let counter = 0;

  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      if (
        !(typeof gameField[i] === "undefined") &&
        !(typeof gameField[i][j] === "undefined") &&
        gameField[i][j].value === "X"
      ) {
        counter = counter + 1;
      }
    }
  }
  return counter;
};

const handleEmptyField = (x, y, gameField) => {
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      if (
        !(typeof gameField[i] === "undefined") &&
        !(typeof gameField[i][j] === "undefined") &&
        (i !== x || j !== y)
      ) {
        if (
          gameField[i][j].value !== "" &&
          gameField[i][j].state === "hidden"
        ) {
          gameField[i][j].state = "leftClicked";
        }
        if (
          gameField[i][j].value === "" &&
          gameField[i][j].state === "hidden"
        ) {
          gameField[i][j].state = "leftClicked";
          handleEmptyField(i, j, gameField);
        }
      }
    }
  }
};

const countNotHiddenFields = (gameField, numberOfFields) => {
  let counter = 0;
  for (let i = 0; i < gameField.length; i++) {
    for (let j = 0; j < gameField[i].length; j++) {
      if (gameField[i][j].state !== "leftClicked") counter = counter + 1;
    }
  }

  return numberOfFields - counter;
};
export default gameReducer;
