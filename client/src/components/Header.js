import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    const { context } = this.props;
    let authUser = null;

    if(context) {
      authUser = context.authenticatedUser;
    }

    return (
      <div className="header">
        <div className="bounds">
          <Link className="header--logo" to="/">Courses</Link>
          <nav>
            {authUser ?
              <React.Fragment>
                <span>Welcome, {authUser.firstName} {authUser.lastName}!</span>
                <Link className="signout" to="/signout">Sign Out</Link>
              </React.Fragment>
              :
              <React.Fragment>
                <Link className="signup" to="/signup">Sign Up</Link>
                <Link className="signin" to="/signin">Sign In</Link>
              </React.Fragment>
            }
          </nav>
        </div>
      </div>
    );
  }
}