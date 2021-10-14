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
import { AuthProvider } from "contexts/auth.context";

function App() {
  return (
    <div className="app">
      <GlobalStyle />
      <AuthProvider>
        <Router>
          <Switch>
            <Redirect exact from="/" to="/login" />
            <Route path="/login" component={Login} />
            <Route path="/registration" component={Registration} />
            <Route path="/todo" component={ToDo} />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
