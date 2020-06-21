import React from 'react'
import auth0Client from '../Auth0'
import axios from 'axios'
import { withRouter } from 'react-router'

class Boss extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            userData:null
        }
        
    }
    async componentDidMount(){
        const name = auth0Client.getProfile().name
        const userData = (await axios.get(`http://localhost:8081/reports/${name}`, 
        {
            headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
        })).data;
        this.setState({
            userData : userData
        })
        console.log(this.state);
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
        return (
            <div>
            <h5>You got some daily reports to read</h5>
            <div class="card text-white bg-primary mb-3" styles="max-width: 20rem;">
            <div class="card-header">Report</div>
            <div class="card-body">
            <h4 class="card-title">{this.state.userData.report}</h4>
            <p class="card-text">Employee Name : {this.state.userData.author}</p>
            </div>
            </div>
            </div>
        )
        
    }
}


export default withRouter(Boss)