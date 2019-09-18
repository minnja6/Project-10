import React from 'react';
import axios from 'axios';
import OneCourse from './OneCourse';
import { Link } from 'react-router-dom';
//Stateful className component 
export default class CourseDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      courses: []
    };
  }
  componentDidMount() {
    //fetching courses data using axios 
    axios.get(`http://localhost:5000/api/courses`)
      .then(response => {
        this.setState({
          courses: response.data
        });
      })
      //catch the error 
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }
  //render and return each course by mapping through and giving each course the title, id and key 
  render() {
    return (
      <div className="bounds">
        {this.state.courses.map(course => <OneCourse title={course.title} key={course.id} id={course.id} />)}

        <div className="grid-33">
        <Link className="course--module course--add--module" to="/courses/create">
          <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            viewBox="0 0 13 13" className="add">
            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
          </svg>New Course</h3>
        </Link>
        </div>
      </div>
    );
  }
}