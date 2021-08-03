import './App.css';
import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Authentication from './Components/Authentication/Authentication';
import Dashboard from './Components/Dashboard/Dashboard';
import Navigation from './Components/Navigation/Navigation';
import Footer from './Components/Footer';

function App() {

  return (
    <div className="App">
      <Router>
          <Navigation />
          <main>
            <Switch>
              <Route path="/dashboard" exact component={Dashboard} />
              <Route path="/" exact component={Authentication} />
            </Switch>
          </main>  
      </Router> 
      <Footer />
    </div>
  );
}

export default App;
