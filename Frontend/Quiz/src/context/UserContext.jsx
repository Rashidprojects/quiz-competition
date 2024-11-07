// UserContext.js
import React, { createContext, useEffect, useReducer } from 'react';

// Create a context
export const UserContext = createContext();

// Define initial state
const initialState = {
    username: localStorage.getItem('username') ||  '',
};

// Define a reducer function
const userReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USERNAME':
            return { ...state, username: action.payload };
        case 'LOGOUT':
            return { ...state, username: '' };
        default:
            return state;
    }
};

// Create a provider component
export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    useEffect(() => {
        if (state.username) {
            localStorage.setItem('username', state.username)
        }else {
            localStorage.removeItem('username');
        }
    }, [state.username])

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};
