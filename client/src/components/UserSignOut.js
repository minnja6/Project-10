import React from 'react';
import { Redirect } from 'react-router-dom';
//Stateless functional component
export default ({context}) => {
  context.actions.signOut();
  return (
    <Redirect to="/" />
  );
}
