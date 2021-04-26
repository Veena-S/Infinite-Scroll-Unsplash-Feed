/* eslint-disable react/prop-types */
/**
 * Defines Context and holds the global state for the complete application
 * Also, reducer function is defined in here
 *
 */

import React, { useReducer } from 'react';
import axios from 'axios';
import { ActivityIndicator } from 'react-native';

// Unsplash URL and access key
const BASE_UNSPLASH_URL = `http://api.unsplash.com`;
const ACCESS_KEY_UNSPLASH_URL = '?client_id=6c446b49b72a4c559d9b9d67183d5c1de1981d16f309063c3b994086e6ce1a26';
const PER_PAGE_ELEMENTS = 10;


// Stores the state across the application
export const initialState = {
  unsplashImageList: [],  // Stores all the images that is fetched from Unasplash
  page: 1,  // This represents the page count which s fetched from Unsplash`
  // This indicates the last page available from the Unsplash with a given  number of
  // items per page. Currently, the per page item count is PER_PAGE_ELEMENTS, 
  // while 10 is default for Unsplash
  lastPage: 1,
  loading: false, // indicates whether next page is loading or not
  refreshing: false, // Set this true while waiting for new data from a refresh.
};

// Action Types
// To set the image list retrieved from Unsplahs
const SET_UNSPLASH_IMAGE_LIST = 'SET_UNSPLASH_IMAGE_LIST';
const UNSET_UNSPLASH_IMAGE_LIST = 'UNSET_UNSPLASH_IMAGE_LIST';
// To set the page count
const SET_PAGE_COUNT = 'SET_PAGE_COUNT';
// To set the last page
// This need to be set only one time, after fetching the first page
const SET_LAST_PAGE = 'SET_LAST_PAGE';
// For activity indicator
const SET_LOADING = 'SET_LOADING';
// For refreshing
const SET_REFRESHING = 'SET_REFRESHING';

// Reducer function that manipulates the state
// It allows to set new state values based on the previous state
export function unsplashFeedReducer(state, action) {
  switch (action.type) {
    case SET_UNSPLASH_IMAGE_LIST:
      return {
        ...state,
        unsplashImageList: [...state.unsplashImageList, ...action.payload.unsplashImageList],
      };
    case UNSET_UNSPLASH_IMAGE_LIST:
      return{
         ...state,
        unsplashImageList: [],
      }
    case SET_PAGE_COUNT:
      return {
        ...state, page: action.payload.page,
      }
    case SET_LAST_PAGE:
      return {
        ...state, lastPage: action.payload.lastPage,
      }
    case SET_LOADING:
      return {
        ...state, loading: action.payload.loading,
      }
    case SET_REFRESHING:
      return {
        ...state, refreshing: action.payload.refreshing,
      }
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

export function unsetUnsplashImageList() {
  return {
    type: UNSET_UNSPLASH_IMAGE_LIST,
  }
}

/**
 * Creates action object
 * @param {Number} page - specifies the page number to be fetched on next call to Unsplash
 * @returns - Action object
 */
export function setPageCount(page) {
  return {
    type: SET_PAGE_COUNT,
    payload: {
      page: page,
    },
  };
}

/**
 * Creates the action object for last Page 
 * @param {Number} lastPage - Sets the last page
 * @returns - Action object
 */
export function setLastPage(lastPage) {
  return{
    type: SET_LAST_PAGE,
    payload: {
      lastPage: lastPage,
    },
  };
}

/**
 * 
 * @param {Boolean} loading 
 * @returns 
 */
export function setLoadingStatus(loading) {
  return {
    type: SET_LOADING,
    payload: {
      loading: loading,
    }
  }
}

/**
 * 
 * @param {Boolean} refreshing 
 * @returns 
 */
export function setRefreshingStatus( refreshing) {
  return {
    type: SET_REFRESHING,
    payload: {
      refreshing: refreshing,
    }
  }
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
 * @param {Number} page - page number to be requested
 */
export function getUnsplashImageList(dispatch, page) {
  dispatch(setLoadingStatus(true));
  return axios.get(`${BASE_UNSPLASH_URL}/photos${ACCESS_KEY_UNSPLASH_URL}&page=${Number(page)}&per_page=${PER_PAGE_ELEMENTS}`)
    .then((result) => {
      // console.log(result)
      dispatch(setUnsplashImageList(result.data));
      dispatch(setLoadingStatus(false));
      dispatch(setRefreshingStatus(false));
      // Set the total number of pages available
      // Need to set only once
      if(page === 1){
        // Per each request to the Unsplash, it returns the per-page element count and the 
        // total number of elements available.
        // From this, calculate the last page
        dispatch(setLastPage(Math.ceil(result.headers["x-total"] /result.headers["x-per-page"])))
      }
    })
    .catch((error) => {
      console.log(error.response)
    });
}
