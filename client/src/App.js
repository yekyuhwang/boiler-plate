import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from "./hoc/auth";

// Auth가 페이지들을 감싸준다.

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          {/* // true : admin도 들어갈 수 있다는 뜻이다. */}
          <Route exact path="/" component={Auth(LandingPage, null, true)} />
          <Route exact path="/login" component={Auth(LoginPage, false)}/>
          <Route exact path="/register" component={Auth(RegisterPage, false)}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
