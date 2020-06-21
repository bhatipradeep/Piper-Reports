import React from 'react'
import auth0Client from '../Auth0'
import Employee from './Employee'
import Boss from './Boss'
import axios from 'axios'
import { withRouter } from 'react-router'

class HomePage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            userData:null
        }
        
    }
    async componentDidMount(){
        const name = auth0Client.getProfile().name
        const userData = (await axios.get(`http://localhost:8081/${name}`, 
        {
            headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
        })).data;
        console.log(userData)
        this.setState({
            userData : userData
        })
    }
    render(){
        if(!auth0Client.isAuthenticated()){
            auth0Client.signIn();
            return <div></div>
        }
        if(this.state.userData === null){
            return (
                <div class="text-center">
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <div>
                        <p>Loading</p>
                    </div>
                </div>
            )
            
        }
        if(this.state.userData.type === "-1"){
            console.log("FirstTimeForm")
            this.props.history.push('/FirstTimeForm')
            return <div></div>
        }
        console.log(this.state)
        if(this.state.userData.type === 'Employee'){
            console.log(Employee)
            return <Employee userData={this.state.userData}/>
        }
        if(this.state.userData.type === 'Boss'){
            return <Boss userData={this.state.userData}/>
        }
    }
}


export default withRouter(HomePage)