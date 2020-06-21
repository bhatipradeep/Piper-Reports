import React from 'react'
import auth0Client from '../Auth0'

function MainPage(props) {
    return (
        <div class="jumbotron">
            <h1 class="display-3">Piper-Reports</h1>
            <p class="lead">A Work From Home Reporting system</p>
            <hr class="my-4"/>
                <p>For daily reports and reviews from Employee to Boss. SignIn for better experience</p>
                <p class="lead">
                    <button
                        className="btn btn-primary"
                        onClick={() => {auth0Client.signIn()}}>
                        Sign In
                    </button>
                </p>
        </div>
    )
}

export default MainPage