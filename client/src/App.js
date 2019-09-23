import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import '../src/styles/global.css';

// Import App Components
import Header from './Components/Header';
import Courses from './Components/Courses';
import CourseDetail from './Components/CourseDetail';
import CreateCourse from './Components/CreateCourse';
import UserSignUp from './Components/UserSignUp';
import UserSignIn from './Components/UserSignIn';
import UserSignOut from './Components/UserSignOut';
import UpdateCourse from './Components/UpdateCourse';
import ErrorPage from './Components/Error';
import Forbidden from './Components/Forbidden'
import NotFound from './Components/NotFound';

// Connect the App Component to Context
import withContext from './Context';
// Import the PrivateRoute Component
import PrivateRoute from './PrivateRoute';

const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const CoursesWithContext = withContext(Courses);
const NotFoundWithContext = withContext(NotFound);
const UpdateCourseWithContext = withContext(UpdateCourse)

export default class App extends Component {
  // Constructor initializes state //
  
    state = {
    };

  render() {
    return (         
      <div>
      <BrowserRouter>
        <HeaderWithContext />
        <Switch>        
          <Route exact path="/" render={ () => <Redirect to="/courses/" /> } />

          <Route path="/signin" component={UserSignInWithContext} />
          <Route path="/signup" component={UserSignUpWithContext} />
          <Route path="/signout" component={UserSignOutWithContext} />
          
          <PrivateRoute exact path="/courses/createcourse/" component={CreateCourseWithContext}/>
          <Route exact path="/courses" component={CoursesWithContext} />
          <PrivateRoute path="/courses/:id/updatecourse/" component={UpdateCourseWithContext} />
          <Route path="/courses/:id" component={CourseDetailWithContext} />

          <Route exact path="/notfound" component={NotFoundWithContext}/>
          <Route exact path="/error" component={ErrorPage}/>
          <Route exact path="/forbidden" component={Forbidden}/>
          <Route component={NotFound}/>
        </Switch>
      </BrowserRouter>    
      </div> 
    );
  }
}// import '../src/styles/global.css';
// import React from 'react';
// import {
//   BrowserRouter as Router,
//   Route,
//   Switch
// } from 'react-router-dom';

// import Header from './components/Header';
// import NotFound from './components/NotFound';
// import UserSignUp from './components/UserSignUp';
// import UserSignIn from './components/UserSignIn';
// import UserSignOut from './components/UserSignOut';
// // import Authenticated from './components/Authenticated';
// import Courses from './components/Courses';
// import withContext from './Context';
// import PrivateRoute from './PrivateRoute';
// import CourseDetail from './components/CourseDetail';

// const HeaderWithContext = withContext(Header);
// // const AuthWithContext = withContext(Authenticated);
// const UserSignUpWithContext = withContext(UserSignUp);
// const UserSignInWithContext = withContext(UserSignIn);
// const UserSignOutWithContext = withContext(UserSignOut);

// export default () => (
//   <Router>
//     <div>
//       <HeaderWithContext />

//       <Switch>
//         <Route exact path="/" component={Courses} />
//         {/* <PrivateRoute path="/authenticated" component={AuthWithContext} /> */}
//         <Route path="/signin" component={UserSignInWithContext} />
//         <Route path="/signup" component={UserSignUpWithContext} />
//         <Route path="/signout" component={UserSignOutWithContext} />
//         <Route exact path="/courses" component={Courses} />
//         <Route path="/courses/:id" component={CourseDetail}/>
//         <Route component={NotFound} />
//       </Switch>
//     </div>
//   </Router>
// );