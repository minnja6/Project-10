import React, { Component } from 'react';
import './App.css';
import PhotoContainer from './PhotoContainer';
import Nav from './Nav';
import Search from './Search';
import axios from 'axios';
import Error from './Error';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
//Stateful class component 
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      courses: [],
      prevSearch: '',
    };
  }
  //creating a search function
  search = (searchResults, isTrue = false) => {
    if (searchResults !== this.state.prevSearch) {
      this.setState({
        prevSearch: searchResults,
        loading: true
      })
    }
    //fetching photo data using axios 
    axios.get(`http://localhost:5000/api/courses`)
      .then(response => {
        this.setState({
          courses: response.data.photos.photo,
          loading: false
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }
  //importing the Search and Nav components and calling the search function using this.search
  render() {
    return (
      <BrowserRouter>
        <div>
          <div className="container">
            <Search onSearch={this.search}/>
            {/* importing the nav buttons and making them functional/search upon clicking */}
            <Nav isTrue={this.isTrue} onClick={this.search} />

            {
              //extra credit loading requirement
              (this.state.loading)
                ? <h3>Loading...</h3>
                :
                //creating routes for error, root, and search
                <Switch>
                  <Route exact path="/" render={(props) => <PhotoContainer title="PhotoContainer" data={this.state.photos}{...props} />} />
                  <Route exact path="/search/:query" render={(props) => <PhotoContainer search={this.search} photos={this.state.photos}{...props} />} />
                  <Route component={Error} />
                </Switch>
            }
          </div>
        </div>
      </BrowserRouter>
    );
  }
}