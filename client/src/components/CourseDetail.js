import React, {Component} from 'react';
import axios from 'axios';
import {Link, withRouter} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Consumer } from '../Context'

//This component provides the "Course Detail" screen by retrieving the detail for a course from the REST API's /api/courses/:id route and rendering the course. 
class CourseDetails extends Component {    
    constructor() {
        super();
        this.state = {
            id: "",
            title:"",
            description:"",
            user:"",
            estimatedTime:"",
            courses:[],
            isLoaded: false,
            signedIn: false,
            isAuthenticated:false
        }
    }
    //Gets courses based off of their id
    componentDidMount() {
      axios.get(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
          .then(res => {
              this.setState({
                  isLoaded: true,
                  courses: res.data,
                  userId: res.data.User.id,                  
                  description:res.data.description,
                  title:res.data.title,
                  materialsNeeded:res.data.materialsNeeded,
                  estimatedTime:res.data.estimatedTime,
                  firstName:res.data.firstName,
                  lastName:res.data.lastName
              })
           }).catch(err =>{
             console.log(err);
           }) 
   }
   //used to delete a course if you are the authenticated user
    deleteCourse = (id) => {
      axios.delete(`http://localhost:5000/api/courses/${this.props.match.params.id}`,{  
       headers:{
        'Authorization': JSON.parse(window.localStorage.getItem('auth'))
          }  
    }).then(res =>{
            this.props.history.push(`/courses`);
        }).catch(err =>{
          console.log(err);
        }) 
      }    
      //handles any type of changes that occur in the field
      handleChange = e => {
        this.setState({[e.target.id]: e.target.value});
      }
     //when someone submits the form, it runs the delete course method based on their id
      handleSubmit = e => {
        e.preventDefault();
        this.deleteCourse(this.props.id);
         }

  render(){
   return (
     <Consumer>
     {context => {
         let updateButton = <Link className="button" to={`/courses/${this.props.id}/update`}>Update Course</Link>
         let deleteButton =  <button className="button" onClick={this.handleSubmit}>Delete Course</button>
       
    return(
    <div>
    <div className="actions--bar">
      <div className="bounds">
        <div className="grid-100">
          <span>
            {updateButton}
            {deleteButton}
          </span>
          <Link className="button button-secondary" to="/">Return to List</Link>
        </div>
      </div>
    </div>
           
          <div className="bounds course--detail">

          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{this.state.title}</h3>
              <p>By: {(this.state.courses.User) ? this.state.courses.User.firstName + " " + this.state.courses.User.lastName : "Instructor Not Listed"}</p>
            </div>
            <div className="course--description">
            <ReactMarkdown>{this.state.description}</ReactMarkdown>
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{this.state.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                  <ReactMarkdown>{this.state.materialsNeeded}</ReactMarkdown>
                    
                  </ul>
                </li>
              </ul>
            </div>
          </div>
         </div>
        </div>
        )
       }}
     </Consumer>
    );
  }
}
export default withRouter(CourseDetails);
// import React, {Component} from 'react';
// import { Link } from 'react-router-dom';
// import ReactMarkdown from 'react-markdown';

// import axios from 'axios';

// export default class CourseDetail extends Component {

//   state = {
//     course : [],
//     courseUser: []
//   }

//   // Get all the courses on Component Mount
//   componentDidMount() {
//     const { match: { params } } = this.props;
  
//     axios.get(`/api/courses/${params.id}`)
//       .then(({ data: course }) => {
//         this.setState({ course, courseUser: course.User });
//       })
//       .catch((err) => {
//         console.log(err)
//       })

//   }

//   // Function which only an authenticated User can delete 
//   // his/her course
//    deleteCourse = () => {
//     const id = this.props.match.params.id
//     const { context } = this.props;
//     let authUser = null;

//     if(context) {
//       authUser = context.authenticatedUser;
//     }


//     const emailAddress = authUser.emailAddress;
//     const password = authUser.password

//     // Axios Delete Request: url, an option:  auth, which is the basic authentication
//     axios.delete(`/api/courses/${id}`, {
//       auth: {
//         username: emailAddress,
//         password
//       }
//     })
//       .then(() => {
//         this.props.history.push(`/`)
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   }

//   render() {

//     const { course, courseUser } = this.state;
//     const { context } = this.props;
//     let authUser = null;

//     if(context) {
//       authUser = context.authenticatedUser;
//     }

//     return(
//       <div>
//         <div className="actions--bar">
//           <div className="bounds">
//             <div className="grid-100">
//               { authUser !== null && authUser.id === course.userId &&
//                 <span>
//                   <Link className="button" to={`/courses/${course.id}/update`}>Update Course</Link>
//                   <button className="button" onClick={this.deleteCourse}>Delete Course</button>
//                 </span>
//               }
//               <Link className="button button-secondary" to="/">Return to List</Link>
//             </div>
//           </div>
//         </div>
//         <div className="bounds course--detail">
//           <div className="grid-66">
//             <div className="course--header">
//               <h4 className="course--label">Course</h4>
//               <h3 className="course--title">{course.title}</h3>
//               <p>By {courseUser.firstName} {courseUser.lastName}</p>
//             </div>
//             <ReactMarkdown className="course--description" source={course.description} />
//           </div>
//           <div className="grid-25 grid-right">
//             <div className="course--stats">
//               <ul className="course--stats--list">
//                 <li className="course--stats--list--item">
//                   <h4>Estimated Time</h4>
//                   <h3>{course.estimatedTime}</h3>
//                 </li>
//                 <li className="course--stats--list--item">
//                   <h4>Materials Needed</h4>
//                   <ReactMarkdown source={course.materialsNeeded} />
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
// render() {
//   return(
//     <div>
//       {this.state.redirect ? <Redirect to="/" /> : null}
//       {this.state.notFound ? <Redirect to="/notfound" /> : null}
//       <Header user={this.props.user} loggedIn={this.props.loggedIn} />
//       <div className="actions--bar">
//         <div className="bounds">
//           <div className="grid-100">
//             {this.checkUserAuth()}
//             <Link className="button button-secondary" to="/">Return to List</Link>
//           </div>
//         </div>
//       </div>
//       <div className="bounds course--detail">
//         <div className="grid-66">
//           <div className="course--header">
//             <h4 className="course--label">Course</h4>
//             <h3 className="course--title">{this.state.title}</h3>
//             <p>By {this.state.user.firstName} {this.state.user.lastName}</p>
//           </div>
//           <div className="course--description">
//             {this.formatDescription()}
//           </div>
//         </div>
//         <div className="grid-25 grid-right">
//           <div className="course--stats">
//             <ul className="course--stats--list">
//               <li className="course--stats--list--item">
//                 <h4>Estimated Time</h4>
//                 <h3>{this.state.estimatedTime}</h3>
//               </li>
//               <li className="course--stats--list--item">
//                 <h4>Materials Needed</h4>
//                 <ul>
//                   {this.formatMaterialsNeeded()}
//                 </ul>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }