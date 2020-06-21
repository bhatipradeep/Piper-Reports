import React from 'react'

class Employee extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        console.log(this.props.userData.UserName)
        return (
        <h2>Welcome {this.props.userData.UserName}</h2>
        )
    }
}

export default Employee;