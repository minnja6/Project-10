import React, { Component } from 'react';
import axios from 'axios';
//Stateful className component 
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }
  componentDidMount(){
 
    //fetching courses data using axios 
    axios.get(`http://localhost:5000/api/courses`)
      .then(response => {
        this.setState({
          data: response.data
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }
  //rendering 
  render() {
    let HtmlData = this.state.data.map(dataItem =>(
      <div className="grid-33">
      </div>
    ));
    return (
     <div className="bounds">
     {HtmlData}
        <div className="grid-33"><a className="course--module course--link" href="course-detail.html">
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">Build a Basic Bookcase</h3>
          </a></div>
        <div className="grid-33"><a className="course--module course--link" href="course-detail.html">
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">Learn How to Program</h3>
          </a></div>
        <div className="grid-33"><a className="course--module course--link" href="course-detail.html">
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">Learn How to Test Programs</h3>
          </a></div>
        <div className="grid-33"><a className="course--module course--add--module" href="create-course.html">
            <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 13 13" className="add">
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>New Course</h3>
          </a>
    </div>
  </div>

    );
  }
}