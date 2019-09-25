import React from 'react';
//userContext

const UserContext = React.createContext();
export const Provider = UserContext.Provider;
export const Consumer = UserContext.Consumer;
export default UserContext;