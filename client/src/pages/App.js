import React, { Component } from 'react';
import Home from './Home';
import Purchase from './Purchase';
import FAQ from './FAQ';
import ContactUs from './ContactUs';
import Dashboard from './Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { loadUser } from '../actions/authActions';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from '../store';

class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/purchase" exact component={Purchase}></Route>
            <Route path="/faq" component={FAQ}></Route>
            <Route path="/contactus" component={ContactUs}></Route>
            <Route path="/dashboard" component={Dashboard}></Route>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;