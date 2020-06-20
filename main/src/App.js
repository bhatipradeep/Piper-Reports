import React from 'react'
import {Route} from 'react-router'
import Callback from './Callback'
import NavBar from './NavBar/NavBar'
import HomePage from './HomePage/HomePage'


class App extends React.Component{

  render(){
    return(
      <div>
        <NavBar />
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/callback' component={Callback}/>

      </div>
    )
  }
}

export default App