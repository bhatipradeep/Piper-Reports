import React from 'react'
import auth0Client from './Auth0'
import {withRouter} from 'react-router-dom'

class Callback extends React.Component{
    
    async componentDidMount(props){
        await auth0Client.handleAuthentication();
        this.props.history.replace('/')
    }
    render(){
        return(
            <p> LOADING PROFILE </p>
        )
    }
}

export default withRouter(Callback)