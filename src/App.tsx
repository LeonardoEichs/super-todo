import React from "react";
import GlobalStyle from "./styles/globalStyles";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "pages/Login";
import Registration from "pages/Registration";
import ToDo from "pages/ToDo";
import SingleToDo from "pages/ToDo/SingleToDo";
import { AuthProvider } from "contexts/auth.context";

function App() {
  return (
    <div className="app">
      <GlobalStyle />
      <Router>
        <AuthProvider>
          <Switch>
            <Redirect exact from="/" to="/login" />
            <Route exact path="/login" component={Login} />
            <Route exact path="/registration" component={Registration} />
            <Route exact path="/todo" component={ToDo} />
            <Route exact path="/todo/:id" component={SingleToDo} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
