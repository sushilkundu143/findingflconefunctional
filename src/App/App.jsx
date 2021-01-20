import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from '../components/Home';
import Result from '../components/Result';
import Header from './commonComponents/Header';
import Footer from './commonComponents/Footer';

function App() {
  return (
    <Router>
      <Header />
      <div className="container mobileP">
        <h2 className="title is-2 has-text-centered mt-1">Finding Falcone!</h2>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/result" component={Result} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
