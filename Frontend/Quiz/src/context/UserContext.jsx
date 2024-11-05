// UserContext.js
import React, { createContext, useReducer } from 'react';

// Create a context
export const UserContext = createContext();

// Define initial state
const initialState = {
    username: '',
};

// Define a reducer function
const userReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USERNAME':
            return { ...state, username: action.payload };
        default:
            return state;
    }
};

// Create a provider component
export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};
