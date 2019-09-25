
import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
// Non-rendering component will sign out authenticated user,and redirect to courses
class UserSignOut extends Component {
	render(){
		return (<Redirect to="/courses" />);
	}
}

export default UserSignOut;

