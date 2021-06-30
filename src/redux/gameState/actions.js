export const CREATE_GAME = "CREATE_GAME";
export const HANDLE_LEFT_CLICK = "HANDLE_LEFT_CLICK";
export const HANDLE_RIGHT_CLICK = "HANDLE_RIGHT_CLICK";

export const createGameState = (name, x, y, mine) => {
  return {
    type: CREATE_GAME,
    payload: {
      name,
      x,
      y,
      mine,
    },
  };
};
export const leftClick = (x, y) => {
  return {
    type: HANDLE_LEFT_CLICK,
    payload: {
      x,
      y,
    },
  };
};

export const rightClick = (x, y) => {
  return {
    type: HANDLE_RIGHT_CLICK,
    payload: {
      x,
      y,
    },
  };
};
