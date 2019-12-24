import React, { Component } from 'react';
import login from './component/Login';
import register from './component/Register';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <Switch>
          <div className="container">
            <Route path="/login" component={login} />
            <Route path="/register" component={register} />
          </div>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
