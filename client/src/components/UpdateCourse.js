import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';

class UpdateCourse extends PureComponent{

    state = {
        id:'',
        title:'',
        description:'',
        estimatedTime:'',
        materialsNeeded:'',
        user : '',
        errorMessages: null,
        redirect: false,
        redirectMessages: null,
        isRender: false
    }

    chnage = (e)  => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]:value})
    }

    componentDidMount = async () => {

        const { data, authenticatedUser } = this.props.context;
        const { params } = this.props.match;
        
        try{
            const course = await data.getCourses(`/courses/${params.id}`);
            
            const {
                id,
                description,
                estimatedTime,
                materialsNeeded,
                title,
                User,
            } = course;

            if(course !== null){
                // if user doesnt not own the course it will throw a err
                //otherwise it will change state with the fetched data
                if(authenticatedUser.id !== User.id){
                    
                     let err = {
                        title:'Forbidden',
                        message:`Oh oh! You can't access this page. 
                        The course you're trying to update belongs to the user "${User.firstName}"`
                    }

                    throw err;

                }else{

                    await this.setState({
                        id,
                        title,
                        description,
                        estimatedTime,
                        materialsNeeded,
                        user : User,
                        isRender:true
                });
                }
            }

        }catch(err){
            if(!err.title)err.title = "Not Found";      
            this.setState({
                redirect:true,
                redirectMessages: err
            });
        }
    }


    
    //method which will submit the course with new data which is picked up from state.
    submit = async (e) => {
        e.preventDefault();

        const { 
            context: { 
                data, 
                cryptr: { decrypt },
                authenticatedUser
            }, 
            history
        } = this.props;

        //data in state
        const {
            id,
            description,
            estimatedTime,
            materialsNeeded,
            title,
        } = this.state;


        //new course data
        const newCourse = {
            description,
            estimatedTime,
            materialsNeeded,
            title,
        };

        const { emailAddress, password } = authenticatedUser;
        const decryptedString = decrypt(password);//decrypted password

        try{

            const res = await data.updateCourse(`/courses/${id}`, newCourse, emailAddress, decryptedString);            
            //if res has a message property, it means an error has occurred
            //otherwise it will move to home page
            if(res.message) throw res;
            else history.push('/');

        }catch(err){
        console.log(`Output => : UpdateCourse -> submit -> err`, err);

            if(err.status === 500){
                
                this.setState({
                    redirect:true,
                    redirectPath: '/error',
                    redirectMessages: err
                });

            }else{

                this.setState({ errorMessages: err.message });

            } 
        }
    }

    render(){
        
        //
        const style = {
            cursor: "pointer"
        };

        const {
            id,
            title,
            description,
            materialsNeeded,
            estimatedTime,
            user,
            errorMessages,
            redirect,
            isRender
        }= this.state;
        
        const { errDisplay, cancel } = this.props.context.actions;        

        if(redirect){
            return(
                <Redirect to={{
                    pathname: '/forbidden',
                    state: this.state.redirectMessages
                }} />
            );
            /*
            when a user is send to the forbidden page just right before getting there, they were getting a glance of the update course
            returned JSX, after a few test i made i found out the when a user was heading to the forbidden page, this componet renders 3 times,
            not sure if thats the mean cause. My solution to aviod that visual disturbances I've set a isRender propety in state,if its true only 
            */
        }else if(isRender){

            return(
                <div className="bounds course--detail">
                    <h1>Update Course</h1>
                    {
                        //diplayes validation messages if available
                        (errorMessages)?
                        errDisplay(errorMessages)
                        :false 
                    }
                    <div>
                        <form onSubmit={this.submit}>
                            <div className="grid-66">
                                <div className="course--header">
                                    <h4 className="course--label">Course</h4>
                                    <div>
                                        <input 
                                        id="title" 
                                        name="title" 
                                        type="text" 
                                        className="input-title course--title--input" 
                                        placeholder="Course title..."
                                        value={title}
                                        onChange={this.chnage}
                                        />
                                    </div>
                                    <p>By {`${user.firstName} ${user.lastName}`}</p>
                                </div>
                                <div className="course--description">
                                    <div>
                                    <textarea 
                                    id="description" 
                                    name="description" 
                                    className="" 
                                    placeholder="Course description..."
                                    value={description}
                                    onChange={this.chnage}>
                                    </textarea>
                                </div>
                                </div>
                            </div>
                            <div className="grid-25 grid-right">
                                <div className="course--stats">
                                    <ul className="course--stats--list">
                                    <li className="course--stats--list--item">
                                        <h4>Estimated Time</h4>
                                        <div>
                                            <input 
                                            id="estimatedTime" 
                                            name="estimatedTime" 
                                            type="text" 
                                            className="course--time--input"
                                            placeholder="Hours" 
                                            value={estimatedTime}
                                            onChange={this.chnage}/>
                                        </div>
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed</h4>
                                        <div>
                                            <textarea 
                                            id="materialsNeeded" 
                                            name="materialsNeeded" 
                                            className="" 
                                            placeholder="List materials..."
                                            value={materialsNeeded}
                                            onChange={this.chnage}>
                                            </textarea>
                                        </div>
                                    </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="grid-100 pad-bottom">
                                <button 
                                style={style}
                                className="button" 
                                type="submit">
                                Update Course
                                </button>
                                <button 
                                style={style}
                                className="button button-secondary" 
                                onClick={e => cancel(e,`/courses/${id}`)}>
                                Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }
    return null
    }
}

