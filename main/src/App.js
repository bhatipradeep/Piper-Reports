import React from 'react'
import {Route} from 'react-router'
import Callback from './Callback'
import NavBar from './NavBar/NavBar'
import HomePage from './HomePage/HomePage'
import SecuredRoute from './SecuredRoute/SecuredRoute'
import FirstTimeForm from './FirstTimeForm/FirstTimeForm'
import Mainpage from './MainPage/MainPage'

class App extends React.Component{

  render(){
    return(
      <div>
        <NavBar />
        <Route exact path='/' component={Mainpage}/>
        <Route exact path='/home' component={HomePage}/>
        <Route exact path='/FirstTimeForm' component={FirstTimeForm}/>
        <Route exact path='/callback' component={Callback}/>

      </div>
    )
  }
}

export default App