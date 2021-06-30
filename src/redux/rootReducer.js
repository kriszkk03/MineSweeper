import { combineReducers } from "redux";
import gameReducer from "./gameState/reducer";

const rootReducer = combineReducers({
  game: gameReducer,
});

export default rootReducer;
