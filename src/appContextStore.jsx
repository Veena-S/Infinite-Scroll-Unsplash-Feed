/* eslint-disable react/prop-types */
/**
 * Defines Context and holds the global state for the complete application
 * Also, reducer function is defined in here
 *
 */

import React, { useReducer } from 'react';
import axios from 'axios';

// Unsplash URL and access key
const BASE_UNSPLASH_URL = `api.unsplash.com`;
const ACCESS_KEY_UNSPLASH = '?client_id=6c446b49b72a4c559d9b9d67183d5c1de1981d16f309063c3b994086e6ce1a26';


// Stores the state across the application
export const initialState = {
  unsplashImageList: [],
};

// Action Types
// To set the image list retrieved from Unsplahs
const SET_UNSPLASH_IMAGE_LIST = 'SET_UNSPLASH_IMAGE_LIST';

// Reducer function that manipulates the state
// It allows to set new state values based on the previous state
export function unsplashFeedReducer(state, action) {
  switch (action.type) {
    case SET_UNSPLASH_IMAGE_LIST:
      return {
        ...state,
        unsplashImageList: [...action.payload.unsplashImageList],
      };
    default:
      return state;
  }
}

// Action generating functions
// These functions accept inputs relevant to the action and
// return an object that represents the action, which is passed to the dispatch function
// Actions always contain a type attribute used to identify the action and
// tell the reducer what logic to run.


/**
 * This function creates the action object for modifying the stored image list state
 * @param {Object} unsplashImageList - Object data with the list of Images fetched from Unsplash
 * @returns - Action object
 */
export function setUnsplashImageList(unsplashImageList) {
  return {
    type: SET_UNSPLASH_IMAGE_LIST,
    payload: {
      unsplashImageList: unsplashImageList,
    },
  };
}


/** ****************************************
 * ****************************************
 *    Context and Provider
 *
 * Context provides a way to pass data through the component tree without
 * having to pass props down manually at every level
 * ****************************************
 */

// Create a context for the current app
// When React renders a component that subscribes to this Context object
// it will read the current context value from the matching Provider.
export const UnsplashFeedContext = React.createContext(null);
// Every Context object comes with a Provider React component that allows
// consuming components to subscribe to context changes.
const { Provider } = UnsplashFeedContext;

/**
 * Provider component that contains the initialized reducer
 * The benefit of combining useReducer with context is being able to call
 * the dispatch function anywhere down the component tree without passing through props.
 * @param {React.Component} param0 - prop of children
 * @returns - initialized Provider
 */
export function UnsplashFeedProvider({ children }) {

  // The useReducer function accepts a reducer of type (state, action) ,
  // and returns the current state paired with a dispatch method.
  const [store, dispatch] = useReducer(unsplashFeedReducer, initialState);
  // Returns the Provider component
  // It accepts a value prop to be passed to consuming components
  // that are descendants of this Provider
  return (
    <Provider value={{ store, dispatch }}>
      {children}
    </Provider>
  );
}

/*
 *  Ajax requests *
 *
 */
/**
 * This function gets the a list of images from Unsplash
 * @param {function} dispatch - dispatch method to call create Action object function
 */
export function getUnsplashImageList(dispatch) {
  return axios.get(`${BASE_UNSPLASH_URL}/photos${ACCESS_KEY_UNSPLASH}`)
    .then((result) => {
      dispatch(setUnsplashImageList(result.data));
    });
}
