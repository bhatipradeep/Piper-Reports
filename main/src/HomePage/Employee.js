import React from 'react'
import auth0Client from '../Auth0'
import axios from 'axios'
class Employee extends React.Component{
    constructor(props){
        super(props);
        this.subscribeBoss=this.subscribeBoss.bind(this)
        this.updateSubscribeID=this.updateSubscribeID.bind(this)
        this.updateReport=this.updateReport.bind(this)
        this.sendReport=this.sendReport.bind(this)
        this.state={
            subscribeID:'',
            subscribeDone:false,
            report:'',
            reportSent:false
        }
    }
    updateSubscribeID(value){
        this.setState({
            subscribeID:value,
        })
    }
    async subscribeBoss(){
        console.log(this.state);
        this.setState({
            subscribeDone:true
        });

        (await axios.post(`http://localhost:8081/subscribe/${this.props.userData.name}`,
        {
            subscriptionId : this.state.subscribeID
        }, 
        {
            headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
        }));
    }

    async updateReport(value){
        this.setState({
            report:value
        })
    }

    async sendReport(){
        console.log(this.state);
        (await axios.post(`http://localhost:8081/report/${this.props.userData.name}`,
        {
            report:this.state.report
        }, 
        {
            headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
        }));
        this.setState({
            reportSent:true
        })
    }
    render(){
        console.log(this.props.userData.UserName)
        return (
            <div>
                <h2>Welcome {this.props.userData.UserName}</h2>
                
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Boss's SubscribeID" aria-label="Recipient's username" onChange={(e)=>{this.updateSubscribeID(e.target.value)}} aria-describedby="button-addon2"/>
                    <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={()=>{this.subscribeBoss()}}>SUBSCRIBE</button>
                    </div>
                </div>
                {this.state.subscribeDone && <p class="text-success">Subscription Successfull. All your subscribed boss will recieve your reports</p>}

                <div class="card text-center">
                <div class="card-header">
                    Its time to report
                </div>
                <div class="card-body">
                    <h5 class="card-title">Report</h5>
                    <div className="form-group">
                        <textarea className="form-control" onChange={(e)=>{this.updateReport(e.target.value)}} type="textarea" id="subject" placeholder="Write your report here" maxLength="140" rows="9"></textarea>
                    </div>
                    <button class="btn btn-primary" onClick={()=>{this.sendReport()}}>Report</button>
                </div>
                {this.state.reportSent &&<div class="card-footer text-muted">
                    <p class="text-success">Report Successfully sent</p>
                </div>}
                { !this.state.reportSent &&<div class="card-footer text-muted">
                    This report will be sent to all subscribed bosses.
                </div>}
                </div>
            </div>
        
        )
    }
}

export default Employee;