export default UpdateCourse
// import React, { Component } from 'react';
// import UpdateCourseForm from './UpdateCourseForm';

// export default class UpdateCourse extends Component {
//     //setting the state of title,description,estimatedTime,materialsNeeded,FirstName,LastName, and errors
//     state = {
//         title: '',
//         description: '',
//         estimatedTime: '',
//         materialsNeeded: '',
//         authorFirstName: '',
//         authorLastName: '',
//         errors: [],
//     }
//     //setting context to this.props and id to this.props.match.params
//     componentDidMount() {

//         // const { context } = this.props;
//         // const { id } = this.props.match.params;

//         this.props.context.data.getCourse(this.props.match.params.id)
//             .then(data => {
//                 //if no data is found, show the not found componenet, else, show courses and user and no errors 
//                 if (data) {
//                     if (data.User.id === this.props.context.authenticatedUser.userId) {
//                         document.title = "Course Updating..."
//                     } else {
//                         this.props.history.push('/forbidden');
//                     }
//                 } else {
//                     this.props.history.push('/notfound');
//                 }
//             })
//             //catch and log error
//             .catch((err) => {
//                 console.log(err);
//                 this.props.history.push('/error');
//             });
//     }
//     change = (event) => {
//         const name = event.target.name;
//         const value = event.target.value;

//         this.setState(() => {
//             return {
//                 [name]: value
//             };
//         });
//     }
//     submit = () => {
//         const { context } = this.props;
//         const { id } = this.props.match.params;

//         const {
//             title,
//             description,
//             estimatedTime,
//             materialsNeeded,
//         } = this.state;


//         const course = {
//             title,
//             description,
//             estimatedTime,
//             materialsNeeded,
//         };

//         const authUser = context.authenticatedUser;   //Auth user message/error validation

//         if (authUser == null) {
//             this.setState({ errors: [{ message: "You have to be logged in to update a course" }] });
//             return;
//         }

//         context.data.updateCourse(id, course, authUser.username, authUser.password)
//             .then(errors => {

//                 if (errors.length) {
//                     this.setState({ errors });
//                 } else {
//                     this.props.history.push('/');
//                 }
//             })
//             .catch((err) => {
//                 console.log(err);
//                 this.props.history.push('/error');
//             });

//     }

//     cancel = () => {
//         const { id } = this.props.match.params;

//         this.props.history.push(`/courses/${id}`);
//     }

//     //rendering title,description,estimatedTime,materialsNeeded,FirstName,LastName, and errors
//     render() {
//         const {
//             title,
//             description,
//             estimatedTime,
//             materialsNeeded,
//             authorFirstName,
//             authorLastName,
//             errors,
//         } = this.state;

//         return (                   //Return using CourseForm
//             <UpdateCourseForm
//                 cancel={this.cancel}
//                 errors={errors}
//                 submit={this.submit}
//                 submitButtonText="Update Course"
//                 elements={() => (
//                     <React.Fragment>
//                         <div className="grid-66">
//                             <div className="course--header">
//                                 <h4 className="course--label">Course</h4>
//                                 <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
//                                     value={title} onChange={this.change} /></div>
//                                 <p>By {authorFirstName} {authorLastName} </p>
//                             </div>
//                             <div className="course--description">
//                                 <div><textarea id="description" name="description" className="" placeholder="Course description..." onChange={this.change} value={description} ></textarea></div>
//                             </div>
//                         </div>
//                         <div className="grid-25 grid-right">
//                             <div className="course--stats">
//                                 <ul className="course--stats--list">
//                                     <li className="course--stats--list--item">
//                                         <h4>Estimated Time</h4>
//                                         <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
//                                             placeholder="Hours" value={estimatedTime} onChange={this.change} /></div>
//                                     </li>
//                                     <li className="course--stats--list--item">
//                                         <h4>Materials Needed</h4>
//                                         <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." onChange={this.change} value={materialsNeeded} ></textarea></div>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>

//                     </React.Fragment>
//                 )} />

//         );
//     }
// }