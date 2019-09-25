import React from 'react' ;
import {Route, Redirect} from 'react-router-dom';
import { Consumer } from './UserContext';


// Private routes for authorized actions '/courses/create' and '/courses/:id/update'
const PrivateRoute = ({ component: Component, ...rest }) => {
	return (
		<Consumer>{ ({ authenticated }) => (
			<Route
				render={props =>
					authenticated ? (
						<Component {...props} />
					) : (
						<Redirect to={{ pathname: '/signin', state: { from: props.location}
					}}
				 />
				)
			}
			{...rest}
		/>
	)}
 </Consumer>
);
};



export default PrivateRoute;