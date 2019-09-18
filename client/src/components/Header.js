import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.PureComponent {
  render() {
    let authUser = {};
    const { context } = this.props;
    if(context)
    {authUser = context.authenticatedUser};

    return (
      <div className="header">
        <div className="bounds">
          <Link className="header--logo" to="/courses/">Courses</Link>
          <nav>
            {authUser ? (
              <React.Fragment>
                {/* <span>Welcome, {authUser.name}!</span> */}
                <Link to="/signin">Sign In</Link>
                <Link to="/signout">Sign Out</Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Link className="signup" to="/signup">Sign Up</Link>
                <Link className="signin" to="/signin">Sign In</Link>
              </React.Fragment>
            )}
          </nav>
        </div>
      </div>
    );
  }
};
