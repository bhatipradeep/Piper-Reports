import React from 'react'
import auth0Client from '../Auth0'
import axios from 'axios'
class FirstTimeForm extends React.Component{
    constructor(props){
        super(props);
        this.updateUserName = this.updateUserName.bind(this);
        this.updateType = this.updateType.bind(this);
        this.submit = this.submit.bind(this);
        this.state = {
            userName : '',
            type : ''
        }
    }
    updateType(value){
        console.log(value);
        this.setState({
            type : value
        })
    }
    updateUserName(value){
        this.setState({
            userName:value
        })
    }

    async submit(){
        const name = auth0Client.getProfile().name;
        const params = {
            userName : this.state.userName,
            type: this.state.type
        }
        (await axios.post(`http://localhost:8081/${name}`,
            params, 
        {
            headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
        }));
        this.props.history.replace('/home')
    }

    render(){
        if(!auth0Client.isAuthenticated()){
            auth0Client.signIn();
            return <div></div>
        }
        return (
            <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="card border-primary">
                  <div className="card-header">Nice to meet you. Update your Profile</div>
                  <div className="card-body text-left">
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Name *:</label>
                      <input
                        disabled=""
                        type="text"
                        onBlur={(e) => {this.updateUserName(e.target.value)}}
                        className="form-control"
                        placeholder="Give your name."
                      />
                    </div>
                    <fieldset class="form-group">
                    <legend>User Type *</legend>
                    <div class="form-check">
                    <input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios1" value="Boss" onClick={(e) => {this.updateType(e.target.value)}}/>
                        <label class="form-check-label">
                            Boss
                        </label>
                    </div>
                    <div class="form-check">
                    <input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios2" value="Employee" onClick={(e) => {this.updateType(e.target.value)}}/>
                        <label class="form-check-label">
                            Employee
                        </label>
                    </div>
                    
                    </fieldset>
                    <button
                      disabled={this.state.disabled}
                      className="btn btn-primary"
                      onClick={() => {this.submit()}}>
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
            </div>
        )
    }


}

export default FirstTimeForm;