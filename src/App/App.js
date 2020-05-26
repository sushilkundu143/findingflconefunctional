import React, {Component} from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import Home from './../components/Home'
import Result from './../components/Result'
import Header from './../App/commonComponents/Header'
import Footer from './../App/commonComponents/Footer'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      getrespnse: {}
    }
  }
  render(){
    return (
        <Router>
          <Header />
          <div className="container mobileP">
            <h2 className="title is-2 has-text-centered mt-1">Finding Falcone!</h2>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/result' component={Result} />
            </Switch>
          </div>
          <Footer />
        </Router>
    )
  }
}

export default App
