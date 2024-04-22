import React, { createContext, useContext } from 'react';
import { useReducer } from 'reinspect';

const defaultProjectId = import.meta.env.VITE_PROJECTID;
const defaultDataset = import.meta.env.VITE_DATASET;
const defaultApiVersion = 'v2024-04-01';
const defaultQuery = '*[_type == $type][0..$num]';
const defaultParams = `{
  type: 'article',
  num: 10,
}`;
export const defaultExample = `*[_type == 'article'] {
    "spectate":
      title
      + ": "
      + "https://sanity.io/docs/"
      + slug.current
  }`;

const getLocal = (key) => {
  if (!window) return null;
  const val = window.localStorage.getItem(key);
  if (!val) return null;
  return JSON.parse(val);
};

function setLocal(key, value) {
  if (!window) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

const configuredReducer = (state, action) => {
  switch (action.type) {
    case 'setResult': {
      // setLocal('query', action.payload);
      return {
        ...state,
        result: action.payload,
      };
    }
    case 'setLeftSidebar': {
      // setLocal('query', action.payload);
      return {
        ...state,
        leftSidebar: action.payload,
      };
    }
    case 'setQuery': {
      setLocal('query', action.payload);
      return {
        ...state,
        query: action.payload,
      };
    }
    case 'setParams': {
      setLocal('params', action.payload);
      return {
        ...state,
        params: action.payload,
      };
    }
    case 'setProjectId': {
      setLocal('projectId', action.payload);
      return {
        ...state,
        projectId: action.payload,
      };
    }
    case 'setDataset': {
      setLocal('dataset', action.payload);
      return {
        ...state,
        dataset: action.payload,
      };
    }
    case 'setApiVersion': {
      setLocal('apiVersion', action.payload);
      return {
        ...state,
        apiVersion: action.payload,
      };
    }
    case 'setToken': {
      setLocal('token', action.payload);
      return {
        ...state,
        token: action.payload,
      };
    }
    case 'setUseCdn': {
      setLocal('useCdn', action.payload);
      return {
        ...state,
        useCdn: action.payload,
      };
    }
    case 'setDebugMode': {
      return {
        ...state,
        debugMode: action.payload,
      };
    }
    case 'setLoading': {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case 'setAboutOpen': {
      return {
        ...state,
        aboutOpen: action.payload,
      };
    }
    case 'setConfigOpen': {
      return {
        ...state,
        configOpen: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

const StateContext = createContext();
export const StateProvider = ({ children }) => {
  const initState = {
    result: undefined,
    query: getLocal('query') || defaultQuery,
    params: getLocal('params') || defaultParams,
    dataset: getLocal('dataset') || defaultDataset,
    projectId: getLocal('projectId') || defaultProjectId,
    apiVersion: getLocal('apiVersion') || defaultApiVersion,
    token: getLocal('token') || '',
    useCdn: getLocal('useCdn') || true,
    debugMode: import.meta.env.NODE_ENV === 'development',
    leftSidebar: false,
    loading: false,
    aboutOpen: false,
    configOpen: false,
  };
  return (
    <StateContext.Provider
      value={useReducer(configuredReducer, initState, undefined, 'app-reducer')}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
