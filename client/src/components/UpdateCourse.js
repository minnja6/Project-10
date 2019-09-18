import React from 'react';
//Stateful class component 
export default class UpdateCourse extends React.PureComponent {
    render(){
    return(
    <div class="actions--bar">
    <div class="bounds">
      <div class="grid-100"><span><a class="button" href="update-course.html">Update Course</a><a class="button" href="#">Delete Course</a></span><a
          class="button button-secondary" href="index.html">Return to List</a></div>
    </div>
  </div>
    )
  }
}
