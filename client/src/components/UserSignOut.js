// import React from 'react';
// import { Redirect } from 'react-router-dom';

// export default ({context}) => {
//   context.actions.signOut();

//   return (
//     <Redirect to="/" />
//   );
// }
import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
// Non-rendering component Signs out authenticated user, redirects to '/courses'
class UserSignOut extends Component {
	render(){
		return (<Redirect to="/courses" />);
	}
}

export default UserSignOut;

