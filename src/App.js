import { BrowserRouter, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import GamePage from "./components/GamePage";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route path="/" component={MainPage} exact></Route>
        <Route path="/inGame" component={GamePage} exact></Route>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
