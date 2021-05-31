import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Loginpage from './Pages/Login/login';
import Signup from './Pages/Signup/Signup';
import About from './Pages/About/About';
import Profile from './Pages/Profile/Profile'
import PageNotFound from './Pages/NotFound/NotFound';
import Insert from './Component/Insert/Insert'
import Edit from './Component/Edit/Edit'
import PrivateRoute from './PrivateRoute/PrivateRoute'

class App extends Component {

  render() {
    return (
      <div className="App">

        <Router>

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Loginpage} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/viewdetails" component={About} />        
            <PrivateRoute exact path="/add" component={Insert} />
            <PrivateRoute exact path="/edit/:id" component={Edit} />
            <Route component={PageNotFound} />
          </Switch>

         </Router>
      </div>
    )
  }

}
export default App;

