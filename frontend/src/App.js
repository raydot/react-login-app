import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import NavBar from './NavBar/NavBar'
import Question from './Question/Question'
import Questions from './Questions/Questions'
import Callback from './Callback'

class App extends Component {
  render() {
    return (
      <div>
      	<NavBar/>
        <Route exact path='/' component={ Questions }/>
        <Route exact path='/question/:questionId' component={ Question }/>
        <Route exact path='/callback' component={ Callback }/>
      </div>
    );
  }
}

export default App;

/*
In this new version of your App component, you are using two Route elements (provide by react-router-dom) to tell React when you want the Questions component rendered and when you want the Question component rendered. More specifically, you are telling React that if your users navigate to / (exact path='/') you want them to see Questions and, if they navigate to /question/:questionId, you want them to see the details of a specific question.
*/